# mai web - אתרים חיים שמזיזים אנשים

פורטפוליו מקצועי של מאי בן שבע לבניית אתרים מרהיבים עם אנימציות מתקדמות בעברית (RTL).

## 🚀 תכונות

- **עברית מלאה עם RTL** - תמיכה מלאה בעברית וכיוון RTL
- **אנימציות מתקדמות** - Framer Motion עם אפקטים מרשימים
- **אנימציות מתקדמות** - Framer Motion עם אפקטים אינטראקטיביים
- **עיצוב מודרני** - Tailwind CSS עם ערכת צבעים מותאמת אישית
- **נגישות מלאה** - תמיכה ב-WCAG AA+ וניווט מקלדת
- **ביצועים מעולים** - Next.js 14 עם App Router ואופטימיזציה
- **טופסי יצירת קשר** - עם ולידציה מלאה ו-API routes
- **ערכת נושא כהה/בהירה** - תמיכה בערכות נושא דינמיות

## 🛠️ טכנולוגיות

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, CSS Variables
- **Animations**: Framer Motion
- **UI Components**: Radix UI, shadcn/ui
- **Forms**: React Hook Form, Zod validation
- **Icons**: Lucide React
- **Fonts**: Heebo (Hebrew)

## 📦 התקנה

1. **שכפול הפרויקט**
```bash
git clone <repository-url>
cd mai-web
```

2. **התקנת תלויות**
```bash
npm install
```

3. **הרצת הפרויקט**
```bash
npm run dev
```

4. **פתיחת הדפדפן**
```
http://localhost:3000
```

## 🏗️ מבנה הפרויקט

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── projects/          # Projects page
│   ├── services/          # Services page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Base UI components
│   ├── Header.tsx        # Navigation header
│   ├── Footer.tsx        # Site footer
│   ├── Hero.tsx          # Hero section
│   ├── FeatureCards.tsx  # Features showcase
│   ├── Packages.tsx      # Pricing packages
│   ├── TestimonialCarousel.tsx # Customer testimonials
│   └── ContactForm.tsx   # Contact forms
├── content/              # Static content
│   ├── projects.json     # Projects data
│   └── testimonials.json # Customer testimonials
└── lib/                  # Utilities
    ├── animations.ts     # Framer Motion variants
    └── utils.ts          # Helper functions
```

## 🎨 ערכת הצבעים

```css
--brand: #6C5CE7 (electric indigo)
--accent: #F72585 (vivid magenta)
--ink: #0F172A (slate-900)
--muted: #64748B (slate-500)
--bg: #FFFFFF
--bg-soft: #F8FAFC
```

## 📝 תוכן

### עריכת פרויקטים
עדכנו את הקובץ `src/content/projects.json`:

```json
{
  "id": 1,
  "title": "שם הפרויקט",
  "slug": "project-slug",
  "client": "שם הלקוח",
  "category": "קטגוריה",
  "tags": ["React", "Next.js"],
  "summary": "תקציר קצר",
  "description": "תיאור מלא",
  "problem": "הבעיה",
  "solution": "הפתרון",
  "results": {
    "conversions": "+150%",
    "orders": "+200%"
  },
  "images": ["/projects/image1.jpg"],
  "technologies": ["Next.js", "TypeScript"],
  "duration": "6 שבועות",
  "budget": "15,000 ₪"
}
```

### עריכת המלצות
עדכנו את הקובץ `src/content/testimonials.json`:

```json
{
  "id": 1,
  "name": "שם הלקוח",
  "company": "שם החברה",
  "role": "תפקיד",
  "content": "תוכן ההמלצה",
  "rating": 5,
  "image": "/testimonials/image.jpg"
}
```

## 🔧 הגדרות

### הוספת תמונות
1. הכניסו תמונות לתיקיית `public/`
2. השתמשו בנתיב יחסי: `/projects/image.jpg`

### שינוי פרטי יצירת קשר
עדכנו את הקובץ `src/components/Footer.tsx`:
```tsx
<a href="mailto:your@email.com">your@email.com</a>
<a href="tel:+972501234567">050-123-4567</a>
```

### הוספת שירותי אימייל
עדכנו את הקבצים `src/app/api/contact/route.ts` ו-`src/app/api/consult/route.ts`:
```tsx
// TODO: Add email service integration here
// Example with Nodemailer or SendGrid
```

## 🚀 פריסה

### Vercel (מומלץ)
1. התחברו ל-Vercel
2. שכפלו את הפרויקט
3. Vercel יזהה אוטומטית את Next.js ויפרס

### Netlify
1. התחברו ל-Netlify
2. שכפלו את הפרויקט
3. הגדירו build command: `npm run build`
4. הגדירו publish directory: `out`

## 📱 תמיכה בדפדפנים

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## ♿ נגישות

- תמיכה ב-WCAG AA+
- ניווט מקלדת מלא
- תמיכה ב-screen readers
- ניגודיות צבעים תקינה
- תמיכה ב-reduced motion

## 🔍 SEO

- Meta tags מלאים
- Open Graph tags
- Twitter Cards
- JSON-LD structured data
- Sitemap אוטומטי
- Robots.txt

## 📊 ביצועים

- Lighthouse 90+ בכל הקטגוריות
- Core Web Vitals מעולים
- Code splitting אוטומטי
- Image optimization
- Font optimization

## 🤝 תרומה

1. Fork את הפרויקט
2. צרו branch חדש (`git checkout -b feature/amazing-feature`)
3. Commit את השינויים (`git commit -m 'Add amazing feature'`)
4. Push ל-branch (`git push origin feature/amazing-feature`)
5. פתחו Pull Request

## 📄 רישיון

פרויקט זה מוגן תחת רישיון MIT. ראה קובץ `LICENSE` לפרטים.

## 📞 יצירת קשר

- **אימייל**: hello@maiweb.co.il
- **טלפון**: 050-123-4567
- **מיקום**: תל אביב, ישראל

---

**נבנה עם ❤️ על ידי מאי בן שבע**
