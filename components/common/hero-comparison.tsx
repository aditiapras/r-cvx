import HeroSection from "./hero-section";
import { HeroKids } from "@/components/hero-kids";

/**
 * HeroComparison
 * Renders the current implementation (HeroKids) next to the new HeroSection
 * for immediate visual comparison. Toggle or remove as needed.
 */
export function HeroComparison() {
  return (
    <section className="container py-10">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h3 className="mb-3 text-sm font-semibold text-muted-foreground">Current Implementation</h3>
          <HeroKids />
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold text-muted-foreground">New HeroSection</h3>
          <HeroSection
            title="Build Your Dream Home with us"
            subtitle="More than homes — we build dreams."
            backgroundImage="/IMG_9059.jpg"
            primaryCta={{ label: "Get started", href: "/informasi" }}
            bottomLeftCta={{ label: "Try it for free", href: "/informasi" }}
            align="right"
            showIndicators
          />
        </div>
      </div>
    </section>
  );
}

export default HeroComparison;