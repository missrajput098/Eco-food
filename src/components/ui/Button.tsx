import React from "react";
import { ArrowRight } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "white" | "outline" | "ghost" | "cart";
  size?: "sm" | "md" | "lg";
  pill?: boolean;
  withArrow?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  pill = true,
  withArrow = false,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]";

  const variantStyles = {
    primary:
      "bg-[#1b3d22] hover:bg-[#142f1a] text-white shadow-sm hover:shadow-md",
    secondary:
      "bg-[#2e7d32] hover:bg-[#256628] text-white shadow-sm hover:shadow-md",
    white:
      "bg-white hover:bg-neutral-50 text-[#1b3d22] font-semibold shadow-md hover:shadow-lg",
    outline:
      "bg-transparent border border-[#cbd8cf] hover:border-[#1b3d22] text-[#1b3d22] hover:bg-[#f1f8f3]",
    ghost:
      "bg-transparent hover:bg-[#eaf4ed] text-[#1b3d22]",
    cart:
      "bg-[#1b3d22] hover:bg-[#25542f] text-white text-sm font-semibold shadow-sm hover:shadow-md",
  };

  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-7 py-3 text-base gap-2.5",
  };

  const roundedStyle = pill ? "rounded-full" : "rounded-xl";

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${roundedStyle} ${className}`}
      {...props}
    >
      <span>{children}</span>
      {withArrow && <ArrowRight size={size === "lg" ? 18 : 15} className="transition-transform group-hover:translate-x-0.5" />}
    </button>
  );
}
