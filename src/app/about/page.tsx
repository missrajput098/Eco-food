import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  ShieldCheck,
  Sprout,
  Users,
  CheckCircle2,
  Award,
  Globe,
  ArrowRight,
} from "lucide-react";
import { PageHeader } from "@/ui/PageHeader";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { TrustBadges } from "@/components/sections/TrustBadges";

const STATS = [
  { value: "25k+", label: "Happy Customers Served" },
  { value: "120+", label: "Local Bio Farm Partners" },
  { value: "100%", label: "Organic & Non-GMO" },
  { value: "0%", label: "Synthetic Pesticides" },
];

const FARM_PARTNERS = [
  {
    name: "Green Valley Organics",
    farmer: "Thomas & Anna Miller",
    location: "Hudson Valley, New York",
    specialty: "Heirloom Vegetables & Leafy Greens",
    image: "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=600&q=80",
    quote: "Our soil has been cultivated organically for 3 generations. Zero spray, just sunlight and compost.",
  },
  {
    name: "Suncrest Berry Farm",
    farmer: "Elena Rodriguez",
    location: "Salinas Valley, California",
    specialty: "Organic Blueberries & Strawberries",
    image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=600&q=80",
    quote: "We pick berries at the peak of sweetness and pack them directly into biodegradable cartons.",
  },
  {
    name: "Highland Apiaries",
    farmer: "David Clark",
    location: "Berkshire Mountains, Massachusetts",
    specialty: "Wild Raw Honey & Bee Pollen",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80",
    quote: "Our bees forage across hundreds of acres of wild mountain flowers with no chemicals.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-[#fbfbf9] min-h-screen pb-16">
      <PageHeader
        title="Better Food for a Brighter Future"
        subtitle="Learn about our journey, our ethical farming partners, and our unwavering commitment to pure, sustainable nutrition."
        badge="Our Heritage & Mission"
        breadcrumbs={[{ label: "About Us" }]}
      />

      {/* Main Story Narrative */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold tracking-widest text-[#2e7d32] uppercase">
                Founded in 2018
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#142417] tracking-tight leading-tight">
                Connecting families with real food, straight from the earth.
              </h2>
              <p className="text-sm sm:text-base text-[#4c6052] leading-relaxed">
                Organic Food Store began with a simple question: <em>why is it so difficult to find produce that hasn&apos;t been treated with synthetic pesticides and coated in wax?</em>
              </p>
              <p className="text-sm sm:text-base text-[#4c6052] leading-relaxed">
                We joined forces with five local New York bio-farms to create an honest, transparent supply chain. Today, we partner with over 120 certified organic growers to bring uncompromised nutrition, remarkable flavor, and sustainable convenience to thousands of homes across the nation.
              </p>

              <div className="pt-2 grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-[#e4ece6]">
                  <Sprout className="w-6 h-6 text-[#2e7d32] mb-2" />
                  <h4 className="text-sm font-bold text-[#142417]">
                    Regenerative Soil
                  </h4>
                  <p className="text-xs text-[#829487] mt-1">
                    Enriching topsoil biodiversity for future generations.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-[#e4ece6]">
                  <ShieldCheck className="w-6 h-6 text-[#2e7d32] mb-2" />
                  <h4 className="text-sm font-bold text-[#142417]">
                    Triple Tested
                  </h4>
                  <p className="text-xs text-[#829487] mt-1">
                    Every batch checked for purity and zero pesticide residue.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80"
                  alt="Organic sunlit farmland"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="py-12 bg-[#16361e] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map((stat, i) => (
              <div key={i} className="space-y-1">
                <div className="text-3xl sm:text-5xl font-extrabold text-[#81c784]">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-[#c4d9cb]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Partner Farmers */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold tracking-widest text-[#2e7d32] uppercase">
              Grassroots Agriculture
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#142417] mt-2">
              Meet Our Farm Partners
            </h2>
            <p className="mt-2 text-sm text-[#4c6052]">
              Real people, honest practices, and genuine dedication to organic purity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FARM_PARTNERS.map((farm, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl border border-[#e4ece6] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative w-full aspect-[4/3] bg-neutral-100">
                    <Image
                      src={farm.image}
                      alt={farm.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-[11px] font-bold text-[#2e7d32] uppercase tracking-wider">
                      {farm.location}
                    </span>
                    <h3 className="text-lg font-bold text-[#142417] mt-1">
                      {farm.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#829487]">
                      Growers: {farm.farmer}
                    </p>
                    <p className="text-xs text-[#4c6052] italic mt-3 bg-[#fbfbf9] p-3 rounded-xl border border-[#eff4f0]">
                      &ldquo;{farm.quote}&rdquo;
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="text-xs font-bold text-[#142417] flex items-center gap-1.5 text-[#2e7d32]">
                    <CheckCircle2 size={14} />
                    <span>Specialty: {farm.specialty}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <WhyChooseUsSection />

      <div className="mt-12">
        <TrustBadges />
      </div>
    </div>
  );
}
