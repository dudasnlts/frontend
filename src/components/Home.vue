<template>
  <main class="home">

    <!-- HERO -->
    <section class="hero">
      <div class="hero-grid">
        <div class="hero-item side"><img :src="hero.left" alt="Joias IVY" /></div>
        <div class="hero-item center">
          <img :src="hero.center" alt="Destaque IVY" />
          <div class="overlay">
            <div class="content">
              <span class="tag">ALTA JOALHERIA</span>
              <h1>Elegância que<br/>define você</h1>
              <p>Peças sofisticadas para momentos únicos</p>
              <div class="hero-btns">
                <router-link to="/joias" class="btn-hero">EXPLORAR COLEÇÃO</router-link>
                <router-link to="/sale" class="btn-hero ghost">VER SALE</router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="hero-item side"><img :src="hero.right" alt="Joias IVY" /></div>
      </div>
    </section>

    <!-- BENEFÍCIOS com foto de fundo -->
    <section class="benefits-section">
      <div class="benefits-bg" :style="{ backgroundImage: `url(${hero.left})` }"></div>
      <div class="benefits-overlay"></div>
      <div class="benefits">
        <div class="benefit">
          <div class="benefit-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
          </div>
          <div><p class="b-title">Frete Grátis</p><p class="b-sub">em pedidos acima de R$ 299</p></div>
        </div>
        <div class="benefit">
          <div class="benefit-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
          </div>
          <div><p class="b-title">Até 10x sem juros</p><p class="b-sub">nos principais cartões</p></div>
        </div>
        <div class="benefit">
          <div class="benefit-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <div><p class="b-title">Compra Segura</p><p class="b-sub">criptografia SSL 256 bits</p></div>
        </div>
        <div class="benefit">
          <div class="benefit-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          </div>
          <div><p class="b-title">Qualidade Premium</p><p class="b-sub">garantia de 12 meses</p></div>
        </div>
        <div class="benefit">
          <div class="benefit-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.51"/></svg>
          </div>
          <div><p class="b-title">Troca Facilitada</p><p class="b-sub">até 30 dias após a compra</p></div>
        </div>
      </div>
    </section>

    <!-- LANÇAMENTOS -->
    <section class="products">
      <div class="section-header">
        <span class="section-tag">LANÇAMENTOS</span>
        <h2>Novidades Exclusivas</h2>
        <p>As peças mais recentes da nossa coleção</p>
      </div>
      <div class="grid grid-3">
        <div class="card" v-for="p in lancamentos" :key="p.id" @click="abrirModal(p)">
          <div class="card-img">
            <img :src="p.image" :alt="p.name" />
            <div class="card-actions">
              <button class="card-btn-wish" title="Favoritar" @click.stop>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </button>
              <button class="card-btn-view">Ver detalhes</button>
            </div>
            <span class="badge novo">NOVO</span>
          </div>
          <div class="card-info">
            <p class="card-category">Alta Joalheria</p>
            <h3>{{ p.name }}</h3>
            <div class="card-price-row">
              <p class="price">R$ {{ p.price.toFixed(2) }}</p>
              <span class="installment">10x R$ {{ (p.price / 10).toFixed(2) }}</span>
            </div>
            <div class="card-pix">
              <span class="pix-dot"></span>
              R$ {{ (p.price * 0.9).toFixed(2) }} no PIX
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- BANNER EDITORIAL com foto de fundo -->
    <section class="editorial-banner">
      <div class="editorial-bg" :style="{ backgroundImage: `url(${hero.right})` }"></div>
      <div class="editorial-dark-overlay"></div>
      <div class="editorial-inner">
        <div class="editorial-text">
          <span class="editorial-tag">COLEÇÃO ESPECIAL</span>
          <h2>Casamento & Eternidade</h2>
          <p>Alianças e joias que celebram os momentos mais importantes da sua vida. Elegância atemporal, craftsmanship incomparável.</p>
          <router-link to="/casamento" class="btn-editorial">EXPLORAR COLEÇÃO</router-link>
        </div>
      </div>
    </section>

    <!-- COLEÇÃO / MAIS PRODUTOS -->
    <section class="products alt-bg">
      <div class="section-header">
        <span class="section-tag">COLEÇÃO</span>
        <h2>Descubra Mais Peças</h2>
        <p>Cada peça conta uma história única</p>
      </div>
      <div class="grid grid-3">
        <div class="card" v-for="p in maisProdutos" :key="p.id" @click="abrirModal(p)">
          <div class="card-img">
            <img :src="p.image" :alt="p.name" />
            <div class="card-actions">
              <button class="card-btn-wish" title="Favoritar" @click.stop>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </button>
              <button class="card-btn-view">Ver detalhes</button>
            </div>
          </div>
          <div class="card-info">
            <p class="card-category">Alta Joalheria</p>
            <h3>{{ p.name }}</h3>
            <div class="card-price-row">
              <p class="price">R$ {{ p.price.toFixed(2) }}</p>
              <span class="installment">10x R$ {{ (p.price / 10).toFixed(2) }}</span>
            </div>
            <div class="card-pix">
              <span class="pix-dot"></span>
              R$ {{ (p.price * 0.9).toFixed(2) }} no PIX
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- BANNER DESTAQUE com foto de fundo -->
    <section class="highlight-banner">
      <div class="highlight-bg" :style="{ backgroundImage: `url(${hero.center})` }"></div>
      <div class="highlight-overlay"></div>
      <div class="highlight-content">
        <span class="section-tag" style="color:#d4af37; display:block; margin-bottom:12px;">DESTAQUES</span>
        <h2>As Favoritas<br/>das Nossas Clientes</h2>
        <p>Peças escolhidas pelo amor de quem já comprou</p>
      </div>
    </section>

    <!-- DESTAQUES / MAIS VENDIDOS -->
    <section class="products">
      <div class="grid grid-3" style="margin-top:0">
        <div class="card" v-for="p in destaques" :key="p.id" @click="abrirModal(p)">
          <div class="card-img">
            <img :src="p.image" :alt="p.name" />
            <div class="card-actions">
              <button class="card-btn-wish" title="Favoritar" @click.stop>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </button>
              <button class="card-btn-view">Ver detalhes</button>
            </div>
            <span class="badge hot">🔥 MAIS VENDIDO</span>
          </div>
          <div class="card-info">
            <p class="card-category">Alta Joalheria</p>
            <h3>{{ p.name }}</h3>
            <div class="card-price-row">
              <p class="price">R$ {{ p.price.toFixed(2) }}</p>
              <span class="installment">10x R$ {{ (p.price / 10).toFixed(2) }}</span>
            </div>
            <div class="card-pix">
              <span class="pix-dot"></span>
              R$ {{ (p.price * 0.9).toFixed(2) }} no PIX
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- BANNER PIX -->
    <section class="pix-banner">
      <div class="pix-inner">
        <div class="pix-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="36" height="36"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
        </div>
        <div class="pix-text">
          <h3>Pague com PIX e ganhe 10% de desconto</h3>
          <p>Desconto aplicado automaticamente no checkout</p>
        </div>
        <router-link to="/joias" class="btn-pix">APROVEITAR AGORA</router-link>
      </div>
    </section>

    <!-- MODAL DE PRODUTO -->
    <Transition name="modal-fade">
      <div v-if="produtoSelecionado" class="modal" @click.self="fecharModal">
        <div class="modal-box">
          <button class="modal-close-btn" @click="fecharModal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
          <div class="modal-grid">
            <div class="modal-img-wrap">
              <img :src="produtoSelecionado.image" :alt="produtoSelecionado.name" />
            </div>
            <div class="modal-details">
              <span class="modal-tag">IVY</span>
              <h2>{{ produtoSelecionado.name }}</h2>
              <div class="modal-price-block">
                <p class="modal-price">R$ {{ produtoSelecionado.price.toFixed(2) }}</p>
                <p class="modal-installment">ou 10x de R$ {{ (produtoSelecionado.price / 10).toFixed(2) }} sem juros</p>
                <p class="modal-pix">R$ {{ (produtoSelecionado.price * 0.9).toFixed(2) }} no PIX <span class="discount-badge">-10%</span></p>
              </div>
              <div class="modal-info">
                <div class="info-row"><span>✓</span> Em estoque</div>
                <div class="info-row"><span>✓</span> Frete grátis para sua região</div>
                <div class="info-row"><span>✓</span> Embalagem presente exclusiva</div>
              </div>
              <button class="btn-add" @click="handleAddToCart(produtoSelecionado)">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                Adicionar à sacola
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>

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

