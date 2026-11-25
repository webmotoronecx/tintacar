"use client";

import { useEffect, useState, type FocusEvent, type KeyboardEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavItem, NavLink } from "@/types/site";

type DesktopNavProps = {
  items: NavItem[];
};

function isActive(pathname: string, item: NavItem): boolean {
  const hrefs = [item.href, ...(item.links ?? []).map((l) => l.href), ...(item.groups ?? []).flatMap((g) => g.links.map((l) => l.href))];
  return hrefs.some((href) => href !== "/" && pathname.startsWith(href));
}

function DropdownLink({ link }: { link: NavLink }) {
  return (
    <li className="border-b border-white/10 last:border-b-0">
      <Link href={link.href} className="block px-1.5 py-3 text-[12px] uppercase leading-5 text-white transition-colors hover:text-brand">
        {link.label}
      </Link>
    </li>
  );
}

// Hover/focus driven dropdowns; the mega menu centres on the header so it never overflows the viewport
export function DesktopNav({ items }: DesktopNavProps) {
  const pathname = usePathname();
  const [dismissed, setDismissed] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  // Escape hides the open dropdown until the pointer/focus leaves that item
  const handleKeyDown = (label: string) => (event: KeyboardEvent) => {
    if (event.key === "Escape") setDismissed(label);
  };
  const handleBlur = (event: FocusEvent<HTMLLIElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setDismissed(null);
  };

  // A dropdown opened by hover must also close on Escape while focus is elsewhere (WCAG 1.4.13)
  useEffect(() => {
    if (!hovered) return;
    const closeOnEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setDismissed(hovered);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [hovered]);

  return (
    <nav aria-label="Main navigation" className="hidden nav:block">
      <ul className="flex items-center gap-5 xl:gap-11">
        {items.map((item) => {
          const hasDropdown = Boolean(item.groups?.length || item.links?.length);
          const active = isActive(pathname, item);

          return (
            <li
              key={item.label}
              className={cn("group", item.groups ? "static" : "relative", dismissed === item.label && "[&>div]:hidden")}
              onKeyDown={handleKeyDown(item.label)}
              onBlur={handleBlur}
              onMouseEnter={() => setHovered(item.label)}
              onMouseLeave={() => {
                setHovered(null);
                setDismissed(null);
              }}
            >
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-1.5 py-[34px] text-[13px] font-bold uppercase leading-6 transition-colors hover:text-brand",
                  active ? "text-brand" : "text-ink",
                )}
              >
                {item.label}
                {hasDropdown && <ChevronDown aria-hidden="true" className="h-3 w-3 opacity-60" />}
              </Link>

              {item.groups && (
                <div className="invisible absolute top-full left-1/2 z-50 w-[min(800px,calc(100vw-2rem))] -translate-x-1/2 border-b-2 border-brand bg-night px-[30px] py-[60px] opacity-0 transition-opacity duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <div className="grid grid-cols-3 gap-[60px]">
                    {item.groups.map((group) => (
                      <div key={group.label}>
                        {group.href ? (
                          <Link href={group.href} className="mb-3 block text-[14px] uppercase text-brand hover:text-white">
                            {group.label}
                          </Link>
                        ) : (
                          <p className="mb-3 text-[13px] uppercase text-brand">{group.label}</p>
                        )}
                        <ul>
                          {group.links.map((link) => (
                            <DropdownLink key={link.href} link={link} />
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {item.links && (
                <div className="invisible absolute top-full left-0 z-50 w-[270px] border-b-2 border-brand bg-night px-[30px] py-[15px] opacity-0 transition-opacity duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <ul>
                    {item.links.map((link) => (
                      <DropdownLink key={link.href} link={link} />
                    ))}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
