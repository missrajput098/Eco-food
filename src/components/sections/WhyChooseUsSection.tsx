import React from "react";
import { Award, Globe, HeartPulse, Users, Leaf } from "lucide-react";
import { SectionHeader } from "@/ui/SectionHeader";
import { WHY_CHOOSE_ITEMS } from "@/data/mockData";

export function WhyChooseUsSection() {
  const getIcon = (type: string) => {
    switch (type) {
      case "quality":
        return <Award className="w-6 h-6 text-[#1b3d22]" />;
      case "sustainable":
        return <Globe className="w-6 h-6 text-[#1b3d22]" />;
      case "health":
        return <HeartPulse className="w-6 h-6 text-[#1b3d22]" />;
      case "trusted":
        return <Users className="w-6 h-6 text-[#1b3d22]" />;
      default:
        return <Leaf className="w-6 h-6 text-[#1b3d22]" />;
    }
  };

  return (
    <section className="relative pt-16 pb-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Why Choose Organic Food Store?"
          subtitle="We are committed to providing the best organic food products for a healthier lifestyle and a sustainable future."
          centered
        />

        {/* 4 Feature Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {WHY_CHOOSE_ITEMS.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-[#fbfbf9] border border-[#e4ece6] hover:border-[#2e7d32] hover:bg-white hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#eaf4ed] group-hover:bg-[#1b3d22] group-hover:text-white flex items-center justify-center transition-colors mb-4 shadow-xs">
                {getIcon(item.icon)}
              </div>
              <h3 className="text-base font-bold text-[#142417] mb-2 group-hover:text-[#2e7d32] transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-[#4c6052] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Wave with floating green leaf graphics at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none opacity-20 overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-full text-[#1b3d22] fill-current"
        >
          <path d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,50 L1200,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
}
