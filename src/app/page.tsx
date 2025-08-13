import { Metadata } from "next"
import { HomePageClient } from "@/components/HomePageClient"

export const metadata: Metadata = {
  title: "mai web - אתרים חיים שמזיזים אנשים",
  description: "אני מאי בן שבע, בונה אתרים מרהיבים עם אנימציות חכמות שמבליטות את העסק שלך וממירות מבקרים ללקוחות.",
}

export default function HomePage() {
  return <HomePageClient />
}
