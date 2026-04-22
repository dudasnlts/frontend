<template>
  <div class="ivy-sale">
    <header class="page-header">
      <span class="subtitle">Curadoria de Luxo</span>
      <h1 class="main-title">Ivy Sale</h1>
      <div class="luxury-divider">
        <span class="line"></span>
        <span class="diamond"></span>
        <span class="line"></span>
      </div>
    </header>

    <section class="toolbar-v2">
      <div class="filter-top">
        <span class="results-info"><strong>{{ filteredProducts.length }}</strong> Peças Selecionadas</span>
        <button v-if="selectedCategories.length > 0 || priceFilter" class="btn-clear-all" @click="clearFilters">
          Limpar Filtros
        </button>
      </div>

      <div class="filter-main">
        <div class="category-pills">
          <button 
            v-for="c in categories" 
            :key="c"
            :class="['pill', { active: selectedCategories.includes(c) }]"
            @click="toggleCategory(c)"
          >
            {{ c }}
          </button>
        </div>

        <div class="filter-actions">
          <div class="price-pills">
            <button :class="['pill-sm', { active: priceFilter === 'low' }]" @click="setPrice('low')">Até R$200</button>
            <button :class="['pill-sm', { active: priceFilter === 'mid' }]" @click="setPrice('mid')">R$200 - R$500</button>
            <button :class="['pill-sm', { active: priceFilter === 'high' }]" @click="setPrice('high')">Acima de R$500</button>
          </div>
          
          <select v-model="sortBy" class="minimal-select">
            <option value="default">Destaques</option>
            <option value="low">Menor Preço</option>
            <option value="high">Maior Preço</option>
          </select>
        </div>
      </div>
    </section>

    <main class="products-grid">
      <article v-for="p in filteredProducts" :key="p.id" class="luxury-card" @click="openModal(p)">
        <div class="img-container">
          <div class="img-reveal-box">
             <img :src="p.image" class="product-img primary" :class="{ 'hidden': hovered === p.id }" />
             <img :src="p.image2" class="product-img secondary" :class="{ 'visible': hovered === p.id }" />
          </div>
          <div class="hover-overlay" @mouseenter="hovered = p.id" @mouseleave="hovered = null">
            <button class="quick-view">Visualizar</button>
          </div>
          <div v-if="p.discount" class="luxury-badge">OFF {{ p.discount }}%</div>
        </div>

        <div class="product-info-luxury">
          <span class="product-category-tag">{{ p.category }}</span>
          <h3 class="product-name-luxury">{{ p.name }}</h3>
          <div class="luxury-price-tag">
            <span class="old-price" v-if="p.oldPrice">{{ format(p.oldPrice) }}</span>
            <span class="current-price">{{ format(p.price) }}</span>
          </div>
        </div>
      </article>
    </main>

    <Teleport to="body">
      <Transition name="fade">
        <div v-if="selectedProduct" class="modal-backdrop" @click.self="closeModal">
          <div class="modal-content">
            <button class="close-modal" @click="closeModal">&times;</button>
            <div class="modal-grid">
              <div class="modal-gallery">
                <img :src="selectedProduct.image" :alt="selectedProduct.name">
              </div>
              <div class="modal-text">
                <span class="modal-cat">{{ selectedProduct.category }}</span>
                <h2 class="modal-title">{{ selectedProduct.name }}</h2>
                
                <p class="modal-desc">{{ selectedProduct.desc }}</p>

                <div class="product-specs">
                  <div class="spec-item">
                    <strong>Composição:</strong> 
                    <span>{{ selectedProduct.material }}</span>
                  </div>
                  <div class="spec-item">
                    <strong>Referência:</strong> 
                    <span>#IVY-{{ selectedProduct.id }}2026</span>
                  </div>
                  <div class="spec-item">
                    <strong>Disponibilidade:</strong> 
                    <span>Pronta Entrega</span>
                  </div>
                </div>

                <div class="modal-pricing">
                  <span class="modal-price">{{ format(selectedProduct.price) }}</span>
                </div>
                
                <div class="modal-actions">
  <button class="btn-buy">Adicionar à Sacola</button>
  <button class="btn-buy-now">Comprar Agora</button>
</div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const hovered = ref(null)
const sortBy = ref('default')
const selectedCategories = ref([])
const priceFilter = ref(null)
const selectedProduct = ref(null)

const categories = ['Anéis', 'Brincos', 'Pulseiras', 'Colares', 'Pingentes']

const toggleCategory = (cat) => {
  if (selectedCategories.value.includes(cat)) {
    selectedCategories.value = selectedCategories.value.filter(c => c !== cat)
  } else {
    selectedCategories.value.push(cat)
  }
}

