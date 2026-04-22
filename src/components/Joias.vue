<template>
  <div class="joias-page">

    <header :class="['header-minimal', { 'scrolled': isScrolled }]">
      <span class="brand-subtitle">Curadoria de Luxo</span>
      <h1>JOIAS</h1>
      <div class="divider"></div>
    </header>

    <nav class="filtros">
      <div class="filtros-container">
        <button v-for="cat in categorias" :key="cat" :class="{ ativo: categoriaSelecionada === cat }"
          @click="categoriaSelecionada = cat">
          {{ cat }}
        </button>
      </div>
    </nav>

    <main class="container">
      <div class="grid">
        <article v-for="produto in produtosFiltrados" :key="produto.id" class="card" @click="abrirModal(produto)">
          <div class="img-wrapper">
            <img :src="produto.imagem" :alt="produto.nome" loading="lazy" />
            <div class="quick-view">DETALHES</div>
          </div>

          <div class="card-info">
            <span class="categoria-tag">{{ produto.categoria }}</span>
            <h3>{{ produto.nome }}</h3>
            <p class="preco">R$ {{ produto.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</p>
          </div>
        </article>
      </div>
    </main>

    <transition name="modal-anim">
      <div v-if="produtoSelecionado" class="modal-overlay" @click.self="fecharModal">
        <div class="modal-content">
          <button class="fechar" @click="fecharModal">×</button>

          <div class="modal-body">
            <div class="modal-img-container">
              <img :src="produtoSelecionado.imagem" :alt="produtoSelecionado.nome" />
            </div>

            <div class="modal-detalhes">
              <span class="categoria-tag">{{ produtoSelecionado.categoria }}</span>
              <h2>{{ produtoSelecionado.nome }}</h2>
              <p class="modal-preco">R$ {{ produtoSelecionado.preco.toLocaleString('pt-BR', {
                minimumFractionDigits: 2
                }) }}</p>

              <div class="divider-gold"></div>

              <p class="descricao">
                Joia exclusiva confeccionada com metais nobres e acabamento premium. Um design atemporal que une
                sofisticação e o brilho eterno da Ivy Joias.
              </p>

              <div class="modal-actions">
                <button class="btn-primary" @click="handleAddToCart">ADICIONAR À SACOLA</button>
                <button class="btn-secondary" @click="handleAddToCart">COMPRAR AGORA</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { addToCart } from "@/stores/cart"

const router = useRouter()
const isScrolled = ref(false)
const categoriaSelecionada = ref('Todos')
const produtoSelecionado = ref(null)

const categorias = ['Todos', 'Anéis', 'Colares', 'Brincos', 'Pulseiras']

// Função auxiliar para resolver o caminho das imagens corretamente no Vite
const getImg = (name) => new URL(`../img/${name}`, import.meta.url).href

// ======= LISTA DE PRODUTOS COM IDs, PREÇOS E IMAGENS CORRIGIDAS ======= //
const produtosBase = [
  { id: 'j-1', nome: 'Anel Solitário Diamond', preco: 2490.00, categoria: 'Anéis', imagem: getImg('anel2.png') },
  { id: 'j-2', nome: 'Anel Eternity Gold', preco: 1850.00, categoria: 'Anéis', imagem: getImg('anel3.png') },
  { id: 'j-3', nome: 'Colar Esmeralda Luxo', preco: 3200.00, categoria: 'Colares', imagem: getImg('anel1.png') },
  { id: 'j-4', nome: 'Colar Ponto de Luz', preco: 980.00, categoria: 'Colares', imagem: getImg('colar4.png') },
  { id: 'j-5', nome: 'Brincos Pérola', preco: 1100.00, categoria: 'Brincos', imagem: getImg('brinco1.png') },
  { id: 'j-6', nome: 'Argolas Douradas', preco: 750.00, categoria: 'Brincos', imagem: getImg('argola1.png') },
  { id: 'j-7', nome: 'Pulseira Grumet', preco: 2100.00, categoria: 'Pulseiras', imagem: getImg('pulseira1.png') },
  { id: 'j-8', nome: 'Bracelete', preco: 1450.00, categoria: 'Pulseiras', imagem: getImg('pulseira3.png') }
]

const aneisExtras = [
  { id: 'j-101', nome: 'Anel Luxo Diamond Premium', preco: 3100.00, categoria: 'Anéis', imagem: getImg('anel4.png') },
  { id: 'j-102', nome: 'Anel Ouro Branco', preco: 2200.00, categoria: 'Anéis', imagem: getImg('anel5.png') },
  { id: 'j-103', nome: 'Anel Ouro Rose', preco: 4200.00, categoria: 'Anéis', imagem: getImg('anel6.png') }
]

const colaresExtras = [
  { id: 'j-201', nome: 'Colar Luxo Safira', preco: 2900.00, categoria: 'Colares', imagem: getImg('colar5.png') },
  { id: 'j-202', nome: 'Colar Diamante Elegance', preco: 3400.00, categoria: 'Colares', imagem: getImg('colar6.png') }
]

const brincosExtras = [
  { id: 'j-301', nome: 'Brinco Diamante Premium', preco: 2100.00, categoria: 'Brincos', imagem: getImg('brinco2.png') },
  { id: 'j-302', nome: 'Brinco Luxo Ouro Branco', preco: 1950.00, categoria: 'Brincos', imagem: getImg('brinco3.png') }
]

const pulseirasExtras = [
  { id: 'j-401', nome: 'Pulseira Luxo Gold', preco: 2800.00, categoria: 'Pulseiras', imagem: getImg('pulseira4.png') },
  { id: 'j-402', nome: 'Bracelete Diamante', preco: 3600.00, categoria: 'Pulseiras', imagem: getImg('pulseira5.png') }
]

// ======= FILTRAGEM ======= //
const produtosFiltrados = computed(() => {
  if (categoriaSelecionada.value === 'Todos') return produtosBase

  const baseFiltrada = produtosBase.filter(p => p.categoria === categoriaSelecionada.value)

  if (categoriaSelecionada.value === 'Anéis') return [...baseFiltrada, ...aneisExtras]
  if (categoriaSelecionada.value === 'Colares') return [...baseFiltrada, ...colaresExtras]
  if (categoriaSelecionada.value === 'Brincos') return [...baseFiltrada, ...brincosExtras]
  if (categoriaSelecionada.value === 'Pulseiras') return [...baseFiltrada, ...pulseirasExtras]

  return baseFiltrada
})

// ======= MÉTODOS ======= //
const abrirModal = (produto) => {
  produtoSelecionado.value = produto
  document.body.style.overflow = 'hidden'
}

const fecharModal = () => {
  produtoSelecionado.value = null
  document.body.style.overflow = 'auto'
}

const handleAddToCart = () => {
  const p = produtoSelecionado.value
  const itemFinal = {
    id: p.id,
    name: p.nome,
    price: p.preco,
    image: p.imagem
  }

  addToCart(itemFinal)
  document.body.style.overflow = 'auto'
  router.push('/carrinho')
}

onMounted(() => {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 50
  })
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500&family=Montserrat:wght@200;300;400;500&display=swap');

.joias-page {
  font-family: 'Montserrat', sans-serif;
  background: #fff;
  color: #111;
  --gold-primary: #b89356;
}

/* HEADER */
.header-minimal {
  text-align: center;
  padding: 40px 20px 20px;
  background: white;
}

.brand-subtitle {
  text-transform: uppercase;
  letter-spacing: 0.5em;
  font-size: 0.65rem;
  color: var(--gold-primary);
  display: block;
  margin-bottom: 10px;
}

.header-minimal h1 {
  font-family: 'Cinzel', serif;
  font-size: 2.8rem;
  letter-spacing: 0.3em;
  margin: 0;
  font-weight: 400;
}

.divider {
  width: 40px;
  height: 1px;
  background: var(--gold-primary);
  margin: 15px auto 0;
}

/* FILTROS */
.filtros {
  position: sticky;
  top: 0;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  z-index: 100;
  border-bottom: 1px solid #f2f2f2;
}

.filtros-container {
  display: flex;
  justify-content: center;
  gap: 30px;
  padding: 20px 0;
}

.filtros button {
  background: none;
  border: none;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #999;
  cursor: pointer;
  position: relative;
  padding-bottom: 5px;
  transition: 0.3s;
}

.filtros button.ativo {
  color: #111;
  font-weight: 600;
}

.filtros button.ativo::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--gold-primary);
}

