import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StoreDetails } from "@/components/stores/StoreDetails";
import { StoreReviews } from "@/components/stores/StoreReviews";
import { Section } from "@/components/ui/Section";
import { siteConfig } from "@/config/site.config";
import { formatAddress, getStoreBySlug, getStores, quickQuoteUrl } from "@/lib/stores";
import type { Store } from "@/types/content";
import { openingHoursSpecification } from "@/lib/opening-hours";
import { getStoreReviews } from "@/lib/store-reviews";

type StorePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getStores().map((store) => ({ slug: store.slug }));
}

export async function generateMetadata({ params }: StorePageProps): Promise<Metadata> {
  const { slug } = await params;
  const store = getStoreBySlug(slug);
  if (!store) return {};

  return {
    title: { absolute: store.seo.title || `${store.name} - ${siteConfig.name}` },
    // Some imported stores have no description, so fall back to one built from the store details
    description:
      store.seo.description ||
      `${store.name} at ${formatAddress(store)}: window tinting for cars, homes and offices.${store.phone ? ` Call ${store.phone} for a quote.` : ""}`,
    alternates: { canonical: `/store/${store.slug}/` },
  };
}

function localBusinessJsonLd(store: Store) {
  const openingHours = openingHoursSpecification(store.hours ?? []);
  return {
    "@context": "https://schema.org",
    "@type": "AutoPartsStore",
    name: store.name,
    url: `${siteConfig.url}/store/${store.slug}/`,
    telephone: store.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: store.address.street,
      addressLocality: store.address.suburb,
      addressRegion: store.address.state,
      postalCode: store.address.postcode,
      addressCountry: "AU",
    },
    ...(store.lat && store.lng ? { geo: { "@type": "GeoCoordinates", latitude: store.lat, longitude: store.lng } } : {}),
    ...(openingHours.length > 0 ? { openingHoursSpecification: openingHours } : {}),
  };
}

export default async function StorePage({ params }: StorePageProps) {
  const { slug } = await params;
  const store = getStoreBySlug(slug);
  if (!store) notFound();
  const reviews = getStoreReviews(store.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd(store)).replace(/</g, "\\u003c") }}
      />
      <Section spacing="md">
        <StoreDetails store={store} enquireHref={quickQuoteUrl(store)}>
          {reviews && <StoreReviews {...reviews} className="mt-10" />}
        </StoreDetails>
      </Section>
    </>
  );
}
