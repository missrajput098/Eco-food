import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CATEGORIES } from "@/data/mockData";
import { SectionHeader } from "@/ui/SectionHeader";

export function CategorySection() {
  return (
    <section id="categories" className="py-14 sm:py-20 bg-[#fbfbf9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Shop by Category"
          subtitle="Explore our wide range of organic food categories, fresh from nature."
          viewAllLink={{
            label: "View All Categories",
            href: "/categories",
          }}
        />

        {/* 6 Categories Grid: 2 cols on mobile, 3 cols on tablet, 6 cols / 3x2 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${encodeURIComponent(cat.name)}`}
              className="group bg-white rounded-2xl border border-[#e4ece6] p-4 flex flex-col items-center text-center transition-all duration-300 hover:shadow-lg hover:border-[#2e7d32] hover:-translate-y-1.5"
            >
              {/* Category Image */}
              <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#f4f7f4] mb-3 flex items-center justify-center">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                />
              </div>

              {/* Category Title */}
              <h3 className="text-xs sm:text-sm font-bold text-[#142417] group-hover:text-[#2e7d32] transition-colors leading-snug line-clamp-2">
                {cat.name}
              </h3>

              <span className="text-[11px] text-[#829487] mt-1">
                {cat.itemCount} Products
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
