"use client";

import Script from "next/script";

const ZIP_WIDGET_SRC = "https://static.zip.co/lib/js/zm-widget-js/dist/zip-widget.min.js";

// Zip's hosted landing-page widget; set NEXT_PUBLIC_ZIP_MERCHANT_KEY to link it to the merchant account
export function ZipLandingWidget() {
  return (
    <>
      <Script src={ZIP_WIDGET_SRC} strategy="lazyOnload" />
      <div
        zm-asset="landingpage"
        zm-widget="inline"
        data-env="production"
        data-zm-region="au"
        data-zm-merchant={process.env.NEXT_PUBLIC_ZIP_MERCHANT_KEY}
        className="min-h-[200px]"
      />
    </>
  );
}
