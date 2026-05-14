<template>
  <div class="perfumes">
    <header class="section-header">
      <h1>Perfumes</h1>
      <p class="subtitle">Descubra fragrâncias que expressam sua essência única</p>
    </header>

    <div class="grid">
      <div class="card" v-for="perfume in perfumes" :key="perfume.id">
        <img :src="perfume.imagem" :alt="perfume.nome" />
        <h2>{{ perfume.nome }}</h2>
        <p>R$ {{ perfume.preco.toFixed(2) }}</p>
        <button @click="abrirModal(perfume)" class="ver-mais-btn">Ver detalhes</button>
      </div>
    </div>

    <div class="view-all-container">
      <router-link to="/perfumes" class="btn-view-all">
        Ver Todos os Perfumes
        <span class="arrow">→</span>
      </router-link>
    </div>

    <transition name="fade">
      <div v-if="perfumeSelecionado" class="modal-overlay" @click.self="fecharModal">
        <div class="modal-content">
          <button class="close-icon" @click="fecharModal" aria-label="Fechar">&times;</button>

          <div class="modal-layout">
            <div class="modal-img-container">
              <img :src="perfumeSelecionado.imagem" :alt="perfumeSelecionado.nome" />
              <div class="badge-exclusive">Exclusive Line</div>
            </div>

            <div class="modal-details">
              <nav class="breadcrumb">Coleção / Fragrâncias / {{ perfumeSelecionado.nome }}</nav>
              <span class="brand-tag">IVY Fragrances</span>
              <h2>{{ perfumeSelecionado.nome }}</h2>

              <div class="price-container">
  <span class="modal-price">
    R$ {{ volumeSelecionado?.preco.toFixed(2) }}
  </span>

  <span class="installments">
    ou 10x de R$ {{ ((volumeSelecionado?.preco ?? 0) / 10).toFixed(2) }}
  </span>
</div>
              <div class="description-box">
                <h3>A Essência</h3>
                <p>
                  Uma fragrância exclusiva da linha {{ perfumeSelecionado.nome }}, desenvolvida com notas selecionadas
                  para proporcionar uma experiência sensorial única e marcante.
                </p>
              </div>

              <div class="perfume-notes">
                <div class="note-item"><strong>Topo:</strong> Bergamota e Lavanda</div>
                <div class="note-item"><strong>Coração:</strong> Jasmin e Rosa</div>
                <div class="note-item"><strong>Fundo:</strong> Sândalo e Âmbar</div>
              </div>

              <div class="options-group">
                <label>Selecione o volume:</label>
                <div class="vol-selector">
                  <button v-for="volume in perfumeSelecionado.volumes" :key="volume.tamanho"
                    :class="{ active: volumeSelecionado?.tamanho === volume.tamanho }"
                    @click="volumeSelecionado = volume">
                    {{ volume.tamanho }}
                  </button>
                </div>
              </div>

              <div class="action-footer">
                <button class="buy-btn" @click="handleAddToCart">Adicionar ao Carrinho</button>
                <p class="shipping-info">Frete grátis para todo o Brasil</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { addToCart } from "@/stores/cart"
import { IPerfume, IVolumePerfume } from '@/interface/IPerfume';


const router = useRouter()

// ======= ESTADO ======= //
const perfumeSelecionado = ref<IPerfume | null>(null)
const volumeSelecionado = ref<IVolumePerfume | null>(null)

