import type { RetroComponentProps } from "~/types";

interface RetroProgressBarProps extends RetroComponentProps {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  animated?: boolean;
  color?: "green" | "cyan" | "yellow" | "red" | "rainbow";
}

export const RetroProgressBar = ({
  value,
  max = 100,
  label,
  showPercentage = true,
  animated = true,
  color = "green",
  className = "",
}: RetroProgressBarProps) => {
  const percentage = Math.min((value / max) * 100, 100);

  const colorClasses = {
    green: "bg-neon-green",
    cyan: "bg-neon-cyan",
    yellow: "bg-neon-yellow",
    red: "bg-warning-red",
    rainbow: "bg-gradient-to-r from-neon-green via-neon-cyan to-neon-pink",
  }[color];

  return (
    <div className={`space-y-2 ${className}`}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center text-sm terminal-text">
          {label && <span>{label}</span>}
          {showPercentage && <span>{percentage.toFixed(0)}%</span>}
        </div>
      )}
      <div className="retro-progress">
        <div
          className={`retro-progress-bar ${colorClasses} ${animated ? "" : "[&::after]:hidden"}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
