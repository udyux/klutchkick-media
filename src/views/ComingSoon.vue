<template>
  <main class="coming-soon">
    <div class="coming-soon__background" :style="dynamicStyles">
      <figure class="coming-soon__poster" />

      <iframe
        v-if="device.tablet"
        ref="playerNode"
        class="coming-soon__video"
        :class="{ '-ready': videoLoaded }"
        frameborder="0"
        allowfullscreen
        allow="autoplay; encrypted-media"
        :title="currentVideoId"
        :width="width"
        :height="height"
        :src="src"
        @load="onIframeLoaded"
      />
    </div>

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
        <span>&copy; 2023 | klutchkick media</span>

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

const videos = ['2r8gxvLTiaA', 'B80PoqOtE_8', 'SmJ8k-NWF4E'];
const width = window.innerWidth;
const height = Math.floor((9 / 16) * window.innerWidth);

const startVideoIndex =
  localStorage && localStorage.getItem('bgVideoIndex')
    ? Number(localStorage.getItem('bgVideoIndex')) % videos.length
    : 0;

const currentVideoIndex = ref(startVideoIndex);
const playerNode = ref<HTMLIFrameElement | null>(null);
const scale = ref(1.2);
const videoLoaded = ref(false);

const currentVideoId = computed(() => videos[currentVideoIndex.value]);

const dynamicStyles = computed(() => ({
  '--image': `url('/images/posters/${currentVideoId.value}.jpg')`,
  '--scale': `scale(${scale.value})`,
}));

const src = computed(() => {
  const options = Object.entries({
    iv_load_policy: 3,
    rel: 0,
    modestbranding: 1,
    autohide: 1,
    mute: 1,
    showinfo: 0,
    controls: 0,
    autoplay: 1,
    loop: 1,
    playlist: currentVideoId.value,
  })
    .map(opt => opt.join('='))
    .join('&');

  return `https://www.youtube.com/embed/${currentVideoId.value}?${options}`;
});

onMounted(async () => {
  if (localStorage) localStorage.setItem('bgVideoIndex', `${startVideoIndex + 1}`);
  if (!playerNode.value) return;
  const { innerHeight } = window;
  const { clientHeight } = playerNode.value;
  const ratio = innerHeight / clientHeight;
  if (ratio > 1) scale.value = 0.2 + ratio;
});

function onIframeLoaded() {
  videoLoaded.value = true;
}
</script>
