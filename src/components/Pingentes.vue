<template>
  <div class="pagina-pingentes">

    <!-- PARTÍCULAS DECORATIVAS -->
    <div class="particles">
      <span v-for="n in 12" :key="n" :class="`particle p${n}`"></span>
    </div>

    <!-- HEADER -->
    <header class="header">
      <div class="header-ornament top-left">✦</div>
      <div class="header-ornament top-right">✦</div>
      <p class="header-eyebrow">Coleção Exclusiva</p>
      <h1 class="header-title">
        <span class="title-ivy">IVY</span>
        <span class="title-pingentes">PINGENTES</span>
      </h1>
      <div class="header-line">
        <span class="line-gem">◆</span>
      </div>
      <p class="header-sub">Elegância e brilho em cada detalhe</p>
    </header>

    <!-- FILTROS -->
    <nav class="filtros">
      <div class="filtros-inner">

        <!-- Busca -->
        <div class="search-box">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input v-model="busca" type="text" placeholder="Buscar pingente..." />
        </div>

        <!-- Filtro Material -->
        <div class="filtro-material">
          <button 
            :class="['btn-material', { active: materialFiltro === '' }]"
            @click="materialFiltro = ''"
          >Todos</button>
          <button 
            :class="['btn-material dourado', { active: materialFiltro === 'dourado' }]"
            @click="materialFiltro = 'dourado'"
          >
            <span class="dot dourado-dot"></span> Dourado
          </button>
          <button 
            :class="['btn-material prata', { active: materialFiltro === 'prata' }]"
            @click="materialFiltro = 'prata'"
          >
            <span class="dot prata-dot"></span> Prata
          </button>
        </div>

        <!-- Ordenar -->
        <div class="select-wrapper">
          <select v-model="ordenar">
            <option value="">Ordenar por</option>
            <option value="menor">Menor preço</option>
            <option value="maior">Maior preço</option>
          </select>
          <svg class="select-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </div>

      </div>
    </nav>

    <!-- CONTEÚDO PRINCIPAL -->
    <main class="container">

      <!-- SEÇÃO DOURADOS -->
      <template v-if="materialFiltro === '' || materialFiltro === 'dourado'">
        <div v-if="pingentesDourado.length > 0" class="section-header">
          <div class="section-line"></div>
          <h2 class="section-title">
            <span class="section-gem">◆</span> Pingentes Dourados
          </h2>
          <div class="section-line"></div>
        </div>

        <TransitionGroup name="list" tag="section" class="grid">
          <article
            class="card"
            v-for="pingente in pingentesDourado"
            :key="pingente.id"
            @click="abrirModal(pingente)"
          >
            <div class="card-badge dourado-badge">Ouro 18k</div>
            <div class="image-wrapper">
              <img :src="pingente.imagem" :alt="pingente.nome" />
              <div class="card-overlay">
                <span>Ver detalhes</span>
              </div>
            </div>
            <div class="card-info">
              <h3>{{ pingente.nome }}</h3>
              <p class="card-material dourado-text">Banho de Ouro 18k</p>
              <p class="price">{{ formatarPreco(pingente.preco) }}</p>
            </div>
          </article>
        </TransitionGroup>
      </template>

      <!-- SEÇÃO PRATA -->
      <template v-if="materialFiltro === '' || materialFiltro === 'prata'">
        <div v-if="pingentesPrata.length > 0" class="section-header">
          <div class="section-line"></div>
          <h2 class="section-title">
            <span class="section-gem prata-gem">◆</span> Pingentes em Prata
          </h2>
          <div class="section-line"></div>
        </div>

        <TransitionGroup name="list" tag="section" class="grid">
          <article
            class="card"
            v-for="pingente in pingentesPrata"
            :key="pingente.id"
            @click="abrirModal(pingente)"
          >
            <div class="card-badge prata-badge">Prata 925</div>
            <div class="image-wrapper">
              <img :src="pingente.imagem" :alt="pingente.nome" />
              <div class="card-overlay">
                <span>Ver detalhes</span>
              </div>
            </div>
            <div class="card-info">
              <h3>{{ pingente.nome }}</h3>
              <p class="card-material prata-text">Prata 925</p>
              <p class="price">{{ formatarPreco(pingente.preco) }}</p>
            </div>
          </article>
        </TransitionGroup>
      </template>

      <!-- EMPTY STATE -->
      <div v-if="pingentesDourado.length === 0 && pingentesPrata.length === 0" class="empty-state">
        <div class="empty-gem">◇</div>
        <p>Nenhum pingente encontrado para <strong>"{{ busca }}"</strong></p>
        <button @click="busca = ''; materialFiltro = ''">Limpar filtros</button>
      </div>

    </main>

    <!-- FOOTER DECORATIVO -->
    <footer class="footer">
      <div class="footer-line">
        <span class="footer-gem">◆ IVY ◆</span>
      </div>
      <p>Cada peça conta uma história única</p>
    </footer>

    <!-- MODAL -->
    <Transition name="modal-fade">
      <div v-if="produtoSelecionado" class="modal-overlay" @click.self="fecharModal">
        <div class="modal-content">

          <button class="close-x" @click="fecharModal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="20" height="20">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>

          <div class="modal-body">

            <!-- Imagem -->
            <div class="modal-image-side">
              <div class="modal-badge" :class="produtoSelecionado.tipo === 'dourado' ? 'dourado-badge' : 'prata-badge'">
                {{ produtoSelecionado.tipo === 'dourado' ? 'Ouro 18k' : 'Prata 925' }}
              </div>
              <div class="modal-image-container">
                <img :src="produtoSelecionado.imagem" :alt="produtoSelecionado.nome" />
              </div>
              <div class="modal-image-caption">✦ Acabamento Premium ✦</div>
            </div>

            <!-- Detalhes -->
            <div class="modal-details">
              <p class="modal-eyebrow">Coleção IVY · {{ produtoSelecionado.tipo === 'dourado' ? 'Série Dourada' : 'Série Prata' }}</p>
              <h2 class="modal-title">{{ produtoSelecionado.nome }}</h2>

              <div class="modal-divider">
                <span class="modal-gem">◆</span>
              </div>

              <p class="modal-description">{{ produtoSelecionado.descricao }}</p>

              <div class="modal-specs">
                <div class="spec">
                  <span class="spec-label">Material</span>
                  <span class="spec-value" :class="produtoSelecionado.tipo === 'dourado' ? 'dourado-text' : 'prata-text'">
                    {{ produtoSelecionado.tipo === 'dourado' ? 'Liga de prata com banho ouro 18k' : 'Prata 925' }}
                  </span>
                </div>
                <div class="spec">
                  <span class="spec-label">Garantia</span>
                  <span class="spec-value">12 meses</span>
                </div>
                <div class="spec">
                  <span class="spec-label">Envio</span>
                  <span class="spec-value">Em até 5 dias úteis</span>
                </div>
              </div>

             <p class="modal-price">
  {{ formatarPreco(produtoSelecionado?.preco) }}
