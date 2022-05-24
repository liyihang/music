import { createRouter, createWebHashHistory } from 'vue-router'
import Recommend from '@/views/recommend'
import Singer from '@/views/singer'
import Search from '@/views/search'
import TopList from '@/views/top-list'
const routes = [
  {
    name: '/recommend',
    component: Recommend
  },
  {
    name: '/singer',
    component: Singer
  },
  {
    name: '/search',
    component: Search
  },
  {
    name: '/top-list',
    component: TopList
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
