import { Metadata } from "next"
import { HomePageClient } from "@/components/HomePageClient"

export const metadata: Metadata = {
  title: "mai web - Live websites that move people",
  description: "I'm Mai Ben Sheva, building stunning websites with smart animations that highlight your business and convert visitors into customers.",
}

export default function HomePage() {
  return <HomePageClient />
}