const lancamentos = ref([
  { id: 1, name: 'Colar Aura', price: 199, image: colar1 },
  { id: 2, name: 'Brinco Glow', price: 149, image: brinco },
  { id: 3, name: 'Anel Lux', price: 299, image: anel }
])

const maisProdutos = ref([
  { id: 7, name: 'Colar Diamond', price: 459, image: colar2 },
  { id: 8, name: 'Brinco Shine', price: 179, image: brinco },
  { id: 9, name: 'Anel Royal', price: 389, image: anel },
  { id: 10, name: 'Colar Premium', price: 520, image: colar3 },
  { id: 11, name: 'Brinco Luxo', price: 210, image: brinco },
  { id: 12, name: 'Anel Supreme', price: 430, image: anel }
])

const destaques = ref([
  { id: 4, name: 'Colar Elite', price: 399, image: colar2 },
  { id: 5, name: 'Brinco Premium', price: 189, image: brinco },
  { id: 6, name: 'Anel Deluxe', price: 329, image: anel }
])

const router = useRouter()
const produtoSelecionado = ref(null)

const abrirModal = (p) => { produtoSelecionado.value = p; document.body.style.overflow = 'hidden' }
const fecharModal = () => { produtoSelecionado.value = null; document.body.style.overflow = '' }

