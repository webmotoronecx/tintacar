import type { ComparisonTableSection } from "@/types/sections";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

type ComparisonTableProps = Omit<ComparisonTableSection, "type">;

// Feature-by-product table; one column can be highlighted in the brand colour
export function ComparisonTable({ id, background, spacing = "md", title, rowHeader, columns, rows, buttonLabel = "Learn more" }: ComparisonTableProps) {
  const cellBase = "px-3 py-3 text-[13px] leading-5 md:px-4";
  const highlightCell = "bg-brand text-white border-b border-white/20";
  // Feature names stay pinned while the product columns scroll on small screens
  const stickyCell = "sticky left-0 z-10 shadow-[1px_0_0_var(--color-line)] md:static md:shadow-none";

  return (
    <Section id={id} background={background} spacing={spacing}>
      {title && <SectionHeading title={title} size="lg" className="mb-12" />}
      <p className="mb-2 text-[12px] text-muted md:hidden">Swipe sideways to compare all tints.</p>
      <div className="overflow-x-auto border border-line shadow-[0_0_6px_rgba(0,0,0,0.05)]">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="bg-white">
              <th scope="col" className={cn(cellBase, stickyCell, "bg-white pt-5 font-heading text-[15px] font-bold text-heading")}>
                {rowHeader}
              </th>
              {columns.map((column) => (
                <th
                  key={column.label}
                  scope="col"
                  className={cn(cellBase, "pt-5 font-heading text-[15px] font-bold", column.highlight ? highlightCell : "text-heading")}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => {
              const rowBg = rowIndex % 2 === 0 ? "bg-panel" : "bg-white";
              return (
                <tr key={row.label} className={rowBg}>
                  <th scope="row" className={cn(cellBase, stickyCell, rowBg, "font-heading font-bold text-heading")}>
                    {row.label}
                  </th>
                  {row.values.map((value, i) => (
                    <td key={columns[i]?.label ?? i} className={cn(cellBase, columns[i]?.highlight ? highlightCell : "text-ink")}>
                      {value}
                    </td>
                  ))}
                </tr>
              );
            })}
            <tr className="bg-white">
              <td className={cn(cellBase, stickyCell, "bg-white")} />
              {columns.map((column) => (
                <td key={column.label} className={cn(cellBase, "py-4", column.highlight && "bg-brand")}>
                  {column.href && (
                    <Button href={column.href} variant={column.highlight ? "white" : "solid"} size="sm" className="w-full rounded-[3px] border-0 py-2 text-[11px]">
                      {buttonLabel}
                    </Button>
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </Section>
  );
}
