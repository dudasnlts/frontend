<template>
  <div class="perfil">

    <div class="perfil-card">

      <h1>Meu Perfil</h1>
      <p class="sub">Gerencie suas informações pessoais</p>

      <form @submit.prevent="updateUser" class="form">

        <div class="input-group">
          <label>Nome</label>
          <input v-model="form.name" placeholder="Seu nome" />
        </div>

        <div class="input-group">
          <label>Email</label>
          <input v-model="form.email" placeholder="Seu email" />
        </div>

        <div class="input-group">
          <label>Nova senha</label>
          <input v-model="form.password" placeholder="Digite uma nova senha" type="password" />
        </div>

        <button class="btn-save">Salvar alterações</button>

      </form>

      <button class="btn-logout" @click="logout">Sair da conta</button>

    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  name: '',
  email: '',
  password: ''
})

onMounted(async () => {
  const { data } = await api.get('/auth/me')

  form.value.name = data.name
  form.value.email = data.email
})

const updateUser = async () => {
  try {
    const { data } = await api.put('/auth/me', form.value)

    form.value.name = data.name
    form.value.email = data.email
    form.value.password = ''

    alert("Atualizado com sucesso!")
  } catch (err) {
    console.log(err)
  }
}

const logout = () => {
  localStorage.clear()
  router.push('/')
}
</script>

<style scoped>
.perfil {
  min-height: 100vh;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  font-family: Arial, sans-serif;
}

.perfil-card {
  width: 100%;
  max-width: 520px;
  background: #ffffff;
  border: 2px solid #0d1b2a;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
}

h1 {
  color: #0d1b2a;
  margin-bottom: 5px;
}

.sub {
  color: #3a86ff;
  font-size: 14px;
  margin-bottom: 25px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

label {
  font-size: 13px;
  color: #0d1b2a;
  font-weight: 600;
}

input {
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #d9d9d9;
  outline: none;
  transition: 0.3s;
  background: #fff;
}

input:focus {
  border-color: #3a86ff;
  box-shadow: 0 0 0 3px rgba(58,134,255,0.15);
}

.btn-save {
  margin-top: 10px;
  padding: 12px;
  background: #3a86ff;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;
}

.btn-save:hover {
  background: #265df2;
}

.btn-logout {
  margin-top: 15px;
  width: 100%;
  padding: 12px;
  background: #0d1b2a;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;
}

.btn-logout:hover {
  background: #000;
}
</style>