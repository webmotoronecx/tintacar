import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site.config";

export default function NotFound() {
  return (
    <Section spacing="lg">
      <SectionHeading title="Sorry, we can't find that page." as="h1" subtitle="It may have moved, or the link may be out of date." />
      <div className="mt-8 flex flex-wrap gap-4">
        <Button href="/">Back to home</Button>
        <Button href={siteConfig.primaryCta.href} variant="outline">
          {siteConfig.primaryCta.label}
        </Button>
      </div>
    </Section>
  );
}
