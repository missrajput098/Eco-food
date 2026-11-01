"use client";

import React, { useState } from "react";
import { Mail, Check, Send } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function NewsletterSection() {
  const { showToast } = useCart();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      showToast("Please enter a valid email address.");
      return;
    }
    setSubscribed(true);
    showToast("🎉 Thank you for subscribing to Organic Food Store!");
    setEmail("");
  };

  return (
    <section className="py-10 sm:py-14 bg-[#fbfbf9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#16361e] rounded-3xl p-8 sm:p-10 lg:p-12 text-white shadow-xl relative overflow-hidden">
          {/* Subtle Glow & Ambient circles */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#25522f]/30 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            {/* Title & Info */}
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#25522f] text-[#81c784] flex items-center justify-center flex-shrink-0 shadow-sm">
                <Mail size={22} />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  Join Our Newsletter
                </h3>
                <p className="text-xs sm:text-sm text-[#c4d9cb] mt-1">
                  Get the latest updates, offers and healthy living tips.
                </p>
              </div>
            </div>

            {/* Form Input & Subscribe Button */}
            <div className="w-full lg:max-w-md">
              {subscribed ? (
                <div className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#25522f] text-[#81c784] text-sm font-semibold border border-[#3a7c46]">
                  <Check size={18} />
                  <span>You&apos;re subscribed! Check your inbox for your 20% discount code.</span>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row items-center gap-2.5 bg-[#0f2414] p-1.5 rounded-full border border-[#25522f]"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full px-5 py-2.5 bg-transparent text-sm text-white placeholder:text-[#7b9c83] outline-none"
                  />
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#2e7d32] hover:bg-[#388e3c] text-white text-xs sm:text-sm font-bold tracking-wide transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer flex-shrink-0"
                  >
                    <span>Subscribe</span>
                    <Send size={14} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
