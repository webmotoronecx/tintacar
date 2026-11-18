export type NavLink = {
  label: string;
  href: string;
};

export type NavGroup = {
  label: string;
  href?: string;
  links: NavLink[];
};

export type NavItem = NavLink & {
  /** Multi-column dropdown (grouped) */
  groups?: NavGroup[];
  /** Single-column dropdown */
  links?: NavLink[];
};

export type FooterColumn = {
  title: string;
  links: NavLink[];
};

export type SocialLink = {
  platform: "facebook" | "instagram" | "youtube" | "linkedin";
  href: string;
};

export type SiteConfig = {
  name: string;
  legalName: string;
  url: string;
  tagline: string;
  defaultTitle: string;
  country: string;
  description: string;
  phone: { label: string; display: string; href: string };
  logo: {
    src: string;
    footerSrc: string;
    alt: string;
    width: number;
    height: number;
    mobile?: { src: string; width: number; height: number };
  };
  announcement: { html: string };
  primaryCta: NavLink;
  quoteCta: NavLink;
  nav: NavItem[];
  footer: {
    blurb: string;
    columns: FooterColumn[];
    legal: NavLink[];
  };
  socials: SocialLink[];
};
