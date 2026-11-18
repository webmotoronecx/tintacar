import { Button } from "@/components/ui/Button";
import { Divider } from "@/components/ui/Divider";

type QuoteCtaBoxProps = {
  title?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
};

// Sidebar call-to-action shown beside long-form content
export function QuoteCtaBox({ title = "Get a Quick Quote", primary, secondary }: QuoteCtaBoxProps) {
  return (
    <div className="flex flex-col items-center bg-white px-6 py-8 text-center lg:border lg:border-[#efefef]">
      <p className="font-heading text-[30px] leading-tight text-heading">{title}</p>
      <Divider align="center" className="mt-5" />
      <Button href={primary.href} className="mt-8 w-full max-w-[250px]">
        {primary.label}
      </Button>
      {secondary && (
        <Button href={secondary.href} variant="muted" className="mt-4 w-full max-w-[160px]">
          {secondary.label}
        </Button>
      )}
    </div>
  );
}
