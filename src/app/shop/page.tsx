"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Filter,
  SlidersHorizontal,
  Search,
  RotateCcw,
  Check,
  ChevronDown,
} from "lucide-react";
import { PageHeader } from "@/ui/PageHeader";
import { ProductCard } from "@/ui/ProductCard";
import { ALL_PRODUCTS, CATEGORIES } from "@/data/mockData";
import { TrustBadges } from "@/components/sections/TrustBadges";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBadge, setSelectedBadge] = useState<string>("All");
  const [priceRange, setPriceRange] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter products
  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter((product) => {
      // Category filter
      if (
        selectedCategory !== "All" &&
        product.category !== selectedCategory
      ) {
        return false;
      }

      // Search query filter
      if (
        searchQuery &&
        !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.category.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Badge filter
      if (selectedBadge !== "All") {
        if (!product.badge || product.badge.text !== selectedBadge) {
          return false;
        }
      }

      // Price filter
      if (priceRange === "under-5" && product.price >= 5) return false;
      if (
        priceRange === "5-8" &&
        (product.price < 5 || product.price > 8)
      )
        return false;
      if (priceRange === "above-8" && product.price <= 8) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.reviewCount - a.reviewCount;
      return 0; // Default featured
    });
  }, [selectedCategory, searchQuery, selectedBadge, priceRange, sortBy]);

  const resetFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
    setSelectedBadge("All");
    setPriceRange("all");
    setSortBy("featured");
  };

  const badgeOptions = ["All", "Best Seller", "-20%", "-15%", "-10%", "New"];

  return (
    <div className="bg-[#fbfbf9] min-h-screen pb-16">
      <PageHeader
        title="Our Organic Shop"
        subtitle="100% certified organic foods, fresh farm produce, and wholesome superfoods harvested directly from trusted eco-friendly growers."
        badge="Pure & Natural"
        breadcrumbs={[{ label: "Shop" }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        {/* Mobile Filter Toggle Button */}
        <div className="lg:hidden flex items-center justify-between gap-4 mb-6">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-[#cbd8cf] text-sm font-bold text-[#142417] shadow-xs"
          >
            <SlidersHorizontal size={16} className="text-[#2e7d32]" />
            <span>Filter Products</span>
          </button>

          <span className="text-xs text-[#829487] font-medium">
            {filteredProducts.length} Products
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Sidebar Filters */}
          <aside
            className={`lg:block ${
              mobileFilterOpen ? "block" : "hidden"
            } bg-white rounded-3xl border border-[#e4ece6] p-6 shadow-xs space-y-6`}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#eff4f0]">
              <div className="flex items-center gap-2">
                <Filter size={18} className="text-[#2e7d32]" />
                <h2 className="text-base font-bold text-[#142417]">Filters</h2>
              </div>
              <button
                onClick={resetFilters}
                className="text-xs text-[#2e7d32] hover:text-[#1b3d22] font-semibold flex items-center gap-1"
              >
                <RotateCcw size={12} />
                <span>Reset</span>
              </button>
            </div>

            {/* Keyword Search */}
            <div>
              <label className="block text-xs font-bold text-[#142417] uppercase tracking-wider mb-2">
                Search Shop
              </label>
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3.5 top-3 text-[#829487]"
                />
                <input
                  type="text"
                  placeholder="e.g. Avocado, Quinoa..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#cbd8cf] text-xs text-[#142417] focus:outline-none focus:border-[#2e7d32] bg-[#fbfbf9]"
                />
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-xs font-bold text-[#142417] uppercase tracking-wider mb-2.5">
                Categories
              </h3>
              <div className="space-y-1.5">
                <button
                  onClick={() => setSelectedCategory("All")}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                    selectedCategory === "All"
                      ? "bg-[#1b3d22] text-white font-bold"
                      : "text-[#4c6052] hover:bg-[#f1f8f3] hover:text-[#1b3d22]"
                  }`}
                >
                  <span>All Categories</span>
                  <span>{ALL_PRODUCTS.length}</span>
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                      selectedCategory === cat.name
                        ? "bg-[#1b3d22] text-white font-bold"
                        : "text-[#4c6052] hover:bg-[#f1f8f3] hover:text-[#1b3d22]"
                    }`}
                  >
                    <span className="truncate pr-2">{cat.name}</span>
                    <span className="text-[11px] opacity-75">
                      {cat.itemCount}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <h3 className="text-xs font-bold text-[#142417] uppercase tracking-wider mb-2.5">
                Price Range
              </h3>
              <div className="space-y-1.5 text-xs text-[#4c6052]">
                {[
                  { id: "all", label: "All Prices" },
                  { id: "under-5", label: "Under $5.00" },
                  { id: "5-8", label: "$5.00 to $8.00" },
                  { id: "above-8", label: "Above $8.00" },
                ].map((range) => (
                  <label
                    key={range.id}
                    className="flex items-center gap-2.5 cursor-pointer py-1 hover:text-[#1b3d22]"
                  >
                    <input
                      type="radio"
                      name="priceRange"
                      checked={priceRange === range.id}
                      onChange={() => setPriceRange(range.id)}
                      className="accent-[#2e7d32]"
                    />
                    <span>{range.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Special Badges */}
            <div>
              <h3 className="text-xs font-bold text-[#142417] uppercase tracking-wider mb-2.5">
                Special Offers
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {badgeOptions.map((badge) => (
                  <button
                    key={badge}
                    onClick={() => setSelectedBadge(badge)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                      selectedBadge === badge
                        ? "bg-[#2e7d32] text-white border-[#2e7d32]"
                        : "bg-white text-[#4c6052] border-[#cbd8cf] hover:border-[#2e7d32]"
                    }`}
                  >
                    {badge}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Product Display Area */}
          <main className="lg:col-span-3 space-y-6">
            {/* Top Toolbar */}
            <div className="bg-white rounded-2xl border border-[#e4ece6] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
              <div className="text-xs sm:text-sm text-[#4c6052]">
                Showing{" "}
                <strong className="text-[#142417]">
                  {filteredProducts.length}
                </strong>{" "}
                organic products
                {selectedCategory !== "All" && (
                  <span>
                    {" "}
                    in <strong className="text-[#2e7d32]">{selectedCategory}</strong>
                  </span>
                )}
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <span className="text-xs text-[#829487]">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-xs font-bold text-[#142417] bg-[#fbfbf9] border border-[#cbd8cf] rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#2e7d32] cursor-pointer"
                >
                  <option value="featured">Featured Picks</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Most Popular Reviews</option>
                </select>
              </div>
            </div>

            {/* Product Cards Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl border border-[#e4ece6] p-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#f1f8f3] text-[#2e7d32] mx-auto flex items-center justify-center font-bold text-xl">
                  🥦
                </div>
                <h3 className="text-lg font-bold text-[#142417]">
                  No matching organic products found
                </h3>
                <p className="text-xs text-[#829487] max-w-sm mx-auto">
                  Try adjusting your filters, clearing your search query, or
                  resetting the price filter to see more products.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2.5 bg-[#1b3d22] text-white rounded-full text-xs font-semibold hover:bg-[#142f1a]"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <div className="mt-16">
        <TrustBadges />
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#fbfbf9]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1b3d22]" />
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
