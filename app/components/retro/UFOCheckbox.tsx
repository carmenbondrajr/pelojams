import type { InputHTMLAttributes } from "react";
import type { RetroComponentProps } from "~/types";

interface UFOCheckboxProps
  extends RetroComponentProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  description?: string;
}

export const UFOCheckbox = ({
  label,
  description,
  className = "",
  ...props
}: UFOCheckboxProps) => {
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className="relative">
        <input
          type="checkbox"
          className="ufo-checkbox opacity-0 absolute inset-0 z-10 cursor-pointer"
          {...props}
        />
        <div className="w-8 h-8 cosmic-border bg-deep-space flex items-center justify-center text-xl">
          🛸
        </div>
      </div>
      {(label || description) && (
        <div className="flex-1">
          {label && (
            <div className="terminal-text font-bold text-neon-green">
              {label}
            </div>
          )}
          {description && (
            <div className="text-sm text-neon-cyan">{description}</div>
          )}
        </div>
      )}
    </div>
  );
};
