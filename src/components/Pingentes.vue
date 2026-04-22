<template>
  <div class="pagina-pingentes">
    <header class="header">
      <div class="logo-area">
        <h1>PINGENTES IVY</h1>
        <div class="divider"></div>
        <p class="sub">Elegância e brilho em cada detalhe</p>
      </div>
    </header>

    <nav class="filtros" aria-label="Filtros de busca">
      <div class="search-box">
        <span class="icon"></span>
        <input v-model.trim="busca" type="text" placeholder="O que você procura?" aria-label="Buscar" />
      </div>

      <div class="select-wrapper">
        <select v-model="ordenar" aria-label="Ordenar produtos">
          <option value="">Ordenar por</option>
          <option value="menor">Menor preço</option>
          <option value="maior">Maior preço</option>
        </select>
      </div>
    </nav>

    <main class="container">
      <TransitionGroup name="list" tag="section" class="grid">
        <article 
          class="card" 
          v-for="pingente in pingentesFiltrados" 
          :key="pingente.id"
        >
          <div class="image-wrapper" @click="abrirModal(pingente)">
            <img :src="pingente.imagem" :alt="pingente.nome" loading="lazy" />
        
          </div>
          
          <div class="card-info">
            <h3>{{ pingente.nome }}</h3>
            <p class="price">{{ formatarPreco(pingente.preco) }}</p>
            <button class="btn-primary" @click="abrirModal(pingente)">
              Ver detalhes
            </button>
          </div>
        </article>
      </TransitionGroup>

      <div v-if="pingentesFiltrados.length === 0" class="empty-state">
        <p>Não encontramos nenhum pingente chamado "<strong>{{ busca }}</strong>"</p>
        <button @click="busca = ''" class="btn-link">Limpar busca</button>
      </div>
    </main>

    <Transition name="modal-fade">
      <div v-if="produtoSelecionado" class="modal-overlay" @click.self="fecharModal">
        <div class="modal-content" role="dialog">
          <button class="close-x" @click="fecharModal" aria-label="Fechar">&times;</button>
          
          <div class="modal-body">
            <div class="modal-image-container">
              <img :src="produtoSelecionado.imagem" :alt="produtoSelecionado.nome" />
            </div>

            <div class="modal-details">
              <span class="badge">Lançamento</span>
              <h2>{{ produtoSelecionado.nome }}</h2>
              <p class="modal-price">{{ formatarPreco(produtoSelecionado.preco) }}</p>
              <p class="description">
                Confeccionado em <strong>Prata 925</strong> com banho de ródio. 
                Design exclusivo IVY com garantia vitalícia de autenticidade.
              </p>
              
              <div class="actions">
                <button class="btn-buy" @click="fecharModal">Adicionar ao Carrinho</button>
                <p class="shipping-info"> Entrega grátis em compras acima de R$ 250</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const busca = ref('')
const ordenar = ref('')
const produtoSelecionado = ref(null)

const pingentes = ref([
  { id: 1, nome: 'Pulseira Berloque', preco: 89.9, imagem: "/img/berloque.png" },
  { id: 2, nome: 'Coração', preco: 300.0, imagem: "/img/berloque1.png" },
  { id: 3, nome: 'Olho Grego', preco: 119.9, imagem: "/img/berloque2.png" },
  { id: 4, nome: 'Estrela', preco: 220.9, imagem: "/img/berloque3.png" },
  { id: 5, nome: 'Laço', preco: 199.9, imagem: "/img/berloque4.png" },
  { id: 6, nome: 'Religioso Fé', preco: 79.9, imagem: "/img/berloque5.png" },
  { id: 7, nome: 'Cristo Redentor', preco: 180, imagem: "/img/berloque10.png" },
  { id: 8, nome: 'Bola de Vôlei', preco: 200, imagem: "/img/berloque11.png" },
])

const abrirModal = (pingente) => {
  produtoSelecionado.value = pingente
  document.body.style.overflow = 'hidden' // Trava o scroll do fundo
}

const fecharModal = () => {
  produtoSelecionado.value = null
  document.body.style.overflow = '' // Libera o scroll
}

