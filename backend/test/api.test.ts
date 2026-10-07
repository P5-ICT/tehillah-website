import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import type { Server } from "node:http";
import os from "node:os";
import path from "node:path";
import { after, before, describe, it } from "node:test";

// The admin password must be set before the app code is loaded.
const TOKEN = "test-admin-token-1234567890";
process.env.ADMIN_TOKEN = TOKEN;

const { createApp } = await import("../src/app.js");
const { Store } = await import("../src/store.js");

describe("Tehillah API", () => {
  let server: Server;
  let base = "";
  let dir = "";

  const call = (route: string, init: RequestInit & { admin?: boolean } = {}) => {
    const { admin, headers, ...rest } = init;
    return fetch(`${base}${route}`, {
      ...rest,
      headers: {
        "content-type": "application/json",
        ...(admin ? { authorization: `Bearer ${TOKEN}` } : {}),
        ...headers,
      },
    });
  };

  before(async () => {
    dir = await mkdtemp(path.join(os.tmpdir(), "tehillah-"));
    const store = new Store(path.join(dir, "db.json"));
    await store.load();
    server = createApp(store, { enquiryLimit: 5 }).listen(0);
    const address = server.address();
    assert.ok(address && typeof address === "object");
    base = `http://127.0.0.1:${address.port}/api`;
  });

  after(async () => {
    server.close();
    await rm(dir, { recursive: true, force: true });
  });

  it("answers the health check", async () => {
    const res = await call("/health");
    assert.equal(res.status, 200);
    assert.equal((await res.json()).status, "ok");
  });

  it("hides the seeded draft from the public", async () => {
    const res = await call("/news");
    assert.deepEqual((await res.json()).items, []);
  });

  it("rejects an incomplete enquiry with field messages", async () => {
    const res = await call("/enquiries", {
      method: "POST",
      body: JSON.stringify({ name: "", contact: "nope", type: "help", message: "" }),
    });
    assert.equal(res.status, 400);
    const body = await res.json();
    const fields = body.details.map((d: { field: string }) => d.field).sort();
    assert.deepEqual(fields, ["contact", "message", "name"]);
  });

  it("saves a good enquiry and ignores the bot trap", async () => {
    const good = await call("/enquiries", {
      method: "POST",
      body: JSON.stringify({ name: "Thandi", contact: "thandi@example.com", type: "volunteer", message: "I can help on Saturdays." }),
    });
    assert.equal(good.status, 201);

    const bot = await call("/enquiries", {
      method: "POST",
      body: JSON.stringify({ name: "Bot", contact: "bot@example.com", type: "other", message: "spam", website: "http://spam.example" }),
    });
    assert.equal(bot.status, 201);

    const list = await (await call("/admin/enquiries", { admin: true })).json();
    assert.equal(list.items.length, 1);
    assert.equal(list.items[0].name, "Thandi");
    assert.equal(list.items[0].status, "new");
  });

  it("marks an enquiry as handled", async () => {
    const list = await (await call("/admin/enquiries", { admin: true })).json();
    const res = await call(`/admin/enquiries/${list.items[0].id}`, {
      method: "PATCH",
      admin: true,
      body: JSON.stringify({ status: "handled" }),
    });
    assert.equal(res.status, 200);
    assert.equal((await res.json()).item.status, "handled");
  });

  it("blocks admin routes without the right password", async () => {
    assert.equal((await call("/admin/news")).status, 401);
    const wrong = await call("/admin/news", { headers: { authorization: "Bearer wrong-password-123456" } });
    assert.equal(wrong.status, 401);
  });

  it("runs the full news cycle: draft, publish, edit, unpublish, delete", async () => {
    const created = await call("/admin/news", {
      method: "POST",
      admin: true,
      body: JSON.stringify({ title: "Soup & Hope: Winter Drive!", summary: "Thank you.", body: "Para one.\n\nPara two." }),
    });
    assert.equal(created.status, 201);
    const post = (await created.json()).item;
    assert.equal(post.slug, "soup-hope-winter-drive");
    assert.equal(post.published, false);

    // draft is not public
    assert.equal((await call(`/news/${post.slug}`)).status, 404);

    // same title again gets a different address
    const twin = (
      await (
        await call("/admin/news", {
          method: "POST",
          admin: true,
          body: JSON.stringify({ title: "Soup & Hope: Winter Drive!", summary: "x", body: "y" }),
        })
      ).json()
    ).item;
    assert.equal(twin.slug, "soup-hope-winter-drive-2");

    // publish
    const published = await call(`/admin/news/${post.id}`, {
      method: "PUT",
      admin: true,
      body: JSON.stringify({ published: true, imageUrl: "/images/kitchen.jpg" }),
    });
    assert.equal(published.status, 200);
    assert.equal((await call(`/news/${post.slug}`)).status, 200);
    const publicList = (await (await call("/news")).json()).items;
    assert.equal(publicList.length, 1);
    assert.equal(publicList[0].imageUrl, "/images/kitchen.jpg");

    // an update that does not mention "published" must not change it
    await call(`/admin/news/${post.id}`, { method: "PUT", admin: true, body: JSON.stringify({ summary: "Updated" }) });
    assert.equal((await (await call(`/news/${post.slug}`)).json()).item.published, true);

    // bad image link is refused
    const bad = await call(`/admin/news/${post.id}`, { method: "PUT", admin: true, body: JSON.stringify({ imageUrl: "javascript:alert(1)" }) });
    assert.equal(bad.status, 400);

    // unpublish then delete
    await call(`/admin/news/${post.id}`, { method: "PUT", admin: true, body: JSON.stringify({ published: false }) });
    assert.equal((await call(`/news/${post.slug}`)).status, 404);
    assert.equal((await call(`/admin/news/${post.id}`, { method: "DELETE", admin: true })).status, 204);
    assert.equal((await call(`/admin/news/${post.id}`, { method: "DELETE", admin: true })).status, 404);
  });

  it("limits how many enquiries one address can send", async () => {
    let last = 0;
    for (let i = 0; i < 6; i++) {
      const res = await call("/enquiries", {
        method: "POST",
        body: JSON.stringify({ name: "Rate", contact: "rate@example.com", type: "other", message: `msg ${i}` }),
      });
      last = res.status;
    }
    assert.equal(last, 429);
  });

  it("returns JSON for unknown routes and broken JSON", async () => {
    assert.equal((await call("/nothing-here")).status, 404);
    const res = await fetch(`${base}/enquiries`, { method: "POST", headers: { "content-type": "application/json" }, body: "{oops" });
    assert.equal(res.status, 400);
  });
});
