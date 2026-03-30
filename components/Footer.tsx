import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white mt-20">
      <div
        className="border-b border-gray-100"
        style={{ background: "linear-gradient(135deg, #004aad08, #5de0e612)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

            {/* Brand */}
            <div className="flex items-center gap-4">
              <Image src="/logo-ufrgs.png" alt="UFRGS" width={68} height={68} className="object-contain shrink-0" />
              <div className="w-px h-8 bg-gray-200 shrink-0" />
              <Image src="/logo-ep.png" alt="Engenharia de Produção UFRGS" width={116} height={35} className="object-contain shrink-0" />
              <div className="w-px h-8 bg-gray-200 shrink-0 hidden md:block" />
              <div className="hidden md:block">
                <p className="text-xs text-gray-500">
                  Portal mantido pela COMGRAD do curso de Engenharia de Produção
                </p>
                <a
                  href="mailto:comgrad_engpro@ufrgs.br"
                  className="text-xs font-medium transition-colors"
                  style={{ color: "#004aad" }}
                >
                  comgrad_engpro@ufrgs.br
                </a>
              </div>
            </div>

            {/* Nav */}
            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              {[
                { href: "/",            label: "Início" },
                { href: "/diretrizes",  label: "Diretrizes" },
                { href: "/ferramentas", label: "Ferramentas" },
                { href: "/exemplos",    label: "Exemplos de Uso" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} Engenharia de Produção – UFRGS. Conteúdo aberto para fins educacionais.
        </p>
      </div>
    </footer>
  );
}
