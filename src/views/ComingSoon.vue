<template>
  <main class="coming-soon" :style="{ '--poster': `url('${poster}')` }">
    <video
      :poster="poster"
      class="coming-soon__video"
      :class="{ '-playing': isVideoLoaded }"
      autoplay
      muted
      loop
      playsinline
      @play="isVideoLoaded = !isVideoLoaded"
    >
      <source :src="src" type="video/mp4" />
    </video>

    <div class="coming-soon__content">
      <header class="coming-soon__row">
        <h1>
          <img src="/images/klutchkick.svg" alt="klutchkick media" class="coming-soon__logo" />
        </h1>

        <menu class="coming-soon__menu">
          <li class="coming-soon__menu-item">
            <button class="button -borderless" @click="switchLocale">{{ nextLocale.toUpperCase() }}</button>
          </li>

          <li class="coming-soon__menu-item">
            <button class="button">{{ t('global.contact_us') }}</button>
          </li>
        </menu>
      </header>

      <section class="coming-soon__center">
        <h2 class="coming-soon__banner">{{ t('comingSoon.banner') }}</h2>
        <div class="coming-soon__text">
          <p>{{ t('comingSoon.message') }}</p>
        </div>
      </section>

      <footer class="coming-soon__row">
        <span>&copy; 2023 | Klutchkick media</span>

        <nav class="coming-soon__social">
          <a
            href="https://www.youtube.com/@klutchkickmedia"
            target="_blank"
            rel="noopener"
            class="coming-soon__link"
            v-text="'YouTube'"
          />
          &nbsp;/&nbsp;
          <a href="#" class="coming-soon__link">Facebook</a>
          &nbsp;/&nbsp;
          <a href="#" class="coming-soon__link">Instagram</a>
        </nav>
      </footer>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useLocale, useDevice } from '@/modules';

const { nextLocale, switchLocale, t } = useLocale();
const { device } = useDevice();

const videos = ['bg1', 'bg2', 'bg3'];
const videoResolution = device.tablet ? '1440' : '1080';
const isVideoLoaded = ref(false);

const startVideoIndex =
  localStorage && localStorage.getItem('bgVideoIndex')
    ? Number(localStorage.getItem('bgVideoIndex')) % videos.length
    : 0;

const currentVideoIndex = ref(startVideoIndex);
const currentVideoId = computed(() => videos[currentVideoIndex.value]);
const poster = computed(() => `/images/posters/${currentVideoId.value}.jpg`);

const src = computed(() => {
  return `https://video.klutchkickmedia.com/${currentVideoId.value}.${videoResolution}.mp4`;
});

onMounted(async () => {
  if (localStorage) localStorage.setItem('bgVideoIndex', `${startVideoIndex + 1}`);
});
</script>