/* GRID */
.container {
  max-width: 1600px; /* 👈 mais espaço */
  margin: 40px auto 80px;
  padding: 0 30px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 👈 força 3 por linha */
  gap: 30px;
}

/* CARDS */
.card {
  cursor: pointer;
  transition: 0.4s ease;
  border: 1px solid transparent;
  padding: 100px;
}

.card:hover {
  border-color: #f0f0f0;
  background: #fafafa;
}

.img-wrapper {
  aspect-ratio: 1/1;
  overflow: hidden;
  background: #f9f9f9;
  position: relative;
  margin-bottom: 15px;
}

.img-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 20px;
  transition: 0.6s ease;
}

.card:hover .img-wrapper img {
  transform: scale(1.08);
}

.quick-view {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 15px;
  background: #111;
  color: #fff;
  text-align: center;
  font-size: 0.6rem;
  letter-spacing: 0.3em;
  transform: translateY(100%);
  transition: 0.3s;
}

.card:hover .quick-view {
  transform: translateY(0);
}

.card-info {
  text-align: center;
}

.categoria-tag {
  font-size: 0.6rem;
  color: var(--gold-primary);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.card-info h3 {
  font-family: 'Cinzel', serif;
  font-size: 1.1rem;
  margin: 8px 0;
  font-weight: 400;
}

.preco {
  font-weight: 500;
  color: #111;
}

/* MODAL */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  padding: 20px;
}

