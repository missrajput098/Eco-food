import React from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  viewAllLink?: {
    label: string;
    href: string;
  };
  carouselControls?: {
    onPrev: () => void;
    onNext: () => void;
    canPrev?: boolean;
    canNext?: boolean;
  };
  centered?: boolean;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  viewAllLink,
  carouselControls,
  centered = false,
  className = "",
}: SectionHeaderProps) {
  return (
    <div
      className={`flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10 ${
        centered ? "text-center md:text-center items-center" : ""
      } ${className}`}
    >
      <div className={`max-w-2xl ${centered ? "mx-auto" : ""}`}>
        {eyebrow && (
          <span className="inline-block text-xs font-bold tracking-widest text-[#2e7d32] uppercase mb-2">
            {eyebrow}
          </span>
        )}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#142417] tracking-tight leading-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-sm sm:text-base text-[#4c6052] leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {viewAllLink && (
        <div className="flex-shrink-0">
          <Link
            href={viewAllLink.href}
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[#1b3d22] hover:text-[#2e7d32] transition-colors pb-1 border-b border-transparent hover:border-[#2e7d32]"
          >
            <span>{viewAllLink.label}</span>
            <ArrowRight
              size={15}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      )}

      {carouselControls && (
        <div className="flex items-center gap-2 flex-shrink-0 self-start md:self-auto">
          <button
            onClick={carouselControls.onPrev}
            disabled={carouselControls.canPrev === false}
            aria-label="Previous"
            className="w-9 h-9 rounded-full border border-[#cbd8cf] hover:border-[#1b3d22] bg-white text-[#1b3d22] flex items-center justify-center hover:bg-[#f1f8f3] transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-xs active:scale-95"
          >
            <ChevronLeft size={17} />
          </button>
          <button
            onClick={carouselControls.onNext}
            disabled={carouselControls.canNext === false}
            aria-label="Next"
            className="w-9 h-9 rounded-full border border-[#cbd8cf] hover:border-[#1b3d22] bg-white text-[#1b3d22] flex items-center justify-center hover:bg-[#f1f8f3] transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-xs active:scale-95"
          >
            <ChevronRight size={17} />
          </button>
        </div>
      )}
    </div>
  );
}
