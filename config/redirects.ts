import type { NextConfig } from "next";

type Redirect = Awaited<ReturnType<NonNullable<NextConfig["redirects"]>>>[number];

// Permanent redirects carried over from the existing WordPress site
export const redirects: Redirect[] = [
  { source: "/quick-quote/", destination: "/contact-a-store/", permanent: true },
  { source: "/protection-products/elitex-interior-coating/", destination: "/protection-products/elitex-surface-protection/", permanent: true },
  { source: "/protection-products/elitex-exterior-coating/", destination: "/protection-products/elitex-surface-protection/", permanent: true },
  { source: "/protection-products/elitex-shampoo/", destination: "/car-care/", permanent: true },
  { source: "/custom-wraps/", destination: "/", permanent: true },
  { source: "/car-window-tint/formula-one-tint/", destination: "/", permanent: true },
  { source: "/car-window-tint/darkest-legal-safety-tint/", destination: "/", permanent: true },
  { source: "/privacy-policy/", destination: "https://motoronegroup.com/privacy-policy/", permanent: true },
  // Retired article slugs
  { source: "/articles/openpay/", destination: "/articles/afterpay/", permanent: true },
  { source: "/articles/best-window-tinting-suppliers-for-cars/", destination: "/articles/", permanent: true },
  { source: "/articles/sunblock-window-film/", destination: "/articles/sun-reflective-window-film/", permanent: true },
  { source: "/articles/mobile-car-window-tinting-near-me/", destination: "/articles/mobile-car-tinting/", permanent: true },
  { source: "/articles/mobile-tint/", destination: "/articles/mobile-window-tinting/", permanent: true },
  { source: "/articles/how-to-apply-window-tint/", destination: "/articles/car-window-tint-installation-and-replacing-non-compliant-film/", permanent: true },
  { source: "/articles/installing-tint-on-car-windows/", destination: "/articles/car-window-tint-installation-and-replacing-non-compliant-film/", permanent: true },
  { source: "/articles/what-is-the-darkest-legal-tint-in-a-car/", destination: "/articles/what-percent-is-the-darkest-tint/", permanent: true },
  { source: "/car-window-tint/black-panther/", destination: "/car-window-tint/black-panther-window-tint/", permanent: true },
  { source: "/articles/car-leather-protection/", destination: "/protection-products/elitex-surface-protection/", permanent: true },
  { source: "/articles/midnight-express-tint/", destination: "/car-window-tint/", permanent: true },
  { source: "/articles/darkest-legal-tint/", destination: "/car-window-tint/darkest-legal-tint/", permanent: true },
  { source: "/articles/darkest-legal-car-window-tint-victoria/", destination: "/articles/what-percent-is-the-darkest-tint/", permanent: true },
  { source: "/articles/frosted-film/", destination: "/articles/frosted-window-film/", permanent: true },
  { source: "/articles/home-tinting-2/", destination: "/home-tint/", permanent: true },
  { source: "/articles/how-much-is-window-tinting/", destination: "/articles/how-much-does-it-cost-to-tint-a-car/", permanent: true },
  { source: "/articles/premier-window-tinting/", destination: "/car-window-tint/", permanent: true },
  { source: "/articles/exclusive-window-tinting/", destination: "/home-tint/", permanent: true },
  { source: "/articles/bathroom-window-privacy-glass/", destination: "/articles/frosted-bathroom-window/", permanent: true },
  { source: "/articles/low-e-coating/", destination: "/articles/low-e-window-film/", permanent: true },
  { source: "/articles/uv-protection-window-film/", destination: "/articles/uv-protection-window-films/", permanent: true },
  { source: "/articles/uv-protection-for-car-windows/", destination: "/articles/car-window-tint-uv-protection/", permanent: true },
  { source: "/articles/uv-tinting-film-for-windows/", destination: "/articles/car-window-tint-uv-protection/", permanent: true },
  { source: "/articles/patterned-window-film/", destination: "/articles/coloured-glass-film-for-windows/", permanent: true },
];
