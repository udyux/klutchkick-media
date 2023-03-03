import type { Timeframe, TimeframeEntry } from '@/types';
import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { v4 as uuid } from 'uuid';

type SetEntryParams = Pick<Timeframe, 'start' | 'end'> & Pick<TimeframeEntry, 'playlistId' | 'videoId'>;

const timeframeMap = ref<Record<string, TimeframeEntry>>({});
const getVideoTimeframes = computed(() => (videoId: string) => timeframeMap.value[videoId]?.timeframes || {});

export const useTimeframesStore = defineStore('timeframes', () => {
  function setTimeframeEntry({ playlistId, videoId, start, end }: SetEntryParams) {
    const existingEntry = timeframeMap.value[videoId] || { videoId, playlistId, timeframes: {} };
    const id = uuid();
    const entry = { id, start, end };
    const timeframes = { ...existingEntry.timeframes, [id]: entry };
    timeframeMap.value[videoId] = { ...existingEntry, timeframes };
    return id;
  }

  function getEntrySetter(playlistId: string, videoId: string) {
    return (start: number, end: number) => {
      return setTimeframeEntry({ playlistId, videoId, start, end });
    };
  }

  return {
    timeframes: timeframeMap,
    getEntrySetter,
    getVideoTimeframes,
  };
});
