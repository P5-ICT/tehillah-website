"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";

type NewsPost = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  body: string;
  imageUrl: string | null;
  published: boolean;
  publishedAt: string;
};

type Enquiry = {
  id: string;
  createdAt: string;
  name: string;
  contact: string;
  type: string;
  message: string;
  status: "new" | "handled";
};

const TOKEN_KEY = "tehillah-admin-token";

const typeLabels: Record<string, string> = {
  help: "Needs help",
  give: "Wants to give",
  volunteer: "Wants to volunteer",
  partner: "Wants to partner",
  other: "Something else",
};

const field = "min-h-11 w-full rounded-md border border-[#8f897f] bg-white px-3 text-base";
const smallButton = "min-h-10 rounded-md border-2 border-charcoal-900 px-4 text-sm font-bold hover:bg-charcoal-900/5";

class ApiError extends Error {}

async function api<T>(token: string, path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`/api/admin${path}`, {
    ...init,
    headers: { "content-type": "application/json", authorization: `Bearer ${token}`, ...init.headers },
  });
  if (response.status === 204) return undefined as T;
  const body = (await response.json().catch(() => ({}))) as { error?: string; details?: { message: string }[] };
  if (!response.ok) {
    const details = body.details?.map((item) => item.message).join(" ");
    throw new ApiError([body.error, details].filter(Boolean).join(" ") || "Something went wrong.");
  }
  return body as T;
}

export function AdminApp() {
  const [token, setToken] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  // Remember the password only while this browser tab is open
  useEffect(() => {
    setToken(sessionStorage.getItem(TOKEN_KEY));
    setChecked(true);
  }, []);

  if (!checked) return null;

  if (!token) {
    return (
      <Login
        onLogin={(value) => {
          sessionStorage.setItem(TOKEN_KEY, value);
          setToken(value);
        }}
      />
    );
  }

  return (
    <Dashboard
      token={token}
      onLogout={() => {
        sessionStorage.removeItem(TOKEN_KEY);
        setToken(null);
      }}
    />
  );
}

function Login({ onLogin }: { onLogin: (token: string) => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      await api(value.trim(), "/session");
      onLogin(value.trim());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not sign in.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="mx-auto flex max-w-[460px] flex-col gap-5 rounded-xl bg-white p-8">
      <h1 className="text-3xl font-bold">Tehillah admin</h1>
      <p className="text-base leading-relaxed text-ink-soft">Enter the admin password to post news and read enquiries.</p>
      {error ? (
        <p role="alert" className="rounded-md bg-red-50 p-3 font-semibold text-red-800">
          {error}
        </p>
      ) : null}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="admin-password" className="text-[15px] font-bold">
          Admin password
        </label>
        <input
          id="admin-password"
          type="password"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          autoComplete="current-password"
          className={field}
        />
      </div>
      <button
        type="submit"
        disabled={busy || value.trim() === ""}
        className="min-h-12 self-start rounded-md bg-brand px-8 text-[17px] font-bold text-charcoal-950 hover:bg-brand-light disabled:opacity-60"
      >
        {busy ? "Checking…" : "Sign in"}
      </button>
    </form>
  );
}

function Dashboard({ token, onLogout }: { token: string; onLogout: () => void }) {
  const [tab, setTab] = useState<"news" | "enquiries">("enquiries");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Tehillah admin</h1>
        <button type="button" onClick={onLogout} className={smallButton}>
          Sign out
        </button>
      </div>

      <div role="tablist" aria-label="Admin sections" className="flex gap-2">
        {(["enquiries", "news"] as const).map((name) => (
          <button
            key={name}
            role="tab"
            type="button"
            aria-selected={tab === name}
            onClick={() => setTab(name)}
            className={`min-h-11 rounded-md px-5 text-base font-bold ${tab === name ? "bg-charcoal-900 text-white" : "bg-white hover:bg-sand"}`}
          >
            {name === "enquiries" ? "Enquiries" : "News"}
          </button>
        ))}
      </div>

      {tab === "enquiries" ? <Enquiries token={token} onAuthLost={onLogout} /> : <News token={token} onAuthLost={onLogout} />}
    </div>
  );
}

