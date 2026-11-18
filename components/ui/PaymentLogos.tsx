import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type PaymentLogosProps = {
  className?: string;
  light?: boolean;
};

// Afterpay + Zip badges linking to their info pages
export function PaymentLogos({ className, light }: PaymentLogosProps) {
  const imageClasses = cn("h-7 w-auto", light && "brightness-0 invert");

  return (
    <div className={cn("flex items-center gap-10", className)}>
      <Link href="/articles/afterpay/" aria-label="Afterpay">
        <Image src="/images/brand/afterpay.png" alt="Afterpay" width={121} height={46} className={imageClasses} />
      </Link>
      <Link href="/articles/zip-pay/" aria-label="Zip Pay">
        <Image src="/images/brand/zip.png" alt="Zip Pay" width={82} height={46} className={imageClasses} />
      </Link>
    </div>
  );
}
