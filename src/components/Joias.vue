<template>
  <div class="joias-page">

    <!-- HEADER -->
    <header class="page-header">
      <span class="header-eyebrow">Curadoria de Luxo</span>
      <h1>JOIAS</h1>
      <div class="header-divider"></div>
      <p class="header-sub">{{ produtosFiltrados.length }} peças disponíveis</p>
    </header>

    <!-- FILTROS -->
    <nav class="filtros-bar" :class="{ scrolled: isScrolled }">
      <div class="filtros-inner">

        <!-- Categorias -->
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

        <!-- Ordenação e busca -->
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

    <!-- GRID -->
    <main class="produtos-container">

      <!-- Nenhum resultado -->
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

    <!-- MODAL -->
    <transition name="modal-anim">
      <div v-if="produtoSelecionado" class="modal-overlay" @click.self="fecharModal">
        <div class="modal-box">
          <button class="modal-close" @click="fecharModal">✕</button>

          <div class="modal-body">
            <div class="modal-img">
              <img :src="produtoSelecionado.imagem" :alt="produtoSelecionado.nome" />
            </div>

            <div class="modal-info">
              <span class="modal-cat">{{ produtoSelecionado.categoria }}</span>
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

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { addToCart } from '@/stores/cart'

const router = useRouter()
const isScrolled = ref(false)
const categoriaSelecionada = ref('Todos')
const produtoSelecionado = ref(null)
const busca = ref('')
const ordenacao = ref('')

const categorias = ['Todos', 'Anéis', 'Colares', 'Brincos', 'Pulseiras']

const getImg = (name) => new URL(`../img/${name}`, import.meta.url).href

const produtos = [
  { id: 'j-1',   nome: 'Anel Solitário Diamond',    preco: 2490, categoria: 'Anéis',     imagem: getImg('anel2.png') },
  { id: 'j-2',   nome: 'Anel Eternity Gold',         preco: 1850, categoria: 'Anéis',     imagem: getImg('anel3.png') },
  { id: 'j-101', nome: 'Anel Luxo Diamond Premium',  preco: 3100, categoria: 'Anéis',     imagem: getImg('anel4.png') },
  { id: 'j-102', nome: 'Anel Ouro Branco',            preco: 2200, categoria: 'Anéis',     imagem: getImg('anel5.png') },
  { id: 'j-103', nome: 'Anel Ouro Rose',              preco: 4200, categoria: 'Anéis',     imagem: getImg('anel6.png') },
  { id: 'j-3',   nome: 'Colar Esmeralda Luxo',       preco: 3200, categoria: 'Colares',   imagem: getImg('anel1.png') },
  { id: 'j-4',   nome: 'Colar Ponto de Luz',          preco:  980, categoria: 'Colares',   imagem: getImg('colar4.png') },
  { id: 'j-201', nome: 'Colar Luxo Safira',           preco: 2900, categoria: 'Colares',   imagem: getImg('colar23.png') },
  { id: 'j-202', nome: 'Colar Diamante Elegance',     preco: 3400, categoria: 'Colares',   imagem: getImg('colar125.png') },
  { id: 'j-5',   nome: 'Brincos Pérola',              preco: 1100, categoria: 'Brincos',   imagem: getImg('brinco1.png') },
  { id: 'j-6',   nome: 'Argolas Douradas',            preco:  750, categoria: 'Brincos',   imagem: getImg('argola1.png') },
  { id: 'j-301', nome: 'Brinco Diamante Premium',     preco: 2100, categoria: 'Brincos',   imagem: getImg('brinco2.png') },
  { id: 'j-302', nome: 'Brinco Luxo Ouro Branco',     preco: 1950, categoria: 'Brincos',   imagem: getImg('brinco23.png') },
  { id: 'j-7',   nome: 'Pulseira Grumet',             preco: 2100, categoria: 'Pulseiras', imagem: getImg('pulseira1.png') },
  { id: 'j-8',   nome: 'Bracelete Classic',           preco: 1450, categoria: 'Pulseiras', imagem: getImg('pulseira3.png') },
  { id: 'j-401', nome: 'Pulseira Luxo Gold',          preco: 2800, categoria: 'Pulseiras', imagem: getImg('pulseira12.png') },
  { id: 'j-402', nome: 'Bracelete Diamante',          preco: 3600, categoria: 'Pulseiras', imagem: getImg('pulseira233.png') },
]

