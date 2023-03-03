<template>
  <main class="video-single">
    <YouTubePlayer v-appear:down="{ delay: 100 }" :video-id="params.videoId" />
    <Timeframes />
  </main>
</template>

<script setup lang="ts">
import { useParams } from '@/router';
import { YouTubePlayer, Timeframes } from '@/components';

const params = useParams<{ playlistId: string; videoId: string }>();
</script>
