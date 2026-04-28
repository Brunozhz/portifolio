import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap"
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body",
  display: "swap"
});

export const metadata = {
  title: "Bruno Elias — Atelier of Digital Systems",
  description:
    "Bruno Elias is a Brazilian freelance technical builder crafting premium websites, sales pages, CRM implementations, automations and AI-powered service & SDR agents.",
  keywords: [
    "Bruno Elias",
    "freelance technical builder",
    "premium portfolio",
    "web design",
    "landing pages",
    "CRM",
    "n8n",
    "automation",
    "AI agents",
    "API integrations"
  ],
  authors: [{ name: "Bruno Elias" }],
  creator: "Bruno Elias",
  openGraph: {
    title: "Bruno Elias — Atelier of Digital Systems",
    description:
      "Premium digital craftsmanship: websites, sales pages, CRM systems, automations and AI-powered agents.",
    type: "website",
    locale: "en_US"
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#02030A"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
