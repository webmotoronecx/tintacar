import type { NextConfig } from "next";
import { loadRedirects } from "./config/redirects";
import { siteConfig } from "./config/site.config";

// Only the live domain may be indexed; vercel.app and preview hosts answer with noindex
const LIVE_HOST = `(www\\.)?${new URL(siteConfig.url).hostname.replace(/\./g, "\\.")}`;

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(self)" },
];

const nextConfig: NextConfig = {
  // Keep the same URL shape as the existing site (/page/)
  trailingSlash: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com" }],
  },
  async redirects() {
    return [
      // As on live: the Quick Quote page needs a store, so without one it goes to the store finder
      {
        source: "/quick-quote/",
        missing: [
          { type: "query", key: "id" },
          { type: "query", key: "store_id" },
        ],
        destination: "/contact-a-store/",
        permanent: true,
      },
      ...loadRedirects(),
    ];
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/:path*", missing: [{ type: "host", value: LIVE_HOST }], headers: [{ key: "X-Robots-Tag", value: "noindex" }] },
    ];
  },
};

export default nextConfig;
