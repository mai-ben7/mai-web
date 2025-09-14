"use client";

import ServicesGrid from "@/components/advanced/ServicesGrid";
import { SERVICES } from "@/data/services";
import { useI18n } from "@/components/i18n/I18nProvider";

export default function AdvancedSection() {
  const { t } = useI18n();
  
  return (
    <ServicesGrid
      items={SERVICES}
      eyebrow={t("services.eyebrow")}
      heading={t("services.title")}
    />
  );
}
