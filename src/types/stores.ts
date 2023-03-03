import type { YouTubeThumbnails } from './youtube';
import type { Timeframe } from './timeframes';

interface PlaylistStoreEntry {
  id: string;
  title: string;
  thumbnail: YouTubeThumbnails['standard'];
}

export interface VideoEntry extends PlaylistStoreEntry {
  description: string;
  match?: number;
}

export interface PlaylistEntry extends PlaylistStoreEntry {
  publishedAt: string;
  itemCount: number;
  videos: VideoEntry[];
}

export interface TimeframeEntry {
  id: string;
  videoId: string;
  playlistId: string;
  timeframes: Record<string, Timeframe>;
}
