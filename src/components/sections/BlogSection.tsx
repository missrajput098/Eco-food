import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { BLOG_POSTS } from "@/data/mockData";
import { SectionHeader } from "@/ui/SectionHeader";

export function BlogSection() {
  return (
    <section id="blog" className="py-14 sm:py-20 bg-[#fbfbf9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Latest from Our Blog"
          subtitle="Tips, recipes and insights for a healthier, greener lifestyle."
          viewAllLink={{
            label: "View All Articles",
            href: "/blog",
          }}
        />

        {/* 3 Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              className="group bg-white rounded-2xl border border-[#e4ece6] overflow-hidden flex flex-col hover:shadow-xl hover:border-[#2e7d32] transition-all duration-300 hover:-translate-y-1"
            >
              {/* Blog Image */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-neutral-100">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              {/* Blog Content */}
              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  {/* Meta: Date & Read Time */}
                  <div className="flex items-center gap-3 text-xs text-[#829487] mb-2.5">
                    <span className="flex items-center gap-1">
                      <Calendar size={13} className="text-[#2e7d32]" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock size={13} className="text-[#2e7d32]" />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-[#142417] group-hover:text-[#2e7d32] transition-colors leading-snug">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="mt-2 text-xs sm:text-sm text-[#4c6052] line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                {/* Read More Link */}
                <div className="mt-5 pt-3 border-t border-[#eff4f0]">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#1b3d22] group-hover:text-[#2e7d32] group-hover:gap-2 transition-all"
                  >
                    <span>Read More</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