.modal-content {
  background: #fff;
  width: 100%;
  max-width: 900px;
  position: relative;
  animation: modalIn 0.4s ease;
}

.modal-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.modal-img-container {
  height: 500px;
  background: #fcfcfc;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-img-container img {
  max-width: 80%;
  max-height: 80%;
  object-fit: contain;
}

.modal-detalhes {
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.modal-detalhes h2 {
  font-family: 'Cinzel', serif;
  font-size: 2.2rem;
  margin-bottom: 10px;
}

.modal-preco {
  font-size: 1.6rem;
  color: var(--gold-primary);
  margin-bottom: 20px;
  font-weight: 500;
}

.divider-gold {
  width: 50px;
  height: 1px;
  background: var(--gold-primary);
  margin-bottom: 25px;
}

.descricao {
  font-size: 0.9rem;
  color: #666;
  line-height: 1.7;
  margin-bottom: 30px;
}

.modal-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.btn-primary {
  background: #111;
  color: #fff;
  border: none;
  padding: 18px;
  cursor: pointer;
  letter-spacing: 0.2em;
  font-size: 0.7rem;
  transition: 0.3s;
}

.btn-primary:hover {
  background: var(--gold-primary);
}

.btn-secondary {
  background: none;
  border: 1px solid #111;
  padding: 18px;
  cursor: pointer;
  letter-spacing: 0.2em;
  font-size: 0.7rem;
}

.fechar {
  position: absolute;
  top: 20px;
  right: 20px;
  border: none;
  background: none;
  font-size: 2rem;
  cursor: pointer;
  z-index: 10;
}

@keyframes modalIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 850px) {
  .modal-body {
    grid-template-columns: 1fr;
  }

  .modal-img-container {
    height: 300px;
  }

  .modal-detalhes {
    padding: 30px;
  }

  .grid {
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .container {
    padding: 0 15px;
  }

  .header-minimal h1 {
    font-size: 2rem;
  }
}
</style>