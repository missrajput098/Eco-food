import React from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating?: number;
  maxStars?: number;
  reviewCount?: number;
  showCount?: boolean;
  size?: number;
  className?: string;
}

export function StarRating({
  rating = 5,
  maxStars = 5,
  reviewCount,
  showCount = true,
  size = 14,
  className = "",
}: StarRatingProps) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div className="flex items-center gap-0.5 text-[#f59e0b]">
        {Array.from({ length: maxStars }).map((_, i) => (
          <Star
            key={i}
            size={size}
            className={
              i < Math.floor(rating)
                ? "fill-[#f59e0b] text-[#f59e0b]"
                : "text-gray-300"
            }
          />
        ))}
      </div>
      {showCount && reviewCount !== undefined && (
        <span className="text-xs text-[#829487] font-medium">
          ({reviewCount})
        </span>
      )}
    </div>
  );
}