const formatarPreco = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const pingentesFiltrados = computed(() => {
  let lista = pingentes.value.filter(p =>
    p.nome.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .includes(busca.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
  )

  if (ordenar.value === 'menor') return [...lista].sort((a, b) => a.preco - b.preco)
  if (ordenar.value === 'maior') return [...lista].sort((a, b) => b.preco - a.preco)
  return lista
})
</script>

<style scoped>
/* Variáveis de Design */
.pagina-pingentes {
  --gold: #bfa046;
  --gold-light: #d4bc78;
  --dark: #1a1a1a;
  --grey-bg: #f8f9fa;
  --transition-smooth: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  
  background-color: #fff;
  min-height: 100vh;
  font-family: 'Inter', system-ui, sans-serif;
  color: var(--dark);
}

/* HEADER */
.header {
  padding: 60px 20px 40px;
  text-align: center;
}

.header h1 {
  font-size: 2.5rem;
  letter-spacing: 6px;
  font-weight: 200;
  margin: 0;
}

.divider {
  width: 50px;
  height: 2px;
  background: var(--gold);
  margin: 15px auto;
}

.sub {
  color: #777;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 2px;
}

/* FILTROS */
.filtros {
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  position: sticky;
  top: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  z-index: 100;
  border-bottom: 1px solid #eee;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-box input {
  padding: 12px 15px 12px 40px;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 280px;
  transition: var(--transition-smooth);
}

.search-box .icon {
  position: absolute;
  left: 15px;
  color: #aaa;
}

.search-box input:focus {
  outline: none;
  border-color: var(--gold);
  box-shadow: 0 0 0 4px rgba(191, 160, 70, 0.1);
}

.select-wrapper select {
  padding: 12px 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  cursor: pointer;
}

/* GRID */
.container {
  max-width: 1300px;
  margin: 0 auto;
  padding: 40px 20px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 35px;
}

/* CARD */
.card {
  background: #fff;
  position: relative;
  border-radius: 16px;

  /* MOLDURA */
  border: 1.5px solid #e5e5e5;

  /* SOMBRA LEVE */
  box-shadow: 0 8px 20px rgba(0,0,0,0.05);

  transition: var(--transition-smooth);

  display: flex;
  flex-direction: column;
}
.card:hover {
  transform: translateY(-8px);
  border-color: #bfa046; /* dourado */
  box-shadow: 0 18px 40px rgba(0,0,0,0.1);
}
.image-wrapper {
  width: 100%;
  aspect-ratio: 1 / 1;

  background: transparent; /* tira aquela moldura cinza */
  border-radius: 12px;

  display: grid;
  place-items: center;

  overflow: hidden;
}

/* IMAGEM */
.image-wrapper img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  display: block;
}
.overlay-quick-view {
  position: absolute;
  bottom: -40px;
  left: 0;
  width: 100%;
  background: rgba(26, 26, 26, 0.8);
  color: white;
  padding: 10px;
  text-align: center;
  font-size: 0.8rem;
  transition: var(--transition-smooth);
}

.card:hover .overlay-quick-view { bottom: 0; }
.card:hover .image-wrapper img { transform: scale(1.08); }

.card-info {
  padding: 15px 5px;
  text-align: left;
}

.card-info h3 {
  font-size: 1rem;
  font-weight: 500;
  margin: 0 0 8px;
}

.price {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--gold);
  margin-bottom: 15px;
}

.btn-primary {
  width: 100%;
  padding: 12px;
  background: var(--dark);
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
}

.btn-primary:hover {
  background: var(--gold);
}

/* MODAL */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
  backdrop-filter: blur(4px);
}

.modal-content {
  background: #fff;
  width: 100%;
  max-width: 850px;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  animation: modalIn 0.4s ease;
}

.modal-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.modal-image-container {
  background: var(--grey-bg);
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.modal-image-container img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.modal-details {
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.badge {
  color: var(--gold);
  font-size: 0.7rem;
  text-transform: uppercase;
  font-weight: 800;
  letter-spacing: 1px;
}

.modal-details h2 {
  font-size: 2rem;
  margin: 10px 0;
}

.modal-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--gold);
  margin-bottom: 20px;
}

.description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 30px;
}

.btn-buy {
  background: var(--dark);
  color: white;
  width: 100%;
  padding: 18px;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  margin-bottom: 15px;
}

.shipping-info {
  font-size: 0.8rem;
  color: #888;
}

.close-x {
  position: absolute;
  top: 20px;
  right: 25px;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  z-index: 10;
  color: #999;
}

/* ANIMAÇÕES */
@keyframes modalIn {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.list-enter-active, .list-leave-active { transition: all 0.5s ease; }
.list-enter-from, .list-leave-to { opacity: 0; transform: scale(0.9); }

.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.3s; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }

/* RESPONSIVO */
@media (max-width: 768px) {
  .modal-body { grid-template-columns: 1fr; }
  .modal-image-container { height: 300px; }
  .modal-details { padding: 30px; }
  .header h1 { font-size: 1.8rem; }
  .search-box input { width: 100%; }
}
</style>