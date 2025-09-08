import RevealText from "@/components/RevealText";
import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";

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

export default function TestimonialsSection() {
  const reviews = [
    {
      id: 1,
      name: "שרה כהן",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      rating: 5,
      review:
        "האתר שעשית לי עולה על כל הציפיות! העיצוב מרהיב והאנימציות מדהימות. הלקוחות שלי כל הזמן אומרים כמה האתר נראה מקצועי.",
    },
    {
      id: 2,
      name: "מיכאל לוי",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      rating: 5,
      review:
        "מאי עשה עבודה מעולה! האתר לא רק נראה טוב, אלא גם עובד בצורה מושלמת על כל המכשירים. המחיר היה הוגן והשירות מקצועי.",
    },
    {
      id: 3,
      name: "עמליה דוד",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
      rating: 5,
      review:
        "אני אוהבת את האתר החדש שלי! מאי הבין בדיוק מה שאני רציתי ועשה את זה אפילו יותר טוב. האנימציות מוסיפות המון ערך.",
    },
    {
      id: 4,
      name: "יעקב וייס",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=james",
      rating: 4,
      review:
        "מאוד מרוצה מהאיכות והקפדה על הפרטים. האתר נראה מקצועי ומתפקד בצורה מושלמת.",
    },
    {
      id: 5,
      name: "דנה אברהם",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=dana",
      rating: 5,
      review:
        "מאי עשה עבודה מדהימה! האתר שלי עכשיו נראה כמו של חברה גדולה. האנימציות מושכות את העין והמשתמשים נשארים יותר זמן.",
    },
    {
      id: 6,
      name: "אלון ברק",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alon",
      rating: 5,
      review:
        "האתר החדש הביא לי הרבה יותר לקוחות! העיצוב המודרני והאנימציות החכמות גורמות לאנשים להתעניין יותר בעסק שלי.",
    },
    {
      id: 7,
      name: "מיכל רוזן",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michal",
      rating: 4,
      review:
        "שירות מעולה ומקצועי. מאי עשה את האתר בדיוק כמו שרציתי, עם הרבה רעיונות יצירתיים שכללתי.",
    },
    {
      id: 8,
      name: "דניאל כהן",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=daniel",
      rating: 5,
      review:
        "האתר שעשית לי נראה מדהים! האנימציות מוסיפות המון ערך והמשתמשים אוהבים את החוויה. בהחלט אמליץ עליך!",
    },
  ];

  return (
    <section id="testimonials" className="py-24 relative">
      
      <div className="container mx-auto px-8 relative z-10">
        <div className="w-full max-w-6xl mx-auto space-y-8">
          <div className="space-y-2">
            <div className="text-center">
              <RevealText as="h2" className="text-2xl font-semibold text-foreground mb-6 text-center" splitBy="word" stagger={0.06}>
                מה הלקוחות <span className="text-gradient">אומרים</span>
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
