import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  Share2,
  Bookmark,
  CheckCircle2,
  Sparkles,
  Tag,
} from "lucide-react";
import { BLOG_POSTS } from "@/data/mockData";
import { PageHeader } from "@/ui/PageHeader";
import { NewsletterSection } from "@/components/sections/NewsletterSection";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Statically generate routes for all existing blog posts
export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Get related posts (exclude current)
  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <div className="bg-[#fbfbf9] min-h-screen pb-16">
      {/* Header Banner */}
      <PageHeader
        title={post.title}
        subtitle={post.excerpt}
        badge={post.category || "Organic Living"}
        breadcrumbs={[
          { label: "Blog", href: "/blog" },
          { label: post.title.slice(0, 24) + "..." },
        ]}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#1b3d22] hover:text-[#2e7d32] mb-6 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to all articles</span>
        </Link>

        {/* Author & Meta Bar */}
        <div className="bg-white rounded-2xl border border-[#e4ece6] p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 mb-8 shadow-xs">
          <div className="flex items-center gap-3.5">
            {post.author ? (
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#2e7d32]">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full bg-[#eaf4ed] text-[#2e7d32] flex items-center justify-center font-bold">
                OF
              </div>
            )}
            <div>
              <h3 className="text-sm font-bold text-[#142417]">
                {post.author ? post.author.name : "Organic Food Store Editorial"}
              </h3>
              <p className="text-xs text-[#829487]">
                {post.author ? post.author.role : "Nutrition & Bio Farming"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-[#829487]">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} className="text-[#2e7d32]" />
              {post.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} className="text-[#2e7d32]" />
              {post.readTime}
            </span>
          </div>
        </div>

        {/* Featured Main Image */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden shadow-xl border-4 border-white mb-10 bg-neutral-100">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Article Body Content */}
        <div className="bg-white rounded-3xl border border-[#e4ece6] p-6 sm:p-10 shadow-xs space-y-6 text-[#4c6052] leading-relaxed text-sm sm:text-base">
          {/* Key Insight Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#f1f8f3] border border-[#c8e6c9] flex items-start gap-3">
            <Sparkles size={20} className="text-[#2e7d32] flex-shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-[#1b3d22]">
              <strong className="font-bold">Key Takeaway:</strong> {post.excerpt}
            </div>
          </div>

          {/* Paragraphs */}
          {post.content && post.content.length > 0 ? (
            post.content.map((paragraph, idx) => {
              // Check if paragraph starts with a number like "1. ..."
              const isNumbered = /^[0-9]+\./.test(paragraph);

              if (isNumbered) {
                const parts = paragraph.split(":");
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#fbfbf9] border border-[#eff4f0] space-y-1"
                  >
                    <h4 className="font-bold text-[#142417] text-base">
                      {parts[0]}
                    </h4>
                    {parts[1] && (
                      <p className="text-xs sm:text-sm text-[#4c6052]">
                        {parts.slice(1).join(":")}
                      </p>
                    )}
                  </div>
                );
              }

              return (
                <p key={idx} className="text-[#3a4e40] leading-loose">
                  {paragraph}
                </p>
              );
            })
          ) : (
            <p className="text-[#3a4e40] leading-loose">{post.excerpt}</p>
          )}

          {/* Health & Sustainability Assurance */}
          <div className="mt-8 pt-6 border-t border-[#eff4f0] space-y-3">
            <h4 className="text-sm font-bold text-[#142417] uppercase tracking-wider">
              Organic Food Store Quality Standards
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#142417]">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-[#2e7d32]" />
                <span>100% Pesticide & Chemical Free</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-[#2e7d32]" />
                <span>Direct Sourcing from Bio Certified Farms</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-[#2e7d32]" />
                <span>Non-GMO Verified Seeds and Crops</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-[#2e7d32]" />
                <span>Eco-friendly Biodegradable Packaging</span>
              </div>
            </div>
          </div>

          {/* Tags Row */}
          {post.tags && (
            <div className="mt-8 pt-6 border-t border-[#eff4f0] flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-[#829487] flex items-center gap-1.5 mr-1">
                <Tag size={13} />
                Tags:
              </span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-[#f1f8f3] text-[#1b3d22] text-xs font-semibold border border-[#d2ead7]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* CTA: Shop Ingredients */}
        <div className="mt-8 bg-[#16361e] rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="text-lg sm:text-xl font-bold">
              Cook this with fresh organic ingredients
            </h3>
            <p className="text-xs sm:text-sm text-[#c4d9cb] mt-1">
              Order fresh farm harvest delivered to your door today.
            </p>
          </div>
          <Link
            href="/shop"
            className="px-6 py-3 rounded-full bg-white text-[#16361e] text-xs sm:text-sm font-bold hover:bg-neutral-100 transition-colors shadow-md flex-shrink-0"
          >
            Shop Organic Produce
          </Link>
        </div>

        {/* Related Articles Row */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-extrabold text-[#142417]">
              Related Organic Articles
            </h3>
            <Link
              href="/blog"
              className="text-xs sm:text-sm font-bold text-[#1b3d22] hover:text-[#2e7d32] flex items-center gap-1"
            >
              <span>View all articles</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedPosts.map((related) => (
              <Link
                key={related.id}
                href={`/blog/${related.slug}`}
                className="group bg-white rounded-2xl border border-[#e4ece6] overflow-hidden flex flex-col hover:shadow-lg hover:border-[#2e7d32] transition-all duration-300"
              >
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-neutral-100">
                  <Image
                    src={related.image}
                    alt={related.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <span className="text-[10px] text-[#829487] font-semibold block mb-1">
                    {related.date}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-[#142417] group-hover:text-[#2e7d32] transition-colors line-clamp-2">
                    {related.title}
                  </h4>
                  <div className="mt-3 pt-2 border-t border-[#eff4f0] text-[11px] font-bold text-[#1b3d22] flex items-center gap-1">
                    <span>Read Now</span>
                    <ArrowRight size={11} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </article>

      <div className="mt-20">
        <NewsletterSection />
      </div>
    </div>
  );
}
