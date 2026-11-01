import { Product, Category, Testimonial, BlogPost, TrustBadgeItem, WhyChooseItem } from "@/types";

export const CATEGORIES: Category[] = [
  {
    id: "cat-1",
    name: "Fresh Fruits & Vegetables",
    slug: "fruits-vegetables",
    image: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=600&q=80",
    itemCount: 42,
  },
  {
    id: "cat-2",
    name: "Grains & Cereals",
    slug: "grains-cereals",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
    itemCount: 28,
  },
  {
    id: "cat-3",
    name: "Dairy & Eggs",
    slug: "dairy-eggs",
    image: "https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?auto=format&fit=crop&w=600&q=80",
    itemCount: 19,
  },
  {
    id: "cat-4",
    name: "Snacks & Nuts",
    slug: "snacks-nuts",
    image: "https://images.unsplash.com/photo-1508061252966-f72fb98cbd60?auto=format&fit=crop&w=600&q=80",
    itemCount: 34,
  },
  {
    id: "cat-5",
    name: "Organic Beverages",
    slug: "beverages",
    image: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=600&q=80",
    itemCount: 25,
  },
  {
    id: "cat-6",
    name: "Superfoods",
    slug: "superfoods",
    image: "https://images.unsplash.com/photo-1506459225024-1428097a7e18?auto=format&fit=crop&w=600&q=80",
    itemCount: 16,
  },
];

export const BEST_SELLING_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Organic Avocado",
    slug: "organic-avocado",
    category: "Fresh Fruits & Vegetables",
    price: 4.99,
    originalPrice: 6.99,
    rating: 5,
    reviewCount: 124,
    image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=600&q=80",
    badge: {
      text: "Best Seller",
      variant: "best-seller",
    },
    weight: "2 pcs (approx. 400g)",
    description: "Creamy, naturally grown Hass avocados rich in healthy monounsaturated fats and vitamins.",
  },
  {
    id: "prod-2",
    name: "Organic Quinoa",
    slug: "organic-quinoa",
    category: "Grains & Cereals",
    price: 5.99,
    originalPrice: 7.49,
    rating: 5,
    reviewCount: 89,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
    badge: {
      text: "-20%",
      variant: "discount",
    },
    weight: "500g",
    description: "Premium Peruvian royal white quinoa, packed with plant-based complete protein and fiber.",
  },
  {
    id: "prod-3",
    name: "Raw Honey",
    slug: "raw-honey",
    category: "Superfoods",
    price: 8.99,
    rating: 5,
    reviewCount: 78,
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80",
    badge: {
      text: "New",
      variant: "new",
    },
    weight: "350g glass jar",
    description: "Pure, unfiltered wildflower honey harvested responsibly from local sustainable apiaries.",
  },
  {
    id: "prod-4",
    name: "Organic Almonds",
    slug: "organic-almonds",
    category: "Snacks & Nuts",
    price: 9.99,
    originalPrice: 11.99,
    rating: 5,
    reviewCount: 152,
    image: "https://images.unsplash.com/photo-1508061252966-f72fb98cbd60?auto=format&fit=crop&w=600&q=80",
    badge: {
      text: "-15%",
      variant: "discount",
    },
    weight: "400g pack",
    description: "Crunchy, nonpareil unpasteurized raw organic almonds, perfect for snacking and homemade almond milk.",
  },
];

