<template>
  <main class="home">

    <!-- HERO -->
    <section class="hero">
      <div class="hero-grid">
        <div class="hero-item"><img :src="hero.left" /></div>

        <div class="hero-item center">
          <img :src="hero.center" />
          <div class="overlay">
            <div class="content">
              <span class="tag">ALTA JOALHERIA</span>
              <h1>Elegância que define você</h1>
              <p>Peças sofisticadas para momentos únicos</p>
              <button class="btn">EXPLORAR</button>
            </div>
          </div>
        </div>

        <div class="hero-item"><img :src="hero.right" /></div>
      </div>
    </section>

    <!-- BENEFÍCIOS -->
    <section class="benefits">
      <div class="benefit"><span>🚚</span><p>Frete Grátis</p></div>
      <div class="benefit"><span>💳</span><p>Até 10x sem juros</p></div>
      <div class="benefit"><span>🔒</span><p>Compra Segura</p></div>
      <div class="benefit"><span>✨</span><p>Qualidade Premium</p></div>
    </section>

    <!-- LANÇAMENTOS -->
    <section class="products">
      <div class="title">
        <span>LANÇAMENTOS</span>
        <h2>Novidades Exclusivas</h2>
      </div>

      <div class="grid">
        <div class="card" v-for="p in lancamentos" :key="p.id" @click="abrirModal(p)">
          <div class="img">
            <img :src="p.image" />
            <div class="hover">Ver detalhes</div>
          </div>
          <h3>{{ p.name }}</h3>
          <p>R$ {{ p.price.toFixed(2) }}</p>
        </div>
      </div>
    </section>

    <!-- CATEGORIAS -->
    <section class="categories">
      <div class="cat" v-for="c in categorias" :key="c.name">
        <video autoplay muted loop playsinline>
          <source :src="c.video" type="video/mp4" />
        </video>
        <div class="cat-overlay">
          <h2>{{ c.name }}</h2>
        </div>
      </div>
    </section>

    <!-- DESTAQUES -->
    <section class="products destaque">
      <div class="title">
        <span>DESTAQUES</span>
        <h2>Mais Vendidos</h2>
      </div>

      <div class="grid">
        <div class="card" v-for="p in destaques" :key="p.id" @click="abrirModal(p)">
          <div class="img">
            <img :src="p.image" />
            <div class="hover">Ver detalhes</div>
          </div>
          <h3>{{ p.name }}</h3>
          <p>R$ {{ p.price.toFixed(2) }}</p>
        </div>
      </div>
    </section>

    <!-- PREMIUM -->
    <section class="premium">
      <div class="premium-box">
        <h2>Coleção Premium</h2>
        <p>Peças exclusivas com design sofisticado</p>
        <button class="btn">VER COLEÇÃO</button>
      </div>
    </section>

    <!-- MODAL -->
    <div v-if="produtoSelecionado" class="modal" @click.self="fecharModal">
      <div class="modal-box">
        <img :src="produtoSelecionado.image" />
        <h2>{{ produtoSelecionado.name }}</h2>
        <p>R$ {{ produtoSelecionado.price.toFixed(2) }}</p>
        <button class="btn" @click="handleAddToCart(produtoSelecionado)">
          Adicionar à sacola
        </button>
      </div>
    </div>

  </main>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { addToCart } from "@/stores/cart"

import colar1 from '@/img/colarHome1.jpg'
import colar2 from '@/img/colarHome2.jpg'
import colar3 from '@/img/colarHome3.jpg'
import brinco from '@/img/brincoHome.png'
import anel from '@/img/anelHome.png'

const hero = { left: colar1, center: colar2, right: colar3 }

const categorias = [
  { name: 'JOIAS', video: '/videos/joias.mp4' },
  { name: 'RELÓGIOS', video: '/videos/relogio.mp4' },
  { name: 'PERFUMES', video: '/videos/perfume.mp4' }
]

const lancamentos = ref([
  { id: 1, name: 'Colar Aura', price: 199, image: colar1 },
  { id: 2, name: 'Brinco Glow', price: 149, image: brinco },
  { id: 3, name: 'Anel Lux', price: 299, image: anel }
])

const destaques = ref([
  { id: 4, name: 'Colar Elite', price: 399, image: colar2 },
  { id: 5, name: 'Brinco Premium', price: 189, image: brinco },
  { id: 6, name: 'Anel Deluxe', price: 329, image: anel }
])

const router = useRouter()
const produtoSelecionado = ref(null)

const abrirModal = (p) => produtoSelecionado.value = p
const fecharModal = () => produtoSelecionado.value = null

const handleAddToCart = (p) => {
  addToCart(p)
  router.push('/carrinho')
}
</script>

<style scoped>
.home { font-family: 'Inter', sans-serif; color:#111; }

.hero-grid {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  height: 90vh;
}

.hero-item { position:relative; overflow:hidden; }
.hero-item img { width:100%; height:100%; object-fit:cover; transition:0.6s; }
.hero-item:hover img { transform:scale(1.05); }

.overlay {
  position:absolute; inset:0;
  background:rgba(0,0,0,0.4);
  display:flex; align-items:center; justify-content:center;
}

.content { color:white; text-align:center; }
.content h1 { font-size:48px; margin:10px 0; }
.content p { opacity:0.9; }

.btn {
  margin-top:20px;
  padding:12px 30px;
  border:1px solid white;
  background:transparent;
  color:white;
  cursor:pointer;
  transition:0.3s;
}
.btn:hover { background:white; color:black; }

.benefits {
  display:grid; grid-template-columns:repeat(4,1fr);
  padding:25px; background:#f8f8f8;
}

.benefit { text-align:center; }
.benefit span { font-size:22px; }

.products { padding:90px 6%; }

.title span { font-size:12px; letter-spacing:3px; color:#777; }
.title h2 { font-size:34px; margin-top:5px; }

.grid {
  display:grid; grid-template-columns:repeat(3,1fr);
  gap:30px; margin-top:40px;
}

.card { cursor:pointer; transition:0.3s; }
.card:hover { transform:translateY(-8px); }

.img { position:relative; overflow:hidden; }
.img img { width:100%; transition:0.5s; }
.img:hover img { transform:scale(1.1); }

.hover {
  position:absolute; bottom:0; width:100%;
  background:rgba(0,0,0,0.6); color:white;
  text-align:center; padding:10px;
  opacity:0; transition:0.3s;
}
.img:hover .hover { opacity:1; }

.categories { display:grid; grid-template-columns:repeat(3,1fr); }
.cat { height:60vh; position:relative; }
.cat video { width:100%; height:100%; object-fit:cover; }

.cat-overlay {
  position:absolute; inset:0;
  display:flex; align-items:center; justify-content:center;
  color:white; font-size:28px;
  background:rgba(0,0,0,0.3);
}

.premium {
  height:50vh; display:flex; align-items:center; justify-content:center;
  background:black; color:white;
}

.modal {
  position:fixed; inset:0;
  background:rgba(0,0,0,0.8);
  display:flex; align-items:center; justify-content:center;
}

.modal-box {
  background:white; padding:30px;
  border-radius:12px; text-align:center;
}
</style>