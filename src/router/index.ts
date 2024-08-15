import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/init'
  },
  {
    path: '/init',
    name: 'init',
    component: () => import('../views/InitView.vue')
  },
  {
    path: '/repo',
    name: 'repo',
    component: () => import('../views/RepoView.vue')
  },
  {
    path: '/repo/:owner/:name',
    name: 'repo-detail',
    component: () => import('../views/RepoContentView.vue')
  },
  {
    path: '/today',
    name: 'today',
    component: () => import('../views/TodayView.vue')
  },
  {
    path: '/discover',
    name: 'discover',
    component: () => import('../views/DiscoverView.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/ProfileView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
