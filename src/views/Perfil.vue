<template>
  <div class="luxury-page">

    <div class="luxury-card">

      <!-- SIDEBAR -->
      <aside class="luxury-sidebar">

        <div class="avatar">
          {{ initials }}
        </div>

        <h2 class="name">{{ user.name }}</h2>
        <p class="email">{{ user.email }}</p>

        <div class="badge">
          Cliente Ivy Privé
        </div>

        <button class="logout" @click="logout">
          Encerrar sessão
        </button>

      </aside>

      <!-- CONTENT -->
      <main class="luxury-content">

        <h3>Minha conta</h3>

        <div class="card">
          <div class="row">
            <span>Nome</span>
            <strong>{{ user.name }}</strong>
          </div>

          <div class="row">
            <span>Email</span>
            <strong>{{ user.email }}</strong>
          </div>

          <div class="row">
            <span>Status</span>
            <strong class="active">Ativo</strong>
          </div>
        </div>

        <div class="card soft">
          <h4>Experiência Ivy</h4>
          <p>
            Sua conta faz parte da experiência exclusiva de joalheria Ivy.
            Em breve você terá acesso ao seu histórico de peças adquiridas.
          </p>
        </div>

        <div class="card soft">
          <h4>Atendimento Personalizado</h4>
          <p>
            Clientes Ivy recebem suporte prioritário para ajustes, garantia e personalização de peças.
          </p>
        </div>

      </main>

    </div>

  </div>
</template>
<script setup>
import { ref, computed, onMounted } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

const user = ref({
  name: "",
  email: ""
})

onMounted(() => {
  const stored = localStorage.getItem("user")

  if (!stored) {
    router.push("/login")
    return
  }

  try {
    user.value = JSON.parse(stored)
  } catch {
    router.push("/login")
  }
})

const initials = computed(() => {
  if (!user.value.name) return "IV"

  return user.value.name
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
})

const logout = () => {
  localStorage.removeItem("user")
  localStorage.removeItem("token")

  router.push("/login")
}
</script>
<style scoped>
.luxury-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at top, #0a0a0a, #000);
  font-family: "Inter", sans-serif;
  padding: 40px;
}

/* CARD PRINCIPAL */
.luxury-card {
  display: grid;
  grid-template-columns: 320px 1fr;
  width: 920px;
  border-radius: 18px;
  overflow: hidden;
  background: #0f0f0f;
  box-shadow: 0 30px 80px rgba(0,0,0,0.7);
  border: 1px solid rgba(212, 175, 55, 0.1);
}

/* SIDEBAR */
.luxury-sidebar {
  background: #0a0a0a;
  padding: 35px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border-right: 1px solid rgba(212, 175, 55, 0.08);
}

.avatar {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: linear-gradient(135deg, #d4af37, #8a6d1f);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  font-weight: bold;
  color: #111;
  margin-bottom: 15px;
}

.name {
  color: #fff;
  font-size: 18px;
  margin: 0;
}

.email {
  color: #aaa;
  font-size: 12px;
  margin-bottom: 15px;
}

.badge {
  font-size: 11px;
  color: #d4af37;
  border: 1px solid rgba(212,175,55,0.3);
  padding: 6px 12px;
  border-radius: 50px;
  margin-bottom: 30px;
}

.logout {
  margin-top: auto;
  width: 100%;
  padding: 12px;
  border: 1px solid rgba(212,175,55,0.3);
  background: transparent;
  color: #d4af37;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;
}

.logout:hover {
  background: rgba(212,175,55,0.1);
}

/* CONTENT */
.luxury-content {
  padding: 35px;
  background: #111;
}

.luxury-content h3 {
  color: #d4af37;
  margin-bottom: 20px;
  font-weight: 400;
  letter-spacing: 1px;
}

/* CARDS */
.card {
  background: #0f0f0f;
  padding: 18px;
  border-radius: 12px;
  margin-bottom: 15px;
  border: 1px solid rgba(255,255,255,0.05);
}

.row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  font-size: 13px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}

.row:last-child {
  border-bottom: none;
}

.row span {
  color: #888;
}

.row strong {
  color: #fff;
}

.active {
  color: #2ecc71;
}

/* INFO CARDS */
.card.soft {
  border: 1px solid rgba(212,175,55,0.1);
}

.card.soft h4 {
  color: #d4af37;
  margin-bottom: 8px;
  font-weight: 400;
}

.card.soft p {
  color: #bbb;
  font-size: 13px;
  line-height: 1.5;
}
</style>