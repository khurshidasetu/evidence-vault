import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface StatusChipProps {
  status: string;
  className?: string;
}

const statusStyles: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Expired: "bg-rose-100 text-rose-700 border-rose-200",
  "Expiring Soon": "bg-amber-100 text-amber-700 border-amber-200",
  Pending: "bg-blue-100 text-blue-700 border-blue-200",
  Open: "bg-blue-100 text-blue-700 border-blue-200",
  Fulfilled: "bg-emerald-100 text-emerald-700 border-emerald-200",
};

export const StatusChip: React.FC<StatusChipProps> = ({
  status,
  className,
}) => {
  return (
    <span
      className={cn(
        "px-2.5 py-0.5 rounded-full text-xs font-medium border transition-all duration-200",
        statusStyles[status] || "bg-gray-100 text-gray-700 border-gray-200",
        className
      )}
    >
      {status}
    </span>
  );
};
