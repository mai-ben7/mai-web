import ServicesGrid from "@/components/advanced/ServicesGrid";
import { SERVICES } from "@/data/services";

export default function AdvancedSection() {
  return (
    <ServicesGrid
      items={SERVICES}
      eyebrow="מה אני מציעה"
      heading="שירותים שנבנו במיוחד עבור העסק שלך"
    />
  );
}
