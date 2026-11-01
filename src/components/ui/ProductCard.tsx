"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Check, Eye } from "lucide-react";
import { Product } from "@/types";
import { Badge } from "./Badge";
import { StarRating } from "./StarRating";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className = "" }: ProductCardProps) {
  const { addToCart, toggleWishlist, isWishlisted, cart } = useCart();
  const wishlisted = isWishlisted(product.id);
  const cartItem = cart.find((item) => item.product.id === product.id);
  const inCart = Boolean(cartItem);

  const productUrl = `/shop/${product.id}`;

  return (
    <div
      className={`group relative bg-white rounded-2xl border border-[#e4ece6] p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_12px_28px_-6px_rgba(20,45,26,0.1)] hover:border-[#cbd8cf] hover:-translate-y-1 ${className}`}
    >
      {/* Top Header: Badge & Wishlist */}
      <div className="flex items-center justify-between w-full mb-2 z-10">
        <div>
          {product.badge ? (
            <Badge variant={product.badge.variant}>
              {product.badge.text}
            </Badge>
          ) : (
            <span />
          )}
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            wishlisted
              ? "bg-[#fee2e2] text-[#ef4444]"
              : "bg-[#f5f7f4] text-[#829487] hover:text-[#ef4444] hover:bg-white border border-transparent hover:border-[#fcd8c9]"
          }`}
        >
          <Heart
            size={16}
            className={wishlisted ? "fill-[#ef4444] text-[#ef4444]" : ""}
          />
        </button>
      </div>

      {/* Product Image Link */}
      <Link
        href={productUrl}
        className="relative w-full aspect-square my-2 overflow-hidden rounded-xl bg-[#fafbfa] flex items-center justify-center block cursor-pointer"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Quick View hover overlay */}
        <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-white/95 text-[#142417] text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-all">
            <Eye size={13} className="text-[#2e7d32]" />
            View Details
          </span>
        </div>
      </Link>

      {/* Product Information */}
      <div className="mt-3 flex flex-col flex-grow">
        <Link href={productUrl} className="group/title">
          <h3 className="text-base font-bold text-[#142417] group-hover/title:text-[#2e7d32] transition-colors line-clamp-1 cursor-pointer">
            {product.name}
          </h3>
        </Link>

        {/* Price Row */}
        <div className="flex items-baseline gap-2 mt-1.5">
          <span className="text-base font-extrabold text-[#142417]">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-[#829487] line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
          {product.weight && (
            <span className="text-[11px] text-[#829487] ml-auto">
              {product.weight}
            </span>
          )}
        </div>

        {/* Star Rating */}
        <div className="mt-2">
          <StarRating
            rating={product.rating}
            reviewCount={product.reviewCount}
          />
        </div>
      </div>

      {/* Add To Cart CTA Button */}
      <div className="mt-4 pt-1">
        <button
          onClick={() => addToCart(product, 1)}
          className={`w-full py-2.5 px-4 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-[0.98] ${
            inCart
              ? "bg-[#2e7d32] text-white hover:bg-[#256628]"
              : "bg-[#1b3d22] text-white hover:bg-[#142f1a] hover:shadow-md"
          }`}
        >
          {inCart && cartItem ? (
            <>
              <Check size={15} />
              <span>Added ({cartItem.quantity})</span>
            </>
          ) : (
            <>
              <ShoppingBag size={14} />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
