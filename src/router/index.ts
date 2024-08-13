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
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