</p>

<p class="modal-installments">
  ou 3x de {{ formatarPreco((produtoSelecionado?.preco || 0) / 3) }} sem juros
</p>
              <div class="modal-actions">
                <button class="btn-carrinho" @click="adicionarCarrinho">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
                    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                  </svg>
                  Adicionar ao Carrinho
                </button>
                <button class="btn-comprar" @click="comprarProduto">
                  Comprar Agora
                </button>
              </div>

              <p class="modal-seguro">🔒 Compra segura · Troca grátis em 30 dias</p>
            </div>

          </div>
        </div>
      </div>
    </Transition>

    <!-- TOAST CARRINHO -->
    <Transition name="toast-fade">
      <div v-if="toastVisivel" class="toast">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
          <path d="M20 6 9 17l-5-5"/>
        </svg>
        {{ toastMensagem }}
      </div>
    </Transition>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const busca = ref('')
const ordenar = ref('')
const materialFiltro = ref('')
const produtoSelecionado = ref(null)
const toastVisivel = ref(false)
const toastMensagem = ref('')
const carrinho = ref([])

const showToast = (msg) => {
  toastMensagem.value = msg
  toastVisivel.value = true
  setTimeout(() => { toastVisivel.value = false }, 3000)
}

const pingentes = ref([
  {
    id: 1,
    nome: 'Pulseira Berloque',
    preco: 89.9,
    tipo: 'prata',
    imagem: new URL('../img/berloque.png', import.meta.url).href,
    descricao: 'Confeccionada em prata 925 com malha maleável e acabamento polido, esta pulseira é a base perfeita para construir sua história através de berloques. Design clássico e atemporal que se adapta a qualquer ocasião.'
  },
  {
    id: 2,
    nome: 'Coração',
    preco: 300.0,
    tipo: 'prata',
    imagem: new URL('../img/berloque1.png', import.meta.url).href,
    descricao: 'Pingente em liga de prata com banho de ouro amarelo 18k, moldado no formato de um coração perfeito. Símbolo universal do amor, este berloque é ideal para presentear quem ocupa um lugar especial em sua vida.'
  },
  {
    id: 3,
    nome: 'Olho Grego',
    preco: 119.9,
    tipo: 'prata',
    imagem: new URL('../img/berloque2.png', import.meta.url).href,
    descricao: 'Em prata 925 com acabamento em esmalte vitrificado, este amuleto milenar traz consigo a energia de proteção contra o mau-olhado. Uma peça cheia de significado e charme que combina tradição e estilo contemporâneo.'
  },
  {
    id: 4,
    nome: 'Estrela',
    preco: 220.9,
    tipo: 'prata',
    imagem: new URL('../img/berloque3.png', import.meta.url).href,
    descricao: 'Criada em liga de prata com banho de ouro 18k, esta estrela de cinco pontas captura o brilho do céu noturno. Para quem acredita que pode tudo que sonha — um lembrete constante de que você é luz.'
  },
  {
    id: 5,
    nome: 'Laço',
    preco: 199.9,
    tipo: 'prata',
    imagem: new URL('../img/berloque4.png', import.meta.url).href,
    descricao: 'Esculpido em prata 925 com delicados detalhes em relevo, este laço celebra os vínculos mais preciosos da vida. Uma peça feminina e versátil que adiciona graça e leveza ao visual do dia a dia.'
  },
  {
    id: 6,
    nome: 'Religioso Fé',
    preco: 79.9,
    tipo: 'prata',
    imagem: new URL('../img/berloque5.png', import.meta.url).href,
    descricao: 'Pingente minimalista em liga de prata com banho de ouro 18k, inspirado na espiritualidade que nos guia. Carregue um lembrete de fé e proteção em cada detalhe desta peça de design clean e significado profundo.'
  },
  {
    id: 7,
    nome: 'Cristo Redentor',
    preco: 180,
    tipo: 'prata',
    imagem: new URL('../img/berloque10.png', import.meta.url).href,
    descricao: 'Em prata 925 com riquíssimos detalhes artesanais, esta miniatura do Cristo Redentor homenageia um dos maiores ícones da humanidade. Uma peça única para quem ama o Brasil e deseja carregar sua cultura onde for.'
  },
  {
    id: 8,
    nome: 'Bola de Vôlei',
    preco: 200,
    tipo: 'prata',
    imagem: new URL('../img/berloque11.png', import.meta.url).href,
    descricao: 'Feita em liga de prata com banho de ouro 18k, esta bola de vôlei em miniatura é a escolha perfeita para atletas e apaixonados pelo esporte. Uma forma elegante de eternizar sua dedicação e paixão pela quadra.'
  },
  {
    id: 9,
    nome: 'Felicidade',
    preco: 200,
    tipo: 'prata',
    imagem: new URL('../img/berloque12.png', import.meta.url).href,
    descricao: 'Pingente em prata 925 com gravação delicada da palavra que resume tudo que buscamos. Para celebrar conquistas, memórias felizes e momentos que merecem durar para sempre — porque a felicidade pode sim ser eterna.'
  },
  {
    id: 10,
    nome: 'Câmera Fotográfica',
    preco: 299.90,
    tipo: 'prata',
    imagem: new URL('../img/pingente13.png', import.meta.url).href,
    descricao: 'Em prata 925 com detalhes minuciosos que reproduzem cada botão e lente, este berloque é um tributo à arte de fotografar. Para quem vê o mundo através de uma lente e guarda memórias com o coração.'
  },
  {
    id: 11,
    nome: 'Câmera Clássica',
    preco: 299.90,
    tipo: 'prata',
    imagem: new URL('../img/berloque13.png', import.meta.url).href,
    descricao: 'Com o brilho inconfundível do ouro 18k e design moderno, esta câmera em miniatura é uma declaração de estilo. Perfeita para fotógrafos apaixonados que querem carregar sua arte com elegância e sofisticação.'
  },
  {
    id: 12,
    nome: 'Separador de Coração',
    preco: 250.90,
    tipo: 'prata',
    imagem: new URL('../img/berloque17.png', import.meta.url).href,
    descricao: 'Em liga de prata banhada a ouro 18k, esta câmera vintage em estilo retrô homenageia a era dourada da fotografia analógica. Para quem aprecia clássicos e tem personalidade marcante em cada escolha.'
  }, 
  {
    id: 13,
    nome: 'Borboleta',
    preco: 250.90,
    tipo: 'prata',
    imagem: new URL('../img/berloque14.png', import.meta.url).href,
    descricao: 'Em liga de prata banhada a ouro 18k, esta câmera vintage em estilo retrô homenageia a era dourada da fotografia analógica. Para quem aprecia clássicos e tem personalidade marcante em cada escolha.'
  }, 
  {
    id: 14,
    nome: 'Borboleta',
    preco: 250.90,
    tipo: 'prata',
    imagem: new URL('../img/berloque6.png', import.meta.url).href,
    descricao: 'Em liga de prata banhada a ouro 18k, esta câmera vintage em estilo retrô homenageia a era dourada da fotografia analógica. Para quem aprecia clássicos e tem personalidade marcante em cada escolha.'
  }, 
  {
    id: 15,
    nome: 'Trevo de Quatro folhas',
    preco: 250.90,
    tipo: 'prata',
    imagem: new URL('../img/berloque7.png', import.meta.url).href,
    descricao: 'Em liga de prata banhada a ouro 18k, esta câmera vintage em estilo retrô homenageia a era dourada da fotografia analógica. Para quem aprecia clássicos e tem personalidade marcante em cada escolha.'
  },
   {
    id: 16,
    nome: 'Árvore da vida',
    preco: 250.90,
    tipo: 'prata',
    imagem: new URL('../img/berloque8.png', import.meta.url).href,
    descricao: 'Em liga de prata banhada a ouro 18k, esta câmera vintage em estilo retrô homenageia a era dourada da fotografia analógica. Para quem aprecia clássicos e tem personalidade marcante em cada escolha.'
  },
  {
    id: 17,
    nome: 'Flor',
    preco: 180.90,
    tipo: 'prata',
    imagem: new URL('../img/berloque19.png', import.meta.url).href,
    descricao: 'Em liga de prata banhada a ouro 18k, esta câmera vintage em estilo retrô homenageia a era dourada da fotografia analógica. Para quem aprecia clássicos e tem personalidade marcante em cada escolha.'
  },
  {
    id: 18,
    nome: 'Flor',
    preco: 180.90,
    tipo: 'dourado',
    imagem: new URL('../img/berloque18.png', import.meta.url).href,
    descricao: 'Em liga de prata banhada a ouro 18k, esta câmera vintage em estilo retrô homenageia a era dourada da fotografia analógica. Para quem aprecia clássicos e tem personalidade marcante em cada escolha.'
  },
  {
    id: 18,
    nome: 'Flor',
    preco: 180.90,
    tipo: 'dourado',
    imagem: new URL('../img/berloque16.png', import.meta.url).href,
    descricao: 'Em liga de prata banhada a ouro 18k, esta câmera vintage em estilo retrô homenageia a era dourada da fotografia analógica. Para quem aprecia clássicos e tem personalidade marcante em cada escolha.'
  },
  {
    id: 19,
    nome: 'Flor',
    preco: 180.90,
    tipo: 'dourado',
    imagem: new URL('../img/berloque15.png', import.meta.url).href,
    descricao: 'Em liga de prata banhada a ouro 18k, esta câmera vintage em estilo retrô homenageia a era dourada da fotografia analógica. Para quem aprecia clássicos e tem personalidade marcante em cada escolha.'
  },
  {
    id: 20,
    nome: 'Patinha de pet',
    preco: 180.90,
    tipo: 'prata',
    imagem: new URL('../img/berloque20.png', import.meta.url).href,
    descricao: 'Em liga de prata banhada a ouro 18k, esta câmera vintage em estilo retrô homenageia a era dourada da fotografia analógica. Para quem aprecia clássicos e tem personalidade marcante em cada escolha.'
  },
  {
    id: 21,
    nome: 'Patinha de pet',
    preco: 180.90,
    tipo: 'dourado',
    imagem: new URL('../img/berloque21.png', import.meta.url).href,
    descricao: 'Em liga de prata banhada a ouro 18k, esta câmera vintage em estilo retrô homenageia a era dourada da fotografia analógica. Para quem aprecia clássicos e tem personalidade marcante em cada escolha.'
  },
  {
    id: 22,
    nome: 'Patinha de pet',
    preco: 180.90,
    tipo: 'dourado',
    imagem: new URL('../img/berloque22.png', import.meta.url).href,
    descricao: 'Em liga de prata banhada a ouro 18k, esta câmera vintage em estilo retrô homenageia a era dourada da fotografia analógica. Para quem aprecia clássicos e tem personalidade marcante em cada escolha.'
  },
  {
    id: 23,
    nome: 'Violão',
    preco: 180.90,
    tipo: 'prata',
    imagem: new URL('../img/berloque23.png', import.meta.url).href,
    descricao: 'Em liga de prata banhada a ouro 18k, esta câmera vintage em estilo retrô homenageia a era dourada da fotografia analógica. Para quem aprecia clássicos e tem personalidade marcante em cada escolha.'
  },
   {
    id: 24,
    nome: 'Livro',
    preco: 180.90,
    tipo: 'dourado',
    imagem: new URL('../img/berloque24.png', import.meta.url).href,
    descricao: 'Em liga de prata banhada a ouro 18k, esta câmera vintage em estilo retrô homenageia a era dourada da fotografia analógica. Para quem aprecia clássicos e tem personalidade marcante em cada escolha.'
  },
  {
    id: 25,
    nome: 'Colcheia',
    preco: 180.90,
    tipo: 'prata',
    imagem: new URL('../img/berloque25.png', import.meta.url).href,
    descricao: 'Em liga de prata banhada a ouro 18k, esta câmera vintage em estilo retrô homenageia a era dourada da fotografia analógica. Para quem aprecia clássicos e tem personalidade marcante em cada escolha.'
  },
])

