<template>
  <main class="support-portal">
    <div class="content-wrapper">
      
      <nav class="top-nav">
        <div class="logo">Support<span>Ivy</span></div>
        <div class="nav-status">
          <span class="pulse-dot"></span>
          Sistemas Operacionais
        </div>
      </nav>

      <header class="hero-section">
        <h1>Central de Suporte</h1>
        <p>Encontre soluções rápidas ou fale com nossa equipe de especialistas.</p>
        
        <div class="search-bar">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input type="text" placeholder="Como podemos ajudar você hoje?">
        </div>
      </header>

      <section class="channels-grid">
        <div class="channel-card primary" @click="abrirWhatsApp">
          <div class="card-header">
            <div class="icon-box">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
            </div>
            <span class="tag">Tempo real</span>
          </div>
          <div class="card-body">
            <h3>Atendimento via WhatsApp</h3>
            <p>Conecte-se instantaneamente com nosso suporte prioritário.</p>
          </div>
          <div class="card-footer">
            <span>Iniciar conversa</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
          </div>
        </div>

        <div class="channel-card" @click="enviarEmail">
          <div class="card-header">
            <div class="icon-box secondary">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </div>
          </div>
          <div class="card-body">
            <h3>Suporte via E-mail</h3>
            <p>Para dúvidas complexas ou registros formais de tickets.</p>
          </div>
          <div class="card-footer">
            <span>Enviar ticket</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
          </div>
        </div>
      </section>

      <section class="self-service">
        <h2 class="section-title">Gerenciamento de Conta</h2>
        <div class="actions-list">
          <div class="action-item" @click="irPedidos">
            <div class="action-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
            </div>
            <div class="action-label">Rastrear mercadoria</div>
            <div class="action-arrow">→</div>
          </div>
          
          <div class="action-item" @click="irTrocas">
            <div class="action-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
            </div>
            <div class="action-label">Trocas e Devoluções</div>
            <div class="action-arrow">→</div>
          </div>
        </div>
      </section>

    </div>
  </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.support-portal {
  --primary: #000000;
  --accent: #2563eb;
  --bg: #ffffff;
  --border: #e5e7eb;
  --text-main: #111827;
  --text-muted: #6b7280;
  
  min-height: 100vh;
  background-color: var(--bg);
  font-family: 'Inter', sans-serif;
  color: var(--text-main);
  padding-bottom: 80px;
}

.content-wrapper {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 24px;
}

/* NAV */
.top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px 0;
}

.logo {
  font-weight: 700;
  font-size: 20px;
  letter-spacing: -1px;
}

.logo span { color: var(--accent); }

.nav-status {
  font-size: 13px;
  font-weight: 500;
  color: #059669;
  background: #ecfdf5;
  padding: 6px 12px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.pulse-dot {
  width: 6px;
  height: 6px;
  background: #059669;
  border-radius: 50%;
  box-shadow: 0 0 0 0 rgba(5, 150, 105, 0.4);
  animation: pulse 2s infinite;
}

/* HERO */
.hero-section {
  padding: 60px 0;
  text-align: center;
}

.hero-section h1 {
  font-size: 48px;
  font-weight: 800;
  letter-spacing: -2px;
  margin-bottom: 16px;
}

.hero-section p {
  font-size: 18px;
  color: var(--text-muted);
  max-width: 500px;
  margin: 0 auto 40px;
}

.search-bar {
  max-width: 540px;
  margin: 0 auto;
  position: relative;
  display: flex;
  align-items: center;
}

.search-bar svg {
  position: absolute;
  left: 20px;
  color: var(--text-muted);
}

.search-bar input {
  width: 100%;
  padding: 18px 20px 18px 54px;
  border-radius: 14px;
  border: 1px solid var(--border);
  font-size: 16px;
  transition: all 0.2s;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
}

.search-bar input:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
}

/* CARDS GRID */
.channels-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 60px;
}

.channel-card {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 32px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
}

.channel-card.primary {
  background: #fcfcfd;
  border-color: #000;
}

.channel-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0,0,0,0.05);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
}

.icon-box {
  width: 48px;
  height: 48px;
  background: var(--primary);
  color: #fff;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-box.secondary {
  background: #f3f4f6;
  color: var(--text-main);
}

.tag {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  background: #000;
  color: #fff;
  padding: 4px 10px;
  border-radius: 6px;
}

.card-body h3 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
}

.card-body p {
  color: var(--text-muted);
  font-size: 15px;
  line-height: 1.6;
  margin-bottom: 32px;
}

.card-footer {
  margin-top: auto;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 15px;
}

/* ACTIONS LIST */
.section-title {
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--text-muted);
  letter-spacing: 1px;
  margin-bottom: 20px;
}

.actions-list {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 20px;
  overflow: hidden;
}

.action-item {
  display: flex;
  align-items: center;
  padding: 20px 24px;
  cursor: pointer;
  transition: all 0.2s;
}

.action-item:not(:last-child) {
  border-bottom: 1px solid var(--border);
}

.action-item:hover {
  background: #f9fafb;
}

.action-icon {
  width: 36px;
  height: 36px;
  background: #f3f4f6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
}

.action-label {
  flex: 1;
  font-weight: 500;
  font-size: 16px;
}

.action-arrow {
  color: var(--border);
  font-size: 18px;
  transition: 0.2s;
}

.action-item:hover .action-arrow {
  transform: translateX(5px);
  color: var(--primary);
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(5, 150, 105, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(5, 150, 105, 0); }
  100% { box-shadow: 0 0 0 0 rgba(5, 150, 105, 0); }
}

@media (max-width: 640px) {
  .channels-grid { grid-template-columns: 1fr; }
  .hero-section h1 { font-size: 32px; }
}
</style>