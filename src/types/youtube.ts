import type youTubePlayer from 'youtube-player';

export enum PlayerState {
  Unstarted = -1,
  Ended = 0,
  Playing = 1,
  Paused = 2,
  Buffering = 3,
  Cued = 5,
}

export type YouTubePlayer = ReturnType<typeof youTubePlayer> & {
  on(eventType: 'stateChange', listener: (event: { target: YouTubePlayer; data: PlayerState }) => Promise<void>): void;
  removeEventListener(
    event: 'stateChange',
    listener: (event: { target: YouTubePlayer; data: PlayerState }) => Promise<void>
  ): void;
};

export type YouTubeThumbnails = Record<
  'default' | 'high' | 'medium' | 'standard',
  { url: string; width: number; height: number }
>;

interface YouTubeSnippet {
  channelId: string;
  channelTitle: string;
  description: string;
  publishedAt: string;
  thumbnails: YouTubeThumbnails;
  title: string;
}

interface YouTubeDto {
  etag: string;
  kind: string;
}

interface YouTubeEntry<T> extends YouTubeDto {
  id: string;
  snippet: T;
}

interface YouTubePlaylistSnippet extends YouTubeSnippet {
  localized: { title: string; description: string };
}

interface YouTubeVideoSnippet extends YouTubeSnippet {
  playlistId: string;
  position: number;
  resourceId: { kind: string; videoId: string };
  videoOwnerChannelTitle: string;
  videoOwnerChannelId: string;
}

export interface YouTubePlaylistEntry extends YouTubeEntry<YouTubePlaylistSnippet> {
  contentDetails: { itemCount: number };
}

export interface YouTubeVideoEntry extends YouTubeEntry<YouTubeVideoSnippet> {
  contentDetails: { videoId: string; videoPublishedAt: string };
}

export interface YouTubeRequestDto<T> extends YouTubeDto {
  items: T[];
  pageInfo: { totalResults: number; resultsPerPage: number };
  nextPageToken?: string;
  prevPageToken?: string;
}
