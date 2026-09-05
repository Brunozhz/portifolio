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
  metadataBase: new URL("https://portifolio-bruno-36.vercel.app"),
  title: "Bruno Steiger — AI, Automation & Software",
  description:
    "Portfolio of Bruno Steiger, a Brazilian technology professional working with AI, automation, CRM, APIs, software systems and digital products.",
  keywords: [
    "Bruno Steiger",
    "software builder",
    "business systems",
    "software engineering",
    "CRM",
    "n8n",
    "automation",
    "AI agents",
    "API integrations"
  ],
  authors: [{ name: "Bruno Steiger" }],
  creator: "Bruno Steiger",
  openGraph: {
    title: "Bruno Steiger — AI, Automation & Software",
    description:
      "AI systems, automation, CRM, APIs, payment infrastructure and software built around real business problems.",
    type: "website",
    locale: "en_US",
    url: "/"
  },
  twitter: { card: "summary", title: "Bruno Steiger — AI, Automation & Software", description: "Systems built around real business problems." },
  alternates: { canonical: "/" }
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#02030A"
};

export default function RootLayout({ children }) {
  const structuredData = { "@context": "https://schema.org", "@type": "Person", name: "Bruno Steiger", url: "https://portifolio-bruno-36.vercel.app", homeLocation: { "@type": "Place", name: "Navegantes, Santa Catarina, Brazil" }, knowsAbout: ["Artificial intelligence", "Automation", "CRM", "APIs", "Payment infrastructure", "Software development"] };
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />{children}</body>
    </html>
  );
}
