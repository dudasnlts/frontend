<template>
  <div class="auth-scene">
    <!-- PAINEL VISUAL (EDITORIAL) -->
    <div class="auth-visual">
      <div class="visual-overlay"></div>
      <div class="visual-content">
        <div class="brand-badge">EST. 2024</div>
        <span class="visual-tag">Coleção Heritage</span>
        <h2 class="visual-title">Onde a arte<br/>encontra o <em>eterno</em></h2>
        <p class="visual-sub">Sua jornada na alta joalheria começa com um olhar exclusivo.</p>
        
        <div class="feature-list">
          <div class="feature-item">
            <span class="dot"></span>
            <p>Curadoria de Diamantes Certificados</p>
          </div>
          <div class="feature-item">
            <span class="dot"></span>
            <p>Atendimento VIP Personalizado</p>
          </div>
        </div>
      </div>
      <!-- Elemento decorativo flutuante -->
      <div class="floating-shape"></div>
    </div>

    <!-- PAINEL DO FORMULÁRIO (CLEAN LUXURY) -->
    <div class="auth-panel">
      <div class="auth-inner">
        <header class="auth-header">
          <router-link to="/" class="auth-logo">IVY</router-link>
          <p class="auth-welcome">Bem-vindo à nossa Maison.</p>
        </header>

        <div class="auth-tabs">
          <button :class="{ active: !isRegistering }" @click="switchMode(false)">Entrar</button>
          <button :class="{ active: isRegistering }" @click="switchMode(true)">Cadastrar</button>
          <div class="tab-indicator" :style="{ transform: isRegistering ? 'translateX(100%)' : 'translateX(0)' }"></div>
        </div>

        <Transition name="page-slide" mode="out-in">
          <form :key="isRegistering ? 'register' : 'login'" @submit.prevent="handleAuth" class="auth-form">
            
            <div v-if="isRegistering" class="field-group">
              <label>Nome Completo</label>
              <div class="field-wrap">
                <input v-model="form.name" type="text" placeholder="Como deseja ser chamado?" />
              </div>
            </div>

            <div class="field-group">
              <label>E-mail</label>
              <div class="field-wrap">
                <input v-model="form.email" type="email" placeholder="exemplo@maisonivy.com" required />
              </div>
            </div>

            <div class="field-group">
              <div class="label-row">
                <label>Senha</label>
                <a v-if="!isRegistering" href="#" class="forgot-link">Esqueceu?</a>
              </div>
              <div class="field-wrap">
                <input v-model="form.password" :type="showPw ? 'text' : 'password'" placeholder="Sua senha secreta" required />
                <button type="button" class="toggle-pw" @click="showPw = !showPw">
                  <span v-if="!showPw">MOSTRAR</span>
                  <span v-else>OCULTAR</span>
                </button>
              </div>
            </div>

            <!-- Feedback de Erro/Sucesso -->
            <div v-if="error" class="message error">{{ error }}</div>
            <div v-if="successMsg" class="message success">{{ successMsg }}</div>

            <button type="submit" class="btn-primary" :disabled="loading">
              <span v-if="!loading">{{ isRegistering ? 'Criar Conta Exclusiva' : 'Acessar Conta' }}</span>
              <div v-else class="loader"></div>
            </button>

            <div class="divider-row">
              <span>Ou use suas redes</span>
            </div>

            <div class="social-row">
              <button type="button" class="btn-social" @click="loginGoogle">Google</button>
              <button type="button" class="btn-social" @click="loginApple">Apple</button>
            </div>
          </form>
        </Transition>

        <footer class="auth-footer">
          <p>Ao entrar, você aceita nossos <a href="#">Termos de Luxo</a> e <a href="#">Privacidade</a>.</p>
        </footer>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,500;1,400&family=Montserrat:wght@300;400;500&display=swap');

/* Variáveis de Estilo */
:host {
  --gold: #c5a059;
  --dark: #121212;
  --bg-soft: #fcfbf9;
}

.auth-scene {
  display: flex;
  min-height: 100vh;
  background: #fff;
  font-family: 'Montserrat', sans-serif;
  color: var(--dark);
}

/* --- PAINEL VISUAL --- */
.auth-visual {
  flex: 1.2;
  position: relative;
  background-color: #0f1115;
  background-image: url('https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=2069&auto=format&fit=crop'); /* Imagem de joia luxuosa */
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  padding: 80px;
  overflow: hidden;
}

.visual-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, rgba(15,17,21,0.95) 20%, rgba(15,17,21,0.4));
}

.visual-content {
  position: relative;
  z-index: 10;
  max-width: 500px;
}

