<template>
  <main class="cart-page">
    <div class="container">

      <!-- CARRINHO VAZIO -->
      <section v-if="cart.items.length === 0" class="empty-cart">
        <div class="empty-icon"><ShoppingBag :size="42" stroke-width="1.5" /></div>
        <h1>Sua sacola está vazia</h1>
        <p>Descubra peças exclusivas e eternize momentos especiais com a coleção IVY.</p>
        <router-link to="/" class="shop-btn">Explorar Coleções</router-link>
        <div class="empty-links">
          <router-link to="/joias">Joias</router-link>
          <router-link to="/relogios">Relógios</router-link>
          <router-link to="/perfumes">Perfumes</router-link>
        </div>
      </section>

      <!-- CARRINHO PREENCHIDO -->
      <section v-else>
        <div class="cart-top">
          <div>
            <h1 class="title">Minha Sacola</h1>
            <span class="items-count">{{ cart.items.length }} {{ cart.items.length > 1 ? 'itens' : 'item' }}</span>
          </div>
          <div class="shipping-banner">
            <Truck :size="17" />
            <span v-if="amountToFreeShipping > 0">
              Faltam <strong>R$ {{ amountToFreeShipping.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</strong> para frete grátis
            </span>
            <span v-else class="free-text">Você desbloqueou frete grátis ✨</span>
          </div>
        </div>

        <div class="cart-grid">
          <!-- PRODUTOS -->
          <section class="products">
            <TransitionGroup name="cart-animation">
              <article class="product-card" v-for="item in cart.items" :key="item._id || item.id">
                <div class="image-wrapper">
                  <img :src="resolveImage(item.image)" :alt="item.name" />
                </div>
                <div class="product-info">
                  <div class="top-info">
                    <div>
                      <h2>{{ item.name }}</h2>
                      <span class="reference">REF: {{ String(item._id || item.id || '000000').substring(0, 6).toUpperCase() }}</span>
                    </div>
                    <button class="remove-btn" @click="removeFromCart(item._id || item.id)"><X :size="18" /></button>
                  </div>
                  <div class="bottom-info">
                    <div class="quantity-box">
                      <button @click="updateQuantity(item._id || item.id, -1)" :disabled="item.quantity <= 1">-</button>
                      <span>{{ item.quantity }}</span>
                      <button @click="updateQuantity(item._id || item.id, 1)">+</button>
                    </div>
                    <strong class="price">R$ {{ (item.price * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</strong>
                  </div>
                </div>
              </article>
            </TransitionGroup>
          </section>

          <!-- RESUMO -->
          <aside class="summary">
            <div class="summary-card">
              <h2>Resumo do Pedido</h2>

              <!-- CEP / FRETE -->
              <div class="field">
                <label>Calcular Frete</label>
                <div class="input-group">
                  <input v-model="zipCode" type="text" placeholder="00000-000" maxlength="9" @input="formatCep" />
                  <button @click="handleShipping" :disabled="shippingLoading">
                    <Loader2 v-if="shippingLoading" class="spin" :size="16" />
                    <span v-else>OK</span>
                  </button>
                </div>
                <small v-if="addressResult" class="success-msg">
                  <MapPin :size="12" /> {{ addressResult.localidade }}, {{ addressResult.uf }}
                </small>
              </div>

              <!-- OPÇÕES DE FRETE -->
              <div v-if="shippingOptions.length > 0" class="shipping-options">
                <label>Escolha o Frete</label>
                <div
                  v-for="opt in shippingOptions"
                  :key="opt.id"
                  class="ship-option"
                  :class="{ selected: selectedShipping === opt.id }"
                  @click="selectShipping(opt)"
                >
                  <div class="ship-left">
                    <div class="ship-radio" :class="{ active: selectedShipping === opt.id }"></div>
                    <div>
                      <div class="ship-name">{{ opt.name }}</div>
                      <div class="ship-days">{{ opt.days }} dias úteis</div>
                    </div>
                  </div>
                  <div class="ship-price">
                    {{ opt.price === 0 ? 'Grátis' : `R$ ${opt.price.toFixed(2).replace('.', ',')}` }}
                  </div>
                </div>
              </div>

              <!-- CUPOM -->
              <div class="field">
                <label>Cupom</label>
                <div class="input-group">
                  <input v-model="couponInput" type="text" placeholder="Digite seu cupom" />
                  <button @click="applyCoupon">Aplicar</button>
                </div>
                <small v-if="discount > 0" class="success-msg">Cupom aplicado com sucesso ✓</small>
                <small v-if="couponError" style="color:#e74c3c;margin-top:6px;display:block">{{ couponError }}</small>
              </div>

              <!-- VALORES -->
              <div class="values">
                <div class="value-row"><span>Subtotal</span><strong>R$ {{ subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</strong></div>
                <div class="value-row">
                  <span>Frete</span>
                  <strong>{{ shippingValue === 0 && addressResult ? 'Grátis' : shippingValue > 0 ? `R$ ${shippingValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '—' }}</strong>
                </div>
                <div v-if="discount > 0" class="value-row discount">
                  <span>Desconto</span>
                  <strong>- R$ {{ discount.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</strong>
                </div>
              </div>

              <div class="total-box">
                <span>Total</span>
                <div class="total-values">
                  <strong>R$ {{ finalTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</strong>
                  <small>ou 10x de R$ {{ (finalTotal / 10).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</small>
                </div>
              </div>

              <button class="checkout-btn" @click="openPaymentModal" :disabled="checkoutLoading">
                <Loader2 v-if="checkoutLoading" class="spin" :size="20" />
                <span v-else>Finalizar Compra</span>
              </button>

              <div class="secure"><Lock :size="13" /> Pagamento 100% seguro</div>
            </div>
          </aside>
        </div>
      </section>

      <!-- ======== MODAL DE PAGAMENTO ======== -->
      <div v-if="showPaymentModal" class="modal-overlay" @click.self="showPaymentModal = false">
        <div class="payment-modal">
          <div class="modal-head">
            <h2>Finalizar Compra</h2>
            <button class="close-btn" @click="showPaymentModal = false"><X :size="20" /></button>
          </div>

          <!-- ENDEREÇO -->
          <div class="pm-section">
            <div class="pm-label">Endereço de entrega</div>
            <input v-model="deliveryAddress" class="pm-input" placeholder="Rua, Número, Complemento, Bairro" />
          </div>

          <!-- FORMA DE PAGAMENTO -->
          <div class="pm-section">
            <div class="pm-label">Forma de pagamento</div>
            <div class="payment-tabs">
              <button :class="['pay-tab', { active: payMethod === 'pix' }]" @click="payMethod = 'pix'">PIX</button>
              <button :class="['pay-tab', { active: payMethod === 'credit_card' }]" @click="payMethod = 'credit_card'">Cartão</button>
              <button :class="['pay-tab', { active: payMethod === 'boleto' }]" @click="payMethod = 'boleto'">Boleto</button>
            </div>
          </div>

          <!-- PIX -->
          <div v-if="payMethod === 'pix'" class="pay-content">
            <div class="pix-box">
              <div class="pix-qr">
                <!-- QR code simulado -->
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="120" height="120" fill="white"/>
                  <rect x="10" y="10" width="40" height="40" fill="black"/><rect x="15" y="15" width="30" height="30" fill="white"/><rect x="20" y="20" width="20" height="20" fill="black"/>
                  <rect x="70" y="10" width="40" height="40" fill="black"/><rect x="75" y="15" width="30" height="30" fill="white"/><rect x="80" y="20" width="20" height="20" fill="black"/>
                  <rect x="10" y="70" width="40" height="40" fill="black"/><rect x="15" y="75" width="30" height="30" fill="white"/><rect x="20" y="80" width="20" height="20" fill="black"/>
                  <rect x="70" y="70" width="10" height="10" fill="black"/><rect x="85" y="70" width="10" height="10" fill="black"/><rect x="100" y="70" width="10" height="10" fill="black"/>
                  <rect x="70" y="85" width="10" height="10" fill="black"/><rect x="85" y="100" width="10" height="10" fill="black"/>
                  <rect x="55" y="10" width="10" height="10" fill="black"/><rect x="55" y="25" width="10" height="10" fill="black"/>
                  <rect x="10" y="55" width="10" height="10" fill="black"/><rect x="25" y="55" width="10" height="10" fill="black"/>
                </svg>
              </div>
              <p class="pix-value">R$ {{ finalTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</p>
              <p class="pix-hint">Escaneie o QR code ou copie a chave PIX</p>
              <div class="pix-key-box">
                <span class="pix-key">ivy.joalheria@pagamentos.pix</span>
                <button class="copy-btn" @click="copyPix">{{ pixCopied ? '✓ Copiado' : 'Copiar' }}</button>
              </div>
              <p style="font-size:11px;color:#999;margin-top:12px">O pedido será confirmado após identificarmos o pagamento.</p>
            </div>
          </div>

          <!-- CARTÃO -->
          <div v-if="payMethod === 'credit_card'" class="pay-content">
            <div class="form-row">
              <div class="form-group">
                <label>Número do Cartão</label>
                <input v-model="card.number" class="pm-input" placeholder="0000 0000 0000 0000" maxlength="19" @input="formatCard" />
              </div>
            </div>
            <div class="form-group">
              <label>Nome no Cartão</label>
              <input v-model="card.name" class="pm-input" placeholder="Como está no cartão" />
            </div>
            <div class="form-row-2">
              <div class="form-group">
                <label>Validade</label>
                <input v-model="card.expiry" class="pm-input" placeholder="MM/AA" maxlength="5" />
              </div>
              <div class="form-group">
                <label>CVV</label>
                <input v-model="card.cvv" class="pm-input" placeholder="000" maxlength="4" type="password" />
              </div>
            </div>
            <div class="form-group">
              <label>Parcelas</label>
              <select v-model="card.installments" class="pm-input pm-select">
                <option v-for="n in 12" :key="n" :value="n">
                  {{ n }}x de R$ {{ (finalTotal / n).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}
                  {{ n <= 3 ? '(sem juros)' : '' }}
                </option>
              </select>
            </div>
          </div>

          <!-- BOLETO -->
          <div v-if="payMethod === 'boleto'" class="pay-content">
            <div class="boleto-box">
              <div class="boleto-icon">📄</div>
              <p class="boleto-title">Boleto Bancário</p>
              <p class="boleto-value">R$ {{ finalTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</p>
              <p class="boleto-hint">O boleto será gerado após confirmar. Vencimento em 3 dias úteis.</p>
              <div class="boleto-code">34191.75004 01455.920003 06162.570000 0 00000-0 {{ Math.floor(finalTotal * 100) }}</div>
              <button class="copy-btn" @click="copyBoleto">{{ boletoCopied ? '✓ Copiado' : 'Copiar código' }}</button>
            </div>
          </div>

          <p v-if="orderError" class="order-error">{{ orderError }}</p>

          <button class="confirm-btn" @click="handleFinalize" :disabled="checkoutLoading">
            <Loader2 v-if="checkoutLoading" class="spin" :size="18" />
            <span v-else>Confirmar Pedido · R$ {{ finalTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</span>
          </button>
        </div>
      </div>

      <!-- MODAL SUCESSO -->
      <div v-if="showSuccess" class="modal-overlay">
        <div class="success-modal">
          <div class="success-icon">✓</div>
          <h2>Pedido Realizado!</h2>
          <p>Seu pedido foi criado com sucesso. Você receberá atualizações por e-mail.</p>
          <p class="order-id" v-if="createdOrderId">Pedido #{{ createdOrderId.slice(-6).toUpperCase() }}</p>
          <button class="confirm-btn" @click="goHome">Continuar Comprando</button>
        </div>
      </div>

    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { useRouter } from "vue-router"
import axios from "axios"
import { ShoppingBag, Truck, X, Loader2, MapPin, Lock } from "lucide-vue-next"
import { cart, removeFromCart, updateQuantity, getTotal } from "@/stores/cart"

const router = useRouter()
const API = "http://localhost:3000"

// ── Imagens ──────────────────────────────────────────────
const resolveImage = (img?: string) => {
  if (!img) return "https://via.placeholder.com/300x400/f5f5f5/999999"
  if (img.startsWith("http")) return img
  return `${API}${img}`
}

// ── Frete ─────────────────────────────────────────────────
const zipCode = ref("")
const shippingLoading = ref(false)
const addressResult = ref<any>(null)
const shippingOptions = ref<any[]>([])
const selectedShipping = ref("")
const shippingValue = ref(0)

const formatCep = () => {
  let v = zipCode.value.replace(/\D/g, "")
  if (v.length > 5) v = v.slice(0, 5) + "-" + v.slice(5, 8)
  zipCode.value = v
}

const handleShipping = async () => {
  const cep = zipCode.value.replace(/\D/g, "")
  if (cep.length !== 8) return alert("Digite um CEP válido")
  shippingLoading.value = true
  try {
    const res = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
    if (res.data.erro) throw new Error()
    addressResult.value = res.data

    const isSP = res.data.uf === "SP"
    const free = subtotal.value >= 1500
    shippingOptions.value = free
      ? [{ id: "free", name: "Frete Grátis", days: isSP ? 5 : 10, price: 0 }]
      : [
          { id: "standard", name: "Envio Padrão (PAC)", days: isSP ? 7 : 14, price: isSP ? 25 : 45 },
          { id: "express",  name: "Envio Expresso (SEDEX)", days: isSP ? 2 : 5, price: isSP ? 45 : 75 }
        ]
    selectShipping(shippingOptions.value[0])
  } catch {
    alert("CEP não encontrado")
  } finally {
    shippingLoading.value = false
  }
}

const selectShipping = (opt: any) => {
  selectedShipping.value = opt.id
  shippingValue.value = opt.price
}

// ── Cupom ─────────────────────────────────────────────────
const couponInput = ref("")
const discount = ref(0)
const couponError = ref("")

const applyCoupon = () => {
  couponError.value = ""
  const code = couponInput.value.trim().toUpperCase()
  if (code === "WELCOME15") { discount.value = subtotal.value * 0.15; return }
  if (code === "IVY10")     { discount.value = subtotal.value * 0.10; return }
  discount.value = 0
  couponError.value = "Cupom inválido"
}

// ── Totais ─────────────────────────────────────────────────
const subtotal = computed(() => getTotal())
const amountToFreeShipping = computed(() => Math.max(1500 - subtotal.value, 0))
const finalTotal = computed(() => Math.max(subtotal.value + shippingValue.value - discount.value, 0))

// ── Modal de Pagamento ─────────────────────────────────────
const showPaymentModal = ref(false)
const payMethod = ref<"pix" | "credit_card" | "boleto">("pix")
const deliveryAddress = ref("")
const checkoutLoading = ref(false)
const orderError = ref("")
const showSuccess = ref(false)
const createdOrderId = ref("")

// PIX
const pixCopied = ref(false)
const copyPix = () => { navigator.clipboard.writeText("ivy.joalheria@pagamentos.pix"); pixCopied.value = true; setTimeout(() => pixCopied.value = false, 2000) }

// Boleto
const boletoCopied = ref(false)
const copyBoleto = () => { navigator.clipboard.writeText(`34191.75004 01455.920003 06162.570000 0 00000-0 ${Math.floor(finalTotal.value * 100)}`); boletoCopied.value = true; setTimeout(() => boletoCopied.value = false, 2000) }

// Cartão
const card = ref({ number: "", name: "", expiry: "", cvv: "", installments: 1 })
const formatCard = () => {
  let v = card.value.number.replace(/\D/g, "").slice(0, 16)
  card.value.number = v.replace(/(.{4})/g, "$1 ").trim()
}

const openPaymentModal = () => {
  const token = localStorage.getItem("token")
  if (!token) { router.push("/login?redirect=cart"); return }
  if (!addressResult.value) { alert("Calcule o frete antes de finalizar"); return }
  showPaymentModal.value = true
}

const handleFinalize = async () => {
  orderError.value = ""
  if (!deliveryAddress.value.trim()) { orderError.value = "Informe o endereço de entrega"; return }
  if (payMethod.value === "credit_card") {
    if (card.value.number.replace(/\s/g, "").length < 16) { orderError.value = "Número do cartão inválido"; return }
    if (!card.value.name) { orderError.value = "Informe o nome no cartão"; return }
    if (!card.value.expiry) { orderError.value = "Informe a validade"; return }
    if (!card.value.cvv) { orderError.value = "Informe o CVV"; return }
  }

  checkoutLoading.value = true
  const token = localStorage.getItem("token")

  try {
    const payload: any = {
      items: cart.items,
      subtotal: subtotal.value,
      shipping: shippingValue.value,
      discount: discount.value,
      address: deliveryAddress.value,
      zipCode: zipCode.value,
      shippingOption: selectedShipping.value || "standard",
      paymentMethod: payMethod.value,
    }
    if (payMethod.value === "credit_card") {
      payload.cardLastDigits = card.value.number.replace(/\s/g, "").slice(-4)
      payload.cardBrand = detectBrand(card.value.number)
      payload.installments = card.value.installments
    }

    const res = await axios.post(`${API}/api/orders`, payload, {
      headers: { Authorization: `Bearer ${token}` }
    })

    createdOrderId.value = res.data.order?._id || ""
    cart.items = []
    showPaymentModal.value = false
    showSuccess.value = true
  } catch (err: any) {
    orderError.value = err.response?.data?.message || "Erro ao finalizar pedido"
  } finally {
    checkoutLoading.value = false
  }
}

const detectBrand = (num: string) => {
  const n = num.replace(/\D/g, "")
  if (/^4/.test(n)) return "Visa"
  if (/^5[1-5]/.test(n)) return "Mastercard"
  if (/^3[47]/.test(n)) return "Amex"
  return "Outro"
}

const goHome = () => { showSuccess.value = false; router.push("/") }
</script>

<style scoped>
/* ── BASE ── */
.cart-page { background: #fff; min-height: 100vh; padding: 60px 0; font-family: 'Montserrat', sans-serif; }
.container { max-width: 1100px; margin: 0 auto; padding: 0 24px; }

/* ── VAZIO ── */
.empty-cart { text-align: center; padding: 100px 0; }
.empty-icon { display: flex; justify-content: center; margin-bottom: 24px; color: #ccc; }
.empty-cart h1 { font-size: 28px; margin-bottom: 12px; font-family: 'Cormorant Garamond', serif; }
.empty-cart p { color: #888; margin-bottom: 30px; }
.shop-btn { display: inline-block; background: #111; color: #fff; padding: 16px 36px; border-radius: 14px; text-decoration: none; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; }
.empty-links { display: flex; gap: 24px; justify-content: center; margin-top: 24px; }
.empty-links a { color: #888; font-size: 13px; text-decoration: underline; }

/* ── TOPO ── */
.cart-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 36px; }
.title { font-family: 'Cormorant Garamond', serif; font-size: 40px; margin-bottom: 4px; }
.items-count { color: #aaa; font-size: 13px; }
.shipping-banner { display: flex; align-items: center; gap: 10px; background: #f9f6f0; border-radius: 14px; padding: 14px 22px; font-size: 14px; }
.free-text { color: #1e9b58; }

/* ── GRID ── */
.cart-grid { display: grid; grid-template-columns: 1fr 390px; gap: 55px; }

/* ── PRODUTO ── */
.products { display: flex; flex-direction: column; gap: 24px; }
.product-card { display: flex; gap: 24px; padding-bottom: 24px; border-bottom: 1px solid #f2f2f2; }
.image-wrapper img { width: 150px; height: 190px; object-fit: cover; border-radius: 18px; background: #f8f8f8; }
.product-info { flex: 1; display: flex; flex-direction: column; justify-content: space-between; }
.top-info { display: flex; justify-content: space-between; gap: 20px; }
.top-info h2 { font-size: 20px; margin-bottom: 8px; }
.reference { font-size: 11px; color: #999; letter-spacing: 1px; }
.remove-btn { background: none; border: none; cursor: pointer; color: #bbb; transition: 0.2s; }
.remove-btn:hover { color: #111; }
.bottom-info { display: flex; justify-content: space-between; align-items: center; }
.quantity-box { display: flex; align-items: center; border: 1px solid #ececec; border-radius: 12px; overflow: hidden; }
.quantity-box button { width: 42px; height: 42px; border: none; background: white; cursor: pointer; font-size: 18px; }
.quantity-box button:disabled { color: #ddd; cursor: not-allowed; }
.quantity-box span { width: 45px; text-align: center; }
.price { font-size: 22px; }

/* ── RESUMO ── */
.summary-card { border: 1px solid #ececec; border-radius: 24px; padding: 35px; position: sticky; top: 30px; }
.summary-card h2 { margin-bottom: 30px; font-size: 28px; font-family: 'Cormorant Garamond', serif; }
.field { margin-bottom: 22px; }
.field label { display: block; margin-bottom: 10px; font-size: 12px; letter-spacing: 1px; text-transform: uppercase; color: #888; }
.input-group { display: flex; border: 1px solid #e8e8e8; border-radius: 14px; overflow: hidden; }
.input-group input { flex: 1; border: none; padding: 16px; outline: none; font-family: inherit; }
.input-group button { width: 90px; border: none; background: #111; color: white; cursor: pointer; font-size: 12px; letter-spacing: 1px; }
.success-msg { margin-top: 10px; display: flex; align-items: center; gap: 6px; color: #1e9b58; font-size: 12px; }

/* OPÇÕES DE FRETE */
.shipping-options { margin-bottom: 22px; }
.shipping-options label { display: block; margin-bottom: 10px; font-size: 12px; letter-spacing: 1px; text-transform: uppercase; color: #888; }
.ship-option { display: flex; align-items: center; justify-content: space-between; padding: 14px 16px; border: 1px solid #ececec; border-radius: 14px; cursor: pointer; margin-bottom: 10px; transition: border-color 0.2s; }
.ship-option.selected { border-color: #111; background: #fafafa; }
.ship-left { display: flex; align-items: center; gap: 12px; }
.ship-radio { width: 16px; height: 16px; border: 2px solid #ddd; border-radius: 50%; flex-shrink: 0; }
.ship-radio.active { border-color: #111; background: radial-gradient(circle at center, #111 40%, transparent 40%); }
.ship-name { font-size: 13px; font-weight: 600; }
.ship-days { font-size: 11px; color: #999; }
.ship-price { font-size: 14px; font-weight: 700; }

/* VALORES */
.values { margin-top: 25px; border-top: 1px solid #efefef; padding-top: 25px; }
.value-row { display: flex; justify-content: space-between; margin-bottom: 18px; font-size: 14px; }
.discount { color: #1e9b58; }
.total-box { margin-top: 25px; padding-top: 25px; border-top: 1px solid #111; display: flex; justify-content: space-between; align-items: center; }
.total-values { text-align: right; }
.total-values strong { display: block; font-size: 28px; }
.total-values small { color: #999; font-size: 12px; }
.checkout-btn { width: 100%; margin-top: 24px; border: none; background: #111; color: white; height: 60px; border-radius: 16px; cursor: pointer; text-transform: uppercase; letter-spacing: 2px; font-weight: 600; font-size: 13px; transition: 0.3s; display: flex; align-items: center; justify-content: center; gap: 10px; }
.checkout-btn:hover:not(:disabled) { transform: translateY(-2px); }
.checkout-btn:disabled { opacity: 0.6; cursor: not-allowed; }
.secure { margin-top: 18px; display: flex; justify-content: center; gap: 6px; color: #999; font-size: 12px; }

/* ── MODAL PAGAMENTO ── */
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px; }
.payment-modal { background: #fff; border-radius: 28px; padding: 40px; width: 100%; max-width: 520px; max-height: 90vh; overflow-y: auto; }
.modal-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 28px; }
.modal-head h2 { font-size: 22px; font-family: 'Cormorant Garamond', serif; }
.close-btn { background: none; border: none; cursor: pointer; color: #888; }
.close-btn:hover { color: #111; }

.pm-section { margin-bottom: 22px; }
.pm-label { font-size: 11px; letter-spacing: 1px; text-transform: uppercase; color: #888; margin-bottom: 10px; }
.pm-input { width: 100%; box-sizing: border-box; border: 1px solid #e8e8e8; border-radius: 12px; padding: 14px 16px; font-size: 14px; font-family: inherit; outline: none; transition: border-color 0.2s; }
.pm-input:focus { border-color: #111; }
.pm-select { appearance: none; cursor: pointer; }

.payment-tabs { display: flex; gap: 10px; }
.pay-tab { flex: 1; height: 46px; border: 1px solid #e8e8e8; border-radius: 12px; background: white; cursor: pointer; font-size: 13px; font-weight: 600; font-family: inherit; transition: all 0.2s; }
.pay-tab.active { border-color: #111; background: #111; color: white; }

.pay-content { margin-bottom: 20px; }
.form-group { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
.form-group label { font-size: 11px; letter-spacing: 1px; text-transform: uppercase; color: #888; }
.form-row { display: grid; gap: 16px; }
.form-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

/* PIX */
.pix-box { text-align: center; padding: 20px 0; }
.pix-qr { display: flex; justify-content: center; margin-bottom: 16px; }
.pix-value { font-size: 22px; font-weight: 700; margin-bottom: 8px; }
.pix-hint { color: #888; font-size: 13px; margin-bottom: 16px; }
.pix-key-box { display: flex; align-items: center; gap: 10px; background: #f5f5f5; border-radius: 12px; padding: 12px 16px; }
.pix-key { flex: 1; font-size: 13px; color: #333; }
.copy-btn { background: #111; color: white; border: none; border-radius: 8px; padding: 8px 14px; cursor: pointer; font-size: 12px; font-family: inherit; white-space: nowrap; }

/* Boleto */
.boleto-box { text-align: center; padding: 20px 0; }
.boleto-icon { font-size: 40px; margin-bottom: 12px; }
.boleto-title { font-size: 16px; font-weight: 700; margin-bottom: 8px; }
.boleto-value { font-size: 22px; font-weight: 700; margin-bottom: 8px; }
.boleto-hint { color: #888; font-size: 13px; margin-bottom: 16px; }
.boleto-code { font-size: 11px; font-family: monospace; background: #f5f5f5; border-radius: 10px; padding: 10px 14px; margin-bottom: 14px; word-break: break-all; }

.order-error { color: #e74c3c; font-size: 13px; margin-bottom: 14px; padding: 12px 16px; background: #fff5f5; border-radius: 10px; }
.confirm-btn { width: 100%; height: 56px; background: #111; color: white; border: none; border-radius: 16px; cursor: pointer; font-size: 14px; font-weight: 700; font-family: inherit; display: flex; align-items: center; justify-content: center; gap: 10px; transition: 0.3s; }
.confirm-btn:hover:not(:disabled) { background: #333; }
.confirm-btn:disabled { opacity: 0.6; cursor: not-allowed; }

/* Sucesso */
.success-modal { background: white; border-radius: 28px; padding: 60px 40px; text-align: center; max-width: 440px; width: 100%; }
.success-icon { width: 72px; height: 72px; background: #1e9b58; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 32px; color: white; margin: 0 auto 24px; }
.success-modal h2 { font-size: 24px; margin-bottom: 12px; font-family: 'Cormorant Garamond', serif; }
.success-modal p { color: #666; margin-bottom: 10px; }
.order-id { font-size: 13px; font-family: monospace; background: #f5f5f5; padding: 8px 16px; border-radius: 8px; display: inline-block; margin-bottom: 24px; }

/* Animação */
.spin { animation: spin 1s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.cart-animation-enter-active, .cart-animation-leave-active { transition: all 0.4s ease; }
.cart-animation-enter-from, .cart-animation-leave-to { opacity: 0; transform: translateY(20px); }

/* Responsivo */
@media (max-width: 980px) { .cart-grid { grid-template-columns: 1fr; } .summary { order: -1; } .cart-top { flex-direction: column; align-items: flex-start; } }
@media (max-width: 700px) { .product-card { flex-direction: column; } .image-wrapper img { width: 100%; height: 280px; } .title { font-size: 32px; } }
</style>