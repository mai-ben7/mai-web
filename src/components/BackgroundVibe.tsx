import * as React from "react";

type BackgroundVibeProps = {
  className?: string;
  variant?: "original" | "mirror";
  pinkSide?: "left" | "right";
};

// Reusable background matching the hero vibe: soft gradient with blurred orbs
export default function BackgroundVibe({ className = "", variant = "original", pinkSide }: BackgroundVibeProps) {
  const isMirror = variant === "mirror";
  const pinkOnLeft = pinkSide ? pinkSide === "left" : !isMirror; // default: original->left, mirror->right

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {/* Gradient */}
      <div
        className={
          isMirror
            ? "absolute inset-0 bg-gradient-to-br from-blue-200 via-blue-100 to-pink-200"
            : "absolute inset-0 bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200"
        }
      />

      {/* Orbs */}
      {isMirror ? (
        <>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-60" />
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-60" />
          {pinkOnLeft ? (
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-60" />
          ) : (
            <div className="absolute -bottom-8 right-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-60" />
          )}
        </>
      ) : (
        <>
          <div className="absolute top-0 -left-4 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-60" />
          <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-60" />
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-60" />
        </>
      )}
    </div>
  );
}