const abrirModal = (pingente) => {
  produtoSelecionado.value = pingente
  document.body.style.overflow = 'hidden'
}

const fecharModal = () => {
  produtoSelecionado.value = null
  document.body.style.overflow = ''
}

const formatarPreco = (v) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const adicionarCarrinho = () => {
  if (!produtoSelecionado.value) return
  carrinho.value.push({ ...produtoSelecionado.value })
  showToast(`"${produtoSelecionado.value.nome}" adicionado ao carrinho 🛒`)
}

const comprarProduto = () => {
  if (!produtoSelecionado.value) return

  console.log("CLICK COMPRAR") // 👈 importante

  localStorage.setItem("checkoutProduto", JSON.stringify(produtoSelecionado.value))

  router.push({ name: "checkout" })
}

const pingentesFiltrados = computed(() => {
  let lista = pingentes.value.filter(p => {
    const nome = p.nome.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    const buscar = busca.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    const matchBusca = nome.includes(buscar)
    const matchMaterial = materialFiltro.value === '' || p.tipo === materialFiltro.value
    return matchBusca && matchMaterial
  })
  if (ordenar.value === 'menor') return [...lista].sort((a, b) => a.preco - b.preco)
  if (ordenar.value === 'maior') return [...lista].sort((a, b) => b.preco - a.preco)
  return lista
})

