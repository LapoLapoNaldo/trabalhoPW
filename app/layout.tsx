import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "@/styles/globals.css";

const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"]
});

const display = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"]
});

export const metadata: Metadata = {
  title: "Orgulho Não-Binário · Julho com acolhimento",
  description:
    "Uma experiência one-page artística, acessível e acolhedora para celebrar o Mês do Orgulho com foco na comunidade Não-Binária e LGBTQIA+.",
  keywords: [
    "LGBTQIA+",
    "Não-Binário",
    "Orgulho",
    "Julho",
    "Diversidade",
    "Representatividade"
  ],
  openGraph: {
    title: "Orgulho Não-Binário",
    description:
      "Celebração digital acolhedora sobre pertencimento, segurança, diversidade e orgulho.",
    type: "website",
    locale: "pt_BR"
  },
  icons: {
    icon: "/favicon.svg"
  }
};

export const viewport: Viewport = {
  themeColor: "#08060f",
  colorScheme: "dark"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${sans.variable} ${display.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
