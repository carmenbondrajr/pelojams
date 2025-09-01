import type { RetroComponentProps } from "~/types";

interface RetroWindowProps extends RetroComponentProps {
  title?: string;
  icon?: string;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onClose?: () => void;
  showControls?: boolean;
}

export const RetroWindow = ({
  title = "Cosmic Window",
  icon = "📡",
  children,
  onMinimize,
  onMaximize,
  onClose,
  showControls = true,
  className = "",
}: RetroWindowProps) => {
  return (
    <div className={`retro-window ${className}`}>
      <div className="retro-window-header">
        <span>
          {icon} {title}
        </span>
        {showControls && (
          <div className="retro-window-controls">
            <button
              className="retro-window-control hover:bg-neon-yellow hover:text-cosmic-black"
              onClick={onMinimize}
              title="Minimize"
            >
              _
            </button>
            <button
              className="retro-window-control hover:bg-neon-yellow hover:text-cosmic-black"
              onClick={onMaximize}
              title="Maximize"
            >
              □
            </button>
            <button
              className="retro-window-control hover:bg-warning-red hover:text-blink-white"
              onClick={onClose}
              title="Close"
            >
              ×
            </button>
          </div>
        )}
      </div>
      <div className="retro-window-content">{children}</div>
    </div>
  );
};
