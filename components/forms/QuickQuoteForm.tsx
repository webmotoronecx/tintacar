"use client";

import Script from "next/script";
import { useState, useSyncExternalStore, type FormEvent } from "react";
import { pushDataLayer } from "@/lib/analytics";
import type { QuickQuoteInterest, QuickQuoteStore } from "@/lib/quick-quote/types";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

type QuickQuoteFormProps = {
  stores: QuickQuoteStore[];
  interests: QuickQuoteInterest[];
  formTitle: string;
  storeTitle: string;
  /** Trusted HTML shown under the form, e.g. the privacy statement link */
  privacyHtml?: string;
  endpoint?: string;
  recaptchaSiteKey?: string;
  /** Shown in the network error message, e.g. "call 13 tint" */
  fallbackContact?: string;
  /** dataLayer event pushed after a successful send, for GTM conversions */
  leadEvent?: string;
};

type Grecaptcha = { ready(callback: () => void): void; execute(siteKey: string, options: { action: string }): Promise<string> };

const subscribeNoop = () => () => undefined;
const inputClass = "w-full bg-mist px-5 py-3 text-[14px] text-ink outline-none placeholder:text-[#8a8a8a] focus:ring-2 focus:ring-brand";
const labelClass = "mb-2 block text-[14px] text-ink";

// Store chosen through the Quick Quote link (?id= or ?store_id=), read without a hydration mismatch
function readStoreParam(): string {
  const params = new URLSearchParams(window.location.search);
  return params.get("id") ?? params.get("store_id") ?? "";
}

const SUBMIT_TIMEOUT_MS = 30_000;

// Never leave the customer waiting forever (e.g. a blocked bot-check script); they get the "please call" message instead
function withTimeout<T>(promise: Promise<T>, ms = SUBMIT_TIMEOUT_MS): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = window.setTimeout(() => reject(new Error("Request timed out")), ms);
    promise.then(
      (value) => {
        window.clearTimeout(timer);
        resolve(value);
      },
      (error: unknown) => {
        window.clearTimeout(timer);
        reject(error);
      },
    );
  });
}

async function recaptchaToken(siteKey: string): Promise<string | undefined> {
  const grecaptcha = (window as Window & { grecaptcha?: Grecaptcha }).grecaptcha;
  if (!grecaptcha) return undefined;
  await new Promise<void>((resolve) => grecaptcha.ready(resolve));
  return grecaptcha.execute(siteKey, { action: "quick_quote" });
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? (
    <p id={id} className="mt-1 text-[12px] font-bold text-red-700">
      {message}
    </p>
  ) : null;
}

