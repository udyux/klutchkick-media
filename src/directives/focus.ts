import type { App } from 'vue';

export default (app: App) =>
  app.directive('focus', {
    mounted: el => el.focus(),
  });