const pingentesDourado = computed(() =>
  pingentesFiltrados.value.filter(p => p.tipo === 'dourado')
)

const pingentesPrata = computed(() =>
  pingentesFiltrados.value.filter(p => p.tipo === 'prata')
)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

/* ═══════════════════════════════════════
   VARIÁVEIS E BASE
═══════════════════════════════════════ */
.pagina-pingentes {
  --gold: #c9a84c;
  --gold-light: #e2c97e;
  --gold-dark: #a07830;
  --silver: #8a9db5;
  --silver-light: #b8c8d8;
  --dark: #0f0e0c;
  --dark-2: #1c1a16;
  --cream: #faf8f4;
  --cream-2: #f2ede4;
  --text-muted: #888070;
  --border: rgba(201, 168, 76, 0.2);
  --shadow-gold: 0 20px 60px rgba(201, 168, 76, 0.12);
  --font-display: 'Cormorant Garamond', serif;
  --font-body: 'Jost', sans-serif;
  --ease-luxury: cubic-bezier(0.165, 0.84, 0.44, 1);

  background-color: var(--cream);
  min-height: 100vh;
  font-family: var(--font-body);
  color: var(--dark);
  position: relative;
  overflow-x: hidden;
}

/* ═══════════════════════════════════════
   PARTÍCULAS DECORATIVAS
═══════════════════════════════════════ */
.particles {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.particle {
  position: absolute;
  width: 2px;
  height: 2px;
  background: var(--gold);
  border-radius: 50%;
  opacity: 0;
  animation: particleFloat 8s infinite;
}

.particle:nth-child(1)  { left: 5%;  animation-delay: 0s;    animation-duration: 9s; }
.particle:nth-child(2)  { left: 12%; animation-delay: 1.5s;  animation-duration: 7s; }
.particle:nth-child(3)  { left: 22%; animation-delay: 3s;    animation-duration: 11s; }
.particle:nth-child(4)  { left: 35%; animation-delay: 0.8s;  animation-duration: 8s; }
.particle:nth-child(5)  { left: 50%; animation-delay: 2.2s;  animation-duration: 9s; }
.particle:nth-child(6)  { left: 63%; animation-delay: 4s;    animation-duration: 7s; }
.particle:nth-child(7)  { left: 72%; animation-delay: 1s;    animation-duration: 12s; }
.particle:nth-child(8)  { left: 80%; animation-delay: 3.5s;  animation-duration: 8s; }
.particle:nth-child(9)  { left: 88%; animation-delay: 0.5s;  animation-duration: 10s; }
.particle:nth-child(10) { left: 95%; animation-delay: 2s;    animation-duration: 7s; }
.particle:nth-child(11) { left: 42%; animation-delay: 5s;    animation-duration: 9s; }
.particle:nth-child(12) { left: 58%; animation-delay: 3.8s;  animation-duration: 11s; }

@keyframes particleFloat {
  0%   { bottom: -10px; opacity: 0; transform: translateX(0); }
  10%  { opacity: 0.6; }
  90%  { opacity: 0.3; }
  100% { bottom: 100vh; opacity: 0; transform: translateX(30px); }
}

/* ═══════════════════════════════════════
   HEADER
═══════════════════════════════════════ */
.header {
  padding: 36px 20px 28px;
  text-align: center;
  position: relative;
  background: linear-gradient(180deg, #fff 0%, var(--cream) 100%);
  border-bottom: 1px solid var(--border);
}

.header-ornament {
  position: absolute;
  top: 30px;
  font-size: 1rem;
  color: var(--gold);
  opacity: 0.5;
}
.top-left  { left: 40px; }
.top-right { right: 40px; }

.header-eyebrow {
  font-family: var(--font-body);
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 6px;
  text-transform: uppercase;
  color: var(--gold);
  margin: 0 0 8px;
  animation: fadeDown 0.8s var(--ease-luxury) both;
}

.header-title {
  margin: 0 0 8px;
  line-height: 1;
  animation: fadeDown 0.8s 0.1s var(--ease-luxury) both;
}

.title-ivy {
  display: block;
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 6vw, 4rem);
  font-weight: 300;
  letter-spacing: 16px;
  color: var(--dark);
  text-indent: 16px;
}

.title-pingentes {
  display: block;
  font-family: var(--font-body);
  font-size: clamp(0.55rem, 1.5vw, 0.8rem);
  font-weight: 400;
  letter-spacing: 10px;
  color: var(--text-muted);
  text-indent: 10px;
  margin-top: 4px;
}

.header-line {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin: 10px auto;
  animation: fadeDown 0.8s 0.2s var(--ease-luxury) both;
}

.header-line::before,
.header-line::after {
  content: '';
  width: 60px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold));
}
.header-line::after {
  background: linear-gradient(90deg, var(--gold), transparent);
}

