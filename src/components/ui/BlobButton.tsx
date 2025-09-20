"use client";

import React from "react";
import "./blob-button.css";

interface BlobButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  href?: string;
  onClick?: () => void;
  className?: string;
}

const BlobButton: React.FC<BlobButtonProps> = ({ 
  children, 
  onClick, 
  className = "", 
  variant = "primary",
  href,
}) => {
  const Component = href ? "a" : "button";
  
  const baseProps = href 
    ? { href, className: `blob-btn ${className}`, suppressHydrationWarning: true }
    : { onClick, className: `blob-btn ${className}`, suppressHydrationWarning: true };

  return (
    <Component {...baseProps}>
      {children}
      <span className="blob-btn__inner">
        <span className="blob-btn__blobs">
          <span className="blob-btn__blob"></span>
          <span className="blob-btn__blob"></span>
          <span className="blob-btn__blob"></span>
          <span className="blob-btn__blob"></span>
        </span>
      </span>
    </Component>
  );
};

export default BlobButton;
