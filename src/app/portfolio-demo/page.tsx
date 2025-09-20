import PortfolioHero from "@/components/hero/PortfolioHero";

export default function PortfolioDemoPage() {
  return (
    <main>
      <PortfolioHero
        name="מאי בן שבע"
        title="Web Developer • Creative Engineer"
        subtitle="I craft advanced, animated sites for brands that need performance + polish."
        avatarSrc="/images/portrait.jpg"
        ctaPrimaryHref="#work"
        ctaSecondaryHref="#contact"
      />
      
      {/* Demo content sections */}
      <section id="work" className="py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Work Section</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            This is where your portfolio work would be displayed. The hero above demonstrates the editorial design with portrait integration.
          </p>
        </div>
      </section>
      
      <section id="contact" className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Contact Section</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            This is where your contact information would be displayed. The hero above demonstrates smooth scrolling to this section.
          </p>
        </div>
      </section>
    </main>
  );
}
