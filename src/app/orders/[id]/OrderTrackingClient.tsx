"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  Truck,
  Package,
  MapPin,
  Phone,
  Printer,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Leaf,
  Calendar,
  CreditCard,
  User,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Order, DeliveryStage } from "@/types";

interface Props {
  orderId: string;
}

export default function OrderTrackingClient({ orderId }: Props) {
  const { orders, getOrderById, updateOrderDeliveryStage, showToast } = useCart();
  const [copied, setCopied] = useState(false);
  const [printModalOpen, setPrintModalOpen] = useState(false);

  // Find order in context
  const orderFromContext = getOrderById(orderId) || orders.find((o) => o.id.toUpperCase() === orderId.toUpperCase());

  // Fallback order state if accessing directly without prior cart placement
  const [fallbackOrder, setFallbackOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!orderFromContext) {
      // Create a deterministic fallback order for this ID
      const mockOrder: Order = {
        id: orderId.toUpperCase(),
        createdAt: new Date().toISOString(),
        items: [
          {
            product: {
              id: "prod-1",
              name: "Organic Avocado",
              slug: "organic-avocado",
              category: "Fresh Fruits & Vegetables",
              price: 4.99,
              originalPrice: 6.99,
              rating: 5,
              reviewCount: 124,
              image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=600&q=80",
              weight: "2 pcs (approx. 400g)",
            },
            quantity: 2,
            price: 4.99,
          },
          {
            product: {
              id: "prod-3",
              name: "Raw Honey",
              slug: "raw-honey",
              category: "Superfoods",
              price: 8.99,
              rating: 5,
              reviewCount: 78,
              image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80",
              weight: "350g glass jar",
            },
            quantity: 1,
            price: 8.99,
          },
        ],
        subtotal: 18.97,
        discount: 3.79,
        couponCode: "ORGANIC20",
        shippingFee: 0,
        tax: 0.95,
        total: 16.13,
        shippingAddress: {
          fullName: "Alex Miller",
          email: "alex.miller@example.com",
          phone: "+1 (555) 234-5678",
          street: "742 Evergreen Terrace",
          apartment: "Apt 4B",
          city: "Springfield",
          state: "Oregon",
          postalCode: "97477",
          deliveryNotes: "Leave on front porch behind flower planter.",
          deliveryOption: "standard",
        },
        paymentMethod: "card",
        paymentDetails: {
          cardLast4: "4242",
        },
        deliveryStage: "placed",
        timeline: [
          {
            stage: "placed",
            title: "Order Placed & Confirmed",
            description: "Payment verified. Harvest order assigned to local organic hub.",
            timestamp: "Just now",
            location: "Central Organic Processing Facility",
            completed: true,
            current: true,
          },
          {
            stage: "confirmed",
            title: "Harvested & Packed Fresh",
            description: "Freshly selected from organic farm bins and packaged in eco cooling boxes.",
            timestamp: "Estimated in 1-2 hours",
            location: "Green Valley Bio-Farm Warehouse",
            completed: false,
            current: false,
          },
          {
            stage: "shipped",
            title: "Dispatched with Cold-Chain Fleet",
            description: "Loaded onto zero-emission refrigerated delivery vehicle.",
            timestamp: "Estimated today",
            location: "North Metro Sorting Station",
            completed: false,
            current: false,
          },
          {
            stage: "out_for_delivery",
            title: "Out for Final Delivery",
            description: "Driver assigned for door-to-door fresh handover.",
            timestamp: "Upcoming",
            location: "Springfield Local Hub",
            completed: false,
            current: false,
          },
          {
            stage: "delivered",
            title: "Delivered to Doorstep",
            description: "Delivered fresh to your doorstep with contact-free photo verification.",
            timestamp: "Upcoming",
            location: "Customer Residence",
            completed: false,
            current: false,
          },
        ],
        trackingNumber: `OF-TRK-${Math.floor(1000000 + Math.random() * 9000000)}`,
        estimatedDeliveryTime: "Tomorrow by 2:00 PM - 5:00 PM",
        courier: {
          name: "EcoFleet Cold-Chain Express",
          phone: "+1 (555) 890-1234",
          driverName: "Marcus Chen",
          vehicleNumber: "EV-VAN-8842",
          agentRating: 4.96,
        },
      };
      setFallbackOrder(mockOrder);
    }
  }, [orderFromContext, orderId]);

  const currentOrder = orderFromContext || fallbackOrder;

  if (!currentOrder) {
    return (
      <div className="min-h-screen bg-[#fbfbf9] flex items-center justify-center p-6">
        <div className="w-8 h-8 border-3 border-[#1b3d22] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleCopyId = () => {
    navigator.clipboard.writeText(currentOrder.id);
    setCopied(true);
    showToast(`Order ID ${currentOrder.id} copied to clipboard!`);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSimulateNextStep = () => {
    if (orderFromContext) {
      updateOrderDeliveryStage(currentOrder.id);
      showToast("Advanced delivery simulation to next milestone!");
    } else if (fallbackOrder) {
      const stageSequence: DeliveryStage[] = [
        "placed",
        "confirmed",
        "shipped",
        "out_for_delivery",
        "delivered",
      ];
      const curIdx = stageSequence.indexOf(fallbackOrder.deliveryStage);
      const nextIdx = Math.min(stageSequence.length - 1, curIdx + 1);
      const nextStage = stageSequence[nextIdx];

      const nowStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      const updatedTimeline = fallbackOrder.timeline.map((step, idx) => {
        if (idx < nextIdx) {
          return {
            ...step,
            completed: true,
            current: false,
            timestamp: step.timestamp.includes("Estimated") ? `${nowStr} (Completed)` : step.timestamp,
          };
        } else if (idx === nextIdx) {
          return {
            ...step,
            completed: true,
            current: true,
            timestamp: `Just now (${nowStr})`,
          };
        } else {
          return {
            ...step,
            completed: false,
            current: false,
          };
        }
      });

      setFallbackOrder({
        ...fallbackOrder,
        deliveryStage: nextStage,
        timeline: updatedTimeline,
      });
      showToast("Advanced delivery simulation to next milestone!");
    }
  };

  const handleResetSimulation = () => {
    if (orderFromContext) {
      updateOrderDeliveryStage(currentOrder.id, "placed");
      showToast("Reset delivery simulation to Step 1: Order Placed");
    } else if (fallbackOrder) {
      const updatedTimeline = fallbackOrder.timeline.map((step, idx) => ({
        ...step,
        completed: idx === 0,
        current: idx === 0,
        timestamp: idx === 0 ? "Just now" : "Upcoming",
      }));
      setFallbackOrder({
        ...fallbackOrder,
        deliveryStage: "placed",
        timeline: updatedTimeline,
      });
      showToast("Reset delivery simulation to Step 1: Order Placed");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Determine stage index
  const stageSequence: DeliveryStage[] = [
    "placed",
    "confirmed",
    "shipped",
    "out_for_delivery",
    "delivered",
  ];
  const currentStageIndex = stageSequence.indexOf(currentOrder.deliveryStage);
  const progressPercent = ((currentStageIndex) / (stageSequence.length - 1)) * 100;

  return (
    <div className="bg-[#fbfbf9] min-h-screen pb-20">
      {/* Top Breadcrumbs */}
      <div className="bg-white border-b border-[#e4ece6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between text-xs">
          <nav className="flex items-center gap-2 text-[#829487]">
            <Link href="/" className="hover:text-[#1b3d22]">Home</Link>
            <ChevronRight size={13} />
            <Link href="/order-tracking" className="hover:text-[#1b3d22]">Track Order</Link>
            <ChevronRight size={13} />
            <span className="text-[#142417] font-semibold">{currentOrder.id}</span>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#cbd8cf] hover:bg-[#fafbfa] text-xs font-semibold text-[#142417] transition-colors cursor-pointer"
            >
              <Printer size={13} />
              <span>Print Invoice</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 space-y-8">
        {/* Celebration Header Card */}
        <div className="bg-white rounded-3xl border border-[#e4ece6] p-6 sm:p-10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#eaf4ed]/50 rounded-full blur-3xl pointer-events-none -z-0" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#eaf4ed] text-[#2e7d32] flex items-center justify-center flex-shrink-0 shadow-xs">
                <CheckCircle2 size={32} />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#eaf4ed] text-[#1b3d22] text-xs font-bold uppercase tracking-wider mb-1.5">
                  <Sparkles size={12} className="text-[#2e7d32]" />
                  <span>Harvest Confirmed</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#142417] tracking-tight">
                  Thank You, {currentOrder.shippingAddress.fullName.split(" ")[0]}!
                </h1>
                <p className="text-xs sm:text-sm text-[#829487] mt-1 max-w-xl">
                  Your organic produce has been allocated for farm picking. Temperature-controlled courier dispatch is scheduled.
                </p>
              </div>
            </div>

            {/* Order ID & Meta Box */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 bg-[#fbfbf9] p-4 rounded-2xl border border-[#eff4f0] md:min-w-[240px]">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs text-[#829487]">Order ID:</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-sm text-[#142417] tracking-wider">
                    {currentOrder.id}
                  </span>
                  <button
                    onClick={handleCopyId}
                    aria-label="Copy order id"
                    className="p-1 text-[#829487] hover:text-[#1b3d22] transition-colors cursor-pointer"
                  >
                    {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 text-xs">
                <span className="text-[#829487]">Estimated Arrival:</span>
                <span className="font-bold text-[#2e7d32] text-right">
                  {currentOrder.estimatedDeliveryTime}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 text-xs">
                <span className="text-[#829487]">Status:</span>
                <span className="font-bold uppercase tracking-wide px-2 py-0.5 rounded-full text-[10px] bg-[#eaf4ed] text-[#1b3d22]">
                  {currentOrder.deliveryStage.replace("_", " ")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Delivery Progress Tracker & Interactive Simulation Card */}
        <div className="bg-white rounded-3xl border border-[#e4ece6] p-6 sm:p-10 shadow-sm space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#eff4f0]">
            <div>
              <div className="flex items-center gap-2">
                <Truck size={20} className="text-[#2e7d32]" />
                <h2 className="text-xl font-extrabold text-[#142417]">
                  Live Delivery Progression
                </h2>
              </div>
              <p className="text-xs text-[#829487] mt-0.5">
                Real-time cold-chain tracking code: <strong className="text-[#142417]">{currentOrder.trackingNumber}</strong>
              </p>
            </div>

            {/* Interactive Simulation Controls */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={handleSimulateNextStep}
                disabled={currentOrder.deliveryStage === "delivered"}
                className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                  currentOrder.deliveryStage === "delivered"
                    ? "bg-[#eaf4ed] text-[#829487] cursor-not-allowed"
                    : "bg-[#1b3d22] text-white hover:bg-[#142f1a] active:scale-95"
                }`}
              >
                <Sparkles size={14} />
                <span>
                  {currentOrder.deliveryStage === "delivered"
                    ? "Order Fully Delivered"
                    : "Simulate Next Delivery Step →"}
                </span>
              </button>

              <button
                onClick={handleResetSimulation}
                className="p-2 rounded-full border border-[#cbd8cf] hover:bg-neutral-100 text-[#4c6052] transition-colors cursor-pointer"
                title="Reset simulation to Order Placed"
              >
                <RotateCcw size={14} />
              </button>
            </div>
          </div>

          {/* Graphical Progress Bar */}
          <div className="relative">
            {/* Horizontal Track (Desktop) */}
            <div className="hidden md:block absolute top-6 left-8 right-8 h-1 bg-[#e4ece6] -z-0">
              <div
                className="h-full bg-[#2e7d32] transition-all duration-700"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Stage Steps */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative z-10">
              {currentOrder.timeline.map((step, idx) => {
                const isCompleted = step.completed;
                const isCurrent = step.current;

                return (
                  <div
                    key={step.stage}
                    className="flex md:flex-col items-start md:items-center text-left md:text-center gap-3.5 md:gap-2.5"
                  >
                    {/* Circle Icon Badge */}
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 shadow-sm flex-shrink-0 ${
                        isCompleted
                          ? "bg-[#1b3d22] text-white ring-4 ring-[#eaf4ed]"
                          : isCurrent
                          ? "bg-[#2e7d32] text-white ring-4 ring-[#a5d6a7] animate-pulse"
                          : "bg-white border-2 border-[#cbd8cf] text-[#829487]"
                      }`}
                    >
                      {isCompleted ? <Check size={20} /> : <span>{idx + 1}</span>}
                    </div>

                    {/* Step Title & Timestamp */}
                    <div className="min-w-0">
                      <p
                        className={`text-xs sm:text-sm font-bold leading-tight ${
                          isCompleted || isCurrent ? "text-[#142417]" : "text-[#829487]"
                        }`}
                      >
                        {step.title}
                      </p>
                      <span
                        className={`text-[11px] block mt-0.5 ${
                          isCurrent
                            ? "text-[#2e7d32] font-extrabold"
                            : isCompleted
                            ? "text-[#4c6052]"
                            : "text-[#a0b3a5]"
                        }`}
                      >
                        {step.timestamp}
                      </span>
                      <p className="text-[11px] text-[#829487] mt-1 hidden lg:block leading-snug">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Current Live Stage Highlight Box */}
          <div className="p-5 rounded-2xl bg-[#f7faf8] border border-[#c8e6c9] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#1b3d22] text-[#81c784] flex items-center justify-center flex-shrink-0">
                <Truck size={20} />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#2e7d32]">
                  Live Activity Status
                </span>
                <p className="text-sm font-extrabold text-[#142417]">
                  {currentOrder.timeline[currentStageIndex]?.title}
                </p>
                <p className="text-xs text-[#4c6052] mt-0.5">
                  {currentOrder.timeline[currentStageIndex]?.description}
                </p>
              </div>
            </div>

            {/* Courier Driver Card Preview */}
            <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-xl border border-[#e4ece6]">
              <div className="w-9 h-9 rounded-full bg-[#1b3d22] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                MC
              </div>
              <div className="text-xs">
                <p className="font-bold text-[#142417]">
                  {currentOrder.courier.driverName}
                </p>
                <p className="text-[#829487] text-[11px]">
                  Driver • {currentOrder.courier.agentRating} ★ Rating
                </p>
              </div>
              <button
                onClick={() => showToast(`Calling driver ${currentOrder.courier.driverName} at ${currentOrder.courier.phone}...`)}
                className="ml-2 w-8 h-8 rounded-full bg-[#eaf4ed] text-[#1b3d22] hover:bg-[#1b3d22] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Call driver"
              >
                <Phone size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* 2 Columns: Destination & Courier Info + Itemized Receipt */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 6 Cols: Delivery Destination & Courier Details */}
          <div className="lg:col-span-6 space-y-6">
            {/* Delivery Destination Card */}
            <div className="bg-white rounded-3xl border border-[#e4ece6] p-6 sm:p-7 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-[#eff4f0]">
                <MapPin size={18} className="text-[#2e7d32]" />
                <h3 className="text-base font-bold text-[#142417]">Delivery Destination</h3>
              </div>

              <div className="space-y-2 text-xs text-[#4c6052]">
                <p className="text-sm font-bold text-[#142417]">
                  {currentOrder.shippingAddress.fullName}
                </p>
                <p>
                  {currentOrder.shippingAddress.street}
                  {currentOrder.shippingAddress.apartment && `, ${currentOrder.shippingAddress.apartment}`}
                </p>
                <p>
                  {currentOrder.shippingAddress.city}, {currentOrder.shippingAddress.state} {currentOrder.shippingAddress.postalCode}
                </p>
                <div className="pt-2 flex flex-col gap-1 text-[#829487]">
                  <span>Phone: <strong className="text-[#142417]">{currentOrder.shippingAddress.phone}</strong></span>
                  <span>Email: <strong className="text-[#142417]">{currentOrder.shippingAddress.email}</strong></span>
                </div>

                {currentOrder.shippingAddress.deliveryNotes && (
                  <div className="mt-3 p-3 rounded-xl bg-[#fafbfa] border border-[#e4ece6]">
                    <span className="font-bold text-[#142417] block mb-0.5">Driver Instructions:</span>
                    <span className="italic text-[#4c6052]">{currentOrder.shippingAddress.deliveryNotes}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Courier & Vehicle Logistics Card */}
            <div className="bg-white rounded-3xl border border-[#e4ece6] p-6 sm:p-7 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-[#eff4f0]">
                <Truck size={18} className="text-[#2e7d32]" />
                <h3 className="text-base font-bold text-[#142417]">Logistics & Cold-Chain Fleet</h3>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[#f5f7f4]">
                  <span className="text-[#829487] block">Courier Partner</span>
                  <span className="font-bold text-[#142417] block mt-0.5">{currentOrder.courier.name}</span>
                </div>

                <div className="p-3 rounded-xl bg-[#f5f7f4]">
                  <span className="text-[#829487] block">Vehicle Fleet</span>
                  <span className="font-bold text-[#142417] block mt-0.5">{currentOrder.courier.vehicleNumber}</span>
                </div>

                <div className="p-3 rounded-xl bg-[#f5f7f4]">
                  <span className="text-[#829487] block">Payment Method</span>
                  <span className="font-bold text-[#142417] uppercase block mt-0.5">
                    {currentOrder.paymentMethod === "card"
                      ? `Card ending in ${currentOrder.paymentDetails?.cardLast4 || "4242"}`
                      : currentOrder.paymentMethod === "upi"
                      ? `UPI (${currentOrder.paymentDetails?.upiId || "digital"})`
                      : "Cash on Delivery"}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[#f5f7f4]">
                  <span className="text-[#829487] block">Eco Quality</span>
                  <span className="font-bold text-[#2e7d32] block mt-0.5">100% Zero Emission</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right 6 Cols: Itemized Receipt & Costs */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-3xl border border-[#e4ece6] p-6 sm:p-7 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#eff4f0]">
                <div className="flex items-center gap-2">
                  <Package size={18} className="text-[#2e7d32]" />
                  <h3 className="text-base font-bold text-[#142417]">Ordered Produce ({currentOrder.items.length})</h3>
                </div>
                <button
                  onClick={handlePrint}
                  className="text-xs font-semibold text-[#2e7d32] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Printer size={13} />
                  <span>Download Receipt</span>
                </button>
              </div>

              {/* Items List */}
              <div className="divide-y divide-[#eff4f0] max-h-72 overflow-y-auto pr-1">
                {currentOrder.items.map((item, idx) => (
                  <div key={idx} className="py-3 first:pt-0 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[#fafbfa] border border-[#eff4f0] flex-shrink-0">
                        <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                      </div>
                      <div>
                        <Link
                          href={`/shop/${item.product.id}`}
                          className="text-xs sm:text-sm font-bold text-[#142417] hover:text-[#2e7d32] transition-colors block line-clamp-1"
                        >
                          {item.product.name}
                        </Link>
                        <span className="text-[11px] text-[#829487]">
                          Qty: {item.quantity} × ${item.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs sm:text-sm font-extrabold text-[#142417]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 pt-3 border-t border-[#eff4f0] text-xs text-[#4c6052]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#142417]">${currentOrder.subtotal.toFixed(2)}</span>
                </div>

                {currentOrder.discount > 0 && (
                  <div className="flex justify-between text-[#2e7d32]">
                    <span>Discount Voucher ({currentOrder.couponCode})</span>
                    <span className="font-bold">-${currentOrder.discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Farm Cold-Chain Shipping</span>
                  <span className={`font-bold ${currentOrder.shippingFee === 0 ? "text-[#2e7d32]" : "text-[#142417]"}`}>
                    {currentOrder.shippingFee === 0 ? "FREE" : `$${currentOrder.shippingFee.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between text-[#829487]">
                  <span>Estimated Sales Tax</span>
                  <span>${currentOrder.tax.toFixed(2)}</span>
                </div>

                <div className="pt-2 border-t border-[#eff4f0] flex justify-between items-baseline text-base font-extrabold text-[#142417]">
                  <span>Grand Total Paid</span>
                  <span className="text-xl text-[#1b3d22]">${currentOrder.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/shop"
                  className="flex-1 py-3 px-4 rounded-full bg-[#1b3d22] text-white text-xs font-bold text-center hover:bg-[#142f1a] transition-all flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <span>Continue Shopping</span>
                  <ArrowRight size={14} />
                </Link>

                <Link
                  href="/order-tracking"
                  className="py-3 px-4 rounded-full border border-[#cbd8cf] hover:bg-[#fbfbf9] text-[#142417] text-xs font-bold text-center transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Track Another Order</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