export const CUSTOMER_FAVORITES: Product[] = [
  {
    id: "fav-1",
    name: "Organic Blueberries",
    slug: "organic-blueberries",
    category: "Fresh Fruits & Vegetables",
    price: 6.99,
    originalPrice: 7.99,
    rating: 5,
    reviewCount: 87,
    image: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=600&q=80",
    badge: {
      text: "-10%",
      variant: "discount",
    },
    weight: "250g box",
    description: "Sweet, antioxidant-loaded wild organic blueberries hand-picked at peak ripeness.",
  },
  {
    id: "fav-2",
    name: "Organic Oats",
    slug: "organic-oats",
    category: "Grains & Cereals",
    price: 3.99,
    originalPrice: 4.99,
    rating: 5,
    reviewCount: 143,
    image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=600&q=80",
    badge: {
      text: "Best Seller",
      variant: "best-seller",
    },
    weight: "750g bag",
    description: "100% whole grain rolled oats for creamy morning porridge and hearty breakfast bowls.",
  },
  {
    id: "fav-3",
    name: "Organic Spinach",
    slug: "organic-spinach",
    category: "Fresh Fruits & Vegetables",
    price: 3.49,
    originalPrice: 4.10,
    rating: 5,
    reviewCount: 68,
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80",
    badge: {
      text: "-15%",
      variant: "discount",
    },
    weight: "300g bunch",
    description: "Tender, iron-rich baby spinach leaves freshly harvested from certified pesticide-free soil.",
  },
  {
    id: "fav-4",
    name: "Organic Chia Seeds",
    slug: "organic-chia-seeds",
    category: "Superfoods",
    price: 5.99,
    rating: 5,
    reviewCount: 95,
    image: "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=600&q=80",
    badge: {
      text: "New",
      variant: "new",
    },
    weight: "450g pouch",
    description: "Cold-milled organic black chia seeds loaded with omega-3 fatty acids and soluble dietary fiber.",
  },
];

export const ALL_PRODUCTS: Product[] = [
  ...BEST_SELLING_PRODUCTS,
  ...CUSTOMER_FAVORITES,
  {
    id: "prod-9",
    name: "Heirloom Tomatoes",
    slug: "heirloom-tomatoes",
    category: "Fresh Fruits & Vegetables",
    price: 4.49,
    originalPrice: 5.99,
    rating: 5,
    reviewCount: 54,
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80",
    badge: {
      text: "-25%",
      variant: "discount",
    },
    weight: "500g basket",
    description: "Sun-ripened organic heirloom tomatoes bursting with natural sweet flavor and antioxidants.",
  },
  {
    id: "prod-10",
    name: "Cold-Pressed Green Juice",
    slug: "green-juice",
    category: "Organic Beverages",
    price: 6.49,
    rating: 5,
    reviewCount: 112,
    image: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=600&q=80",
    badge: {
      text: "Best Seller",
      variant: "best-seller",
    },
    weight: "350ml glass bottle",
    description: "Raw kale, cucumber, green apple, ginger and lemon cold pressed without added water or sugars.",
  },
  {
    id: "prod-11",
    name: "Pasture-Raised Organic Eggs",
    slug: "organic-eggs",
    category: "Dairy & Eggs",
    price: 5.49,
    originalPrice: 6.20,
    rating: 5,
    reviewCount: 140,
    image: "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=600&q=80",
    badge: {
      text: "New",
      variant: "new",
    },
    weight: "Dozen (12 pcs)",
    description: "Fresh brown eggs from free-roaming hens raised on organic pastures with sunshine and natural feed.",
  },
  {
    id: "prod-12",
    name: "Organic Raw Acai Powder",
    slug: "acai-powder",
    category: "Superfoods",
    price: 12.99,
    originalPrice: 15.99,
    rating: 5,
    reviewCount: 76,
    image: "https://images.unsplash.com/photo-1506459225024-1428097a7e18?auto=format&fit=crop&w=600&q=80",
    badge: {
      text: "-20%",
      variant: "discount",
    },
    weight: "200g pouch",
    description: "Freeze-dried wild Amazonian organic acai berries, ideal for smoothie bowls and healthy shakes.",
  },
];

export const TRUST_BADGES: TrustBadgeItem[] = [
  {
    id: "trust-1",
    title: "100% Organic Products",
    description: "Certified bio & pesticide-free",
    icon: "organic",
  },
  {
    id: "trust-2",
    title: "Fast & Safe Delivery",
    description: "Temperature-controlled fleet",
    icon: "delivery",
  },
  {
    id: "trust-3",
    title: "No Artificial Additives",
    description: "Zero preservatives or chemicals",
    icon: "pure",
  },
  {
    id: "trust-4",
    title: "Money Back Guarantee",
    description: "100% satisfaction promised",
    icon: "guarantee",
  },
];

