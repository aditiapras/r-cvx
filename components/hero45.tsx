import { HandHelping, Users, Zap } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Hero45Props {
  badge?: string;
  heading: string;
  imageSrc?: string;
  imageAlt?: string;
  features?: Feature[];
}


const Hero45 = ({
  badge = "shadcnblocks.com",
  heading = "Blocks built with Shadcn & Tailwind",
  imageSrc = "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
  imageAlt = "placeholder",
  features = [
    {
      icon: <HandHelping className="h-auto w-5" />,
      title: "Flexible Support",
      description:
        "Benefit from around-the-clock assistance to keep your business running smoothly.",
    },
    {
      icon: <Users className="h-auto w-5" />,
      title: "Collaborative Tools",
      description:
        "Enhance teamwork with tools designed to simplify project management and communication.",
    },
    {
      icon: <Zap className="h-auto w-5" />,
      title: "Lightning Fast Speed",
      description:
        "Experience the fastest load times with our high performance servers.",
    },
  ],
}: Hero45Props) => {
  return (
    <section className="relative overflow-hidden py-16 w-full flex items-center justify-center">
      {/* Radial Gradient Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(125% 125% at 50% 90%, #fff 40%, #7c3aed 100%)",
        }}
      />
      {/* Abstract Background Shapes */}
      <div className="absolute inset-0 overflow-hidden z-10">
        {/* Large gradient circles */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl"></div>

        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-20 w-20 h-20 bg-gradient-to-br from-blue-300/20 to-purple-300/20 rotate-45 rounded-lg"></div>
        <div className="absolute top-40 right-32 w-16 h-16 bg-gradient-to-br from-purple-300/20 to-pink-300/20 rounded-full"></div>
        <div className="absolute bottom-32 left-32 w-12 h-12 bg-gradient-to-br from-pink-300/20 to-blue-300/20 rotate-12 rounded-lg"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-br from-blue-300/20 to-purple-300/20 rounded-full blur-sm"></div>

        {/* Abstract SVG shapes */}
        <svg className="absolute top-0 left-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.1 }} />
              <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.1 }} />
            </linearGradient>
          </defs>
          <path d="M0,50 Q25,25 50,50 T100,50 L100,100 L0,100 Z" fill="url(#grad1)" />
          <path d="M20,30 Q40,10 60,30 Q80,50 100,30 L100,80 Q80,100 60,80 Q40,60 20,80 Z" fill="url(#grad1)" opacity="0.5" />
        </svg>
      </div>

      <div className="relative container overflow-hidden z-20">
        <div className="mb-20 flex flex-col items-center gap-6 text-center">
          <Badge variant="outline">{badge}</Badge>
          <h1 className="text-4xl font-semibold lg:text-5xl">{heading}</h1>
        </div>
        <div className="relative mx-auto max-w-5xl">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={500}
            height={500}
            className="aspect-video max-h-[500px] w-full rounded-xl object-cover"
          />
          <div className="bg-linear-to-t from-background absolute inset-0 via-transparent to-transparent"></div>
          <div className="absolute -right-28 -top-28 -z-10 aspect-video h-72 w-96 opacity-40 [background-size:12px_12px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_20%,transparent_100%)] sm:bg-[radial-gradient(hsl(var(--muted-foreground))_1px,transparent_1px)]"></div>
          <div className="absolute -left-28 -top-28 -z-10 aspect-video h-72 w-96 opacity-40 [background-size:12px_12px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_20%,transparent_100%)] sm:bg-[radial-gradient(hsl(var(--muted-foreground))_1px,transparent_1px)]"></div>
        </div>
        <div className="mx-auto mt-10 flex max-w-5xl flex-col md:flex-row">
          {features.map((feature, index) => (
            <React.Fragment key={feature.title}>
              {index > 0 && (
                <Separator
                  orientation="vertical"
                  className="bg-linear-to-b from-muted to-muted mx-6 hidden h-auto w-[2px] via-transparent md:block"
                />
              )}
              <div
                className="bg-background flex grow basis-0 flex-col rounded-md p-4"
              >
                <div className="bg-background mb-6 flex size-10 items-center justify-center rounded-full drop-shadow-lg">
                  {feature.icon}
                </div>
                <h3 className="mb-2 font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Hero45 };
