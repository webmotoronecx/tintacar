import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SmartLink } from "./SmartLink";

export type ButtonVariant = "solid" | "outline" | "outline-light" | "outline-white" | "outline-black" | "white" | "muted";
export type ButtonSize = "sm" | "md" | "lg";

const VARIANTS: Record<ButtonVariant, string> = {
  solid: "border-brand bg-brand text-white hover:border-brand-dark hover:bg-brand-dark",
  outline: "border-brand bg-transparent text-ink hover:bg-brand hover:text-white",
  "outline-light": "border-brand bg-transparent text-white hover:bg-brand",
  "outline-white": "border-white bg-transparent text-white hover:bg-white hover:text-ink",
  "outline-black": "border-black bg-transparent text-ink hover:bg-black hover:text-white",
  white: "border-white bg-white text-ink hover:border-ink hover:bg-ink hover:text-white",
  muted: "border-transparent bg-[#e2e2e2] text-ink hover:bg-brand hover:text-white",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "px-6 py-2 text-[13px]",
  md: "px-[30px] py-3 text-[13px]",
  lg: "px-10 py-[14px] text-[15px]",
};

export function buttonClasses(variant: ButtonVariant = "solid", size: ButtonSize = "md", className?: string): string {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full border-2 font-body font-bold uppercase leading-5 tracking-normal transition-colors duration-200",
    VARIANTS[variant],
    SIZES[size],
    className,
  );
}

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
} & (
  | { href: string; type?: never; onClick?: never; disabled?: never }
  | ({ href?: undefined } & Pick<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "onClick" | "disabled">)
);

export function Button({ variant, size, className, children, href, ...rest }: ButtonProps) {
  const classes = buttonClasses(variant, size, className);

  if (href) {
    return (
      <SmartLink href={href} className={classes}>
        {children}
      </SmartLink>
    );
  }

  return (
    <button className={cn(classes, "cursor-pointer disabled:cursor-not-allowed disabled:opacity-60")} type="button" {...rest}>
      {children}
    </button>
  );
}
