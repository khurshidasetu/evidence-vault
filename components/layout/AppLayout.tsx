"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Shield,
  Database,
  ClipboardCheck,
  Search,
  Bell,
  User,
  Menu,
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Input } from "../ui/input";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ href, icon, label }) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
        isActive
          ? "bg-primary text-white shadow-lg shadow-primary/20"
          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
      )}
    >
      <span
        className={cn(
          "transition-transform duration-200",
          isActive ? "scale-110" : "group-hover:scale-110"
        )}
      >
        {icon}
      </span>
      <span className="font-medium text-sm">{label}</span>
    </Link>
  );
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans antialiased text-slate-900">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-72 bg-white border-r border-slate-200 flex-col z-30">
        <div className="p-8">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20 group-hover:rotate-6 transition-transform">
              <Shield className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              SentryLink
            </span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          <div className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Main Menu
          </div>
          <NavItem
            href="/vault"
            icon={<Database size={20} />}
            label="Evidence Vault"
          />
          <NavItem
            href="/requests"
            icon={<ClipboardCheck size={20} />}
            label="Buyer Requests"
          />

          <div className="px-4 py-8 mt-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-xs font-semibold text-slate-700 mb-1">
                Comply Phase A
              </p>
              <p className="text-[10px] text-slate-500 leading-relaxed">
                Factory proof-of-concept for secure evidence management.
              </p>
            </div>
          </div>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/50">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border border-indigo-200">
              F
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-bold truncate">Factory Admin</p>
              <p className="text-[10px] text-slate-500 truncate">
                ID: FACT-9921
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 flex items-center justify-between z-20 sticky top-0">
          <div className="flex items-center gap-4 lg:hidden mr-4">
            <button className="p-2 -ml-2 text-slate-500">
              <Menu size={24} />
            </button>
            <Shield className="text-primary" size={24} />
          </div>

          <div className="flex-1 max-w-lg hidden md:block">
            <div className="relative group">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors"
                size={18}
              />
              <Input
                type="text"
                placeholder="Search evidence, requests..."
              className="pl-9 h-10 bg-slate-50 border-slate-200 focus-visible:ring-primary/20 focus-visible:border-primary transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2.5 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-all relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200 mx-1"></div>
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-end mr-2 hidden sm:flex">
                <span className="text-xs font-bold text-slate-700">
                  Factory Admin
                </span>
                <span className="text-[10px] text-slate-400">Owner</span>
              </div>
              <button className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 transition-all">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white shadow-md shadow-primary/20">
                  <User size={18} />
                </div>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto">{children}</div>
        </div>
      </main>
    </div>
  );
}
