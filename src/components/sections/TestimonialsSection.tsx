"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Quote } from "lucide-react";
import { TESTIMONIALS } from "@/data/mockData";
import { StarRating } from "@/ui/StarRating";
import { SectionHeader } from "@/ui/SectionHeader";

export function TestimonialsSection() {
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setStartIndex((prev) =>
      prev === 0 ? TESTIMONIALS.length - 1 : prev - 1
    );
  };

  const displayedReviews = [
    ...TESTIMONIALS.slice(startIndex),
    ...TESTIMONIALS.slice(0, startIndex),
  ];

  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="What Our Customers Say"
          subtitle="Real stories from real people who love our organic products."
          carouselControls={{
            onPrev: handlePrev,
            onNext: handleNext,
          }}
        />

        {/* 3 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayedReviews.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-[#fbfbf9] rounded-2xl border border-[#e4ece6] p-6 sm:p-7 flex flex-col justify-between hover:shadow-lg hover:border-[#2e7d32] transition-all duration-300"
            >
              <div>
                {/* Author Info */}
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#2e7d32] flex-shrink-0">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#142417]">
                      {testimonial.name}
                    </h3>
                    <p className="text-xs text-[#829487]">
                      {testimonial.location}
                    </p>
                  </div>
                </div>

                {/* Quote */}
                <p className="text-xs sm:text-sm text-[#4c6052] leading-relaxed italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </div>

              {/* 5 Yellow Stars */}
              <div className="mt-5 pt-4 border-t border-[#eff4f0]">
                <StarRating rating={testimonial.rating} showCount={false} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
