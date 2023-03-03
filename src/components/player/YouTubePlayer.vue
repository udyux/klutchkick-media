<template>
  <div class="youtube-player" :style="image">
    <div ref="containerNode" class="youtube-player__wrapper">
      <div ref="playerNode" />
      <div class="youtube-player__timeframes" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, nextTick } from 'vue';
import youTubePlayer from 'youtube-player';
import { usePlayer } from '@/modules';
import type { YouTubePlayer } from '@/types';

const { setPlayer } = usePlayer(true);

const props = defineProps<{ videoId: string }>();
const player = ref<ReturnType<typeof youTubePlayer> | null>(null);
const containerNode = ref<HTMLDivElement | null>(null);
const playerNode = ref<HTMLDivElement | null>(null);
const image = computed(() => ({ '--image': `url('https://i.ytimg.com/vi/${props.videoId}/sddefault.jpg')` }));

onMounted(async () => {
  await nextTick();
  if (!containerNode.value || !playerNode.value) return;
  const { videoId } = props;
  const { clientHeight } = containerNode.value;

  player.value = youTubePlayer(playerNode.value, {
    videoId,
    width: Math.floor((16 / 9) * clientHeight),
    height: clientHeight,
    playerVars: {
      color: 'white',
      iv_load_policy: 3,
      rel: 0,
    },
  });

  setPlayer(player.value as YouTubePlayer);
  player.value.playVideo();
});
</script>
