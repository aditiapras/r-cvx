import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string; // ISO or display
  href: string;
  imageSrc: string;
  category?: string;
}

interface BlogSectionProps {
  heading?: string;
  subheading?: string;
  posts?: BlogPost[];
}

export function BlogSection({
  heading = "Blog",
  subheading = "Insights, tutorials, and thoughts on modern software development",
  posts = [
    {
      id: "p1",
      title: "The Future of Web Development: What's Next in 2024",
      excerpt:
        "Explore the latest trends in web development, from AI-powered tools to new frameworks that are reshaping...",
      author: "Sarah Chen",
      date: "2024-01-15",
      href: "/informasi",
      imageSrc: "/IMG_8951.jpg",
      category: "Web Development",
    },
    {
      id: "p2",
      title: "Building Scalable APIs with Modern Architecture Patterns",
      excerpt:
        "Learn about microservices, GraphQL, and event-driven architectures that are powering today's most successful...",
      author: "Marcus Rodriguez",
      date: "2024-01-12",
      href: "/informasi",
      imageSrc: "/IMG_8997.jpg",
      category: "Backend",
    },
    {
      id: "p3",
      title: "Design Systems: Creating Consistency at Scale",
      excerpt:
        "How leading companies are implementing design systems to maintain visual consistency across product...",
      author: "Emma Thompson",
      date: "2024-01-10",
      href: "/informasi",
      imageSrc: "/IMG_9021.jpg",
      category: "Design",
    },
  ],
}: BlogSectionProps) {
  return (
    <section aria-labelledby="blog-heading" className="py-20 mx-auto">
      <div className="container">
        <header className="mb-10">
          <h2 id="blog-heading" className="text-4xl font-bold tracking-tight">
            {heading}
          </h2>
          <p className="text-muted-foreground mt-2 max-w-2xl">{subheading}</p>
        </header>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.id} className="group">
              <Card className="overflow-hidden border bg-card shadow-xs transition-all hover:shadow-md">
                <Link href={post.href} aria-label={post.title}>
                  <div className="p-4">
                    <div className="mb-4">
                      <AspectRatio ratio={16 / 9}>
                        <Image
                          src={post.imageSrc}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="rounded-md object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                          priority={false}
                        />
                      </AspectRatio>
                    </div>

                    {post.category && (
                      <Badge variant="secondary" className="mb-3">
                        {post.category}
                      </Badge>
                    )}

                    <h3 className="text-xl font-semibold leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground mt-2 text-sm">
                      {post.excerpt}
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        <span>{post.author}</span>
                        <span className="mx-2">•</span>
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString(undefined, {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </time>
                      </div>
                      <span className="inline-flex items-center text-sm font-medium">
                        Read More
                        <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Card>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
