import { useState, useEffect } from "react";
import type { RetroComponentProps } from "~/types";

interface VisitorCounterProps extends RetroComponentProps {
  initialCount?: number;
  increment?: boolean;
  label?: string;
}

export const VisitorCounter = ({
  initialCount = 999999,
  increment = true,
  label = "👽 Visitors:",
  className = "",
}: VisitorCounterProps) => {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    if (!increment) return;

    const interval = setInterval(
      () => {
        setCount(prev => prev + Math.floor(Math.random() * 3) + 1);
      },
      5000 + Math.random() * 5000
    ); // Random interval between 5-10 seconds

    return () => clearInterval(interval);
  }, [increment]);

  return (
    <div className={`visitor-counter ${className}`}>
      {label} <span className="blink-fast">{count.toLocaleString()}</span>
    </div>
  );
};
