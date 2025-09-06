"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatedButton } from "@/components/AnimatedButton";

type HeroSimeyCardProps = {
  name?: string;
  role?: string;
  blurb?: string;
  imageSrc?: string;      // e.g. "/images/portrait.jpg"
  imageAlt?: string;
  className?: string;
  rtl?: boolean;
};

export default function HeroSimeyCard({
  name = "Your Name",
  role = "Web Developer • Creative Engineer",
  blurb = "I build advanced, animated web experiences that convert and feel premium.",
  imageSrc = "/images/portrait.jpg",
  imageAlt = "Portrait",
  className = "",
  rtl = false,
}: HeroSimeyCardProps) {
  const cardRef = React.useRef<HTMLDivElement | null>(null);
  const [coarse, setCoarse] = React.useState(false);
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    setCoarse(window.matchMedia("(pointer: coarse)").matches);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handle = () => setReduced(mq.matches);
    handle();
    mq.addEventListener?.("change", handle);
    return () => mq.removeEventListener?.("change", handle);
  }, []);

  React.useEffect(() => {
    if (coarse || reduced) return;
    const el = cardRef.current;
    if (!el) return;

    const max = 10; // degrees
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / (r.width / 2);
      const dy = (e.clientY - cy) / (r.height / 2);

      // rotate and pass coords to CSS vars for glare
      el.style.setProperty("--rx", String((-dy * max).toFixed(2)));
      el.style.setProperty("--ry", String((dx * max).toFixed(2)));
      el.style.setProperty("--mx", String(e.clientX - r.left));
      el.style.setProperty("--my", String(e.clientY - r.top));
      el.style.transform = `rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg)) translateZ(0)`;
    };
    const onLeave = () => {
      el.style.transform = "rotateX(0deg) rotateY(0deg)";
      el.style.removeProperty("--mx");
      el.style.removeProperty("--my");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [coarse, reduced]);

  return (
    <section
      id="hero"
      className={`relative min-h-[100svh] grid place-items-center px-6 ${className}`}
      dir={rtl ? "rtl" : "ltr"}
      aria-label="Intro"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-blue-100 to-purple-200">
        {/* Static gradient orbs */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-60"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-60"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-60"></div>
      </div>
      <div className="mx-auto w-full max-w-[1200px] grid gap-10 md:grid-cols-[1.05fr,.95fr] items-center">
        {/* Copy */}
        <div className="order-2 md:order-1 relative z-10">
          <p className="text-sm tracking-widest uppercase text-slate-700 font-semibold">תיק עבודות</p>
          <h1 className="mt-3 text-4xl md:text-6xl font-extrabold leading-[1.05] text-slate-800">
            שלום, אני{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500">
              מאי בן שבע
            </span>
            .
          </h1>
          <h2 className="mt-3 text-2xl md:text-3xl text-slate-700 font-bold">מפתחת אתרים • מהנדסת יצירתית</h2>
          <p className="mt-5 text-lg text-slate-600 max-w-[60ch] font-medium">אני בונה חוויות אתרים מתקדמות ואנימציות שממירות ומרגישות פרימיום.</p>
          <p className="mt-4 text-xl text-slate-700 font-bold italic">על איכות לא מתפשרים</p>
          
          <div className="mt-8 flex flex-wrap gap-3">
            <AnimatedButton 
              style={{ transform: 'translateX(-380px) translateY(40px)' }}
              onClick={() => {
              const element = document.querySelector('#booking');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}>
              צור קשר
            </AnimatedButton>
          </div>
        </div>

        {/* Card */}
        <div className="order-1 md:order-2">
          <div className="relative mx-auto w-[min(92vw,400px)]" style={{ paddingTop: '80px' }}>
            <div className="simey-card-3d [perspective:1200px]">
              <div
                ref={cardRef}
                className="simey-card group"
                role="img"
                aria-label={imageAlt}
              >
                {/* card background */}
                <div className="simey-card__background"></div>
                
                {/* background image */}
                <div className="simey-card__media">
                  <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 40vw, 92vw"
                    className="object-cover"
                  />
                </div>

                {/* shine effect */}
                <div className="shine-effect"></div>

                {/* overlay content - minimal and clean */}
                <div className="simey-card__content">
                  <div className="simey-card__chip">זמינה לעבודה</div>
                  
                  {/* שפות ומערכות - רק שורה אחת קומפקטית */}
                  <div className="mt-3">
                    <div className="flex flex-wrap gap-1.5 justify-center">
                      <span className="px-2 py-1 bg-blue-100/90 text-blue-800 text-xs font-medium rounded-full">React</span>
                      <span className="px-2 py-1 bg-purple-100/90 text-purple-800 text-xs font-medium rounded-full">Next.js</span>
                      <span className="px-2 py-1 bg-pink-100/90 text-pink-800 text-xs font-medium rounded-full">TypeScript</span>
                      <span className="px-2 py-1 bg-teal-100/90 text-teal-800 text-xs font-medium rounded-full">Tailwind CSS</span>
                      <span className="px-2 py-1 bg-blue-100/90 text-blue-800 text-xs font-medium rounded-full">CSS3</span>
                      <span className="px-2 py-1 bg-orange-100/90 text-orange-800 text-xs font-medium rounded-full">HTML5</span>
                      <span className="px-2 py-1 bg-rose-100/90 text-rose-800 text-xs font-medium rounded-full">Framer Motion</span>
                      <span className="px-2 py-1 bg-emerald-100/90 text-emerald-800 text-xs font-medium rounded-full">Three.js</span>
                    </div>
                  </div>
                </div>

                {/* decorative glare/shine handled in CSS ::before/::after */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
