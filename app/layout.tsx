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
  metadataBase: new URL("https://fetchmyheart.com"),
  title: {
    default: "FetchMyHeart – AI-Powered Dog Adoption Matching",
    template: "%s | FetchMyHeart",
  },
  description:
    "FetchMyHeart uses machine learning to match dogs with the right families based on lifestyle, activity level, and home environment. No more mismatched adoptions. Every dog deserves a forever home — the first time.",
  keywords: [
    // High intent — people ready to adopt
    "how to adopt a dog",
    "adopt a rescue dog",
    "find the right dog for my family",
    "best dog for my lifestyle",
    "how to choose the right dog breed",
    "kill shelter",

    // Problem-aware — people who've had bad experiences
    "why do dogs get returned to shelters",
    "dog adoption tips first time owner",
    "what to know before adopting a dog",
    "dog adoption mistakes to avoid",
    "how to prepare for adopting a dog",
    "surrendor dog",

    // Solution-aware — people looking for what you offer
    "dog adoption matching",
    "AI dog adoption",
    "smart dog adoption platform",
    "dog adoption app",
    "rescue dog matching platform",

    // Supporting single/two-word terms — for topical context, not ranking
    "dog adoption",
    "rescue dog",
    "animal rescue",
    "shelter dog",
    "pet adoption",
    "dog rescue",
    "pet rescue",
    "forever home",
    "adopt don't shop",

    // Emotional — people driven by the mission
    "forever home for dogs",
    "reduce dog returns shelters",
    "shelter dog adoption platform",
    "every dog deserves a home",
    "dog adoption technology",
  ],
  authors: [{ name: "Fourteen Labs LLC", url: "https://fetchmyheart.com" }],
  creator: "Fourteen Labs LLC",
  publisher: "Fourteen Labs LLC",
  alternates: {
    canonical: "https://fourteenlabsLLC.com",
  },
  openGraph: {
    title: "FetchMyHeart – Every Tail Tells a Story",
    description:
      "We're building a smarter way to adopt dogs. AI-powered matching that connects the right dog with the right home — the first time.",
    url: "https://fetchmyheart.com",
    siteName: "FetchMyHeart",
    images: [
      {
        url: "/FetchMyHeartLogo.jpg",
        width: 1200,
        height: 630,
        alt: "The story behind FetchMyHeart smarter dog adoption powered by machine learning",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FetchMyHeart – AI-Powered Dog Adoption",
    description:
      "The return is a failure of data, not a failure of the dog. We're fixing adoption with machine learning.",
    images: ["/FetchMyHeartLogo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  category: "technology",
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "FetchMyHeart",
    url: "https://fetchmyheart.com",
    logo: "https://fetchmyheart.com/favicon.ico",
    description:
      "Machine Learning dog adoption matching platform that connects the right dog with the right family based on lifestyle, activity level, and home environment.",
    foundingOrganization: {
      "@type": "Organization",
      name: "Fourteen Labs LLC",
    },
    sameAs: [],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "FetchMyHeart",
    url: "https://fetchmyheart.com",
    description:
      "Smarter dog adoption powered by machine learning. Find the right dog for your lifestyle, family, and home — the first time.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://fetchmyheart.com/?s={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "FetchMyHeart – AI-Powered Dog Adoption Matching",
    url: "https://fetchmyheart.com",
    description:
      "FetchMyHeart uses machine learning to match dogs with the right families. No more mismatched adoptions. The right dog, the right home, the first time.",
    inLanguage: "en-US",
    isPartOf: {
      "@type": "WebSite",
      url: "https://fetchmyheart.com",
    },
    about: {
      "@type": "Thing",
      name: "Dog Adoption Matching",
    },
    keywords:
      "dog adoption, AI pet matching, rescue dog, forever home, shelter dog adoption, rescue shelter, rescue pets, animal shelter",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How does FetchMyHeart match dogs with families?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "FetchMyHeart uses machine learning to analyze your lifestyle, activity level, living space, and family dynamic to find the dog that fits your life naturally — not just the first available match.",
        },
      },
      {
        "@type": "Question",
        name: "Why do so many adopted dogs get returned to shelters?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "15% of adopted dogs are returned within six months. Most returns happen not because the dog was difficult, but because the match wasn't right from the start. FetchMyHeart fixes this with data-driven compatibility matching.",
        },
      },
      {
        "@type": "Question",
        name: "How many animals die in shelters annually?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Approximately 920,000 shelter animals are euthanized in the United States every year, including around 390,000 dogs. Better adoption matching directly reduces this number — when the right dog finds the right home the first time, fewer dogs cycle back into the shelter system. FetchMyHeart exists to make every match count.",
        },
      },
      {
        "@type": "Question",
        name: "Is FetchMyHeart free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "FetchMyHeart is currently in development. Join the waitlist to get early access when we launch.",
        },
      },
      {
        "@type": "Question",
        name: "How is FetchMyHeart different from Petfinder or other adoption sites?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Unlike traditional adoption platforms that list dogs by breed or location, FetchMyHeart matches based on real compatibility — your energy level, schedule, experience, and home environment — to find a dog that fits your actual life.",
        },
      },
    ],
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {jsonLd.map((item, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
          />
        ))}
      </head>
      <body className={`${playfair.variable} ${dmSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}