import type { App } from 'vue';
import installAppear from './appear';
import installFocus from './focus';

export default (app: App) => {
  installAppear(app);
  installFocus(app);
};
