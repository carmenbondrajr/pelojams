/**
 * Spotify Web API Service
 * Handles OAuth authentication and API interactions
 */

interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  refresh_token: string;
}

interface SpotifyUser {
  id: string;
  display_name: string;
  email: string;
  images: Array<{ url: string }>;
}

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

interface SpotifyTrack {
  id: string;
  name: string;
  artists: Array<{ name: string }>;
  album: {
    name: string;
    images: Array<{ url: string }>;
  };
  duration_ms: number;
  preview_url: string | null;
  external_urls: {
    spotify: string;
  };
}

interface SpotifyPlaylistItem {
  track: SpotifyTrack & { type: string };
}

interface SpotifyAudioFeature {
  id: string;
  tempo: number;
}

export class SpotifyService {
  private clientId: string;
  private clientSecret: string;
  private redirectUri: string;

  constructor() {
    this.clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID || "";
    this.clientSecret = "";
    this.redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI || "";
  }

  private getRedirectUri(): string {
    if (this.redirectUri) {
      return this.redirectUri;
    }

    // Fallback to current origin + callback path (client-side only)
    if (typeof window !== "undefined") {
      return `${window.location.origin}/spotify-callback`;
    }

    // Server-side fallback
    return "http://127.0.0.1:5173/spotify-callback";
  }

  /**
   * Generate Spotify OAuth authorization URL
   */
  getAuthUrl(): string {
    const scopes = [
      "user-library-read",
      "playlist-read-private",
      "playlist-read-collaborative",
      "user-read-email",
      "user-read-private",
    ];

    const params = new URLSearchParams({
      response_type: "code",
      client_id: this.clientId,
      scope: scopes.join(" "),
      redirect_uri: this.getRedirectUri(),
      state: this.generateRandomString(16),
    });

    return `https://accounts.spotify.com/authorize?${params.toString()}`;
  }

  /**
   * Exchange authorization code for access token via secure server endpoint
   */
  async getAccessToken(code: string): Promise<SpotifyTokenResponse> {
    const formData = new FormData();
    formData.append("code", code);

    const response = await fetch("/spotify-api", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `Token exchange failed: ${response.statusText}`
      );
    }

    return response.json();
  }

  /**
   * Get current user profile
   */
  async getCurrentUser(accessToken: string): Promise<SpotifyUser> {
    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get user's playlists
   */
  async getUserPlaylists(
    accessToken: string,
    limit = 50
  ): Promise<SpotifyPlaylist[]> {
    let allPlaylists: SpotifyPlaylist[] = [];
    let offset = 0;
    let hasMore = true;

    while (hasMore) {
      const response = await fetch(
        `https://api.spotify.com/v1/me/playlists?limit=${limit}&offset=${offset}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch playlists: ${response.statusText}`);
      }

      const data = await response.json();
      allPlaylists = [...allPlaylists, ...data.items];

      hasMore = data.items.length === limit;
      offset += limit;
    }

    return allPlaylists;
  }

  /**
   * Get playlist details by ID
   */
  async getPlaylist(
    accessToken: string,
    playlistId: string
  ): Promise<SpotifyPlaylist> {
    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch playlist: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get tracks from a playlist
   */
  async getPlaylistTracks(
    accessToken: string,
    playlistId: string
  ): Promise<SpotifyTrack[]> {
    let allTracks: SpotifyTrack[] = [];
    let offset = 0;
    let hasMore = true;
    const limit = 100;

    while (hasMore) {
      const response = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=${limit}&offset=${offset}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch playlist tracks: ${response.statusText}`
        );
      }

      const data = await response.json();
      const tracks = data.items
        .filter(
          (item: SpotifyPlaylistItem) =>
            item.track && item.track.type === "track"
        )
        .map((item: SpotifyPlaylistItem) => item.track);

      allTracks = [...allTracks, ...tracks];

      hasMore = data.items.length === limit;
      offset += limit;
    }

    return allTracks;
  }

  /**
   * Get audio features for tracks (includes BPM)
   */
  async getAudioFeatures(
    accessToken: string,
    trackIds: string[]
  ): Promise<Record<string, { tempo: number }>> {
    const features: Record<string, { tempo: number }> = {};
    const batchSize = 100; // Spotify API limit

    for (let i = 0; i < trackIds.length; i += batchSize) {
      const batch = trackIds.slice(i, i + batchSize);
      const response = await fetch(
        `https://api.spotify.com/v1/audio-features?ids=${batch.join(",")}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Spotify Audio Features API error:`, {
          status: response.status,
          statusText: response.statusText,
          url: response.url,
          trackIds: batch,
          errorBody: errorText,
        });
        throw new Error(
          `Failed to fetch audio features: ${response.status} ${response.statusText} - ${errorText}`
        );
      }

      const data = await response.json();
      data.audio_features.forEach((feature: SpotifyAudioFeature) => {
        if (feature && feature.id) {
          features[feature.id] = { tempo: feature.tempo };
        }
      });
    }

    return features;
  }

  /**
   * Store tokens in localStorage
   */
  storeTokens(tokens: SpotifyTokenResponse): void {
    localStorage.setItem(
      "spotify_tokens",
      JSON.stringify({
        ...tokens,
        expires_at: Date.now() + tokens.expires_in * 1000,
      })
    );
  }

  /**
   * Get stored tokens from localStorage
   */
  getStoredTokens(): SpotifyTokenResponse | null {
    const stored = localStorage.getItem("spotify_tokens");
    if (!stored) return null;

    const tokens = JSON.parse(stored);

    // Check if token is expired
    if (Date.now() >= tokens.expires_at) {
      localStorage.removeItem("spotify_tokens");
      return null;
    }

    return tokens;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.getStoredTokens() !== null;
  }

  /**
   * Logout user (clear tokens)
   */
  logout(): void {
    localStorage.removeItem("spotify_tokens");
    localStorage.removeItem("spotify_user");
  }

  /**
   * Generate random string for OAuth state parameter
   */
  private generateRandomString(length: number): string {
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let text = "";

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }
}

// Export singleton instance
export const spotifyService = new SpotifyService();
