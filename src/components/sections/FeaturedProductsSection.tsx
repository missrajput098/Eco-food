import React from "react";
import { BEST_SELLING_PRODUCTS } from "@/data/mockData";
import { ProductCard } from "@/ui/ProductCard";
import { SectionHeader } from "@/ui/SectionHeader";

export function FeaturedProductsSection() {
  return (
    <section id="featured" className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Featured Products"
          title="Our Best Selling Organic Products"
          subtitle="Handpicked for quality, taste and your well-being."
          viewAllLink={{
            label: "View All Products",
            href: "/shop",
          }}
        />

        {/* 4 Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BEST_SELLING_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
