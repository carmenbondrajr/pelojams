import { COSMIC_MESSAGES } from "~/utils/constants";

export function meta() {
  return [
    { title: "🛸 PeloJams - The Cosmic Cycling Collective 🚴‍♂️" },
    {
      name: "description",
      content:
        "Achieve Higher RPM Through The Information Superhighway. Transform your earthly vessel with cosmic cycling frequencies.",
    },
    {
      name: "keywords",
      content:
        "cycling, workout, peloton, playlist, BPM, retro, 90s, cosmic, UFO, fitness",
    },
  ];
}

export default function Home() {
  const getRandomMessage = (messages: readonly string[]) => {
    return messages[Math.floor(Math.random() * messages.length)];
  };

  return (
    <div className="stars-background min-h-screen relative overflow-hidden">
      {/* Cosmic Header */}
      <header className="text-center py-8">
        <div className="marquee-container mb-4">
          <div className="marquee-content">
            🚴‍♂️ THE PORTAL TO PEAK PERFORMANCE AWAITS 🚴‍♂️ PREPARE FOR DIGITAL
            ASCENSION 🛸 COSMIC CYCLING PROTOCOLS ACTIVATED 👽
          </div>
        </div>
      </header>

      {/* Main Landing Content */}
      <main className="container mx-auto px-4 py-8 text-center">
        {/* Cosmic Title */}
        <div className="mb-12">
          <h1 className="text-6xl font-bold rainbow-text mb-4 text-spinning">
            PELOJAMS
          </h1>
          <div className="text-3d text-2xl mb-6">
            THE COSMIC CYCLING COLLECTIVE
          </div>
          <p className="terminal-text text-lg neon-glow">
            {getRandomMessage(COSMIC_MESSAGES.WELCOME)}
          </p>
        </div>

        {/* Sacred Mission Statement */}
        <div className="retro-window max-w-4xl mx-auto mb-12">
          <div className="retro-window-header">
            <span>📡 SACRED TRANSMISSION FROM THE MOTHERSHIP 📡</span>
            <div className="retro-window-controls">
              <div className="retro-window-control">_</div>
              <div className="retro-window-control">□</div>
              <div className="retro-window-control">×</div>
            </div>
          </div>
          <div className="retro-window-content">
            <div className="space-y-4 text-left">
              <p className="terminal-text">
                <span className="blink text-warning-red">► </span>
                Your physical vessel awaits transformation through the ancient
                art of <span className="neon-glow">COSMIC CYCLING</span>
              </p>
              <p className="terminal-text">
                <span className="blink text-warning-red">► </span>
                Connect your musical consciousness to the{" "}
                <span className="rainbow-text">INFORMATION SUPERHIGHWAY</span>
              </p>
              <p className="terminal-text">
                <span className="blink text-warning-red">► </span>
                Let the sacred <span className="text-3d">
                  BPM FREQUENCIES
                </span>{" "}
                guide your journey to Higher Cadence
              </p>
              <p className="terminal-text">
                <span className="blink text-warning-red">► </span>
                Join thousands of disciples who have achieved{" "}
                <span className="neon-glow">MAXIMUM RPM ENLIGHTENMENT</span>
              </p>
            </div>
          </div>
        </div>

        {/* Initiation Protocol Button */}
        <div className="mb-12">
          <button className="retro-button text-2xl px-12 py-4 cosmic-border float-element">
            🛸 INITIATE PROTOCOL 🛸
          </button>
          <div className="mt-4">
            <p className="terminal-text text-sm">
              <span className="blink">★</span> No earthly credentials required -
              The algorithms will guide you <span className="blink">★</span>
            </p>
          </div>
        </div>

        {/* Sacred Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="retro-window">
            <div className="retro-window-header">
              <span>👽 DISCIPLES CONVERTED</span>
            </div>
            <div className="retro-window-content">
              <div className="text-4xl rainbow-text font-bold">42,069</div>
              <div className="terminal-text">Earthlings Enlightened</div>
            </div>
          </div>

          <div className="retro-window">
            <div className="retro-window-header">
              <span>🎵 COSMIC FREQUENCIES</span>
            </div>
            <div className="retro-window-content">
              <div className="text-4xl text-3d font-bold">∞</div>
              <div className="terminal-text">BPM Combinations Unlocked</div>
            </div>
          </div>

          <div className="retro-window">
            <div className="retro-window-header">
              <span>🚴‍♂️ ASCENSIONS ACHIEVED</span>
            </div>
            <div className="retro-window-content">
              <div className="text-4xl neon-glow font-bold">1337</div>
              <div className="terminal-text">Peak Performance Protocols</div>
            </div>
          </div>
        </div>

        {/* Platform Prophecy */}
        <div className="retro-window max-w-2xl mx-auto mb-8">
          <div className="retro-window-header">
            <span>🔮 THE PROPHECY OF PLATFORMS 🔮</span>
          </div>
          <div className="retro-window-content">
            <div className="grid grid-cols-2 gap-4">
              <div className="cosmic-border p-4">
                <div className="text-2xl mb-2">🎧</div>
                <div className="terminal-text font-bold">SPOTIFY REALM</div>
                <div className="text-sm">
                  Channel your liked songs through the cosmic algorithm
                </div>
              </div>
              <div className="cosmic-border p-4">
                <div className="text-2xl mb-2">📺</div>
                <div className="terminal-text font-bold">YOUTUBE DIMENSION</div>
                <div className="text-sm">
                  Access unlimited musical frequencies from the tube of you
                </div>
              </div>
            </div>
            <div className="mt-4 terminal-text text-sm">
              <span className="blink">⚡</span> Both platforms supported by our
              advanced alien technology <span className="blink">⚡</span>
            </div>
          </div>
        </div>

        {/* Visitor Counter & Web Ring */}
        <div className="flex flex-col items-center gap-4">
          <div className="visitor-counter">
            <span className="blink-fast">999999</span>
          </div>

          <div className="web-ring">
            <div className="text-xs mb-2">APPROVED FITNESS PORTALS:</div>
            <div className="flex flex-wrap justify-center gap-2 text-xs">
              <a href="#">🛸 ALIEN FITNESS HUB</a>
              <a href="#">👽 COSMIC GYM NETWORK</a>
              <a href="#">🚴‍♂️ CYCLIC ENLIGHTENMENT</a>
              <a href="#">🌟 STELLAR WORKOUTS</a>
            </div>
          </div>
        </div>

        {/* Under Construction Element */}
        <div className="fixed bottom-4 right-4">
          <div className="under-construction"></div>
        </div>
      </main>

      {/* Footer Attribution */}
      <footer className="text-center py-4 terminal-text text-xs">
        <p>
          © 1997-∞ PeloJams Cosmic Cycling Collective |
          <a href="https://getsongbpm.com" className="neon-glow">
            {" "}
            Powered by GetSongBPM.com
          </a>{" "}
          | Best viewed in Netscape Navigator 4.0
        </p>
      </footer>
    </div>
  );
}
