"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, CartItem, Order, DeliveryStage, DeliveryTimelineStep, Coupon, ShippingAddress, UserProfile } from "@/types";
import { AVAILABLE_COUPONS } from "@/data/mockData";

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotalPrice: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  wishlist: string[];
  toggleWishlist: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;
  wishlistCount: number;

  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  isAccountOpen: boolean;
  setIsAccountOpen: (open: boolean) => void;

  // Authentication state
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => { success: boolean; message: string };
  register: (data: { name: string; email: string; password: string; phone?: string }) => { success: boolean; message: string };
  logout: () => void;
  authRedirectUrl: string | null;
  setAuthRedirectUrl: (url: string | null) => void;
  openAuthModal: (redirectUrl?: string) => void;

  toastMessage: string | null;
  showToast: (message: string) => void;

  // Coupon state
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  discountAmount: number;

  // Delivery / order notes
  orderNotes: string;
  setOrderNotes: (notes: string) => void;

  // Orders and Tracking
  orders: Order[];
  createOrder: (data: {
    items: CartItem[];
    shippingAddress: ShippingAddress;
    paymentMethod: "card" | "upi" | "cod";
    paymentDetails?: { cardLast4?: string; upiId?: string };
    shippingFee: number;
    subtotal: number;
    discount: number;
    tax: number;
    total: number;
    couponCode?: string;
  }) => Order;
  getOrderById: (orderId: string) => Order | undefined;
  updateOrderDeliveryStage: (orderId: string, nextStage?: DeliveryStage) => Order | undefined;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const SAMPLE_ORDERS_DEFAULT: Order[] = [
  {
    id: "ORD-94812",
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    items: [
      {
        product: {
          id: "prod-1",
          name: "Organic Avocado",
          slug: "organic-avocado",
          category: "Fresh Fruits & Vegetables",
          price: 4.99,
          originalPrice: 6.99,
          rating: 5,
          reviewCount: 124,
          image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=600&q=80",
          weight: "2 pcs (approx. 400g)",
        },
        quantity: 2,
        price: 4.99,
      },
      {
        product: {
          id: "prod-3",
          name: "Raw Honey",
          slug: "raw-honey",
          category: "Superfoods",
          price: 8.99,
          rating: 5,
          reviewCount: 78,
          image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80",
          weight: "350g glass jar",
        },
        quantity: 1,
        price: 8.99,
      },
    ],
    subtotal: 18.97,
    discount: 3.79,
    couponCode: "ORGANIC20",
    shippingFee: 4.99,
    tax: 1.01,
    total: 21.18,
    shippingAddress: {
      fullName: "Alex Miller",
      email: "alex.miller@example.com",
      phone: "+1 (555) 234-5678",
      street: "742 Evergreen Terrace",
      apartment: "Apt 4B",
      city: "Springfield",
      state: "Oregon",
      postalCode: "97477",
      deliveryNotes: "Please leave on porch if not home.",
      deliveryOption: "standard",
    },
    paymentMethod: "card",
    paymentDetails: {
      cardLast4: "4242",
    },
    deliveryStage: "out_for_delivery",
    timeline: [
      {
        stage: "placed",
        title: "Order Placed & Confirmed",
        description: "Payment verified. Harvest order assigned to local organic co-op.",
        timestamp: "4 hours ago",
        location: "Central Organic Hub, Springfield",
        completed: true,
        current: false,
      },
      {
        stage: "confirmed",
        title: "Harvested & Packed Fresh",
        description: "Freshly selected from organic farm bins and packaged in eco-insulated cooling boxes.",
        timestamp: "2.5 hours ago",
        location: "Green Valley Bio-Farm Warehouse",
        completed: true,
        current: false,
      },
      {
        stage: "shipped",
        title: "Dispatched with Cold-Chain Fleet",
        description: "En route via zero-emission temperature-controlled electric delivery van.",
        timestamp: "1 hour ago",
        location: "North Metro Sorting Station",
        completed: true,
        current: false,
      },
      {
        stage: "out_for_delivery",
        title: "Out for Final Delivery",
        description: "Courier driver Marcus is currently 6 stops away from your address.",
        timestamp: "20 minutes ago",
        location: "Springfield East Sector",
        completed: true,
        current: true,
      },
      {
        stage: "delivered",
        title: "Delivery Completed",
        description: "Delivered fresh to your doorstep with contact-free photo verification.",
        timestamp: "Estimated today by 6:00 PM",
        location: "Customer Residence",
        completed: false,
        current: false,
      },
    ],
    trackingNumber: "OF-TRK-9827364",
    estimatedDeliveryTime: "Today between 4:30 PM - 6:00 PM",
    courier: {
      name: "EcoFleet Cold-Chain Express",
      phone: "+1 (555) 890-1234",
      driverName: "Marcus Chen",
      vehicleNumber: "EV-VAN-8842",
      agentRating: 4.95,
    },
  },
];

