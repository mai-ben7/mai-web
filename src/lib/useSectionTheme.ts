"use client";
import React from "react";

export function useSectionTheme() {
  React.useEffect(() => {
    const root = document.documentElement;

    const apply = (el: HTMLElement) => {
      const ds = el.dataset as DOMStringMap;
      if (ds.stop1) root.style.setProperty('--bg-stop-1', ds.stop1);
      if (ds.stop2) root.style.setProperty('--bg-stop-2', ds.stop2);
      if (ds.stop3) root.style.setProperty('--bg-stop-3', ds.stop3);

      if (ds.o1x) root.style.setProperty('--o1-x', ds.o1x);
      if (ds.o1y) root.style.setProperty('--o1-y', ds.o1y);
      if (ds.o1size) root.style.setProperty('--o1-size', ds.o1size);
      if (ds.o1color) root.style.setProperty('--o1-color', ds.o1color);
      if (ds.o1alpha) root.style.setProperty('--o1-alpha', ds.o1alpha);

      if (ds.o2x) root.style.setProperty('--o2-x', ds.o2x);
      if (ds.o2y) root.style.setProperty('--o2-y', ds.o2y);
      if (ds.o2size) root.style.setProperty('--o2-size', ds.o2size);
      if (ds.o2color) root.style.setProperty('--o2-color', ds.o2color);
      if (ds.o2alpha) root.style.setProperty('--o2-alpha', ds.o2alpha);

      if (ds.o3x) root.style.setProperty('--o3-x', ds.o3x);
      if (ds.o3y) root.style.setProperty('--o3-y', ds.o3y);
      if (ds.o3size) root.style.setProperty('--o3-size', ds.o3size);
      if (ds.o3color) root.style.setProperty('--o3-color', ds.o3color);
      if (ds.o3alpha) root.style.setProperty('--o3-alpha', ds.o3alpha);
    };

    const io = new IntersectionObserver((entries) => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target) apply(visible.target as HTMLElement);
    }, { rootMargin: "0px 0px -40% 0px", threshold: [0.99] });

    document.querySelectorAll<HTMLElement>('[data-theme]').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}