.line-gem {
  color: var(--gold);
  font-size: 0.6rem;
}

.header-sub {
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 300;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--text-muted);
  margin: 0;
  animation: fadeDown 0.8s 0.3s var(--ease-luxury) both;
}

@keyframes fadeDown {
  from { opacity: 0; transform: translateY(-16px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ═══════════════════════════════════════
   FILTROS
═══════════════════════════════════════ */
.filtros {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(250, 248, 244, 0.96);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border);
  padding: 0 20px;
}

.filtros-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 16px 0;
  flex-wrap: wrap;
}

/* Busca */
.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 14px;
  color: var(--text-muted);
  width: 16px;
  height: 16px;
}

.search-box input {
  padding: 11px 16px 11px 42px;
  border: 1px solid var(--border);
  border-radius: 4px;
  background: white;
  width: 240px;
  font-family: var(--font-body);
  font-size: 0.8rem;
  letter-spacing: 0.5px;
  color: var(--dark);
  transition: all 0.3s ease;
}

.search-box input:focus {
  outline: none;
  border-color: var(--gold);
  box-shadow: 0 0 0 3px rgba(201, 168, 76, 0.1);
}

.search-box input::placeholder {
  color: #bbb;
  font-weight: 300;
}

/* Filtro Material */
.filtro-material {
  display: flex;
  gap: 8px;
  align-items: center;
}

