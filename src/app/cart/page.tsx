"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Tag,
  ShieldCheck,
  Truck,
  Leaf,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { PageHeader } from "@/ui/PageHeader";
import { AVAILABLE_COUPONS, ALL_PRODUCTS } from "@/data/mockData";
import { ProductCard } from "@/ui/ProductCard";

export default function CartPage() {
  const router = useRouter();
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotalPrice,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    discountAmount,
    orderNotes,
    setOrderNotes,
    totalItems,
    isAuthenticated,
    openAuthModal,
  } = useCart();

  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponSuccess, setCouponSuccess] = useState<string | null>(null);

  const freeShippingThreshold = 50;
  const isFreeShipping =
    subtotalPrice >= freeShippingThreshold || appliedCoupon?.freeShipping;
  const shippingFee = isFreeShipping || cart.length === 0 ? 0 : 4.99;
  const remainingForFree = Math.max(0, freeShippingThreshold - subtotalPrice);
  const progressPercent = Math.min(100, (subtotalPrice / freeShippingThreshold) * 100);

  const estimatedTax = (Math.max(0, subtotalPrice - discountAmount) * 0.05);
  const finalTotal = Math.max(0, subtotalPrice - discountAmount) + shippingFee + estimatedTax;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    setCouponError(null);
    setCouponSuccess(null);

    const res = applyCoupon(couponInput.trim());
    if (res.success) {
      setCouponSuccess(res.message);
      setCouponInput("");
    } else {
      setCouponError(res.message);
    }
  };

  const recommendedPicks = ALL_PRODUCTS.slice(0, 4);

  return (
    <div className="bg-[#fbfbf9] min-h-screen pb-20">
      <PageHeader
        title="Your Organic Shopping Cart"
        subtitle="Review your fresh farm selections, apply discount vouchers, and proceed to prompt eco-friendly delivery."
        badge="Fresh Cart"
        breadcrumbs={[{ label: "Cart" }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        {cart.length === 0 ? (
          /* Empty Cart State */
          <div className="bg-white rounded-3xl p-8 sm:p-14 border border-[#e4ece6] text-center max-w-2xl mx-auto shadow-sm">
            <div className="w-20 h-20 rounded-full bg-[#f1f8f3] text-[#2e7d32] mx-auto flex items-center justify-center mb-4">
              <ShoppingBag size={36} />
            </div>
            <h2 className="text-2xl font-extrabold text-[#142417]">Your Cart is Currently Empty</h2>
            <p className="text-sm text-[#829487] mt-2 max-w-md mx-auto leading-relaxed">
              Your pantry is waiting for nature&apos;s finest organic goods. Browse our farm fresh fruits, vegetables, grains, and cold-pressed juices!
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/shop"
                className="px-6 py-3 rounded-full bg-[#1b3d22] text-white text-sm font-bold hover:bg-[#142f1a] transition-all shadow-md flex items-center gap-2"
              >
                <span>Browse Organic Shop</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Popular Items Showcase for Empty Cart */}
            <div className="mt-14 pt-10 border-t border-[#eff4f0] text-left">
              <h3 className="text-base font-bold text-[#142417] mb-4">
                Popular Farm Picks to Get Started:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recommendedPicks.slice(0, 2).map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Active Cart with Items */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 8 Cols: Item Table, Shipping Progress, Notes */}
            <div className="lg:col-span-8 space-y-6">
              {/* Free Shipping Alert Banner */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#e4ece6] shadow-2xs">
                <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#142417] mb-2">
                  <div className="flex items-center gap-2">
                    <Truck size={18} className="text-[#2e7d32]" />
                    {isFreeShipping ? (
                      <span className="text-[#2e7d32]">
                        🎉 You&apos;ve unlocked FREE Cold-Chain Delivery!
                      </span>
                    ) : (
                      <span>
                        Add <strong className="text-[#2e7d32]">${remainingForFree.toFixed(2)}</strong> more for <strong>FREE Delivery!</strong>
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-semibold text-[#829487]">
                    {Math.round(progressPercent)}%
                  </span>
                </div>
                <div className="w-full bg-[#eaf4ed] h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#2e7d32] h-full rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Items Card List */}
              <div className="bg-white rounded-3xl border border-[#e4ece6] p-5 sm:p-7 shadow-xs">
                <div className="flex items-center justify-between pb-4 border-b border-[#eff4f0] mb-4">
                  <h2 className="text-lg font-bold text-[#142417]">
                    Items in Cart ({totalItems})
                  </h2>
                  <button
                    onClick={clearCart}
                    className="text-xs text-red-500 hover:text-red-700 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 size={13} />
                    <span>Clear Cart</span>
                  </button>
                </div>

                <div className="divide-y divide-[#eff4f0] space-y-4">
                  {cart.map(({ product, quantity }) => (
                    <div
                      key={product.id}
                      className="pt-4 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      {/* Product Thumbnail & Details */}
                      <div className="flex items-center gap-4 flex-1">
                        <Link
                          href={`/shop/${product.id}`}
                          className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#fafbfa] border border-[#eff4f0] flex-shrink-0 cursor-pointer"
                        >
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover hover:scale-105 transition-transform"
                          />
                        </Link>
                        <div className="min-w-0">
                          <span className="text-[11px] font-bold uppercase text-[#2e7d32]">
                            {product.category}
                          </span>
                          <Link
                            href={`/shop/${product.id}`}
                            className="text-sm sm:text-base font-bold text-[#142417] hover:text-[#2e7d32] block truncate cursor-pointer transition-colors"
                          >
                            {product.name}
                          </Link>
                          <div className="flex items-center gap-2 mt-1 text-xs">
                            <span className="font-bold text-[#142417]">
                              ${product.price.toFixed(2)}
                            </span>
                            {product.weight && (
                              <span className="text-[#829487]">
                                • {product.weight}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Quantity Stepper & Price */}
                      <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-8 self-end sm:self-center w-full sm:w-auto">
                        <div className="inline-flex items-center border border-[#cbd8cf] rounded-full bg-[#fbfbf9] p-1">
                          <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            aria-label="Decrease quantity"
                            className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white text-[#142417] transition-colors cursor-pointer"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-[#142417]">
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            aria-label="Increase quantity"
                            className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white text-[#142417] transition-colors cursor-pointer"
                          >
                            <Plus size={13} />
                          </button>
                        </div>

                        <div className="text-right min-w-[70px]">
                          <span className="text-base font-extrabold text-[#142417] block">
                            ${(product.price * quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => removeFromCart(product.id)}
                            className="text-xs text-neutral-400 hover:text-red-500 transition-colors mt-0.5 cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Instructions & Notes Card */}
              <div className="bg-white rounded-3xl border border-[#e4ece6] p-5 sm:p-6 shadow-xs">
                <h3 className="text-sm font-bold text-[#142417] mb-1">
                  Delivery Notes & Special Instructions (Optional)
                </h3>
                <p className="text-xs text-[#829487] mb-3">
                  E.g. &ldquo;Ring buzzer #204&rdquo;, &ldquo;Leave in shade near porch door&rdquo;, &ldquo;Call upon arrival&rdquo;.
                </p>
                <textarea
                  rows={2}
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="Enter any instructions for your local courier driver..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#cbd8cf] text-xs text-[#142417] focus:outline-none focus:border-[#1b3d22] bg-[#fbfbf9]"
                />
              </div>
            </div>

            {/* Right 4 Cols: Summary, Coupon Code, Checkout CTA */}
            <div className="lg:col-span-4 space-y-6">
              {/* Order Summary Box */}
              <div className="bg-white rounded-3xl border border-[#e4ece6] p-6 shadow-sm space-y-5">
                <h2 className="text-lg font-bold text-[#142417]">Order Summary</h2>

                {/* Breakdown */}
                <div className="space-y-3 text-sm text-[#4c6052]">
                  <div className="flex justify-between">
                    <span>Subtotal ({totalItems} items)</span>
                    <span className="font-bold text-[#142417]">
                      ${subtotalPrice.toFixed(2)}
                    </span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#2e7d32]">
                      <span className="flex items-center gap-1">
                        <Tag size={13} />
                        Coupon ({appliedCoupon?.code})
                      </span>
                      <span className="font-bold">-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="flex items-center gap-1">
                      <Truck size={14} />
                      Cold-Chain Shipping
                    </span>
                    <span className={`font-bold ${shippingFee === 0 ? "text-[#2e7d32]" : "text-[#142417]"}`}>
                      {shippingFee === 0 ? "FREE" : `$${shippingFee.toFixed(2)}`}
                    </span>
                  </div>

                  <div className="flex justify-between text-xs text-[#829487]">
                    <span>Estimated Sales Tax (5%)</span>
                    <span>${estimatedTax.toFixed(2)}</span>
                  </div>

                  <div className="pt-3 border-t border-[#eff4f0] flex justify-between items-baseline text-lg font-extrabold text-[#142417]">
                    <span>Grand Total</span>
                    <span className="text-2xl text-[#1b3d22]">
                      ${finalTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Primary Proceed to Checkout Button */}
                <button
                  onClick={() => {
                    if (!isAuthenticated) {
                      openAuthModal("/checkout");
                    } else {
                      router.push("/checkout");
                    }
                  }}
                  className="w-full py-4 px-6 rounded-full bg-[#1b3d22] hover:bg-[#142f1a] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all active:scale-[0.98] cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={17} />
                </button>

                <div className="text-center">
                  <Link
                    href="/shop"
                    className="text-xs font-semibold text-[#2e7d32] hover:underline"
                  >
                    ← Continue Shopping for More Items
                  </Link>
                </div>
              </div>

              {/* Coupon Code Card */}
              <div className="bg-white rounded-3xl border border-[#e4ece6] p-6 shadow-xs space-y-3">
                <div className="flex items-center gap-2">
                  <Tag size={16} className="text-[#2e7d32]" />
                  <h3 className="text-sm font-bold text-[#142417]">Have a Promo Code?</h3>
                </div>

                {appliedCoupon ? (
                  <div className="p-3 rounded-2xl bg-[#eaf4ed] border border-[#c8e6c9] flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#1b3d22]">
                        <CheckCircle2 size={14} />
                        <span>{appliedCoupon.code} Applied</span>
                      </div>
                      <p className="text-[11px] text-[#4c6052] mt-0.5">
                        {appliedCoupon.description}
                      </p>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-red-500 hover:text-red-700 font-bold ml-2 cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. ORGANIC20"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                        className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#cbd8cf] text-xs font-bold uppercase tracking-wider text-[#142417] focus:outline-none focus:border-[#1b3d22] bg-[#fbfbf9]"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2.5 rounded-xl bg-[#1b3d22] text-white text-xs font-bold hover:bg-[#142f1a] transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>

                    {couponError && (
                      <p className="text-[11px] text-red-600 font-medium flex items-center gap-1">
                        <AlertCircle size={12} /> {couponError}
                      </p>
                    )}
                    {couponSuccess && (
                      <p className="text-[11px] text-green-700 font-medium flex items-center gap-1">
                        <CheckCircle2 size={12} /> {couponSuccess}
                      </p>
                    )}

                    <div className="pt-2 text-[11px] text-[#829487]">
                      Tip: Use code <strong className="text-[#2e7d32]">ORGANIC20</strong> for 20% off or{" "}
                      <strong className="text-[#2e7d32]">FREESHIP</strong> for zero delivery fee!
                    </div>
                  </form>
                )}
              </div>

              {/* Trust Badges Bar */}
              <div className="p-4 rounded-2xl bg-[#fafbfa] border border-[#e4ece6] space-y-2.5 text-xs text-[#4c6052]">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-[#2e7d32]" />
                  <span>256-Bit SSL Encrypted Checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <Leaf size={16} className="text-[#2e7d32]" />
                  <span>100% Certified Biodegradable Packing</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw size={16} className="text-[#2e7d32]" />
                  <span>Farm Fresh Money-Back Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
