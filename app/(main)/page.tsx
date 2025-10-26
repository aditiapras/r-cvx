import { HeroKids } from "@/components/hero-kids";
import { BlogSection } from "@/components/blog-section";
import { Feature202 } from "@/components/feature202";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Feature202 />
      <BlogSection />
      <HeroKids />
    </div>
  );
}
