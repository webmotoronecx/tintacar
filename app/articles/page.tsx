import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArticleGrid } from "@/components/articles/ArticleGrid";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { articlesIndex } from "@/content/articles-index";
import { getArticlesByGroup } from "@/lib/articles";

export const metadata: Metadata = {
  title: { absolute: articlesIndex.seo.title },
  description: articlesIndex.seo.description,
  alternates: { canonical: "/articles/" },
};

export default function ArticlesPage() {
  return (
    <>
      <Section spacing="md">
        <SectionHeading title={articlesIndex.title} as="h1" divider={false} />
        <p className="mt-4 text-[13px] leading-6">{articlesIndex.intro}</p>
      </Section>

      {articlesIndex.groups.map(({ group, title, banner, bannerHref }) => (
        <Section key={group} spacing="sm" className="pb-14">
          <Link href={bannerHref} className="block hover:opacity-90">
            <Image src={banner.src} alt={banner.alt} width={banner.width} height={banner.height} sizes="(min-width: 1200px) 1170px, 100vw" className="h-auto w-full" />
          </Link>
          <SectionHeading title={title} className="mt-10 mb-12" />
          <ArticleGrid articles={getArticlesByGroup(group)} />
        </Section>
      ))}
    </>
  );
}
