import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import store from '../store';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/discordInvite',
    name: 'DiscordInvite',
    component: () => import('../views/discordInvite.vue'),
  },
  {
    path: '/servers',
    name: 'Servers',
    component: () => import('../views/Servers.vue'),
  },
  {
    path: '/login/callback',
    name: 'Callback',
    component: () => import('../views/login/Callback.vue'),
  },
  {
    path: '/login/notauthorized',
    name: 'NotAuthorized',
    component: () => import('../views/login/NotAuthorized.vue'),
  },
  {
    path: '/private/dashboard',
    name: 'Dashboard',
    component: () => import('../views/private/Dashboard.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  store.dispatch('fetchToken');
  if (to.fullPath === '/private/dashboard') {
    if (!store.state.user.token) {
      next({ name: 'Home' });
      return;
    }
  }
  next();
});

export default router;
