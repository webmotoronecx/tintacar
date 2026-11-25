import type { SiteConfig } from "@/types/site";
import { Button } from "@/components/ui/Button";
import { DesktopNav } from "./DesktopNav";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";

type HeaderProps = {
  config: SiteConfig;
};

export function Header({ config }: HeaderProps) {
  const { logo, nav, phone, primaryCta } = config;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_1px_0_rgba(0,0,0,0.06)]">
      <div className="container-site relative flex h-[72px] items-center justify-between gap-4 nav:h-[92px] nav:px-[15px] xl:max-w-[1270px]">
        <MobileNav items={nav} cta={primaryCta} />

        <div className="absolute left-1/2 -translate-x-1/2 nav:static nav:translate-x-0">
          <Logo
            alt={logo.alt}
            desktop={{ src: logo.src, width: logo.width, height: logo.height }}
            mobile={logo.mobile}
            className="w-[122px] nav:w-[160px] xl:w-[212px]"
          />
        </div>

        <DesktopNav items={nav} />

        <div className="flex items-center gap-5 nav:gap-4 xl:gap-5">
          <a href={phone.href} className="font-heading text-[15px] font-bold text-black transition-colors hover:text-brand nav:text-[16px]">
            {phone.label}
          </a>
          <Button href={primaryCta.href} variant="outline" className="hidden px-4 py-[12px] nav:inline-flex xl:px-[30px] xl:py-[14px]">
            {primaryCta.label}
          </Button>
        </div>
      </div>
    </header>
  );
}
