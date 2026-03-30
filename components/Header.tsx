"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/",            label: "Início" },
  { href: "/diretrizes",  label: "Diretrizes" },
  { href: "/ferramentas", label: "Ferramentas" },
  { href: "/exemplos",    label: "Exemplos de Uso" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-200 border-b border-gray-100 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #004aad, #5de0e6)" }}
            >
              <span className="text-white font-black text-xs">IA</span>
            </div>
            <span className="font-black text-sm text-gray-900 tracking-tight">
              IA no Ensino <span className="text-gray-400 font-normal">· Engenharia de Produção UFRGS</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-all duration-150 relative ${
                  pathname === link.href
                    ? "text-transparent bg-clip-text"
                    : "text-gray-500 hover:text-gray-900"
                }`}
                style={
                  pathname === link.href
                    ? {
                        backgroundImage: "linear-gradient(135deg, #004aad, #5de0e6)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }
                    : {}
                }
              >
                {link.label}
                {pathname === link.href && (
                  <span
                    className="absolute -bottom-[18px] left-0 right-0 h-0.5 rounded-full"
                    style={{ background: "linear-gradient(135deg, #004aad, #5de0e6)" }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-1.5 text-gray-500 hover:text-gray-900 transition-colors"
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
          <nav className="px-4 py-3 space-y-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2.5 text-sm font-semibold rounded-lg transition-colors ${
                  pathname === link.href
                    ? "bg-gradient-to-r from-[#004aad]/10 to-[#5de0e6]/10 text-[#004aad]"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
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
