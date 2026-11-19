import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { QuoteCtaBox } from "@/components/articles/QuoteCtaBox";
import { ZipLandingWidget } from "@/components/articles/ZipLandingWidget";
import { RichText } from "@/components/ui/RichText";
import { Section } from "@/components/ui/Section";
import { siteConfig } from "@/config/site.config";
import { getArticle, getArticleSummaries } from "@/lib/articles";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getArticleSummaries().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  const path = `/articles/${article.slug}/`;
  return {
    title: { absolute: article.seo.title || `${article.title} - ${siteConfig.name}` },
    description: article.seo.description || article.excerpt,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: path,
      title: article.title,
      description: article.seo.description || article.excerpt,
      publishedTime: article.date,
      modifiedTime: article.modified,
      ...(article.image ? { images: [{ url: article.image.src }] } : {}),
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    datePublished: article.date,
    dateModified: article.modified,
    publisher: { "@type": "Organization", name: siteConfig.name },
    mainEntityOfPage: `${siteConfig.url}/articles/${article.slug}/`,
  };

  return (
    <Section spacing="md">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <h1 className="text-[28px] font-bold leading-tight text-heading md:text-[32px]">{article.title}</h1>
      <nav aria-label="Breadcrumb" className="mt-2 text-[13px]">
        <Link href="/articles/" className="inline-block py-1 underline hover:text-brand">
          Articles
        </Link>
        <span aria-hidden="true"> &gt; </span>
        <span aria-current="page">{article.title}</span>
      </nav>

      <div className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0">
          <RichText html={article.html} className="text-[13px] leading-[1.9]" />
          {article.embed === "zip-landing" && <ZipLandingWidget />}
        </div>
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <QuoteCtaBox primary={siteConfig.primaryCta} secondary={{ label: "Call 13TINT", href: siteConfig.phone.href }} />
        </aside>
      </div>
    </Section>
  );
}
