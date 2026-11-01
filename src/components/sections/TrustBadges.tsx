import React from "react";
import { ShieldCheck, Truck, Sparkles, RefreshCw, Leaf } from "lucide-react";
import { TRUST_BADGES } from "@/data/mockData";

export function TrustBadges() {
  const getIcon = (type: string) => {
    switch (type) {
      case "organic":
        return <Leaf className="w-5 h-5 text-[#2e7d32]" />;
      case "delivery":
        return <Truck className="w-5 h-5 text-[#2e7d32]" />;
      case "pure":
        return <Sparkles className="w-5 h-5 text-[#2e7d32]" />;
      case "guarantee":
        return <ShieldCheck className="w-5 h-5 text-[#2e7d32]" />;
      default:
        return <Leaf className="w-5 h-5 text-[#2e7d32]" />;
    }
  };

  return (
    <section className="py-6 border-y border-[#e4ece6] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {TRUST_BADGES.map((badge) => (
            <div
              key={badge.id}
              className="flex items-center gap-3 p-2 rounded-xl transition-colors hover:bg-[#fbfbf9]"
            >
              <div className="w-10 h-10 rounded-full bg-[#eaf4ed] flex items-center justify-center flex-shrink-0">
                {getIcon(badge.icon)}
              </div>
              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-bold text-[#142417] truncate">
                  {badge.title}
                </h4>
                {badge.description && (
                  <p className="text-[11px] text-[#829487] hidden sm:block truncate">
                    {badge.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
