import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/pages/login.vue';
import SignUp from '@/pages/signUp.vue';

const routes = [
  { path: '/login', component: Login },
  { path: '/signup', component: SignUp },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
