import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FetchMyHeart – AI-Powered Dog Adoption Matching",
  description:
    "FetchMyHeart uses machine learning to match dogs with the right families based on lifestyle, activity level, and home environment. No more mismatched adoptions. Every dog deserves a forever home — the first time.",
  keywords: [
    "dog adoption app",
    "AI pet matching",
    "machine learning adoption",
    "rescue dog matching",
    "dog adoption platform",
    "find the right dog",
    "forever home",
    "pet adoption technology",
  ],
  openGraph: {
    title: "FetchMyHeart – Every Tail Tells a Story",
    description:
      "We're building a smarter way to adopt dogs. AI-powered matching that connects the right dog with the right home — the first time.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FetchMyHeart – AI-Powered Dog Adoption",
    description:
      "The return is a failure of data, not a failure of the dog. We're fixing adoption with machine learning.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${dmSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
