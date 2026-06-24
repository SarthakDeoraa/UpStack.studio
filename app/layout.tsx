import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const regila = localFont({
  src: "./fonts/Regila-DEMO.otf",
  variable: "--font-regila",
  display: "swap",
});

const milk = localFont({
  src: "./fonts/MilkAndHoney.ttf",
  variable: "--font-milk-var",
  display: "swap",
});

const clashDisplay = localFont({
  src: "./fonts/ClashDisplay-Medium.ttf",
  variable: "--font-clash-var",
  display: "swap",
});

export const metadata: Metadata = {
  title: "UpStack Studio — Digital Agency",
  description:
    "No buzzwords. No clutter. Just sharp code, bold design, and a solution built for you — right now. UpStack Studio builds fullstack web apps, brands, and AI-powered solutions.",
  icons: {
    icon: "/favicon-1.svg",
  },
  openGraph: {
    title: "UpStack Studio — Digital Agency",
    description:
      "Elevating beyond conscience. Sharp code, bold design, solutions built for you.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${bebasNeue.variable} ${regila.variable} ${milk.variable} ${clashDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">{children}</body>
    </html>
  );
}