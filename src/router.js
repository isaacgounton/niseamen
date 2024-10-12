import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Lyrics from './views/Lyrics.vue'
import About from './views/About.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/lyrics',
    name: 'Lyrics',
    component: Lyrics
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router