<template>
  <div class="admin-shell">
    <!-- SIDEBAR -->
    <aside class="sidebar" :class="{ collapsed: sidebarCollapsed }">
      <div class="sidebar-header">
        <span class="brand" v-if="!sidebarCollapsed">IVY Admin</span>
        <button class="toggle-btn" @click="sidebarCollapsed = !sidebarCollapsed">
          <i :class="sidebarCollapsed ? 'bi bi-layout-sidebar' : 'bi bi-x-lg'"></i>
        </button>
      </div>

      <nav class="sidebar-nav">
        <router-link to="/admin" exact class="nav-item" title="Dashboard">
          <i class="bi bi-speedometer2"></i>
          <span v-if="!sidebarCollapsed">Dashboard</span>
        </router-link>
        <router-link to="/admin/usuarios" class="nav-item" title="Usuários">
          <i class="bi bi-people"></i>
          <span v-if="!sidebarCollapsed">Usuários</span>
        </router-link>
        <router-link to="/admin/pedidos" class="nav-item" title="Pedidos">
          <i class="bi bi-bag-check"></i>
          <span v-if="!sidebarCollapsed">Pedidos</span>
        </router-link>

        <div class="nav-section" v-if="!sidebarCollapsed">PRODUTOS</div>
        <div class="nav-divider" v-else></div>

        <router-link to="/admin/joias" class="nav-item" title="Joias">
          <i class="bi bi-gem"></i>
          <span v-if="!sidebarCollapsed">Joias</span>
        </router-link>
        <router-link to="/admin/perfumes" class="nav-item" title="Perfumes">
          <i class="bi bi-droplet"></i>
          <span v-if="!sidebarCollapsed">Perfumes</span>
        </router-link>
        <router-link to="/admin/pingentes" class="nav-item" title="Pingentes">
          <i class="bi bi-link-45deg"></i>
          <span v-if="!sidebarCollapsed">Pingentes</span>
        </router-link>
        <router-link to="/admin/relogios" class="nav-item" title="Relógios">
          <i class="bi bi-watch"></i>
          <span v-if="!sidebarCollapsed">Relógios</span>
        </router-link>
        <router-link to="/admin/sales" class="nav-item" title="Promoções">
          <i class="bi bi-tag"></i>
          <span v-if="!sidebarCollapsed">Promoções</span>
        </router-link>
        <router-link to="/admin/categorias" class="nav-item" title="Categorias">
          <i class="bi bi-grid"></i>
          <span v-if="!sidebarCollapsed">Categorias</span>
        </router-link>
      </nav>

      <div class="sidebar-footer">
        <button class="logout-btn" @click="logout" :title="sidebarCollapsed ? 'Sair' : ''">
          <i class="bi bi-box-arrow-left"></i>
          <span v-if="!sidebarCollapsed">Sair</span>
        </button>
      </div>
    </aside>

    <!-- MAIN CONTENT -->
    <main class="main-content">
      <header class="topbar">
        <h2 class="page-title">{{ pageTitle }}</h2>
        <div class="topbar-right">
          <span class="admin-name">{{ adminName }}</span>
          <div class="avatar">{{ adminInitial }}</div>
        </div>
      </header>

      <div class="content-area">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const sidebarCollapsed = ref(false)

const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}')
const adminName = computed(() => adminUser.name || 'Admin')
const adminInitial = computed(() => (adminUser.name || 'A')[0].toUpperCase())

const titles: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/usuarios': 'Usuários',
  '/admin/pedidos': 'Pedidos',
  '/admin/joias': 'Joias',
  '/admin/perfumes': 'Perfumes',
  '/admin/pingentes': 'Pingentes',
  '/admin/relogios': 'Relógios',
  '/admin/sales': 'Promoções',
  '/admin/categorias': 'Categorias',
}
const pageTitle = computed(() => titles[route.path] || 'Admin')

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('adminUser')
  router.push('/admin/login')
}
</script>

<style scoped>
.admin-shell {
  display: flex;
  min-height: 100vh;
  background: #0f0f0f;
  color: #e0e0e0;
  font-family: 'Montserrat', sans-serif;
}

/* ── SIDEBAR ── */
.sidebar {
  width: 220px;
  background: #111;
  border-right: 1px solid #222;
  display: flex;
  flex-direction: column;
  transition: width 0.25s ease;
  flex-shrink: 0;
}
.sidebar.collapsed { width: 60px; }

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 16px;
  border-bottom: 1px solid #222;
  min-height: 64px;
}
.brand {
  font-family: 'Playfair Display', serif;
  color: #c9a96e;
  font-size: 1.1rem;
  letter-spacing: 3px;
  white-space: nowrap;
}
.toggle-btn {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 1rem;
  padding: 4px;
  flex-shrink: 0;
}
.toggle-btn:hover { color: #c9a96e; }

.sidebar-nav {
  flex: 1;
  padding: 12px 0;
  overflow-y: auto;
}

.nav-section {
  color: #444;
  font-size: 0.65rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 16px 16px 6px;
}
.nav-divider { height: 1px; background: #222; margin: 12px 8px; }

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  color: #888;
  text-decoration: none;
  font-size: 0.85rem;
  transition: all 0.15s;
  white-space: nowrap;
  overflow: hidden;
}
.nav-item i { font-size: 1rem; flex-shrink: 0; }
.nav-item:hover { color: #e0e0e0; background: #1a1a1a; }
.nav-item.router-link-active { color: #c9a96e; background: #1a1a1a; border-left: 2px solid #c9a96e; }

.sidebar-footer { padding: 12px 0; border-top: 1px solid #222; }
.logout-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 0.85rem;
  padding: 10px 16px;
  transition: color 0.15s;
  white-space: nowrap;
  overflow: hidden;
}
.logout-btn:hover { color: #e74c3c; }

/* ── MAIN ── */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px;
  height: 64px;
  background: #111;
  border-bottom: 1px solid #222;
  flex-shrink: 0;
}
.page-title { font-size: 1rem; font-weight: 600; color: #e0e0e0; letter-spacing: 1px; }
.topbar-right { display: flex; align-items: center; gap: 12px; }
.admin-name { color: #888; font-size: 0.85rem; }
.avatar {
  width: 34px;
  height: 34px;
  background: #c9a96e;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  font-weight: 700;
  font-size: 0.85rem;
}

.content-area {
  flex: 1;
  padding: 28px;
  overflow-y: auto;
}
</style>