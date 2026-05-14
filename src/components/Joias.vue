<template>
  <div class="joias-page">

    <header class="page-header">
      <span class="header-eyebrow">Curadoria de Luxo</span>
      <h1>JOIAS</h1>
      <div class="header-divider"></div>
      <p class="header-sub">{{ produtosFiltrados.length }} peças disponíveis</p>
    </header>

    <nav class="filtros-bar" :class="{ scrolled: isScrolled }">
      <div class="filtros-inner">

        <div class="filtros-left">
          <div class="cat-tabs">
            <button
              v-for="cat in categorias"
              :key="cat"
              :class="['cat-btn', { ativo: categoriaSelecionada === cat }]"
              @click="categoriaSelecionada = cat"
            >
              {{ cat }}
            </button>
          </div>

          <div class="v-divider"></div>

          <div class="cat-tabs">
            <button
              v-for="mat in materiais"
              :key="mat"
              :class="['cat-btn', { ativo: materialSelecionado === mat }]"
              @click="materialSelecionado = mat"
            >
              {{ mat }}
            </button>
          </div>
        </div>

        <div class="filtros-right">
          <div class="search-box">
            <span class="search-icon">⌕</span>
            <input v-model="busca" placeholder="Buscar joia..." class="search-input" />
            <button v-if="busca" class="search-clear" @click="busca = ''">✕</button>
          </div>

          <select v-model="ordenacao" class="sort-select">
            <option value="">Ordenar</option>
            <option value="menor">Menor preço</option>
            <option value="maior">Maior preço</option>
            <option value="az">A → Z</option>
          </select>
        </div>

      </div>
    </nav>

    <main class="produtos-container">

      <div v-if="produtosFiltrados.length === 0" class="vazio">
        <span>◇</span>
        <p>Nenhuma peça encontrada</p>
        <button @click="limparFiltros">Limpar filtros</button>
      </div>

      <div v-else class="grid">
        <article
          v-for="produto in produtosFiltrados"
          :key="produto.id"
          class="card"
          @click="abrirModal(produto)"
        >
          <div class="card-img">
            <img :src="produto.imagem" :alt="produto.nome" loading="lazy" />
            <div class="card-overlay">VER DETALHES</div>
            <span class="card-cat-badge">{{ produto.categoria }}</span>
          </div>

          <div class="card-info">
            <h3>{{ produto.nome }}</h3>
            <p class="card-price">R$ {{ produto.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</p>
          </div>
        </article>
      </div>

    </main>

    <transition name="modal-anim">
      <div v-if="produtoSelecionado" class="modal-overlay" @click.self="fecharModal">
        <div class="modal-box">
          <button class="modal-close" @click="fecharModal">✕</button>

          <div class="modal-body">
            <div class="modal-img">
              <img :src="produtoSelecionado.imagem" :alt="produtoSelecionado.nome" />
            </div>

            <div class="modal-info">
              <span class="modal-cat">{{ produtoSelecionado.categoria }} | {{ produtoSelecionado.material }}</span>
              <h2>{{ produtoSelecionado.nome }}</h2>
              <p class="modal-price">
                R$ {{ produtoSelecionado.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}
              </p>

              <div class="modal-divider"></div>

              <p class="modal-desc">
                Joia exclusiva confeccionada com metais nobres e acabamento premium.
                Um design atemporal que une sofisticação e o brilho eterno da Ivy Joias.
              </p>

              <div class="modal-actions">
                <button class="btn-sacola" @click="handleAddToCart">ADICIONAR À SACOLA</button>
                <button class="btn-comprar" @click="handleAddToCart">COMPRAR AGORA</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { addToCart } from '@/stores/cart'
import { IJoia } from '@/interface/IJoias'

const router = useRouter()
const isScrolled = ref(false)

// Estados de Filtro
const categoriaSelecionada = ref('Todos')
const materialSelecionado = ref('Todos')
const busca = ref('')
const ordenacao = ref('')

const produtoSelecionado = ref<IJoia | null>(null)

const categorias = computed<string[]>(() => {
  return ['Todos', ...new Set(joias.map(p => p.categoria))]
})

const materiais = computed<string[]>(() => {
  return ['Todos', ...new Set(joias.map(p => p.material))]
})

const getImg = (name:string) => new URL(`../img/${name}`, import.meta.url).href

// Lista de produtos com a propriedade 'material' adicionada
const joias : IJoia[] = [
  { id: 'j-1',   nome: 'Anel Solitário Diamond',    preco: 2490, categoria: 'Aneis',     material: 'Dourado', imagem: getImg('anel2.png'), genero: "M" },
  { id: 'j-2',   nome: 'Anel Eternity Gold',         preco: 1850, categoria: 'Anéis',     material: 'Dourado', imagem: getImg('anel3.png'), genero: "F" },
  { id: 'j-101', nome: 'Anel Luxo Diamond Premium',  preco: 3100, categoria: 'Anéis',     material: 'Prata',   imagem: getImg('anel4.png'), genero: "M" },
  { id: 'j-102', nome: 'Anel Ouro Branco',            preco: 2200, categoria: 'Anéis',     material: 'Prata',   imagem: getImg('anel5.png'), genero: "F" },
  { id: 'j-103', nome: 'Anel Ouro Rose',              preco: 4200, categoria: 'Anéis',     material: 'Dourado', imagem: getImg('anel6.png'), genero: "F" },
  { id: 'j-3',   nome: 'Colar Esmeralda Luxo',       preco: 3200, categoria: 'Anéis',   material: 'Prata', imagem: getImg('anel1.png'), genero: "M" },
  { id: 'j-4',   nome: 'Colar Ponto de Luz',          preco:  980, categoria: 'Colares',   material: 'Prata',   imagem: getImg('colar4.png'), genero: "M" },
  { id: 'j-201', nome: 'Colar Luxo Safira',           preco: 2900, categoria: 'Colares',   material: 'Prata',   imagem: getImg('colar23.png'), genero: "M" },
  { id: 'j-202', nome: 'Colar Diamante Elegance',     preco: 3400, categoria: 'Colares',   material: 'Dourado', imagem: getImg('colar125.png'), genero: "M" },
  { id: 'j-5',   nome: 'Brincos Pérola',              preco: 1100, categoria: 'Brincos',   material: 'Dourado', imagem: getImg('brinco1.png'), genero: "M" },
  { id: 'j-6',   nome: 'Argolas Douradas',            preco:  750, categoria: 'Brincos',   material: 'Dourado', imagem: getImg('argola1.png'), genero: "M" },
  { id: 'j-301', nome: 'Brinco Diamante Premium',     preco: 2100, categoria: 'Brincos',   material: 'Prata',   imagem: getImg('brinco2.png'), genero: "M" },
  { id: 'j-302', nome: 'Brinco Luxo Ouro Branco',     preco: 1950, categoria: 'Brincos',   material: 'Prata',   imagem: getImg('brinco23.png'), genero: "M" },
  { id: 'j-7',   nome: 'Pulseira Grumet',             preco: 2100, categoria: 'Pulseiras', material: 'Dourado', imagem: getImg('pulseira1.png'), genero: "M" },
  { id: 'j-8',   nome: 'Bracelete Classic',           preco: 1450, categoria: 'Pulseiras', material: 'Dourado', imagem: getImg('pulseira3.png'), genero: "M" },
  { id: 'j-401', nome: 'Pulseira Luxo Gold',          preco: 2800, categoria: 'Pulseiras', material: 'Dourado', imagem: getImg('pulseira12.png'), genero: "M" },
  { id: 'j-402', nome: 'Bracelete Diamante',          preco: 3600, categoria: 'Pulseiras', material: 'Prata',   imagem: getImg('pulseira233.png'), genero: "M" },
]

const produtosFiltrados = computed(() => {
  let lista = [...joias]

  // Filtro por Categoria
  if (categoriaSelecionada.value !== 'Todos') {
    lista = lista.filter(p => p.categoria === categoriaSelecionada.value)
  }

  // Filtro por Material (Dourado/Prata)
  if (materialSelecionado.value !== 'Todos') {
    lista = lista.filter(p => p.material === materialSelecionado.value)
  }

  // Filtro por Busca
  if (busca.value.trim()) {
    const q = busca.value.toLowerCase()
    lista = lista.filter(p => p.nome.toLowerCase().includes(q))
  }

  // Ordenação
  if (ordenacao.value === 'menor') lista.sort((a, b) => a.preco - b.preco)
  if (ordenacao.value === 'maior') lista.sort((a, b) => b.preco - a.preco)
  if (ordenacao.value === 'az')    lista.sort((a, b) => a.nome.localeCompare(b.nome))

  return lista
})

const limparFiltros = () => {
  categoriaSelecionada.value = 'Todos'
  materialSelecionado.value = 'Todos'
  busca.value = ''
  ordenacao.value = ''
}

const abrirModal = (produto:IJoia) => {
  produtoSelecionado.value = produto
  document.body.style.overflow = 'hidden'
}

const fecharModal = () => {
  produtoSelecionado.value = null
  document.body.style.overflow = ''
}

const handleAddToCart = () => {
  if(produtoSelecionado.value == null)
    return;

  const p = produtoSelecionado.value
  addToCart({ id: p.id, name: p.nome, price: p.preco, image: p.imagem })
  fecharModal()
  router.push('/carrinho')
}

const onScroll = () => { isScrolled.value = window.scrollY > 80 }
onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Jost:wght@300;400;500;600&display=swap');

.joias-page {
  --gold: #c9a84c;
  --gold-light: #e2c97e;
  --gold-dark: #a07830;
  --silver: #8a9db5;
  --dark: #0f0e0c;
  --cream: #faf8f4;
  --border: rgba(201, 168, 76, 0.18);
  --text-muted: #8a8173;

  --font-display: 'Cormorant Garamond', serif;
  --font-body: 'Jost', sans-serif;

  background: var(--cream);
  min-height: 100vh;
  font-family: var(--font-body);
  color: var(--dark);
}

/* HEADER */

.page-header {
  text-align: center;
  padding: 50px 20px 36px;
  border-bottom: 1px solid var(--border);
  background: linear-gradient(180deg, #fff 0%, var(--cream) 100%);
}

.header-eyebrow {
  display: block;
  font-size: 0.68rem;
  letter-spacing: 6px;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 10px;
}

.page-header h1 {
  font-family: var(--font-display);
  font-size: clamp(3rem, 7vw, 5rem);
  font-weight: 300;
  letter-spacing: 12px;
  color: var(--dark);
  margin: 0;
}

.header-divider {
  width: 120px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
  margin: 20px auto;
}

.header-sub {
  font-size: 0.72rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--text-muted);
}

/* FILTROS */

.filtros-bar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(250,248,244,0.94);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid var(--border);
}

.filtros-inner {
  max-width: 1300px;
  margin: auto;
  padding: 18px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
}

.filtros-left {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.v-divider {
  width: 1px;
  height: 22px;
  background: var(--border);
}

/* BOTÕES */

.cat-tabs {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.cat-btn {
  background: white;
  border: 1px solid var(--border);
  padding: 10px 18px;
  border-radius: 4px;
  font-size: 0.72rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: var(--font-body);
}

.cat-btn:hover {
  border-color: var(--gold);
  color: var(--dark);
}

.cat-btn.ativo {
  background: var(--dark);
  border-color: var(--dark);
  color: white;
}

/* BUSCA */

.filtros-right {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.search-box {
  position: relative;
}

.search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #aaa;
}

.search-input {
  width: 240px;
  padding: 11px 16px 11px 38px;
  border: 1px solid var(--border);
  border-radius: 4px;
  background: white;
  font-family: var(--font-body);
  font-size: 0.8rem;
}

.search-input:focus {
  outline: none;
  border-color: var(--gold);
}

.search-clear {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: none;
  cursor: pointer;
  color: #999;
}

.sort-select {
  padding: 11px 16px;
  border: 1px solid var(--border);
  border-radius: 4px;
  background: white;
  font-family: var(--font-body);
  font-size: 0.78rem;
}

/* CONTAINER */

.produtos-container {
  max-width: 1300px;
  margin: auto;
  padding: 70px 24px 100px;
}

/* GRID */

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 28px;
}

@media (max-width: 1100px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 760px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 520px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

/* CARD */

.card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid rgba(0,0,0,0.04);

  transition:
    transform .5s cubic-bezier(.19,1,.22,1),
    box-shadow .5s ease;
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 25px 70px rgba(0,0,0,0.12);
}

.card-img {
  position: relative;
  background: white;
  height: 320px;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;
}

.card-img img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 24px;

  transition:
    transform .8s cubic-bezier(.19,1,.22,1),
    filter .4s ease;
}

.card:hover .card-img img {
  transform: scale(1.18);
}

.card-overlay {
  position: absolute;
  inset: 0;
  background: rgba(15,14,12,.5);

  display: flex;
  align-items: center;
  justify-content: center;

  opacity: 0;
  transition: opacity .4s ease;

  color: white;
  font-size: .7rem;
  letter-spacing: 3px;
  text-transform: uppercase;
}

.card:hover .card-overlay {
  opacity: 1;
}

.card-cat-badge {
  position: absolute;
  top: 14px;
  left: 14px;

  background: rgba(201,168,76,.12);
  color: var(--gold-dark);

  border: 1px solid rgba(201,168,76,.3);

  padding: 5px 10px;
  border-radius: 2px;

  font-size: .6rem;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.card-info {
  padding: 24px;
  border-top: 1px solid rgba(0,0,0,.04);
}

.card-info h3 {
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 400;
  margin: 0 0 8px;
}

.card-price {
  font-family: var(--font-display);
  font-size: 1.5rem;
  color: var(--gold-dark);
}

/* EMPTY */

.vazio {
  text-align: center;
  padding: 100px 20px;
}

.vazio span {
  font-size: 4rem;
  color: var(--gold);
}

.vazio p {
  color: var(--text-muted);
  margin: 14px 0;
}

.vazio button {
  padding: 12px 24px;
  background: var(--dark);
  border: none;
  color: white;
  cursor: pointer;
  letter-spacing: 2px;
  text-transform: uppercase;
}

/* MODAL */

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(10,9,7,.85);

  display: flex;
}
  </style>