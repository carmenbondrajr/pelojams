// PeloJams Constants - Sacred Numbers of the Cosmic Cycling Collective

// BPM Ranges for workout phases
export const BPM_RANGES = {
  WARM_UP: [80, 100] as [number, number],
  RECOVERY: [90, 110] as [number, number],
  ENDURANCE: [100, 120] as [number, number],
  THRESHOLD: [120, 140] as [number, number],
  VO2_MAX: [140, 160] as [number, number],
  HILL_CLIMB: [60, 80] as [number, number], // Lower BPM but high energy
  COOL_DOWN: [70, 90] as [number, number],
} as const;

// Workout phase names (cosmic themed)
export const PHASE_NAMES = {
  WARM_UP: "The Awakening",
  RECOVERY: "The Restoration",
  ENDURANCE: "The Journey",
  THRESHOLD: "The Trial",
  VO2_MAX: "The Ascension",
  HILL_CLIMB: "The Mountain of Truth",
  COOL_DOWN: "The Return",
} as const;

// Intensity levels
export const INTENSITY_LEVELS = {
  EARTHBOUND: "earthbound",
  STRATOSPHERIC: "stratospheric",
  INTERSTELLAR: "interstellar",
} as const;

// Preset workout templates
export const WORKOUT_TEMPLATES = {
  EASY_RIDE: {
    name: "Easy Cosmic Cruise",
    duration: 30,
    phases: [
      {
        name: PHASE_NAMES.WARM_UP,
        duration: 5,
        bpmRange: BPM_RANGES.WARM_UP,
        intensity: INTENSITY_LEVELS.EARTHBOUND,
      },
      {
        name: PHASE_NAMES.ENDURANCE,
        duration: 20,
        bpmRange: BPM_RANGES.ENDURANCE,
        intensity: INTENSITY_LEVELS.EARTHBOUND,
      },
      {
        name: PHASE_NAMES.COOL_DOWN,
        duration: 5,
        bpmRange: BPM_RANGES.COOL_DOWN,
        intensity: INTENSITY_LEVELS.EARTHBOUND,
      },
    ],
  },
  HIIT_ASCENSION: {
    name: "HIIT Ascension Protocol",
    duration: 20,
    phases: [
      {
        name: PHASE_NAMES.WARM_UP,
        duration: 3,
        bpmRange: BPM_RANGES.WARM_UP,
        intensity: INTENSITY_LEVELS.EARTHBOUND,
      },
      {
        name: PHASE_NAMES.VO2_MAX,
        duration: 2,
        bpmRange: BPM_RANGES.VO2_MAX,
        intensity: INTENSITY_LEVELS.INTERSTELLAR,
      },
      {
        name: PHASE_NAMES.RECOVERY,
        duration: 2,
        bpmRange: BPM_RANGES.RECOVERY,
        intensity: INTENSITY_LEVELS.EARTHBOUND,
      },
      {
        name: PHASE_NAMES.VO2_MAX,
        duration: 2,
        bpmRange: BPM_RANGES.VO2_MAX,
        intensity: INTENSITY_LEVELS.INTERSTELLAR,
      },
      {
        name: PHASE_NAMES.RECOVERY,
        duration: 2,
        bpmRange: BPM_RANGES.RECOVERY,
        intensity: INTENSITY_LEVELS.EARTHBOUND,
      },
      {
        name: PHASE_NAMES.VO2_MAX,
        duration: 2,
        bpmRange: BPM_RANGES.VO2_MAX,
        intensity: INTENSITY_LEVELS.INTERSTELLAR,
      },
      {
        name: PHASE_NAMES.RECOVERY,
        duration: 2,
        bpmRange: BPM_RANGES.RECOVERY,
        intensity: INTENSITY_LEVELS.EARTHBOUND,
      },
      {
        name: PHASE_NAMES.VO2_MAX,
        duration: 2,
        bpmRange: BPM_RANGES.VO2_MAX,
        intensity: INTENSITY_LEVELS.INTERSTELLAR,
      },
      {
        name: PHASE_NAMES.COOL_DOWN,
        duration: 3,
        bpmRange: BPM_RANGES.COOL_DOWN,
        intensity: INTENSITY_LEVELS.EARTHBOUND,
      },
    ],
  },
  ENDURANCE_JOURNEY: {
    name: "Endurance Journey to the Stars",
    duration: 45,
    phases: [
      {
        name: PHASE_NAMES.WARM_UP,
        duration: 5,
        bpmRange: BPM_RANGES.WARM_UP,
        intensity: INTENSITY_LEVELS.EARTHBOUND,
      },
      {
        name: PHASE_NAMES.ENDURANCE,
        duration: 15,
        bpmRange: BPM_RANGES.ENDURANCE,
        intensity: INTENSITY_LEVELS.STRATOSPHERIC,
      },
      {
        name: PHASE_NAMES.THRESHOLD,
        duration: 15,
        bpmRange: BPM_RANGES.THRESHOLD,
        intensity: INTENSITY_LEVELS.STRATOSPHERIC,
      },
      {
        name: PHASE_NAMES.ENDURANCE,
        duration: 5,
        bpmRange: BPM_RANGES.ENDURANCE,
        intensity: INTENSITY_LEVELS.EARTHBOUND,
      },
      {
        name: PHASE_NAMES.COOL_DOWN,
        duration: 5,
        bpmRange: BPM_RANGES.COOL_DOWN,
        intensity: INTENSITY_LEVELS.EARTHBOUND,
      },
    ],
  },
} as const;

