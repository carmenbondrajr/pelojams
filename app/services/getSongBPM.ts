interface GetSongBPMResponse {
  song: {
    title: string;
    artist: string;
    tempo: number;
    time_sig: string;
    duration: string;
    album?: string;
  };
}

interface GetSongBPMSearchResponse {
  search: Array<{
    id: string;
    title: string;
    artist: string;
    album?: string;
    uri?: string;
  }>;
}

export class GetSongBPMService {
  private apiKey: string;
  private baseUrl = "https://api.getsongbpm.com";

  constructor() {
    this.apiKey = import.meta.env.VITE_GETSONGBPM_API_KEY || "";
  }

  async searchSong(title: string, artist: string): Promise<string | null> {
    if (!this.apiKey) {
      console.warn("GetSongBPM API key not configured");
      return null;
    }

    try {
      const response = await fetch(
        `${this.baseUrl}/search/?api_key=${this.apiKey}&type=both&lookup=song:${encodeURIComponent(title)}%20artist:${encodeURIComponent(artist)}`
      );

      if (!response.ok) {
        throw new Error(`Search failed: ${response.statusText}`);
      }

      const data: GetSongBPMSearchResponse = await response.json();

      if (data.search && data.search.length > 0) {
        return data.search[0].id;
      }

      return null;
    } catch (error) {
      console.error("GetSongBPM search error:", error);
      return null;
    }
  }

  async getSongBPM(songId: string): Promise<number | null> {
    if (!this.apiKey) {
      console.warn("GetSongBPM API key not configured");
      return null;
    }

    try {
      const response = await fetch(
        `${this.baseUrl}/song/?api_key=${this.apiKey}&id=${songId}`
      );

      if (!response.ok) {
        throw new Error(`BPM fetch failed: ${response.statusText}`);
      }

      const data: GetSongBPMResponse = await response.json();

      if (data.song && typeof data.song.tempo === "number") {
        return Math.round(data.song.tempo);
      }

      return null;
    } catch (error) {
      console.error("GetSongBPM fetch error:", error);
      return null;
    }
  }

  async getBPMForTrack(title: string, artist: string): Promise<number | null> {
    try {
      const songId = await this.searchSong(title, artist);
      if (!songId) {
        return null;
      }

      return await this.getSongBPM(songId);
    } catch (error) {
      console.error("GetSongBPM track BPM error:", error);
      return null;
    }
  }

  async getBPMForTracks(
    tracks: Array<{ title: string; artist: string }>
  ): Promise<Record<string, number | null>> {
    const results: Record<string, number | null> = {};

    for (const track of tracks) {
      const key = `${track.title} - ${track.artist}`;
      results[key] = await this.getBPMForTrack(track.title, track.artist);

      // Add small delay to be respectful to the API
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    return results;
  }

  isConfigured(): boolean {
    return !!this.apiKey;
  }
}

export const getSongBPMService = new GetSongBPMService();
