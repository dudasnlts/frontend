<template>
  <header class="ivy-header">
    
    <div class="announcement-bar">
      <div class="container-fluid flex-between">
        <div class="top-left">
          <RouterLink to="/atendimento" class="top-link">Suporte ao Cliente</RouterLink>
        </div>
        
        <div class="top-center">
          <Transition name="fade-slide" mode="out-in">
            <span :key="currentMessage">{{ currentMessage }}</span>
          </Transition>
        </div>

        <div class="top-right">
          <RouterLink to="/acessibilidade" class="access-pill">
            <Accessibility :size="14" />
            <span>Acessibilidade</span>
          </RouterLink>
        </div>
      </div>
    </div>

    <div class="main-header">
      <div class="container-fluid header-grid">
        
        <div class="nav-group-left">
          <div class="location-trigger" :class="{ 'has-data': endereco }">
            <MapPin :size="18" stroke-width="1.5" />
            <div class="location-inputs">
              <input 
                type="text" 
                placeholder="Informe seu CEP" 
                v-model="cep" 
                @input="buscarCep"
                maxlength="9"
              >
              <span v-if="endereco" class="loc-text">{{ endereco }}</span>
            </div>
          </div>
        </div>

        <RouterLink to="/" class="brand-logo">
          <h1>IVY</h1>
        </RouterLink>

        <div class="nav-group-right">
          
          <div class="search-wrapper" :class="{ 'is-active': searchActive }">
            <Search 
              class="nav-icon" 
              @click="searchActive = !searchActive" 
              :size="22" 
              stroke-width="1.5" 
            />
            <div class="search-box">
              <input 
                type="text" 
                placeholder="O que você procura?" 
                v-model="searchText"
                @input="buscarProdutos"
                ref="searchInput"
              >
              <X v-if="searchActive" class="close-search" @click="searchActive = false" :size="18"/>
              
              <Transition name="fade">
                <div v-if="resultadosBusca.length && searchActive" class="search-results">
                  <ul>
                    <li v-for="p in resultadosBusca" :key="p.id" @click="irParaProduto(p)">
                      <div class="res-info">
                        <span class="res-name">{{ p.nome }}</span>
                        <span class="res-cat">{{ p.categoria }}</span>
                      </div>
                      <ArrowUpRight :size="14" />
                    </li>
                  </ul>
                </div>
              </Transition>
            </div>
          </div>

          <User 
            class="nav-icon" 
            @click="goLogin" 
            :size="22" 
            stroke-width="1.5" 
          />

          <div class="bag-wrapper" @click="goCart">
            <ShoppingBag :size="22" stroke-width="1.5" />
            <span v-if="cart.items.length" class="bag-count">
              {{ cart.items.length }}
            </span>
          </div>

        </div>
      </div>
    </div>

    <nav class="category-nav">
      <div class="nav-links">
        <RouterLink to="/joias">JOIAS</RouterLink>
        <RouterLink to="/pingentes">PINGENTES</RouterLink>
        <RouterLink to="/casamento">CASAMENTO</RouterLink>
        <RouterLink to="/perfumes">PERFUMES</RouterLink>
        <RouterLink to="/relogios">RELÓGIOS</RouterLink>
        <RouterLink to="/sale" class="sale-link">SALE</RouterLink>
      </div>
    </nav>

  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue"
import { useRouter, RouterLink } from "vue-router"
import { cart } from "@/stores/cart"
import { 
  Search, ShoppingBag, User, MapPin, 
  Accessibility, X, ArrowUpRight 
} from "lucide-vue-next"

const router = useRouter()
const searchActive = ref(false)
const searchInput = ref(null)

/* Foco na busca */
watch(searchActive, (val) => {
  if(val) setTimeout(() => searchInput.value?.focus(), 100)
})

/* Top Bar Messages */
const messages = ["Frete cortesia em pedidos premium", "10% de benefício via PIX", "Curadoria exclusiva Ivy"]
const currentMessage = ref(messages[0])
let msgIdx = 0
let msgInterval

/* CEP */
const cep = ref("")
const endereco = ref("")
async function buscarCep(){
  const val = cep.value.replace(/\D/g,"")
  if(val.length === 8) {
    try {
      const res = await fetch(`https://viacep.com.br/ws/${val}/json/`)
      const data = await res.json()
      if(!data.erro) endereco.value = `${data.localidade}, ${data.uf}`
    } catch { endereco.value = "Erro ao buscar" }
  }
}

