import type { SiteConfig } from "@/types/site";

// Per-client settings: brand, contact details, navigation and footer
export const siteConfig: SiteConfig = {
  name: "Tint a Car",
  legalName: "Tint a Car",
  url: "https://tintacar.com.au",
  tagline: "Protects Best.",
  defaultTitle: "Window Tinting for Car, Home & Office - Tint a Car",
  country: "Australia",
  description:
    "Get window tinting for your car, home & office. Call 13TINT for a free measure & quote! Improve privacy, reflect 99% of UV & reject solar heat and more.",
  phone: { label: "Call 13 TINT", display: "13 84 68", href: "tel:138468" },
  logo: {
    src: "/images/brand/logo.png",
    footerSrc: "/images/brand/logo-footer.png",
    alt: "Tint a Car - Protects Best.",
    width: 400,
    height: 99,
    mobile: { src: "/images/brand/logo-mobile.png", width: 273, height: 66 },
  },
  announcement: {
    html: 'Get interest free with <a href="/articles/afterpay/">Afterpay</a> or <a href="/articles/zip-pay/">ZIP Pay</a>.&nbsp; Shop Now, Pay Later.',
  },
  primaryCta: { label: "Find your nearest store", href: "/contact-a-store/" },
  quoteCta: { label: "Enquire now", href: "/contact-a-store/" },
  nav: [
    {
      label: "Car",
      href: "/car-window-tint/",
      groups: [
        {
          label: "Window Tinting",
          href: "/car-window-tint/",
          links: [
            { label: "Spectre Ceramic Tint", href: "/car-window-tint/ceramic-window-tint/" },
            { label: "Octane Darkest Legal Tint", href: "/car-window-tint/darkest-legal-tint/" },
            { label: "Black Panther Window Tint", href: "/car-window-tint/black-panther-window-tint/" },
          ],
        },
        {
          label: "Protection Products",
          href: "/protection-products/",
          links: [
            { label: "EliteX Graphene Surface Protection", href: "/protection-products/elitex-graphene-surface-protection/" },
            { label: "Paint Protection Film", href: "/protection-products/paint-protection-film/" },
            { label: "Car Care", href: "/car-care/" },
            { label: "Sunroof Protection Film", href: "/car-window-tint/sunroof-film/" },
          ],
        },
        {
          label: "Electronics",
          href: "/electronics/",
          links: [{ label: "FineVu Dashcams", href: "/finevu-dashcams/" }],
        },
      ],
    },
    {
      label: "Home",
      href: "/home-tint/",
      links: [
        { label: "Reduce Heat", href: "/home-tint/heat/" },
        { label: "Reduce Glare", href: "/home-tint/glare/" },
        { label: "Avoid Fade", href: "/home-tint/fade/" },
        { label: "Added Security", href: "/home-tint/security/" },
        { label: "More Privacy", href: "/home-tint/privacy/" },
        { label: "Extra Safety", href: "/home-tint/safety/" },
        { label: "Decorative", href: "/home-tint/decorative-film/" },
        { label: "Office", href: "/office/" },
      ],
    },
    { label: "Careers", href: "/careers/" },
    { label: "Contact", href: "/contact-a-store/" },
  ],
  footer: {
    blurb: "For over 50 years Tint a Car have pushed the limits of innovation, quality and all round family protection.",
    columns: [
      {
        title: "Products",
        links: [
          { label: "Car Window Tinting", href: "/car-window-tint/" },
          { label: "Home Tinting", href: "/home-tint/" },
          { label: "Office Tinting", href: "/office/" },
          { label: "Protection Products", href: "/protection-products/" },
          { label: "Car Care", href: "/car-care/" },
        ],
      },
      {
        title: "About",
        links: [
          { label: "Why Choose Tint a Car", href: "/why-choose/" },
          { label: "Window Tinting Articles", href: "/articles/" },
          { label: "Afterpay", href: "/articles/afterpay/" },
          { label: "Zip Pay", href: "/articles/zip-pay/" },
        ],
      },
      {
        title: "Careers",
        links: [{ label: "Careers", href: "/careers/" }],
      },
    ],
    legal: [
      { label: "SDS", href: "/sds/" },
      { label: "Quality Policy", href: "/quality-policy/" },
      { label: "Privacy Policy", href: "https://motoronegroup.com/privacy-policy/" },
      { label: "Privacy Collection Statement", href: "https://motoronegroup.com/privacy-collection/" },
    ],
  },
  socials: [
    { platform: "facebook", href: "https://www.facebook.com/TintACarAus/" },
    { platform: "instagram", href: "https://www.instagram.com/tintacar/" },
  ],
  // Same GTM container as the WordPress site: GA4 G-2KLYFZFFKH, Google Ads AW-983093299, Bing UET, Meta Pixel, Clarity
  analytics: {
    gtmId: "GTM-MM6K7BK",
    hosts: ["tintacar.com.au", "www.tintacar.com.au"],
    // The container's lead triggers still listen for the old Contact Form 7 event name
    leadEvent: "cf7submission",
  },
  verification: { google: "ADe_PioCn6vY8Tsh1pO7WekABwNufl05GRuXp4OFhBY" },
};
