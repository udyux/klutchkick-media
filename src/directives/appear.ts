import type { App, DirectiveBinding } from 'vue';
import { nextTick } from 'vue';

type AppearOptions = Partial<DirectiveBinding<{ delay?: number; distance?: string }>>;

const classNames = {
  base: 'transition-appear',
  active: '-appear-active',
  from: '-appear-from',
  to: '-appear-to',
};

export default (app: App) =>
  app.directive('appear', {
    beforeMount(el, { arg = 'up', value = {} }: AppearOptions) {
      const { delay, distance } = value;
      el.classList.add(classNames.base, classNames.from, `-appear-${arg}`);
      if (delay) el.style.setProperty('--transition-delay', `${delay}ms`);

      if (distance) {
        const translateBy = arg === 'right' || arg === 'down' ? `-${distance}` : distance;
        el.style.setProperty('--translate-by', translateBy);
      }
    },
    async mounted(el, { arg = 'up' }: AppearOptions) {
      el.addEventListener(
        'transitionend',
        () => {
          el.classList.remove(classNames.base, classNames.active, classNames.to, `-appear-${arg}`);
          el.style.removeProperty('--transition-delay');
          el.style.removeProperty('--translate-by');
        },
        { once: true }
      );

      await nextTick();
      el.classList.add(classNames.active);
      // await nextTick();
      setTimeout(() => el.classList.replace(classNames.from, classNames.to), 10);
    },
  });
