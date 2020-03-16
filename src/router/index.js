import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Signin from '../views/Signin.vue'
import Signup from '../views/Signup.vue'
import firebase from 'firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      isPublic: true
    }
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin,
    meta: {
      isPublic: true
    }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    meta: {
      isPublic: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(page => page.meta.isPublic)) {
    firebase.auth().onAuthStateChanged(function(user) {
      if(user) {
        next()
      } else {
        next({
          path: '/signup',
          query: {
            redirect: to.fullPath
          }
        })
      }
    })
  } else {
    next()
  }
})

export default router