const perfumes = ref<IPerfume[]>([
  {
    id: 'perf-1', nome: "IVY Elegance", preco: 199.90, imagem: new URL('../img/perfume.png', import.meta.url).href, volumes: [
      { tamanho: "50ml", preco: 200 },
      { tamanho: "100ml", preco: 400 }
    ]
  },
  {
    id: 'perf-2', nome: "IVY Gold", preco: 249.90, imagem: new URL('../img/perfume1.png', import.meta.url).href, volumes: [
      { tamanho: "50ml", preco: 200 },
      { tamanho: "100ml", preco: 400 }
    ]
  },
  {
    id: 'perf-3', nome: "IVY Black", preco: 279.90, imagem: new URL('../img/perfume2.png', import.meta.url).href, volumes: [
      { tamanho: "50ml", preco: 200 },
      { tamanho: "100ml", preco: 400 }
    ]
  },
  {
    id: 'perf-4', nome: "IVY Rose", preco: 189.90, imagem: new URL('../img/perfume3.png', import.meta.url).href, volumes: [
      { tamanho: "50ml", preco: 200 },
      { tamanho: "100ml", preco: 400 }
    ]
  },
  {
    id: 'perf-5', nome: "IVY Night", preco: 299.90, imagem: new URL('../img/perfume4.png', import.meta.url).href, volumes: [
      { tamanho: "50ml", preco: 200 },
      { tamanho: "100ml", preco: 400 }
    ]
  },
  {
    id: 'perf-6', nome: "IVY Luxury", preco: 349.90, imagem: new URL('../img/perfume5.png', import.meta.url).href, volumes: [
      { tamanho: "50ml", preco: 200 },
      { tamanho: "100ml", preco: 400 }
    ]
  },
  {
    id: 'perf-7', nome: "IVY I", preco: 349.90, imagem: new URL('../img/perfume6.png', import.meta.url).href, volumes: [
      { tamanho: "50ml", preco: 200 },
      { tamanho: "100ml", preco: 400 }
    ]
  },
  {
    id: 'perf-8', nome: "IVY II", preco: 349.90, imagem: new URL('../img/perfume8.png', import.meta.url).href, volumes: [
      { tamanho: "50ml", preco: 200 },
      { tamanho: "100ml", preco: 400 }
    ]
  },
   {
    id: 'perf-9', nome: "IVY I", preco: 349.90, imagem: new URL('../img/perfume9.png', import.meta.url).href, volumes: [
      { tamanho: "50ml", preco: 200 },
      { tamanho: "100ml", preco: 400 }
    ]
  },
  {
    id: 'perf-10', nome: "IVY II", preco: 349.90, imagem: new URL('../img/perfume10.png', import.meta.url).href, volumes: [
      { tamanho: "50ml", preco: 200 },
      { tamanho: "100ml", preco: 400 }
    ]
  },
  {
    id: 'perf-11', nome: "IVY II", preco: 349.90, imagem: new URL('../img/perfume11.png', import.meta.url).href, volumes: [
      { tamanho: "50ml", preco: 200 },
      { tamanho: "100ml", preco: 400 }
    ]
  },
  {
    id: 'perf-12', nome: "IVY II", preco: 349.90, imagem: new URL('../img/perfume12.png', import.meta.url).href, volumes: [
      { tamanho: "50ml", preco: 200 },
      { tamanho: "100ml", preco: 400 }
    ]
  },
  {
    id: 'perf-13', nome: "IVY II", preco: 349.90, imagem: new URL('../img/perfume13.png', import.meta.url).href, volumes: [
      { tamanho: "50ml", preco: 200 },
      { tamanho: "100ml", preco: 400 }
    ]
  },
  {
    id: 'perf-14', nome: "IVY II", preco: 349.90, imagem: new URL('../img/perfume14.png', import.meta.url).href, volumes: [
      { tamanho: "50ml", preco: 200 },
      { tamanho: "100ml", preco: 800 }
    ]
  },
])

// ======= MÉTODOS ======= //
const abrirModal = (perfume: IPerfume) => {
  perfumeSelecionado.value = perfume
  volumeSelecionado.value = perfume.volumes[0]
  document.body.style.overflow = 'hidden'
}

const fecharModal = () => {
  perfumeSelecionado.value = null
  document.body.style.overflow = 'auto'
}