export const WHY_CHOOSE_ITEMS: WhyChooseItem[] = [
  {
    id: "why-1",
    title: "Premium Quality Organic Products",
    description: "Every item is rigorously inspected to satisfy highest bio standards.",
    icon: "quality",
  },
  {
    id: "why-2",
    title: "Sustainably Sourced",
    description: "Direct partnerships with eco-friendly farms preserving soil biodiversity.",
    icon: "sustainable",
  },
  {
    id: "why-3",
    title: "Healthier Lifestyle",
    description: "Nutrient-dense whole foods designed to energize and nourish your body.",
    icon: "health",
  },
  {
    id: "why-4",
    title: "Trusted by Thousands",
    description: "Over 25,000 satisfied families enjoying nature's finest goods every week.",
    icon: "trusted",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Sarah Johnson",
    location: "New York, USA",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    quote: "The quality is amazing! Everything arrived fresh and the taste is unbeatable. Highly recommend!",
    rating: 5,
  },
  {
    id: "test-2",
    name: "Michael Brown",
    location: "Los Angeles, USA",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    quote: "I've been buying from Organic Food Store for months now. Great products, fair prices and fast delivery.",
    rating: 5,
  },
  {
    id: "test-3",
    name: "Emily Davis",
    location: "Chicago, USA",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
    quote: "Finally a store that truly cares about healthy food and the planet. Love it!",
    rating: 5,
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-1",
    title: "5 Easy Organic Recipes for a Healthier You",
    slug: "5-easy-organic-recipes",
    category: "Recipes",
    date: "May 18, 2025",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    excerpt: "Discover quick and delicious meals made with fresh farm produce that your whole family will love.",
    author: {
      name: "Chef Julian Vance",
      role: "Culinary Nutritionist",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
    tags: ["Recipes", "Quick Meals", "Organic Produce", "Meal Prep"],
    content: [
      "Eating organic doesn't have to be complicated or time-consuming. With seasonal farm-fresh ingredients, the natural flavors shine with minimal seasoning and straightforward preparation.",
      "1. Golden Quinoa & Roasted Veggie Medley: Toss diced sweet bell peppers, red onion, and zucchini in cold-pressed olive oil, roast at 400°F (200°C) for 25 minutes, and fold into fluffy Peruvian white quinoa with fresh parsley, lemon juice, and roasted pumpkin seeds.",
      "2. 5-Minute Green Detox Blender Bowl: Blend frozen ripe bananas with a handful of fresh baby spinach, organic chia seeds, and half an avocado. Top with fresh wild blueberries and a drizzle of raw unfiltered honey.",
      "3. Creamy Tuscan Tomato & White Bean Soup: Sauté minced garlic in extra virgin olive oil, add crushed heirloom organic tomatoes, vegetable broth, and tender cannellini beans. Simmer for 15 minutes and finish with fresh basil chiffonade.",
      "4. Mason Jar Rainbow Crisp Salad: Layer ingredients starting from the bottom: lemon vinaigrette, diced cucumbers, shredded carrots, cooked chickpeas, diced avocado, and crisp mixed greens. Keeps fresh for up to 4 days!",
      "5. Overnight Rolled Oat Parfait: Combine rolled whole grain oats with unsweetened oat milk, a tablespoon of chia seeds, cinnamon, and raw honey. Chill overnight in the fridge and top with sliced strawberries in the morning.",
    ],
  },
  {
    id: "blog-2",
    title: "Why Organic Food is Better for the Environment",
    slug: "why-organic-food-is-better-environment",
    category: "Sustainability",
    date: "May 12, 2025",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80",
    excerpt: "How sustainable agricultural practices protect pollinators, nourish topsoil, and reduce carbon footprints.",
    author: {
      name: "Dr. Maya Lindqvist",
      role: "Environmental Agro-Scientist",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    },
    tags: ["Environment", "Regenerative Soil", "Ecology", "Climate Action"],
    content: [
      "Every time you choose certified organic foods, you are casting a vote for the health of our planet's soil, waterways, and wildlife ecosystems.",
      "Conventional industrial farming relies heavily on synthetic petrochemical pesticides and artificial nitrogen fertilizers. When rain falls, these synthetic chemicals wash into underground aquifers, rivers, and oceans, causing toxic algal blooms and dead zones.",
      "By contrast, organic farming practices emphasize natural crop rotations, biological pest control, and organic composting. This preserves the beneficial bacteria and fungal mycelium in the topsoil, allowing the ground to sequester carbon dioxide directly from the atmosphere.",
      "Furthermore, organic farms are safe havens for essential pollinators. Honeybees, bumblebees, and native butterflies thrive in chemical-free environments, securing the biodiversity necessary for the future of global food security.",
    ],
  },
  {
    id: "blog-3",
    title: "Top 10 Superfoods for Your Daily Diet",
    slug: "top-10-superfoods-daily-diet",
    category: "Healthy Living",
    date: "May 5, 2025",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80",
    excerpt: "Incorporate these nutrient powerhouses into your breakfast smoothies and salads for all-day energy.",
    author: {
      name: "Marcus Sterling",
      role: "Holistic Health Coach",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    },
    tags: ["Superfoods", "Immunity", "Nutrition", "Energy"],
    content: [
      "Superfoods are whole foods that pack an exceptionally high concentration of essential vitamins, antioxidants, minerals, and healthy fats.",
      "1. Wild Blueberries: Ranked among the highest antioxidant capacities of all fruits, wild blueberries protect brain cells and support cellular longevity.",
      "2. Raw Unfiltered Honey: Unlike processed white sugar, raw wildflower honey contains live enzymes, bee pollen, and antiviral polyphenols.",
      "3. Black Chia Seeds: Rich in alpha-linolenic omega-3 fatty acids, soluble fiber, and calcium for gut motility and sustained energy.",
      "4. Hass Avocados: Loaded with oleic acid, a healthy monounsaturated fat that helps your body absorb fat-soluble vitamins A, D, E, and K.",
      "5. Baby Spinach: Fresh leafy iron powerhouse filled with lutein for eye health and chlorophyll for natural detoxification.",
      "6. Peruvian Quinoa: A complete plant protein supplying all nine essential amino acids.",
      "7. Raw Almonds: High in magnesium and vitamin E for glowing skin and cardiovascular wellness.",
      "8. Organic Rolled Oats: Contain beta-glucan, a soluble fiber proven to regulate cholesterol and blood sugar balance.",
      "9. Raw Acai Berries: Rich in anthocyanins and deep purple pigments that fight oxidative stress.",
      "10. Green Matcha Tea: Provides calm, sustained focus thanks to the amino acid L-theanine combined with clean natural caffeine.",
    ],
  },
  {
    id: "blog-4",
    title: "The Ultimate Guide to Cold-Pressed Juicing at Home",
    slug: "guide-to-cold-pressed-juicing",
    category: "Healthy Living",
    date: "April 28, 2025",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=800&q=80",
    excerpt: "Learn how to preserve essential enzymes and micro-nutrients when extracting pure fruit and veggie juices.",
    author: {
      name: "Chef Julian Vance",
      role: "Culinary Nutritionist",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
    tags: ["Juicing", "Detox", "Vitamins", "Cleanse"],
    content: [
      "Unlike standard centrifugal juicers whose high-speed blades generate heat that oxidizes delicate enzymes, cold-pressed mastication operates at low RPMs.",
      "This gentle hydraulic or auger squeezing protects the living cellular structure of fresh produce, producing juice that stays nutritionally active for up to 72 hours.",
      "Our golden formula for morning vitality: 2 large organic cucumbers (pure hydration), 4 stalks of celery, 1 green apple (subtle natural sweetness), 1 inch of fresh ginger root, and half a peeled lemon.",
      "Always wash produce thoroughly and keep your bottles airtight in the refrigerator away from direct light.",
    ],
  },
  {
    id: "blog-5",
    title: "How Regenerative Farming Heals the Planet",
    slug: "how-regenerative-farming-heals-planet",
    category: "Sustainability",
    date: "April 20, 2025",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80",
    excerpt: "Why cover crops, crop rotation, and zero-chemical soil conservation are the answers to climate restoration.",
    author: {
      name: "Dr. Maya Lindqvist",
      role: "Environmental Agro-Scientist",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    },
    tags: ["Regenerative Farming", "Soil Health", "Ecology", "Farmers"],
    content: [
      "Regenerative agriculture goes beyond simply avoiding harmful chemicals—it actively rebuilds and enriches soil organic matter and restores degraded soil biodiversity.",
      "When farmers plant cover crops such as clover and vetch during off-seasons, roots draw atmospheric nitrogen into the soil without synthetic chemical fertilizers.",
      "At Organic Food Store, all our 120+ partner farms practice regenerative techniques, ensuring that every crop harvested leaves the land healthier than before.",
    ],
  },
  {
    id: "blog-6",
    title: "Morning Superfood Bowls: 4 Delicious Energy Blends",
    slug: "morning-superfood-bowls",
    category: "Recipes",
    date: "April 15, 2025",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    excerpt: "Combine organic berries, chia seeds, oats, and raw honey for clean sustained morning focus and stamina.",
    author: {
      name: "Marcus Sterling",
      role: "Holistic Health Coach",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    },
    tags: ["Breakfast", "Smoothie Bowls", "Recipes", "Healthy Start"],
    content: [
      "Breakfast sets the hormonal and metabolic rhythm for the remainder of your day. Swapping processed pastries for nutrient-rich smoothie bowls delivers steady glucose without the dreaded mid-morning slump.",
      "1. Wild Blueberry & Acai Power Bowl: Blend frozen wild blueberries, unsweetened almond milk, and acai powder. Garnish with hemp seeds, toasted coconut flakes, and fresh sliced kiwi.",
      "2. Creamy Golden Mango Maca Bowl: Blend frozen organic mango chunks with coconut yogurt, a teaspoon of maca root powder, and a squeeze of lime. Top with crunchy raw almonds.",
      "3. Green Goddess Glow Bowl: Avocado, baby spinach, frozen green grapes, and a dash of matcha powder. Top with chia seeds and raw buckwheat groats for satisfying crunch.",
      "4. Chocolate Cacao & Hazelnut Treat: Blend ripe frozen bananas, organic raw cacao powder, and rolled oats. Garnish with chopped raw hazelnuts and raw honey.",
    ],
  },
];

export const AVAILABLE_COUPONS: {
  code: string;
  discountPercent?: number;
  discountFixed?: number;
  freeShipping?: boolean;
  minOrder?: number;
  description: string;
}[] = [
  {
    code: "ORGANIC20",
    discountPercent: 20,
    description: "20% off your entire organic food order",
  },
  {
    code: "FREESHIP",
    freeShipping: true,
    description: "Free express farm shipping with zero delivery fee",
  },
  {
    code: "HEALTH10",
    discountFixed: 10,
    minOrder: 35,
    description: "$10 off on orders above $35",
  },
];

export function getProductByIdOrSlug(idOrSlug: string): Product | undefined {
  if (!idOrSlug) return undefined;
  const normalized = idOrSlug.toLowerCase();
  return ALL_PRODUCTS.find(
    (p) =>
      p.id.toLowerCase() === normalized ||
      p.slug.toLowerCase() === normalized ||
      p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === normalized
  );
}

export function getRelatedProducts(productId: string, limit = 4): Product[] {
  const current = ALL_PRODUCTS.find((p) => p.id === productId);
  if (!current) return ALL_PRODUCTS.slice(0, limit);
  const sameCategory = ALL_PRODUCTS.filter(
    (p) => p.id !== productId && p.category === current.category
  );
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }
  const others = ALL_PRODUCTS.filter(
    (p) => p.id !== productId && p.category !== current.category
  );
  return [...sameCategory, ...others].slice(0, limit);
}
