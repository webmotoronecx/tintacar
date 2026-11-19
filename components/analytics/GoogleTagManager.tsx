import Script from "next/script";
import { gtmSnippet } from "@/lib/analytics";

type GoogleTagManagerProps = {
  gtmId: string;
  hosts: readonly string[];
};

// Loads the GTM container after hydration on the configured hosts only
export function GoogleTagManager({ gtmId, hosts }: GoogleTagManagerProps) {
  return (
    <Script id="gtm-loader" strategy="afterInteractive">
      {gtmSnippet(gtmId, hosts)}
    </Script>
  );
}