const handleAddToCart = (p) => {
  addToCart(p)
  fecharModal()
router.push('/carrinho')
}
</script>

<style scoped>
.home {
  font-family: 'DM Sans', sans-serif;
  background: #ffffff;
  color: #111827;
  overflow-x: hidden;
}

/* ───────────────── HERO ───────────────── */

.hero {
  width: 100%;
  overflow: hidden;
  padding: 0;
  background: #fff;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1fr 1.45fr 1fr;

  gap: 0;

  width: 100%;
  height: calc(100vh - 90px);
  min-height: 760px;
}

.hero-item {
  position: relative;
  overflow: hidden;
  height: 100%;
}

.hero-item img {
  width: 100%;
  height: 100%;

  object-fit: cover;
  display: block;

  transition: transform .8s ease;
}

.hero-item:hover img {
  transform: scale(1.05);
}

/* laterais */

.hero-item.side {
  z-index: 1;
}

/* imagem principal */

.hero-item.center {
  z-index: 3;

  transform: scale(1.03);

  border-radius: 0 0 30px 30px;

  box-shadow:
    0 20px 60px rgba(0,0,0,.12),
    0 8px 20px rgba(0,0,0,.06);
}

/* overlay */

.overlay {
  position: absolute;
  inset: 0;

  display: flex;
  align-items: flex-end;
  justify-content: center;

  padding: 70px;

  background:
    linear-gradient(
      to top,
      rgba(0,0,0,.72),
      rgba(0,0,0,.18),
      rgba(0,0,0,.03)
    );
}

.content {
  max-width: 620px;
  text-align: center;
  color: white;
}

.tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 10px 18px;

  border-radius: 999px;

  background: rgba(255,255,255,.12);

  border: 1px solid rgba(255,255,255,.18);

  backdrop-filter: blur(10px);

  font-size: 10px;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;

  margin-bottom: 24px;
}

.content h1 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 82px;
  font-style: italic;
  font-weight: 500;

  line-height: .92;

  margin-bottom: 22px;
}

.content p {
  font-size: 16px;
  line-height: 1.8;

  opacity: .88;

  margin-bottom: 36px;
}

/* botões hero */

.hero-btns {
  display: flex;
  justify-content: center;
  gap: 14px;
  flex-wrap: wrap;
}

.btn-hero {
  height: 56px;
  padding: 0 34px;

  border-radius: 14px;

  background: white;
  color: #081120;

  display: flex;
  align-items: center;
  justify-content: center;

  text-decoration: none;

  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.7px;
  text-transform: uppercase;

  transition: .3s ease;
}

.btn-hero:hover {
  background: #d4af37;
  color: white;

  transform: translateY(-3px);
}

