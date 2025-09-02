# PeloJams - Claude AI Context Document 🛸

_For use in future Claude sessions to maintain project continuity_

## Project Overview

**PeloJams** is a retro-themed workout playlist generator that connects to Spotify/YouTube Music, analyzes song BPM using GetSongBPM.com, and creates cycling playlists that match workout cadence. The aesthetic is deliberately 90s cult website (Heaven's Gate inspired) with full GeoCities nostalgia.

## Key Commands & Scripts

```bash
npm run dev          # Start development server (runs on 5174)
npm run build        # Production build
npm run typecheck    # TypeScript checking
npm run start        # Production server

# Code Quality Tools (ALWAYS run before completing tasks)
make typecheck       # Check TypeScript types
make lint            # Run ESLint on all code
make format          # Format code with Prettier
make quality         # Run ALL quality checks (required!)
```

## Project Architecture

### Tech Stack

- **React Router 7** with Vite (modern full-stack React)
- **TypeScript** (strict mode enabled)
- **Tailwind CSS** with custom retro theme
- Platform APIs: Spotify Web API, GetSongBPM, YouTube Data API

### Directory Structure

```
pelojams/
├── app/
│   ├── components/retro/     # 90s UI components (BlinkingText, MarqueeMessage, etc.)
│   ├── routes/               # React Router pages
│   │   └── home.tsx         # Main landing page (cosmic cycling collective)
│   ├── services/             # API integrations (future)
│   ├── hooks/                # Custom React hooks (future)
│   ├── utils/
│   │   └── constants.ts     # BPM ranges, cosmic messages, API endpoints
│   ├── types/
│   │   └── index.ts         # All TypeScript interfaces
│   ├── styles/
│   │   └── geocities-core.css # 90s CSS framework
│   └── app.css              # Main stylesheet with retro theme variables
├── public/                   # Static assets (GIFs, cursors - mostly placeholders)
├── .env.example             # Environment variables template
└── README.md               # Cosmic project documentation
```

## Core Concepts

### BPM to Workout Mapping

| Phase      | BPM Range | Cycling Focus   | Cosmic Name       |
| ---------- | --------- | --------------- | ----------------- |
| Warm-up    | 80-100    | Easy spinning   | The Awakening     |
| Endurance  | 100-120   | Steady state    | The Journey       |
| Threshold  | 120-140   | Sweet spot      | The Trial         |
| VO2 Max    | 140-160   | High intensity  | The Ascension     |
| Hill Climb | 60-80     | High resistance | Mountain of Truth |
| Cool-down  | 70-90     | Recovery        | The Return        |

### Data Flow Architecture

```
User Auth → Music Platforms → Library Sync → BPM Enrichment →
Workout Builder → Playlist Generation → Export/Playback
```

### Platform Strategy

- **Primary BPM Source**: GetSongBPM.com (free API with attribution requirement)
- **Music Sources**: Spotify AND/OR YouTube Music (user choice)
- **Fallback**: Spotify Audio Features API for BPM when available

## Implementation Status

### ✅ COMPLETED (Phase 1)

1. **React Router 7 + Vite setup** - Modern foundation
2. **TypeScript configuration** - Full type safety
3. **Retro CSS framework** - "GeoCities Core" with authentic 90s animations
4. **Landing page** - Full cult aesthetic with cosmic messaging
5. **Component library** - BlinkingText, MarqueeMessage, RetroWindow, UFOCheckbox, etc.

### 🔄 NEXT PRIORITIES (Phase 2)

1. **Spotify OAuth flow** - Authentication service
2. **YouTube Music integration** - Alternative music source
3. **Playlist selection UI** - UFO checkboxes for playlist filtering
4. **GetSongBPM integration** - BPM enrichment pipeline

### 🛸 FUTURE PHASES

- **Phase 3**: Workout builder, playlist generation algorithm
- **Phase 4**: In-app playback, real-time BPM display, cadence guidance

## Code Style Guidelines (CRITICAL)

### Component Declaration Style

**ALWAYS use arrow function exports** for all React components:

```typescript
// ✅ CORRECT - Use this pattern
export const ComponentName = ({ prop1, prop2 }: ComponentProps) => {
  return <div>{/* component JSX */}</div>;
};

// ❌ WRONG - Do not use function declarations
export function ComponentName({ prop1, prop2 }: ComponentProps) {
  return <div>{/* component JSX */}</div>;
}
```

### Interface Location

- Define component props interfaces **in the same file** as the component
- Only shared interfaces should go in `/app/types/index.ts`
- Use descriptive names ending with `Props`:

```typescript
interface BlinkingTextProps extends RetroComponentProps {
  speed?: "slow" | "medium" | "fast";
  color?: string;
}

export const BlinkingText = ({
  children,
  speed = "medium",
}: BlinkingTextProps) => {
  // Component implementation
};
```

### Code Quality Requirements

**MANDATORY**: Run `make quality` before completing ANY coding task. This ensures:

- ✅ TypeScript compilation passes
- ✅ ESLint rules are followed
- ✅ Prettier formatting is applied
- ✅ All code follows project standards

**Never commit or submit code that fails quality checks!**

### TypeScript Standards

- Use strict TypeScript mode
- Prefer `Record<string, unknown>` over `any`
- Use proper type annotations for props and return values
- Import types with `import type` when possible

### Comment Guidelines

**DO NOT** write comments that:

- Reference past states of code ("Note: This used to be X")
- Explain what was removed or changed historically
- Document previous implementations or decisions

**DO** write comments that:

- Explain complex business logic or algorithms
- Clarify non-obvious "why" decisions
- Document API requirements or external constraints
- Provide context for future maintainers

Example:

```typescript
// ❌ BAD - Historical reference
// Note: Client secret is no longer stored here for security

// ✅ GOOD - Explains current purpose
// Token exchange handled server-side for security
```

### File Organization

- Keep related code together
- One main export per file
- Use consistent naming conventions
- Follow the established directory structure

## Aesthetic Guidelines (CRITICAL)

### Visual Identity

- **Colors**: Neon green (#00ff00), cyan (#00ffff), black backgrounds
- **Fonts**: Times New Roman, Courier New (monospace for terminal text)
- **Effects**: Blinking text, rainbow gradients, 3D beveled buttons
- **Animations**: Marquee scrolling, spinning elements, starfield backgrounds

### Messaging Tone

- **Cult-like enthusiasm**: "GREETINGS, TRAVELER OF THE DIGITAL REALM"
- **90s web terminology**: "Information Superhighway", "Cosmic Algorithms"
- **Cycling metaphors**: "Ascension", "Higher RPM", "Maximum Cadence"
- **Retro references**: "Best viewed in Netscape Navigator 4.0"

### UI Patterns

- Window frames with title bars and close buttons
- Under construction GIFs and visitor counters
- Blinking "RED ALERT" style text for important info
- UFO/alien themed interactive elements
- Web ring style navigation

## Key Files to Know

### `/app/utils/constants.ts`

Contains all BPM ranges, cosmic messages, workout templates, API endpoints, and storage keys. Central configuration file.

### `/app/types/index.ts`

All TypeScript interfaces including Song, Playlist, Workout, WorkoutPhase, and UI component props.

### `/app/styles/geocities-core.css`

The 90s CSS framework with retro animations, window frames, progress bars, and authentic web 1.0 styling.

### `/app/app.css`

Main stylesheet with CSS custom properties for colors, fonts, and global retro styling.

### `/app/routes/home.tsx`

Landing page showcasing the full aesthetic - rainbow text, scrolling marquees, retro windows, and cult messaging.

## Environment Variables

```bash
# Spotify API
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REDIRECT_URI=http://localhost:5173/auth/spotify/callback

# GetSongBPM API
GETSONGBPM_API_KEY=

# YouTube/Google API
YOUTUBE_CLIENT_ID=
YOUTUBE_CLIENT_SECRET=
YOUTUBE_REDIRECT_URI=http://localhost:5173/auth/youtube/callback
```

## API Integration Notes

### Spotify Web API

- **OAuth 2.0 flow** for user authentication
- **Scopes needed**: `user-library-read`, `playlist-read-private`, `playlist-modify-public`
- **Audio Features endpoint** provides tempo/BPM data
- **Web Playback SDK** for future in-app playback (requires Premium)

### GetSongBPM.com

- **Free API** with mandatory attribution link
- **Search endpoint**: Find songs by title/artist
- **Song endpoint**: Get BPM data by song ID
- **Rate limiting**: Be respectful, cache results locally

### YouTube Data API v3

- **OAuth 2.0** for YouTube Music access
- **Limited to public data** (no private playlists via official API)
- **ytmusicapi library** exists but is unofficial/against TOS

## Development Philosophy

### "Embrace the Jank"

- Some 90s roughness is intentional and desired
- Perfect responsive design is NOT the goal
- Authentic web 1.0 experience over modern UX

### Progressive Enhancement

- Core functionality works without JavaScript
- Enhanced experience with full interactivity
- Graceful degradation for older browsers (as a joke)

### Testing Strategy

- Focus on core playlist generation logic
- API integration tests for music services
- Visual regression tests for retro aesthetic
- Cross-browser compatibility (IE6 support not required 😄)

## Common Pitfalls to Avoid

1. **Modern design creep** - Resist the urge to make it "look good"
2. **Over-engineering** - Keep the 90s simplicity
3. **Breaking the aesthetic** - Every new component must fit the theme
4. **Ignoring BPM science** - Cycling cadence ranges are based on real fitness data
5. **API attribution** - GetSongBPM link is mandatory, don't forget!

## Future Enhancement Ideas

### Phase 4 Features

- **Spotify Web Playback SDK** integration
- **YouTube iframe player** for cross-platform playback
- **Real-time BPM display** with retro LCD styling
- **Cadence guidance** with visual RPM indicators
- **Workout history** tracking and statistics

### Easter Eggs & Fun Features

- **Konami Code** unlocks "Hyperdrive Mode"
- **Secret pages** like `/truth.html` with "classified" content
- **MIDI background music** option (optional)
- **Achievement system** with cosmic ranks
- **Guest book** for user testimonials

## Remember the Sacred Commandments

1. **Maintain the 90s aesthetic** - No clean, modern design
2. **Honor the cult messaging** - Keep it cosmic and enthusiastic
3. **Preserve BPM sanctity** - Workout science must be accurate
4. **Credit the mothership** - GetSongBPM attribution always
5. **Embrace the jank** - Perfect is the enemy of authentic

---

**May your code compile swiftly and your playlists achieve maximum cosmic resonance** 🛸🚴‍♂️

_Last updated: September 2025_  
_Status: Phase 1 Complete - Ready for Platform Integration_
