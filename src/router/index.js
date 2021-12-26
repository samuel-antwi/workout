import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Create from '../views/Create.vue'
import Profile from '../views/Profile.vue'
import WorkoutDetails from '../views/WorkoutDetails.vue'
import { supabase } from '../supabase'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home',
      auth: false,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Login',
      auth: false,
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      title: 'Register',
      auth: false,
    },
  },
  {
    path: '/create',
    name: 'Create',
    component: Create,
    meta: {
      title: 'Create',
      auth: true,
    },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      title: 'Account',
      auth: true,
    },
  },
  {
    path: '/workout/:workoutId',
    name: 'WorkoutDetails',
    component: WorkoutDetails,
    meta: {
      title: 'WorkoutDetails',
      auth: false,
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Change document titles

router.beforeEach((to, from, next) => {
  document.title = `My Tracker | ${to.meta.title} `
  next()
})

// Route guard for auth routes
router.beforeEach((to, from, next) => {
  const user = supabase.auth.user()

  if (to.matched.some((res) => res.meta.auth)) {
    if (user) {
      next()
      return
    }
    next({ name: 'Login' })
    return
  }
  next()
})
export default router