.btn-hero.ghost {
  background: rgba(255,255,255,.08);

  border: 1px solid rgba(255,255,255,.18);

  color: white;

  backdrop-filter: blur(10px);
}

.btn-hero.ghost:hover {
  background: white;
  color: #081120;
}

/* ───────────────── BENEFÍCIOS ───────────────── */

.benefits-section {
  border-top: 1px solid #efefef;
  border-bottom: 1px solid #efefef;
  background: white;
}

.benefits {
  max-width: 1400px;
  margin: auto;

  display: grid;
  grid-template-columns: repeat(5,1fr);

  padding: 28px 24px;
}

.benefit {
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 14px;

  padding: 12px 18px;

  position: relative;
}

.benefit::after {
  content: "";

  position: absolute;
  right: 0;
  top: 50%;

  transform: translateY(-50%);

  width: 1px;
  height: 38px;

  background: #ececec;
}

.benefit:last-child::after {
  display: none;
}

.benefit-icon {
  width: 48px;
  height: 48px;

  border-radius: 50%;

  background: #f8f8f8;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;
}

.benefit svg {
  width: 21px;
  height: 21px;
  color: #0f172a;
}

.b-title {
  font-size: 13px;
  font-weight: 700;
  color: #0f172a;
}

.b-sub {
  font-size: 11px;
  color: #8b8b8b;

  margin-top: 4px;
}

/* ───────────────── SEÇÕES ───────────────── */

.products {
  padding: 110px 6%;
}

.products.alt-bg {
  background: linear-gradient(to bottom,#fafafa,#fff);
}

.section-header {
  text-align: center;
  margin-bottom: 70px;
}

.section-tag {
  display: block;

  margin-bottom: 18px;

  color: #b48a2f;

  font-size: 11px;
  font-weight: 700;
  letter-spacing: 4px;
  text-transform: uppercase;
}

.section-header h2 {
  font-family: 'Playfair Display', serif;
  font-size: 68px;
  font-style: italic;
  font-weight: 600;

  color: #081120;

  margin-bottom: 16px;
}

.section-header p {
  font-size: 15px;
  color: #7c7c7c;
}

/* ───────────────── GRID ───────────────── */

.grid {
  display: grid;
  gap: 34px;
}

.grid-3 {
  grid-template-columns: repeat(3,1fr);
}

/* ───────────────── CARDS ───────────────── */

.card {
  background: white;

  border-radius: 30px;
  overflow: hidden;

  border: 1px solid #ededed;

  transition:
    transform .35s ease,
    box-shadow .35s ease,
    border-color .35s ease;
}

.card:hover {
  transform: translateY(-10px);

  border-color: rgba(212,175,55,.28);

  box-shadow:
    0 30px 70px rgba(0,0,0,.08),
    0 10px 30px rgba(0,0,0,.04);
}

.card-img {
  position: relative;
  overflow: hidden;

  background: #f5f5f5;
}

.card-img img {
  width: 100%;
  height: 430px;

  object-fit: cover;
  display: block;

  transition: transform .8s ease;
}

.card:hover .card-img img {
  transform: scale(1.08);
}

.card-img::after {
  content: "";

  position: absolute;
  inset: 0;

  background:
    linear-gradient(
      to top,
      rgba(0,0,0,.22),
      transparent 45%
    );

  pointer-events: none;
}

/* badges */

.badge {
  position: absolute;
  top: 18px;
  left: 18px;

  padding: 8px 14px;

  border-radius: 999px;

  font-size: 9px;
  font-weight: 700;
  letter-spacing: 1.6px;
  text-transform: uppercase;

  z-index: 3;
}

.badge.novo {
  background: #081120;
  color: white;
}

.badge.hot {
  background: #d4af37;
  color: #081120;
}

/* favoritar */

.card-btn-wish {
  position: absolute;
  top: 18px;
  right: 18px;

  width: 42px;
  height: 42px;

  border-radius: 50%;
  border: none;

  background: rgba(255,255,255,.94);

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  z-index: 4;

  transition: .3s ease;
}

.card-btn-wish:hover {
  background: #d4af37;
}

.card-btn-wish svg {
  color: #081120;
}

/* ações */

.card-actions {
  position: absolute;
  left: 20px;
  right: 20px;
  bottom: 20px;

  display: flex;
  gap: 12px;

  opacity: 0;
  transform: translateY(14px);

  transition: .35s ease;
}

.card:hover .card-actions {
  opacity: 1;
  transform: translateY(0);
}

.card-btn-view,
.card-btn-cart {
  flex: 1;

  height: 48px;

  border: none;
  border-radius: 14px;

  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.4px;
  text-transform: uppercase;

  cursor: pointer;

  transition: .3s ease;
}

.card-btn-view {
  background: rgba(255,255,255,.96);
  color: #081120;
}

.card-btn-view:hover {
  background: white;
}

.card-btn-cart {
  background: #081120;
  color: white;
}

.card-btn-cart:hover {
  background: #d4af37;
  color: #081120;
}

/* info */

.card-info {
  padding: 28px;
}

.card-category {
  font-size: 10px;
  letter-spacing: 2px;
  text-transform: uppercase;

  color: #b48a2f;

  margin-bottom: 12px;
}

.card-info h3 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 36px;
  font-weight: 500;

  color: #081120;

  margin-bottom: 18px;
}