.btn-material {
  padding: 10px 18px;
  border: 1px solid var(--border);
  border-radius: 4px;
  background: white;
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-material:hover {
  border-color: var(--gold);
  color: var(--dark);
}

.btn-material.active {
  background: var(--dark);
  border-color: var(--dark);
  color: white;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
}
.dourado-dot { background: linear-gradient(135deg, var(--gold-light), var(--gold-dark)); }
.prata-dot   { background: linear-gradient(135deg, var(--silver-light), var(--silver)); }

/* Select Ordenar */
.select-wrapper {
  position: relative;
  margin-left: auto;
}

.select-wrapper select {
  padding: 11px 40px 11px 16px;
  border: 1px solid var(--border);
  border-radius: 4px;
  background: white;
  font-family: var(--font-body);
  font-size: 0.78rem;
  letter-spacing: 0.5px;
  color: var(--dark);
  appearance: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.select-wrapper select:focus {
  outline: none;
  border-color: var(--gold);
}

.select-arrow {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  pointer-events: none;
  width: 14px;
  height: 14px;
}

/* ═══════════════════════════════════════
   CONTAINER E SEÇÕES
═══════════════════════════════════════ */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 24px 100px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 24px;
  margin: 70px 0 40px;
}

.section-header:first-child {
  margin-top: 0;
}

.section-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--border), transparent);
}

