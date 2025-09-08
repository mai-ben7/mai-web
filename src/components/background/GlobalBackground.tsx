"use client";
import React from "react";

export default function GlobalBackground() {
  return (
    <>
      <div
        aria-hidden
        className="fixed inset-0 -z-50 pointer-events-none"
        style={{
          background:
            `linear-gradient(180deg,
              var(--bg-stop-1) 0%,
              var(--bg-stop-2) 40%,
              var(--bg-stop-3) 100%)`,
          transition: "none",
        }}
      />

      <div aria-hidden className="fixed inset-0 -z-40 pointer-events-none" style={{ contain: "paint", isolation: "isolate" }}>
        <div className="orb" style={{
          left: "var(--o1-x)", top: "var(--o1-y)",
          width: "var(--o1-size)", height: "var(--o1-size)",
          background: "radial-gradient(closest-side, var(--o1-color) 0%, transparent 70%)",
          filter: "blur(24px)", opacity: "var(--o1-alpha)",
          transition: "none", position: "absolute", borderRadius: "9999px"
        }} />
        <div className="orb" style={{
          left: "var(--o2-x)", top: "var(--o2-y)",
          width: "var(--o2-size)", height: "var(--o2-size)",
          background: "radial-gradient(closest-side, var(--o2-color) 0%, transparent 70%)",
          filter: "blur(28px)", opacity: "var(--o2-alpha)",
          transition: "none", position: "absolute", borderRadius: "9999px"
        }} />
        <div className="orb" style={{
          left: "var(--o3-x)", top: "var(--o3-y)",
          width: "var(--o3-size)", height: "var(--o3-size)",
          background: "radial-gradient(closest-side, var(--o3-color) 0%, transparent 70%)",
          filter: "blur(30px)", opacity: "var(--o3-alpha)",
          transition: "none", position: "absolute", borderRadius: "9999px"
        }} />
      </div>
    </>
  );
}


