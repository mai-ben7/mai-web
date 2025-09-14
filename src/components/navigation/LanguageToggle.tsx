"use client";
import { useI18n } from "@/components/i18n/I18nProvider";

export default function LanguageToggle({ className = "" }: { className?: string }) {
  const { locale, toggle } = useI18n();

  const isHE = locale === "he";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle language"
      aria-pressed={isHE}
      className={[
        "relative inline-flex items-center h-9 w-[86px] rounded-full",
        "bg-white/10 border border-white/20 text-white",
        "transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
        className
      ].join(" ")}
    >
      {/* pill */}
      <span
        className={[
          "absolute top-0.5 h-[30px] w-[40px] rounded-full bg-white/80 text-black",
          "grid place-items-center text-xs font-semibold transition-transform",
          isHE ? "translate-x-1" : "translate-x-[44px]"
        ].join(" ")}
      >
        {isHE ? "HE" : "EN"}
      </span>
      {/* labels */}
      <span className="flex-1 text-xs font-semibold ps-3 pe-2 opacity-75">HE</span>
      <span className="flex-1 text-xs font-semibold pe-3 ps-2 text-right opacity-75">EN</span>
    </button>
  );
}
