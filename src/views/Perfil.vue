<template>
  <div class="vivara-container">
    <div class="content-wrapper">
      <header class="page-header">
        <nav class="breadcrumb">Início / Minha Conta</nav>
        <h1>Meu Perfil</h1>
      </header>

      <!-- Estado de Carregamento: Evita que o código quebre antes da API responder -->
      <div v-if="loading" class="loading-state">
        <p>Carregando informações da Maison...</p>
      </div>

      <section v-else class="profile-section">
        <h2 class="section-title">Dados da Conta</h2>
        
        <div class="vivara-table">
          <!-- Linha Nome -->
          <div class="t-row">
            <div class="t-label">Nome Completo</div>
            <div class="t-value">
              <input v-model="form.name" type="text" placeholder="Insira seu nome">
            </div>
          </div>

          <!-- Linha Email -->
          <div class="t-row">
            <div class="t-label">E-mail</div>
            <div class="t-value">
              <input v-model="form.email" type="email" placeholder="seu@email.com">
            </div>
          </div>

          <!-- Linha Senha -->
          <div class="t-row">
            <div class="t-label">Nova Senha</div>
            <div class="t-value">
              <input v-model="form.password" type="password" placeholder="••••••••">
            </div>
          </div>
        </div>

        <div class="button-group">
          <button class="btn-save" @click="updateUser">SALVAR ALTERAÇÕES</button>
          <button class="btn-logout" @click="logout">ENCERRAR SESSÃO</button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(true)

// Inicializamos com campos vazios para o Vue não dar erro de 'undefined'
const form = ref({
  name: '',
  email: '',
  password: ''
})

onMounted(async () => {
  try {
    const { data } = await api.get('/auth/me')
    if (data) {
      form.value.name = data.name || ''
      form.value.email = data.email || ''
    }
  } catch (err) {
    console.error("Erro ao carregar perfil:", err)
    // Se não houver token ou usuário, volta para o início
    if (err.response?.status === 401) router.push('/')
  } finally {
    loading.value = false
  }
})

const updateUser = async () => {
  try {
    const { data } = await api.put('/auth/me', form.value)
    form.value.name = data.name
    form.value.email = data.email
    form.value.password = ''
    alert("Dados atualizados com sucesso.")
  } catch (err) {
    console.error(err)
    alert("Erro ao atualizar dados.")
  }
}

const logout = () => {
  localStorage.clear()
  router.push('/')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600&family=Playfair+Display:wght@400;500&display=swap');

.vivara-container {
  background-color: #ffffff;
  min-height: 100vh;
  padding: 80px 20px;
  color: #1a1a1a;
  font-family: 'Montserrat', sans-serif;
}

.content-wrapper {
  max-width: 850px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 60px;
}

.breadcrumb {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: #999;
  margin-bottom: 10px;
}

.page-header h1 {
  font-family: 'Playfair Display', serif;
  font-size: 40px;
  font-weight: 400;
  letter-spacing: 1px;
}

.section-title {
  font-family: 'Playfair Display', serif;
  font-size: 20px;
  margin-bottom: 25px;
  font-weight: 400;
  color: #333;
}

/* Estrutura de Tabela Limpa */
.vivara-table {
  border-top: 1.5px solid #000;
  margin-bottom: 50px;
}

.t-row {
  display: flex;
  border-bottom: 1px solid #f2f2f2;
  align-items: center;
  min-height: 75px;
}

.t-label {
  width: 200px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 600;
  color: #666;
}

.t-value {
  flex-grow: 1;
}

.t-value input {
  width: 100%;
  border: none;
  padding: 15px;
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
  color: #000;
  outline: none;
  background: transparent;
}

/* Botões Estilo Joalheria */
.button-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

button {
  width: 100%;
  max-width: 380px;
  padding: 18px;
  font-size: 11px;
  letter-spacing: 3px;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  transition: 0.3s ease;
}

.btn-save {
  background-color: #000;
  color: #fff;
  border: 1px solid #000;
}

.btn-save:hover {
  background-color: #333;
}

.btn-logout {
  background-color: transparent;
  color: #000;
  border: 1px solid #ddd;
}

.btn-logout:hover {
  border-color: #000;
}

.loading-state {
  text-align: center;
  padding: 100px;
  font-style: italic;
  color: #888;
}

@media (max-width: 600px) {
  .t-row {
    flex-direction: column;
    align-items: flex-start;
    padding: 15px 0;
  }
  .t-label {
    margin-bottom: 5px;
  }
}
</style>