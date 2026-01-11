import React from "react";
import { BuyerRequest } from "@/lib/data";

interface HeaderProps {
  openCount: number;
  fulfilledCount: number;
}

export default function Header({ openCount, fulfilledCount }: HeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Buyer Requests
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Submit evidence to buyers and fulfill compliance requirements.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-4 bg-white px-4 py-2.5 rounded-xl border border-slate-200 text-sm shadow-sm">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            <span className="font-bold">{openCount}</span>
            <span className="text-slate-400">Open</span>
          </div>
          <div className="w-px h-4 bg-slate-200"></div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
            <span className="font-bold">{fulfilledCount}</span>
            <span className="text-slate-400">Fulfilled</span>
          </div>
        </div>
      </div>
    </div>
  );
}
