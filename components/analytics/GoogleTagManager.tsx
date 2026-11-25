import Script from "next/script";
import { gtmSnippet } from "@/lib/analytics";

type GoogleTagManagerProps = {
  gtmId: string;
  hosts: readonly string[];
};

// Fallback container for visitors without JavaScript; render it first inside <body>
export function GoogleTagManagerNoScript({ gtmId }: { gtmId: string }) {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${encodeURIComponent(gtmId)}`}
        title="Google Tag Manager"
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}

// Loads the GTM container after hydration on the configured hosts only
export function GoogleTagManager({ gtmId, hosts }: GoogleTagManagerProps) {
  return (
    <Script id="gtm-loader" strategy="afterInteractive">
      {gtmSnippet(gtmId, hosts)}
    </Script>
  );
}
