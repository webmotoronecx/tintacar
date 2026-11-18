import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { StoreDetails } from "@/components/stores/StoreDetails";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site.config";
import { getStoreBySlug, getStores } from "@/lib/stores";
import type { Store } from "@/types/content";

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
    description: store.seo.description,
    alternates: { canonical: `/store/${store.slug}/` },
  };
}

function localBusinessJsonLd(store: Store) {
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
  };
}

export default async function StorePage({ params }: StorePageProps) {
  const { slug } = await params;
  const store = getStoreBySlug(slug);
  if (!store) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd(store)).replace(/</g, "\\u003c") }}
      />
      <Section spacing="md">
        <StoreDetails store={store} />
      </Section>
      <Section id="enquire" spacing="md" background="mist" className="scroll-mt-28">
        <SectionHeading title={`Enquire with ${store.name}`} size="md" className="mb-8" />
        <EnquiryForm storeSlug={store.slug} storeName={store.name} fallbackContact={siteConfig.phone.label.toLowerCase()} />
      </Section>
    </>
  );
}
