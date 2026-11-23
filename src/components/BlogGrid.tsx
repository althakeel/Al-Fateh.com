
import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  Clock3,
} from "lucide-react";

import type { ManagedBlog } from "@/lib/blog-model";

import { localizedBlog } from "@/lib/blog-model";

import RevealStagger from "./RevealStagger";

interface BlogGridProps {
  blogs: ManagedBlog[];
  locale: "en" | "ar";
}

export default function BlogGrid({
  blogs,
  locale,
}: BlogGridProps) {
  const isAr = locale === "ar";

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      className="bg-frost py-16 lg:py-24"
    >
      <div className="container-x">
        <div className="mb-10 max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="accent-bar" />

            <p className="eyebrow text-accent-600">
              {isAr
                ? "أحدث الرؤى"
                : "Latest Perspectives"}
            </p>
          </div>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {isAr
              ? "أفكار تساعدك على اتخاذ قرارات تجارية مدروسة"
              : "Ideas for informed business decisions"}
          </h2>

          <p className="mt-4 text-base leading-relaxed text-mute">
            {isAr
              ? "مقالات حول ضريبة الشركات وإدارة التكاليف والاستشارات التجارية."
              : "Notes on corporate tax readiness, cost visibility, and market advisory from the Al FATEH team."}
          </p>
        </div>

        <RevealStagger className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {blogs.map((source) => {
            const post = localizedBlog(source, locale);

            return (
              <article
                key={post.id}
                className="reveal-child corp-card group flex min-h-full flex-col overflow-hidden shadow-luxe"
              >
                <Link
                  href={`/${locale}/blog/${post.slug}`}
                  className="relative block aspect-[16/10] overflow-hidden bg-brand-900"
                  aria-label={post.title}
                >
                  <Image
                    src={post.image}
                    unoptimized={/^https:\/\//i.test(post.image)}
                    alt={post.imageAlt || post.title}
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
                      <Clock3
                        className="h-3.5 w-3.5"
                        aria-hidden
                      />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl font-bold leading-snug tracking-tight text-ink">
                    <Link
                      href={`/${locale}/blog/${post.slug}`}
                      className="transition-colors hover:text-brand-600"
                    >
                      {post.title}
                    </Link>
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-relaxed text-mute">
                    {post.excerpt}
                  </p>

                  <Link
                    href={`/${locale}/blog/${post.slug}`}
                    className="mt-6 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.06em] text-accent-600 transition-colors hover:text-accent-500"
                  >
                    {isAr
                      ? "اقرأ المقال"
                      : "Read Article"}

                    <ArrowRight
                      className={`h-3.5 w-3.5 transition-transform group-hover:translate-x-1 ${
                        isAr ? "rotate-180" : ""
                      }`}
                    />
                  </Link>
                </div>
              </article>
            );
          })}
        </RevealStagger>

        {blogs.length === 0 && (
          <p className="py-12 text-center text-mute">
            {isAr
              ? "لا توجد مقالات منشورة حالياً."
              : "No published articles yet."}
          </p>
        )}
      </div>
    </section>
  );
}
