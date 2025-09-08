"use client";

import * as React from "react";
import { motion } from "framer-motion";

type RevealTextProps = {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  splitBy?: "word" | "char";
  stagger?: number; // seconds between items
  delay?: number;   // initial delay
  distance?: number; // translateY pixels
  direction?: "rtl" | "ltr" | "up" | "down"; // reveal direction
};

/**
 * RevealText splits the given text and reveals each part when scrolled into view.
 * Defaults to per-word reveal with subtle upward motion.
 */
export default function RevealText({
  children,
  as = "span",
  className = "",
  splitBy = "word",
  stagger = 0.05,
  delay = 0,
  distance = 14,
  direction = "rtl",
}: RevealTextProps) {
  const Tag = motion[as as keyof typeof motion] as any;

  const isString = typeof children === "string";

  const parts = React.useMemo(() => {
    if (!isString) return null;
    const text = children as string;
    if (splitBy === "char") return Array.from(text);
    // split by words but keep spaces so RTL spacing is preserved
    return text.split(/(\s+)/);
  }, [children, splitBy, isString]);

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  } as const;

  const hiddenOffset =
    direction === "rtl"
      ? { x: distance }
      : direction === "ltr"
      ? { x: -distance }
      : direction === "down"
      ? { y: -distance }
      : { y: distance };

  const item = {
    hidden: { opacity: 0, ...hiddenOffset },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  } as const;

  if (!isString) {
    return (
      <Tag
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        variants={container}
      >
        <motion.span variants={item} style={{ display: "inline-block" }}>
          {children}
        </motion.span>
      </Tag>
    );
  }

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      variants={container}
    >
      {parts!.map((p, i) => (
        <motion.span key={i} variants={item} style={{ display: "inline-block" }}>
          {p}
        </motion.span>
      ))}
    </Tag>
  );
}


