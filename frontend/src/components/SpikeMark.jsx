import React from "react";

/**
 * Anthropic 4-spoke radial-spike mark glyph.
 * Used as brand mark prefix in top navigation, callouts, and loader.
 */
function SpikeMark({ size = 20, className = "text-ink" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Anthropic Spike Mark"
    >
      {/* 4-spoke radial asterisk / starburst glyph */}
      <path d="M12 2L13.8 9.2L21 11L13.8 12.8L12 20L10.2 12.8L3 11L10.2 9.2L12 2Z" />
      <path d="M17.5 5.5L14.2 10.8L18.5 15.5L12.5 13.2L7.5 17.5L9.8 11.5L5.5 7.2L11.5 9.5L17.5 5.5Z" opacity="0.4" />
    </svg>
  );
}

export default SpikeMark;
