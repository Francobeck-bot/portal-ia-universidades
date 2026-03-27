import Link from "next/link";
import { Brain, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-ufrgs-dark text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-ufrgs-gold p-1.5 rounded-lg">
                <Brain className="w-5 h-5 text-ufrgs-dark" />
              </div>
              <span className="font-bold">IA no Ensino – EP UFRGS</span>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed">
              Portal de recursos sobre uso responsável de Inteligência Artificial no ensino superior,
              resultado da disciplina de Práticas de Engenharia de Produção (PEP) da UFRGS.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-3 text-ufrgs-gold">Navegação</h3>
            <ul className="space-y-2 text-sm text-blue-200">
              {[
                { href: "/", label: "Início" },
                { href: "/diretrizes", label: "Diretrizes" },
                { href: "/ferramentas", label: "Ferramentas" },
                { href: "/exemplos", label: "Exemplos de Uso" },
                { href: "/benchmarking", label: "Benchmarking Global" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Credits */}
          <div>
            <h3 className="font-semibold mb-3 text-ufrgs-gold">Créditos</h3>
            <p className="text-blue-200 text-sm leading-relaxed mb-2">
              Desenvolvido como trabalho acadêmico na disciplina PEP — Práticas de Engenharia de Produção.
            </p>
            <p className="text-blue-200 text-sm leading-relaxed mb-3">
              Mantido pelo{" "}
              <span className="text-white font-medium">Centro de Teaching & Learning</span> da UFRGS.
            </p>
            <a
              href="https://www.ufrgs.br"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-ufrgs-gold hover:text-ufrgs-gold-light transition-colors"
            >
              UFRGS <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="border-t border-ufrgs-blue/40 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-blue-300 text-sm">
            © {new Date().getFullYear()} Engenharia de Produção – UFRGS. Conteúdo aberto para fins educacionais.
          </p>
          <p className="text-blue-400 text-xs">
            Atualizado automaticamente via Google Sheets
          </p>
        </div>
      </div>
    </footer>
  );
}
