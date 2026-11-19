export type DataLayerEvent = { event: string; [key: string]: unknown };

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

const GTM_SRC = "https://www.googletagmanager.com/gtm.js?id=";

function jsLiteral(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

// Inline GTM loader that only runs on the given hosts, or anywhere while GTM preview (?gtm_debug) is open
export function gtmSnippet(gtmId: string, hosts: readonly string[]): string {
  return `(function(w,d,i,h){var l=w.location;if(h.indexOf(l.hostname)<0&&!/[?&]gtm_debug=/.test(l.search))return;w.dataLayer=w.dataLayer||[];w.dataLayer.push({"gtm.start":Date.now(),event:"gtm.js"});var s=d.createElement("script");s.async=true;s.src=${jsLiteral(GTM_SRC)}+encodeURIComponent(i);d.head.appendChild(s);})(window,document,${jsLiteral(gtmId)},${jsLiteral(hosts)});`;
}

// Queues an event for Google Tag Manager; harmless when the container isn't loaded
export function pushDataLayer(event: DataLayerEvent): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(event);
}
