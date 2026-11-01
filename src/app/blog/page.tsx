"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  ArrowRight,
  Search,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { PageHeader } from "@/ui/PageHeader";
import { BLOG_POSTS } from "@/data/mockData";
import { NewsletterSection } from "@/components/sections/NewsletterSection";

export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Recipes", "Healthy Living", "Sustainability"];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      ("category" in post && post.category === selectedCategory) ||
      (selectedCategory === "Recipes" && post.title.includes("Recipes"));

    return matchesSearch && matchesCategory;
  });

  const featured = BLOG_POSTS[0];

  return (
    <div className="bg-[#fbfbf9] min-h-screen pb-16">
      <PageHeader
        title="Latest from Our Blog"
        subtitle="Wholesome recipes, nutritional guidance, and mindful insights for clean living and planetary wellness."
        badge="Wellness & Recipes"
        breadcrumbs={[{ label: "Blog" }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
        {/* Featured Blog Hero Spotlight */}
        {featured && (
          <div className="bg-white rounded-3xl border border-[#e4ece6] overflow-hidden shadow-sm mb-12 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto lg:h-full min-h-[300px]">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-4 left-4 bg-[#1b3d22] text-[#81c784] px-3 py-1 rounded-full text-xs font-bold tracking-wide flex items-center gap-1.5 shadow-md">
                <Sparkles size={13} />
                <span>Featured Story</span>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-10 space-y-4">
              <div className="flex items-center gap-3 text-xs text-[#829487]">
                <span className="flex items-center gap-1">
                  <Calendar size={13} className="text-[#2e7d32]" />
                  {featured.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock size={13} className="text-[#2e7d32]" />
                  {featured.readTime}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#142417] leading-tight">
                {featured.title}
              </h2>

              <p className="text-xs sm:text-sm text-[#4c6052] leading-relaxed">
                {featured.excerpt}
              </p>

              <div className="pt-2">
                <Link
                  href={`/blog/${featured.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1b3d22] hover:bg-[#142f1a] text-white text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <span>Read Full Article</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#1b3d22] text-white shadow-xs"
                    : "bg-white text-[#4c6052] border border-[#cbd8cf] hover:border-[#2e7d32]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search
              size={16}
              className="absolute left-3.5 top-3 text-[#829487]"
            />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-full border border-[#cbd8cf] text-xs text-[#142417] focus:outline-none focus:border-[#2e7d32] bg-white shadow-2xs"
            />
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="group bg-white rounded-3xl border border-[#e4ece6] overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-[#2e7d32] transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="block relative w-full aspect-[16/10] overflow-hidden bg-neutral-100"
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </Link>

                <div className="p-6">
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

                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-base sm:text-lg font-bold text-[#142417] group-hover:text-[#2e7d32] transition-colors leading-snug">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="mt-2.5 text-xs text-[#4c6052] leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-[#eff4f0] mt-4 flex items-center justify-between">
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#1b3d22] group-hover:text-[#2e7d32] group-hover:gap-2 transition-all cursor-pointer"
                >
                  <span>Read Article</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <NewsletterSection />
      </div>
    </div>
  );
}
