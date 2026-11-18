"use client";

import { useState, type FormEvent } from "react";
import type { EnquiryInput, EnquiryResponse } from "@/lib/enquiry";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";
type FieldName = Exclude<keyof EnquiryInput, "company" | "store">;

type EnquiryFormProps = {
  storeSlug?: string;
  storeName?: string;
  endpoint?: string;
  submitLabel?: string;
  /** Shown in the network error message, e.g. "call 13 TINT" */
  fallbackContact?: string;
};

const FIELDS: { name: FieldName; label: string; type: string; autoComplete: string; required: boolean }[] = [
  { name: "name", label: "Name", type: "text", autoComplete: "name", required: true },
  { name: "email", label: "Email", type: "email", autoComplete: "email", required: true },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel", required: false },
];

const inputClasses = "w-full rounded-[3px] border border-line bg-white px-4 py-3 text-[14px] outline-none transition-colors focus:border-brand";

// Store enquiry form posting JSON to the enquiry API route
export function EnquiryForm({
  storeSlug,
  storeName,
  endpoint = "/api/enquiry/",
  submitLabel = "Send enquiry",
  fallbackContact = "contact your nearest store",
}: EnquiryFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<EnquiryResponse["fieldErrors"]>({});

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("submitting");
    setFieldErrors({});
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, store: storeSlug ?? "" }),
      });
      const result = (await response.json()) as EnquiryResponse;

      if (response.ok && result.success) {
        form.reset();
        setStatus("success");
        setMessage("Thanks! Your enquiry has been sent. The store will be in touch soon.");
        return;
      }
      setStatus("error");
      setFieldErrors(result.fieldErrors ?? {});
      setMessage(result.error ?? "Something went wrong. Please try again.");
      const firstInvalid = Object.keys(result.fieldErrors ?? {})[0];
      if (firstInvalid) form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
    } catch {
      setStatus("error");
      setMessage(`We couldn't reach the server. Please check your connection or ${fallbackContact}.`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative grid gap-4" aria-describedby="enquiry-status">
      {storeName && <p className="text-[13px]">Your enquiry will be sent to {storeName}.</p>}

      <div className="grid gap-4 sm:grid-cols-3">
        {FIELDS.map((field) => (
          <div key={field.name}>
            <label htmlFor={`enquiry-${field.name}`} className="mb-1 block text-[13px] font-bold">
              {field.label}
              {field.required && <span className="text-accent"> *</span>}
            </label>
            <input
              id={`enquiry-${field.name}`}
              name={field.name}
              type={field.type}
              autoComplete={field.autoComplete}
              required={field.required}
              aria-invalid={Boolean(fieldErrors?.[field.name])}
              aria-describedby={fieldErrors?.[field.name] ? `enquiry-${field.name}-error` : undefined}
              className={cn(inputClasses, fieldErrors?.[field.name] && "border-red-600")}
            />
            {fieldErrors?.[field.name] && (
              <p id={`enquiry-${field.name}-error`} className="mt-1 text-[12px] text-red-700">
                {fieldErrors[field.name]}
              </p>
            )}
          </div>
        ))}
      </div>

      <div>
        <label htmlFor="enquiry-message" className="mb-1 block text-[13px] font-bold">
          Message<span className="text-accent"> *</span>
        </label>
        <textarea
          id="enquiry-message"
          name="message"
          rows={5}
          required
          aria-invalid={Boolean(fieldErrors?.message)}
          aria-describedby={fieldErrors?.message ? "enquiry-message-error" : undefined}
          placeholder="Tell us about your vehicle or windows and what you're after"
          className={cn(inputClasses, fieldErrors?.message && "border-red-600")}
        />
        {fieldErrors?.message && (
          <p id="enquiry-message-error" className="mt-1 text-[12px] text-red-700">
            {fieldErrors.message}
          </p>
        )}
      </div>

      {/* Honeypot field, hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="enquiry-company">Company</label>
        <input id="enquiry-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : submitLabel}
        </Button>
        <p
          id="enquiry-status"
          role="status"
          className={cn("text-[13px]", status === "success" && "font-bold text-green-700", status === "error" && "text-red-700")}
        >
          {status === "success" || status === "error" ? message : ""}
        </p>
      </div>
    </form>
  );
}
