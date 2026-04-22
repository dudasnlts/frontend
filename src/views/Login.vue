<template>
  <div class="page">
    <div class="container">

      <div class="brand">
        <h1>IVY</h1>
        <p>{{ isRegistering ? 'Crie sua conta' : 'Bem-vindo de volta' }}</p>
      </div>

      <form class="form" @submit.prevent="handleAuth">

        <div v-if="isRegistering" class="field">
          <input v-model="authForm.name" type="text" required />
          <label>Nome completo</label>
        </div>

        <div class="field">
          <input v-model="authForm.email" type="email" required />
          <label>Email</label>
        </div>

        <div class="field">
          <input v-model="authForm.password" type="password" required />
          <label>Senha</label>
        </div>

        <button class="btn" :disabled="loading">
          <span v-if="!loading">
            {{ isRegistering ? 'Criar conta' : 'Entrar' }}
          </span>
          <span v-else class="loader"></span>
        </button>

        <p class="switch" @click="toggleMode">
          {{ isRegistering ? 'Já tem conta? Entrar' : 'Criar conta' }}
        </p>

        <p v-if="error" class="error">{{ error }}</p>

      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const isRegistering = ref(false)
const loading = ref(false)
const error = ref('')

const authForm = reactive({
  name: '',
  email: '',
  password: ''
})

// 🔥 limpa sessão ao entrar na tela (resolve seu problema)
onMounted(() => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
})

const toggleMode = () => {
  isRegistering.value = !isRegistering.value
  error.value = ''
}

const handleAuth = async () => {
  loading.value = true
  error.value = ''

  try {
    const endpoint = isRegistering.value ? 'register' : 'login'

    const { data } = await axios.post(
      `http://localhost:3000/auth/${endpoint}`,
      authForm
    )

    // ✅ REGISTRO
    if (isRegistering.value) {
      isRegistering.value = false
      authForm.password = ''
      error.value = 'Conta criada com sucesso! Faça login.'
      return
    }

    // ✅ LOGIN
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))

    // 🔥 redireciona
    router.push('/perfil')

  } catch (err) {
    console.error(err)

    error.value =
      err.response?.data?.message ||
      'Erro ao autenticar. Tente novamente.'
  } finally {
    loading.value = false
  }
}
</script>

<style>
.page {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0b0f19;
  font-family: Inter, sans-serif;
}

.container {
  width: 380px;
  padding: 40px;
}

.brand {
  margin-bottom: 40px;
}

.brand h1 {
  font-size: 26px;
  letter-spacing: 6px;
  color: white;
}

.brand p {
  margin-top: 8px;
  font-size: 13px;
  color: #9ca3af;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.field {
  position: relative;
}

.field input {
  width: 100%;
  padding: 14px 12px;
  border-radius: 10px;
  border: 1px solid #1f2937;
  background: #0f172a;
  color: white;
  outline: none;
}

.field input:focus {
  border-color: #4f46e5;
  background: #111c33;
}

.field label {
  position: absolute;
  left: 12px;
  top: 14px;
  font-size: 13px;
  color: #6b7280;
  transition: 0.2s;
}

.field input:focus + label,
.field input:valid + label {
  top: -8px;
  font-size: 11px;
  color: #4f46e5;
  background: #0b0f19;
  padding: 0 6px;
}

.btn {
  margin-top: 10px;
  padding: 14px;
  border-radius: 10px;
  border: none;
  background: #4f46e5;
  color: white;
  font-weight: 600;
  cursor: pointer;
}

.loader {
  width: 16px;
  height: 16px;
  border: 2px solid white;
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.switch {
  font-size: 12px;
  color: #9ca3af;
  cursor: pointer;
}

.error {
  color: #ef4444;
  font-size: 12px;
}
</style>