import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Tag, Sparkles } from "lucide-react";

export function DiscountBanner() {
  return (
    <section className="py-8 sm:py-12 bg-[#fbfbf9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-[#16361e] rounded-3xl overflow-hidden shadow-2xl text-white">
          {/* Subtle Organic Background Patterns */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#25522f]/40 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#0e2414] rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-12 lg:p-14">
            {/* Left Image: Green Smoothie Glass with Citrus Slices */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm aspect-[4/3] sm:aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
                <Image
                  src="https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80"
                  alt="Fresh organic green detox smoothie with lime and orange slices"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute top-3 left-3 bg-[#0d1e12]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 flex items-center gap-1.5 text-xs text-[#81c784] font-semibold">
                  <Sparkles size={13} />
                  <span>Cold Pressed Daily</span>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5 lg:pl-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#25522f] text-[#81c784] text-xs font-bold uppercase tracking-wider">
                <Tag size={13} />
                Special Offer
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Get 20% Off <br />
                <span className="text-[#81c784]">Your First Order</span>
              </h2>

              <p className="text-sm sm:text-base text-[#c4d9cb]">
                Use code: <strong className="text-white px-2 py-0.5 rounded-md bg-[#25522f] tracking-wider border border-[#3a7c46]">ORGANIC20</strong> at checkout
              </p>

              <div className="pt-2">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-[#16361e] font-bold text-sm rounded-full shadow-lg hover:bg-neutral-100 hover:shadow-xl hover:gap-3 transition-all active:scale-95 cursor-pointer"
                >
                  <span>Shop Now</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
