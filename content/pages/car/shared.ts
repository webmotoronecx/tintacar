import type { AccordionSection, CtaStripSection, PromoCardSection, TestimonialSection } from "@/types/sections";

const IMG = "/images/car-window-tint";

export const productIcons = {
  colour: `${IMG}/icon-tint-colour.png`,
  uv: `${IMG}/icon-uv.png`,
  infrared: `${IMG}/icon-infrared.png`,
  warranty: `${IMG}/icon-warranty.jpg`,
  twoShades: `${IMG}/icon-two-shades.png`,
  certified: `${IMG}/icon-certified.png`,
  glare: `${IMG}/icon-glare.png`,
  value: `${IMG}/icon-value.png`,
};

export const quoteStrip: Omit<CtaStripSection, "type"> = {
  text: "Ready to get a quote?",
  buttons: [{ label: "Enquire now", href: "/contact-a-store/", variant: "outline" }],
};

export const ceramicBundle: Omit<PromoCardSection, "type"> = {
  image: { src: `${IMG}/ceramic-bundle-offer.png`, alt: "", width: 600, height: 750 },
  html: [
    "<h2>Ceramic Bundle!</h2>",
    "<h3>Elite X Ceramic Surface Paint Protection + Any Car Tint*</h3>",
    "<p>Get the total bundle with</p>",
    "<h2>Elite X Exterior + Interior Protection!</h2>",
    "<p><strong>Contact your local store today to find out more.</strong></p>",
  ].join(""),
  buttons: [{ label: "Find your nearest store", href: "/contact-a-store/", variant: "outline-light" }],
};

export const warrantyNote = "^Warranty terms, conditions and exclusions apply. See in store for more information.";

export const hibaTestimonial: Omit<TestimonialSection, "type"> = {
  quote:
    "Andy was so friendly, took my car first thing Saturday morning and applied the Spectre tint. My Polo looks so much better with the back tinted to 22% and the front at 35%. Great customer service and speedy service! I was able to get on with my Saturday and enjoy the day with new car feels!",
  author: "Hiba, NSW",
};

type AccordionItem = AccordionSection["items"][number];

export const lifetimeWarrantyItem = (duration: string): AccordionItem => ({
  title: "Lifetime Warranty",
  html: `<p>Tint a Car have been supplying Australians with all their tinting needs for ${duration} years, but if that isn’t convincing enough we’re now making the commitment and offering a Lifetime Warranty on most of our films. This gives you complete peace of mind on your tint for your vehicle, home or office.</p>`,
});

export const arpansaItem = (certificateUrl?: string): AccordionItem => ({
  title: "ARPANSA Certified",
  html:
    "<p>Tint a Car ensure that all of our window films across both automotive and home or office have been ARPANSA certified, meaning that you can trust that you’re getting the highest quality of film with true specifications. It’s just one of the reasons that Tint a Car is Australia’s most trusted tinting network!</p>" +
    (certificateUrl ? `<p><a href="${certificateUrl}">Download ARPANSA Certificate.</a></p>` : ""),
});

export const buyNowPayLaterItem: AccordionItem = {
  title: "Buy Now. Pay Later. Zero Interest.",
  html: '<p>Tint a Car offers Afterpay and ZIP Pay which means you can split your purchase over various payment schedules with ZERO interest. Get the right look, protection and privacy for your Car Home or Office sooner using one of our associated Buy Now, Pay Later partners!</p>',
};

export const moneyBackItem: AccordionItem = {
  title: "30 Day Money Back Guarantee",
  html: "<p>We offer a 30 day money-back guarantee to all of our customers. Yep, you heard it.<br>If you’re not completely satisfied with your automotive tint from any Tint a Car store, we’ll remove the tint and give you your money back. Must claim within 30 days of sale.</p>",
};
