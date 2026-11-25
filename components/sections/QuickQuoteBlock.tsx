import type { QuickQuoteSection } from "@/types/sections";
import { QuickQuoteForm } from "@/components/forms/QuickQuoteForm";
import { Section } from "@/components/ui/Section";
import { quickQuoteConfig } from "@/config/quick-quote";
import { siteConfig } from "@/config/site.config";
import { getStores, toQuickQuoteStore } from "@/lib/stores";

type QuickQuoteBlockProps = Omit<QuickQuoteSection, "type">;

// Server wrapper: hands the form a browser-safe store list (inbox emails stay server-side)
export function QuickQuoteBlock({ id, background, spacing = "sm", formTitle, storeTitle, privacyHtml }: QuickQuoteBlockProps) {
  const stores = getStores()
    .map(toQuickQuoteStore)
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <Section id={id} background={background} spacing={spacing}>
      <QuickQuoteForm
        stores={stores}
        interests={quickQuoteConfig.interests}
        formTitle={formTitle}
        storeTitle={storeTitle}
        privacyHtml={privacyHtml}
        recaptchaSiteKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
        fallbackContact={siteConfig.phone.label.toLowerCase()}
      />
    </Section>
  );
}
