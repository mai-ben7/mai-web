import RevealText from "@/components/RevealText";
import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import { useI18n } from "@/components/i18n/I18nProvider";

interface TestimonialSliderProps {
  children: React.ReactNode;
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}

const TestimonialSlider = ({
  children,
  autoPlay = true,
  interval = 3000,
  className = "",
}: TestimonialSliderProps) => {
  const [isPaused, setIsPaused] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const childrenArray = Array.isArray(children) ? children : [children];
  const totalSlides = childrenArray.length;

  // Calculate animation duration based on number of testimonials
  const animationDuration = totalSlides * 3; // 3 seconds per testimonial

  return (
    <div className={`relative ${className}`}>
      {/* Infinite Auto-Scrolling Container */}
      <div
        ref={containerRef}
        className="overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className={`flex gap-4 marquee-container ${isPaused ? 'marquee-paused' : ''}`}
          style={{
            animation: isPaused ? 'none' : `scroll-right ${animationDuration}s linear infinite`,
            transform: isPaused ? `translateX(${currentPosition}%)` : 'none',
          }}
        >
          {/* First set of testimonials */}
          <div className="flex gap-4 shrink-0">
            {childrenArray.map((child, index) => (
              <div key={`first-${index}`} className="flex-shrink-0 w-80">
                {child}
              </div>
            ))}
          </div>
          
          {/* Second set for seamless loop */}
          <div className="flex gap-4 shrink-0">
            {childrenArray.map((child, index) => (
              <div key={`second-${index}`} className="flex-shrink-0 w-80">
                {child}
              </div>
            ))}
          </div>
          
          {/* Third set to ensure smooth transition */}
          <div className="flex gap-4 shrink-0">
            {childrenArray.map((child, index) => (
              <div key={`third-${index}`} className="flex-shrink-0 w-80">
                {child}
              </div>
            ))}
          </div>
          
          {/* Fourth set to complete the circle */}
          <div className="flex gap-4 shrink-0">
            {childrenArray.map((child, index) => (
              <div key={`fourth-${index}`} className="flex-shrink-0 w-80">
                {child}
              </div>
            ))}
          </div>
        </div>
      </div>



      {/* Dots to show current position - even spacing */}
      <div className="flex justify-center mt-6 gap-3">
        {childrenArray.map((_, index) => (
          <div key={index} className="w-5 h-5 flex items-center justify-center">
            <div
              className={`w-2.5 h-2.5 rounded-full ${
                isPaused ? "bg-blue-600" : "bg-gray-300"
              }`}
            />
          </div>
        ))}
      </div>

      <style>
        {`
          @keyframes scroll-right {
            from { transform: translateX(0); }
            to { transform: translateX(25%); }
          }
          
          .marquee-paused {
            animation-play-state: paused !important;
          }
          
          /* Ensure smooth circular loop */
          .marquee-container {
            will-change: transform;
            transition: transform 0.5s ease-in-out;
          }
        `}
      </style>
    </div>
  );
};

interface ReviewCardProps {
  avatar: string;
  name: string;
  rating: number;
  review: string;
}

const ReviewCard = ({ avatar, name, rating, review }: ReviewCardProps) => (
  <div className="w-72 p-4 bg-card rounded-lg border border-border shadow-sm">
    <div className="flex items-center gap-3 mb-3">
      <img
        src={avatar}
        alt={name}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div>
        <h3 className="font-medium text-foreground">{name}</h3>
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`}
            />
          ))}
        </div>
      </div>
    </div>
    <p className="text-sm text-muted-foreground">{review}</p>
  </div>
);

const getTestimonials = (t: (key: string) => string) => [
  {
    id: 1,
    name: t("testimonials.items.0.name"),
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    rating: 5,
    review: t("testimonials.items.0.text"),
  },
  {
    id: 2,
    name: t("testimonials.items.1.name"),
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
    rating: 5,
    review: t("testimonials.items.1.text"),
  },
  {
    id: 3,
    name: t("testimonials.items.2.name"),
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
    rating: 5,
    review: t("testimonials.items.2.text"),
  },
  {
    id: 4,
    name: t("testimonials.items.3.name"),
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=james",
    rating: 4,
    review: t("testimonials.items.3.text"),
  },
  {
    id: 5,
    name: t("testimonials.items.4.name"),
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=dana",
    rating: 5,
    review: t("testimonials.items.4.text"),
  },
  {
    id: 6,
    name: t("testimonials.items.5.name"),
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alon",
    rating: 5,
    review: t("testimonials.items.5.text"),
  },
  {
    id: 7,
    name: t("testimonials.items.6.name"),
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michal",
    rating: 4,
    review: t("testimonials.items.6.text"),
  },
  {
    id: 8,
    name: t("testimonials.items.7.name"),
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=daniel",
    rating: 5,
    review: t("testimonials.items.7.text"),
  },
];

export default function TestimonialsSection() {
  const { t } = useI18n();
  const reviews = getTestimonials(t);

  return (
    <section id="testimonials" data-theme data-stop1="#bfdbfe" data-stop2="#dbeafe" data-stop3="#fbcfe8" data-o1-x="18%" data-o1-y="120rem" data-o1-size="38rem" data-o1-color="rgba(96,165,250,.45)" data-o1-alpha="1" data-o2-x="76%" data-o2-y="150rem" data-o2-size="40rem" data-o2-color="rgba(167,139,250,.35)" data-o2-alpha=".9" className="py-24 relative">
      
      <div className="container mx-auto px-8 relative z-10">
        <div className="w-full max-w-6xl mx-auto space-y-8">
          <div className="space-y-2">
            <div className="text-center">
              <RevealText as="h2" className="text-2xl font-semibold text-foreground mb-6 text-center" splitBy="word" stagger={0.06}>
                {t("testimonials.title")} <span className="text-gradient">{t("testimonials.titleHighlight")}</span>
              </RevealText>
            </div>
            <TestimonialSlider 
              autoPlay={true} 
              interval={4000} 
              className="py-4"
            >
              {reviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  avatar={review.avatar}
                  name={review.name}
                  rating={review.rating}
                  review={review.review}
                />
              ))}
            </TestimonialSlider>
          </div>
        </div>
      </div>
    </section>
  );
}
