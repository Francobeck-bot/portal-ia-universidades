"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Brain } from "lucide-react";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/diretrizes", label: "Diretrizes" },
  { href: "/ferramentas", label: "Ferramentas" },
  { href: "/exemplos", label: "Exemplos de Uso" },
  { href: "/benchmarking", label: "Benchmarking Global" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-ufrgs-dark text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-ufrgs-gold p-1.5 rounded-lg group-hover:bg-ufrgs-gold-light transition-colors">
              <Brain className="w-5 h-5 text-ufrgs-dark" />
            </div>
            <div className="leading-tight">
              <span className="font-bold text-sm block">IA no Ensino</span>
              <span className="text-xs text-blue-200 block">EP · UFRGS</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-ufrgs-blue text-white"
                    : "text-blue-100 hover:bg-ufrgs-blue/60 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-blue-100 hover:text-white hover:bg-ufrgs-blue transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Abrir menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-ufrgs-blue/50">
          <nav className="px-4 py-2 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-ufrgs-blue text-white"
                    : "text-blue-100 hover:bg-ufrgs-blue/60 hover:text-white"
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
