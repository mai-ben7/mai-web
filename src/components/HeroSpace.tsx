"use client";
import React, { useRef, useEffect, useMemo, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Html, OrbitControls, Environment, Float } from "@react-three/drei";
import { useScroll, useMotionValueEvent, useMotionValue, useReducedMotion } from "framer-motion";
import * as THREE from "three";

type SpaceSceneProps = {
  scrollProgress: number;    // 0..1 progress for the hero section
  parallax: { x: number; y: number }; // -1..1 normalized pointer
  reduced: boolean;
};

function Planet() {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  
  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * 0.1;
    if (hovered) {
      ref.current.rotation.x += dt * 0.2;
    }
  });
  
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh 
        ref={ref} 
        castShadow 
        position={[0.3, -0.1, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <icosahedronGeometry args={[0.7, 3]} />
        <meshStandardMaterial 
          roughness={0.3} 
          metalness={0.2} 
          color={hovered ? "#4f9eff" : "#7aa3ff"}
          emissive={hovered ? "#1a4b8c" : "#1a3b6c"}
          emissiveIntensity={hovered ? 0.3 : 0.1}
        />
      </mesh>
    </Float>
  );
}

function AsteroidBelt() {
  const count = 50;
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 2 + Math.random() * 1;
      const height = (Math.random() - 0.5) * 0.5;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = height;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return positions;
  }, []);

  const ref = useRef<THREE.Points>(null!);
  
  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#9fb3ff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function Nebula() {
  const count = 200;
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, []);

  const colors = useMemo(() => {
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const color = new THREE.Color();
      color.setHSL(Math.random() * 0.1 + 0.6, 0.8, 0.5 + Math.random() * 0.3);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    return colors;
  }, []);

  const ref = useRef<THREE.Points>(null!);
  
  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * 0.02;
    ref.current.rotation.x += dt * 0.01;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Rocks() {
  const count = 12;
  const items = useMemo(() => new Array(count).fill(0).map((_, i) => ({
    pos: [
      (Math.random() - 0.5) * 6,
      (Math.random() - 0.5) * 3,
      -1 - Math.random() * 4
    ] as [number, number, number],
    scale: 0.1 + Math.random() * 0.15,
    rotation: [
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    ] as [number, number, number]
  })), []);
  
  return (
    <group>
      {items.map((it, i) => (
        <Float key={i} speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh position={it.pos} scale={it.scale} rotation={it.rotation}>
            <icosahedronGeometry args={[1, 1]} />
            <meshStandardMaterial 
              color="#9fb3ff" 
              roughness={0.9} 
              metalness={0.1}
              transparent
              opacity={0.7}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function SpaceScene({ scrollProgress, parallax, reduced }: SpaceSceneProps) {
  const cam = useRef<THREE.PerspectiveCamera>(null!);

  // Map scroll to camera Z (fly forward), text fade, and planet scale
  const startZ = 8;
  const endZ = 3;
  const z = startZ + (endZ - startZ) * scrollProgress;

  // Parallax: small camera tilt; soften
  const targetYaw = parallax.x * 0.15;   // left-right
  const targetPitch = parallax.y * 0.1; // up-down
  const current = useRef({ yaw: 0, pitch: 0 });

  useFrame(() => {
    if (!cam.current) return;
    // ease camera rotation toward target
    current.current.yaw += (targetYaw - current.current.yaw) * 0.05;
    current.current.pitch += (targetPitch - current.current.pitch) * 0.05;
    cam.current.position.set(0, 0, z);
    cam.current.rotation.set(current.current.pitch, current.current.yaw, 0);
  });

  return (
    <>
      {/* Camera is the default; just ensure fov is sane */}
      <perspectiveCamera ref={cam} fov={45} near={0.1} far={100} position={[0,0,startZ]} />
      
      {/* Enhanced Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[2, 2, 3]} intensity={1.2} castShadow />
      <directionalLight position={[-2, -1, -2]} intensity={0.4} />
      <pointLight position={[0, 2, 2]} intensity={0.8} color="#4f9eff" />
      <pointLight position={[2, -2, -2]} intensity={0.6} color="#ff6b9d" />

      {/* Enhanced Stars */}
      <Stars
        radius={80}
        depth={60}
        count={reduced ? 3000 : 8000}
        factor={4}
        fade
        speed={0.3}
        saturation={0.8}
      />

      {/* Nebula Effect */}
      <Nebula />

      {/* Main Scene Group */}
      <group position={[0, 0, -0.5]}>
        <Planet />
        <Rocks />
        <AsteroidBelt />
      </group>

      {/* Optional: ensure screen-reader users don't get noise */}
      <Html transform={false} wrapperClass="sr-only">
        <div aria-hidden>Decorative 3D space scene with interactive elements</div>
      </Html>
    </>
  );
}

// Fallback component for when 3D fails
function SpaceFallback() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.2),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(79,158,255,0.2),transparent_50%)]" />
    </div>
  );
}

