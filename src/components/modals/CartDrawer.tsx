"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function CartDrawer() {
  const router = useRouter();
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateQuantity,
    removeFromCart,
    subtotalPrice,
    totalItems,
    isAuthenticated,
    openAuthModal,
  } = useCart();

  if (!isCartOpen) return null;

  const freeShippingThreshold = 50;
  const progressPercent = Math.min(
    100,
    (subtotalPrice / freeShippingThreshold) * 100
  );
  const remainingForFreeShipping = Math.max(
    0,
    freeShippingThreshold - subtotalPrice
  );
  const estimatedShipping = remainingForFreeShipping === 0 || subtotalPrice === 0 ? 0 : 4.99;
  const grandTotal = subtotalPrice + estimatedShipping;

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    if (!isAuthenticated) {
      openAuthModal("/checkout");
    } else {
      router.push("/checkout");
    }
  };

  const handleViewCart = () => {
    setIsCartOpen(false);
    router.push("/cart");
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 border-b border-[#e4ece6] flex items-center justify-between bg-[#fbfbf9]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#eaf4ed] text-[#1b3d22] flex items-center justify-center font-bold">
              <ShoppingBag size={17} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#142417]">Your Fresh Cart</h2>
              <span className="text-xs text-[#829487]">
                {totalItems} {totalItems === 1 ? "item" : "items"}
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
            className="w-8 h-8 rounded-full hover:bg-neutral-200 flex items-center justify-center text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div className="p-4 bg-[#f5f7f4] border-b border-[#e4ece6]">
          <div className="flex justify-between text-xs font-medium text-[#142417] mb-1.5">
            {remainingForFreeShipping > 0 ? (
              <span>
                Add{" "}
                <strong className="text-[#2e7d32]">
                  ${remainingForFreeShipping.toFixed(2)}
                </strong>{" "}
                more for <strong>FREE farm shipping!</strong>
              </span>
            ) : (
              <span className="text-[#2e7d32] font-bold">
                🎉 Congratulations! You unlocked FREE shipping!
              </span>
            )}
            <span className="text-neutral-500 font-semibold">{Math.round(progressPercent)}%</span>
          </div>
          <div className="w-full bg-[#e0eae2] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#2e7d32] h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <div className="w-16 h-16 rounded-full bg-[#f1f8f3] text-[#2e7d32] flex items-center justify-center mb-3">
                <ShoppingBag size={28} />
              </div>
              <h3 className="text-base font-bold text-[#142417]">
                Your cart is empty
              </h3>
              <p className="text-xs text-[#829487] mt-1 max-w-xs">
                Looks like you haven&apos;t added any fresh organic produce or superfoods yet.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  router.push("/shop");
                }}
                className="mt-4 px-5 py-2.5 bg-[#1b3d22] text-white text-xs font-semibold rounded-full hover:bg-[#142f1a] transition-all cursor-pointer shadow-xs"
              >
                Start Shopping Now
              </button>
            </div>
          ) : (
            cart.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex items-center gap-3.5 p-3 rounded-xl border border-[#e4ece6] bg-[#fafbfa] hover:border-[#cbd8cf] transition-all"
              >
                <Link
                  href={`/shop/${product.id}`}
                  onClick={() => setIsCartOpen(false)}
                  className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-white border border-[#eff4f0] cursor-pointer"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform"
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <Link
                    href={`/shop/${product.id}`}
                    onClick={() => setIsCartOpen(false)}
                    className="text-sm font-bold text-[#142417] truncate hover:text-[#2e7d32] block transition-colors"
                  >
                    {product.name}
                  </Link>
                  <p className="text-xs text-[#2e7d32] font-semibold mt-0.5">
                    ${product.price.toFixed(2)} {product.weight && <span className="text-[#829487] font-normal">/ {product.weight}</span>}
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() =>
                        updateQuantity(product.id, quantity - 1)
                      }
                      aria-label="Decrease quantity"
                      className="w-6 h-6 rounded-md border border-[#cbd8cf] flex items-center justify-center text-[#142417] hover:bg-neutral-200 transition-colors cursor-pointer"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="text-xs font-bold w-5 text-center text-[#142417]">
                      {quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(product.id, quantity + 1)
                      }
                      aria-label="Increase quantity"
                      className="w-6 h-6 rounded-md border border-[#cbd8cf] flex items-center justify-center text-[#142417] hover:bg-neutral-200 transition-colors cursor-pointer"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between self-stretch">
                  <button
                    onClick={() => removeFromCart(product.id)}
                    aria-label="Remove item"
                    className="text-neutral-400 hover:text-red-500 transition-colors cursor-pointer p-1"
                  >
                    <Trash2 size={15} />
                  </button>
                  <span className="text-sm font-extrabold text-[#142417]">
                    ${(product.price * quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-[#e4ece6] bg-[#fbfbf9] space-y-3">
            <div className="space-y-1.5 text-xs text-[#4c6052]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#142417]">
                  ${subtotalPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="font-semibold text-[#2e7d32]">
                  {estimatedShipping === 0 ? "FREE" : `$${estimatedShipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-[#142417] pt-2 border-t border-[#e4ece6]">
                <span>Total</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <button
                onClick={handleViewCart}
                className="py-3 px-4 bg-white border border-[#1b3d22] text-[#1b3d22] font-semibold text-xs sm:text-sm rounded-full flex items-center justify-center gap-1.5 hover:bg-[#eaf4ed] transition-all cursor-pointer"
              >
                <ShoppingCart size={15} />
                <span>View Full Cart</span>
              </button>

              <button
                onClick={handleProceedCheckout}
                className="py-3 px-4 bg-[#1b3d22] hover:bg-[#142f1a] text-white font-semibold text-xs sm:text-sm rounded-full flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-[0.98] cursor-pointer"
              >
                <span>Checkout</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
