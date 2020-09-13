import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AuthMiddleware from '@/middleware/AuthMiddleware'
import IsLoggedInMiddleware from '@/middleware/IsLoggedInMiddleware'

Vue.use(VueRouter)

  const routes = [
  {
    path: '',
    name: 'Home',
    beforeEnter: IsLoggedInMiddleware,
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    beforeEnter: IsLoggedInMiddleware,
    component: () => import(/* webpackChunkName: "login" */ '../views/auth/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    beforeEnter: IsLoggedInMiddleware,
    component: () => import(/* webpackChunkName: "register" */ '../views/auth/Register.vue')
  },
  {
    path: '/account',
    name: 'Account',
    beforeEnter: AuthMiddleware,
    component: () => import(/* webpackChunkName: "account" */ '../views/Account.vue'),
  },
  {
    path: '/video/:id',
    name: 'Video',
    beforeEnter: AuthMiddleware,
    component: () => import(/* webpackChunkName: "video" */ '../views/Video.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