.section-title {
  font-family: var(--font-display);
  font-size: 1.6rem;
  font-weight: 400;
  letter-spacing: 2px;
  color: var(--dark);
  white-space: nowrap;
  margin: 0;
}

.section-gem {
  color: var(--gold);
  font-size: 0.8rem;
}

.prata-gem {
  color: var(--silver);
}

/* ═══════════════════════════════════════
   GRID E CARDS
═══════════════════════════════════════ */
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}

.card {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.04);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  transition: all 0.5s var(--ease-luxury);
  box-shadow: 0 10px 30px rgba(0,0,0,0.06);
}
.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 25px 70px rgba(0,0,0,0.12);
  border-color: rgba(201, 168, 76, 0.25);
}
.card-badge {
  position: absolute;
  top: 14px;
  left: 14px;
  z-index: 2;
  font-family: var(--font-body);
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 5px 10px;
  border-radius: 2px;
}

.dourado-badge {
  background: rgba(201, 168, 76, 0.12);
  color: var(--gold-dark);
  border: 1px solid rgba(201, 168, 76, 0.3);
}

.prata-badge {
  background: rgba(138, 157, 181, 0.12);
  color: #5a7090;
  border: 1px solid rgba(138, 157, 181, 0.3);
}

.image-wrapper {
  background: #fff;
  padding: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.image-wrapper img {
  max-width: 100%;
  max-height: 240px;
  object-fit: contain;
  background: transparent;
  transition: transform 0.7s var(--ease-luxury), filter 0.4s ease;
}

.card:hover .image-wrapper img {
  transform: scale(1.06);
  filter: drop-shadow(0 10px 20px rgba(0,0,0,0.08));
}

.card-overlay {
  position: absolute;
  inset: 0;
  background: rgba(15, 14, 12, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.card:hover .card-overlay {
  opacity: 1;
}
.card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at top left,
    rgba(255,255,255,0.8),
    transparent 60%
  );
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
}

.card:hover::before {
  opacity: 1;
}

.card-overlay span {
  color: white;
  font-family: var(--font-body);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 3px;
  text-transform: uppercase;
  border-bottom: 1px solid rgba(201, 168, 76, 0.7);
  padding-bottom: 4px;
}

.card-info {
  padding: 22px 24px 26px;
  border-top: 1px solid rgba(0,0,0,0.04);
}

.card-info h3 {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 400;
  letter-spacing: 0.5px;
  color: var(--dark);
  margin: 0 0 4px;
}

.card-material {
  font-family: var(--font-body);
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin: 0 0 12px;
}

.dourado-text { color: var(--gold); }
.prata-text   { color: var(--silver); }

.price {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 500;
  letter-spacing: 0.5px;
}
/* ═══════════════════════════════════════
   EMPTY STATE
═══════════════════════════════════════ */
.empty-state {
  text-align: center;
  padding: 80px 20px;
  color: var(--text-muted);
}

.empty-gem {
  font-size: 3rem;
  color: var(--border);
  margin-bottom: 16px;
}

.empty-state button {
  margin-top: 20px;
  padding: 12px 28px;
  background: var(--dark);
  color: white;
  border: none;
  font-family: var(--font-body);
  font-size: 0.75rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.3s;
}

.empty-state button:hover {
  background: var(--gold);
}

/* ═══════════════════════════════════════
   FOOTER
═══════════════════════════════════════ */
.footer {
  text-align: center;
  padding: 40px 20px;
  border-top: 1px solid var(--border);
  background: white;
}

.footer-line {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 10px;
}

.footer-line::before,
.footer-line::after {
  content: '';
  width: 80px;
  height: 1px;
  background: var(--border);
}

.footer-gem {
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 4px;
  color: var(--gold);
}

.footer p {
  font-size: 0.7rem;
  color: var(--text-muted);
  letter-spacing: 2px;
  text-transform: uppercase;
  margin: 0;
}

/* ═══════════════════════════════════════
   MODAL
═══════════════════════════════════════ */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(10, 9, 7, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
  backdrop-filter: blur(8px);
}

.modal-content {
  background: var(--cream);
  width: 100%;
  max-width: 920px;
  border-radius: 2px;
  position: relative;
  overflow: hidden;
  border: 1px solid var(--border);
  max-height: 90vh;
  overflow-y: auto;
}

.modal-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

/* Lado Imagem */
.modal-image-side {
  position: relative;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal-badge {
  align-self: flex-start;
  margin: 20px 20px 0;
  font-family: var(--font-body);
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 5px 12px;
  border-radius: 2px;
}

.modal-image-container {
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  min-height: 380px;
}

.modal-image-container img {
  max-width: 100%;
  max-height: 340px;
  object-fit: contain;
}

.modal-image-caption {
  padding: 16px;
  font-size: 0.6rem;
  letter-spacing: 3px;
  color: var(--gold);
  text-transform: uppercase;
}

/* Lado Detalhes */
.modal-details {
  padding: 50px 44px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-left: 1px solid var(--border);
}

.modal-eyebrow {
  font-family: var(--font-body);
  font-size: 0.62rem;
  font-weight: 500;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--gold);
  margin: 0 0 12px;
}

.modal-title {
  font-family: var(--font-display);
  font-size: 2.4rem;
  font-weight: 300;
  letter-spacing: 1px;
  color: var(--dark);
  margin: 0 0 16px;
  line-height: 1.1;
}

.modal-divider {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.modal-divider::before,
.modal-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--border);
}