const setPrice = (val) => {
  priceFilter.value = priceFilter.value === val ? null : val
}

const clearFilters = () => {
  selectedCategories.value = []
  priceFilter.value = null
}

const openModal = (product) => selectedProduct.value = product
const closeModal = () => selectedProduct.value = null

const products = ref([
  { 
    id: 1, name: 'Colar Riviera', category: 'Colares', price: 850, oldPrice: 1200, discount: 30, 
    image: 'src/img/colarvi.png', image2: 'src/img/colarvi2.png', 
    material: 'Prata 925 com Banho de Ródio', 
    desc: 'O Colar Riviera é um ícone de sofisticação. Com cravação contínua de zircônias de alta lapidação, ele oferece um brilho hipnotizante que eleva qualquer visual.' 
  },
  { 
    id: 2, name: 'Brinco Drop', category: 'Brincos', price: 180, oldPrice: 250, discount: 28, 
    image: 'src/img/anelvi.png', image2: 'src/img/colar2.png', 
    material: 'Banho de Ouro 18k e Pérola', 
    desc: 'O Brinco Drop combina o design minimalista de uma gota com a elegância clássica. Uma peça leve, ideal para quem busca luxo no cotidiano.' 
  },
  { 
    id: 3, name: 'Anel Solitário', category: 'Anéis', price: 420, oldPrice: 600, discount: 30, 
    image: 'src/img/anel112.png', image2: 'src/img/anelivy.png', 
    material: 'Prata 925 e Cristal de Safira', 
    desc: 'O Anel Solitário representa a pureza do design. Sua pedra central é cuidadosamente posicionada para capturar a luz e refletir brilho máximo.' 
  },
  { 
    id: 4, name: 'Pulseira Grumet', category: 'Pulseiras', price: 350, oldPrice: 480, discount: 27, 
    image: 'src/img/dourada2.png', image2: 'src/img/dourada1.png', 
    material: 'Ouro Amarelo 18k Camada Tripla', 
    desc: 'Robusta e moderna, a Pulseira Grumet é perfeita para composições marcantes. Seu elo clássico traz autoridade e estilo ao pulso feminino.' 
  },
  { 
    id: 5, name: 'Colar Tiffany', category: 'Colares', price: 920, oldPrice: 1500, discount: 38, 
    image: 'src/img/colarti.png', image2: 'src/img/colar23.png', 
    material: 'Prata de Lei 925 Polida', 
    desc: 'Inspirado nas grandes maisons, este colar traz um design atemporal. Sua corrente delicada e pingente central formam um conjunto harmonioso e luxuoso.' 
  },
  { 
    id: 6, name: 'Anel Cravejado', category: 'Anéis', price: 290, oldPrice: 380, discount: 23, 
    image: 'src/img/anel211.png', image2: 'src/img/anel.png', 
    material: 'Prata 925 com Micro-zircônias', 
    desc: 'O Anel Cravejado é um trabalho de minúcia. Centenas de cristais aplicados manualmente conferem uma textura de brilho ininterrupto à peça.' 
  },
  { 
    id: 7, name: 'Brinco Argola', category: 'Brincos', price: 150, oldPrice: 210, discount: 28, 
    image: 'src/img/brinco23.png', image2: 'src/img/brinquinho.png', 
    material: 'Banho de Ródio Branco Premium', 
    desc: 'Essenciais em qualquer porta-joias, nossas argolas possuem acabamento espelhado e fecho de alta segurança, unindo conforto e beleza.' 
  },
  { 
    id: 8, name: 'Pulseira Riviera', category: 'Pulseiras', price: 580, oldPrice: 800, discount: 27, 
    image: 'src/img/pulseira12.png', image2: 'src/img/pulseira233.png', 
    material: 'Prata 925 e Zircônia Cristal', 
    desc: 'A Pulseira Riviera envolve o pulso com uma linha de luz contínua. É a escolha definitiva para eventos formais ou para iluminar um look casual.' 
  },
  { 
    id: 9, name: 'Pingente Cruz', category: 'Pingentes', price: 120, oldPrice: 190, discount: 36, 
    image: 'src/img/pingente11.png', image2: 'src/img/pingene.png', 
    material: 'Prata Maciça 925', 
    desc: 'Um símbolo de proteção e estilo. Este pingente possui lapidação moderna nas bordas, conferindo um aspecto contemporâneo a um design milenar.' 
  },
  { 
    id: 10, name: 'Colar Veneziano', category: 'Colares', price: 450, oldPrice: 600, discount: 25, 
    image: 'src/img/colar125.png', image2: 'src/img/colar122.png', 
    material: 'Banho de Ouro 18k e Verniz Antialérgico', 
    desc: 'A malha Veneziana é famosa por sua resistência e fluidez. Este colar desliza sobre a pele, proporcionando um brilho metálico sofisticado.' 
  },
  { 
    id: 11, name: 'Anel Aliança', category: 'Anéis', price: 210, oldPrice: 300, discount: 30, 
    image: 'src/img/aneis.png', image2: 'src/img/anel77.png', 
    material: 'Prata 925 com Detalhes em Ródio Negro', 
    desc: 'Uma releitura moderna da aliança tradicional. O banho de ródio negro confere uma aura de mistério e exclusividade à peça.' 
  },
  { 
    id: 12, name: 'Brinco Pérola', category: 'Brincos', price: 130, oldPrice: 200, discount: 35, 
    image: 'src/img/perola1.png', image2: 'src/img/perola2.png', 
    material: 'Pérola de Água Doce Selecionada', 
    desc: 'Nada supera o charme das pérolas. Este brinco utiliza gemas orgânicas selecionadas por sua esfericidade e oriente (brilho interno) superior.' 
  }
])

