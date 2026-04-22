<template>
  <div class="casamento">

    <section class="banner">
      <h1>CASAMENTO</h1>
      <p>Joias que celebram o amor eterno</p>
    </section>

    <section class="categorias">
      <h2>COLEÇÃO DE CASAMENTO</h2>
      <p class="subtitulo">Escolhas por categorias</p>

      <div class="categorias-grid">
        <div class="categoria">
          <img :src="imgSolitarias" alt="Solitários">
          <span>Solitários</span>
        </div>

        <div class="categoria">
          <img :src="imgAliancas" alt="Alianças">
          <span>Alianças</span>
        </div>

        <div class="categoria">
          <img :src="imgBrincoNoiva" alt="Brincos">
          <span>Para a noiva</span>
        </div>

        <div class="categoria">
          <img :src="imgNoivo" alt="Noivo">
          <span>Para o Noivo</span>
        </div>
      </div>
    </section>

    <section class="aliancas">
      <h2>ALIANÇAS DE CASAMENTO</h2>
      <p class="subtitulo">Modelos que simbolizam o amor eterno</p>

      <div class="produtos-grid">
        <div 
          class="produto" 
          v-for="produto in aliancasLista" 
          :key="produto.id"
          @click="handleAddToCart(produto)"
        >
          <img :src="produto.img" :alt="produto.nome">
          <h3>{{ produto.nome }}</h3>
          <p class="preco">R$ {{ produto.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</p>
        </div>
      </div>

      <div class="ver-todos">
        <button>Ver Todos</button>
      </div>
    </section>

    <section class="estilos">
      <h2>ESCOLHA POR ESTILO</h2>
      <p class="subtitulo">Joias perfeitas para cada estilo de noiva</p>

      <div class="estilos-grid">
        <div class="estilo">
          <div class="img-container">
            <img :src="imgClassico1" class="img1">
            <img :src="imgClassico2" class="img2">
          </div>
          <span>Clássico</span>
        </div>

        <div class="estilo">
          <div class="img-container">
            <img :src="imgModerno1" class="img1">
            <img :src="imgModerno2" class="img2">
          </div>
          <span>Moderno</span>
        </div>

        <div class="estilo">
          <div class="img-container">
            <img :src="imgMinimalista1" class="img1">
            <img :src="imgMinimalista2" class="img2">
          </div>
          <span>Minimalista</span>
        </div>

        <div class="estilo">
          <div class="img-container">
            <img :src="imgLuxo1" class="img1">
            <img :src="imgLuxo2" class="img2">
          </div>
          <span>Luxo</span>
        </div>
      </div>
    </section>

    <section class="filtro-preco">
      <h2>FAIXA DE PREÇO</h2>
      <p class="subtitulo">Escolha o valor ideal</p>

      <div class="preco-wrapper">
        <div class="precos">
          <span>R$ {{ precoMin }}</span>
          <span>R$ {{ precoMax }}</span>
        </div>

        <div class="sliders">
          <input type="range" min="0" max="5000" step="100" v-model="precoMin">
          <input type="range" min="0" max="5000" step="100" v-model="precoMax">
        </div>
      </div>
    </section>

    <div class="voltar-inicio">
      <router-link to="/">
        <button>Voltar ao Início</button>
      </router-link>
    </div>

  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { addToCart } from "@/stores/cart" // Importando a ação do carrinho

const router = useRouter()
const precoMin = ref(500)
const precoMax = ref(4000)

// ======= IMAGENS ======= //
const imgSolitarias = new URL('../img/solitarias.png', import.meta.url).href
const imgAliancas = new URL('../img/aliancas.png', import.meta.url).href
const imgBrincoNoiva = new URL('../img/brinconoiva.png', import.meta.url).href
const imgNoivo = new URL('../img/noivo.png', import.meta.url).href

const imgDp = new URL('../img/dp.png', import.meta.url).href
const imgPrata = new URL('../img/prata.png', import.meta.url).href
const imgDourada = new URL('../img/dourada.png', import.meta.url).href
const imgBrilho = new URL('../img/brilho.png', import.meta.url).href

const imgClassico1 = new URL('../img/classico.png', import.meta.url).href
const imgClassico2 = new URL('../img/modelo2.png', import.meta.url).href

const imgModerno1 = new URL('../img/reld.png', import.meta.url).href
const imgModerno2 = new URL('../img/modelo1.png', import.meta.url).href

const imgMinimalista1 = new URL('../img/delicado.png', import.meta.url).href
const imgMinimalista2 = new URL('../img/modelo.png', import.meta.url).href

const imgLuxo1 = new URL('../img/cl.png', import.meta.url).href
const imgLuxo2 = new URL('../img/modelo4.png', import.meta.url).href

// ======= LISTA DE PRODUTOS ======= //
const aliancasLista = ref([
  { id: 'cas-1', nome: "Aliança Ouro Clássica", preco: 2490.00, img: imgDp },
  { id: 'cas-2', nome: "Aliança com Diamantes", preco: 3290.00, img: imgPrata },
  { id: 'cas-3', nome: "Aliança Moderna", preco: 2890.00, img: imgDourada },
  { id: 'cas-4', nome: "Aliança Premium", preco: 3990.00, img: imgBrilho }
])

// ======= FUNÇÃO ADICIONAR E REDIRECIONAR ======= //
const handleAddToCart = (produto) => {
  const item = {
    id: produto.id,
    name: produto.nome,
    price: produto.preco,
    image: produto.img
  }
  
  addToCart(item)
  router.push('/carrinho')
}
</script>

<style scoped>
/* Estilos originais mantidos */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Montserrat:wght@300;400;500&display=swap');

.casamento{ font-family: 'Montserrat', sans-serif; }

.banner{
  height:300px;
  background:linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)),
  url("https://images.unsplash.com/photo-1519741497674-611481863552");
  background-size:cover;
  background-position:center;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  color:white;
}

