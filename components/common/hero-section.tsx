import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * HeroSection
 * A reusable, responsive hero banner component that mirrors the attached reference:
 * - Large grayscale architectural background image with dark overlay
 * - Headline and subtext aligned to the right
 * - Primary CTA (top-right overlay) and a small bottom-left CTA
 * - Optional slider indicators centered at the bottom
 *
 * Props:
 * - title: Main headline text.
 * - subtitle: Supporting subtext.
 * - backgroundImage: Path or URL for the hero background.
 * - primaryCta: Optional primary call-to-action ({ label, href }).
 * - bottomLeftCta: Optional small CTA placed bottom-left ({ label, href }).
 * - align: Text alignment: 'left' | 'center' | 'right' (default 'right').
 * - showIndicators: Whether to render slider dots at the bottom.
 * - indicatorCount: Number of dots to show (default 5).
 * - activeIndex: Which dot is active (0-based, default 2).
 * - className: Additional container classes.
 *
 * Usage:
 * <HeroSection
 *   title="Build Your Dream Home with us"
 *   subtitle="More than homes — we build dreams."
 *   backgroundImage="/IMG_9059.jpg"
 *   primaryCta={{ label: "Get started", href: "/informasi" }}
 *   bottomLeftCta={{ label: "Try it for free", href: "/informasi" }}
 *   align="right"
 *   showIndicators
 * />
 */
export interface Cta {
  label: string;
  href: string;
}

export interface HeroSectionProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
  primaryCta?: Cta;
  bottomLeftCta?: Cta;
  align?: "left" | "center" | "right";
  showIndicators?: boolean;
  indicatorCount?: number;
  activeIndex?: number;
  className?: string;
}

function HeroSection({
  title,
  subtitle = "",
  backgroundImage,
  primaryCta,
  bottomLeftCta = { label: "Try it for free", href: "/informasi" },
  align = "right",
  showIndicators = true,
  indicatorCount = 5,
  activeIndex = 2,
  className,
}: HeroSectionProps) {
  return (
    <section className={cn("relative w-full", className)} aria-label="Hero">
      <div className="relative mx-auto w-full overflow-hidden rounded-xl md:rounded-2xl">
        {/* Background */}
        <div className="relative h-[420px] sm:h-[520px] md:h-[560px] lg:h-[640px]">
          <Image
            src={backgroundImage}
            alt={title}
            fill
            className="object-cover grayscale"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />

          {/* Bottom-left CTA */}
          {bottomLeftCta ? (
            <div className="absolute bottom-4 left-4 z-10">
              <Link href={bottomLeftCta.href} aria-label={bottomLeftCta.label}>
                <Button
                  size="sm"
                  variant="secondary"
                  className="rounded-full bg-white/90 text-black hover:bg-white"
                >
                  {bottomLeftCta.label}
                  <ChevronRight className="ml-1 size-4" />
                </Button>
              </Link>
            </div>
          ) : null}

          {/* Content */}
          <div
            className={cn(
              "absolute inset-0 z-10 flex items-center",
              align === "left" && "justify-start",
              align === "center" && "justify-center",
              align === "right" && "justify-end"
            )}
          >
            <div className="max-w-xl p-6 md:p-8 lg:p-10">
              <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                {title}
              </h1>
              {subtitle ? (
                <p className="mt-3 text-sm text-white/80 md:text-base">
                  {subtitle}
                </p>
              ) : null}

              {primaryCta ? (
                <div className="mt-5">
                  <Link href={primaryCta.href} aria-label={primaryCta.label}>
                    <Button
                      size="lg"
                      className="bg-white text-black hover:bg-white/90"
                    >
                      {primaryCta.label}
                      <ChevronRight className="ml-2 size-5" />
                    </Button>
                  </Link>
                </div>
              ) : null}
            </div>
          </div>

          {/* Indicators */}
          {showIndicators ? (
            <div className="pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2">
              <div className="flex items-center gap-2">
                {Array.from({ length: Math.max(1, indicatorCount) }).map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "block h-1.5 w-1.5 rounded-full",
                      i === activeIndex ? "bg-white" : "bg-white/50"
                    )}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export { HeroSection };
export default HeroSection;