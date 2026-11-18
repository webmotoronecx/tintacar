import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { isExternalHref } from "@/lib/utils";

type SmartLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  children: ReactNode;
};

// Uses next/link for internal routes and a plain anchor for external, tel: and mailto: links
export function SmartLink({ href, children, ...rest }: SmartLinkProps) {
  if (isExternalHref(href)) {
    const isWeb = /^(https?:)?\/\//.test(href);
    return (
      <a href={href} {...(isWeb ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
}
