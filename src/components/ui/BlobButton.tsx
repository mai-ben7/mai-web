"use client";

import React from "react";
import "./blob-button.css";

interface BlobButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  href?: string;
  as?: "button" | "a";
}

const BlobButton: React.FC<BlobButtonProps> = ({ 
  children, 
  onClick, 
  className = "", 
  variant = "primary",
  href,
  as = "button",
  ...props 
}) => {
  const Component = as === "a" ? "a" : "button";
  
  const baseProps = {
    className: `blob-btn ${className}`,
    onClick,
    suppressHydrationWarning: true,
    ...props
  };

  const linkProps = href ? { href, ...baseProps } : baseProps;

  return (
    <Component {...linkProps}>
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