.card-price-row {
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 16px;
}

.price {
  font-size: 28px;
  font-weight: 700;

  color: #081120;
}

.installment {
  font-size: 11px;
  color: #8a8a8a;
}

.card-pix {
  display: inline-flex;
  align-items: center;
  gap: 8px;

  padding: 9px 14px;

  border-radius: 999px;

  background: #f7f7f7;

  font-size: 11px;
  color: #555;
}

.pix-dot {
  width: 7px;
  height: 7px;

  border-radius: 50%;

  background: #32bcad;
}

/* ───────────────── BANNERS ───────────────── */

.editorial-banner,
.highlight-banner {
  position: relative;
  overflow: hidden;
}

.editorial-banner {
  min-height: 640px;

  display: flex;
  align-items: center;
}

.editorial-bg,
.highlight-bg {
  position: absolute;
  inset: 0;

  background-size: cover;
  background-position: center;

  transition: transform .8s ease;
}

.editorial-banner:hover .editorial-bg,
.highlight-banner:hover .highlight-bg {
  transform: scale(1.05);
}

.editorial-dark-overlay {
  position: absolute;
  inset: 0;

  background:
    linear-gradient(
      90deg,
      rgba(0,0,0,.78),
      rgba(0,0,0,.14)
    );
}

.editorial-inner {
  position: relative;
  z-index: 2;

  width: 100%;
  max-width: 1300px;

  margin: auto;
  padding: 90px 6%;
}

.editorial-text {
  max-width: 560px;
  color: white;
}

.editorial-tag {
  display: inline-block;

  margin-bottom: 18px;

  color: #d4af37;

  font-size: 11px;
  font-weight: 700;
  letter-spacing: 4px;
  text-transform: uppercase;
}

.editorial-text h2 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 72px;
  font-style: italic;
  font-weight: 500;

  line-height: .94;

  margin-bottom: 24px;
}

.editorial-text p {
  font-size: 15px;
  line-height: 1.8;

  color: rgba(255,255,255,.76);

  margin-bottom: 36px;
}

.btn-editorial {
  height: 56px;
  padding: 0 32px;

  border-radius: 14px;

  background: white;
  color: #081120;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  text-decoration: none;

  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.6px;
  text-transform: uppercase;

  transition: .3s ease;
}

.btn-editorial:hover {
  background: #d4af37;
  color: white;
}

/* ───────────────── HIGHLIGHT ───────────────── */

.highlight-banner {
  height: 440px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.highlight-overlay {
  position: absolute;
  inset: 0;

  background: rgba(0,0,0,.46);
}

.highlight-content {
  position: relative;
  z-index: 2;

  text-align: center;
  color: white;
}

.highlight-content h2 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 70px;
  font-style: italic;
  font-weight: 500;

  line-height: .94;

  margin-bottom: 16px;
}

.highlight-content p {
  font-size: 15px;
  opacity: .82;
}

/* ───────────────── PIX ───────────────── */

