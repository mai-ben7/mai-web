"use client";
import * as React from "react";

export function useScrollSpy(
  ids: string[],
  { rootMargin = "-35% 0px -55% 0px" } = {}
) {
  const [active, setActive] = React.useState<string | null>(null);

  React.useEffect(() => {
    const sections = ids
      .map((id) => {
        const el = document.getElementById(id);
        return el ? { id, el } : null;
      })
      .filter(Boolean) as { id: string; el: Element }[];

    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive((e.target as HTMLElement).id);
        });
      },
      { rootMargin, threshold: 0.1 }
    );

    sections.forEach(({ el }) => io.observe(el));
    return () => io.disconnect();
  }, [ids, rootMargin]);

  return active;
}
