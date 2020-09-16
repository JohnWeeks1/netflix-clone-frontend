import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AuthMiddleware from '@/middleware/AuthMiddleware'
import IsLoggedInMiddleware from '@/middleware/IsLoggedInMiddleware'
import Login from "@/views/auth/Login";
import Register from "@/views/auth/Register";
import Account from "@/views/Account";
import MovieLibrary from "@/components/account/MovieLibrary";
import Movie from "@/components/account/Movie";

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
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    beforeEnter: IsLoggedInMiddleware,
    component: Register
  },
  {
    path: '/account',
    name: 'Account',
    beforeEnter: AuthMiddleware,
    component: Account,
    children: [
      {
        path: 'movie-library',
        name: 'MovieLibrary',
        component: MovieLibrary
      },
      {
        path: 'movie/:id',
        name: 'Movie',
        beforeEnter: AuthMiddleware,
        component: Movie
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
