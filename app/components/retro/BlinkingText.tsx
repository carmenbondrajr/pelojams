import type { RetroComponentProps } from "~/types";

interface BlinkingTextProps extends RetroComponentProps {
  speed?: "slow" | "medium" | "fast";
  color?: string;
}

export const BlinkingText = ({
  children,
  speed = "medium",
  color = "currentColor",
  className = "",
}: BlinkingTextProps) => {
  const speedClass = {
    slow: "blink-slow",
    medium: "blink",
    fast: "blink-fast",
  }[speed];

  return (
    <span className={`${speedClass} ${className}`} style={{ color }}>
      {children}
    </span>
  );
};
