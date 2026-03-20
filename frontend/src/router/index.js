import { createRouter, createWebHistory } from "vue-router"
import Login from "../views/Login.vue"
import Dashboard from "../views/Dashboard.vue"
import Appointment from "../views/Appointment.vue"
import Register from "../views/Register.vue"

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: Login },
  { path: "/register", component: Register },

  { path: "/dashboard", component: Dashboard, meta: { requiresAuth: true } },
  { path: "/appointments", component: Appointment, meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

/* 🔐 PROTEÇÃO */
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token")

  if (to.meta.requiresAuth && !token) {
    next("/login")
  } else {
    next()
  }
})

export default router