import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { spotifyService } from "~/services/spotify";
import { BlinkingText } from "~/components/retro/BlinkingText";
import { RetroButton } from "~/components/retro/RetroButton";
import { UFOCheckbox } from "~/components/retro/UFOCheckbox";

interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string;
  images: Array<{ url: string }>;
  tracks: {
    total: number;
  };
  public: boolean;
}

interface SpotifyUser {
  id: string;
  display_name: string;
  email: string;
  images: Array<{ url: string }>;
}

export const meta = () => [
  { title: "🎵 Cosmic Playlist Selection - PeloJams" },
];

export default function Playlists() {
  const navigate = useNavigate();
  const [user, setUser] = useState<SpotifyUser | null>(null);
  const [playlists, setPlaylists] = useState<SpotifyPlaylist[]>([]);
  const [selectedPlaylists, setSelectedPlaylists] = useState<Set<string>>(
    new Set()
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializePage = async () => {
      try {
        // Check authentication
        if (!spotifyService.isAuthenticated()) {
          navigate("/");
          return;
        }

        // Get stored user data
        const storedUser = localStorage.getItem("spotify_user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }

        // Get access token
        const tokens = spotifyService.getStoredTokens();
        if (!tokens) {
          navigate("/");
          return;
        }

        // Fetch playlists
        const userPlaylists = await spotifyService.getUserPlaylists(
          tokens.access_token
        );
        setPlaylists(userPlaylists);
        setLoading(false);
      } catch (err) {
        console.error("Error loading playlists:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load playlists"
        );
        setLoading(false);
      }
    };

    initializePage();
  }, [navigate]);

  const handlePlaylistToggle = (playlistId: string) => {
    const newSelected = new Set(selectedPlaylists);
    if (newSelected.has(playlistId)) {
      newSelected.delete(playlistId);
    } else {
      newSelected.add(playlistId);
    }
    setSelectedPlaylists(newSelected);
  };

  const handleSelectAll = () => {
    setSelectedPlaylists(new Set(playlists.map(p => p.id)));
  };

  const handleSelectNone = () => {
    setSelectedPlaylists(new Set());
  };

  const handleProceed = () => {
    if (selectedPlaylists.size === 0) {
      alert(
        "Please select at least one playlist to continue your cosmic journey!"
      );
      return;
    }

    // Navigate to BPM processing with selected playlists as URL params
    const playlistParams = Array.from(selectedPlaylists).join(",");
    navigate(`/bpm-processing?playlists=${playlistParams}`);
  };

  const handleLogout = () => {
    spotifyService.logout();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="stars-background min-h-screen flex items-center justify-center">
        <div className="retro-window max-w-md mx-auto">
          <div className="retro-window-header">
            <span>🛸 LOADING COSMIC PLAYLISTS 🛸</span>
          </div>
          <div className="retro-window-content text-center">
            <div className="text-6xl mb-4 text-neon-cyan blink">🔄</div>
            <div className="terminal-text">
              <BlinkingText speed="fast">
                Scanning your music library from space...
              </BlinkingText>
            </div>
            <div className="retro-progress-bar mt-4">
              <div className="retro-progress-fill animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="stars-background min-h-screen flex items-center justify-center">
        <div className="retro-window max-w-md mx-auto">
          <div className="retro-window-header">
            <span>❌ TRANSMISSION ERROR ❌</span>
          </div>
          <div className="retro-window-content text-center">
            <div className="text-6xl mb-4 text-warning-red blink-fast">⚠️</div>
            <div className="terminal-text text-warning-red mb-4">{error}</div>
            <RetroButton onClick={() => navigate("/")} variant="alert">
              Return to Base
            </RetroButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="stars-background min-h-screen">
      {/* Header */}
      <header className="cosmic-border-b p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="text-2xl">🎧</div>
            <div>
              <div className="terminal-text font-bold text-neon-green">
                COSMIC CONNECTION ESTABLISHED
              </div>
              <div className="text-sm">
                Welcome, {user?.display_name || "Space Traveler"} 👋
              </div>
            </div>
          </div>
          <RetroButton
            onClick={handleLogout}
            variant="secondary"
            className="text-sm"
          >
            Disconnect
          </RetroButton>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold rainbow-text mb-4">
            SELECT YOUR COSMIC PLAYLISTS
          </h1>
          <div className="terminal-text text-lg">
            <BlinkingText speed="medium" color="var(--neon-cyan)">
              ►
            </BlinkingText>{" "}
            Choose which playlists to include in your workout algorithm
          </div>
        </div>

        {/* Selection Controls */}
        <div className="retro-window max-w-2xl mx-auto mb-8">
          <div className="retro-window-header">
            <span>🎛️ PLAYLIST CONTROL PANEL 🎛️</span>
          </div>
          <div className="retro-window-content">
            <div className="flex justify-between items-center mb-4">
              <div className="terminal-text">
                <span className="text-neon-green">
                  {selectedPlaylists.size}
                </span>{" "}
                of <span className="text-neon-cyan">{playlists.length}</span>{" "}
                playlists selected
              </div>
              <div className="flex gap-2">
                <RetroButton
                  onClick={handleSelectAll}
                  variant="secondary"
                  className="text-sm"
                >
                  Select All
                </RetroButton>
                <RetroButton
                  onClick={handleSelectNone}
                  variant="secondary"
                  className="text-sm"
                >
                  Clear All
                </RetroButton>
              </div>
            </div>

            <div className="text-center">
              <RetroButton
                onClick={handleProceed}
                variant="cosmic"
                glow
                disabled={selectedPlaylists.size === 0}
                className="text-lg px-8 py-3"
              >
                🛸 ANALYZE BPM & CONTINUE 🛸
              </RetroButton>
            </div>
          </div>
        </div>

        {/* Playlists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {playlists.map(playlist => (
            <div key={playlist.id} className="retro-window">
              <div className="retro-window-header">
                <UFOCheckbox
                  checked={selectedPlaylists.has(playlist.id)}
                  onChange={() => handlePlaylistToggle(playlist.id)}
                  label={playlist.name}
                />
              </div>
              <div className="retro-window-content">
                <div className="flex items-start gap-3">
                  <div className="w-16 h-16 bg-retro-gray cosmic-border flex items-center justify-center text-2xl">
                    {playlist.images[0] ? (
                      <img
                        src={playlist.images[0].url}
                        alt={playlist.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      "🎵"
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="terminal-text font-bold text-sm mb-1 truncate">
                      {playlist.name}
                    </div>
                    <div className="text-xs text-neon-cyan mb-2">
                      {playlist.tracks.total} tracks
                    </div>
                    {playlist.description && (
                      <div className="text-xs text-gray-400 line-clamp-2">
                        {playlist.description}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {playlists.length === 0 && (
          <div className="text-center">
            <div className="retro-window max-w-md mx-auto">
              <div className="retro-window-header">
                <span>🤔 NO PLAYLISTS DETECTED</span>
              </div>
              <div className="retro-window-content text-center">
                <div className="text-4xl mb-4">📂</div>
                <div className="terminal-text mb-4">
                  No playlists found in your cosmic music library!
                </div>
                <div className="text-sm text-gray-400">
                  Create some playlists in Spotify first, then return to begin
                  your journey.
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
