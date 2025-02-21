import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/Home.vue';
import LoginView from '../views/Login.vue';
import SignupView from '../views/Signup.vue';
import UploadView from '../views/Upload.vue';

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/signup', name: 'Signup', component: SignupView },
  { path: '/upload', name: 'Upload', component: UploadView },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

