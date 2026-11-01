"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { CheckCircle2 } from "lucide-react";

export function ToastNotification() {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce duration-300">
      <div className="flex items-center gap-2.5 px-4 py-3 bg-[#1b3d22] text-white text-sm font-medium rounded-full shadow-2xl border border-[#2e7d32]">
        <CheckCircle2 size={18} className="text-[#81c784] flex-shrink-0" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
}
