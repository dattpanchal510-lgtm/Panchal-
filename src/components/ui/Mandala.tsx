import React from 'react';

export default function Mandala({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.2">
        <circle cx="100" cy="100" r="90" />
        <circle cx="100" cy="100" r="70" />
        <circle cx="100" cy="100" r="50" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <g key={angle} transform={`rotate(${angle} 100 100)`}>
            <path d="M100 10 Q110 30 100 50 Q90 30 100 10" />
            <path d="M100 50 Q120 70 100 90 Q80 70 100 50" />
            <rect x="95" y="95" width="10" height="10" transform="rotate(45 100 100)" />
          </g>
        ))}
        {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle) => (
          <path
            key={angle}
            d="M100 100 L100 20"
            transform={`rotate(${angle} 100 100)`}
            strokeDasharray="2 2"
          />
        ))}
      </g>
    </svg>
  );
}
