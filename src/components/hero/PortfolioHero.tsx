"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePrefersReducedMotion } from "@/components/util/usePrefersReducedMotion";

type Props = {
  name?: string;
  title?: string;
  subtitle?: string;
  avatarSrc?: string; // e.g. "/images/portrait.jpg"
  ctaPrimaryHref?: string;
  ctaSecondaryHref?: string;
};

export default function PortfolioHero({
  name = "מאי בן שבע",
  title = "מפתחת אתרים • מהנדסת יצירתית",
  subtitle = "אני בונה אתרים מתקדמים עם אנימציות חכמות שמבליטות את העסק שלך וממירות מבקרים ללקוחות.",
  avatarSrc = "/images/portrait.jpg",
  ctaPrimaryHref = "#packages",
  ctaSecondaryHref = "#booking",
}: Props) {
  const reduced = usePrefersReducedMotion();
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  // Sophisticated mouse interaction for the entire portrait container
  React.useEffect(() => {
    if (reduced) return;
    const el = containerRef.current;
    if (!el) return;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) return;

    const maxTilt = 8; // degrees
    const maxLift = 20; // pixels
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      
      // Apply subtle tilt and lift effect
      el.style.transform = `
        perspective(1000px)
        rotateX(${(-dy * maxTilt).toFixed(2)}deg) 
        rotateY(${(dx * maxTilt).toFixed(2)}deg) 
        translateZ(${(Math.abs(dx) + Math.abs(dy)) * maxLift}px)
      `;
    };
    const onLeave = () => { 
      el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)"; 
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [reduced]);

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white"
      aria-label="Intro"
    >
      {/* Enhanced Background accents */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* Animated gradient orbs */}
        <div className="absolute -top-16 -left-16 h-[40vmax] w-[40vmax] rounded-full
                        bg-[radial-gradient(closest-side,rgba(59,130,246,0.25),transparent_70%)] blur-2xl animate-pulse" />
        <div className="absolute -bottom-20 -right-24 h-[35vmax] w-[35vmax] rounded-full
                        bg-[radial-gradient(closest-side,rgba(236,72,153,0.2),transparent_70%)] blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Floating geometric elements */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 border border-white/10 rounded-full animate-spin-slow" />
        <div className="absolute bottom-1/3 left-1/3 w-24 h-24 border border-white/5 rotate-45 animate-spin-slow-reverse" />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-6 pt-28 pb-16 grid items-center gap-10 md:grid-cols-2">
        {/* Copy */}
        <div className="order-2 md:order-1">
          <p className="text-sm tracking-widest uppercase text-white/70">תיק עבודות</p>
          <h1 className="mt-3 text-4xl md:text-6xl font-extrabold leading-[1.05]">
            שלום, אני <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[rgba(17,214,196,0.85)]">{name}</span>
          </h1>
          <h2 className="mt-3 pt-2 text-2xl md:text-3xl text-white/90">{title}</h2>
          <p className="mt-5 text-lg text-white/80 max-w-[60ch]">{subtitle}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={ctaPrimaryHref} className="btn-primary rounded-full">צפה בחבילות</Link>
            <Link href={ctaSecondaryHref}
              className="rounded-full border border-white/20 bg-white/10 px-6 py-3 font-semibold hover:bg-white/15 transition-colors">
              צור קשר
            </Link>
          </div>
        </div>

        {/* Unique Floating Glass Panels Portrait */}
        <div className="order-1 md:order-2">
          <div className="relative mx-auto w-[min(92vw,520px)] aspect-[4/5] [perspective:2000px]">
            {/* Background floating panels */}
            <div className="absolute inset-0">
              {/* Panel 1 - Back layer */}
              <div className="absolute inset-4 rounded-[32px] bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 transform rotate-3 translate-y-2 animate-float-gentle" />
              
              {/* Panel 2 - Middle layer */}
              <div className="absolute inset-2 rounded-[30px] bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-md border border-white/20 transform -rotate-2 -translate-y-1 animate-float-gentle" style={{ animationDelay: '2s' }} />
              
              {/* Panel 3 - Front layer */}
              <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-white/8 to-white/15 backdrop-blur-lg border border-white/30 animate-glow-pulse" />
            </div>

            {/* Main portrait container with sophisticated effects */}
            <div
              ref={containerRef}
              className="relative h-full w-full transition-transform duration-700 ease-[var(--ease-emphasis)] will-change-transform"
            >
              {/* Portrait image with enhanced styling */}
              <div className="relative h-full w-full rounded-[26px] overflow-hidden">
                <Image
                  src={avatarSrc}
                  alt={name}
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  placeholder="empty"
                  className="object-cover"
                />
                
                {/* Sophisticated lighting effects */}
                <div aria-hidden className="pointer-events-none absolute inset-0">
                  {/* Main spotlight */}
                  <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_70%_20%,rgba(255,255,255,0.3),transparent_60%)]" />
                  
                  {/* Secondary rim light */}
                  <div className="absolute inset-0 bg-[radial-gradient(80%_120%_at_30%_80%,rgba(59,130,246,0.2),transparent_70%)]" />
                  
                  {/* Subtle vignette */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_60%,rgba(0,0,0,0.1)_100%)]" />
                </div>

                {/* Floating accent elements */}
                <div className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse" />
                <div className="absolute bottom-4 left-4 w-2 h-2 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
              </div>

              {/* Floating info panel */}
              <div className="absolute -bottom-6 -right-6 w-48 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 transform rotate-3 animate-float-gentle">
                <div className="text-center">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto mb-2 animate-pulse" />
                  <p className="text-sm font-medium text-white/90">{name}</p>
                  <p className="text-xs text-white/70 mt-1">{title}</p>
                </div>
                {/* Shimmer effect */}
                <div className="absolute inset-0 rounded-2xl animate-shimmer" />
              </div>

              {/* Decorative corner accent */}
              <div className="absolute -top-2 -left-2 w-16 h-16 border-l-2 border-t-2 border-white/20 rounded-tl-2xl animate-glow-pulse" />
              <div className="absolute -bottom-2 -right-2 w-16 h-16 border-r-2 border-b-2 border-white/20 rounded-br-2xl animate-glow-pulse" style={{ animationDelay: '2s' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced scroll cue */}
      <div aria-hidden className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/70">
        <div className="flex flex-col items-center text-xs">
          <span>גלול למטה</span>
          <div className="mt-2 w-6 h-8 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white/60 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
