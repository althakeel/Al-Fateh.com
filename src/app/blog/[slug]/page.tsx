import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Clock3 } from "lucide-react";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import { blogPosts, getBlogPost } from "@/data/blog";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  createPageMetadata,
} from "@/lib/seo";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return { title: "Article Not Found", robots: { index: false, follow: false } };
  }

  return createPageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.image,
    imageAlt: post.imageAlt,
    type: "article",
    keywords: [
      post.category,
      "Al FATEH insights",
      "consultancy blog Dubai",
      "UAE business advice",
    ],
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
          articleJsonLd({
            title: post.title,
            description: post.excerpt,
            path: `/blog/${post.slug}`,
            image: post.image,
          }),
        ]}
      />
      <PageHero
        eyebrow={post.category}
        title={post.title}
        description={post.excerpt}
        image={post.image}
        imageAlt={post.imageAlt}
      />

      <article className="bg-ivory py-14 lg:py-20">
        <div className="container-x">
          <div className="mx-auto max-w-3xl">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-platinum pb-6">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-medium text-brand-700 transition-colors hover:text-accent-600"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden />
                Back to all insights
              </Link>
              <span className="inline-flex items-center gap-2 text-sm text-mute">
                <Clock3 className="h-4 w-4 text-accent-500" aria-hidden />
                {post.readTime}
              </span>
            </div>

            <div className="mt-10 space-y-12">
              {post.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                    {section.heading}
                  </h2>
                  <div className="mt-5 space-y-4">
                    {section.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-base leading-8 text-mute sm:text-[17px]"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {section.points && (
                    <ul className="mt-6 space-y-3 border-l-2 border-accent-500 bg-frost p-5 sm:p-6">
                      {section.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-3 text-sm leading-relaxed text-slate sm:text-base"
                        >
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-500/15 text-accent-700">
                            <Check className="h-3 w-3" aria-hidden />
                          </span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>

            <aside className="mt-14 border border-platinum bg-brand-900 p-7 text-white shadow-luxe sm:p-9">
              <p className="eyebrow text-accent-400">Discuss Your Next Step</p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight">
                Put these insights into practice.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
                Speak with the Al FATEH team about the decisions, risks, and
                opportunities shaping your organization.
              </p>
              <Link href="/contact" className="btn-primary mt-6 group">
                Request Consultation
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </aside>
          </div>
        </div>
      </article>
    </>
  );
}
