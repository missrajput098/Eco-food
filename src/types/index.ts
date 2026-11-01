// TypeScript Type Definitions for Organic Food Store

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  createdAt?: string;
  address?: {
    street: string;
    apartment?: string;
    city: string;
    state: string;
    postalCode: string;
  };
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: {
    text: string;
    variant: "best-seller" | "discount" | "new" | "organic";
  };
  weight?: string;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  itemCount: number;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  quote: string;
  rating: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
  category?: string;
  author?: {
    name: string;
    role: string;
    avatar: string;
  };
  content?: string[];
  tags?: string[];
}

export interface TrustBadgeItem {
  id: string;
  title: string;
  description?: string;
  icon: "organic" | "delivery" | "pure" | "guarantee";
}

export interface WhyChooseItem {
  id: string;
  title: string;
  description: string;
  icon: "quality" | "sustainable" | "health" | "trusted";
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

export type DeliveryStage = "placed" | "confirmed" | "shipped" | "out_for_delivery" | "delivered";

export interface DeliveryTimelineStep {
  stage: DeliveryStage;
  title: string;
  description: string;
  timestamp: string;
  location?: string;
  completed: boolean;
  current: boolean;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  deliveryNotes?: string;
  deliveryOption: "standard" | "express" | "same-day";
}

export interface Order {
  id: string;
  createdAt: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  shippingFee: number;
  tax: number;
  total: number;
  shippingAddress: ShippingAddress;
  paymentMethod: "card" | "upi" | "cod";
  paymentDetails?: {
    cardLast4?: string;
    upiId?: string;
  };
  deliveryStage: DeliveryStage;
  timeline: DeliveryTimelineStep[];
  trackingNumber: string;
  estimatedDeliveryTime: string;
  courier: {
    name: string;
    phone: string;
    driverName: string;
    vehicleNumber: string;
    agentRating: number;
  };
}

export interface Coupon {
  code: string;
  discountPercent?: number;
  discountFixed?: number;
  freeShipping?: boolean;
  minOrder?: number;
  description: string;
}
