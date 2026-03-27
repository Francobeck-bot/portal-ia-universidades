import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "IA no Ensino – Engenharia de Produção UFRGS",
  description:
    "Portal de recursos sobre uso responsável de Inteligência Artificial no ensino superior, desenvolvido pelo curso de Engenharia de Produção da UFRGS.",
  keywords: ["IA no ensino", "inteligência artificial", "UFRGS", "engenharia de produção", "ensino superior"],
  openGraph: {
    title: "IA no Ensino – Engenharia de Produção UFRGS",
    description: "Recursos para uso responsável de IA no ensino superior",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
