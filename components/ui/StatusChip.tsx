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
  Active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Expired: "bg-rose-50 text-rose-700 border-rose-200",
  "Expiring Soon": "bg-amber-50 text-amber-700 border-amber-200",
  Pending: "bg-slate-100 text-slate-700 border-slate-200",
  Open: "bg-indigo-50 text-indigo-700 border-indigo-200",
  Fulfilled: "bg-primary/10 text-primary border-primary/20",
};

export const StatusChip: React.FC<StatusChipProps> = ({
  status,
  className,
}) => {
  return (
    <span
      className={cn(
        "px-2.5 py-0.5 rounded-full text-[11px] font-bold border transition-all duration-200 uppercase tracking-tight",
        statusStyles[status] || "bg-gray-100 text-gray-700 border-gray-200",
        className
      )}
    >
      {status}
    </span>
  );
};