const produtosFiltrados = computed(() => {
  let lista = [...produtos]

  if (categoriaSelecionada.value !== 'Todos') {
    lista = lista.filter(p => p.categoria === categoriaSelecionada.value)
  }

  if (busca.value.trim()) {
    const q = busca.value.toLowerCase()
    lista = lista.filter(p => p.nome.toLowerCase().includes(q))
  }

  if (ordenacao.value === 'menor') lista.sort((a, b) => a.preco - b.preco)
  if (ordenacao.value === 'maior') lista.sort((a, b) => b.preco - a.preco)
  if (ordenacao.value === 'az')    lista.sort((a, b) => a.nome.localeCompare(b.nome))

  return lista
})

const limparFiltros = () => {
  categoriaSelecionada.value = 'Todos'
  busca.value = ''
  ordenacao.value = ''
}

const abrirModal = (produto) => {
  produtoSelecionado.value = produto
  document.body.style.overflow = 'hidden'
}

const fecharModal = () => {
  produtoSelecionado.value = null
  document.body.style.overflow = ''
}

const handleAddToCart = () => {
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
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500&family=Montserrat:wght@300;400;500&display=swap');

:root { --gold: #b89356; }

.joias-page {
  font-family: 'Montserrat', sans-serif;
  background: #fff;
  color: #111;
  min-height: 100vh;
}

/* ── HEADER ── */
.page-header {
  text-align: center;
  padding: 56px 20px 32px;
  background: #fff;
}

.header-eyebrow {
  display: block;
  font-size: 0.62rem;
  letter-spacing: 0.5em;
  text-transform: uppercase;
  color: #b89356;
  margin-bottom: 12px;
}

.page-header h1 {
  font-family: 'Cinzel', serif;
  font-size: 3rem;
  letter-spacing: 0.35em;
  font-weight: 400;
  margin: 0;
}

.header-divider {
  width: 40px;
  height: 1px;
  background: #b89356;
  margin: 16px auto 12px;
}

.header-sub {
  font-size: 0.72rem;
  color: #aaa;
  letter-spacing: 0.1em;
}

/* ── FILTROS BAR ── */
.filtros-bar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid #efefef;
  transition: box-shadow 0.3s;
}
.filtros-bar.scrolled { box-shadow: 0 4px 20px rgba(0,0,0,0.06); }

.filtros-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
}

/* Tabs de categoria */
.cat-tabs {
  display: flex;
  align-items: center;
  gap: 4px;
}

