
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
                          width: `${(playlist.processedTracks / playlist.totalTracks) * 100}%`,
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
          </RetroWindow>
        </div>
      </div>
    </div>
  );
};

export default BpmProcessing;