/* Busca de Produtos Mockados */
const searchText = ref("")
const resultadosBusca = ref([])
const produtos = ref([
  { id:1, nome:"Anel Solitário Ouro", categoria:"Joias" },
  { id:2, nome:"Colar Riviera", categoria:"Alta Joalheria" },
  { id:3, nome:"Relógio Chronos Platinum", categoria:"Relógios" }
])

function buscarProdutos(){
  const t = searchText.value.toLowerCase()
  resultadosBusca.value = t.length > 2 ? produtos.value.filter(p => p.nome.toLowerCase().includes(t)) : []
}

function irParaProduto(p){
  router.push(`/produto/${p.id}`)
  searchActive.value = false
  searchText.value = ""
}

const goLogin = () => {
  console.log("clicou no user icon")

  const user = JSON.parse(localStorage.getItem("user"))
  router.push(user ? "/perfil" : "/login")
}
const goCart = () => router.push("/cart")

onMounted(() => {
  msgInterval = setInterval(() => {
    msgIdx = (msgIdx + 1) % messages.length
    currentMessage.value = messages[msgIdx]
  }, 4500)
})

onUnmounted(() => clearInterval(msgInterval))
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Inter:wght@300;400;500&display=swap');

.ivy-header {
  background: #fff;
  width: 100%;
  z-index: 1000;
  border-bottom: 1px solid #f2f2f2;
}

/* TOP BAR */
.announcement-bar {
  background: #0a192f;
  color: #fff;
  padding: 10px 40px;
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.flex-between { display: flex; justify-content: space-between; align-items: center; }

.top-link { color: rgba(255,255,255,0.8); text-decoration: none; transition: 0.3s; }
.top-link:hover { color: #fff; }

.access-pill {
  background: rgba(255,255,255,0.1);
  text-decoration: none;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 14px;
  border-radius: 100px;
  cursor: pointer;
  transition: 0.3s;
}
.access-pill:hover { background: rgba(255,255,255,0.3); transform: translateY(-1px); }

/* MAIN NAV */
.main-header {
  height: 100px;
  padding: 0 40px;
  display: flex;
  align-items: center;
}

.header-grid {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  width: 100%;
  align-items: center;
}

.location-trigger { display: flex; align-items: center; gap: 12px; color: #0a192f; }
.location-inputs { display: flex; flex-direction: column; }
.location-inputs input { border: none; font-size: 13px; width: 120px; outline: none; background: transparent; }
.loc-text { font-size: 10px; color: #888; text-transform: uppercase; }

.brand-logo { text-decoration: none; text-align: center; }
.brand-logo h1 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 48px;
  letter-spacing: 0.2em;
  color: #0a192f;
  margin: 0;
}

.nav-group-right { display: flex; justify-content: flex-end; align-items: center; gap: 28px; }
.nav-icon { color: #0a192f; cursor: pointer; transition: 0.3s; }

/* SEARCH BOX */
.search-wrapper { display: flex; align-items: center; position: relative; }
.search-box {
  position: absolute;
  right: 0;
  width: 0;
  opacity: 0;
  overflow: hidden;
  transition: all 0.5s ease;
  display: flex;
  align-items: center;
}
.search-wrapper.is-active .search-box { width: 300px; opacity: 1; border-bottom: 1px solid #0a192f; }
.search-box input { width: 100%; border: none; outline: none; padding: 5px; }

.search-results {
  position: absolute;
  top: 45px;
  right: 0;
  width: 100%;
  background: #fff;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  padding: 10px 0;
  z-index: 100;
}
.search-results li { padding: 10px 20px; cursor: pointer; display: flex; justify-content: space-between; }
.res-name { font-size: 13px; font-weight: 500; }
.res-cat { font-size: 10px; color: #999; }

.bag-wrapper { position: relative; cursor: pointer; }
.bag-count {
  position: absolute;
  top: -8px; right: -10px;
  background: #0a192f; color: #fff;
  font-size: 9px; width: 18px; height: 18px;
  display: flex; align-items: center; justify-content: center; border-radius: 50%;
}

/* CATEGORY NAV */
.category-nav { padding: 15px 0; border-top: 1px solid #f9f9f9; }
.nav-links { display: flex; justify-content: center; gap: 50px; }
.nav-links a { text-decoration: none; color: #0a192f; font-size: 12px; font-weight: 500; letter-spacing: 0.15em; }
.sale-link { color: #d4a373 !important; }

/* TRANSITIONS */
.fade-slide-enter-active, .fade-slide-leave-active { transition: all 0.5s ease; }
.fade-slide-enter-from { opacity: 0; transform: translateY(10px); }
.fade-slide-leave-to { opacity: 0; transform: translateY(-10px); }
</style>