import { createRouter, createWebHistory } from 'vue-router';
import { PlaylistIndex, VideoIndex, VideoSingle } from '../views';

export { useRouter, useRoute, RouterLink, RouterView } from 'vue-router';
export { useQuery } from './useQuery';
export { useParams } from './useParams';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'playlist-index',
      component: PlaylistIndex,
    },
    {
      path: '/:playlistId',
      name: 'video-index',
      component: VideoIndex,
    },
    {
      path: '/:playlistId/:videoId',
      name: 'video-single',
      component: VideoSingle,
    },
  ],
});

export default router;
