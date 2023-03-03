import type { YouTubeRequestDto, YouTubePlaylistEntry, YouTubeVideoEntry, PlaylistEntry } from '@/types';
import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import _orderBy from 'lodash.orderby';

enum YouTubeEndpoint {
  Playlists = 'playlists',
  PlaylistItems = 'playlistItems',
}

const key = import.meta.env.VITE_YT_API_KEY;
const channelId = import.meta.env.VITE_YT_CHANNEL_ID;

const baseUrl = 'https://youtube.googleapis.com/youtube/v3';

const baseQuery = {
  part: 'snippet,contentDetails',
  maxResults: 50,
};

const playlists = ref<Record<string, PlaylistEntry>>({});
const arePlaylistsLoaded = ref(false);

async function fetchYouTubeApi<T>(endpoint: YouTubeEndpoint, query: Record<string, string>) {
  async function fetchAllPages(currentItems: T[], additionalQuery: Record<string, string> = {}): Promise<T[]> {
    const queryParams = Object.entries({ ...baseQuery, ...query, ...additionalQuery })
      .map(param => param.join('='))
      .join('&');

    const { items, nextPageToken } = (await axios<YouTubeRequestDto<T>>(`${baseUrl}/${endpoint}?${queryParams}`)).data;
    const cumulativeItems = [...currentItems, ...items];

    return nextPageToken
      ? fetchAllPages(cumulativeItems, { ...additionalQuery, nextPageToken })
      : Promise.resolve(cumulativeItems);
  }

  return fetchAllPages([]);
}

export const usePlaylistsStore = defineStore('playlists', () => {
  const orderedPlaylists = computed(() =>
    _orderBy(Object.values(playlists.value), [({ publishedAt }) => publishedAt], ['desc'])
  );

  async function fetchPlaylists() {
    if (arePlaylistsLoaded.value) return;

    const items = await fetchYouTubeApi<YouTubePlaylistEntry>(YouTubeEndpoint.Playlists, {
      key,
      channelId,
    });

    playlists.value = items.reduce((playlistMap, { id, snippet, contentDetails }) => {
      const { itemCount } = contentDetails;
      const { title, thumbnails, publishedAt } = snippet;

      return {
        ...playlistMap,
        [id]: { id, title, publishedAt, itemCount, thumbnail: thumbnails.standard, videos: [] },
      };
    }, {});

    arePlaylistsLoaded.value = true;
  }

  async function fetchVideos(playlistId: string) {
    const playlist = playlists.value[playlistId];
    if (playlist && playlist.videos.length) return;

    const items = await fetchYouTubeApi<YouTubeVideoEntry>(YouTubeEndpoint.PlaylistItems, {
      key,
      channelId,
      playlistId,
    });

    playlist.videos = items.map(({ snippet, contentDetails }) => {
      const { title, thumbnails, description } = snippet;
      return { title, description, thumbnail: thumbnails.standard, id: contentDetails.videoId };
    });
  }

  return {
    playlists,
    arePlaylistsLoaded,
    orderedPlaylists,
    fetchPlaylists,
    fetchVideos,
  };
});