.modal-gem {
  color: var(--gold);
  font-size: 0.55rem;
}

.modal-description {
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 300;
  color: var(--text-muted);
  line-height: 1.75;
  margin: 0 0 24px;
}

/* Especificações */
.modal-specs {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 28px;
  padding: 16px 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.spec {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.spec-label {
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #aaa;
}

.spec-value {
  font-size: 0.78rem;
  font-weight: 400;
  color: var(--dark);
}

/* Preço */
.modal-price {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 600;
  color: var(--dark);
  margin: 0 0 4px;
}

.modal-installments {
  font-size: 0.72rem;
  color: var(--text-muted);
  margin: 0 0 24px;
  font-weight: 300;
  letter-spacing: 0.5px;
}

/* Botões */
.modal-actions {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.btn-carrinho,
.btn-comprar {
  flex: 1;
  padding: 14px 16px;
  border-radius: 2px;
  font-family: var(--font-body);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-carrinho {
  background: white;
  color: var(--dark);
  border: 1.5px solid var(--dark);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-carrinho:hover {
  background: var(--dark);
  color: white;
}

.btn-comprar {
  background: var(--gold);
  color: var(--dark);
  border: 1.5px solid var(--gold);
}

.btn-comprar:hover {
  background: var(--gold-dark);
  border-color: var(--gold-dark);
  color: white;
}

.modal-seguro {
  font-size: 0.65rem;
  color: #bbb;
  text-align: center;
  margin: 0;
  letter-spacing: 0.5px;
}

/* Fechar */
.close-x {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 36px;
  height: 36px;
  background: rgba(255,255,255,0.9);
  border: 1px solid var(--border);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  color: var(--text-muted);
  transition: all 0.3s ease;
}

.close-x:hover {
  background: var(--dark);
  color: white;
  border-color: var(--dark);
}

/* ═══════════════════════════════════════
   TOAST
═══════════════════════════════════════ */
.toast {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 9999;
  background: var(--dark);
  color: white;
  padding: 14px 22px;
  border-radius: 4px;
  font-family: var(--font-body);
  font-size: 0.78rem;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.3);
  border-left: 3px solid var(--gold);
}

/* ═══════════════════════════════════════
   ANIMAÇÕES
═══════════════════════════════════════ */
.list-enter-active,
.list-leave-active { transition: all 0.4s var(--ease-luxury); }
.list-enter-from,
.list-leave-to { opacity: 0; transform: scale(0.95) translateY(10px); }

.modal-fade-enter-active,
.modal-fade-leave-active { transition: opacity 0.35s ease; }
.modal-fade-enter-from,
.modal-fade-leave-to { opacity: 0; }

.toast-fade-enter-active,
.toast-fade-leave-active { transition: all 0.4s var(--ease-luxury); }
.toast-fade-enter-from { opacity: 0; transform: translateY(16px); }
.toast-fade-leave-to   { opacity: 0; transform: translateY(16px); }

/* ═══════════════════════════════════════
   RESPONSIVO
═══════════════════════════════════════ */
@media (max-width: 1024px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .modal-body { grid-template-columns: 1fr; }
  .modal-image-container { min-height: 260px; }
  .modal-details { padding: 30px 24px; border-left: none; border-top: 1px solid var(--border); }
  .modal-title { font-size: 1.8rem; }
  .modal-actions { flex-direction: column; }
  .filtros-inner { gap: 12px; }
  .search-box input { width: 100%; }
  .select-wrapper { margin-left: 0; }
  .header h1 .title-ivy { font-size: 3.5rem; letter-spacing: 12px; }
}

@media (max-width: 540px) {
  .grid { grid-template-columns: 1fr; }
  .filtro-material { flex-wrap: wrap; }
}
</style>