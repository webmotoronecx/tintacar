"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavItem, NavLink } from "@/types/site";

type MobileNavProps = {
  items: NavItem[];
  cta: NavLink;
};

function SubLinks({ links, onNavigate }: { links: NavLink[]; onNavigate: () => void }) {
  return (
    <ul className="pb-2 pl-4">
      {links.map((link) => (
        <li key={link.href}>
          <Link href={link.href} onClick={onNavigate} className="block py-2 text-[13px] uppercase text-ink hover:text-brand">
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

// Hamburger menu with collapsible sub-menus for small screens
export function MobileNav({ items, cta }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close the drawer after a link is followed
  const close = () => {
    setIsOpen(false);
    setExpanded(null);
  };

  const toggleItem = (label: string) => setExpanded((current) => (current === label ? null : label));

  // Escape closes the menu and hands focus back to the hamburger
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key !== "Escape" || !isOpen) return;
    close();
    toggleRef.current?.focus();
  };

  return (
    <div className="nav:hidden" onKeyDown={handleKeyDown}>
      <button
        ref={toggleRef}
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        className="flex h-11 w-11 items-center justify-center text-ink"
      >
        {isOpen ? <X className="h-7 w-7" strokeWidth={1.5} /> : <Menu className="h-7 w-7" strokeWidth={1.5} />}
      </button>

      <nav
        id="mobile-menu"
        aria-label="Mobile navigation"
        className={cn(
          "absolute inset-x-0 top-full z-40 max-h-[calc(100vh-72px)] overflow-y-auto border-t border-line bg-white shadow-lg",
          isOpen ? "block" : "hidden",
        )}
      >
        <ul className="container-site">
          {items.map((item) => {
            const subLinks = item.links ?? item.groups?.flatMap((g) => (g.href ? [{ label: g.label, href: g.href }, ...g.links] : g.links));
            const isExpanded = expanded === item.label;

            return (
              <li key={item.label} className="border-b border-line">
                <div className="flex items-center justify-between">
                  <Link href={item.href} onClick={close} className="flex-1 py-3 text-[15px] font-bold uppercase text-ink">
                    {item.label}
                  </Link>
                  {subLinks && (
                    <button
                      type="button"
                      onClick={() => toggleItem(item.label)}
                      aria-expanded={isExpanded}
                      aria-label={`${item.label} submenu`}
                      className="flex h-11 w-11 items-center justify-center"
                    >
                      <ChevronDown className={cn("h-4 w-4 transition-transform", isExpanded && "rotate-180")} />
                    </button>
                  )}
                </div>
                {subLinks && isExpanded && <SubLinks links={subLinks} onNavigate={close} />}
              </li>
            );
          })}
          <li className="py-5">
            <Link
              href={cta.href}
              onClick={close}
              className="block rounded-full bg-brand px-6 py-3 text-center text-[13px] font-bold uppercase text-white"
            >
              {cta.label}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
