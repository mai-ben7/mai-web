import type { Metadata } from "next";
import { Heebo, Poppins } from "next/font/google";
import "./globals.css";
import "@/components/hero/HeroSimeyCard.css";
import "@/components/ui/blob-button.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import GlobalBackground from "@/components/background/GlobalBackground";

const heebo = Heebo({ 
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
});

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "mai web - אתרים חיים שמזיזים אנשים",
  description: "אני מאי בן שבע, בונה אתרים מרהיבים עם אנימציות חכמות שמבליטות את העסק שלך וממירות מבקרים ללקוחות.",
  keywords: ["אתרים", "עיצוב", "אנימציות", "פיתוח", "עברית", "RTL"],
  authors: [{ name: "מאי בן שבע" }],
  creator: "מאי בן שבע",
  publisher: "mai web",
  icons: {
    icon: [
      { url: "/images/logo-only.png?v=2", sizes: "192x192", type: "image/png" },
    ],
    apple: "/images/logo-only.png?v=2",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "mai web - אתרים חיים שמזיזים אנשים",
    description: "אני מאי בן שבע, בונה אתרים מרהיבים עם אנימציות חכמות שמבליטות את העסק שלך וממירות מבקרים ללקוחות.",
    type: "website",
    locale: "he_IL",
    images: [
      {
        url: "/images/logo+name.png",
        width: 1200,
        height: 630,
        alt: "mai web - אתרים חיים שמזיזים אנשים",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "mai web - אתרים חיים שמזיזים אנשים",
    description: "אני מאי בן שבע, בונה אתרים מרהיבים עם אנימציות חכמות שמבליטות את העסק שלך וממירות מבקרים ללקוחות.",
    images: ["/images/logo+name.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <body className={`${heebo.variable} ${poppins.variable} font-hebrew antialiased bg-transparent overflow-x-hidden`}>
        <GlobalBackground />
          <Header />
          {/* Section-level backgrounds will handle their own vibe */}
          <main id="main" className="overflow-hidden">{children}</main>
          <Footer />
          
          {/* SVG Filter for Blob Button Animation */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
          >
            <defs>
              <filter id="goo">
                <feGaussianBlur
                  in="SourceGraphic"
                  result="blur"
                  stdDeviation="10"
                />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7"
                  result="goo"
                />
                <feBlend in2="goo" in="SourceGraphic" result="mix" />
              </filter>
            </defs>
          </svg>
      </body>
    </html>
  );
}
