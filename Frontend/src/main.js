import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

try {
  createApp(App).use(router).mount('#app');
  console.log('Vue app initialized successfully');
} catch (error) {
  console.error('Error initializing Vue app:', error);
}

