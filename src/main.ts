import './styles/main.scss';
import { createApp } from 'vue';
import stores from './stores';
import router from './router';
import directives from './directives';
import App from './App.vue';

fetch('/icons.svg')
  .then(response => response.text())
  .then(sprite => document.body.insertAdjacentHTML('afterbegin', sprite));

createApp(App).use(router).use(stores).use(directives).mount('#app');
