<template>
  <div class="perfil">

    <h1>Meu Perfil</h1>

    <form @submit.prevent="updateUser">

      <input v-model="form.name" placeholder="Nome" />
      <input v-model="form.email" placeholder="Email" />
      <input v-model="form.password" placeholder="Nova senha" type="password" />

      <button>Salvar alterações</button>

    </form>

    <button class="logout" @click="logout">Sair</button>

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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 18px;
  font-family: Arial, sans-serif;
}

/* título */
h1 {
  color: #0d1b2a;
  font-size: 28px;
  margin-bottom: 10px;
  position: relative;
}

h1::after {
  content: "";
  width: 60px;
  height: 3px;
  background: #3a86ff;
  display: block;
  margin: 8px auto 0;
  border-radius: 10px;
}

/* form */
form {
  background: #ffffff;
  border: 1px solid #0d1b2a;
  padding: 30px;
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 320px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.08);
}

/* inputs */
input {
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #dcdcdc;
  outline: none;
  transition: 0.3s;
  color: #0d1b2a;
}

input:focus {
  border-color: #3a86ff;
  box-shadow: 0 0 0 3px rgba(58,134,255,0.15);
}

/* botão salvar */
button {
  padding: 12px;
  border-radius: 10px;
  border: none;
  background: #3a86ff;
  color: #ffffff;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background: #265df2;
}

/* logout */
.logout {
  width: 320px;
  background: #0d1b2a;
}

.logout:hover {
  background: #000000;
}
</style>