.brand-badge {
  font-size: 10px;
  letter-spacing: 3px;
  border: 1px solid rgba(255,255,255,0.2);
  display: inline-block;
  padding: 4px 12px;
  color: #c5a059;
  margin-bottom: 30px;
}

.visual-tag {
  display: block;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 4px;
  color: rgba(255,255,255,0.5);
  margin-bottom: 15px;
}

.visual-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(40px, 5vw, 64px);
  color: #fff;
  line-height: 1;
  font-weight: 300;
  margin-bottom: 25px;
}

.visual-title em {
  font-style: italic;
  color: #c5a059;
}

.visual-sub {
  color: rgba(255,255,255,0.6);
  font-weight: 300;
  line-height: 1.6;
  margin-bottom: 40px;
}

.feature-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 12px;
  color: rgba(255,255,255,0.8);
  font-size: 13px;
}

.dot {
  width: 6px;
  height: 6px;
  background: #c5a059;
  border-radius: 50%;
}

/* --- PAINEL FORMULÁRIO --- */
.auth-panel {
  flex: 1;
  background: var(--bg-soft);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.auth-inner {
  width: 100%;
  max-width: 400px;
}

.auth-header {
  text-align: center;
  margin-bottom: 50px;
}

.auth-logo {
  font-family: 'Cormorant Garamond', serif;
  font-size: 42px;
  letter-spacing: 12px;
  color: var(--dark);
  text-decoration: none;
  font-weight: 500;
}

.auth-welcome {
  font-size: 12px;
  color: #888;
  margin-top: 10px;
  letter-spacing: 1px;
}

/* ABAS ESTILIZADAS */
.auth-tabs {
  display: flex;
  background: #f0ede8;
  padding: 5px;
  border-radius: 50px;
  position: relative;
  margin-bottom: 40px;
}

.auth-tabs button {
  flex: 1;
  padding: 12px;
  border: none;
  background: none;
  font-size: 12px;
  font-weight: 600;
  color: #999;
  cursor: pointer;
  z-index: 1;
  transition: 0.4s;
}

.auth-tabs button.active {
  color: var(--dark);
}

.tab-indicator {
  position: absolute;
  width: calc(50% - 5px);
  height: calc(100% - 10px);
  background: #fff;
  border-radius: 50px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  transition: 0.5s cubic-bezier(0.19, 1, 0.22, 1);
}

/* CAMPOS DE ENTRADA */
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.field-group label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #555;
  margin-bottom: 8px;
  display: block;
}

.label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.field-wrap {
  border-bottom: 1px solid #dcdad5;
  display: flex;
  align-items: center;
  transition: 0.3s;
}

.field-wrap:focus-within {
  border-color: var(--dark);
}

.field-wrap input {
  flex: 1;
  border: none;
  padding: 12px 0;
  background: transparent;
  font-family: inherit;
  font-size: 14px;
  outline: none;
}

.toggle-pw {
  background: none;
  border: none;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 1px;
  color: #aaa;
  cursor: pointer;
}

.forgot-link {
  font-size: 11px;
  color: #999;
  text-decoration: none;
}

/* BOTÕES */
.btn-primary {
  background: var(--dark);
  color: white;
  border: none;
  padding: 18px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  cursor: pointer;
  transition: 0.3s;
  margin-top: 10px;
}

.btn-primary:hover {
  background: #2a2a2a;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

.divider-row {
  text-align: center;
  position: relative;
  margin: 10px 0;
}

.divider-row span {
  font-size: 10px;
  color: #bbb;
  background: var(--bg-soft);
  padding: 0 15px;
  position: relative;
  z-index: 1;
}

.divider-row::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 1px;
  background: #e0e0e0;
  left: 0;
  top: 50%;
}

.social-row {
  display: flex;
  gap: 15px;
}

.btn-social {
  flex: 1;
  padding: 12px;
  border: 1px solid #e0e0e0;
  background: #fff;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: 0.3s;
}

.btn-social:hover {
  border-color: var(--dark);
  background: #f9f9f9;
}

/* MENSAGENS */
.message {
  font-size: 12px;
  padding: 10px;
  border-radius: 4px;
}
.error { color: #a94442; background: #f2dede; }
.success { color: #3c763d; background: #dff0d8; }

.auth-footer {
  margin-top: 40px;
  text-align: center;
  font-size: 11px;
  color: #999;
  line-height: 1.8;
}

.auth-footer a {
  color: var(--dark);
  text-decoration: underline;
}

/* ANIMAÇÕES */
.page-slide-enter-active, .page-slide-leave-active {
  transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.page-slide-enter-from { opacity: 0; transform: translateY(20px); }
.page-slide-leave-to { opacity: 0; transform: translateY(-20px); }

@media (max-width: 1024px) {
  .auth-visual { display: none; }
}

.loader {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>