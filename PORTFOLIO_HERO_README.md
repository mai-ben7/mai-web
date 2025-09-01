# PortfolioHero Component

A premium, editorial-style hero section component for portfolio websites with portrait integration, 3D tilt effects, and responsive design.

## Features

- **Editorial Design**: Professional, agency-level appearance with layered layout
- **Portrait Integration**: Right-side portrait with 3D tilt frame and gradient rim lighting
- **Responsive Layout**: Mobile-first design that stacks portrait above copy on small screens
- **Accessibility**: Respects `prefers-reduced-motion` and includes proper ARIA labels
- **Performance**: Optimized with `next/image`, `priority` loading, and proper sizing
- **RTL Ready**: Designed to work with Hebrew/RTL layouts when wrapped with `dir="rtl"`

## Files Created

```
src/
├── components/
│   ├── hero/
│   │   └── PortfolioHero.tsx          # Main hero component
│   └── util/
│       └── usePrefersReducedMotion.ts # Motion preference hook
├── app/
│   └── portfolio-demo/
│       └── page.tsx                   # Demo page
└── app/
    └── globals.css                    # Updated with required CSS variables
```

## Usage

### Basic Implementation

```tsx
import PortfolioHero from "@/components/hero/PortfolioHero";

export default function Home() {
  return (
    <main>
      <PortfolioHero
        name="Your Name"
        title="Web Developer • Creative Engineer"
        subtitle="I craft advanced, animated sites for brands that need performance + polish."
        avatarSrc="/images/your-portrait.jpg"
        ctaPrimaryHref="#work"
        ctaSecondaryHref="#contact"
      />
      {/* Other sections... */}
    </main>
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | `"Your Name"` | Your full name |
| `title` | `string` | `"Web Developer • Creative Engineer"` | Professional title/tagline |
| `subtitle` | `string` | `"I help brands ship advanced, animated websites that convert."` | Brief description |
| `avatarSrc` | `string` | `"/images/portrait.jpg"` | Path to your portrait image |
| `ctaPrimaryHref` | `string` | `"#work"` | Primary CTA link (e.g., to work section) |
| `ctaSecondaryHref` | `string` | `"#contact"` | Secondary CTA link (e.g., to contact section) |

## Features Explained

### 3D Tilt Effect
- Gentle mouse-tilt effect on the portrait frame
- Automatically disabled on touch devices and when `prefers-reduced-motion` is enabled
- Uses CSS transforms for smooth performance

### Portrait Frame
- Gradient rim lighting with conic gradient
- Glass-morphism caption overlay
- Subtle spotlight effect on the image
- Responsive sizing with proper aspect ratio

### Background Accents
- Soft gradient blobs for visual interest
- Non-intrusive background elements
- Proper layering with z-index management

### Scroll Cue
- Subtle scroll indicator at the bottom
- Animated arrow pointing downward
- Non-intrusive design element

## CSS Requirements

The component requires these CSS variables in your `globals.css`:

```css
:root {
  --brand-bg: #0f172a;
  --ease-emphasis: cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

@layer components {
  .btn-primary {
    @apply inline-flex items-center justify-center px-6 py-3 font-semibold bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25;
  }
}
```

## Demo Page

Visit `/portfolio-demo` to see the component in action with the existing `mai.jpg` portrait.

## Customization

### Colors
- Update `--brand-bg` for the main background color
- Modify the gradient values in the portrait frame
- Adjust button colors in the `.btn-primary` class

### Layout
- Change the grid layout by modifying the `md:grid-cols-2` class
- Adjust spacing with Tailwind's spacing utilities
- Modify the portrait aspect ratio by changing `aspect-[4/5]`

### Animations
- Adjust tilt sensitivity by changing the `max` value (currently 5 degrees)
- Modify animation durations in the CSS transitions
- Update the scroll cue animation timing

## Browser Support

- Modern browsers with CSS Grid and CSS Custom Properties support
- Gracefully degrades on older browsers
- Touch devices automatically disable tilt effects
- Respects user motion preferences

## Performance Notes

- Uses `next/image` with `priority` for optimal LCP
- Proper `sizes` attribute for responsive images
- CSS transforms for smooth animations
- Minimal JavaScript for interactivity

## Accessibility

- Proper ARIA labels and semantic HTML
- Respects `prefers-reduced-motion`
- Keyboard navigation support
- Screen reader friendly structure
- High contrast ratios maintained
