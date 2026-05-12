import { createRouter, createWebHistory } from "vue-router"

/* ================== VIEWS ================== */
import Home from "@/components/Home.vue"
import Casamento from "@/components/Casamento.vue"
import Perfumes from "@/components/Perfumes.vue"
import Joias from "@/components/Joias.vue"
import Relogios from "@/components/Relogios.vue"
import Pingentes from "@/components/Pingentes.vue"
import Sale from "@/components/Sale.vue"


import Login from "@/views/Login.vue"
import Perfil from "@/views/Perfil.vue"

import Acessorios from "@/views/Acessorios.vue"
import Atendimento from "@/views/Atendimento.vue"
import Acessibilidade from "@/views/Acessibilidade.vue"
import Carrinho from "@/views/Carrinho.vue"
import Duvidas from "@/views/duvidas.vue"



/* ================== ADMIN ================== */
import AdminLogin from "@/views/admin/AdminLogin.vue"
import Dashboard from "@/views/admin/Dashboard.vue"
import Products from "@/views/admin/Products.vue"

/* ================== ROTAS ================== */
const routes = [
  /* ================== PÚBLICAS ================== */
  { path: "/", name: "home", component: Home, meta: { showNav: true } },
  { path: "/acessorios", name: "acessorios", component: Acessorios, meta: { showNav: true } },
  { path: "/atendimento", name: "atendimento", component: Atendimento, meta: { showNav: true } },
  { path: "/carrinho", name: "carrinho", component: Carrinho, meta: { showNav: true } },
  { path: "/acessibilidade", name: "acessibilidade", component: Acessibilidade, meta: { showNav: true } },
   { path: "/duvidas", name: "duvidas", component: Duvidas, meta: { showNav: true } },

  { path: "/casamento", name: "casamento", component: Casamento, meta: { showNav: true } },
  { path: "/perfumes", name: "perfumes", component: Perfumes, meta: { showNav: true } },
  { path: "/relogios", name: "relogios", component: Relogios, meta: { showNav: true } },
  { path: "/joias", name: "joias", component: Joias, meta: { showNav: true } },
  { path: "/sale", name: "sale", component: Sale, meta: { showNav: true } },
  { path: "/pingentes", name: "pingentes", component: Pingentes, meta: { showNav: true } },



  /* ================== AUTH ================== */
  { path: "/login", name: "login", component: Login, meta: { showNav: false } },
  { path: "/perfil", name: "perfil", component: Perfil, meta: { requiresAuth: true, showNav: true } },

  /* ================== ADMIN ================== */
  { path: "/admin/login", name: "admin-login", component: AdminLogin, meta: { showNav: false } },
  { path: "/admin", name: "admin-dashboard", component: Dashboard, meta: { requiresAdmin: true } },
  { path: "/admin/products", name: "admin-products", component: Products, meta: { requiresAdmin: true } },

  /* ================== Fallback ================== */
  { path: "/:pathMatch(.*)*", redirect: "/" }
]

/* ================== ROUTER ================== */
const router = createRouter({
  history: createWebHistory(),
  routes
})

/* ================== GUARDS ================== */
router.beforeEach((to) => {
  const user = localStorage.getItem("user")
  const adminToken = localStorage.getItem("token")

  /* 🔐 ADMIN */
  if (to.meta.requiresAdmin && !adminToken) {
    return "/admin/login"
  }

  /* 🔐 USER AUTH */
  if (to.meta.requiresAuth && !user) {
    return "/login"
  }

  return true
})

export default router