import Image from "next/image";
import { ChevronRight } from "lucide-react";
import type { SiteConfig } from "@/types/site";
import { Button } from "@/components/ui/Button";
import { SmartLink } from "@/components/ui/SmartLink";
import { SocialIcons } from "@/components/ui/SocialIcon";

type FooterProps = {
  config: SiteConfig;
};

export function Footer({ config }: FooterProps) {
  const { logo, footer, socials, primaryCta, phone } = config;

  return (
    <footer className="bg-ink text-white">
      <div className="container-site grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-[1.65fr_1fr_1fr_1fr] lg:gap-6 lg:py-[30px]">
        <div>
          <Image src={logo.footerSrc} alt={logo.alt} width={logo.width} height={logo.height} className="h-auto w-[250px]" />
          <SocialIcons links={socials} className="mt-4 flex items-center gap-5" iconClassName="h-9 w-9 text-white" />
          <p className="mt-6 max-w-[250px] text-[14px] leading-[1.95] text-[#a7b0b3]">{footer.blurb}</p>
          <div className="mt-6 flex flex-col items-start gap-4">
            <Button href={primaryCta.href} variant="solid">
              {primaryCta.label}
            </Button>
            <Button href={phone.href} variant="outline-light">
              {phone.label}
            </Button>
          </div>
        </div>

        {footer.columns.map((column) => (
          <div key={column.title}>
            <h4 className="text-[25px] font-bold leading-[30px] tracking-[0.02em] text-white">{column.title}</h4>
            <span aria-hidden="true" className="mt-5 block h-[3px] w-[70px] bg-brand" />
            <ul className="mt-12 space-y-1.5">
              {column.links.map((link) => (
                <li key={link.href}>
                  <SmartLink href={link.href} className="group inline-flex items-center gap-2 text-[14px] text-[#e3e3e3] hover:text-brand">
                    <ChevronRight aria-hidden="true" className="h-3 w-3 fill-current" />
                    {link.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/40">
        <ul className="container-site flex flex-wrap items-center justify-center gap-x-8 gap-y-2 py-6 text-[14px]">
          {footer.legal.map((link) => (
            <li key={link.href}>
              <SmartLink href={link.href} className="text-white hover:text-brand">
                {link.label}
              </SmartLink>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
