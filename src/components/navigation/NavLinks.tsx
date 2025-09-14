"use client";
import { useI18n } from "@/components/i18n/I18nProvider";
import Link from "next/link";

export default function NavLinks() {
  const { t } = useI18n();
  return (
    <ul className="flex gap-5">
      <li><Link href="/">{t("nav.home")}</Link></li>
      <li><Link href="/projects">{t("nav.projects")}</Link></li>
      <li><Link href="/services">{t("nav.services")}</Link></li>
      <li><Link href="/about">{t("nav.about")}</Link></li>
      <li><Link href="/contact">{t("nav.contact")}</Link></li>
    </ul>
  );
}
