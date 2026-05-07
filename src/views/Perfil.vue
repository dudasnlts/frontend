<template>
  <!-- SEO: Uso de tags semânticas como <main>, <section> e <article> -->
  <main class="profile-container">
    <div class="luxury-wrapper">
      
      <!-- SIDEBAR MINIMALISTA -->
      <aside class="sidebar-prive">
        <div class="profile-avatar-group">
          <div class="avatar-ring">
            <div class="avatar-core">{{ initials }}</div>
          </div>
          <h1 class="user-name">{{ user.name }}</h1>
          <p class="user-status"><span class="pulse-dot"></span> Membro Ivy Privé</p>
        </div>

        <nav class="sidebar-nav">
          <button class="nav-item active">
            <User :size="18" /> Visão Geral
          </button>
          <button class="nav-item">
            <Package :size="18" /> Histórico de Pedidos
          </button>
          <button class="nav-item logout" @click="logout">
            <LogOut :size="18" /> Sair da Conta
          </button>
        </nav>

        <div class="sidebar-footer">
          <p>Dúvidas? <a href="#">Concierge Ivy</a></p>
        </div>
      </aside>

      <!-- CONTEÚDO PRINCIPAL -->
      <section class="content-prive">
        <header class="content-header">
          <h2>Bem-vindo de volta, <span>{{ firstName }}</span></h2>
          <p>Gerencie seus pedidos e preferências de exclusividade.</p>
        </header>

        <div class="stats-grid">
          <div class="stat-card">
            <span class="label">Total em Joias</span>
            <span class="value">R$ {{ totalSpent.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</span>
          </div>
          <div class="stat-card">
            <span class="label">Status da Conta</span>
            <span class="value accent">VIP Gold</span>
          </div>
        </div>

        <!-- SEÇÃO DE PEDIDOS -->
        <div class="orders-section">
          <div class="section-header">
            <h3>Meus Pedidos Recentes</h3>
            <div class="line"></div>
          </div>

          <div v-if="loadingOrders" class="skeleton-loader">
            <div class="skeleton-item" v-for="i in 3" :key="i"></div>
          </div>

          <div v-else-if="orders.length === 0" class="empty-orders">
            <ShoppingBag :size="40" stroke-width="1" />
            <p>Sua caixa de joias ainda está vazia.</p>
            <router-link to="/" class="btn-shop">Começar Coleção</router-link>
          </div>

          <div v-else class="orders-list">
            <article class="order-card-new" v-for="order in orders" :key="order._id">
              <div class="order-main-info">
                <div class="order-id-group">
                  <span class="id-label">PEDIDO #{{ order._id.slice(-6).toUpperCase() }}</span>
                  <span class="date">{{ formatDate(order.createdAt) }}</span>
                </div>
                <div class="order-status-badge" :class="order.status">
                  {{ statusLabel(order.status) }}
                </div>
              </div>

              <div class="order-items-preview">
                <div v-for="item in order.items" :key="item._id" class="preview-item">
                  <span class="item-name">{{ item.product?.name || 'Peça Exclusiva' }}</span>
                  <span class="item-qty">Qtde: {{ item.quantity }}</span>
                </div>
              </div>

              <div class="order-footer-new">
                <div class="total-price">
                  <span>Valor Total</span>
                  <strong>R$ {{ order.total?.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</strong>
                </div>
                <button class="btn-details">Ver Detalhes</button>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import { useRouter } from "vue-router"
import { User, Package, LogOut, ShoppingBag, Loader2 } from "lucide-vue-next"
import axios from "axios"

const router = useRouter()
const user = ref({ name: "", email: "" })
const orders = ref([])
const loadingOrders = ref(false)

// SEO e Identidade
onMounted(async () => {
  const stored = localStorage.getItem("user")
  if (!stored) return router.push("/login")

  user.value = JSON.parse(stored)
  
  // SEO: Muda o título da página dinamicamente para o Google indexar melhor
  document.title = `Perfil de ${user.value.name} | Ivy Privé`
  
  await fetchOrders()
})

const firstName = computed(() => user.value.name.split(" ")[0])
const totalSpent = computed(() => orders.value.reduce((acc, curr) => acc + (curr.total || 0), 0))

const fetchOrders = async () => {
  const token = localStorage.getItem("token")
  if (!token) return
  loadingOrders.value = true
  try {
    const { data } = await axios.get("http://localhost:3000/api/orders", {
      headers: { Authorization: `Bearer ${token}` }
    })
    orders.value = data
  } catch (err) {
    console.error("Erro SEO Pedidos:", err)
  } finally {
    loadingOrders.value = false
  }
}

const initials = computed(() => {
  if (!user.value.name) return "IV"
  return user.value.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
})

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" })
}

const statusLabel = (status) => {
  const labels = { pending: "Em Processamento", paid: "Pagamento Confirmado", shipped: "Em Trânsito" }
  return labels[status] || status
}

const logout = () => {
  localStorage.clear()
  router.push("/login")
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=Inter:wght@300;400;600&display=swap');

.profile-container {
  min-height: 100vh;
  background-color: #050505;
  color: #fff;
  padding: 60px 20px;
  font-family: 'Inter', sans-serif;
}

.luxury-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 40px;
}

/* SIDEBAR LUXO */
.sidebar-prive {
  background: rgba(15, 15, 15, 0.8);
  border: 1px solid rgba(212, 175, 55, 0.1);
  border-radius: 24px;
  padding: 40px 30px;
  backdrop-filter: blur(10px);
  height: fit-content;
  text-align: center;
}

.avatar-ring {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  padding: 4px;
  background: linear-gradient(135deg, #d4af37 0%, #8a6d1f 100%);
  margin: 0 auto 20px;
}

.avatar-core {
  width: 100%;
  height: 100%;
  background: #000;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-family: 'Cormorant Garamond', serif;
  color: #d4af37;
}

.user-name { font-family: 'Cormorant Garamond', serif; font-size: 24px; margin-bottom: 5px; }
.user-status { font-size: 11px; color: #d4af37; text-transform: uppercase; letter-spacing: 2px; display: flex; align-items: center; justify-content: center; gap: 8px; }
.pulse-dot { width: 6px; height: 6px; background: #d4af37; border-radius: 50%; box-shadow: 0 0 8px #d4af37; }

.sidebar-nav { margin-top: 40px; display: flex; flex-direction: column; gap: 10px; }
.nav-item {
  display: flex; align-items: center; gap: 12px;
  padding: 14px 20px; border-radius: 12px;
  background: transparent; border: none; color: #888;
  cursor: pointer; transition: 0.3s; font-size: 14px;
}
.nav-item.active, .nav-item:hover { background: rgba(212, 175, 55, 0.05); color: #d4af37; }
.nav-item.logout { margin-top: 20px; color: #ff4d4d; opacity: 0.7; }

/* CONTEÚDO */
.content-header h2 { font-family: 'Cormorant Garamond', serif; font-size: 42px; font-weight: 400; }
.content-header h2 span { color: #d4af37; }
.content-header p { color: #888; margin-top: 5px; }

.stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 30px 0; }
.stat-card {
  background: #111; border: 1px solid rgba(255,255,255,0.05);
  padding: 25px; border-radius: 16px; display: flex; flex-direction: column;
}
.stat-card .label { font-size: 11px; color: #888; text-transform: uppercase; margin-bottom: 8px; }
.stat-card .value { font-size: 24px; font-weight: 600; }
.value.accent { color: #d4af37; }

/* ORDERS NEW DESIGN */
.section-header { display: flex; align-items: center; gap: 20px; margin-bottom: 25px; }
.section-header h3 { font-family: 'Cormorant Garamond', serif; font-size: 24px; white-space: nowrap; }
.section-header .line { width: 100%; height: 1px; background: linear-gradient(90deg, rgba(212,175,55,0.3), transparent); }

.order-card-new {
  background: #0f0f0f; border: 1px solid rgba(255,255,255,0.05);
  border-radius: 20px; padding: 25px; margin-bottom: 20px;
  transition: 0.3s;
}
.order-card-new:hover { border-color: rgba(212, 175, 55, 0.3); transform: translateY(-3px); }

.order-main-info { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.id-label { font-size: 12px; font-weight: 600; color: #d4af37; display: block; }
.date { font-size: 12px; color: #555; }

.order-status-badge { font-size: 10px; text-transform: uppercase; padding: 6px 14px; border-radius: 50px; font-weight: 600; letter-spacing: 1px; }
.order-status-badge.paid { background: rgba(34,197,94,0.1); color: #22c55e; border: 1px solid rgba(34,197,94,0.2); }
.order-status-badge.pending { background: rgba(234,179,8,0.1); color: #eab308; border: 1px solid rgba(234,179,8,0.2); }

.order-items-preview { padding: 15px 0; border-top: 1px solid rgba(255,255,255,0.03); }
.preview-item { display: flex; justify-content: space-between; font-size: 14px; color: #ccc; margin-bottom: 5px; }
.item-qty { color: #555; }

.order-footer-new { display: flex; justify-content: space-between; align-items: center; margin-top: 15px; }
.total-price span { font-size: 11px; color: #888; display: block; }
.total-price strong { font-size: 18px; color: #fff; }

.btn-details {
  background: transparent; border: 1px solid #333; color: #fff;
  padding: 10px 20px; border-radius: 8px; font-size: 12px; cursor: pointer; transition: 0.3s;
}
.btn-details:hover { background: #fff; color: #000; }

.empty-orders { text-align: center; padding: 60px; color: #555; }
.btn-shop { display: inline-block; margin-top: 20px; color: #d4af37; text-decoration: none; font-size: 14px; border-bottom: 1px solid #d4af37; }

@media (max-width: 992px) {
  .luxury-wrapper { grid-template-columns: 1fr; }
  .sidebar-prive { height: auto; }
}
</style>