export const DEMO_USER: UserProfile = {
  id: "usr-8821",
  name: "Alex Miller",
  email: "alex.miller@example.com",
  phone: "+1 (555) 234-5678",
  createdAt: "2025-01-15",
  address: {
    street: "742 Evergreen Terrace",
    apartment: "Apt 4B",
    city: "Springfield",
    state: "Oregon",
    postalCode: "97477",
  },
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [authRedirectUrl, setAuthRedirectUrl] = useState<string | null>(null);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>(["prod-1"]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [orderNotes, setOrderNotes] = useState<string>("");
  const [orders, setOrders] = useState<Order[]>(SAMPLE_ORDERS_DEFAULT);

  // Initialize from localStorage or defaults
  useEffect(() => {
    // 0. User Auth
    try {
      const savedUser = localStorage.getItem("organic_user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch {}

    // 1. Cart
    try {
      const savedCart = localStorage.getItem("organic_cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      } else {
        setCart([
          {
            product: {
              id: "prod-1",
              name: "Organic Avocado",
              slug: "organic-avocado",
              category: "Fresh Fruits & Vegetables",
              price: 4.99,
              originalPrice: 6.99,
              rating: 5,
              reviewCount: 124,
              image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=600&q=80",
              weight: "2 pcs (approx. 400g)",
            },
            quantity: 2,
          },
          {
            product: {
              id: "prod-3",
              name: "Raw Honey",
              slug: "raw-honey",
              category: "Superfoods",
              price: 8.99,
              rating: 5,
              reviewCount: 78,
              image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80",
              weight: "350g glass jar",
            },
            quantity: 1,
          },
        ]);
      }
    } catch {
      // fallback
    }

    // 2. Orders
    try {
      const savedOrders = localStorage.getItem("organic_orders");
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
    } catch {
      // fallback
    }

    // 3. Coupon
    try {
      const savedCoupon = localStorage.getItem("organic_coupon");
      if (savedCoupon) {
        setAppliedCoupon(JSON.parse(savedCoupon));
      }
    } catch {
      // fallback
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("organic_cart", JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem("organic_orders", JSON.stringify(orders));
    } catch {}
  }, [orders]);

  useEffect(() => {
    try {
      if (appliedCoupon) {
        localStorage.setItem("organic_coupon", JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem("organic_coupon");
      }
    } catch {}
  }, [appliedCoupon]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const openAuthModal = (redirectUrl?: string) => {
    if (redirectUrl) setAuthRedirectUrl(redirectUrl);
    setIsAccountOpen(true);
  };

  const login = (email: string, password: string): { success: boolean; message: string } => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !password) {
      return { success: false, message: "Please provide both email and password." };
    }

    // Check if demo user
    if (cleanEmail === DEMO_USER.email.toLowerCase()) {
      setUser(DEMO_USER);
      try {
        localStorage.setItem("organic_user", JSON.stringify(DEMO_USER));
      } catch {}
      showToast(`Welcome back, ${DEMO_USER.name}!`);
      return { success: true, message: `Welcome back, ${DEMO_USER.name}!` };
    }

    // Check registered users in localStorage
    try {
      const storedUsersRaw = localStorage.getItem("organic_registered_users");
      const storedUsers: { user: UserProfile; passwordHash: string }[] = storedUsersRaw
        ? JSON.parse(storedUsersRaw)
        : [];

      const matched = storedUsers.find((u) => u.user.email.toLowerCase() === cleanEmail);
      if (matched) {
        if (matched.passwordHash === password) {
          setUser(matched.user);
          localStorage.setItem("organic_user", JSON.stringify(matched.user));
          showToast(`Welcome back, ${matched.user.name}!`);
          return { success: true, message: `Welcome back, ${matched.user.name}!` };
        } else {
          return { success: false, message: "Invalid password. Please check your credentials." };
        }
      }
    } catch {}

    // Fallback: create dynamic profile for test credentials
    const fallbackName = cleanEmail.split("@")[0].replace(/[._]/g, " ");
    const formattedName = fallbackName
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    const dynamicUser: UserProfile = {
      id: `usr-${Date.now().toString().slice(-4)}`,
      name: formattedName || "Valued Customer",
      email: cleanEmail,
      phone: "+1 (555) 234-5678",
      createdAt: new Date().toISOString(),
    };

    setUser(dynamicUser);
    try {
      localStorage.setItem("organic_user", JSON.stringify(dynamicUser));
    } catch {}
    showToast(`Signed in successfully as ${dynamicUser.name}!`);
    return { success: true, message: `Signed in as ${dynamicUser.name}` };
  };

  const register = (data: {
    name: string;
    email: string;
    password: string;
    phone?: string;
  }): { success: boolean; message: string } => {
    const cleanEmail = data.email.trim().toLowerCase();
    const cleanName = data.name.trim();

    if (!cleanName || !cleanEmail || !data.password) {
      return { success: false, message: "Please fill out all required fields." };
    }

    if (data.password.length < 6) {
      return { success: false, message: "Password must be at least 6 characters long." };
    }

    const newUser: UserProfile = {
      id: `usr-${Date.now().toString().slice(-4)}`,
      name: cleanName,
      email: cleanEmail,
      phone: data.phone?.trim() || "+1 (555) 000-0000",
      createdAt: new Date().toISOString(),
    };

    try {
      const storedUsersRaw = localStorage.getItem("organic_registered_users");
      const storedUsers: { user: UserProfile; passwordHash: string }[] = storedUsersRaw
        ? JSON.parse(storedUsersRaw)
        : [];

      storedUsers.push({ user: newUser, passwordHash: data.password });
      localStorage.setItem("organic_registered_users", JSON.stringify(storedUsers));
      localStorage.setItem("organic_user", JSON.stringify(newUser));
    } catch {}

    setUser(newUser);
    showToast(`Account created! Welcome to Organic Food Store, ${cleanName}!`);
    return { success: true, message: `Account created successfully!` };
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem("organic_user");
    } catch {}
    showToast("You have been signed out.");
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added ${quantity}x "${product.name}" to cart!`);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast("Item removed from cart");
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        showToast(`Removed "${product.name}" from wishlist`);
        return prev.filter((id) => id !== product.id);
      } else {
        showToast(`Added "${product.name}" to wishlist`);
        return [...prev, product.id];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotalPrice = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  // Calculate discount based on applied coupon
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercent) {
      discountAmount = (subtotalPrice * appliedCoupon.discountPercent) / 100;
    } else if (appliedCoupon.discountFixed) {
      discountAmount = Math.min(subtotalPrice, appliedCoupon.discountFixed);
    }
  }

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = AVAILABLE_COUPONS.find((c) => c.code === cleanCode);
    if (!found) {
      return { success: false, message: `Coupon code "${code}" is invalid or expired.` };
    }
    if (found.minOrder && subtotalPrice < found.minOrder) {
      return {
        success: false,
        message: `Coupon "${cleanCode}" requires a minimum order of $${found.minOrder.toFixed(2)}.`,
      };
    }
    setAppliedCoupon(found);
    showToast(`Coupon "${cleanCode}" applied successfully!`);
    return { success: true, message: `Coupon "${cleanCode}" applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast("Coupon removed.");
  };

  const totalPrice = Math.max(0, subtotalPrice - discountAmount);

  // Create and store order
  const createOrder = (data: {
    items: CartItem[];
    shippingAddress: ShippingAddress;
    paymentMethod: "card" | "upi" | "cod";
    paymentDetails?: { cardLast4?: string; upiId?: string };
    shippingFee: number;
    subtotal: number;
    discount: number;
    tax: number;
    total: number;
    couponCode?: string;
  }): Order => {
    const orderNum = Math.floor(100000 + Math.random() * 900000);
    const newOrderId = `ORD-${orderNum}`;
    const now = new Date();

    const initialTimeline: DeliveryTimelineStep[] = [
      {
        stage: "placed",
        title: "Order Placed & Confirmed",
        description: "Payment verified. Farm harvest order allocated to local warehouse.",
        timestamp: "Just now",
        location: "Central Organic Processing Facility",
        completed: true,
        current: true,
      },
      {
        stage: "confirmed",
        title: "Harvested & Packed Fresh",
        description: "Picked by our farmers and packed into eco-friendly temperature-controlled insulation.",
        timestamp: "Upcoming (Est. in 1-2 hours)",
        location: "Green Valley Bio-Farm Warehouse",
        completed: false,
        current: false,
      },
      {
        stage: "shipped",
        title: "Dispatched with Cold-Chain Fleet",
        description: "Loaded onto electric delivery van equipped with refrigerated compartments.",
        timestamp: "Upcoming",
        location: "Metro Logistic Depot",
        completed: false,
        current: false,
      },
      {
        stage: "out_for_delivery",
        title: "Out for Final Delivery",
        description: "Delivery partner assigned for door-to-door fresh handover.",
        timestamp: "Upcoming",
        location: `${data.shippingAddress.city} Delivery Hub`,
        completed: false,
        current: false,
      },
      {
        stage: "delivered",
        title: "Delivered to Doorstep",
        description: "Handed over fresh to customer with confirmation pin.",
        timestamp: "Upcoming",
        location: `${data.shippingAddress.street}, ${data.shippingAddress.city}`,
        completed: false,
        current: false,
      },
    ];

    const newOrder: Order = {
      id: newOrderId,
      createdAt: now.toISOString(),
      items: data.items.map((i) => ({
        product: i.product,
        quantity: i.quantity,
        price: i.product.price,
      })),
      subtotal: data.subtotal,
      discount: data.discount,
      couponCode: data.couponCode,
      shippingFee: data.shippingFee,
      tax: data.tax,
      total: data.total,
      shippingAddress: data.shippingAddress,
      paymentMethod: data.paymentMethod,
      paymentDetails: data.paymentDetails,
      deliveryStage: "placed",
      timeline: initialTimeline,
      trackingNumber: `OF-TRK-${Math.floor(1000000 + Math.random() * 9000000)}`,
      estimatedDeliveryTime: "Tomorrow by 2:00 PM - 5:00 PM",
      courier: {
        name: "EcoFleet Cold-Chain Express",
        phone: "+1 (555) 890-1234",
        driverName: "Marcus Chen",
        vehicleNumber: "EV-VAN-8842",
        agentRating: 4.96,
      },
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const getOrderById = (orderId: string): Order | undefined => {
    if (!orderId) return undefined;
    const clean = orderId.trim().toUpperCase();
    return orders.find(
      (o) =>
        o.id.toUpperCase() === clean ||
        o.trackingNumber.toUpperCase() === clean
    );
  };

  const updateOrderDeliveryStage = (orderId: string, specificStage?: DeliveryStage): Order | undefined => {
    const stageSequence: DeliveryStage[] = [
      "placed",
      "confirmed",
      "shipped",
      "out_for_delivery",
      "delivered",
    ];

    let updatedOrder: Order | undefined;

    setOrders((prev) => {
      return prev.map((ord) => {
        if (ord.id.toUpperCase() !== orderId.trim().toUpperCase()) return ord;

        const currentIndex = stageSequence.indexOf(ord.deliveryStage);
        let nextStage: DeliveryStage;

        if (specificStage) {
          nextStage = specificStage;
        } else {
          // Advance to next stage or wrap to delivered
          if (currentIndex < stageSequence.length - 1) {
            nextStage = stageSequence[currentIndex + 1];
          } else {
            nextStage = "delivered";
          }
        }

        const nextIndex = stageSequence.indexOf(nextStage);
        const nowString = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

        const updatedTimeline = ord.timeline.map((step, idx) => {
          if (idx < nextIndex) {
            return {
              ...step,
              completed: true,
              current: false,
              timestamp: step.timestamp.includes("Upcoming") ? `${nowString} (Completed)` : step.timestamp,
            };
          } else if (idx === nextIndex) {
            return {
              ...step,
              completed: true,
              current: true,
              timestamp: `Just now (${nowString})`,
            };
          } else {
            return {
              ...step,
              completed: false,
              current: false,
            };
          }
        });

        updatedOrder = {
          ...ord,
          deliveryStage: nextStage,
          timeline: updatedTimeline,
        };
        return updatedOrder;
      });
    });

    return updatedOrder;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotalPrice,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isWishlisted,
        wishlistCount: wishlist.length,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        isAccountOpen,
        setIsAccountOpen,
        user,
        isAuthenticated: Boolean(user),
        login,
        register,
        logout,
        authRedirectUrl,
        setAuthRedirectUrl,
        openAuthModal,
        toastMessage,
        showToast,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        discountAmount,
        orderNotes,
        setOrderNotes,
        orders,
        createOrder,
        getOrderById,
        updateOrderDeliveryStage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
