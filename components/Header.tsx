"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Brain } from "lucide-react";

const navLinks = [
  { href: "/",             label: "Início" },
  { href: "/diretrizes",   label: "Diretrizes" },
  { href: "/ferramentas",  label: "Ferramentas" },
  { href: "/exemplos",     label: "Exemplos" },
  { href: "/benchmarking", label: "Benchmarking" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100"
          : "bg-white shadow-sm border-b border-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="bg-ufrgs-dark p-1.5 rounded-lg group-hover:bg-ufrgs-blue transition-colors">
              <Brain className="w-5 h-5 text-ufrgs-gold" />
            </div>
            <div className="leading-tight">
              <span className="font-bold text-sm text-ufrgs-dark block">IA no Ensino</span>
              <span className="text-xs text-gray-400 block">EP · UFRGS</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                  pathname === link.href
                    ? "bg-ufrgs-blue text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100 hover:text-ufrgs-dark"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-500 hover:text-ufrgs-dark hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <nav className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-ufrgs-blue text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-ufrgs-dark"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
