"use client";

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface Slide {
  image: string;
  badge?: string;
  heading: string;
  subheading: string;
  description: string;
  primaryCTA: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
}

interface HeroKidsProps {
  slides?: Slide[];
  autoplayInterval?: number;
}

const defaultSlides: Slide[] = [
  {
    image: "/IMG_8997.jpg",
    badge: "Pendaftaran Dibuka 2025",
    heading: "Belajar dengan Cara yang Menyenangkan",
    subheading: "Tempat Terbaik untuk Tumbuh & Berkembang",
    description:
      "Bergabunglah dengan kami untuk pengalaman belajar yang penuh kreativitas dan kegembiraan.",
    primaryCTA: {
      text: "Daftar Sekarang",
      href: "/admission",
    },
    secondaryCTA: {
      text: "Lihat Program",
      href: "/tentang",
    },
  },
  {
    image: "/IMG_8951.jpg",
    badge: "Program Unggulan",
    heading: "Fasilitas Modern & Lengkap",
    subheading: "Ruang Kelas Nyaman & Aman",
    description:
      "Dilengkapi dengan fasilitas terbaik untuk mendukung proses belajar mengajar yang optimal.",
    primaryCTA: {
      text: "Lihat Fasilitas",
      href: "/tentang",
    },
    secondaryCTA: {
      text: "Hubungi Kami",
      href: "/kontak",
    },
  },
  {
    image: "/IMG_9021.jpg",
    badge: "Tenaga Pengajar",
    heading: "Guru Berpengalaman & Profesional",
    subheading: "Didik dengan Kasih Sayang",
    description:
      "Tim pengajar kami berdedikasi untuk memberikan pendidikan terbaik dengan pendekatan yang penuh perhatian.",
    primaryCTA: {
      text: "Kenali Tim Kami",
      href: "/tentang",
    },
  },
];

export function HeroKids({
  slides = defaultSlides,
  autoplayInterval = 5000,
}: HeroKidsProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  useEffect(() => {
    if (!isAutoplay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, autoplayInterval);

    return () => clearInterval(interval);
  }, [isAutoplay, slides.length, autoplayInterval]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoplay(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoplay(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoplay(false);
  };

  const slide = slides[currentSlide];

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Images with Transition */}
      {slides.map((s) => (
        <div
          key={s.image}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            slides.indexOf(s) === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={s.image}
            alt={s.heading}
            fill
            className="object-cover"
            priority={slides.indexOf(s) === 0}
          />
        </div>
      ))}

      {/* Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/10 to-black/10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_75%,rgba(0,0,0,0.4)_100%)]"></div>

      {/* Content */}
      <div className="container relative z-10 flex h-full items-center">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          {slide.badge && (
            <div className="mb-6 inline-block animate-fade-in">
              <span className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-white border border-white/30">
                {slide.badge}
              </span>
            </div>
          )}

          {/* Heading */}
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl animate-fade-in">
            {slide.heading}
          </h1>

          {/* Subheading */}
          <p className="mb-6 text-xl font-semibold text-white/90 sm:text-2xl md:text-3xl animate-fade-in">
            {slide.subheading}
          </p>

          {/* Description */}
          <p className="mx-auto mb-10 max-w-2xl text-base text-white/80 sm:text-lg animate-fade-in">
            {slide.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-4 animate-fade-in">
            <Button
              asChild
              size="lg"
              className="bg-white hover:bg-white/90 text-purple-600 font-semibold px-8 h-12 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <Link href={slide.primaryCTA.href}>
                {slide.primaryCTA.text}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            {slide.secondaryCTA && (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white/80 text-white hover:bg-white/10 backdrop-blur-sm font-semibold px-8 h-12 rounded-lg transition-all"
              >
                <Link href={slide.secondaryCTA.href}>
                  {slide.secondaryCTA.text}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        type="button"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        type="button"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((s, index) => (
          <button
            key={s.image}
            type="button"
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide
                ? "w-8 bg-white"
                : "w-2 bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