// Quick Quote enquiry form (fields from the live CF7 form) with the selected store panel
export function QuickQuoteForm({
  stores,
  interests,
  formTitle,
  storeTitle,
  privacyHtml,
  endpoint = "/api/quick-quote/",
  recaptchaSiteKey,
  fallbackContact = "contact your nearest store",
  leadEvent,
}: QuickQuoteFormProps) {
  const urlStore = useSyncExternalStore(subscribeNoop, readStoreParam, () => "");
  const [chosenStore, setChosenStore] = useState<string | null>(null);
  const [interestValue, setInterestValue] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const storeId = chosenStore ?? urlStore;
  const store = stores.find((item) => item.id === storeId);
  const interest = interests.find((item) => item.value === interestValue);
  const describe = (field: string) => (errors[field] ? `quote-${field}-error` : undefined);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const products = data.getAll("products").map(String);
    if (interest && products.length === 0) {
      setErrors({ products: "Please select at least one product." });
      form.querySelector<HTMLElement>('[name="products"]')?.focus();
      return;
    }

    setStatus("submitting");
    setErrors({});
    try {
      const token = recaptchaSiteKey ? await recaptchaToken(recaptchaSiteKey) : undefined;
      const text = (name: string) => String(data.get(name) ?? "");
      const response = await withTimeout(fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          interest: interestValue,
          products,
          vehicleMake: text("vehicleMake"),
          vehicleModel: text("vehicleModel"),
          name: text("name"),
          store: storeId,
          phone: text("phone"),
          email: text("email"),
          address: text("address"),
          comments: text("comments"),
          company: text("company"),
          recaptchaToken: token,
        }),
      }));
      const result = (await response.json()) as { success?: boolean; error?: string; fieldErrors?: Record<string, string> };

      if (response.ok && result.success) {
        if (leadEvent) pushDataLayer({ event: leadEvent, formId: "quick-quote", store: storeId, store_name: store?.name, enquiry_type: interest?.label });
        form.reset();
        setInterestValue("");
        setStatus("success");
        setMessage(`Thanks! Your enquiry has been sent to ${store?.name ?? "your local store"}. We'll be in touch as soon as we can.`);
        return;
      }
      setStatus("error");
      setErrors(result.fieldErrors ?? {});
      setMessage(result.error ?? "Something went wrong. Please try again.");
      const firstInvalid = Object.keys(result.fieldErrors ?? {})[0];
      if (firstInvalid) form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
    } catch {
      setStatus("error");
      setMessage(`We couldn't reach the server. Please check your connection or ${fallbackContact}.`);
    }
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-[30px]">
      {recaptchaSiteKey && <Script src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`} strategy="afterInteractive" />}

      <form onSubmit={handleSubmit} className="relative lg:px-[15px]" aria-labelledby="quote-form-title">
        <h2 id="quote-form-title" className="text-[20px] leading-tight text-heading md:text-[36px]">
          {formTitle}
        </h2>

        <div className="mt-6 grid gap-6">
          <div>
            <label htmlFor="quote-interest" className={cn(labelClass, "font-bold")}>
              I&apos;m interested in:*
            </label>
            <select
              id="quote-interest"
              name="interest"
              required
              value={interestValue}
              onChange={(e) => setInterestValue(e.target.value)}
              aria-invalid={Boolean(errors.interest)}
              aria-describedby={describe("interest")}
              className="w-full rounded-[3px] border border-[#cccccc] bg-white px-3 py-3 text-[14px] text-ink outline-none focus:ring-2 focus:ring-brand"
            >
              <option value="">—Please choose an option—</option>
              {interests.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            <FieldError id="quote-interest-error" message={errors.interest} />
          </div>

          {interest && (
            <fieldset aria-describedby={describe("products")}>
              <legend className={cn(labelClass, "font-bold")}>
                {interest.productsLabel}* <span className="font-normal">(Tick all that apply)</span>
              </legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {interest.products.map((product) => (
                  <label key={product} className="flex items-center gap-2 text-[14px]">
                    <input type="checkbox" name="products" value={product} className="h-4 w-4 accent-brand" />
                    {product}
                  </label>
                ))}
              </div>
              <FieldError id="quote-products-error" message={errors.products} />
              {interest.vehicle && (
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="quote-make" className={labelClass}>
                      Vehicle Make:
                    </label>
                    <input id="quote-make" name="vehicleMake" type="text" autoComplete="off" placeholder="e.g. Toyota" className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="quote-model" className={labelClass}>
                      Vehicle Model:
                    </label>
                    <input id="quote-model" name="vehicleModel" type="text" autoComplete="off" placeholder="e.g. Corolla" className={inputClass} />
                  </div>
                </div>
              )}
            </fieldset>
          )}

          <div>
            <label htmlFor="quote-name" className={labelClass}>
              Full Name:*
            </label>
            <input id="quote-name" name="name" type="text" required autoComplete="name" placeholder="Enter full name" aria-invalid={Boolean(errors.name)} aria-describedby={describe("name")} className={inputClass} />
            <FieldError id="quote-name-error" message={errors.name} />
          </div>

          <div className="sm:w-1/2 sm:pr-[15px]">
            <label htmlFor="quote-store" className={labelClass}>
              Preferred Store:*
            </label>
            <select
              id="quote-store"
              name="store"
              required
              value={storeId}
              onChange={(e) => setChosenStore(e.target.value)}
              aria-invalid={Boolean(errors.store)}
              aria-describedby={describe("store")}
              className={cn(inputClass, "pr-8")}
            >
              <option value="">—Please choose an option—</option>
              {stores.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <FieldError id="quote-store-error" message={errors.store} />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 sm:gap-[30px]">
            <div>
              <label htmlFor="quote-phone" className={labelClass}>
                Phone Number:*
              </label>
              <input id="quote-phone" name="phone" type="tel" required autoComplete="tel" placeholder="Enter phone number" aria-invalid={Boolean(errors.phone)} aria-describedby={describe("phone")} className={inputClass} />
              <FieldError id="quote-phone-error" message={errors.phone} />
            </div>
            <div>
              <label htmlFor="quote-email" className={labelClass}>
                Email Address:*
              </label>
              <input id="quote-email" name="email" type="email" required autoComplete="email" placeholder="Enter email address" aria-invalid={Boolean(errors.email)} aria-describedby={describe("email")} className={inputClass} />
              <FieldError id="quote-email-error" message={errors.email} />
            </div>
          </div>

          <div>
            <label htmlFor="quote-address" className={labelClass}>
              Your Address (Optional):
            </label>
            <input id="quote-address" name="address" type="text" autoComplete="street-address" placeholder="Enter your address..." className={inputClass} />
          </div>

          <div>
            <label htmlFor="quote-comments" className={labelClass}>
              Additional Information/Comments (Optional):
            </label>
            <textarea id="quote-comments" name="comments" rows={6} placeholder="Enter more info here..." className={inputClass} />
          </div>

          {/* Honeypot field, hidden from people and assistive tech */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label htmlFor="quote-company">Company</label>
            <input id="quote-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-6">
            <Button type="submit" variant="outline" size="sm" disabled={status === "submitting"}>
              {status === "submitting" ? "Sending…" : "Send"}
            </Button>
            <p
              role="status"
              className={cn("text-[13px]", status === "success" && "font-bold text-green-700", status === "error" && "font-bold text-red-700")}
            >
              {status === "success" || status === "error" ? message : ""}
            </p>
          </div>
        </div>
      </form>

      <aside aria-labelledby="quote-store-title" className="lg:px-[15px]">
        <h2 id="quote-store-title" className="text-[20px] leading-tight text-heading md:text-[36px]">
          {storeTitle}
        </h2>
        {store ? (
          <div className="mt-6 text-[14px] leading-[1.9]">
            <h3 className="text-[18px] font-bold text-heading md:text-[24px]">{store.name}</h3>
            <p className="mt-4">
              {store.street}
              <br />
              {store.suburb}&nbsp; {store.postcode}
            </p>
            {store.phone && (
              <p className="mt-4">
                <strong>Store Contact</strong>
                <br />
                Phone:{" "}
                <a href={`tel:${store.phone.replace(/[^0-9+]/g, "")}`} className="hover:text-brand">
                  {store.phone}
                </a>
              </p>
            )}
          </div>
        ) : (
          <p className="mt-6 text-[14px]">Choose your preferred store to see its details.</p>
        )}
      </aside>

      {privacyHtml && <div className="text-[14px] lg:col-span-2 [&_a]:font-bold [&_a:hover]:text-brand" dangerouslySetInnerHTML={{ __html: privacyHtml }} />}
    </div>
  );
}
