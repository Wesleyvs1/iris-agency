import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projetos | IRIS",
  description: "Conheça os projetos e soluções digitais desenvolvidos pela IRIS.",
  alternates: { canonical: "/projetos" },
};

export default function ProjetosLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
