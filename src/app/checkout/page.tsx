"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Lock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Smartphone,
  Banknote,
  Leaf,
  ChevronDown,
  ChevronUp,
  User,
  Mail,
  UserCheck,
  LogOut,
  ShoppingBag,
} from "lucide-react";
import { useCart, DEMO_USER } from "@/context/CartContext";
import { PageHeader } from "@/ui/PageHeader";

export default function CheckoutPage() {
  const router = useRouter();
  const {
    cart,
    subtotalPrice,
    appliedCoupon,
    discountAmount,
    orderNotes,
    createOrder,
    user,
    isAuthenticated,
    login,
    register,
    logout,
    showToast,
  } = useCart();

  // Auth form state if user arrives on /checkout without being logged in
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authName, setAuthName] = useState("");
  const [authPhone, setAuthPhone] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);

  // Contact State
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Shipping Address State
  const [street, setStreet] = useState("742 Evergreen Terrace");
  const [apartment, setApartment] = useState("Apt 4B");
  const [city, setCity] = useState("Springfield");
  const [state, setState] = useState("Oregon");
  const [postalCode, setPostalCode] = useState("97477");
  const [notes, setNotes] = useState(orderNotes || "Please ring bell and leave on the covered porch.");

  // Delivery Speed Option
  const [deliveryOption, setDeliveryOption] = useState<"standard" | "express" | "same-day">("standard");

  // Payment Method State
  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi" | "cod">("card");
  const [cardNumber, setCardNumber] = useState("4242 •••• •••• 4242");
  const [cardExpiry, setCardExpiry] = useState("12/28");
  const [cardCvv, setCardCvv] = useState("382");
  const [cardName, setCardName] = useState("Alex Miller");
  const [upiId, setUpiId] = useState("alex@okaxis");

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showSummaryItems, setShowSummaryItems] = useState(true);

  // Sync user info into checkout form when authenticated
  useEffect(() => {
    if (user) {
      const parts = user.name.split(" ");
      setFirstName(parts[0] || "");
      setLastName(parts.slice(1).join(" ") || "");
      setEmail(user.email || "");
      if (user.phone) setPhone(user.phone);
      if (user.address) {
        setStreet(user.address.street);
        if (user.address.apartment) setApartment(user.address.apartment);
        setCity(user.address.city);
        setState(user.address.state);
        setPostalCode(user.address.postalCode);
      }
    }
  }, [user]);

  // Delivery fee calculation
  let deliveryFee = 0;
  if (deliveryOption === "standard") {
    deliveryFee = subtotalPrice >= 50 || appliedCoupon?.freeShipping ? 0 : 4.99;
  } else if (deliveryOption === "express") {
    deliveryFee = 8.99;
  } else if (deliveryOption === "same-day") {
    deliveryFee = 12.99;
  }

  const taxableAmount = Math.max(0, subtotalPrice - discountAmount);
  const tax = taxableAmount * 0.05;
  const grandTotal = taxableAmount + deliveryFee + tax;

  const handleFillDemoData = () => {
    setEmail("alex.miller@example.com");
    setPhone("+1 (555) 234-5678");
    setFirstName("Alex");
    setLastName("Miller");
    setStreet("742 Evergreen Terrace");
    setApartment("Apt 4B");
    setCity("Springfield");
    setState("Oregon");
    setPostalCode("97477");
    setNotes("Gate code 5512. Fragile organic greens, please handle with care!");
    showToast("Sample demo shipping details filled!");
  };

  const handleInPageLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    const res = login(authEmail, authPassword);
    if (!res.success) {
      setAuthError(res.message);
    }
  };

  const handleInPageRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    const res = register({
      name: authName,
      email: authEmail,
      phone: authPhone,
      password: authPassword,
    });
    if (!res.success) {
      setAuthError(res.message);
    }
  };

  const handleInPageDemoLogin = () => {
    setAuthError(null);
    login(DEMO_USER.email, "password123");
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!isAuthenticated) {
      setErrorMessage("Please sign in to complete your checkout.");
      return;
    }

    if (cart.length === 0) {
      setErrorMessage("Your cart is empty. Please add items before checking out.");
      return;
    }

    if (!firstName.trim() || !lastName.trim() || !street.trim() || !city.trim() || !postalCode.trim() || !phone.trim() || !email.trim()) {
      setErrorMessage("Please complete all required shipping and contact fields.");
      return;
    }

    setIsSubmitting(true);

    // Simulate realistic payment authorization and warehouse packing queue
    setTimeout(() => {
      try {
        const newOrder = createOrder({
          items: cart,
          shippingAddress: {
            fullName: `${firstName.trim()} ${lastName.trim()}`,
            email: email.trim(),
            phone: phone.trim(),
            street: street.trim(),
            apartment: apartment.trim(),
            city: city.trim(),
            state: state.trim(),
            postalCode: postalCode.trim(),
            deliveryNotes: notes.trim(),
            deliveryOption,
          },
          paymentMethod,
          paymentDetails: {
            cardLast4: paymentMethod === "card" ? cardNumber.slice(-4) || "4242" : undefined,
            upiId: paymentMethod === "upi" ? upiId : undefined,
          },
          shippingFee: deliveryFee,
          subtotal: subtotalPrice,
          discount: discountAmount,
          tax,
          total: grandTotal,
          couponCode: appliedCoupon?.code,
        });

        router.push(`/orders/${newOrder.id}`);
      } catch (err) {
        setIsSubmitting(false);
        setErrorMessage("Something went wrong while placing your order. Please try again.");
      }
    }, 1400);
  };

  if (cart.length === 0) {
    return (
      <div className="bg-[#fbfbf9] min-h-screen py-16">
        <div className="max-w-xl mx-auto px-4 text-center bg-white p-8 sm:p-12 rounded-3xl border border-[#e4ece6] shadow-sm">
          <div className="w-16 h-16 rounded-full bg-[#f1f8f3] text-[#2e7d32] mx-auto flex items-center justify-center mb-4">
            <Truck size={28} />
          </div>
          <h2 className="text-xl font-bold text-[#142417]">Your Cart is Empty</h2>
          <p className="text-xs text-[#829487] mt-2 mb-6">
            There are no items to checkout. Add some fresh organic items to begin the delivery flow.
          </p>
          <Link
            href="/shop"
            className="px-6 py-2.5 rounded-full bg-[#1b3d22] text-white text-xs font-bold hover:bg-[#142f1a] transition-all inline-flex items-center gap-2"
          >
            <span>Explore Organic Catalog</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fbfbf9] min-h-screen pb-20">
      <PageHeader
        title="Secure Organic Checkout"
        subtitle="Complete your shipping destination and payment details for farm-to-table temperature controlled delivery."
        badge="Verified Farm Order"
        breadcrumbs={[{ label: "Cart", href: "/cart" }, { label: "Checkout" }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        {/* CHECK IF USER IS NOT LOGGED IN: SHOW GATED AUTHENTICATION VIEW */}
        {!isAuthenticated ? (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-[#e4ece6] p-6 sm:p-10 shadow-sm space-y-6 animate-in fade-in-50 duration-300">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-[#eaf4ed] text-[#1b3d22] mx-auto flex items-center justify-center shadow-xs">
                <Lock size={26} />
              </div>
              <h2 className="text-2xl font-extrabold text-[#142417]">
                Login Required to Complete Checkout
              </h2>
              <p className="text-xs sm:text-sm text-[#829487] max-w-md mx-auto">
                Shopping & order placement requires an authenticated profile so our courier partner can confirm live delivery coordinates and notifications.
              </p>
            </div>

            {/* Quick Demo Login Pill */}
            <div className="p-4 rounded-2xl bg-[#f7faf8] border border-[#c8e6c9] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-[#1b3d22]">
                <Sparkles size={16} className="text-[#2e7d32] flex-shrink-0" />
                <span>
                  <strong>Instant Demo Access:</strong> Skip manual typing and login with 1 click!
                </span>
              </div>
              <button
                type="button"
                onClick={handleInPageDemoLogin}
                className="px-4 py-2 rounded-full bg-[#1b3d22] text-white text-xs font-bold hover:bg-[#142f1a] transition-all cursor-pointer self-start sm:self-auto shadow-xs"
              >
                1-Click Demo Login
              </button>
            </div>

            {/* Tabs for in-page Login / Register */}
            <div className="flex border-b border-[#e4ece6]">
              <button
                onClick={() => {
                  setAuthMode("login");
                  setAuthError(null);
                }}
                className={`flex-1 pb-3 text-sm font-bold border-b-2 text-center transition-all cursor-pointer ${
                  authMode === "login"
                    ? "border-[#1b3d22] text-[#1b3d22]"
                    : "border-transparent text-[#829487] hover:text-[#142417]"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setAuthMode("register");
                  setAuthError(null);
                }}
                className={`flex-1 pb-3 text-sm font-bold border-b-2 text-center transition-all cursor-pointer ${
                  authMode === "register"
                    ? "border-[#1b3d22] text-[#1b3d22]"
                    : "border-transparent text-[#829487] hover:text-[#142417]"
                }`}
              >
                Create New Account
              </button>
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-semibold flex items-center gap-2">
                <AlertCircle size={15} />
                <span>{authError}</span>
              </div>
            )}

            {authMode === "login" ? (
              <form onSubmit={handleInPageLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#142417] mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-3.5 text-[#829487]" />
                    <input
                      type="email"
                      required
                      placeholder="alex.miller@example.com"
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#cbd8cf] text-xs text-[#142417] bg-[#fbfbf9] focus:outline-none focus:border-[#1b3d22]"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-[#142417]">Password</label>
                    <span className="text-[11px] text-[#2e7d32] font-semibold">
                      Demo password: password123
                    </span>
                  </div>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-3.5 text-[#829487]" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#cbd8cf] text-xs text-[#142417] bg-[#fbfbf9] focus:outline-none focus:border-[#1b3d22]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#1b3d22] hover:bg-[#142f1a] text-white font-bold rounded-full text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Sign In & Continue Checkout</span>
                  <ArrowRight size={16} />
                </button>
              </form>
            ) : (
              <form onSubmit={handleInPageRegister} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-[#142417] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jessica Taylor"
                    value={authName}
                    onChange={(e) => setAuthName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#cbd8cf] text-xs text-[#142417] bg-[#fbfbf9] focus:outline-none focus:border-[#1b3d22]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#142417] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="jessica@example.com"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#cbd8cf] text-xs text-[#142417] bg-[#fbfbf9] focus:outline-none focus:border-[#1b3d22]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#142417] mb-1">
                    Phone Number (for driver delivery updates)
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={authPhone}
                    onChange={(e) => setAuthPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#cbd8cf] text-xs text-[#142417] bg-[#fbfbf9] focus:outline-none focus:border-[#1b3d22]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#142417] mb-1">
                    Password * (at least 6 characters)
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    placeholder="••••••••"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#cbd8cf] text-xs text-[#142417] bg-[#fbfbf9] focus:outline-none focus:border-[#1b3d22]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#1b3d22] hover:bg-[#142f1a] text-white font-bold rounded-full text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Create Account & Continue Checkout</span>
                  <ArrowRight size={16} />
                </button>
              </form>
            )}

            <div className="pt-4 border-t border-[#eff4f0] flex items-center justify-center gap-2 text-xs text-[#829487]">
              <ShieldCheck size={16} className="text-[#2e7d32]" />
              <span>Your cart items and discounts are preserved securely.</span>
            </div>
          </div>
        ) : (
          /* USER IS AUTHENTICATED: PROCEED TO FULL CHECKOUT STEPS */
          <div>
            {/* Authenticated User Status Banner */}
            <div className="mb-6 p-4 rounded-2xl bg-white border border-[#c8e6c9] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1b3d22] text-[#81c784] font-bold text-sm flex items-center justify-center">
                  {user?.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#142417]">
                      Logged in as {user?.name}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#eaf4ed] text-[#1b3d22] flex items-center gap-1">
                      <UserCheck size={11} /> Verified Account
                    </span>
                  </div>
                  <span className="text-xs text-[#829487]">{user?.email}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleFillDemoData}
                  className="px-3.5 py-1.5 rounded-full bg-[#eaf4ed] hover:bg-[#d5ebd9] text-[#1b3d22] text-xs font-bold transition-colors cursor-pointer"
                >
                  Autofill Demo Address
                </button>
                <button
                  type="button"
                  onClick={logout}
                  className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-red-500 transition-colors cursor-pointer"
                  title="Sign out of account"
                >
                  <LogOut size={16} />
                </button>
              </div>
            </div>

            {errorMessage && (
              <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                <AlertCircle size={16} />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handlePlaceOrder}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left 8 Cols: Steps Form */}
                <div className="lg:col-span-8 space-y-6">
                  {/* Step 1: Customer Information */}
                  <div className="bg-white rounded-3xl border border-[#e4ece6] p-6 sm:p-8 shadow-xs space-y-5">
                    <div className="flex items-center gap-3 pb-3 border-b border-[#eff4f0]">
                      <span className="w-7 h-7 rounded-full bg-[#1b3d22] text-white text-xs font-bold flex items-center justify-center">
                        1
                      </span>
                      <div>
                        <h2 className="text-base font-bold text-[#142417]">Contact Information</h2>
                        <p className="text-xs text-[#829487]">We will send order confirmation and SMS tracking updates here.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#142417] mb-1">
                          First Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#cbd8cf] text-xs text-[#142417] bg-[#fbfbf9] focus:outline-none focus:border-[#1b3d22]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#142417] mb-1">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#cbd8cf] text-xs text-[#142417] bg-[#fbfbf9] focus:outline-none focus:border-[#1b3d22]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#142417] mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#cbd8cf] text-xs text-[#142417] bg-[#fbfbf9] focus:outline-none focus:border-[#1b3d22]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#142417] mb-1">
                          Phone Number * (for delivery driver)
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#cbd8cf] text-xs text-[#142417] bg-[#fbfbf9] focus:outline-none focus:border-[#1b3d22]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Shipping Destination */}
                  <div className="bg-white rounded-3xl border border-[#e4ece6] p-6 sm:p-8 shadow-xs space-y-5">
                    <div className="flex items-center gap-3 pb-3 border-b border-[#eff4f0]">
                      <span className="w-7 h-7 rounded-full bg-[#1b3d22] text-white text-xs font-bold flex items-center justify-center">
                        2
                      </span>
                      <div>
                        <h2 className="text-base font-bold text-[#142417]">Delivery Address</h2>
                        <p className="text-xs text-[#829487]">Where should our temperature-controlled driver bring your order?</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-[#142417] mb-1">
                          Street Address *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 742 Evergreen Terrace"
                          value={street}
                          onChange={(e) => setStreet(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#cbd8cf] text-xs text-[#142417] bg-[#fbfbf9] focus:outline-none focus:border-[#1b3d22]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#142417] mb-1">
                          Apartment, suite, unit, building (optional)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Apt 4B, 2nd Floor"
                          value={apartment}
                          onChange={(e) => setApartment(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#cbd8cf] text-xs text-[#142417] bg-[#fbfbf9] focus:outline-none focus:border-[#1b3d22]"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-[#142417] mb-1">
                            City *
                          </label>
                          <input
                            type="text"
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#cbd8cf] text-xs text-[#142417] bg-[#fbfbf9] focus:outline-none focus:border-[#1b3d22]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#142417] mb-1">
                            State / Province *
                          </label>
                          <input
                            type="text"
                            required
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#cbd8cf] text-xs text-[#142417] bg-[#fbfbf9] focus:outline-none focus:border-[#1b3d22]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#142417] mb-1">
                            ZIP / Postal Code *
                          </label>
                          <input
                            type="text"
                            required
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#cbd8cf] text-xs text-[#142417] bg-[#fbfbf9] focus:outline-none focus:border-[#1b3d22]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#142417] mb-1">
                          Delivery Instructions for Driver
                        </label>
                        <textarea
                          rows={2}
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="e.g. Ring doorbell, leave on front porch"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#cbd8cf] text-xs text-[#142417] bg-[#fbfbf9] focus:outline-none focus:border-[#1b3d22]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Delivery Method & Speed */}
                  <div className="bg-white rounded-3xl border border-[#e4ece6] p-6 sm:p-8 shadow-xs space-y-5">
                    <div className="flex items-center gap-3 pb-3 border-b border-[#eff4f0]">
                      <span className="w-7 h-7 rounded-full bg-[#1b3d22] text-white text-xs font-bold flex items-center justify-center">
                        3
                      </span>
                      <div>
                        <h2 className="text-base font-bold text-[#142417]">Delivery Speed & Method</h2>
                        <p className="text-xs text-[#829487]">Select how swiftly you wish to receive your organic harvest.</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {/* Standard Option */}
                      <label
                        className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                          deliveryOption === "standard"
                            ? "border-[#1b3d22] bg-[#f7faf8]"
                            : "border-[#e4ece6] hover:border-[#cbd8cf]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="deliveryOption"
                            checked={deliveryOption === "standard"}
                            onChange={() => setDeliveryOption("standard")}
                            className="text-[#1b3d22] focus:ring-[#1b3d22]"
                          />
                          <div>
                            <p className="text-sm font-bold text-[#142417]">
                              Standard Farm Delivery (2–3 business days)
                            </p>
                            <p className="text-xs text-[#829487]">
                              Harvested & routed through eco-friendly batch logistics.
                            </p>
                          </div>
                        </div>
                        <span className="text-sm font-extrabold text-[#2e7d32]">
                          {subtotalPrice >= 50 || appliedCoupon?.freeShipping ? "FREE" : "$4.99"}
                        </span>
                      </label>

                      {/* Express Morning Option */}
                      <label
                        className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                          deliveryOption === "express"
                            ? "border-[#1b3d22] bg-[#f7faf8]"
                            : "border-[#e4ece6] hover:border-[#cbd8cf]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="deliveryOption"
                            checked={deliveryOption === "express"}
                            onChange={() => setDeliveryOption("express")}
                            className="text-[#1b3d22] focus:ring-[#1b3d22]"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-bold text-[#142417]">
                                Express Morning Delivery (Tomorrow 8:00 AM – 12:00 PM)
                              </p>
                              <span className="text-[10px] font-bold bg-[#eaf4ed] text-[#1b3d22] px-2 py-0.5 rounded-full">
                                Popular
                              </span>
                            </div>
                            <p className="text-xs text-[#829487]">
                              Prioritized morning harvest packed directly into chilled box.
                            </p>
                          </div>
                        </div>
                        <span className="text-sm font-extrabold text-[#142417]">$8.99</span>
                      </label>

                      {/* Same-Day Option */}
                      <label
                        className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                          deliveryOption === "same-day"
                            ? "border-[#1b3d22] bg-[#f7faf8]"
                            : "border-[#e4ece6] hover:border-[#cbd8cf]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="deliveryOption"
                            checked={deliveryOption === "same-day"}
                            onChange={() => setDeliveryOption("same-day")}
                            className="text-[#1b3d22] focus:ring-[#1b3d22]"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-bold text-[#142417]">
                                Zero-Emission Same-Day Delivery (Today by 7:00 PM)
                              </p>
                              <span className="text-[10px] font-bold bg-[#1b3d22] text-[#81c784] px-2 py-0.5 rounded-full">
                                Electric Van
                              </span>
                            </div>
                            <p className="text-xs text-[#829487]">
                              Immediate courier dispatch direct from nearby greenhouse co-op.
                            </p>
                          </div>
                        </div>
                        <span className="text-sm font-extrabold text-[#142417]">$12.99</span>
                      </label>
                    </div>
                  </div>

                  {/* Step 4: Payment Method */}
                  <div className="bg-white rounded-3xl border border-[#e4ece6] p-6 sm:p-8 shadow-xs space-y-5">
                    <div className="flex items-center gap-3 pb-3 border-b border-[#eff4f0]">
                      <span className="w-7 h-7 rounded-full bg-[#1b3d22] text-white text-xs font-bold flex items-center justify-center">
                        4
                      </span>
                      <div>
                        <h2 className="text-base font-bold text-[#142417]">Payment Method</h2>
                        <p className="text-xs text-[#829487]">All payment transactions are encrypted with 256-bit bank-grade SSL.</p>
                      </div>
                    </div>

                    {/* Payment Selection Tabs */}
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("card")}
                        className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                          paymentMethod === "card"
                            ? "border-[#1b3d22] bg-[#f7faf8] text-[#1b3d22] font-bold"
                            : "border-[#e4ece6] hover:border-[#cbd8cf] text-[#4c6052]"
                        }`}
                      >
                        <CreditCard size={20} className="mb-1" />
                        <span className="text-xs">Credit/Debit Card</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod("upi")}
                        className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                          paymentMethod === "upi"
                            ? "border-[#1b3d22] bg-[#f7faf8] text-[#1b3d22] font-bold"
                            : "border-[#e4ece6] hover:border-[#cbd8cf] text-[#4c6052]"
                        }`}
                      >
                        <Smartphone size={20} className="mb-1" />
                        <span className="text-xs">UPI / Digital Wallet</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod("cod")}
                        className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                          paymentMethod === "cod"
                            ? "border-[#1b3d22] bg-[#f7faf8] text-[#1b3d22] font-bold"
                            : "border-[#e4ece6] hover:border-[#cbd8cf] text-[#4c6052]"
                        }`}
                      >
                        <Banknote size={20} className="mb-1" />
                        <span className="text-xs">Cash on Delivery</span>
                      </button>
                    </div>

                    {/* Method Specific Fields */}
                    {paymentMethod === "card" && (
                      <div className="space-y-4 pt-2">
                        <div>
                          <label className="block text-xs font-bold text-[#142417] mb-1">
                            Card Number
                          </label>
                          <input
                            type="text"
                            required
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="4242 4242 4242 4242"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#cbd8cf] text-xs text-[#142417] bg-[#fbfbf9] focus:outline-none focus:border-[#1b3d22]"
                          />
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-[#142417] mb-1">
                              Expiry Date
                            </label>
                            <input
                              type="text"
                              required
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              placeholder="MM/YY"
                              className="w-full px-3.5 py-2.5 rounded-xl border border-[#cbd8cf] text-xs text-[#142417] bg-[#fbfbf9] focus:outline-none focus:border-[#1b3d22]"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-[#142417] mb-1">
                              CVV / CVC
                            </label>
                            <input
                              type="text"
                              required
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value)}
                              placeholder="123"
                              maxLength={4}
                              className="w-full px-3.5 py-2.5 rounded-xl border border-[#cbd8cf] text-xs text-[#142417] bg-[#fbfbf9] focus:outline-none focus:border-[#1b3d22]"
                            />
                          </div>

                          <div className="col-span-2 sm:col-span-1">
                            <label className="block text-xs font-bold text-[#142417] mb-1">
                              Cardholder Name
                            </label>
                            <input
                              type="text"
                              required
                              value={cardName}
                              onChange={(e) => setCardName(e.target.value)}
                              placeholder="Name on card"
                              className="w-full px-3.5 py-2.5 rounded-xl border border-[#cbd8cf] text-xs text-[#142417] bg-[#fbfbf9] focus:outline-none focus:border-[#1b3d22]"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === "upi" && (
                      <div className="space-y-3 pt-2">
                        <label className="block text-xs font-bold text-[#142417] mb-1">
                          Enter UPI ID / Virtual Payment Address
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="username@okhdfcbank or phone@upi"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#cbd8cf] text-xs text-[#142417] bg-[#fbfbf9] focus:outline-none focus:border-[#1b3d22]"
                        />
                        <p className="text-[11px] text-[#829487]">
                          Compatible with Google Pay, Apple Pay, PhonePe, Paytm, and BHIM UPI.
                        </p>
                      </div>
                    )}

                    {paymentMethod === "cod" && (
                      <div className="p-4 rounded-2xl bg-[#fafbfa] border border-[#e4ece6] text-xs text-[#4c6052] space-y-1">
                        <p className="font-bold text-[#142417]">Pay on Handover</p>
                        <p>
                          You can pay via Cash, Credit/Debit card, or mobile scan upon courier arrival at your door.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right 4 Cols: Order Review & Place Order Button */}
                <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
                  <div className="bg-white rounded-3xl border border-[#e4ece6] p-6 shadow-sm space-y-5">
                    <div className="flex items-center justify-between pb-3 border-b border-[#eff4f0]">
                      <h2 className="text-base font-bold text-[#142417]">
                        Order Summary ({cart.length} {cart.length === 1 ? "item" : "items"})
                      </h2>
                      <button
                        type="button"
                        onClick={() => setShowSummaryItems(!showSummaryItems)}
                        className="text-xs text-[#2e7d32] font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <span>{showSummaryItems ? "Hide" : "Show"}</span>
                        {showSummaryItems ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>
                    </div>

                    {/* Collapsible Items List */}
                    {showSummaryItems && (
                      <div className="max-h-60 overflow-y-auto space-y-3 pr-1 divide-y divide-[#eff4f0]">
                        {cart.map(({ product, quantity }) => (
                          <div key={product.id} className="pt-2.5 first:pt-0 flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-[#fafbfa] border border-[#eff4f0] flex-shrink-0">
                              <Image src={product.image} alt={product.name} fill className="object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-bold text-[#142417] truncate">{product.name}</h4>
                              <span className="text-[11px] text-[#829487]">
                                Qty: {quantity} × ${product.price.toFixed(2)}
                              </span>
                            </div>
                            <span className="text-xs font-extrabold text-[#142417]">
                              ${(product.price * quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Financial Breakdown */}
                    <div className="space-y-2.5 text-xs text-[#4c6052] pt-2 border-t border-[#eff4f0]">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span className="font-bold text-[#142417]">${subtotalPrice.toFixed(2)}</span>
                      </div>

                      {discountAmount > 0 && (
                        <div className="flex justify-between text-[#2e7d32]">
                          <span>Discount ({appliedCoupon?.code})</span>
                          <span className="font-bold">-${discountAmount.toFixed(2)}</span>
                        </div>
                      )}

                      <div className="flex justify-between">
                        <span>Delivery ({deliveryOption})</span>
                        <span className={`font-bold ${deliveryFee === 0 ? "text-[#2e7d32]" : "text-[#142417]"}`}>
                          {deliveryFee === 0 ? "FREE" : `$${deliveryFee.toFixed(2)}`}
                        </span>
                      </div>

                      <div className="flex justify-between text-[#829487]">
                        <span>Estimated Sales Tax (5%)</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>

                      <div className="pt-3 border-t border-[#eff4f0] flex justify-between items-baseline text-base font-extrabold text-[#142417]">
                        <span>Total Due</span>
                        <span className="text-2xl text-[#1b3d22]">${grandTotal.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Final Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-4 px-6 rounded-full font-bold text-sm text-white flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.98] cursor-pointer ${
                        isSubmitting
                          ? "bg-[#829487] cursor-wait"
                          : "bg-[#1b3d22] hover:bg-[#142f1a] hover:shadow-xl"
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Authorizing & Reserving Produce...</span>
                        </>
                      ) : (
                        <>
                          <Lock size={15} />
                          <span>Place Order & Schedule Delivery</span>
                        </>
                      )}
                    </button>

                    <p className="text-[11px] text-[#829487] text-center leading-relaxed">
                      By clicking Place Order, you confirm acceptance of our organic freshness guarantee and terms of service.
                    </p>
                  </div>

                  {/* Guarantees Box */}
                  <div className="p-4 rounded-2xl bg-[#fafbfa] border border-[#e4ece6] text-xs text-[#4c6052] space-y-2">
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={16} className="text-[#2e7d32]" />
                      <span>256-Bit SSL Bank-Grade Encryption</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck size={16} className="text-[#2e7d32]" />
                      <span>Real-Time SMS & GPS Courier Tracking</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Leaf size={16} className="text-[#2e7d32]" />
                      <span>100% Bio Farm Harvest Assurance</span>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
