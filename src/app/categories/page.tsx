import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/ui/PageHeader";
import { CATEGORIES } from "@/data/mockData";
import { TrustBadges } from "@/components/sections/TrustBadges";

const CATEGORY_DETAILS: Record<
  string,
  { description: string; highlights: string[] }
> = {
  "Fresh Fruits & Vegetables": {
    description:
      "Picked at the height of natural ripeness, delivered fresh daily from organic soils without synthetic sprays.",
    highlights: ["Organic Avocados", "Blueberries", "Baby Spinach", "Heirloom Tomatoes"],
  },
  "Grains & Cereals": {
    description:
      "Wholesome, unrefined ancient grains, rolled oats, and ancient pseudocereals rich in dietary fiber and vitamins.",
    highlights: ["Royal White Quinoa", "Whole Grain Rolled Oats", "Brown Basmati", "Chia Seeds"],
  },
  "Dairy & Eggs": {
    description:
      "Pasture-raised organic dairy and farm-fresh eggs from ethical family farms where animals roam freely in sunlight.",
    highlights: ["Free-Range Eggs", "Grass-Fed Butter", "Artisanal Organic Cheese", "Raw Milk"],
  },
  "Snacks & Nuts": {
    description:
      "Raw and dry-roasted unpasteurized nuts, seeds, and healthy whole food snacks without artificial preservatives.",
    highlights: ["California Raw Almonds", "English Walnuts", "Roasted Cashews", "Trail Mix"],
  },
  "Organic Beverages": {
    description:
      "Cold-pressed botanical juices, artisanal plant milks, and antioxidant-rich herbal infusions.",
    highlights: ["Green Detox Juice", "Cold-Pressed Smoothies", "Oat Milk", "Herbal Kombucha"],
  },
  Superfoods: {
    description:
      "Nutrient-dense power foods, raw wildflower honey, medicinal berries, and cold-milled seeds for peak vitality.",
    highlights: ["Wild Raw Honey", "Black Chia Seeds", "Amazonian Acai", "Maca Powder"],
  },
};

export default function CategoriesPage() {
  return (
    <div className="bg-[#fbfbf9] min-h-screen pb-16">
      <PageHeader
        title="Organic Categories"
        subtitle="Explore our thoughtfully curated collection of nature's finest certified organic pantry essentials and farm-fresh produce."
        badge="Pure From Earth"
        breadcrumbs={[{ label: "Categories" }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
        {/* Intro Highlight Banner */}
        <div className="bg-white rounded-3xl border border-[#e4ece6] p-6 sm:p-8 mb-10 sm:mb-12 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2e7d32] uppercase tracking-wider">
              <Sparkles size={14} />
              <span>Certified 100% Bio Standards</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#142417]">
              Every category inspected for unmatched purity
            </h2>
            <p className="text-xs sm:text-sm text-[#4c6052] max-w-xl">
              From hand-picked berries to stone-ground ancient grains, our entire catalog adheres to strict non-GMO and certified bio protocols.
            </p>
          </div>

          <Link
            href="/shop"
            className="px-6 py-3 rounded-full bg-[#1b3d22] hover:bg-[#142f1a] text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 flex-shrink-0"
          >
            Shop All Products
          </Link>
        </div>

        {/* 6 Rich Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORIES.map((cat) => {
            const details = CATEGORY_DETAILS[cat.name] || {
              description: "Wholesome organic goods crafted with care for you and the planet.",
              highlights: ["Certified Bio", "Locally Sourced", "Zero Preservatives"],
            };

            return (
              <div
                key={cat.id}
                className="group bg-white rounded-3xl border border-[#e4ece6] overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-[#2e7d32] transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  {/* Category Image Header */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#f4f7f4]">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#1b3d22] shadow-xs">
                      {cat.itemCount} Items
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-[#142417] group-hover:text-[#2e7d32] transition-colors">
                      {cat.name}
                    </h3>

                    <p className="mt-2 text-xs text-[#4c6052] leading-relaxed">
                      {details.description}
                    </p>

                    {/* Popular Items Pills */}
                    <div className="mt-4 pt-3 border-t border-[#eff4f0]">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#829487] block mb-2">
                        Popular Items
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {details.highlights.map((item, i) => (
                          <span
                            key={i}
                            className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-[#f1f8f3] text-[#1b3d22] border border-[#d2ead7]"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card CTA */}
                <div className="p-6 pt-0">
                  <Link
                    href={`/shop?category=${encodeURIComponent(cat.name)}`}
                    className="w-full py-2.5 px-4 rounded-full bg-[#fbfbf9] hover:bg-[#1b3d22] text-[#1b3d22] hover:text-white border border-[#cbd8cf] hover:border-[#1b3d22] text-xs font-bold flex items-center justify-center gap-2 transition-all"
                  >
                    <span>Explore {cat.name}</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-20">
        <TrustBadges />
      </div>
    </div>
  );
}
