import type { StoreLocatorSection } from "@/types/sections";
import { StoreLocator, type LocatorStore } from "@/components/stores/StoreLocator";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site.config";
import { directionsUrl, formatAddress, getStores, mapEmbedUrl, quickQuoteUrl } from "@/lib/stores";

type StoreLocatorBlockProps = Omit<StoreLocatorSection, "type">;

// Server wrapper: prepares a slim store list for the client-side finder
export function StoreLocatorBlock({ id, background, spacing = "md", title, intro }: StoreLocatorBlockProps) {
  const stores: LocatorStore[] = getStores().map((store) => {
    const addressLine = formatAddress(store);
    return {
      slug: store.slug,
      name: store.name,
      state: store.address.state,
      addressLine,
      phone: store.phone,
      lat: store.lat,
      lng: store.lng,
      mapUrl: mapEmbedUrl(store),
      directionsUrl: directionsUrl(store),
      enquireHref: quickQuoteUrl(store),
      searchText: `${store.name} ${addressLine}`.toLowerCase(),
    };
  });

  return (
    <Section id={id} background={background} spacing={spacing}>
      {title && <SectionHeading title={title} as="h1" size="lg" subtitle={intro} className="mb-8" />}
      <StoreLocator stores={stores} brandName={siteConfig.name} region={siteConfig.country} />
    </Section>
  );
}
