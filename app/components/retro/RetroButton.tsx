import type { ButtonHTMLAttributes } from "react";
import type { RetroComponentProps } from "~/types";

interface RetroButtonProps
  extends RetroComponentProps,
    ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "cosmic" | "alert";
  glow?: boolean;
  float?: boolean;
}

export const RetroButton = ({
  children,
  variant = "primary",
  glow = false,
  float = false,
  className = "",
  ...props
}: RetroButtonProps) => {
  const variantClasses = {
    primary: "retro-button",
    secondary: "retro-button bg-retro-gray",
    cosmic: "retro-button cosmic-border bg-space-purple",
    alert: "retro-button bg-warning-red blink",
  }[variant];

  const additionalClasses = [
    glow && "neon-glow",
    float && "float-element",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={`${variantClasses} ${additionalClasses}`} {...props}>
      {children}
    </button>
  );
};
