"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Heart,
  ShoppingBag,
  Check,
  Truck,
  ShieldCheck,
  Leaf,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Plus,
  Minus,
  Star,
  Send,
  ArrowRight,
  Clock,
  MapPin,
} from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { StarRating } from "@/ui/StarRating";
import { Badge } from "@/ui/Badge";
import { ProductCard } from "@/ui/ProductCard";

interface Props {
  product: Product;
  relatedProducts: Product[];
}

interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export default function ProductDetailClient({ product, relatedProducts }: Props) {
  const router = useRouter();
  const { addToCart, toggleWishlist, isWishlisted, cart, showToast, isAuthenticated, openAuthModal } = useCart();
  const wishlisted = isWishlisted(product.id);

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [activeTab, setActiveTab] = useState<"desc" | "nutrition" | "shipping" | "reviews">("desc");

  // Reviews state
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "rev-1",
      name: "Sophia Martinez",
      rating: 5,
      date: "3 days ago",
      comment: "Arrived so fresh and fragrant! The flavor is miles ahead of what you get in typical supermarkets. Will order weekly.",
      verified: true,
    },
    {
      id: "rev-2",
      name: "David Kim",
      rating: 5,
      date: "1 week ago",
      comment: "Superb organic quality. Packaging was completely biodegradable and kept everything at the perfect cool temperature.",
      verified: true,
    },
    {
      id: "rev-3",
      name: "Emma Wilson",
      rating: 4,
      date: "2 weeks ago",
      comment: "Very high quality produce. Ripe and ready to eat immediately. Customer service is also wonderfully helpful.",
      verified: true,
    },
  ]);

  // New review form
  const [newReviewName, setNewReviewName] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Gallery images (main image + contextual farm produce imagery)
  const galleryImages = [
    product.image,
    "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=600&q=80",
  ];

  const cartItem = cart.find((i) => i.product.id === product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    if (!isAuthenticated) {
      openAuthModal("/checkout");
    } else {
      router.push("/checkout");
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewComment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      name: newReviewName.trim(),
      rating: newReviewRating,
      date: "Just now",
      comment: newReviewComment.trim(),
      verified: true,
    };

    setReviews([newRev, ...reviews]);
    setNewReviewName("");
    setNewReviewComment("");
    setReviewSubmitted(true);
    showToast("Thank you! Your organic review has been posted.");
    setTimeout(() => setReviewSubmitted(false), 4000);
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="bg-[#fbfbf9] min-h-screen pb-20">
      {/* Breadcrumbs Navigation */}
      <div className="bg-white border-b border-[#e4ece6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <nav className="flex items-center gap-2 text-xs text-[#829487]">
            <Link href="/" className="hover:text-[#1b3d22] transition-colors">
              Home
            </Link>
            <ChevronRight size={13} />
            <Link href="/shop" className="hover:text-[#1b3d22] transition-colors">
              Shop
            </Link>
            <ChevronRight size={13} />
            <span className="text-[#829487] truncate max-w-[140px] sm:max-w-none">
              {product.category}
            </span>
            <ChevronRight size={13} />
            <span className="text-[#142417] font-semibold truncate max-w-[140px] sm:max-w-none">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        {/* Main Product Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 bg-white rounded-3xl p-6 sm:p-10 border border-[#e4ece6] shadow-sm">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            {/* Primary Featured Image Display */}
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-[#fafbfa] border border-[#eff4f0] flex items-center justify-center">
              <Image
                src={selectedImage}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-all duration-300"
              />

              {/* Badges on Top Left */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                {product.badge && (
                  <Badge variant={product.badge.variant}>{product.badge.text}</Badge>
                )}
                {discountPercent > 0 && (
                  <span className="px-2.5 py-1 rounded-full bg-[#ef4444] text-white text-[11px] font-bold shadow-xs">
                    Save {discountPercent}%
                  </span>
                )}
              </div>

              {/* Wishlist Button on Top Right */}
              <button
                onClick={() => toggleWishlist(product)}
                aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md z-10 cursor-pointer ${
                  wishlisted
                    ? "bg-[#fee2e2] text-[#ef4444]"
                    : "bg-white text-[#829487] hover:text-[#ef4444] hover:bg-neutral-50"
                }`}
              >
                <Heart size={20} className={wishlisted ? "fill-[#ef4444] text-[#ef4444]" : ""} />
              </button>
            </div>

            {/* Thumbnail Row */}
            <div className="flex gap-3">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    selectedImage === img
                      ? "border-[#1b3d22] scale-102 shadow-xs"
                      : "border-[#e4ece6] hover:border-[#cbd8cf] opacity-75 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt={`${product.name} angle ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>

            {/* Guarantee Cards Under Gallery */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#f5f7f4] border border-[#e4ece6]">
                <ShieldCheck size={20} className="text-[#2e7d32] flex-shrink-0" />
                <div className="text-xs">
                  <p className="font-bold text-[#142417]">100% Bio Certified</p>
                  <p className="text-[#829487] text-[11px]">Strict pesticide-free audits</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#f5f7f4] border border-[#e4ece6]">
                <Truck size={20} className="text-[#2e7d32] flex-shrink-0" />
                <div className="text-xs">
                  <p className="font-bold text-[#142417]">Cold-Chain Delivery</p>
                  <p className="text-[#829487] text-[11px]">Arrives farm-cold & fresh</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Product Info & Actions */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Fresh Harvest Tag */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2e7d32] bg-[#eaf4ed] px-3 py-1 rounded-full">
                  {product.category}
                </span>
                <span className="text-xs font-semibold text-[#829487] flex items-center gap-1">
                  <Sparkles size={13} className="text-amber-500" />
                  Farm Fresh Harvest
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#142417] tracking-tight">
                {product.name}
              </h1>

              {/* Star Rating and Reviews */}
              <div className="flex items-center gap-3 mt-3">
                <StarRating rating={product.rating} reviewCount={product.reviewCount} />
                <span className="text-xs text-[#829487]">•</span>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className="text-xs font-semibold text-[#2e7d32] hover:underline cursor-pointer"
                >
                  Read {reviews.length} Customer Reviews
                </button>
              </div>

              {/* Price & Savings */}
              <div className="flex items-baseline gap-3 mt-4 pt-4 border-t border-[#f0f4f1]">
                <span className="text-3xl font-extrabold text-[#142417]">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-[#829487] line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                {product.weight && (
                  <span className="text-xs font-semibold text-[#4c6052] bg-[#f5f7f4] px-2.5 py-1 rounded-md border border-[#e4ece6]">
                    Pack: {product.weight}
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2 mt-3 text-xs font-bold text-[#2e7d32]">
                <span className="w-2 h-2 rounded-full bg-[#2e7d32] animate-pulse" />
                <span>In Stock & Ready to Ship from Local Farm Hub</span>
              </div>

              {/* Short Description */}
              <p className="mt-4 text-sm text-[#4c6052] leading-relaxed">
                {product.description ||
                  "Naturally harvested and certified organic produce carefully picked at peak ripeness to ensure optimal flavor, nutrient density, and shelf life."}
              </p>

              {/* Delivery Window Highlight */}
              <div className="mt-5 p-4 rounded-2xl bg-[#f7faf8] border border-[#dce8df] flex items-start gap-3">
                <Clock size={18} className="text-[#2e7d32] flex-shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-bold text-[#142417]">Fast Farm-to-Door Delivery</p>
                  <p className="text-[#4c6052] mt-0.5">
                    Order within <strong>3 hours 20 mins</strong> for estimated delivery{" "}
                    <strong className="text-[#2e7d32]">Tomorrow, 9:00 AM – 1:00 PM</strong>.
                  </p>
                </div>
              </div>
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-4 pt-4 border-t border-[#f0f4f1]">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#142417]">
                  Quantity:
                </span>
                <div className="inline-flex items-center border border-[#cbd8cf] rounded-full bg-[#fbfbf9] p-1">
                  <button
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    aria-label="Decrease quantity"
                    className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white text-[#142417] transition-colors cursor-pointer"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-[#142417]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((prev) => prev + 1)}
                    aria-label="Increase quantity"
                    className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white text-[#142417] transition-colors cursor-pointer"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <span className="text-xs text-[#829487]">
                  Total: <strong className="text-[#142417]">${(product.price * quantity).toFixed(2)}</strong>
                </span>
              </div>

              {/* CTA Buttons Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Add To Cart */}
                <button
                  onClick={handleAddToCart}
                  className="w-full py-3.5 px-6 rounded-full font-bold text-sm bg-[#1b3d22] text-white hover:bg-[#142f1a] transition-all flex items-center justify-center gap-2 shadow-md active:scale-[0.98] cursor-pointer"
                >
                  <ShoppingBag size={17} />
                  <span>
                    {cartItem ? `Add More (${cartItem.quantity} In Cart)` : "Add to Cart"}
                  </span>
                </button>

                {/* Buy Now (Immediate Checkout) */}
                <button
                  onClick={handleBuyNow}
                  className="w-full py-3.5 px-6 rounded-full font-bold text-sm bg-[#2e7d32] text-white hover:bg-[#256628] transition-all flex items-center justify-center gap-2 shadow-md active:scale-[0.98] cursor-pointer"
                >
                  <span>Buy Now</span>
                  <ArrowRight size={17} />
                </button>
              </div>

              {/* Free delivery coupon hint */}
              <p className="text-center text-xs text-[#829487]">
                Use coupon <strong className="text-[#2e7d32]">ORGANIC20</strong> at checkout for 20% off!
              </p>
            </div>
          </div>
        </div>

        {/* Tabbed In-Depth Information */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-10 border border-[#e4ece6] shadow-sm">
          {/* Tabs Navigation */}
          <div className="flex border-b border-[#e4ece6] gap-2 sm:gap-8 overflow-x-auto pb-px">
            {[
              { id: "desc", label: "Description & Farm Story" },
              { id: "nutrition", label: "Nutritional Facts & Storage" },
              { id: "shipping", label: "Cold-Chain Shipping & Delivery" },
              { id: "reviews", label: `Customer Reviews (${reviews.length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`pb-3.5 px-2 text-sm font-bold border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "border-[#1b3d22] text-[#1b3d22]"
                    : "border-transparent text-[#829487] hover:text-[#142417]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Description */}
          {activeTab === "desc" && (
            <div className="pt-6 space-y-4 text-sm text-[#4c6052] leading-relaxed">
              <h3 className="text-lg font-bold text-[#142417]">
                Grown with Passion, Harvested for Vitality
              </h3>
              <p>
                Every unit of our {product.name} is nurtured in certified organic soil cultivated without synthetic chemical sprays, GMOs, or artificial growth accelerators. Our farmers utilize natural composting, companion planting, and regenerative cover-cropping to preserve microbial biodiversity.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="p-4 rounded-xl bg-[#fafbfa] border border-[#e4ece6]">
                  <Leaf className="text-[#2e7d32] mb-2" size={20} />
                  <h4 className="font-bold text-[#142417] text-sm">Pesticide Free</h4>
                  <p className="text-xs text-[#829487] mt-1">100% natural pest deterrents and clean rainwater irrigation.</p>
                </div>
                <div className="p-4 rounded-xl bg-[#fafbfa] border border-[#e4ece6]">
                  <Sparkles className="text-[#2e7d32] mb-2" size={20} />
                  <h4 className="font-bold text-[#142417] text-sm">Peak Flavor</h4>
                  <p className="text-xs text-[#829487] mt-1">Allowed to fully ripen on the plant rather than ripening in transit.</p>
                </div>
                <div className="p-4 rounded-xl bg-[#fafbfa] border border-[#e4ece6]">
                  <RotateCcw className="text-[#2e7d32] mb-2" size={20} />
                  <h4 className="font-bold text-[#142417] text-sm">Zero Waste Pack</h4>
                  <p className="text-xs text-[#829487] mt-1">Shipped in fully biodegradable compostable cardboard trays.</p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Nutrition & Storage */}
          {activeTab === "nutrition" && (
            <div className="pt-6 space-y-5 text-sm text-[#4c6052]">
              <h3 className="text-lg font-bold text-[#142417]">Nutritional Highlights & Storage Guide</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-3.5 rounded-xl bg-[#f5f7f4] border border-[#e4ece6] text-center">
                  <span className="text-xs text-[#829487]">Energy</span>
                  <p className="text-lg font-extrabold text-[#142417] mt-0.5">85 kcal</p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#f5f7f4] border border-[#e4ece6] text-center">
                  <span className="text-xs text-[#829487]">Dietary Fiber</span>
                  <p className="text-lg font-extrabold text-[#142417] mt-0.5">4.8g</p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#f5f7f4] border border-[#e4ece6] text-center">
                  <span className="text-xs text-[#829487]">Vitamins</span>
                  <p className="text-lg font-extrabold text-[#142417] mt-0.5">A, C, E, K</p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#f5f7f4] border border-[#e4ece6] text-center">
                  <span className="text-xs text-[#829487]">Added Sugars</span>
                  <p className="text-lg font-extrabold text-[#2e7d32] mt-0.5">0.0g</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#fafbfa] border border-[#e4ece6] mt-4">
                <h4 className="font-bold text-[#142417] text-sm mb-1">Recommended Storage</h4>
                <p className="text-xs text-[#4c6052] leading-relaxed">
                  Store at cool room temperature until ready to enjoy, or refrigerate at 4°C – 6°C to extend natural crispness. Avoid sealing in non-breathable plastic bags.
                </p>
              </div>
            </div>
          )}

          {/* Tab 3: Shipping & Delivery */}
          {activeTab === "shipping" && (
            <div className="pt-6 space-y-4 text-sm text-[#4c6052] leading-relaxed">
              <h3 className="text-lg font-bold text-[#142417]">Direct Farm Delivery Process</h3>
              <p>
                To preserve botanical freshness, all orders are picked, packed in insulated temperature-controlled cold boxes, and dispatched via our electric delivery vehicle fleet within 12 hours of harvest.
              </p>
              <ul className="space-y-2.5 text-xs text-[#4c6052] list-disc list-inside">
                <li><strong>Same-Day Dispatch:</strong> Orders placed before 1:00 PM are harvested and prepared the same day.</li>
                <li><strong>Contactless Doorstep Delivery:</strong> Real-time SMS and driver live tracking link sent upon dispatch.</li>
                <li><strong>Free Shipping Guarantee:</strong> All orders over $50 automatically qualify for free standard farm shipping.</li>
                <li><strong>100% Freshness Guarantee:</strong> If any item does not meet your quality standards upon arrival, our customer care team will promptly issue a free replacement or instant refund.</li>
              </ul>
            </div>
          )}

          {/* Tab 4: Reviews */}
          {activeTab === "reviews" && (
            <div className="pt-6 space-y-8">
              {/* Existing Reviews List */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-[#142417]">
                  Verified Customer Feedback ({reviews.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-4 rounded-2xl border border-[#e4ece6] bg-[#fafbfa] space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-[#142417]">{rev.name}</span>
                          {rev.verified && (
                            <span className="text-[10px] font-bold text-[#2e7d32] bg-[#eaf4ed] px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Check size={10} /> Verified
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-[#829487]">{rev.date}</span>
                      </div>
                      <div className="flex text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={i < rev.rating ? "fill-amber-400 text-amber-400" : "text-neutral-300"}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-[#4c6052] leading-relaxed">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Write a Review Form */}
              <div className="p-6 rounded-2xl bg-[#f5f7f4] border border-[#e4ece6] space-y-4">
                <h4 className="text-base font-bold text-[#142417]">
                  Share Your Experience with {product.name}
                </h4>

                {reviewSubmitted && (
                  <div className="p-3 rounded-xl bg-[#eaf4ed] text-[#1b3d22] text-xs font-semibold flex items-center gap-2">
                    <Check size={16} />
                    <span>Your review was published successfully!</span>
                  </div>
                )}

                <form onSubmit={handleAddReview} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#142417] mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Jessica Taylor"
                        value={newReviewName}
                        onChange={(e) => setNewReviewName(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-[#cbd8cf] text-xs text-[#142417] bg-white focus:outline-none focus:border-[#1b3d22]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#142417] mb-1">
                        Rating (1 to 5 Stars)
                      </label>
                      <div className="flex items-center gap-1.5 pt-1">
                        {[1, 2, 3, 4, 5].map((starVal) => (
                          <button
                            type="button"
                            key={starVal}
                            onClick={() => setNewReviewRating(starVal)}
                            className="p-1 cursor-pointer"
                          >
                            <Star
                              size={20}
                              className={
                                starVal <= newReviewRating
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-neutral-300"
                              }
                            />
                          </button>
                        ))}
                        <span className="text-xs font-bold text-[#142417] ml-2">
                          {newReviewRating} Stars
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#142417] mb-1">
                      Your Comments
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Tell other healthy food lovers about the freshness, taste, and quality..."
                      value={newReviewComment}
                      onChange={(e) => setNewReviewComment(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-[#cbd8cf] text-xs text-[#142417] bg-white focus:outline-none focus:border-[#1b3d22]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-[#1b3d22] text-white text-xs font-bold hover:bg-[#142f1a] transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Send size={13} />
                    <span>Post Review</span>
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#2e7d32]">
                  Fresh Recommendations
                </span>
                <h2 className="text-2xl font-extrabold text-[#142417]">
                  You Might Also Like
                </h2>
              </div>
              <Link
                href="/shop"
                className="text-xs font-bold text-[#1b3d22] hover:underline flex items-center gap-1"
              >
                <span>View Full Catalog</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