const handleAddToCart = () => {
  if (!perfumeSelecionado.value || !volumeSelecionado.value) return

  const p = perfumeSelecionado.value
  const volume = volumeSelecionado.value

  const itemFinal = {
    id: `${p.id}-${volume.tamanho}`,
    name: `${p.nome} (${volume.tamanho})`,
    price: volume.preco,
    image: p.imagem
  }

  addToCart(itemFinal)

  document.body.style.overflow = 'auto'
  router.push('/carrinho')
}

</script>

<style scoped>
/* Estilos originais mantidos */
.perfumes {
  padding: 60px 20px;
  text-align: center;
  background: #ffffff;
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Inter', sans-serif;
}

.section-header {
  margin-bottom: 50px;
}

h1 {
  font-weight: 200;
  font-size: 2.8rem;
  letter-spacing: 6px;
  text-transform: uppercase;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 14px;
  color: #888;
  letter-spacing: 1px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.card {
  background: white;
  padding: 25px;
  border: 1px solid #f0f0f0;
  transition: all 0.4s ease;
}

.card:hover {
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05);
  transform: translateY(-5px);
}

.card img {
  width: 100%;
  height: 250px;
  object-fit: contain;
  margin-bottom: 15px;
}

.card h2 {
  font-size: 13px;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 10px;
}

.card p {
  font-size: 17px;
  color: #b08d57;
  font-weight: 300;
}

.ver-mais-btn {
  margin-top: 15px;
  padding: 8px 20px;
  background: none;
  border: 1px solid #111;
  text-transform: uppercase;
  font-size: 10px;
  cursor: pointer;
  transition: 0.3s;
}

.ver-mais-btn:hover {
  background: #111;
  color: #fff;
}

.view-all-container {
  margin-top: 60px;
  display: flex;
  justify-content: center;
}

.btn-view-all {
  padding: 15px 40px;
  background: #111;
  color: #fff;
  border: 1px solid #111;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.4s ease;
  display: flex;
  align-items: center;
  gap: 15px;
  text-decoration: none;
}

.btn-view-all:hover {
  background: transparent;
  color: #111;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.modal-content {
  background: white;
  width: 95%;
  max-width: 1000px;
  padding: 60px;
  position: relative;
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.1);
}

.modal-layout {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 60px;
  text-align: left;
}

.modal-img-container {
  background: #fcfcfc;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.modal-img-container img {
  max-width: 100%;
  max-height: 450px;
  object-fit: contain;
}

.badge-exclusive {
  position: absolute;
  top: 20px;
  left: 20px;
  background: #111;
  color: #fff;
  padding: 5px 12px;
  font-size: 9px;
  text-transform: uppercase;
}

.brand-tag {
  color: #b08d57;
  font-size: 11px;
  letter-spacing: 3px;
  text-transform: uppercase;
}

.modal-details h2 {
  font-size: 38px;
  font-weight: 200;
  margin: 10px 0;
}

.modal-price {
  font-size: 24px;
  font-weight: 300;
}

.description-box h3 {
  font-size: 11px;
  text-transform: uppercase;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  margin-top: 30px;
}

.description-box p {
  font-size: 14px;
  color: #666;
  line-height: 1.8;
  margin-top: 10px;
}

.perfume-notes {
  margin: 20px 0;
  font-size: 13px;
  color: #444;
}

.vol-selector {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.vol-selector button {
  padding: 10px 20px;
  border: 1px solid #eee;
  background: white;
  cursor: pointer;
  transition: 0.3s;
}

.vol-selector button.active {
  border-color: #111;
  background: #111;
  color: #fff;
}

.buy-btn {
  width: 100%;
  padding: 20px;
  background: #111;
  color: #fff;
  border: none;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  transition: 0.3s;
  margin-top: 30px;
}

.buy-btn:hover {
  background: #b08d57;
}

.close-icon {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 30px;
  border: none;
  background: none;
  cursor: pointer;
}

/* Transições */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 850px) {
  .modal-layout {
    grid-template-columns: 1fr;
  }

  .modal-content {
    height: 100vh;
    overflow-y: auto;
    padding: 40px 20px;
  }
}
</style>