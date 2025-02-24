import { createRouter, createWebHistory } from 'vue-router';

const HomeView = () => import('../views/Home.vue');
const LoginView = () => import('../views/Login.vue');
const SignupView = () => import('../views/Signup.vue');
const UploadView = () => import('../views/Upload.vue');

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

