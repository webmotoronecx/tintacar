import type { StoreLocatorSection } from "@/types/sections";
import { StoreLocator, type LocatorStore } from "@/components/stores/StoreLocator";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site.config";
import { locatorCategories } from "@/config/store-locator";
import { storeCategories } from "@/lib/locator";
import { directionsUrl, formatAddress, getStores, mapEmbedUrl, quickQuoteUrl } from "@/lib/stores";

type StoreLocatorBlockProps = Omit<StoreLocatorSection, "type">;

// Server wrapper: prepares a slim store list for the client-side finder
export function StoreLocatorBlock({ id, background, spacing = "md", title, hideTitle, intro, listTitle }: StoreLocatorBlockProps) {
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
      pageHref: `/store/${store.slug}/`,
      mapUrl: mapEmbedUrl(store),
      directionsUrl: directionsUrl(store),
      enquireHref: quickQuoteUrl(store),
      categories: storeCategories(store.services, locatorCategories),
      searchText: `${store.name} ${addressLine}`.toLowerCase(),
    };
  });

  return (
    <Section id={id} background={background} spacing={spacing}>
      {title && (hideTitle ? <h1 className="sr-only">{title}</h1> : <SectionHeading title={title} as="h1" size="lg" subtitle={intro} className="mb-8" />)}
      <StoreLocator
        stores={stores}
        brandName={siteConfig.name}
        region={siteConfig.country}
        categories={locatorCategories.map((category) => category.label)}
        mapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
        listTitle={listTitle}
      />
    </Section>
  );
}