// Retro styling constants
export const RETRO_COLORS = {
  NEON_GREEN: "#00ff00",
  NEON_CYAN: "#00ffff",
  NEON_PINK: "#ff00ff",
  NEON_YELLOW: "#ffff00",
  TERMINAL_GREEN: "#00cc00",
  WARNING_RED: "#ff0000",
  SPACE_PURPLE: "#6600cc",
  ALIEN_BLUE: "#0066ff",
} as const;

// Cult-themed messages for various parts of the app
export const COSMIC_MESSAGES = {
  WELCOME: [
    "GREETINGS, TRAVELER OF THE DIGITAL REALM",
    "YOUR JOURNEY TO MAXIMUM CADENCE BEGINS HERE",
    "PREPARE YOUR EARTHLY VESSEL FOR TRANSFORMATION",
    "THE INFORMATION SUPERHIGHWAY AWAITS YOUR ASCENSION",
  ],
  LOADING: [
    "SCANNING HARMONIC FREQUENCIES...",
    "COMMUNING WITH THE COSMIC ALGORITHMS...",
    "PREPARING THE SACRED PLAYLISTS...",
    "ALIGNING YOUR CHAKRAS WITH THE BPM MATRIX...",
  ],
  SUCCESS: [
    "THE ALGORITHMS ARE PLEASED",
    "YOUR MUSICAL ESSENCE HAS BEEN OPTIMIZED",
    "THE PROPHECY IS COMPLETE",
    "ENLIGHTENMENT PROTOCOL: SUCCESSFUL",
  ],
  ERROR: [
    "THE DIGITAL REALM RESISTS YOUR REQUEST",
    "COSMIC INTERFERENCE DETECTED",
    "THE ALGORITHMS REQUIRE ADDITIONAL SACRIFICES",
    "PLEASE RETRY YOUR CONNECTION TO THE MOTHERSHIP",
  ],
} as const;

// API endpoints
export const API_ENDPOINTS = {
  SPOTIFY: {
    AUTHORIZE: "https://accounts.spotify.com/authorize",
    TOKEN: "https://accounts.spotify.com/api/token",
    ME: "https://api.spotify.com/v1/me",
    PLAYLISTS: "https://api.spotify.com/v1/me/playlists",
    TRACKS: "https://api.spotify.com/v1/me/tracks",
    AUDIO_FEATURES: "https://api.spotify.com/v1/audio-features",
  },
  GETSONGBPM: {
    SEARCH: "https://api.getsongbpm.com/search/",
    SONG: "https://api.getsongbpm.com/song/",
  },
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKENS: "pelojams_auth_tokens",
  PLAYLIST_SELECTIONS: "pelojams_playlist_selections",
  CACHED_SONGS: "pelojams_cached_songs",
  WORKOUT_HISTORY: "pelojams_workout_history",
  USER_PREFERENCES: "pelojams_user_preferences",
} as const;
