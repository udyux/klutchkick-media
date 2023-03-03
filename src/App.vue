<template>
  <header class="layout__header">
    <h1 v-appear:down title="KlutchKick Media">
      <RouterLink :to="{ name: 'playlist-index' }">
        <img src="/images/klutchkick.svg" alt="KlutchKick Media" class="layout__logo" />
      </RouterLink>
    </h1>

    <InputSearchQuery v-if="route.name === 'video-index'" v-appear:left />
  </header>

  <RouterView v-if="store.arePlaylistsLoaded" v-slot="{ Component }">
    <Transition name="transition-page" mode="out-in">
      <Component :is="Component" :key="String(route.name)" class="layout__view" />
    </Transition>
  </RouterView>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { RouterLink, useRoute } from '@/router';
import { usePlaylistsStore } from '@/stores';
import { InputSearchQuery } from '@/components';

const route = useRoute();
const store = usePlaylistsStore();

onBeforeMount(() => {
  store.fetchPlaylists();
});
</script>
