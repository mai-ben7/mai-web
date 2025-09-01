import ParallaxSections, { ParallaxSlide } from "./ParallaxSections";

const SLIDES: ParallaxSlide[] = [
  { id: "s1", title: "SEO",        src: "/images/services/seo-graph.jpg" },
  { id: "s2", title: "Design",     src: "/images/services/design-flatlay.jpg" },
  { id: "s3", title: "Animation",  src: "/images/services/motion-lights.jpg" },
  { id: "s4", title: "Performance",src: "/images/services/perf-network.jpg" },
];

export default function ParallaxDemo() {
  return (
    <section className="relative min-h-screen">
      {/* If you want nested scroll (Pen-style), make the parent relative with a fixed height. */}
      <div className="relative h-[100vh]">
        <ParallaxSections slides={SLIDES} usePageScroll={false} />
      </div>
    </section>
  );
}
