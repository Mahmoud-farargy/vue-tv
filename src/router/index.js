import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import appConfig from "@/app-config";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: "Categories",
      description: "TV categories",
      requiresAuth: false
    },
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      title: "About",
      description: "About the author",
      requiresAuth: false
    },
    component: () => import('../views/About.vue')
  },
  {
    path: '/streams/:id/:name',
    name: 'Streams',
    meta: {
      title: "Streams",
      description: "list of live streams that you can watch",
      requiresAuth: false
    },
    component: () => import('../views/Streams.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, _, next) => {
  window.scrollTo({
    top:0,
    left:0,
    behavior: "auto"
  });
  document.title = `${(to.meta && to.meta.title) ? to.meta.title : appConfig.title} | ${appConfig.author}`;
  next();
});

export default router
