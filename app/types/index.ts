// Core types for PeloJams - The Cosmic Cycling Collective

export interface Song {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration: number; // in seconds
  bpm?: number;
  energy?: number; // 0-1 scale
  platform: "spotify" | "youtube";
  platformId: string;
  imageUrl?: string;
  uri?: string; // platform-specific URI
}

export interface Playlist {
  id: string;
  name: string;
  description?: string;
  trackCount: number;
  platform: "spotify" | "youtube";
  selected: boolean;
  imageUrl?: string;
  uri?: string;
}

export interface PlaylistSelection {
  spotify: {
    likedSongs: boolean;
    playlists: Playlist[];
  };
  youtube: {
    likedSongs: boolean;
    playlists: Playlist[];
  };
}

export interface WorkoutPhase {
  id: string;
  name: string;
  duration: number; // in minutes
  bpmRange: [number, number];
  intensity: "earthbound" | "stratospheric" | "interstellar";
  description?: string;
}

export interface Workout {
  id: string;
  name: string;
  phases: WorkoutPhase[];
  totalDuration: number; // in minutes
  createdAt: Date;
  type: "preset" | "custom";
}

export interface GeneratedPlaylist {
  id: string;
  workoutId: string;
  songs: Song[];
  totalDuration: number;
  averageBpm: number;
  createdAt: Date;
}

// Platform authentication types
export interface AuthToken {
  accessToken: string;
  refreshToken?: string;
  expiresAt?: Date;
  scope?: string[];
}

export interface PlatformAuth {
  spotify?: AuthToken;
  youtube?: AuthToken;
}

// BPM service types
export interface BPMSearchResult {
  id: string;
  title: string;
  artist: string;
  bpm: number;
  confidence: number;
}

// Cosmic frequency settings (preset workout types)
export type WorkoutTemplate =
  | "easy-ride"
  | "hiit-ascension"
  | "endurance-journey"
  | "custom-prophecy";

// UI component props
export interface RetroComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Storage/cache types
export interface CachedSong extends Song {
  lastUpdated: Date;
  bpmSource: "spotify" | "getsongbpm" | "manual";
}

export interface WorkoutHistory {
  id: string;
  workoutId: string;
  playlistId: string;
  completedAt: Date;
  actualDuration: number;
  averageHeartRate?: number;
  caloriesBurned?: number;
}

// Error types for better error handling
export type PeloJamsError =
  | "AUTH_FAILED"
  | "API_RATE_LIMIT"
  | "PLATFORM_UNAVAILABLE"
  | "BPM_NOT_FOUND"
  | "PLAYLIST_GENERATION_FAILED"
  | "EXPORT_FAILED";

export interface ErrorState {
  type: PeloJamsError;
  message: string;
  details?: Record<string, unknown>;
  timestamp: Date;
}
