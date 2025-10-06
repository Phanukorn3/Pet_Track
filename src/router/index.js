import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/pages/login.vue';
import SignUp from '@/pages/signUp.vue';
import Overview from '../pages/overview.vue';

const routes = [
  { path: '/', component: Overview },
  { path: '/auth/login', component: Login },
  { path: '/auth/signup', component: SignUp },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
