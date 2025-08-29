import TestimonialsScroller from "@/components/testimonials/TestimonialsScroller";
import { TESTIMONIALS } from "@/data/testimonials";

export function TestimonialsSection() {
  return (
    <TestimonialsScroller
      items={TESTIMONIALS}
      title="מה הלקוחות אומרים"
      subtitle="תוצאות אמיתיות מלקוחות מרוצים"
      className="py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600"
    />
  );
}
