import type { ReactNode } from "react";
import type { Store } from "@/types/content";
import { Button } from "@/components/ui/Button";
import { RichText } from "@/components/ui/RichText";
import { SocialIcons } from "@/components/ui/SocialIcon";
import { formatAddress, mapEmbedUrl } from "@/lib/stores";
import type { SocialLink } from "@/types/site";

type StoreDetailsProps = {
  store: Store;
  /** Where the EMAIL button goes, e.g. the Quick Quote form with this store preselected */
  enquireHref: string;
  enquireLabel?: string;
  /** Extra blocks shown between the store details and the store description, e.g. reviews */
  children?: ReactNode;
};

function telHref(phone: string): string {
  return `tel:${phone.replace(/[^0-9+]/g, "")}`;
}

// Single store: contact details, services, opening hours and map
export function StoreDetails({ store, enquireHref, enquireLabel = "Enquire now", children }: StoreDetailsProps) {
  const socials: SocialLink[] = [
    ...(store.socials.facebook ? [{ platform: "facebook" as const, href: store.socials.facebook }] : []),
    ...(store.socials.instagram ? [{ platform: "instagram" as const, href: store.socials.instagram }] : []),
  ];

  return (
    <div>
      <h1 className="text-[28px] font-bold leading-tight text-heading md:text-[34px]">{store.name}</h1>
      {/* Read by the existing GTM store_name variable (h3.entry-post-title) */}
      <h3 className="entry-post-title" hidden>
        {store.name}
      </h3>
      <dl className="mt-4 space-y-2">
        <div>
          <dt className="inline font-bold">Address: </dt>
          <dd className="inline">{formatAddress(store)}</dd>
        </div>
        {store.phone && (
          <div>
            <dt className="inline font-bold">Phone: </dt>
            <dd className="inline">
              <a href={telHref(store.phone)} className="inline-block py-1 hover:text-brand">
                {store.phone}
              </a>
            </dd>
          </div>
        )}
      </dl>

      <div className="mt-6 grid gap-8 md:grid-cols-2 lg:grid-cols-[1fr_1fr_2fr]">
        <section aria-labelledby="store-services" className="lg:border-r lg:border-line lg:pr-6">
          <h2 id="store-services" className="text-[18px] font-semibold text-brand">
            Services at {store.name}
          </h2>
          {store.services.map((group) => (
            <div key={group.title} className="mt-4">
              <h3 className="font-heading text-[15px] font-bold">{group.title}</h3>
              <ul className="mt-1 list-disc space-y-1 pl-8">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section aria-labelledby="store-hours">
          <h2 id="store-hours" className="text-[18px] font-semibold text-brand">
            Business Hours:
          </h2>
          <ul className="mt-3 space-y-1">
            {store.hours.map((entry) => (
              <li key={entry.day}>
                {entry.day}: {entry.hours}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col items-start gap-4">
            {store.phone && (
              <Button href={telHref(store.phone)} className="w-[200px]">
                Call us today
              </Button>
            )}
            <Button href={enquireHref} className="w-[200px]">
              {enquireLabel}
            </Button>
          </div>
          {socials.length > 0 && <SocialIcons links={socials} className="mt-6 flex gap-4" iconClassName="h-6 w-6 text-ink" />}
        </section>

        <div className="min-h-[320px] bg-panel md:col-span-2 lg:col-span-1">
          <iframe
            src={mapEmbedUrl(store)}
            title={`Map of ${store.name}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full min-h-[320px] w-full border-0"
          />
        </div>
      </div>

      {children}

      {store.descriptionHtml && <RichText html={store.descriptionHtml} className="mt-8 border-b border-line pb-10" />}
    </div>
  );
}
