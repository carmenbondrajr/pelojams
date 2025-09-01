import type { RetroComponentProps } from "~/types";

interface MarqueeMessageProps extends RetroComponentProps {
  direction?: "left" | "right";
  speed?: number;
}

export const MarqueeMessage = ({
  children,
  direction = "left",
  speed = 20,
  className = "",
}: MarqueeMessageProps) => {
  const speedClass =
    speed <= 10 ? "marquee-fast" : speed >= 30 ? "marquee-slow" : "";

  return (
    <div className={`marquee-container ${speedClass} ${className}`}>
      <div
        className="marquee-content"
        style={{
          animationDirection: direction === "right" ? "reverse" : "normal",
          animationDuration: `${speed}s`,
        }}
      >
        {children}
      </div>
    </div>
  );
};
