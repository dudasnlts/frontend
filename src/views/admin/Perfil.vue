<template>
  <div class="perfil">

    <h1>Meu Perfil</h1>

    <form @submit.prevent="updateUser">

      <input v-model="form.name" placeholder="Nome" />
      <input v-model="form.email" placeholder="Email" />
      <input v-model="form.password" placeholder="Nova senha" type="password" />

      <button>Salvar alterações</button>

    </form>

    <button @click="logout">Sair</button>

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