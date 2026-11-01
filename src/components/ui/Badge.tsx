import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "best-seller" | "discount" | "new" | "organic" | "outline";
  className?: string;
}

export function Badge({
  children,
  variant = "best-seller",
  className = "",
}: BadgeProps) {
  // Styles aligned with CSS variables and image design
  const variantStyles = {
    "best-seller": "bg-[#e8f5e9] text-[#1b5e20] border-[#c8e6c9]",
    discount: "bg-[#fdf2ed] text-[#d9531e] border-[#fcd8c9]",
    new: "bg-[#ebf9f5] text-[#0d8a68] border-[#c4eee1]",
    organic: "bg-[#f1f8f3] text-[#2e7d32] border-[#d2ead7]",
    outline: "bg-transparent text-[#1b3d22] border-[#d2ded5]",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide border transition-colors ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