export default function HeroSpace({
  children,
  className = "",
}: {
  children?: React.ReactNode; // your existing headline/CTA
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: typeof window !== "undefined" ? undefined : undefined,
    target: containerRef,
    offset: ["start start", "end start"], // 0..1 while hero is in view
  });

  const progress = useMotionValue(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    // clamp & smooth a bit
    const clamped = Math.max(0, Math.min(1, v));
    progress.set(clamped);
  });

  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const reduced = useReducedMotion();
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      if (reduced || "ontouchstart" in window) return;
      const rect = el.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;  // -1..1
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1; // -1..1
      setParallax({ x: nx, y: ny });
    };
    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, [reduced]);

  // Derive a plain number for R3F
  const [p, setP] = useState(0);
  useEffect(() => {
    const unsub = progress.on("change", (v) => setP(v));
    return () => unsub();
  }, [progress]);

  // Error boundary for 3D scene
  if (hasError) {
    return (
      <section
        ref={containerRef}
        className={`relative isolate min-h-[100svh] overflow-hidden ${className}`}
        aria-label="Hero section"
      >
        <SpaceFallback />
        <div className="relative z-10 flex h-[100svh] items-center justify-center px-6">
          <div className="max-w-4xl text-center">
            {children}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className={`relative isolate min-h-[100svh] overflow-hidden ${className}`}
      aria-label="Hero section"
    >
      {/* 3D background */}
      <div className="absolute inset-0 -z-10">
        <Suspense fallback={<SpaceFallback />}>
          <ErrorBoundary onError={() => setHasError(true)}>
            <Canvas 
              dpr={[1, 2]} 
              shadows
              camera={{ fov: 45, near: 0.1, far: 100 }}
              gl={{ 
                antialias: true, 
                alpha: true,
                powerPreference: "high-performance"
              }}
            >
              <SpaceScene scrollProgress={p} parallax={parallax} reduced={!!reduced} />
            </Canvas>
          </ErrorBoundary>
        </Suspense>
      </div>

      {/* Content: place your existing hero UI here */}
      <div className="relative z-10 flex h-[100svh] items-center justify-center px-6">
        <div className="max-w-4xl text-center">
          {children ?? (
            <>
              {/* Default content if no children are passed */}
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
                Build with motion.
              </h1>
              <p className="mt-4 text-white/80 text-lg">
                Scroll to fly through space. Move your cursor to feel the depth.
              </p>
              <div className="mt-8 flex items-center justify-center gap-4">
                <a href="#start" className="rounded-xl bg-white/10 px-6 py-3 text-white backdrop-blur-md ring-1 ring-white/20 hover:bg-white/20 transition">
                  Get started
                </a>
                <a href="#learn" className="rounded-xl bg-white px-6 py-3 text-black hover:bg-white/90 transition">
                  Learn more
                </a>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Enhanced gradient overlays to help text contrast */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/80 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/60 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black/40 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black/40 to-transparent" />
    </section>
  );
}

// Simple error boundary component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; onError: () => void },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; onError: () => void }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    if (this.state.hasError) {
      return <SpaceFallback />;
    }

    return this.props.children;
  }
}
