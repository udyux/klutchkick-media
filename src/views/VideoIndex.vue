<template>
  <main class="video-index">
    <article
      v-for="(video, index) in searchResults"
      :key="video.id"
      class="video-index__entry video-card"
      v-appear="{ delay: index * 30 + 100 }"
    >
      <figure class="video-card__poster">
        <RouterLink :to="{ name: 'video-single', params: { playlistId, videoId: video.id } }">
          <img :src="video.thumbnail.url" :alt="video.title" class="video-card__thumbnail" />
        </RouterLink>
      </figure>

      <h2 class="video-card__title">
        <RouterLink :to="{ name: 'video-single', params: { playlistId, videoId: video.id } }">
          {{ video.title }}
        </RouterLink>
      </h2>
    </article>
  </main>
</template>

<script setup lang="ts">
import { computed, watch, onBeforeMount } from 'vue';
import { usePlaylistsStore } from '@/stores';
import { useSearch } from '@/modules';
import { useParams, useQuery, RouterLink } from '@/router';

const store = usePlaylistsStore();
const params = useParams();
const { query } = useQuery();

const playlistId = computed(() => params.value.playlistId as string);
const videos = computed(() => store.playlists[playlistId.value].videos || []);
const { searchTerm, searchResults } = useSearch(videos);

watch(
  () => query.value.search as string | null,
  search => {
    searchTerm.value = search;
  },
  { immediate: true }
);

onBeforeMount(() => {
  store.fetchVideos(playlistId.value);
});
</script>
