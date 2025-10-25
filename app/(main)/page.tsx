import { HeroKids } from "@/components/hero-kids";
import { BlogSection } from "@/components/blog-section";
import { Feature202 } from "@/components/feature202";
import HeroSection from "@/components/common/hero-section";
import HeroComparison from "@/components/common/hero-comparison";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* New reusable hero at top for production preview */}
      <HeroKids />
      <Feature202 />
      <BlogSection />
    </div>
  );
}