.banner h1{ font-family:'Playfair Display', serif; font-size:48px; letter-spacing:8px; }
.banner p{ font-size:15px; }

.categorias{ padding:60px 120px 40px 120px; text-align:center; }
.categorias h2{ font-family:'Playfair Display', serif; font-size:34px; }
.subtitulo{ margin-top:8px; font-size:14px; letter-spacing:2px; text-transform:uppercase; color:#666; }

.categorias-grid{ display:flex; justify-content:center; gap:40px; margin-top:40px; flex-wrap:nowrap; padding:0 40px; }

.categoria{ width:260px; border:2px solid #e5e5e5; padding:15px; background:white; text-align:center; transition:0.3s; }
.categoria:hover{ border-color:#0b2a5c; }
.categoria img{ width:100%; height:260px; object-fit:contain; background:#fff; }
.categoria span{ display:block; margin-top:12px; font-size:14px; letter-spacing:2px; text-transform:uppercase; }

.aliancas{ padding:30px 80px 80px 80px; text-align:center; }
.aliancas h2{ font-family:'Playfair Display', serif; font-size:34px; }
.produtos-grid{ display:grid; grid-template-columns:repeat(4,1fr); gap:30px; margin-top:40px; }

.produto{ background:white; padding:20px; border:1px solid #eee; transition:0.3s; cursor: pointer; }
.produto:hover{ border-color:#0b2a5c; transform:translateY(-5px); }
.produto img{ width:100%; height:220px; object-fit:contain; }
.produto h3{ font-size:14px; margin-top:10px; }
.preco{ font-weight:600; margin-top:5px; color: #0b2a5c; }

.ver-todos{ margin-top:50px; }
.ver-todos button{ padding:20px 70px; font-size:16px; text-transform:uppercase; background:#0b2a5c; color:white; border:2px solid #0b2a5c; cursor:pointer; }
.ver-todos button:hover{ background:white; color:#0b2a5c; }

.estilos{ padding:80px 120px; text-align:center; border:2px solid #d4af37; margin:60px 40px; background:#fff; box-shadow:0 10px 30px rgba(0,0,0,0.08); position:relative; }
.estilos::before{ content:""; position:absolute; top:15px; left:15px; right:15px; bottom:15px; border:1px solid #e5e5e5; pointer-events: none; }
.estilos h2{ font-family:'Playfair Display', serif; font-size:34px; }

.estilos-grid{ display:grid; grid-template-columns:repeat(4, 1fr); gap:40px; margin-top:40px; justify-items:center; }
.estilo{ width:100%; max-width:300px; padding:20px; border:1px solid #eee; background:white; transition:0.3s; border-radius:10px; cursor: default; }
.estilo:hover{ border-color:#0b2a5c; transform:translateY(-8px); }

.img-container{ position:relative; width:100%; height:260px; overflow:hidden; }
.img-container img{ position:absolute; width:100%; height:100%; object-fit:cover; top:0; left:0; transition:0.4s; border-radius:8px; }

.img1{ opacity:1; }
.img2{ opacity:0; }

.estilo:hover .img1{ opacity:0; }
.estilo:hover .img2{ opacity:1; }

.estilo span{ display:block; margin-top:12px; font-size:16px; }

.filtro-preco{ padding:20px 80px 60px 80px; margin-top:-50px; text-align:center; }
.preco-wrapper{ width:420px; margin:35px auto 0 auto; }
.precos{ display:flex; justify-content:space-between; font-size:15px; font-weight:600; margin-bottom:15px; }
.sliders{ display:flex; flex-direction:column; gap:12px; }
.sliders input{ width:100%; cursor:pointer; }

.voltar-inicio{ text-align:center; margin-bottom:80px; }
.voltar-inicio button{ padding:18px 60px; font-size:15px; text-transform:uppercase; background:white; color:#0b2a5c; border:2px solid #0b2a5c; cursor:pointer; transition:0.3s; }
.voltar-inicio button:hover{ background:#0b2a5c; color:white; }

@media (max-width: 1024px) {
  .categorias-grid, .produtos-grid, .estilos-grid { grid-template-columns: repeat(2, 1fr); flex-wrap: wrap; }
  .categorias, .aliancas, .estilos { padding: 40px 20px; }
}
</style>