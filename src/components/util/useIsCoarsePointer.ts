"use client";
import * as React from "react";

export function useIsCoarsePointer() {
  const [coarse, setCoarse] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const set = () => setCoarse(mq.matches);
    set(); mq.addEventListener?.("change", set);
    return () => mq.removeEventListener?.("change", set);
  }, []);
  return coarse;
}
