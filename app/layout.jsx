import { Manrope, Syne } from "next/font/google";
import "./globals.css";

const display = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap"
});

const body = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body",
  display: "swap"
});

export const metadata = {
  title: "Bruno Steiger — AI, Software & Digital Systems",
  description:
    "Bruno Steiger builds technology around real business problems: AI systems, automation, APIs, payment infrastructure and digital products.",
  keywords: [
    "Bruno Steiger",
    "software builder",
    "premium portfolio",
    "web design",
    "landing pages",
    "CRM",
    "n8n",
    "automation",
    "AI agents",
    "API integrations"
  ],
  authors: [{ name: "Bruno Steiger" }],
  creator: "Bruno Steiger",
  openGraph: {
    title: "Bruno Steiger — AI, Software & Digital Systems",
    description:
      "Technology built around real business problems: products, payments, AI, APIs and automation.",
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
