import type { YouTubePlayer } from '@/types';
import { PlayerState } from '@/types';
import { ref, onBeforeUnmount } from 'vue';

const playhead = ref(0);
const duration = ref(0);
const isPlaying = ref(false);
const player = ref<YouTubePlayer | null>(null);

export function usePlayer(unmount = false) {
  onBeforeUnmount(() => {
    if (!unmount) return;
    player.value?.removeEventListener('stateChange', onStateChange);
    player.value?.destroy();
    player.value = null;
    isPlaying.value = false;
  });

  async function onStateChange({ data }: { target: YouTubePlayer; data: PlayerState }) {
    const ignoredStates = [PlayerState.Unstarted, PlayerState.Cued];
    if (!player.value || ignoredStates.includes(data)) return;
    isPlaying.value = data === PlayerState.Playing;
  }

  async function setPlayer(playerInstance: YouTubePlayer) {
    playhead.value = 0;
    player.value = playerInstance;
    duration.value = await playerInstance.getDuration();
    playerInstance.on('stateChange', onStateChange);

    const pollTime = async () => {
      if (!player.value) return;
      const time = await player.value.getCurrentTime();
      const timeout = isPlaying.value ? Math.ceil(1000 - (time % 1) * 1000) : 250;
      setTimeout(pollTime, timeout);
      playhead.value = time;
    };

    pollTime();
  }

  return {
    player,
    playhead,
    duration,
    setPlayer,
  };
}
