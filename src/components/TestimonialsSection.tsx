import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";

interface MarqueeProps {
  children: React.ReactNode;
  direction?: "left" | "right";
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
}

const Marquee = ({
  children,
  direction = "left",
  speed = 50,
  pauseOnHover = true,
  className = "",
}: MarqueeProps) => {
  const [contentWidth, setContentWidth] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (contentRef.current) {
      setContentWidth(contentRef.current.scrollWidth);
    }
  }, [children]);

  return (
    <div
      className={`overflow-hidden relative ${className}`}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <div
        className={`flex min-w-full gap-4 ${isPaused ? 'marquee-paused' : ''}`}
        style={{
          animation: `scroll-${direction} ${contentWidth / speed}s linear infinite`,
        }}
      >
        <div ref={contentRef} className="flex gap-4 shrink-0">
          {children}
        </div>
        <div className="flex gap-4 shrink-0">{children}</div>
      </div>

      <style>
        {`
          @keyframes scroll-left {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          @keyframes scroll-right {
            from { transform: translateX(-50%); }
            to { transform: translateX(0); }
          }
          
          .marquee-paused {
            animation-play-state: paused !important;
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
    <section id="testimonials" className="py-24 bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
      <div className="container mx-auto px-8">
        <div className="w-full max-w-6xl mx-auto space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-center text-foreground mb-6">
              מה הלקוחות אומרים
            </h2>
            <Marquee direction="left" className="py-4 px-4 overflow-hidden" speed={25}>
              {reviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  avatar={review.avatar}
                  name={review.name}
                  rating={review.rating}
                  review={review.review}
                />
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
}
