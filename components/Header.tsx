"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
  const pathname = usePathname();

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 40,
      background: "rgba(243,244,244,0.92)",
      backdropFilter: "saturate(140%) blur(8px)",
      WebkitBackdropFilter: "saturate(140%) blur(8px)",
      borderBottom: "1px solid var(--hairline)",
    }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, gap: 24 }}>

          {/* Logos */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <Image src="/logo-ufrgs.png" alt="UFRGS" width={34} height={34} style={{ objectFit: "contain", display: "block" }} />
            <div style={{ width: 1, height: 38, background: "var(--hairline)" }} />
            <Image src="/logo-ep.png" alt="Engenharia de Produção UFRGS" width={110} height={33} style={{ objectFit: "contain", display: "block" }} />
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: 36 }} className="hidden md:flex">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    position: "relative",
                    padding: "6px 0",
                    fontSize: 14,
                    fontWeight: active ? 500 : 400,
                    color: active ? "var(--ink)" : "var(--muted)",
                    letterSpacing: "0.01em",
                    transition: "color 160ms ease",
                  }}
                >
                  {link.label}
                  {active && (
                    <span style={{
                      position: "absolute", left: 0, right: 0, bottom: -22,
                      height: 2, background: "var(--ink)",
                    }} />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: "none", border: 0, padding: 6, cursor: "pointer", color: "var(--muted)" }}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden" style={{ borderTop: "1px solid var(--hairline)", background: "var(--bg)" }}>
          <nav style={{ padding: "12px 32px 20px", display: "flex", flexDirection: "column", gap: 2 }}>
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    padding: "10px 0",
                    fontSize: 15,
                    fontWeight: active ? 500 : 400,
                    color: active ? "var(--ink)" : "var(--muted)",
                    borderBottom: "1px solid var(--hairline-soft)",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
