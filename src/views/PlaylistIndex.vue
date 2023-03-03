<template>
  <main class="video-index">
    <article
      v-for="(playlist, index) in store.orderedPlaylists"
      :key="playlist.id"
      v-appear="{ delay: index * 30 }"
      class="video-index__entry video-card"
    >
      <figure class="video-card__poster">
        <RouterLink :to="{ name: 'video-index', params: { playlistId: playlist.id } }">
          <img :src="playlist.thumbnail.url" :alt="playlist.title" class="video-card__thumbnail" />
        </RouterLink>
      </figure>

      <h2 class="video-card__title">
        <RouterLink :to="{ name: 'video-index', params: { playlistId: playlist.id } }">{{ playlist.title }}</RouterLink>
      </h2>
    </article>
  </main>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { RouterLink } from '@/router';
import { usePlaylistsStore } from '@/stores';

const store = usePlaylistsStore();

onBeforeMount(() => {
  store.fetchPlaylists();
});
</script>
