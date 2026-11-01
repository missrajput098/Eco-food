import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, Sparkles } from "lucide-react";

export function PromoBannerOne() {
  return (
    <section className="py-8 sm:py-12 bg-[#fbfbf9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-[#16361e] rounded-3xl overflow-hidden shadow-2xl p-8 sm:p-12 lg:p-16 text-white">
          {/* Background Botanical Organic Leaf Illustrations */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#25522f]/30 rounded-full blur-3xl pointer-events-none -z-0" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#122c19] rounded-full blur-2xl pointer-events-none -z-0" />

          {/* Decorative Leaf SVG Watermark */}
          <div className="absolute right-6 bottom-4 opacity-10 pointer-events-none">
            <Leaf size={280} className="text-white" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#25522f] text-[#81c784] text-xs font-bold uppercase tracking-wider">
                <Sparkles size={13} />
                Natural Wellness
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Eat Organic <br />
                <span className="text-[#81c784]">Live Better</span>
              </h2>

              <p className="text-sm sm:text-base text-[#c4d9cb] max-w-lg leading-relaxed">
                Pure ingredients. Real nutrition. A healthier choice for you and your family.
              </p>

              <div className="pt-2">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#16361e] font-bold text-sm rounded-full shadow-lg hover:bg-neutral-100 hover:shadow-xl hover:gap-3 transition-all active:scale-95 cursor-pointer"
                >
                  <span>Explore Our Collection</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Right Food Bowl Image with 100% Natural Stamp */}
            <div className="lg:col-span-5 flex justify-center relative">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full p-2 bg-gradient-to-tr from-[#25522f] to-[#3a7c46] shadow-2xl">
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/20">
                  <Image
                    src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80"
                    alt="Healthy organic colorful salad bowl"
                    fill
                    sizes="(max-width: 768px) 300px, 400px"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* 100% Natural Food Circular Badge */}
                <div className="absolute -bottom-2 -left-2 sm:bottom-2 sm:left-2 w-24 h-24 rounded-full bg-[#0d1e12] border-2 border-[#81c784] text-white p-2 flex flex-col items-center justify-center text-center shadow-xl transform -rotate-6 hover:rotate-0 transition-transform">
                  <Leaf size={14} className="text-[#81c784] mb-0.5" />
                  <span className="text-[9px] font-bold tracking-widest uppercase text-[#81c784]">
                    100%
                  </span>
                  <span className="text-[10px] font-extrabold leading-tight">
                    NATURAL FOOD
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
