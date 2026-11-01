"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { ALL_PRODUCTS } from "@/data/mockData";
import { Product } from "@/types";

export function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState("");

  if (!isSearchOpen) return null;

  const filteredProducts = searchTerm.trim()
    ? ALL_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : ALL_PRODUCTS.slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-[#e4ece6] animate-in zoom-in-95 duration-200">
        {/* Search Bar Input */}
        <div className="p-4 sm:p-5 border-b border-[#e4ece6] flex items-center gap-3 bg-[#fafbfa]">
          <Search size={20} className="text-[#2e7d32] flex-shrink-0" />
          <input
            type="text"
            placeholder="Search organic fruits, vegetables, oats, honey, superfoods..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
            className="w-full bg-transparent outline-none text-base text-[#142417] placeholder:text-[#829487]"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="text-neutral-400 hover:text-neutral-700 cursor-pointer"
            >
              <X size={16} />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="ml-2 text-xs font-semibold px-2.5 py-1 rounded-md bg-neutral-100 hover:bg-neutral-200 text-neutral-600 cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="p-5 max-h-[60vh] overflow-y-auto">
          <div className="text-xs font-bold uppercase tracking-wider text-[#829487] mb-3">
            {searchTerm ? `Search Results (${filteredProducts.length})` : "Popular Farm Fresh Picks"}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-3 p-2.5 rounded-xl border border-[#eff4f0] hover:border-[#2e7d32] bg-[#fbfbf9] hover:bg-white transition-all group"
              >
                <Link
                  href={`/shop/${product.id}`}
                  onClick={() => setIsSearchOpen(false)}
                  className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-white cursor-pointer"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/shop/${product.id}`}
                    onClick={() => setIsSearchOpen(false)}
                    className="text-sm font-bold text-[#142417] truncate hover:text-[#2e7d32] block transition-colors cursor-pointer"
                  >
                    {product.name}
                  </Link>
                  <p className="text-xs text-[#829487] truncate">{product.category}</p>
                  <p className="text-xs font-extrabold text-[#2e7d32] mt-0.5">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => {
                    addToCart(product, 1);
                    setIsSearchOpen(false);
                  }}
                  className="px-3 py-1.5 rounded-full bg-[#1b3d22] text-white text-xs font-semibold hover:bg-[#2e7d32] transition-colors cursor-pointer"
                >
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
