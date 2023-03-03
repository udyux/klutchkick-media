import type { VideoEntry } from '@/types';
import type { Ref } from 'vue';
import { computed, ref } from 'vue';
import _orderBy from 'lodash.orderby';

export function useSearch(videos: Ref<VideoEntry[]>) {
  const searchTerm = ref<string | null>(null);

  const searchResults = computed<VideoEntry[]>(() => {
    if (!searchTerm.value || searchTerm.value.length < 2) return videos.value;

    const searchValues = searchTerm.value
      .toLowerCase()
      .trim()
      .split(' ')
      .filter(word => word.length > 1);

    if (!searchValues.length) return videos.value;

    const matches = videos.value.reduce<VideoEntry[]>((filteredVideos, video) => {
      const cleanDescription = video.description.replace(/#\s?[^\n]+/g, '').toLowerCase();

      video.match = searchValues.reduce(
        (score, word) => (~cleanDescription.indexOf(word) && 1 + word.length) + score,
        0
      );

      return video.match ? [...filteredVideos, video] : filteredVideos;
    }, []);

    return _orderBy(matches, [({ match }) => match], ['desc']);
  });

  return { searchTerm, searchResults };
}
