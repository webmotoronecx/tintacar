import type { Section } from "@/types/sections";

export const FIND_STORE = { label: "Find your nearest store", href: "/contact-a-store/" };

export const neanyTestimonial: Section = {
  type: "testimonial",
  quote: "Very happy with the paint protection product. Anthony was polite and informed me on how to care for it. Definitely recommend this company.",
  author: "Neany, VIC",
};

/** "Interest free" heading with Afterpay/Zip logos, followed by a warranty footnote */
export function interestFreeSections(title: string, warranty: string): Section[] {
  return [
    { type: "heading", title, as: "h2", size: "xs", align: "center", divider: false, showPaymentLogos: true, topRule: true, bottomRule: true, spacing: "sm" },
    { type: "note", text: warranty, spacing: "sm" },
  ];
}
