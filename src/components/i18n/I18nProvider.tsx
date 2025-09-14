"use client";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import en from "@/locales/en.json";
import he from "@/locales/he.json";
import { useRouter } from "next/navigation";

type Locale = "en" | "he";
type Dict = typeof en;

type Ctx = {
  locale: Locale;
  t: (path: string) => string;
  setLocale: (l: Locale) => void;
  toggle: () => void;
};

const I18nCtx = createContext<Ctx | null>(null);

// tiny "a.b.c" getter
function pick(obj: any, path: string): string {
  return path.split(".").reduce((o, k) => (o && k in o ? o[k] : ""), obj) || "";
}

export default function I18nProvider({
  initialLocale,
  children
}: {
  initialLocale: Locale;
  children: React.ReactNode;
}) {
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const router = useRouter();

  const dict: Dict = useMemo(() => (locale === "he" ? he : en), [locale]);

  // update <html dir/lang> on locale change (client side safety)
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("lang", locale);
    root.setAttribute("dir", locale === "he" ? "rtl" : "ltr");
  }, [locale]);

  // persist to cookie + refresh server components
  const apply = (l: Locale) => {
    setLocale(l);
    document.cookie = `lang=${l}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    router.refresh();
  };

  const value: Ctx = {
    locale,
    t: (path: string) => pick(dict, path),
    setLocale: apply,
    toggle: () => apply(locale === "he" ? "en" : "he")
  };

  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