.pix-banner {
  background: linear-gradient(135deg,#d4af37,#e8c55d);
}

.pix-inner {
  max-width: 1200px;
  margin: auto;

  padding: 50px 30px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 30px;
  flex-wrap: wrap;
}

.pix-icon {
  width: 72px;
  height: 72px;

  border-radius: 20px;

  background: rgba(255,255,255,.2);

  display: flex;
  align-items: center;
  justify-content: center;
}

.pix-text h3 {
  font-size: 30px;
  color: #081120;

  margin-bottom: 6px;
}

.pix-text p {
  color: rgba(8,17,32,.72);
}

.btn-pix {
  height: 56px;
  padding: 0 32px;

  border-radius: 14px;

  background: #081120;
  color: white;

  display: flex;
  align-items: center;
  justify-content: center;

  text-decoration: none;

  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.6px;
  text-transform: uppercase;

  transition: .3s ease;
}

.btn-pix:hover {
  transform: translateY(-3px);
}

/* ───────────────── MODAL ───────────────── */

.modal {
  position: fixed;
  inset: 0;

  background: rgba(0,0,0,.65);
  backdrop-filter: blur(8px);

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 9999;

  padding: 20px;
}

.modal-box {
  width: 100%;
  max-width: 980px;

  background: white;

  border-radius: 32px;
  overflow: hidden;

  position: relative;
}

.modal-close-btn {
  position: absolute;
  top: 18px;
  right: 18px;

  width: 42px;
  height: 42px;

  border-radius: 50%;
  border: none;

  background: rgba(255,255,255,.94);

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  z-index: 10;
}

.modal-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.modal-img-wrap {
  background: #f7f7f7;
}

.modal-img-wrap img {
  width: 100%;
  height: 100%;
  min-height: 620px;

  object-fit: cover;
}

.modal-details {
  padding: 54px;

  display: flex;
  flex-direction: column;
  gap: 20px;
}

.modal-tag {
  font-size: 10px;
  letter-spacing: 4px;
  text-transform: uppercase;

  color: #d4af37;
}

.modal-details h2 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 52px;
  line-height: .94;

  color: #081120;
}

.modal-price {
  font-size: 36px;
  font-weight: 700;

  color: #081120;
}

.modal-installment {
  font-size: 13px;
  color: #8a8a8a;
}

.modal-pix {
  font-size: 14px;
  color: #555;
}

.discount-badge {
  background: #d4af37;
  color: #081120;

  padding: 4px 10px;

  border-radius: 999px;

  font-size: 10px;
  font-weight: 700;
}

.modal-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 10px;

  font-size: 14px;
  color: #555;
}

.info-row span {
  color: #22c55e;
}

.btn-add {
  margin-top: auto;

  height: 58px;

  border: none;
  border-radius: 16px;

  background: #081120;
  color: white;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;

  cursor: pointer;

  transition: .3s ease;
}

.btn-add:hover {
  background: #d4af37;
  color: #081120;
}

/* ───────────────── TRANSITIONS ───────────────── */

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity .3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

/* ───────────────── RESPONSIVO ───────────────── */

@media (max-width: 1100px) {
  .hero-grid {
    grid-template-columns: 1fr;
    min-height: auto;
    height: auto;
  }

  .hero-item.side {
    display: none;
  }

  .hero-item.center {
    transform: none;
    border-radius: 0;
    height: 84vh;
  }

  .benefits {
    grid-template-columns: repeat(2,1fr);
  }

  .benefit::after {
    display: none;
  }

  .grid-3 {
    grid-template-columns: repeat(2,1fr);
  }

  .modal-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .products {
    padding: 80px 20px;
  }

  .grid-3 {
    grid-template-columns: 1fr;
  }

  .benefits {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .hero-item.center {
    height: 74vh;
  }

  .overlay {
    padding: 30px 22px;
  }

  .content h1,
  .section-header h2,
  .editorial-text h2,
  .highlight-content h2 {
    font-size: 48px;
  }

  .card-img img {
    height: 380px;
  }

  .card-actions {
    opacity: 1;
    transform: none;
  }

  .modal-details {
    padding: 34px 26px;
  }

  .modal-img-wrap img {
    min-height: 420px;
  }

  .pix-inner {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>