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
  checked,
  ...props
}: UFOCheckboxProps) => {
  return (
    <label
      className={`flex items-center space-x-3 cursor-pointer ${className}`}
    >
      <div className="flex items-center">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          {...props}
        />
        <div
          className={`w-6 h-6 cosmic-border flex items-center justify-center text-lg font-bold transition-all ${
            checked
              ? "bg-neon-green text-cosmic-black"
              : "bg-deep-space text-neon-cyan"
          }`}
        >
          {checked ? "×" : ""}
        </div>
      </div>
      {(label || description) && (
        <div className="flex-1">
          {label && (
            <div
              className={`terminal-text font-bold transition-colors ${
                checked ? "text-neon-green" : "text-retro-gray"
              }`}
            >
              {label}
            </div>
          )}
          {description && (
            <div className="text-sm text-neon-cyan">{description}</div>
          )}
        </div>
      )}
    </label>
  );
};
