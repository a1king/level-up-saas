import React from "react";

export function Cover({ children, className = "" }) {
  return (
    <span
      className={`relative inline-block ${className}`}
      style={{
        background: "linear-gradient(to bottom, #06b6d4, #3b82f6)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {children}
    </span>
  );
}
