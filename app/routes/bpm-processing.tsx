import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { RetroWindow } from "~/components/retro/RetroWindow";
import { BlinkingText } from "~/components/retro/BlinkingText";
import { MarqueeMessage } from "~/components/retro/MarqueeMessage";
import { spotifyService } from "~/services/spotify";
import { getSongBPMService } from "~/services/getSongBPM";

interface ProcessingState {
  selectedPlaylists: string[];
  currentPlaylist: number;
  currentTrack: number;
  totalTracks: number;
  completedTracks: number;
  status: "initializing" | "processing" | "completed" | "error";
  error?: string;
}

interface PlaylistProgress {
  id: string;
  name: string;
  totalTracks: number;
  processedTracks: number;
  status: "pending" | "processing" | "completed" | "error";
}

export const BpmProcessing = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [processingState, setProcessingState] = useState<ProcessingState>({
    selectedPlaylists: [],
    currentPlaylist: 0,
    currentTrack: 0,
    totalTracks: 0,
    completedTracks: 0,
    status: "initializing",
  });
  const [playlistProgress, setPlaylistProgress] = useState<PlaylistProgress[]>(
    []
  );
  const [cosmicMessages] = useState([
    "Analyzing cosmic frequencies...",
    "Calculating temporal resonance...",
    "Decoding rhythmic DNA patterns...",
    "Aligning with universal beat grid...",
    "Processing sonic vibrations...",
    "Harmonizing with galactic tempo...",
    "Extracting beat essence...",
    "Calibrating rhythm sensors...",
    "Mapping tempo constellation...",
    "Synchronizing with cosmic pulse...",
  ]);

  const processPlaylists = useCallback(
    async (progress: PlaylistProgress[], accessToken: string) => {
      const processedData: Record<string, any> = {};

      for (
        let playlistIndex = 0;
        playlistIndex < progress.length;
        playlistIndex++
      ) {
        const playlist = progress[playlistIndex];

        if (playlist.status === "error") continue;

        // Update current playlist being processed
        setProcessingState(prev => ({
          ...prev,
          currentPlaylist: playlistIndex,
        }));
        setPlaylistProgress(prev =>
          prev.map((p, i) =>
            i === playlistIndex ? { ...p, status: "processing" } : p
          )
        );

        try {
          // Get actual tracks from Spotify
          const tracks = await spotifyService.getPlaylistTracks(
            accessToken,
            playlist.id
          );
          const limitedTracks = tracks.slice(0, playlist.totalTracks);

          processedData[playlist.id] = {
            name: playlist.name,
            tracks: [],
            bpmData: {},
          };

          // Process each track for BPM
          for (
            let trackIndex = 0;
            trackIndex < limitedTracks.length;
            trackIndex++
          ) {
            const track = limitedTracks[trackIndex];

            setProcessingState(prev => ({
              ...prev,
              currentTrack: trackIndex + 1,
              completedTracks: prev.completedTracks + 1,
            }));

            // Try to get BPM from GetSongBPM API first
            let bpm: number | null = null;

            if (getSongBPMService.isConfigured()) {
              try {
                bpm = await getSongBPMService.getBPMForTrack(
                  track.name,
                  track.artists[0]?.name || ""
                );
                console.log(`GetSongBPM result for "${track.name}":`, bpm);
              } catch (error) {
                console.error("GetSongBPM error for track:", track.name, error);
              }
            } else {
              console.log("GetSongBPM not configured, using Spotify fallback");
            }

            // Fallback to Spotify's audio features if GetSongBPM fails
            if (!bpm) {
              try {
                console.log(
                  `Fetching Spotify audio features for "${track.name}" (${track.id})`
                );
                const audioFeatures = await spotifyService.getAudioFeatures(
                  accessToken,
                  [track.id]
                );
                console.log("Audio features response:", audioFeatures);

                bpm = audioFeatures[track.id]?.tempo
                  ? Math.round(audioFeatures[track.id].tempo)
                  : null;

                console.log(`Spotify BPM result for "${track.name}":`, bpm);
              } catch (error) {
                console.error(
                  "Spotify audio features error for track:",
                  track.name,
                  error
                );
                // Continue processing even if this track fails
                bpm = null;
              }
            }

            // Final check - log if we still don't have BPM
            if (!bpm) {
              console.warn(
                `No BPM found for track: "${track.name}" by ${track.artists[0]?.name}`
              );
            }

            // Store processed track data
            const processedTrack = {
              ...track,
              bpm: bpm || null,
              source: bpm
                ? getSongBPMService.isConfigured()
                  ? "GetSongBPM"
                  : "Spotify"
                : "none",
            };

            processedData[playlist.id].tracks.push(processedTrack);
            processedData[playlist.id].bpmData[track.id] = bpm;

            setPlaylistProgress(prev =>
              prev.map((p, i) =>
                i === playlistIndex
                  ? { ...p, processedTracks: trackIndex + 1 }
                  : p
              )
            );

            // Small delay to avoid overwhelming APIs
            await new Promise(resolve => setTimeout(resolve, 300));
          }

          // Mark playlist as completed
          setPlaylistProgress(prev =>
            prev.map((p, i) =>
              i === playlistIndex ? { ...p, status: "completed" } : p
            )
          );
        } catch (error) {
          console.error(`Error processing playlist ${playlist.id}:`, error);
          setPlaylistProgress(prev =>
            prev.map((p, i) =>
              i === playlistIndex ? { ...p, status: "error" } : p
            )
          );
        }
      }

      // Store processed data for use in workout builder
      localStorage.setItem(
        "processed_playlists",
        JSON.stringify(processedData)
      );

      // Processing complete
      setProcessingState(prev => ({ ...prev, status: "completed" }));

      // Auto-redirect to workout builder after a moment
      setTimeout(() => {
        navigate("/workout-builder");
      }, 3000);
    },
    [navigate]
  );

  const initializeProcessing = useCallback(
    async (playlistIds: string[]) => {
      try {
        const tokens = spotifyService.getStoredTokens();
        if (!tokens) {
          navigate("/");
          return;
        }

        setProcessingState(prev => ({ ...prev, status: "initializing" }));

        // Fetch actual playlist details from Spotify
        const progress: PlaylistProgress[] = [];
        let totalTracks = 0;

        for (const playlistId of playlistIds) {
          try {
            // Get playlist details and tracks from Spotify
            const [playlist, tracks] = await Promise.all([
              spotifyService.getPlaylist(tokens.access_token, playlistId),
              spotifyService.getPlaylistTracks(tokens.access_token, playlistId),
            ]);

            // For demo purposes, we'll use a smaller subset of tracks to avoid API rate limits
            const trackCount = Math.min(tracks.length, 5);

            progress.push({
              id: playlistId,
              name: playlist.name,
              totalTracks: trackCount,
              processedTracks: 0,
              status: "pending",
            });
            totalTracks += trackCount;
          } catch (error) {
            console.error(
              `Error fetching tracks for playlist ${playlistId}:`,
              error
            );
            // Add with error status
            progress.push({
              id: playlistId,
              name: `Error: ${playlistId.slice(0, 8)}`,
              totalTracks: 0,
              processedTracks: 0,
              status: "error",
            });
          }
        }

        setPlaylistProgress(progress);
        setProcessingState(prev => ({
          ...prev,
          totalTracks,
          status: "processing",
        }));

        // Start actual BPM processing
        await processPlaylists(progress, tokens.access_token);
      } catch (error) {
        setProcessingState(prev => ({
          ...prev,
          status: "error",
          error: error instanceof Error ? error.message : "Unknown error",
        }));
      }
    },
    [navigate, processPlaylists]
  );

  useEffect(() => {
    const selectedIds = searchParams.get("playlists")?.split(",") || [];
    if (selectedIds.length === 0) {
      navigate("/playlists");
      return;
    }

    setProcessingState(prev => ({ ...prev, selectedPlaylists: selectedIds }));
    initializeProcessing(selectedIds);
  }, [searchParams, navigate, initializeProcessing]);

  const getStatusEmoji = (status: string) => {
    switch (status) {
      case "pending":
        return "⏳";
      case "processing":
        return "🛸";
      case "completed":
        return "✅";
      case "error":
        return "❌";
      default:
        return "🔮";
    }
  };

  const getCurrentMessage = () => {
    const messageIndex =
      processingState.completedTracks % cosmicMessages.length;
    return cosmicMessages[messageIndex];
  };

  const getOverallProgress = () => {
    if (processingState.totalTracks === 0) return 0;
    return Math.round(
      (processingState.completedTracks / processingState.totalTracks) * 100
    );
  };

  if (processingState.status === "error") {
    return (
      <div className="min-h-screen bg-deep-space text-neon-cyan p-8">
        <div className="max-w-4xl mx-auto">
          <RetroWindow title="COSMIC ERROR DETECTED" className="mb-8">
            <div className="p-8 text-center">
              <BlinkingText className="text-red-500 text-2xl mb-4">
                🚨 TRANSMISSION INTERRUPTED 🚨
              </BlinkingText>
              <p className="text-xl mb-4">Error: {processingState.error}</p>
              <button
                onClick={() => navigate("/playlists")}
                className="retro-button bg-neon-green text-cosmic-black px-6 py-2"
              >
                RETURN TO PLAYLIST SELECTION
              </button>
            </div>
          </RetroWindow>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-deep-space text-neon-cyan">
      <div className="starfield-bg fixed inset-0 opacity-30"></div>

      <div className="relative z-10 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <RetroWindow title="BPM ANALYSIS IN PROGRESS" className="mb-8">
            <div className="p-8">
              <MarqueeMessage className="mb-6">
                🛸 ANALYZING YOUR MUSICAL DNA • CALCULATING COSMIC FREQUENCIES •
                PROCESSING {processingState.totalTracks} SONIC TRANSMISSIONS 🛸
              </MarqueeMessage>

              {/* Overall Progress */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold">OVERALL PROGRESS:</span>
                  <span className="text-neon-green font-mono">
                    {getOverallProgress()}%
                  </span>
                </div>
                <div className="retro-progress-bar">
                  <div
                    className="retro-progress-fill"
                    style={{ width: `${getOverallProgress()}%` }}
                  ></div>
                </div>
              </div>

              {/* Current Status */}
              {processingState.status === "processing" && (
                <div className="text-center mb-6">
                  <BlinkingText className="text-neon-green text-lg">
                    {getCurrentMessage()}
                  </BlinkingText>
                  <div className="mt-2 text-sm">
                    Processing track {processingState.currentTrack} of{" "}
                    {playlistProgress[processingState.currentPlaylist]
                      ?.totalTracks || 0}
                  </div>
                </div>
              )}

              {processingState.status === "completed" && (
                <div className="text-center mb-6">
                  <BlinkingText className="text-neon-green text-xl">
                    🎉 COSMIC ANALYSIS COMPLETE! 🎉
                  </BlinkingText>
                  <p className="mt-2">Redirecting to Workout Builder...</p>
                </div>
              )}
            </div>
          </RetroWindow>

          {/* Playlist Progress */}
          <RetroWindow title="PLAYLIST ANALYSIS STATUS" className="mb-8">
            <div className="p-6">
              <div className="space-y-4">
                {playlistProgress.map(playlist => (
                  <div
                    key={playlist.id}
                    className={`cosmic-border p-4 ${
                      playlist.status === "processing"
                        ? "bg-neon-cyan bg-opacity-10"
                        : "bg-cosmic-black bg-opacity-30"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">
                          {getStatusEmoji(playlist.status)}
                        </span>
                        <span className="font-bold">{playlist.name}</span>
                      </div>
                      <span className="font-mono text-sm">
                        {playlist.processedTracks}/{playlist.totalTracks}
                      </span>
                    </div>

                    <div className="retro-progress-bar">
                      <div
                        className="retro-progress-fill"
                        style={{
                          width: `${
                            (playlist.processedTracks / playlist.totalTracks) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RetroWindow>

          {/* Fun Stats */}
          <RetroWindow title="COSMIC STATISTICS" className="mb-8">
            <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-neon-green">
                  {processingState.completedTracks}
                </div>
                <div className="text-sm">TRACKS ANALYZED</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-neon-cyan">
                  {playlistProgress.length}
                </div>
                <div className="text-sm">PLAYLISTS</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-rainbow-text">
                  {Math.floor(processingState.completedTracks * 3.5)}
                </div>
                <div className="text-sm">MINUTES OF MUSIC</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-neon-green">
                  {processingState.status === "completed" ? "∞" : "?"}
                </div>
                <div className="text-sm">COSMIC ENERGY</div>
              </div>
            </div>
            
            {/* Required GetSongBPM Attribution */}
            <div className="mt-4 pt-4 border-t border-neon-cyan border-opacity-30 text-center">
              <div className="text-xs text-neon-cyan">
                BPM data powered by{" "}
                <a 
                  href="https://getsongbpm.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-neon-green hover:text-rainbow-text underline"
                >
                  GetSongBPM.com
                </a>
              </div>
            </div>
          </RetroWindow>
        </div>
      </div>
    </div>
  );
};

export default BpmProcessing;
