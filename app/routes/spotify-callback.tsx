import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { spotifyService } from "~/services/spotify";
import { BlinkingText } from "~/components/retro/BlinkingText";

export const meta = () => [{ title: "🛸 Spotify Authentication - PeloJams" }];

export default function SpotifyCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("Establishing cosmic connection...");

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get("code");
        const error = searchParams.get("error");

        if (error) {
          throw new Error(`Spotify authorization failed: ${error}`);
        }

        if (!code) {
          throw new Error("No authorization code received from Spotify");
        }

        setMessage("Exchanging cosmic frequencies...");

        // Get stored code verifier for PKCE
        const codeVerifier = localStorage.getItem('spotify_code_verifier');
        if (!codeVerifier) {
          throw new Error('Code verifier not found - authentication flow corrupted');
        }

        // Exchange code for tokens using PKCE
        const tokens = await spotifyService.getAccessToken(code, codeVerifier);
        spotifyService.storeTokens(tokens);

        // Clean up code verifier
        localStorage.removeItem('spotify_code_verifier');

        setMessage("Retrieving user profile from the mothership...");

        // Get user profile and store it
        const user = await spotifyService.getCurrentUser(tokens.access_token);
        localStorage.setItem("spotify_user", JSON.stringify(user));

        setStatus("success");
        setMessage(
          "🛸 CONNECTION ESTABLISHED! Redirecting to mission control..."
        );

        // Redirect to playlists page after success
        setTimeout(() => {
          navigate("/playlists");
        }, 2000);
      } catch (error) {
        console.error("Spotify authentication error:", error);
        setStatus("error");
        setMessage(
          error instanceof Error ? error.message : "Unknown error occurred"
        );

        // Redirect to home after error
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    };

    handleCallback();
  }, [searchParams, navigate]);

  const getStatusIcon = () => {
    switch (status) {
      case "loading":
        return "🔄";
      case "success":
        return "✅";
      case "error":
        return "❌";
      default:
        return "🛸";
    }
  };

  const getStatusClass = () => {
    switch (status) {
      case "loading":
        return "text-neon-cyan blink";
      case "success":
        return "text-neon-green";
      case "error":
        return "text-warning-red blink-fast";
      default:
        return "text-neon-cyan";
    }
  };

  return (
    <div className="stars-background min-h-screen flex items-center justify-center">
      <div className="retro-window max-w-md mx-auto">
        <div className="retro-window-header">
          <span>📡 SPOTIFY TRANSMISSION STATUS 📡</span>
        </div>
        <div className="retro-window-content text-center">
          <div className="mb-6">
            <div className={`text-6xl mb-4 ${getStatusClass()}`}>
              {getStatusIcon()}
            </div>
            <div className="terminal-text text-lg">
              <BlinkingText speed="fast" color="var(--warning-red)">
                {status === "loading" ? "►" : status === "success" ? "✓" : "!"}
              </BlinkingText>{" "}
              {message}
            </div>
          </div>

          {status === "loading" && (
            <div className="cosmic-loading">
              <div className="terminal-text text-sm">
                Please wait while we sync with the cosmic frequencies...
              </div>
              <div className="mt-2">
                <div className="retro-progress-bar">
                  <div className="retro-progress-fill animate-pulse"></div>
                </div>
              </div>
            </div>
          )}

          {status === "error" && (
            <div className="mt-4">
              <div className="terminal-text text-sm text-warning-red">
                <BlinkingText speed="fast">
                  TRANSMISSION FAILED - REDIRECTING TO BASE...
                </BlinkingText>
              </div>
            </div>
          )}

          {status === "success" && (
            <div className="mt-4">
              <div className="terminal-text text-sm text-neon-green">
                Welcome to the cosmic cycling collective! 🚴‍♂️
              </div>
              <div className="mt-2 text-xs">
                <BlinkingText speed="medium">
                  Redirecting to playlist selection...
                </BlinkingText>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
