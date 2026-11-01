import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/ui/Button";

export function OurStorySection() {
  return (
    <section id="our-story" className="py-14 sm:py-20 bg-[#fbfbf9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Text Content */}
          <div className="lg:col-span-6 space-y-5">
            <span className="inline-block text-xs font-bold tracking-widest text-[#2e7d32] uppercase">
              Our Story
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#142417] tracking-tight leading-tight">
              Better Food <br />
              <span className="text-[#1b3d22]">for a Brighter Future</span>
            </h2>

            <p className="text-sm sm:text-base text-[#4c6052] leading-relaxed">
              At Organic Food Store, we believe that good food leads to a better life. We source the finest organic products directly from trusted farmers, ensuring freshness, quality and sustainability in every bite.
            </p>

            <div className="space-y-2.5 pt-2">
              {[
                "100% Certified organic and non-GMO verified produce",
                "Direct partnerships with local family-owned bio farms",
                "Eco-friendly zero plastic biodegradable packaging",
              ].map((bullet, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-[#142417]">
                  <div className="w-5 h-5 rounded-full bg-[#eaf4ed] text-[#2e7d32] flex items-center justify-center flex-shrink-0">
                    <Check size={13} />
                  </div>
                  <span>{bullet}</span>
                </div>
              ))}
            </div>

            <div className="pt-3">
              <Link href="/about">
                <Button variant="primary" size="md" withArrow>
                  Learn More
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Farmer with Crate of Vegetables */}
          <div className="lg:col-span-6 relative">
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80"
                alt="Farmer holding wooden crate of fresh organic vegetables"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center hover:scale-105 transition-transform duration-700"
              />

              {/* Floating Farmer Badge */}
              <div className="absolute bottom-5 left-5 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-[#e4ece6]">
                <p className="text-xs font-bold text-[#142417]">
                  100% Locally Grown
                </p>
                <p className="text-[11px] text-[#829487]">
                  Supporting 120+ local farms
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