function useLoader<T>(token: string, path: string, onAuthLost: () => void) {
  const [items, setItems] = useState<T[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    try {
      const data = await api<{ items: T[] }>(token, path);
      setItems(data.items);
      setError("");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not load.";
      if (/password/i.test(message)) onAuthLost();
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [token, path, onAuthLost]);

  useEffect(() => {
    void reload();
  }, [reload]);

  return { items, error, loading, reload, setError };
}

function Enquiries({ token, onAuthLost }: { token: string; onAuthLost: () => void }) {
  const { items, error, loading, reload, setError } = useLoader<Enquiry>(token, "/enquiries", onAuthLost);

  async function toggle(item: Enquiry) {
    try {
      await api(token, `/enquiries/${item.id}`, {
        method: "PATCH",
        body: JSON.stringify({ status: item.status === "new" ? "handled" : "new" }),
      });
      await reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update.");
    }
  }

  if (loading) return <p>Loading…</p>;

  return (
    <div className="flex flex-col gap-4">
      {error ? <p role="alert" className="rounded-md bg-red-50 p-3 font-semibold text-red-800">{error}</p> : null}
      {items.length === 0 ? <p className="rounded-xl bg-white p-6 text-lg">No enquiries yet.</p> : null}
      {items.map((item) => (
        <article key={item.id} className={`rounded-xl bg-white p-6 ${item.status === "new" ? "ring-2 ring-brand" : ""}`}>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="text-sm font-bold text-brand-dark">{typeLabels[item.type] ?? item.type}</div>
              <h2 className="text-xl font-bold">{item.name}</h2>
              <p className="text-base text-ink-soft">{item.contact}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <time dateTime={item.createdAt} className="text-sm text-ink-soft">
                {new Date(item.createdAt).toLocaleString("en-ZA")}
              </time>
              <button type="button" onClick={() => toggle(item)} className={smallButton}>
                {item.status === "new" ? "Mark as handled" : "Mark as new"}
              </button>
            </div>
          </div>
          <p className="mt-3 whitespace-pre-line text-base leading-relaxed">{item.message}</p>
        </article>
      ))}
    </div>
  );
}

type Draft = { id: string | null; title: string; summary: string; body: string; imageUrl: string; published: boolean };
const emptyDraft: Draft = { id: null, title: "", summary: "", body: "", imageUrl: "", published: false };

function News({ token, onAuthLost }: { token: string; onAuthLost: () => void }) {
  const { items, error, loading, reload, setError } = useLoader<NewsPost>(token, "/news", onAuthLost);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);

  async function save(event: FormEvent) {
    event.preventDefault();
    if (!draft) return;
    setSaving(true);
    setError("");
    try {
      const payload = {
        title: draft.title,
        summary: draft.summary,
        body: draft.body,
        imageUrl: draft.imageUrl,
        published: draft.published,
      };
      if (draft.id) {
        await api(token, `/news/${draft.id}`, { method: "PUT", body: JSON.stringify(payload) });
      } else {
        await api(token, "/news", { method: "POST", body: JSON.stringify(payload) });
      }
      setDraft(null);
      await reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save.");
    } finally {
      setSaving(false);
    }
  }

  async function remove(post: NewsPost) {
    if (!window.confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    try {
      await api(token, `/news/${post.id}`, { method: "DELETE" });
      await reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete.");
    }
  }

  async function togglePublished(post: NewsPost) {
    try {
      await api(token, `/news/${post.id}`, { method: "PUT", body: JSON.stringify({ published: !post.published }) });
      await reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update.");
    }
  }

  if (loading) return <p>Loading…</p>;

  if (draft) {
    return (
      <form onSubmit={save} className="flex flex-col gap-5 rounded-xl bg-white p-6 md:p-8">
        <h2 className="text-2xl font-bold">{draft.id ? "Edit story" : "New story"}</h2>
        <p className="text-sm text-ink-soft">Changes appear on the website within about a minute.</p>
        {error ? <p role="alert" className="rounded-md bg-red-50 p-3 font-semibold text-red-800">{error}</p> : null}

        <div className="flex flex-col gap-1.5">
          <label htmlFor="news-title" className="text-[15px] font-bold">Title</label>
          <input id="news-title" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} className={field} maxLength={140} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="news-summary" className="text-[15px] font-bold">Short summary (one or two sentences)</label>
          <textarea id="news-summary" rows={2} value={draft.summary} onChange={(e) => setDraft({ ...draft, summary: e.target.value })} className={`${field} py-2`} maxLength={300} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="news-body" className="text-[15px] font-bold">The story (leave a blank line between paragraphs)</label>
          <textarea id="news-body" rows={10} value={draft.body} onChange={(e) => setDraft({ ...draft, body: e.target.value })} className={`${field} py-2`} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="news-image" className="text-[15px] font-bold">Photo (optional)</label>
          <input
            id="news-image"
            value={draft.imageUrl}
            onChange={(e) => setDraft({ ...draft, imageUrl: e.target.value })}
            className={field}
            placeholder="/images/kitchen.jpg"
            aria-describedby="news-image-help"
          />
          <p id="news-image-help" className="text-sm text-ink-soft">
            Use a photo that is already in the website&apos;s images folder (for example /images/kitchen.jpg), or a full https:// link.
          </p>
        </div>
        <label className="flex min-h-11 items-center gap-3 text-base font-bold">
          <input type="checkbox" checked={draft.published} onChange={(e) => setDraft({ ...draft, published: e.target.checked })} className="size-5" />
          Published (shown on the website)
        </label>

        <div className="flex flex-wrap gap-3">
          <button type="submit" disabled={saving} className="min-h-12 rounded-md bg-brand px-8 text-[17px] font-bold text-charcoal-950 hover:bg-brand-light disabled:opacity-60">
            {saving ? "Saving…" : "Save story"}
          </button>
          <button type="button" onClick={() => { setDraft(null); setError(""); }} className="min-h-12 rounded-md border-2 border-charcoal-900 px-6 text-base font-bold">
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {error ? <p role="alert" className="rounded-md bg-red-50 p-3 font-semibold text-red-800">{error}</p> : null}
      <div>
        <button type="button" onClick={() => setDraft(emptyDraft)} className="min-h-12 rounded-md bg-brand px-6 text-base font-bold text-charcoal-950 hover:bg-brand-light">
          Write a new story
        </button>
      </div>
      {items.length === 0 ? <p className="rounded-xl bg-white p-6 text-lg">No stories yet.</p> : null}
      {items.map((post) => (
        <article key={post.id} className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-white p-6">
          <div className="min-w-0 flex-1">
            <div className={`text-sm font-bold ${post.published ? "text-green-800" : "text-ink-soft"}`}>{post.published ? "PUBLISHED" : "DRAFT"}</div>
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p className="text-base text-ink-soft">{post.summary}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" className={smallButton} onClick={() => setDraft({ id: post.id, title: post.title, summary: post.summary, body: post.body, imageUrl: post.imageUrl ?? "", published: post.published })}>
              Edit
            </button>
            <button type="button" className={smallButton} onClick={() => togglePublished(post)}>
              {post.published ? "Unpublish" : "Publish"}
            </button>
            <button type="button" className={`${smallButton} border-red-800 text-red-800`} onClick={() => remove(post)}>
              Delete
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
