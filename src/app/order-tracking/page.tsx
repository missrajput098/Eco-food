"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Truck,
  Package,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
  MapPin,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { PageHeader } from "@/ui/PageHeader";

export default function OrderTrackingPage() {
  const router = useRouter();
  const { orders, showToast } = useCart();
  const [orderQuery, setOrderQuery] = useState("");
  const [searchError, setSearchError] = useState<string | null>(null);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = orderQuery.trim().toUpperCase();
    if (!cleanId) {
      setSearchError("Please enter a valid Order ID or Tracking Number.");
      return;
    }
    setSearchError(null);
    router.push(`/orders/${cleanId}`);
  };

  const handleQuickLookup = (id: string) => {
    router.push(`/orders/${id}`);
  };

  return (
    <div className="bg-[#fbfbf9] min-h-screen pb-20">
      <PageHeader
        title="Track Your Farm Delivery"
        subtitle="Follow your certified organic harvest in real time from field picking to temperature-controlled doorstep handover."
        badge="Live Cold-Chain Tracking"
        breadcrumbs={[{ label: "Track Order" }]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-10">
        {/* Lookup Card */}
        <div className="bg-white rounded-3xl border border-[#e4ece6] p-6 sm:p-10 shadow-sm space-y-6">
          <div className="text-center max-w-lg mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-[#eaf4ed] text-[#1b3d22] mx-auto flex items-center justify-center mb-3">
              <Truck size={28} />
            </div>
            <h2 className="text-2xl font-extrabold text-[#142417]">
              Enter Your Order or Tracking Number
            </h2>
            <p className="text-xs sm:text-sm text-[#829487] mt-1.5">
              Found on your order confirmation email or receipt (e.g., ORD-94812).
            </p>
          </div>

          <form onSubmit={handleTrackSubmit} className="max-w-xl mx-auto space-y-3">
            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <Search size={18} className="absolute left-3.5 top-3.5 text-[#829487]" />
                <input
                  type="text"
                  placeholder="e.g. ORD-94812 or OF-TRK-..."
                  value={orderQuery}
                  onChange={(e) => setOrderQuery(e.target.value.toUpperCase())}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border border-[#cbd8cf] text-sm font-semibold uppercase tracking-wider text-[#142417] bg-[#fbfbf9] focus:outline-none focus:border-[#1b3d22]"
                />
              </div>
              <button
                type="submit"
                className="py-3 px-6 rounded-2xl bg-[#1b3d22] hover:bg-[#142f1a] text-white text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <span>Track Now</span>
                <ArrowRight size={16} />
              </button>
            </div>

            {searchError && (
              <p className="text-xs text-red-600 font-semibold">{searchError}</p>
            )}

            {/* Quick Demo ID pills */}
            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-[#829487]">
              <span>Quick Demo Order:</span>
              <button
                type="button"
                onClick={() => handleQuickLookup("ORD-94812")}
                className="px-2.5 py-1 rounded-full bg-[#eaf4ed] text-[#1b3d22] font-bold hover:bg-[#1b3d22] hover:text-white transition-colors cursor-pointer"
              >
                ORD-94812
              </button>
            </div>
          </form>
        </div>

        {/* Recent Orders List (if any exist) */}
        {orders.length > 0 && (
          <div className="bg-white rounded-3xl border border-[#e4ece6] p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#eff4f0]">
              <div className="flex items-center gap-2">
                <Package size={18} className="text-[#2e7d32]" />
                <h3 className="text-base font-bold text-[#142417]">
                  Your Recent Orders ({orders.length})
                </h3>
              </div>
            </div>

            <div className="space-y-3">
              {orders.map((ord) => (
                <div
                  key={ord.id}
                  className="p-4 rounded-2xl border border-[#eff4f0] bg-[#fafbfa] hover:bg-white hover:border-[#2e7d32] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <span className="font-extrabold text-sm text-[#142417]">
                        {ord.id}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#eaf4ed] text-[#1b3d22]">
                        {ord.deliveryStage.replace("_", " ")}
                      </span>
                    </div>

                    <p className="text-xs text-[#829487]">
                      {ord.items.map((i) => `${i.quantity}x ${i.product.name}`).join(", ")}
                    </p>

                    <div className="flex items-center gap-3 text-xs text-[#4c6052] pt-0.5">
                      <span>Total: <strong className="text-[#142417]">${ord.total.toFixed(2)}</strong></span>
                      <span>•</span>
                      <span>{ord.estimatedDeliveryTime}</span>
                    </div>
                  </div>

                  <Link
                    href={`/orders/${ord.id}`}
                    className="self-start sm:self-center px-4 py-2 rounded-full bg-[#1b3d22] hover:bg-[#142f1a] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs"
                  >
                    <span>View Live Tracking</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cold-Chain Quality Guarantees */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-[#e4ece6] text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-[#eaf4ed] text-[#2e7d32] mx-auto flex items-center justify-center">
              <Clock size={20} />
            </div>
            <h4 className="text-sm font-bold text-[#142417]">Field-to-Door in 24h</h4>
            <p className="text-xs text-[#829487]">Harvested fresh and delivered without intermediate storage.</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#e4ece6] text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-[#eaf4ed] text-[#2e7d32] mx-auto flex items-center justify-center">
              <Truck size={20} />
            </div>
            <h4 className="text-sm font-bold text-[#142417]">Zero-Emission Fleet</h4>
            <p className="text-xs text-[#829487]">100% electric temperature-controlled cold delivery vans.</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#e4ece6] text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-[#eaf4ed] text-[#2e7d32] mx-auto flex items-center justify-center">
              <ShieldCheck size={20} />
            </div>
            <h4 className="text-sm font-bold text-[#142417]">Freshness Guarantee</h4>
            <p className="text-xs text-[#829487]">If not crisp and delicious, instant free replacement.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
