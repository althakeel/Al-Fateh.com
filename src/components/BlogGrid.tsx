import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";
import { blogPosts } from "@/data/blog";
import RevealStagger from "./RevealStagger";

export default function BlogGrid() {
  return (
    <section className="bg-frost py-16 lg:py-24">
      <div className="container-x">
        <div className="mb-10 max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="accent-bar" />
            <p className="eyebrow text-accent-600">Latest Perspectives</p>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Ideas for informed business decisions
          </h2>
          <p className="mt-4 text-base leading-relaxed text-mute">
            Practical perspectives on feasibility, market strategy, and innovation
            from the Al FATEH consultancy team.
          </p>
        </div>

        <RevealStagger className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="reveal-child corp-card group flex min-h-full flex-col overflow-hidden shadow-luxe"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="relative block aspect-[16/10] overflow-hidden bg-brand-900"
                aria-label={`Read ${post.title}`}
              >
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-900/45 via-transparent to-transparent" />
              </Link>

              <div className="flex flex-1 flex-col p-6 md:p-7">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-600">
                    {post.category}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-xs text-mute">
                    <Clock3 className="h-3.5 w-3.5" aria-hidden />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="mt-4 text-xl font-bold leading-snug tracking-tight text-ink">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="transition-colors hover:text-brand-600"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-mute">
                  {post.excerpt}
                </p>

                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-6 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.06em] text-accent-600 transition-colors hover:text-accent-500"
                >
                  Read Article
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
