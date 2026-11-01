"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/ui/Button";

export function HeroSection() {
  return (
    <section id="hero" className="relative pt-6 pb-12 sm:pb-16 lg:pb-20 overflow-hidden bg-[#fbfbf9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Headline and CTA */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eaf4ed] text-[#1b3d22] text-xs font-bold tracking-widest uppercase mb-4 sm:mb-6 border border-[#c8e6c9]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2e7d32]" />
              <span>Fresh • Natural • Organic</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#142417] leading-[1.12] tracking-tight">
              Good Food <br />
              <span className="text-[#1b3d22]">for a Healthier</span> <br />
              Tomorrow
            </h1>

            {/* Subtitle */}
            <p className="mt-5 text-base sm:text-lg text-[#4c6052] max-w-xl leading-relaxed">
              Discover pure, natural and organic food products for a healthier you and a greener planet.
            </p>

            {/* CTA Button */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/shop">
                <Button variant="primary" size="lg" withArrow>
                  Shop Now
                </Button>
              </Link>

              <div className="flex items-center gap-2 text-xs font-semibold text-[#4c6052] bg-white px-3.5 py-2 rounded-full border border-[#e4ece6] shadow-2xs">
                <CheckCircle2 size={15} className="text-[#2e7d32]" />
                <span>Free delivery on orders over $50</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Produce Basket Visual */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            {/* Background Organic Ambient Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#e2f1e6] to-[#edf7f0] rounded-3xl transform rotate-1 scale-95 -z-10" />

            <div className="relative w-full max-w-md sm:max-w-lg aspect-[4/3] sm:aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=80"
                alt="Fresh organic vegetables basket and shopping bag"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transform hover:scale-105 transition-transform duration-700"
              />

              {/* Floating Organic Brand Stamp / Badge */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-[#e4ece6] flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#1b3d22] text-[#81c784] flex items-center justify-center font-bold text-xs">
                  ✓
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-[#829487] leading-none">
                    100% Certified
                  </p>
                  <p className="text-xs font-extrabold text-[#142417] leading-tight">
                    Bio Quality
                  </p>
                </div>
              </div>

              {/* Floating Fresh Harvest Tag */}
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-[#e4ece6] flex items-center gap-2.5">
                <Sparkles size={16} className="text-[#2e7d32]" />
                <span className="text-xs font-bold text-[#142417]">
                  Picked Fresh Daily
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
