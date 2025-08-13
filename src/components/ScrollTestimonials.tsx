"use client"

const testimonials = [
  {
    id: 1,
    title: "חוויה מדהימה",
    content: "האתר שהמאי בנה עבורנו הוא פשוט מדהים! האנימציות והעיצוב מושכים את העין והתוצאות מדברות בעד עצמן.",
    author: "שרה כהן",
    company: "מנכ\"לית, טכנולוגיות מתקדמות",
    gradient: "from-green-200 to-blue-200",
    textColor: "text-gray-800"
  },
  {
    id: 2,
    title: "תוצאות מעל המצופה",
    content: "מאז שהאתר החדש עלה לאוויר, המכירות שלנו עלו ב-150%. המאי הבין בדיוק מה אנחנו צריכים.",
    author: "דוד לוי",
    company: "בעלים, חנות אונליין",
    gradient: "from-indigo-800 to-purple-800",
    textColor: "text-white"
  },
  {
    id: 3,
    title: "שירות מקצועי",
    content: "העבודה עם מאי הייתה חלקה ומקצועית. הוא הקשיב לכל הבקשות שלנו והתוצאה מדהימה.",
    author: "מיכל רוזן",
    company: "מנהלת שיווק, חברת הייטק",
    gradient: "from-purple-800 to-pink-800",
    textColor: "text-white"
  },
  {
    id: 4,
    title: "מומלץ בחום!",
    content: "אם אתם מחפשים מפתח אתרים מקצועי ויצירתי, מאי הוא הבחירה הנכונה. התוצאות מדברות בעד עצמן.",
    author: "יוסי כהן",
    company: "מנכ\"ל, סטארט-אפ",
    gradient: "from-blue-200 to-indigo-100",
    textColor: "text-gray-800"
  }
]

export function ScrollTestimonials() {
  return (
    <section className="relative">
      {testimonials.map((testimonial, index) => (
        <div
          key={testimonial.id}
          className={`sticky top-0 h-screen flex flex-col items-center justify-center bg-gradient-to-b ${testimonial.gradient} ${testimonial.textColor}`}
        >
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl lg:text-6xl font-bold mb-8">
              {testimonial.title}
            </h2>
            
            <p className="text-xl lg:text-2xl leading-relaxed mb-8 max-w-3xl mx-auto">
              "{testimonial.content}"
            </p>
            
            <div className="mt-8">
              <p className="text-lg font-semibold">{testimonial.author}</p>
              <p className="text-sm opacity-80">{testimonial.company}</p>
            </div>
            
            {index < testimonials.length - 1 && (
              <p className="mt-12 text-sm opacity-70">
                גלול למטה לסקירה הבאה
              </p>
            )}
          </div>
        </div>
      ))}
    </section>
  )
} 