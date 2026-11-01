import React from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustBadges } from "@/components/sections/TrustBadges";
import { CategorySection } from "@/components/sections/CategorySection";
import { FeaturedProductsSection } from "@/components/sections/FeaturedProductsSection";
import { PromoBannerOne } from "@/components/sections/PromoBannerOne";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { OurStorySection } from "@/components/sections/OurStorySection";
import { CustomerFavoritesSection } from "@/components/sections/CustomerFavoritesSection";
import { DiscountBanner } from "@/components/sections/DiscountBanner";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { NewsletterSection } from "@/components/sections/NewsletterSection";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Trust Badges Bar */}
      <TrustBadges />

      {/* 3. Shop by Category */}
      <CategorySection />

      {/* 4. Best Selling Products */}
      <FeaturedProductsSection />

      {/* 5. Eat Organic Live Better Banner */}
      <PromoBannerOne />

      {/* 6. Why Choose Organic Food Store? */}
      <WhyChooseUsSection />

      {/* 7. Our Story - Better Food for a Brighter Future */}
      <OurStorySection />

      {/* 8. Customer Favorites */}
      <CustomerFavoritesSection />

      {/* 9. Special Offer 20% Off Banner */}
      <DiscountBanner />

      {/* 10. What Our Customers Say (Testimonials) */}
      <TestimonialsSection />

      {/* 11. Latest from Our Blog */}
      <BlogSection />

      {/* 12. Newsletter Subscription */}
      <NewsletterSection />
    </div>
  );
}
