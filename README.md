# 🌿 Organic Food Store - Next.js & Tailwind CSS

A pixel-perfect, responsive, and reusable e-commerce landing page built with **Next.js 16 (App Router)**, **Tailwind CSS**, and **TypeScript**, accurately replicating the provided organic food storefront design.

---

## ✨ Features & Sections (Matching Design)

1. **Header & Navigation**:
   - Leaf emblem branding: **Organic Food Store.com**
   - Navigation links: *Home, Shop, Categories, About, Blog, Contact*
   - Interactive search bar modal with instant product search
   - Wishlist toggle with badge count
   - Slide-over Shopping Cart drawer with quantity controls, subtotal, and dynamic free shipping progress bar
   - "My Account" pill CTA button with authentication modal

2. **Hero Section**:
   - Eyebrow badge: `FRESH • NATURAL • ORGANIC`
   - Editorial headline: **"Good Food for a Healthier Tomorrow"**
   - Subtitle & CTA button: `"Shop Now →"`
   - High-resolution fresh produce harvest visual with 100% bio-certified badges

3. **Trust Badges Strip**:
   - `100% Organic Products`
   - `Fast & Safe Delivery`
   - `No Artificial Additives`
   - `Money Back Guarantee`

4. **Shop by Category**:
   - 6 category cards: *Fresh Fruits & Vegetables*, *Grains & Cereals*, *Dairy & Eggs*, *Snacks & Nuts*, *Organic Beverages*, *Superfoods*
   - Category item counters, hover elevation, and zoom effect

5. **Featured Products ("Our Best Selling Organic Products")**:
   - Reusable `ProductCard` component
   - Badges (`Best Seller`, `-20%`, `New`, `-15%`)
   - Organic Avocado, Organic Quinoa, Raw Honey, Organic Almonds
   - Price strikethroughs, 5-star ratings with review counts, and interactive "Add to Cart" button

6. **Promo Banner ("Eat Organic Live Better")**:
   - Deep forest green container with organic botanical patterns
   - Circular organic bowl with floating `"100% NATURAL FOOD"` seal
   - `"Explore Our Collection →"` CTA

7. **Why Choose Organic Food Store?**:
   - 4 Pillars: *Premium Quality Organic Products*, *Sustainably Sourced*, *Healthier Lifestyle*, *Trusted by Thousands*
   - Organic bottom wave contour

8. **Our Story ("Better Food for a Brighter Future")**:
   - Story copy highlighting sustainable farmer relationships
   - Farmer crate visual & `"Learn More →"` CTA

9. **Customer Favorites**:
   - Interactive carousel controls (`<` and `>`)
   - 4 Products: *Organic Blueberries*, *Organic Oats*, *Organic Spinach*, *Organic Chia Seeds*

10. **Special Offer Banner**:
    - `"Get 20% Off Your First Order"` with coupon code `ORGANIC20`
    - High-resolution green detox smoothie visual with citrus garnish

11. **Testimonials ("What Our Customers Say")**:
    - Real customer quotes (Sarah Johnson, Michael Brown, Emily Davis)
    - 5 yellow star rating and customer avatar photos

12. **Latest from Our Blog**:
    - 3 organic recipes and healthy lifestyle articles
    - Date, reading time badges, and `"Read More →"` links

13. **Newsletter Subscription**:
    - Interactive email subscribe input with validation and toast notification

14. **Footer**:
    - 4-column layout: Brand info & social media icons, Quick Links, Customer Service, Contact Us
    - Copyright and legal links

---

## 🎨 CSS Root Variables (`:root`)

Defined in [`src/app/globals.css`](file:///c:/Users/Tanisha/Documents/antigravity/focused-tesla/src/app/globals.css) for clean theming and reusability:

```css
:root {
  /* Primary Greens */
  --primary: #1b3d22;
  --primary-hover: #142f1a;
  --primary-light: #295733;
  --primary-soft: #eaf4ed;
  
  /* Accent Green */
  --accent: #2e7d32;
  --accent-light: #81c784;
  --accent-tint: #f1f8f3;

  /* Backgrounds & Neutrals */
  --bg-page: #fbfbf9;
  --bg-card: #ffffff;
  --bg-subtle: #f5f7f4;
  --bg-banner: #16361e;
  --bg-footer: #0d1e12;

  /* Text Colors */
  --text-heading: #142417;
  --text-body: #4c6052;
  --text-muted: #829487;

  /* Badges */
  --badge-orange: #d9531e;
  --badge-orange-bg: #fdf2ed;
  --badge-teal: #0d8a68;
  --badge-teal-bg: #ebf9f5;
  --badge-green: #1b5e20;
  --badge-green-bg: #e8f5e9;

  /* Borders & Radii */
  --border-color: #e4ece6;
  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 20px;
  --radius-xl: 28px;
  --radius-pill: 9999px;
}
```

---

## 🧱 Project Structure

```text
src/
├── app/
│   ├── globals.css          # CSS Root variables & custom design tokens
│   ├── layout.tsx           # Providers, font, Navbar, Footer, and Modals
│   ├── page.tsx             # Home page assembling all 12 sections
│   ├── shop/page.tsx        # Dedicated Shop page with filters & search
│   ├── categories/page.tsx  # Detailed categories browser & highlights
│   ├── about/page.tsx       # Our story, farm partners, and stats
│   ├── blog/page.tsx        # Articles, recipe guides, and search
│   ├── blog/[slug]/page.tsx # Dynamic full article reading experience
│   └── contact/page.tsx     # Contact info, inquiry form, and FAQs
├── components/
│   ├── ui/                  # Reusable UI primitives
│   │   ├── Badge.tsx        # Dynamic pill badges (Best Seller, Discount, New)
│   │   ├── Button.tsx       # Reusable button with variants & arrows
│   │   ├── ProductCard.tsx  # Interactive product card with cart/wishlist
│   │   ├── SectionHeader.tsx# Reusable section header with view all & carousel controls
│   │   ├── StarRating.tsx   # 5-star rating with review counter
│   │   └── ToastNotification.tsx # Notification toast on cart/wishlist actions
│   ├── layout/
│   │   ├── Navbar.tsx       # Sticky responsive navbar with badges & mobile drawer
│   │   └── Footer.tsx       # 4-column footer with social icons & contact details
│   ├── sections/            # Individual, reusable landing page sections
│   │   ├── HeroSection.tsx
│   │   ├── TrustBadges.tsx
│   │   ├── CategorySection.tsx
│   │   ├── FeaturedProductsSection.tsx
│   │   ├── PromoBannerOne.tsx
│   │   ├── WhyChooseUsSection.tsx
│   │   ├── OurStorySection.tsx
│   │   ├── CustomerFavoritesSection.tsx
│   │   ├── DiscountBanner.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── BlogSection.tsx
│   │   └── NewsletterSection.tsx
│   └── modals/
│       ├── CartDrawer.tsx   # Slide-out interactive shopping cart
│       ├── SearchModal.tsx  # Instant search modal with filter
│       └── AccountModal.tsx # Login / sign-up modal
├── context/
│   └── CartContext.tsx      # Global cart, wishlist, search, and toast state
├── data/
│   └── mockData.ts          # Central typed mock dataset
└── types/
    └── index.ts             # TypeScript definitions
```

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Open in browser
# http://localhost:3000
```
"# Eco-food" 
