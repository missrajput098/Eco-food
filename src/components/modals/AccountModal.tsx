"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  X,
  User,
  Mail,
  Lock,
  Package,
  ArrowRight,
  Truck,
  Phone,
  LogOut,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { useCart, DEMO_USER } from "@/context/CartContext";

export function AccountModal() {
  const router = useRouter();
  const {
    isAccountOpen,
    setIsAccountOpen,
    user,
    isAuthenticated,
    login,
    register,
    logout,
    orders,
    authRedirectUrl,
    setAuthRedirectUrl,
    showToast,
  } = useCart();

  const [activeTab, setActiveTab] = useState<"auth" | "orders">("auth");
  const [isLoginMode, setIsLoginMode] = useState(true);

  // Form Fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isAccountOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const res = login(email, password);
    if (res.success) {
      setIsAccountOpen(false);
      if (authRedirectUrl) {
        const dest = authRedirectUrl;
        setAuthRedirectUrl(null);
        router.push(dest);
      }
    } else {
      setErrorMsg(res.message);
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const res = register({
      name,
      email,
      phone,
      password,
    });

    if (res.success) {
      setIsAccountOpen(false);
      if (authRedirectUrl) {
        const dest = authRedirectUrl;
        setAuthRedirectUrl(null);
        router.push(dest);
      }
    } else {
      setErrorMsg(res.message);
    }
  };

  const handleQuickDemoLogin = () => {
    setErrorMsg(null);
    login(DEMO_USER.email, "password123");
    setIsAccountOpen(false);
    if (authRedirectUrl) {
      const dest = authRedirectUrl;
      setAuthRedirectUrl(null);
      router.push(dest);
    }
  };

  const handleLogout = () => {
    logout();
    setIsAccountOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => {
          setIsAccountOpen(false);
          setAuthRedirectUrl(null);
        }}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-[#e4ece6] p-6 sm:p-8 animate-in zoom-in-95 duration-200">
        <button
          onClick={() => {
            setIsAccountOpen(false);
            setAuthRedirectUrl(null);
          }}
          aria-label="Close modal"
          className="absolute top-5 right-5 text-neutral-400 hover:text-neutral-800 cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Tab Header */}
        <div className="flex border-b border-[#e4ece6] mb-6">
          <button
            onClick={() => setActiveTab("auth")}
            className={`pb-3 px-4 text-sm font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === "auth"
                ? "border-[#1b3d22] text-[#1b3d22]"
                : "border-transparent text-[#829487] hover:text-[#142417]"
            }`}
          >
            {isAuthenticated ? "My Account" : isLoginMode ? "Sign In" : "Register"}
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`pb-3 px-4 text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "orders"
                ? "border-[#1b3d22] text-[#1b3d22]"
                : "border-transparent text-[#829487] hover:text-[#142417]"
            }`}
          >
            <Package size={15} />
            <span>My Orders ({orders.length})</span>
          </button>
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-semibold flex items-center gap-2">
            <AlertCircle size={15} />
            <span>{errorMsg}</span>
          </div>
        )}

        {activeTab === "auth" ? (
          isAuthenticated && user ? (
            /* Logged-In Profile View */
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#f7faf8] border border-[#c8e6c9]">
                <div className="w-14 h-14 rounded-full bg-[#1b3d22] text-[#81c784] font-extrabold text-xl flex items-center justify-center flex-shrink-0 shadow-xs">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-extrabold text-[#142417] truncate">
                      {user.name}
                    </h3>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#eaf4ed] text-[#1b3d22] flex items-center gap-1">
                      <UserCheck size={11} /> Verified
                    </span>
                  </div>
                  <p className="text-xs text-[#829487] truncate mt-0.5">{user.email}</p>
                  {user.phone && (
                    <p className="text-xs text-[#4c6052] mt-0.5">{user.phone}</p>
                  )}
                </div>
              </div>

              {/* Account Quick Stats */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-[#fafbfa] border border-[#e4ece6]">
                  <span className="text-[#829487] block">Total Orders</span>
                  <span className="text-lg font-extrabold text-[#142417] block mt-0.5">
                    {orders.length}
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#fafbfa] border border-[#e4ece6]">
                  <span className="text-[#829487] block">Account Status</span>
                  <span className="text-sm font-extrabold text-[#2e7d32] block mt-0.5">
                    Active Bio Member
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col gap-2.5">
                <Link
                  href="/order-tracking"
                  onClick={() => setIsAccountOpen(false)}
                  className="w-full py-3 px-4 rounded-full bg-[#1b3d22] text-white text-xs font-bold text-center hover:bg-[#142f1a] transition-all flex items-center justify-center gap-2 shadow-xs"
                >
                  <Truck size={15} />
                  <span>Track Live Deliveries</span>
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full py-3 px-4 rounded-full border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <LogOut size={15} />
                  <span>Sign Out of Account</span>
                </button>
              </div>
            </div>
          ) : (
            /* Logged-Out Authentication Forms */
            <div>
              <div className="text-center mb-5">
                <div className="w-12 h-12 rounded-full bg-[#eaf4ed] text-[#1b3d22] mx-auto flex items-center justify-center mb-2.5">
                  <User size={22} />
                </div>
                <h3 className="text-xl font-extrabold text-[#142417]">
                  {isLoginMode ? "Sign In to Your Account" : "Create Organic Account"}
                </h3>
                <p className="text-xs text-[#829487] mt-1 max-w-sm mx-auto">
                  {authRedirectUrl
                    ? "Please sign in or create an account to proceed to secure checkout."
                    : isLoginMode
                    ? "Access your farm deliveries, tracking codes, and organic favorites."
                    : "Join today to access cold-chain farm delivery and earn points!"}
                </p>
              </div>

              {/* 1-Click Demo Login Pill */}
              <div className="mb-5 p-3 rounded-2xl bg-[#f7faf8] border border-[#c8e6c9] flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs text-[#1b3d22]">
                  <Sparkles size={15} className="text-[#2e7d32] flex-shrink-0" />
                  <span className="text-[11px]">
                    Fast testing? Click to sign in instantly with Demo Account!
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleQuickDemoLogin}
                  className="px-3.5 py-1.5 rounded-full bg-[#1b3d22] text-white text-xs font-bold hover:bg-[#142f1a] transition-colors cursor-pointer flex-shrink-0"
                >
                  Demo Login
                </button>
              </div>

              {isLoginMode ? (
                /* Login Form */
                <form onSubmit={handleLoginSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-[#142417] mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3.5 top-3 text-[#829487]" />
                      <input
                        type="email"
                        required
                        placeholder="alex.miller@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#cbd8cf] text-xs text-[#142417] focus:outline-none focus:border-[#1b3d22] bg-[#fbfbf9]"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-[#142417]">Password</label>
                      <span className="text-[11px] text-[#2e7d32] font-semibold">
                        Demo: password123
                      </span>
                    </div>
                    <div className="relative">
                      <Lock size={16} className="absolute left-3.5 top-3 text-[#829487]" />
                      <input
                        type="password"
                        required
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#cbd8cf] text-xs text-[#142417] focus:outline-none focus:border-[#1b3d22] bg-[#fbfbf9]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#1b3d22] hover:bg-[#142f1a] text-white font-bold rounded-full text-xs sm:text-sm shadow-md transition-all mt-2 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Sign In</span>
                    <ArrowRight size={15} />
                  </button>
                </form>
              ) : (
                /* Register Form */
                <form onSubmit={handleRegisterSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-[#142417] mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User size={16} className="absolute left-3.5 top-3 text-[#829487]" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Jessica Taylor"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#cbd8cf] text-xs text-[#142417] focus:outline-none focus:border-[#1b3d22] bg-[#fbfbf9]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#142417] mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3.5 top-3 text-[#829487]" />
                      <input
                        type="email"
                        required
                        placeholder="jessica@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#cbd8cf] text-xs text-[#142417] focus:outline-none focus:border-[#1b3d22] bg-[#fbfbf9]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#142417] mb-1">
                      Phone Number (for driver SMS)
                    </label>
                    <div className="relative">
                      <Phone size={16} className="absolute left-3.5 top-3 text-[#829487]" />
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#cbd8cf] text-xs text-[#142417] focus:outline-none focus:border-[#1b3d22] bg-[#fbfbf9]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#142417] mb-1">
                      Password * (at least 6 characters)
                    </label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-3.5 top-3 text-[#829487]" />
                      <input
                        type="password"
                        required
                        minLength={6}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#cbd8cf] text-xs text-[#142417] focus:outline-none focus:border-[#1b3d22] bg-[#fbfbf9]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#1b3d22] hover:bg-[#142f1a] text-white font-bold rounded-full text-xs sm:text-sm shadow-md transition-all mt-2 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Create Free Account</span>
                    <ArrowRight size={15} />
                  </button>
                </form>
              )}

              {/* Mode switch */}
              <div className="text-center mt-5 pt-4 border-t border-[#eff4f0] text-xs text-[#829487]">
                {isLoginMode ? "Don't have an account yet?" : "Already have an account?"}{" "}
                <button
                  type="button"
                  onClick={() => {
                    setIsLoginMode(!isLoginMode);
                    setErrorMsg(null);
                  }}
                  className="font-bold text-[#1b3d22] hover:underline ml-1 cursor-pointer"
                >
                  {isLoginMode ? "Sign up now" : "Log in"}
                </button>
              </div>
            </div>
          )
        ) : (
          /* Orders Tab */
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-[#142417]">
                Order History & Deliveries
              </h3>
              <Link
                href="/order-tracking"
                onClick={() => setIsAccountOpen(false)}
                className="text-xs font-semibold text-[#2e7d32] hover:underline flex items-center gap-1"
              >
                <span>Track By ID</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
              {orders.length === 0 ? (
                <div className="text-center py-8 text-xs text-[#829487]">
                  No orders placed yet.
                </div>
              ) : (
                orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-3.5 rounded-2xl border border-[#e4ece6] bg-[#fbfbf9] hover:bg-white hover:border-[#2e7d32] transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-[#142417]">
                          {ord.id}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#eaf4ed] text-[#1b3d22]">
                          {ord.deliveryStage.replace("_", " ")}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-[#142417]">
                        ${ord.total.toFixed(2)}
                      </span>
                    </div>

                    <p className="text-xs text-[#829487] mb-2 line-clamp-1">
                      {ord.items.map((i) => `${i.quantity}x ${i.product.name}`).join(", ")}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-[#eff4f0]">
                      <span className="text-[11px] text-[#829487]">
                        {ord.estimatedDeliveryTime}
                      </span>
                      <Link
                        href={`/orders/${ord.id}`}
                        onClick={() => setIsAccountOpen(false)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#1b3d22] bg-[#eaf4ed] hover:bg-[#1b3d22] hover:text-white px-3 py-1.5 rounded-full transition-colors"
                      >
                        <Truck size={13} />
                        <span>Track Delivery</span>
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
