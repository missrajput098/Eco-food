"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Leaf,
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
  Package,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

export function Navbar() {
  const pathname = usePathname();
  const {
    totalItems,
    wishlistCount,
    setIsCartOpen,
    setIsSearchOpen,
    setIsAccountOpen,
    user,
    isAuthenticated,
    logout,
  } = useCart();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Categories", href: "/categories" },
    { name: "Track Order", href: "/order-tracking" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-xs py-3 border-b border-[#e4ece6]"
          : "bg-[#fbfbf9] py-4 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group flex-shrink-0"
          >
            <div className="w-9 h-9 rounded-full bg-[#1b3d22] text-[#81c784] flex items-center justify-center transition-transform group-hover:scale-105 shadow-xs">
              <Leaf size={20} className="fill-[#81c784]" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-lg sm:text-xl font-extrabold text-[#142417] tracking-tight">
                Organic
              </span>
              <span className="text-xs font-semibold text-[#2e7d32] tracking-wider uppercase">
                Food Store.com
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links with real page routes */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors relative py-1 ${
                    isActive
                      ? "text-[#1b3d22] font-bold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#1b3d22] after:rounded-full"
                      : "text-[#4c6052] hover:text-[#1b3d22]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & My Account Button */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search products"
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#142417] hover:bg-[#eaf4ed] hover:text-[#1b3d22] transition-colors"
            >
              <Search size={19} />
            </button>

            {/* Wishlist Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Wishlist"
              className="relative w-10 h-10 rounded-full flex items-center justify-center text-[#142417] hover:bg-[#eaf4ed] hover:text-[#1b3d22] transition-colors"
            >
              <Heart size={19} />
              {wishlistCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#e06c3a] text-white text-[10px] font-bold flex items-center justify-center leading-none">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="View shopping cart"
              className="relative w-10 h-10 rounded-full flex items-center justify-center text-[#142417] hover:bg-[#eaf4ed] hover:text-[#1b3d22] transition-colors"
            >
              <ShoppingBag size={19} />
              {totalItems > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#1b3d22] text-white text-[10px] font-bold flex items-center justify-center leading-none">
                  {totalItems}
                </span>
              )}
            </button>

            {/* My Account / User Profile Pill Button */}
            {isAuthenticated && user ? (
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#eaf4ed] hover:bg-[#d8ebd2] text-[#1b3d22] text-xs font-bold transition-all border border-[#c8e6c9] cursor-pointer ml-1"
                >
                  <div className="w-6 h-6 rounded-full bg-[#1b3d22] text-[#81c784] flex items-center justify-center text-xs font-extrabold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="max-w-[100px] truncate">{user.name.split(" ")[0]}</span>
                  <ChevronDown size={14} className={userDropdownOpen ? "rotate-180 transition-transform" : "transition-transform"} />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-[#e4ece6] py-2 z-50 animate-in fade-in-50 zoom-in-95 duration-150">
                    <div className="px-4 py-2 border-b border-[#eff4f0]">
                      <p className="text-xs font-bold text-[#142417] truncate">{user.name}</p>
                      <p className="text-[11px] text-[#829487] truncate">{user.email}</p>
                    </div>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        setIsAccountOpen(true);
                      }}
                      className="w-full px-4 py-2 text-left text-xs text-[#4c6052] hover:bg-[#f5f7f4] hover:text-[#1b3d22] flex items-center gap-2 font-medium"
                    >
                      <User size={14} />
                      <span>My Profile & Orders</span>
                    </button>

                    <Link
                      href="/order-tracking"
                      onClick={() => setUserDropdownOpen(false)}
                      className="w-full px-4 py-2 text-left text-xs text-[#4c6052] hover:bg-[#f5f7f4] hover:text-[#1b3d22] flex items-center gap-2 font-medium"
                    >
                      <Package size={14} />
                      <span>Track Deliveries</span>
                    </Link>

                    <Link
                      href="/cart"
                      onClick={() => setUserDropdownOpen(false)}
                      className="w-full px-4 py-2 text-left text-xs text-[#4c6052] hover:bg-[#f5f7f4] hover:text-[#1b3d22] flex items-center gap-2 font-medium"
                    >
                      <ShoppingBag size={14} />
                      <span>View Cart</span>
                    </Link>

                    <div className="pt-1 mt-1 border-t border-[#eff4f0]">
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          logout();
                        }}
                        className="w-full px-4 py-2 text-left text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 font-semibold"
                      >
                        <LogOut size={14} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsAccountOpen(true)}
                className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#1b3d22] hover:bg-[#142f1a] text-white text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-xs hover:shadow-md active:scale-95 cursor-pointer ml-1"
              >
                <User size={15} />
                <span>Sign In</span>
              </button>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center text-[#142417] hover:bg-neutral-100 transition-colors ml-1"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 pb-6 border-t border-[#e4ece6] space-y-3 bg-white rounded-2xl p-4 shadow-lg animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-[#eaf4ed] text-[#1b3d22] font-bold"
                        : "text-[#4c6052] hover:bg-neutral-50 hover:text-[#1b3d22]"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            <div className="pt-2 border-t border-neutral-100">
              {isAuthenticated && user ? (
                <div className="space-y-2">
                  <div className="px-3 py-1.5 text-xs text-[#829487]">
                    Signed in as <strong className="text-[#142417]">{user.name}</strong>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setIsAccountOpen(true);
                      }}
                      className="py-2.5 rounded-full bg-[#eaf4ed] text-[#1b3d22] text-xs font-bold text-center"
                    >
                      My Profile
                    </button>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        logout();
                      }}
                      className="py-2.5 rounded-full border border-red-200 text-red-600 text-xs font-bold text-center"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsAccountOpen(true);
                  }}
                  className="w-full py-2.5 rounded-full bg-[#1b3d22] text-white text-sm font-semibold text-center hover:bg-[#142f1a] transition-colors"
                >
                  Sign In / Register
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
