import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  axes: ["opsz", "wdth"],
});

export const metadata: Metadata = {
  title: "Discobak",
  description: "Descubra o que podemos fazer.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={bricolage.variable}>
      <body>{children}</body>
    </html>
  );
}
