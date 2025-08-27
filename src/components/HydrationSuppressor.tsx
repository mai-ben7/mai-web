"use client";

import { useEffect, useState } from 'react';

export default function HydrationSuppressor() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null;
  }

  return null;
}