const filteredProducts = computed(() => {
  let list = [...products.value]
  if (selectedCategories.value.length) list = list.filter(p => selectedCategories.value.includes(p.category))
  if (priceFilter.value === 'low') list = list.filter(p => p.price <= 200)
  if (priceFilter.value === 'mid') list = list.filter(p => p.price > 200 && p.price <= 500)
  if (priceFilter.value === 'high') list = list.filter(p => p.price > 500)
  if (sortBy.value === 'low') list.sort((a,b)=>a.price-b.price)
  if (sortBy.value === 'high') list.sort((a,b)=>b.price-a.price)
  return list
})

const format = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
</script>

<style scoped>
/* Estilos mantidos conforme a última versão para garantir a consistência visual */
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Inter:wght@300;400;600&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');

.ivy-sale { padding: 40px 5%; background: #fff; font-family: 'Inter', sans-serif; color: #1a1a1a; }

.page-header { text-align: center; margin-bottom: 40px; }
.main-title { font-family: 'Cinzel', serif; letter-spacing: 4px; text-transform: uppercase; font-size: 38px; margin: 0; }
.subtitle { font-size: 11px; text-transform: uppercase; letter-spacing: 3px; color: #b38e5d; font-weight: 600; }
.luxury-divider { display: flex; align-items: center; justify-content: center; gap: 15px; margin-top: 10px; }
.luxury-divider .line { width: 40px; height: 1px; background: #b38e5d; }
.luxury-divider .diamond { width: 6px; height: 6px; background: #b38e5d; transform: rotate(45deg); }

.toolbar-v2 { margin-bottom: 40px; border-top: 1px solid #f2f2f2; border-bottom: 1px solid #f2f2f2; padding: 20px 0; }
.filter-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
.results-info { font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 1px; }
.btn-clear-all { background: none; border: none; font-size: 10px; color: #b38e5d; text-decoration: underline; cursor: pointer; text-transform: uppercase; }

.category-pills { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 20px; }
.pill { padding: 8px 18px; border: 1px solid #eee; background: #fff; border-radius: 30px; font-size: 11px; text-transform: uppercase; cursor: pointer; transition: 0.3s; }
.pill.active { background: #1a1a1a; color: #fff; border-color: #1a1a1a; }

.filter-actions { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px; }
.price-pills { display: flex; gap: 8px; }
.pill-sm { padding: 6px 12px; border: 1px solid #f2f2f2; background: #f9f9f9; border-radius: 4px; font-size: 10px; cursor: pointer; }
.pill-sm.active { border-color: #b38e5d; background: #fff; color: #b38e5d; }

.minimal-select { border: none; border-bottom: 1px solid #eee; font-size: 11px; text-transform: uppercase; padding: 5px; cursor: pointer; outline: none; }

.products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 40px 25px; }
.luxury-card { cursor: pointer; }
.img-container { position: relative; aspect-ratio: 3/4; overflow: hidden; background: #f9f9f9; }
.product-img { width: 100%; height: 100%; object-fit: cover; position: absolute; transition: 0.8s ease; }
.product-img.secondary { opacity: 0; transform: scale(1.05); }
.product-img.secondary.visible { opacity: 1; transform: scale(1); }
.product-img.primary.hidden { opacity: 0; }

.hover-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.03); opacity: 0; display: flex; align-items: center; justify-content: center; transition: 0.3s; }
.luxury-card:hover .hover-overlay { opacity: 1; }
</style>