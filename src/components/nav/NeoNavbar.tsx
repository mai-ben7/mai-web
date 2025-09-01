"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useScrollSpy } from "@/components/util/useScrollSpy";
import { useIsCoarsePointer } from "@/components/util/useIsCoarsePointer";

/** Link shape */
export type NavLink = { href: string; label: string; sectionId?: string };

export interface NeoNavbarProps {
  links?: NavLink[];
  ctaPrimary?: { label: string; href: string } | null;
  className?: string;
  rtl?: boolean;              // set true if your page is RTL
  dockThreshold?: number;     // pixels until we compact, default 24
}

/**
 * NeoNavbar — floating glass capsule that compacts on scroll.
 * Desktop: fixed, centered capsule; Mobile: bottom sticky pill.
 */
export default function NeoNavbar({
  links = [
    { href: "#work", label: "Work", sectionId: "work" },
    { href: "#about", label: "About", sectionId: "about" },
    { href: "#services", label: "Services", sectionId: "services" },
    { href: "#contact", label: "Contact", sectionId: "contact" },
  ],
  ctaPrimary = { label: "Hire Me", href: "#contact" },
  className = "",
  rtl = false,
  dockThreshold = 24,
}: NeoNavbarProps) {
  const [docked, setDocked] = React.useState(false);
  const isCoarse = useIsCoarsePointer();
  const sectionIds = links.map((l) => l.sectionId).filter(Boolean) as string[];
  const active = useScrollSpy(sectionIds);

  React.useEffect(() => {
    const onScroll = () => setDocked(window.scrollY > dockThreshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dockThreshold]);

  /** For keyboard accessibility, compute aria-current */
  const isActive = (href: string, id?: string) =>
    (id && active === id) || (typeof window !== "undefined" && window.location.hash === href);

  /** Desktop navbar (floating capsule) */
  const DesktopCapsule = (
    <div
      dir={rtl ? "rtl" : "ltr"}
      className={`
        pointer-events-none fixed left-1/2 top-4 z-[60] -translate-x-1/2
        transition-all duration-300
        ${docked ? "scale-[0.98] translate-y-0" : "scale-100 translate-y-0"}
      `}
    >
                      <nav
          aria-label="Primary"
          className={`
            pointer-events-auto backdrop-blur-xl border
            rounded-full px-2.5 py-2 shadow-[0_10px_40px_rgba(0,0,0,.25)]
            transition-all duration-300
            ${docked ? "bg-white/14 border-white/20" : "bg-white/10 border-white/15"}
          `}
        style={{
          // smooth width that fits content but caps for smaller screens
          maxWidth: "min(92vw, 1200px)",
        }}
      >
        <div className="flex items-center gap-1">
          {/* Logo + Name */}
                     <Link href="#hero" className="flex items-center mr-3">
            <Image
              src="/images/logo+name.png"
              alt="Mai Ben Sheva Logo"
              width={160}
              height={42}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>

          {/* Links */}
          <ul className="flex items-center gap-1">
            {links.map((l) => {
              const activeNow = isActive(l.href, l.sectionId);
              return (
                <li key={l.href}>
                                                        <Link
                     href={l.href}
                     aria-current={activeNow ? "page" : undefined}
                     className={`
                       relative rounded-full px-3.5 py-2 text-sm font-medium transition
                       outline-none focus-visible:ring-2 focus-visible:ring-white/40
                       ${activeNow ? "text-white bg-white/15" : "text-white/80 hover:text-white hover:bg-white/10"}
                     `}
                   >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Divider */}
          <div className="mx-2 h-6 w-px bg-white/15" aria-hidden />

          {/* CTA */}
          {ctaPrimary ? (
                                      <Link
               href={ctaPrimary.href}
               className={`
                 rounded-full bg-white text-black text-sm font-semibold px-4 py-2
                 transition-transform duration-200 ease-[cubic-bezier(.22,1,.36,1)]
                 hover:scale-[1.02] hover:shadow-[0_10px_30px_rgba(17,214,196,.15)]
               `}
             >
              {ctaPrimary.label}
            </Link>
          ) : null}
        </div>
      </nav>
    </div>
  );

  /** Mobile bottom pill */
  const MobileBottom = (
    <div
      dir={rtl ? "rtl" : "ltr"}
      className={`
        fixed inset-x-0 bottom-3 z-[60] px-3 md:hidden
      `}
    >
             {/* Mobile Logo - positioned above the pill */}
       <div className="flex justify-center mb-3">
                             <Link href="#hero" className="flex items-center">
           <Image
             src="/images/logo+name.png"
             alt="Mai Ben Sheva Logo"
             width={140}
             height={36}
             className="h-8 w-auto object-contain"
             priority
           />
         </Link>
       </div>
      
                      <nav
          aria-label="Mobile"
          className="mx-auto max-w-[640px] rounded-full border border-white/15 bg-white/12 backdrop-blur-xl px-2 py-2 shadow-[0_10px_40px_rgba(0,0,0,.35)]"
        >
        <ul className="grid grid-cols-4 items-stretch">
          {links.slice(0, 4).map((l) => {
            const activeNow = isActive(l.href, l.sectionId);
            return (
              <li key={l.href} className="flex">
                                                  <Link
                   href={l.href}
                   aria-current={activeNow ? "page" : undefined}
                   className={`
                     flex-1 rounded-full px-3 py-2 text-center text-[13px] font-medium
                     ${activeNow ? "text-white bg-white/15" : "text-white/85 hover:text-white hover:bg-white/10"}
                   `}
                 >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );

  return (
    <>
      {DesktopCapsule}
      {MobileBottom}
    </>
  );
}
