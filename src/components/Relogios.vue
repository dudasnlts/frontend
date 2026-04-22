<template>
  <div class="relogios-container">

    <section class="hero-banner">
      <div class="banner-wrapper">
        <img :src="bannerr" alt="Coleção IVY Watches 2026" class="banner-img">
        <div class="banner-content">
          <div class="scroll-indicator">
            <div class="mouse"></div>
          </div>
        </div>
      </div>
    </section>

    <nav class="filter-bar">
      <div class="filter-inner">
        <button class="filter-btn" :class="{ active: filtroAtual === 'todos' }" @click="filtrar('todos')">Ver Tudo</button>
        <button class="filter-btn" :class="{ active: filtroAtual === 'feminino' }" @click="filtrar('feminino')">Feminino</button>
        <button class="filter-btn" :class="{ active: filtroAtual === 'masculino' }" @click="filtrar('masculino')">Masculino</button>
        <button class="filter-btn" :class="{ active: filtroAtual === 'luxo' }" @click="filtrar('luxo')">Luxo</button>
      </div>
    </nav>

    <main class="catalog-section">
      <div class="products-grid">
        <article
          class="product-card"
          v-for="(produto, index) in produtosFiltrados"
          :key="produto.id"
          :style="{ '--delay': index * 0.1 + 's' }"
          @click="handleAddToCart(produto)"
        >
          <div class="product-visual">
            <div class="image-wrapper">
              <img :src="produto.img" :alt="produto.nome" class="main-img" loading="lazy">
              <img :src="produto.hoverImg" class="hover-img" aria-hidden="true">
            </div>
            <div class="quick-add">
              <span>+ Adicionar à Sacola</span>
            </div>
          </div>

          <div class="product-info">
            <div class="meta">
              <span class="category">Relógios Premium</span>
              <h2 class="title">{{ produto.nome }}</h2>
            </div>
            <div class="price-box">
              <p class="current-price">R$ {{ produto.preco.toFixed(2) }}</p>
              <p class="installments">10x de R$ {{ (produto.preco / 10).toFixed(2) }}</p>
            </div>
          </div>
        </article>
      </div>
    </main>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { addToCart } from "@/stores/cart" // Importando a ação da Store

// Importando imagens
import bannerr from '@/img/bannerr.png'
import relogio4 from '@/img/relogio4.png'
import relogio5 from '@/img/relogio5.png'
import relogio6 from '@/img/relogio6.png'
import relogio7 from '@/img/relogio7.png'

const router = useRouter()

// Lista de produtos com IDs e Preços Numéricos
const produtos = ref([
  { id: 'rel-1', nome: "Relógio Dourado Elegante", preco: 799.00, img: relogio4, hoverImg: relogio4, categoria: 'luxo' },
  { id: 'rel-2', nome: "Relógio Prata Clássico", preco: 599.00, img: relogio7, hoverImg: relogio7, categoria: 'masculino' },
  { id: 'rel-3', nome: "Relógio Minimalista", preco: 499.00, img: relogio5, hoverImg: relogio5, categoria: 'feminino' },
  { id: 'rel-4', nome: "Relógio Luxo Preto", preco: 1299.00, img: relogio6, hoverImg: relogio6, categoria: 'luxo' }
])

const filtroAtual = ref('todos')

const produtosFiltrados = computed(() => {
  if (filtroAtual.value === 'todos') return produtos.value
  return produtos.value.filter(p => p.categoria === filtroAtual.value)
})

const filtrar = (categoria) => {
  filtroAtual.value = categoria
}

// FUNÇÃO DE ADICIONAR E IR PARA O CARRINHO
const handleAddToCart = (produto) => {
  const itemParaCarrinho = {
    id: produto.id,
    name: produto.nome,
    price: produto.preco,
    image: produto.img
  }

  addToCart(itemParaCarrinho) // Envia para a store (cart.js)
  router.push('/carrinho')    // Redireciona
}
</script>

<style scoped>
.relogios-container { font-family: 'Inter', sans-serif; color: #1A1A1A; background: #FFF; }

/* HERO BANNER */
.hero-banner { height: 80vh; position: relative; overflow: hidden; background: #eee; }
.banner-wrapper { height: 100%; display: flex; align-items: center; justify-content: center; }
.banner-img { position: absolute; width: 100%; height: 100%; object-fit: cover; z-index: 1; }

/* FILTER BAR */
.filter-bar { position: sticky; top: 0; background: rgba(255,255,255,0.85); backdrop-filter: blur(15px); padding: 20px 0; z-index: 100; border-bottom: 1px solid #F0F0F0; }
.filter-inner { display: flex; justify-content: center; gap: 40px; }
.filter-btn { background: none; border: none; cursor: pointer; color: #888; padding: 8px 0; transition: color 0.3s; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; }
.filter-btn.active { color: #1A1A1A; font-weight: 600; border-bottom: 2px solid #1A1A1A; }

/* CATALOG GRID */
.products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 60px 30px; margin: 40px; }
.product-card { cursor: pointer; opacity: 0; animation: slideInUp 0.8s ease var(--delay) forwards; }

.product-visual { position: relative; background: #F9F9F9; aspect-ratio: 4/5; overflow: hidden; margin-bottom: 25px; }
.image-wrapper { height: 100%; display: flex; align-items: center; justify-content: center; }
.image-wrapper img { width: 80%; transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1); }

.hover-img { position: absolute; opacity: 0; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 80%; transition: 0.5s; }
.product-card:hover .main-img { transform: scale(1.1); opacity: 0.7; }
.product-card:hover .hover-img { opacity: 1; }

.quick-add { position: absolute; bottom: 0; width: 100%; background: #1A1A1A; color: white; text-align: center; padding: 18px; transform: translateY(100%); transition: transform 0.4s ease; font-size: 0.8rem; font-weight: 600; text-transform: uppercase; }
.product-card:hover .quick-add { transform: translateY(0); }

.product-info { text-align: center; }
.category { font-size: 0.65rem; color: #999; text-transform: uppercase; letter-spacing: 2px; }
.title { font-family: 'Playfair Display', serif; font-size: 1.2rem; font-weight: 500; margin: 10px 0 10px; }
.current-price { font-size: 1.1rem; font-weight: 600; color: #C5A059; margin: 0; }
.installments { font-size: 0.8rem; color: #BBB; margin-top: 5px; }

@keyframes slideInUp { from { opacity:0; transform:translateY(50px); } to { opacity:1; transform:translateY(0); } }

@media (max-width:768px) { 
  .products-grid { margin: 40px 20px; grid-template-columns: 1fr 1fr; gap: 20px; }
  .filter-inner { gap:20px; overflow-x:auto; justify-content: flex-start; padding: 0 20px; }
  .hero-banner { height:50vh; }
  .title { font-size: 1rem; }
}
</style>