<template>
  <div class="login-page">
    <div class="login-card">
      <div class="brand">
        <span class="brand-text">IVY</span>
        <span class="brand-sub">Painel Administrativo</span>
      </div>

      <div class="form-group">
        <label>Email</label>
        <input v-model="email" type="email" placeholder="admin@ivy.com" @keyup.enter="login" />
      </div>

      <div class="form-group">
        <label>Senha</label>
        <input v-model="password" type="password" placeholder="••••••••" @keyup.enter="login" />
      </div>

      <p v-if="error" class="error">{{ error }}</p>

      <button class="login-btn" @click="login" :disabled="loading">
        <span v-if="loading">Entrando...</span>
        <span v-else>Entrar</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const login = async () => {
  if (!email.value || !password.value) {
    error.value = 'Preencha todos os campos'
    return
  }
  loading.value = true
  error.value = ''
  try {
    const res = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, password: password.value })
    })
    const data = await res.json()
    if (!res.ok) { error.value = data.message || 'Credenciais inválidas'; return }

    const payload = JSON.parse(atob(data.token.split('.')[1]))
    if (payload.role !== 'admin') {
      error.value = 'Acesso negado: sem permissão de administrador'
      return
    }

    localStorage.setItem('token', data.token)
    localStorage.setItem('adminUser', JSON.stringify({ name: data.user?.name || payload.name || 'Admin', role: 'admin' }))
    router.push('/admin')
  } catch {
    error.value = 'Erro de conexão com o servidor'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: #0a0a0a;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Montserrat', sans-serif;
}
.login-card {
  background: #111;
  border: 1px solid #222;
  border-radius: 28px;
  padding: 50px 44px;
  width: 100%;
  max-width: 420px;
}
.brand {
  text-align: center;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.brand-text {
  font-family: 'Playfair Display', serif;
  color: #c9a96e;
  font-size: 2.2rem;
  letter-spacing: 8px;
}
.brand-sub {
  color: #555;
  font-size: 0.75rem;
  letter-spacing: 2px;
  text-transform: uppercase;
}
.form-group {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.form-group label {
  color: #888;
  font-size: 0.78rem;
  letter-spacing: 1px;
  text-transform: uppercase;
}
.form-group input {
  height: 54px;
  background: #0f0f0f;
  border: 1px solid #2a2a2a;
  border-radius: 14px;
  padding: 0 18px;
  color: #e0e0e0;
  font-size: 0.95rem;
  font-family: 'Montserrat', sans-serif;
  transition: border-color 0.2s;
  outline: none;
}
.form-group input:focus { border-color: #c9a96e; }
.error { color: #e74c3c; font-size: 0.85rem; margin-bottom: 16px; text-align: center; }
.login-btn {
  width: 100%;
  height: 54px;
  background: #c9a96e;
  border: none;
  border-radius: 14px;
  color: #000;
  font-weight: 700;
  font-size: 0.95rem;
  font-family: 'Montserrat', sans-serif;
  cursor: pointer;
  letter-spacing: 1px;
  margin-top: 8px;
  transition: opacity 0.2s;
}
.login-btn:disabled { opacity: 0.6; cursor: not-allowed; }
.login-btn:hover:not(:disabled) { opacity: 0.9; }
</style>
