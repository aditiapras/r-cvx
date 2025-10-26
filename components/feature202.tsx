import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Building, Landmark, Cpu, ScanLine } from "lucide-react";

interface FeatureItem {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  icon: React.ReactNode;
  href?: string;
  colSpan?: string; // tailwind col-span utilities per breakpoint
}

const features: FeatureItem[] = [
  {
    id: "sustainable",
    title: "Sustainable Design",
    description:
      "Create eco-friendly spaces that blend innovation with environmental responsibility. Utilizing renewable materials and energy-efficient solutions for tomorrow's world.",
    imageSrc: "/IMG_9059.jpg",
    icon: <Building className="size-5" />,
    colSpan: "lg:col-span-2",
  },
  {
    id: "urban",
    title: "Urban Planning",
    description:
      "Design thriving communities that balance density with livability, fostering growth.",
    imageSrc: "/IMG_8951.jpg",
    icon: <Landmark className="size-5" />,
    colSpan: "lg:col-span-1",
  },
  {
    id: "digital",
    title: "Digital Integration",
    description:
      "Blend smart technology with architectural design, creating responsive spaces for living.",
    imageSrc: "/IMG_8997.jpg",
    icon: <Cpu className="size-5" />,
    colSpan: "lg:col-span-1",
  },
  {
    id: "bim",
    title: "BIM Solutions",
    description:
      "From concept to construction, leverage advanced modeling tools and AI-driven analytics for precise and efficient project delivery.",
    imageSrc: "/IMG_9021.jpg",
    icon: <ScanLine className="size-5" />,
    colSpan: "lg:col-span-2",
  },
];

export function Feature202() {
  return (
    <section aria-labelledby="feature-heading" className="py-24 w-full mx-auto bg-gradient-to-br from-sky-100/50   to-sky-700/20">
      <div className="max-w-7xl mx-auto">
        <header className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
            Architecture
          </p>
          <h2
            id="feature-heading"
            className="mt-3 text-4xl font-bold md:text-5xl"
          >
Riyadh El Jannah Islamic School
          </h2>
          <p className="mt-4 text-muted-foreground">
            Membangun generasi islami yang sehat, suci, cerdas, dan bertaqwa. 
            Dengan dedikasi dan pengabdian terhadap setiap individu, kami berkomitmen untuk memberikan pendidikan yang berkualitas dan mempersiapkan generasi masa depan untuk berpartisipasi dalam masyarakat yang berbasis pada nilai-nilai Islam.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((item, idx) => (
            <article
              key={item.id}
              className={`group relative overflow-hidden rounded-2xl ${item.colSpan ?? ""}`}
            >
              <div className="absolute inset-0">
                <Image
                  src={item.imageSrc}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover  brightness-90 contrast-100 transition-transform duration-500 group-hover:scale-[1.02]"
                  priority={idx === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
              </div>

              <div className="relative z-10 flex h-full flex-col justify-between p-6">
                <div className="flex w-full justify-between">
                  <div className="inline-flex items-center justify-center rounded-md border border-white/20 bg-white/10 p-3 text-white shadow-sm backdrop-blur">
                    {item.icon}
                  </div>
                </div>

                <div className="mt-24">
                  <h3 className="text-white text-lg font-semibold md:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/80 md:text-base">
                    {item.description}
                  </p>
                </div>
              </div>

              <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10 transition-colors group-hover:ring-white/20" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
