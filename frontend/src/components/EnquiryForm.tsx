"use client";

import { useState, type FormEvent } from "react";

export type EnquiryType = "help" | "give" | "volunteer" | "partner" | "other";

const typeLabels: Record<EnquiryType, string> = {
  help: "I need help",
  give: "I would like to give",
  volunteer: "I would like to volunteer",
  partner: "I would like to partner with Tehillah",
  other: "Something else",
};

type State =
  | { status: "idle" }
  | { status: "sending" }
  | { status: "sent" }
  | { status: "error"; message: string; fields: Record<string, string> };

const inputClasses =
  "min-h-12 w-full rounded-md border border-[#8f897f] bg-white px-3.5 text-base text-charcoal-900 aria-[invalid=true]:border-red-700";

export function EnquiryForm({ defaultType = "help" }: { defaultType?: EnquiryType }) {
  const [state, setState] = useState<State>({ status: "idle" });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setState({ status: "sending" });
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (response.ok) {
        form.reset();
        setState({ status: "sent" });
        return;
      }
      const body = (await response.json().catch(() => ({}))) as {
        error?: string;
        details?: { field: string; message: string }[];
      };
      const fields: Record<string, string> = {};
      for (const detail of body.details ?? []) fields[detail.field] = detail.message;
      setState({
        status: "error",
        message: body.error ?? "Something went wrong. Please try again, or phone us.",
        fields,
      });
    } catch {
      setState({
        status: "error",
        message: "We could not reach the server. Please try again, or phone us.",
        fields: {},
      });
    }
  }

  if (state.status === "sent") {
    return (
      <div role="status" className="rounded-xl bg-white p-8">
        <h3 className="text-2xl font-bold">Thank you, we got your message.</h3>
        <p className="mt-2 text-lg leading-relaxed text-ink-soft">
          Someone from Tehillah will get back to you. If it is urgent, please phone us.
        </p>
        <button
          type="button"
          onClick={() => setState({ status: "idle" })}
          className="mt-5 min-h-12 rounded-md border-2 border-charcoal-900 px-6 text-base font-bold"
        >
          Send another message
        </button>
      </div>
    );
  }

  const fields = state.status === "error" ? state.fields : {};

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5 rounded-xl bg-cream p-6 md:p-8">
      {state.status === "error" ? (
        <p role="alert" className="rounded-md bg-red-50 p-3 text-base font-semibold text-red-800">
          {state.message}
        </p>
      ) : null}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="enquiry-type" className="text-[15px] font-bold">
          What is this about?
        </label>
        <select id="enquiry-type" name="type" defaultValue={defaultType} className={inputClasses} aria-invalid={Boolean(fields.type)}>
          {(Object.keys(typeLabels) as EnquiryType[]).map((key) => (
            <option key={key} value={key}>
              {typeLabels[key]}
            </option>
          ))}
        </select>
        {fields.type ? <p className="text-sm font-semibold text-red-800">{fields.type}</p> : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="enquiry-name" className="text-[15px] font-bold">
          Your name
        </label>
        <input id="enquiry-name" name="name" type="text" autoComplete="name" className={inputClasses} aria-invalid={Boolean(fields.name)} />
        {fields.name ? <p className="text-sm font-semibold text-red-800">{fields.name}</p> : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="enquiry-contact" className="text-[15px] font-bold">
          Email or phone number
        </label>
        <input id="enquiry-contact" name="contact" type="text" autoComplete="email" className={inputClasses} aria-invalid={Boolean(fields.contact)} />
        {fields.contact ? <p className="text-sm font-semibold text-red-800">{fields.contact}</p> : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="enquiry-message" className="text-[15px] font-bold">
          How can we help?
        </label>
        <textarea
          id="enquiry-message"
          name="message"
          rows={5}
          className={`${inputClasses} py-3`}
          aria-invalid={Boolean(fields.message)}
        />
        {fields.message ? <p className="text-sm font-semibold text-red-800">{fields.message}</p> : null}
      </div>

      {/* Hidden trap for spam bots. People never see or fill this in. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this empty
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <button
        type="submit"
        disabled={state.status === "sending"}
        className="min-h-12 self-start rounded-md bg-brand px-8 text-[17px] font-bold text-charcoal-950 hover:bg-brand-light disabled:opacity-60"
      >
        {state.status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
