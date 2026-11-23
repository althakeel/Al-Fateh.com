
import type { Metadata } from "next";
import { sanitizeBlogHtml } from "@/lib/blog-html";

import Image from "next/image";
import Link from "next/link";

import { notFound } from "next/navigation";

import {
  ArrowLeft,
  ArrowRight,
  Check,
} from "lucide-react";

import {
  getPublishedBlog,
} from "@/lib/blogs-server";

import {
  localizedBlog,
} from "@/lib/blog-model";

import {
  createLocalizedMetadata,
} from "@/lib/localized-seo";

import {
  isValidLocale,
} from "@/lib/i18n";

export const dynamic = "force-dynamic";

interface ArticlePageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    return { robots: { index: false } };
  }

  const source = await getPublishedBlog(slug);

  if (!source) {
    return { robots: { index: false } };
  }

  const post = localizedBlog(source, locale);

  return createLocalizedMetadata({
    locale,
    path: `/blog/${slug}`,
    title: post.seoTitle || post.title,
    description:
      post.seoDescription || post.excerpt,
    image: post.bannerImage,
  });
}

export default async function ArticlePage({
  params,
}: ArticlePageProps) {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const source = await getPublishedBlog(slug);

  if (!source) {
    notFound();
  }

  const post = localizedBlog(source, locale);
  const isAr = locale === "ar";
  const publicationDate = post.publicationDate || (post.publishedAt ? new Date(post.publishedAt).toISOString().slice(0, 10) : "");

  return (
    <article
      dir={isAr ? "rtl" : "ltr"}
      className="min-h-screen bg-frost pb-20"
    >
      <div className="relative min-h-[420px] overflow-hidden bg-brand-900 pt-32 text-white">
        <Image
          src={post.bannerImage}
          unoptimized={/^https:\/\//i.test(post.bannerImage)}
          alt={post.imageAlt || post.title}
          fill
          priority
          className="object-cover opacity-35"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-brand-900/50 to-transparent" />

        <div className="container-x relative z-10 py-14 lg:py-24">
          <Link
            href={`/${locale}/blog`}
            className="mb-8 inline-flex items-center gap-2 text-sm text-white/80 hover:text-white"
          >
            {isAr ? (
              <ArrowRight size={16} />
            ) : (
              <ArrowLeft size={16} />
            )}

            {isAr
              ? "العودة إلى المدونة"
              : "Back to Blog"}
          </Link>

          <p className="eyebrow text-accent-400">
            {post.category}
          </p>

          <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            {post.title}
          </h1>

          {publicationDate && (
            <time dateTime={publicationDate} className="mt-3 block text-sm text-white/70">
              {new Intl.DateTimeFormat(locale, { dateStyle: "long", timeZone: "UTC" }).format(new Date(publicationDate))}
            </time>
          )}
          {post.excerptHtml !== undefined ? (
            <div className="blog-rich mt-5 max-w-3xl text-base text-white/80" dangerouslySetInnerHTML={{ __html: sanitizeBlogHtml(post.excerptHtml) }} />
          ) : (
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/80">{post.excerpt}</p>
          )}
        </div>
      </div>

      <div className="container-x">
        <div className="mx-auto max-w-4xl py-14">
          {post.contentHtml !== undefined ? (
            <div className="blog-rich text-mute [&_a]:text-accent-700 [&_h1]:text-ink [&_h2]:text-ink [&_h3]:text-ink" dangerouslySetInnerHTML={{ __html: sanitizeBlogHtml(post.contentHtml) }} />
          ) : (
          <div className="space-y-12">
            {post.sections.map((section, index) => (
              <section key={index}>
                <h2 className="text-2xl font-bold text-ink sm:text-3xl">
                  {section.heading}
                </h2>

                <div className="mt-5 space-y-4">
                  {section.paragraphs
                    .filter(Boolean)
                    .map((paragraph, i) => (
                      <p
                        key={i}
                        className="text-base leading-8 text-mute"
                      >
                        {paragraph}
                      </p>
                    ))}
                </div>

                {section.points &&
                  section.points.length > 0 && (
                    <ul className="mt-6 space-y-3 border-s-2 border-accent-500 bg-ivory p-6">
                      {section.points
                        .filter(Boolean)
                        .map((point, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-sm leading-relaxed text-slate sm:text-base"
                          >
                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-500/15 text-accent-700">
                              <Check
                                size={12}
                                aria-hidden
                              />
                            </span>

                            {point}
                          </li>
                        ))}
                    </ul>
                  )}
              </section>
            ))}
          </div>

          )}

          <aside className="mt-14 bg-brand-900 p-7 text-white shadow-luxe sm:p-9">
            <p className="eyebrow text-accent-400">
              {isAr
                ? "تواصل مع الفاتح"
                : "Discuss Your Next Step"}
            </p>

            <h2 className="mt-3 text-2xl font-bold">
              {isAr
                ? "حوّل هذه الرؤى إلى خطوات عملية"
                : "Put these insights into practice."}
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
              {isAr
                ? "تواصل مع فريق الفاتح لمناقشة القرارات والتحديات والفرص التي تواجه مؤسستك."
                : "Speak with the Al FATEH team about the decisions, risks, and opportunities shaping your organization."}
            </p>

            <Link
              href={`/${locale}/contact`}
              className="btn-primary mt-6"
            >
              {isAr
                ? "اطلب استشارة"
                : "Request Consultation"}
            </Link>
          </aside>
        </div>
      </div>
    </article>
  );
}
