import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "IRIS | Centro de Comando Digital",
  description:
    "A IRIS cria sites, automações e resolve problemas web para empresas que exigem uma presença digital de alto impacto. Domine o ambiente digital com nossa tecnologia.",
  openGraph: {
    title: "IRIS | Agência de Desenvolvimento Web e Automação",
    description:
      "Automação, websites e soluções web. Transformamos negócios com tecnologia de ponta e design focado em conversão.",
    type: "website",
  },
  keywords: [
    "agência digital",
    "desenvolvimento web",
    "automação",
    "React",
    "Next.js",
    "IRIS",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[#06070b] text-white text-[17px] antialiased overflow-x-hidden selection:bg-[#d9772f] selection:text-[#06070b]">
        <CustomCursor />
        {children}
        <Toaster position="top-right" theme="dark" richColors />
      </body>
    </html>
  );
}