.cat-btn {
  background: none;
  border: none;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: #aaa;
  cursor: pointer;
  padding: 20px 14px;
  position: relative;
  transition: color 0.2s;
}
.cat-btn:hover { color: #333; }
.cat-btn.ativo { color: #111; font-weight: 500; }
.cat-btn.ativo::after {
  content: '';
  position: absolute;
  bottom: 0; left: 14px; right: 14px;
  height: 2px;
  background: #b89356;
  border-radius: 1px;
}

/* Busca + ordenação */
.filtros-right {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
}
.search-icon {
  position: absolute;
  left: 10px;
  color: #bbb;
  font-size: 17px;
  pointer-events: none;
}
.search-input {
  padding: 8px 32px 8px 30px;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  font-size: 0.75rem;
  font-family: 'Montserrat', sans-serif;
  outline: none;
  width: 190px;
  transition: border-color 0.2s;
  background: #fafafa;
}
.search-input:focus { border-color: #b89356; background: #fff; }
.search-input::placeholder { color: #ccc; }
.search-clear {
  position: absolute;
  right: 8px;
  background: none;
  border: none;
  color: #bbb;
  cursor: pointer;
  font-size: 11px;
  padding: 2px;
}
.search-clear:hover { color: #888; }

.sort-select {
  padding: 8px 12px;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  font-size: 0.72rem;
  font-family: 'Montserrat', sans-serif;
  color: #555;
  background: #fafafa;
  outline: none;
  cursor: pointer;
  transition: border-color 0.2s;
}
.sort-select:focus { border-color: #b89356; }

/* ── GRID ── */
.produtos-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 32px 80px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 28px;
}

@media (max-width: 1100px) { .grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 760px)  { .grid { grid-template-columns: repeat(2, 1fr); gap: 16px; } }
@media (max-width: 480px)  { .grid { grid-template-columns: 1fr; } }

/* ── CARD ── */
.card {
  cursor: pointer;
  transition: transform 0.3s;
}
.card:hover { transform: translateY(-6px); }

.card-img {
  position: relative;
  aspect-ratio: 1 / 1;
  background: #fff;
  border-radius: 4px;
  margin-bottom: 14px;

  display: flex;
  align-items: center;
  justify-content: center;

  overflow: hidden; /* ← ISSO resolve */
}

.card-img img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transform: scale(1.05);
  transition: transform 0.5s ease;
}
.card:hover .card-img img {
  transform: scale(1.12);
}

.card-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  background: rgba(17,17,17,0.82);
  color: #fff;
  text-align: center;
  font-size: 0.6rem;
  letter-spacing: 0.25em;
  padding: 13px;

  transform: translateY(100%);
  transition: transform 0.3s;

  z-index: 2; /* garante que fica acima da imagem */
}
.card:hover .card-overlay { transform: translateY(0); }

.card-cat-badge {
  position: absolute;
  top: 10px; left: 10px;
  font-size: 0.55rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  background: rgba(255,255,255,0.92);
  color: #b89356;
  padding: 4px 8px;
  border-radius: 3px;
}

.card-info { text-align: center; }

.card-info h3 {
  font-family: 'Cinzel', serif;
  font-size: 0.88rem;
  font-weight: 400;
  margin: 0 0 6px;
  color: #111;
}

.card-price {
  font-size: 0.82rem;
  color: #b89356;
  font-weight: 500;
}

/* ── VAZIO ── */
.vazio {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  padding: 100px 20px;
  color: #ccc;
  text-align: center;
}
.vazio span { font-size: 48px; }
.vazio p { font-size: 0.85rem; color: #aaa; }
.vazio button {
  padding: 10px 22px;
  background: #111;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  font-family: 'Montserrat', sans-serif;
  transition: background 0.2s;
}
.vazio button:hover { background: #b89356; }

/* ── MODAL ── */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
  backdrop-filter: blur(4px);
}

.modal-box {
  background: #fff;
  width: 100%;
  max-width: 860px;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
}

.modal-close {
  position: absolute;
  top: 16px; right: 18px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #aaa;
  z-index: 10;
  transition: color 0.2s;
}
.modal-close:hover { color: #111; }

.modal-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.modal-img {
  background: #f7f7f7;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 460px;
  padding: 32px;
}
.modal-img img {
  max-width: 100%;
  max-height: 380px;
  object-fit: contain;
}

.modal-info {
  padding: 48px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.modal-cat {
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #b89356;
  display: block;
  margin-bottom: 10px;
}

.modal-info h2 {
  font-family: 'Cinzel', serif;
  font-size: 1.7rem;
  font-weight: 400;
  margin: 0 0 10px;
  line-height: 1.3;
}

.modal-price {
  font-size: 1.4rem;
  color: #b89356;
  font-weight: 500;
  margin-bottom: 20px;
}

.modal-divider {
  width: 40px;
  height: 1px;
  background: #b89356;
  margin-bottom: 20px;
}

.modal-desc {
  font-size: 0.82rem;
  color: #777;
  line-height: 1.75;
  margin-bottom: 32px;
}

.modal-actions { display: flex; flex-direction: column; gap: 10px; }

.btn-sacola {
  background: #111;
  color: #fff;
  border: none;
  padding: 16px;
  cursor: pointer;
  font-size: 0.65rem;
  letter-spacing: 0.22em;
  font-family: 'Montserrat', sans-serif;
  transition: background 0.3s;
}
.btn-sacola:hover { background: #b89356; }

.btn-comprar {
  background: none;
  border: 1px solid #111;
  padding: 16px;
  cursor: pointer;
  font-size: 0.65rem;
  letter-spacing: 0.22em;
  font-family: 'Montserrat', sans-serif;
  transition: all 0.2s;
}
.btn-comprar:hover { background: #111; color: #fff; }

/* ── TRANSITIONS ── */
.modal-anim-enter-active { animation: modalIn 0.3s ease; }
.modal-anim-leave-active { animation: modalIn 0.2s ease reverse; }
@keyframes modalIn {
  from { opacity: 0; transform: scale(0.97) translateY(16px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}

@media (max-width: 700px) {
  .modal-body { grid-template-columns: 1fr; }
  .modal-img { min-height: 260px; }
  .modal-info { padding: 28px 24px; }
  .filtros-inner { flex-direction: column; align-items: flex-start; gap: 0; }
  .filtros-right { padding-bottom: 12px; }
}
</style>