"use client";

import React, { useState } from "react";
import { CUSTOMER_FAVORITES } from "@/data/mockData";
import { ProductCard } from "@/ui/ProductCard";
import { SectionHeader } from "@/ui/SectionHeader";

export function CustomerFavoritesSection() {
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % CUSTOMER_FAVORITES.length);
  };

  const handlePrev = () => {
    setStartIndex((prev) =>
      prev === 0 ? CUSTOMER_FAVORITES.length - 1 : prev - 1
    );
  };

  // Reorder items according to carousel index for interactive carousel effect
  const displayedProducts = [
    ...CUSTOMER_FAVORITES.slice(startIndex),
    ...CUSTOMER_FAVORITES.slice(0, startIndex),
  ];

  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Customer Favorites"
          subtitle="Loved by our customers, these are the most popular organic products."
          carouselControls={{
            onPrev: handlePrev,
            onNext: handleNext,
          }}
        />

        {/* 4 Products in Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
