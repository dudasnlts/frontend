<template>
  <div class="cart-page">
    <div class="container">
      
      <!-- 1. ESTADO VAZIO (LUXO) -->
      <div v-if="cart.items.length === 0" class="empty-state-luxury">
        <div class="empty-content">
          <div class="icon-wrapper">
            <ShoppingBag :size="45" stroke-width="1" />
            <div class="dot-decoration"></div>
          </div>
          
          <h2 class="empty-title">Sua sacola está vazia</h2>
          <p class="empty-subtitle">
            Curadoria exclusiva de peças que contam histórias. <br>
            Encontre sua próxima joia ou um presente inesquecível.
          </p>

          <div class="first-purchase-banner">
            <div class="banner-inner">
              <span class="tag">Presente de Boas-Vindas</span>
              <h3>15% OFF na sua primeira joia</h3>
              <p>Use o código: <strong class="promo-code">WELCOME15</strong></p>
            </div>
          </div>

          <router-link to="/" class="btn-luxury">Explorar Coleções</router-link>

          <div class="quick-links">
            <span>Sugestões:</span>
            <router-link to="/aneis">Anéis</router-link>
            <router-link to="/colares">Colares</router-link>
            <router-link to="/brincos">Brincos</router-link>
          </div>
        </div>
      </div>

      <!-- 2. CARRINHO ATIVO -->
      <div v-else>
        <!-- Barra de Progresso de Frete -->
        <div class="benefit-bar">
          <div class="bar-text">
            <Truck :size="16" />
            <span v-if="amountToFreeShipping > 0">
              Adicione <strong>R$ {{ amountToFreeShipping.toFixed(2) }}</strong> para garantir <strong>Frete Cortesia</strong>
            </span>
            <span v-else class="success-text">Você desbloqueou o <strong>Frete Cortesia Ivy</strong></span>
          </div>
          <div class="bar-bg">
            <div class="bar-fill" :style="{ width: Math.min((getTotal() / 1500) * 100, 100) + '%' }"></div>
          </div>
        </div>

        <div class="cart-grid">
          <!-- SEÇÃO DA SACOLA -->
          <section class="bag-items">
            <h1 class="section-title">Minha Sacola <span class="count">({{ cart.items.length }})</span></h1>
            
            <TransitionGroup name="fade-list">
              <div class="product-card" v-for="item in cart.items" :key="item.id || item._id">
                <div class="product-img">
                  <img :src="item.image || 'https://via.placeholder.com/200x250'" :alt="item.name">
                </div>
                
                <div class="product-info">
                  <div class="info-top">
                    <div>
                      <h3>{{ item.name }}</h3>
                      <p class="sku">Ref: {{ (item.id || item._id).substring(0, 6).toUpperCase() }}</p>
                    </div>
                    <button class="remove-btn" @click="removeFromCart(item.id || item._id)">
                      <X :size="20" />
                    </button>
                  </div>

                  <div class="info-bottom">
                    <div class="qty-control">
                      <button @click="updateQuantity(item.id || item._id, -1)" :disabled="item.quantity <= 1">−</button>
                      <span>{{ item.quantity }}</span>
                      <button @click="updateQuantity(item.id || item._id, 1)">+</button>
                    </div>
                    <span class="total-item-price">
                      R$ {{ (item.price * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}
                    </span>
                  </div>
                </div>
              </div>
            </TransitionGroup>
          </section>

          <!-- RESUMO DO PEDIDO -->
          <aside class="order-summary">
            <div class="summary-box">
              <h2 class="summary-title">Resumo</h2>

              <!-- CEP FUNCIONAL -->
              <div class="summary-field">
                <label>Calcular Frete</label>
                <div class="input-inline">
                  <input type="text" v-model="zipCode" placeholder="00000-000" maxlength="9">
                  <button @click="handleShipping" :disabled="shippingLoading">
                    <Loader2 v-if="shippingLoading" class="spinner" :size="16" />
                    <span v-else>Ok</span>
                  </button>
                </div>
                <p v-if="addressResult" class="address-detail">
                  <MapPin :size="12" /> {{ addressResult.localidade }}, {{ addressResult.uf }}
                </p>
              </div>

              <!-- CUPOM FUNCIONAL -->
              <div class="summary-field">
                <label>Cupom de Desconto</label>
                <div class="input-inline">
                  <input type="text" v-model="couponInput" placeholder="Código" :disabled="discount > 0">
                  <button @click="applyCoupon" :class="{'applied': discount > 0}">
                    {{ discount > 0 ? 'Aplicado' : 'Aplicar' }}
                  </button>
                </div>
                <p v-if="discount > 0" class="discount-msg">Desconto de 15% aplicado!</p>
              </div>

              <div class="bill-details">
                <div class="bill-row">
                  <span>Subtotal</span>
                  <span>R$ {{ getTotal().toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</span>
                </div>
                <div class="bill-row">
                  <span>Frete</span>
                  <span :class="{'free': shippingValue === 0}">
                    {{ shippingValue === 0 ? 'Grátis' : `R$ ${shippingValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` }}
                  </span>
                </div>
                <div class="bill-row" v-if="discount > 0">
                  <span>Desconto</span>
                  <span class="discount-val">- R$ {{ discount.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</span>
                </div>
                
                <div class="bill-total">
                  <span>Total</span>
                  <div class="total-group">
                    <strong>R$ {{ finalTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</strong>
                    <small>ou 10x de R$ {{ (finalTotal / 10).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</small>
                  </div>
                </div>
              </div>

              <button class="checkout-btn" @click="handleFinalize" :disabled="checkoutLoading">
                <span v-if="!checkoutLoading">Finalizar Compra</span>
                <Loader2 v-else class="spinner" :size="20" />
              </button>

              <div class="security-tag">
                <Lock :size="12" /> Pagamento 100% Seguro
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import { useRouter } from "vue-router"
import axios from "axios"
import { X, ShoppingBag, Truck, Loader2, MapPin, Lock } from "lucide-vue-next"
import { cart, removeFromCart, getTotal, updateQuantity } from "@/stores/cart"

const router = useRouter()

// Estados de Frete
const zipCode = ref("")
const shippingValue = ref(0)
const shippingLoading = ref(false)
const addressResult = ref(null)

// Estados de Cupom
const couponInput = ref("")
const discount = ref(0)

// Estados de Finalização
const checkoutLoading = ref(false)

// LÓGICA DE FRETE (ViaCEP)
const handleShipping = async () => {
  const cleanZip = zipCode.value.replace(/\D/g, "")
  if (cleanZip.length < 8) return
  
  shippingLoading.value = true
  addressResult.value = null
  
  try {
    const { data } = await axios.get(`https://viacep.com.br/ws/${cleanZip}/json/`)
    if (data.erro) throw new Error()
    
    addressResult.value = data
    // Regra: SP = R$25, outros = R$50. Acima de 1500 = Grátis.
    if (getTotal() >= 1500) {
      shippingValue.value = 0
    } else {
      shippingValue.value = data.uf === "SP" ? 25 : 50
    }
  } catch (e) {
    alert("CEP não encontrado. Tente novamente.")
  } finally {
    shippingLoading.value = false
  }
}

// LÓGICA DE CUPOM (Primeira Compra)
const applyCoupon = () => {
  const code = couponInput.value.toUpperCase().trim()
  if (code === "WELCOME15") {
    discount.value = getTotal() * 0.15
  } else if (code === "IVY10") {
    discount.value = getTotal() * 0.10
  } else {
    alert("Este cupom não é válido.")
    couponInput.value = ""
  }
}

// CÁLCULOS DINÂMICOS
const amountToFreeShipping = computed(() => 1500 - getTotal())
const finalTotal = computed(() => (getTotal() + shippingValue.value) - discount.value)

// FINALIZAR
const handleFinalize = async () => {
  const token = localStorage.getItem("token")
  if (!token) return router.push("/login?redirect=cart")
  
  checkoutLoading.value = true
  try {
    // Sincronização com Backend (Simulado/Real conforme seu setup)
    await axios.post("http://localhost:3000/api/orders", {
      items: cart.items,
      total: finalTotal.value,
      address: addressResult.value
    }, { headers: { Authorization: `Bearer ${token}` } })

    alert("Pedido realizado com sucesso!")
    cart.items = [] // Limpa a sacola
    router.push("/perfil")
  } catch (err) {
    alert("Erro ao processar compra.")
  } finally {
    checkoutLoading.value = false
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Inter:wght@300;400;600&display=swap');

.cart-page {
  background: #fff;
  min-height: 100vh;
  padding: 60px 0;
  font-family: 'Inter', sans-serif;
  color: #111;
}

.container { max-width: 1150px; margin: 0 auto; padding: 0 25px; }

/* --- ESTADO VAZIO (LUXO) --- */
.empty-state-luxury {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  text-align: center;
}

.icon-wrapper { position: relative; margin-bottom: 25px; }
.dot-decoration { 
  position: absolute; top: -2px; right: -2px; 
  width: 8px; height: 8px; background: #d4af37; border-radius: 50%; 
}

.empty-title { font-family: 'Cormorant Garamond', serif; font-size: 2.8rem; margin-bottom: 15px; }
.empty-subtitle { color: #777; line-height: 1.6; margin-bottom: 35px; }

.first-purchase-banner {
  background: #f9f9f9; border: 1px solid #eee;
  padding: 25px; margin-bottom: 35px; border-radius: 4px;
}
.tag { font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #d4af37; display: block; margin-bottom: 8px; }
.promo-code { border: 1px dashed #aaa; padding: 2px 8px; background: #fff; }

.btn-luxury {
  display: inline-block; background: #111; color: #fff;
  padding: 18px 50px; text-decoration: none; text-transform: uppercase;
  font-size: 12px; letter-spacing: 2px; font-weight: 600; transition: 0.3s;
}
.btn-luxury:hover { background: #333; transform: translateY(-2px); }

.quick-links { margin-top: 40px; font-size: 12px; display: flex; justify-content: center; gap: 15px; color: #999; }
.quick-links a { color: #111; text-decoration: none; border-bottom: 1px solid #ddd; }

/* --- CARRINHO ATIVO --- */
.benefit-bar { margin-bottom: 50px; }
.bar-text { display: flex; align-items: center; gap: 10px; font-size: 13px; margin-bottom: 10px; }
.bar-bg { height: 2px; background: #f0f0f0; }
.bar-fill { height: 100%; background: #111; transition: width 0.8s ease; }
.success-text { color: #28a745; font-weight: 600; }

.cart-grid { display: grid; grid-template-columns: 1fr 380px; gap: 70px; align-items: start; }

/* SACOLA */
.section-title { font-family: 'Cormorant Garamond', serif; font-size: 32px; margin-bottom: 40px; border-bottom: 1px solid #f0f0f0; padding-bottom: 15px; }
.count { font-family: 'Inter', sans-serif; font-size: 14px; color: #aaa; margin-left: 10px; }

.product-card { display: flex; gap: 25px; padding-bottom: 30px; border-bottom: 1px solid #f7f7f7; margin-bottom: 30px; }
.product-img img { width: 130px; height: 165px; object-fit: cover; }
.product-info { flex: 1; display: flex; flex-direction: column; justify-content: space-between; }
.info-top { display: flex; justify-content: space-between; }
.info-top h3 { font-size: 18px; font-weight: 500; margin: 0; }
.sku { font-size: 11px; color: #bbb; text-transform: uppercase; margin-top: 5px; }
.remove-btn { background: none; border: none; color: #ddd; cursor: pointer; transition: 0.2s; }
.remove-btn:hover { color: #111; }

.qty-control { display: flex; align-items: center; border: 1px solid #f0f0f0; }
.qty-control button { width: 32px; height: 32px; background: none; border: none; cursor: pointer; }
.qty-control span { width: 35px; text-align: center; font-size: 13px; }
.total-item-price { font-weight: 600; font-size: 17px; }

/* RESUMO */
.summary-box { background: #fcfcfc; border: 1px solid #f0f0f0; padding: 35px; position: sticky; top: 40px; }
.summary-title { font-size: 22px; margin-bottom: 30px; }
.summary-field { margin-bottom: 25px; }
.summary-field label { display: block; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #888; margin-bottom: 10px; }

.input-inline { display: flex; border-bottom: 1px solid #ddd; align-items: center; }
.input-inline input { flex: 1; background: none; border: none; padding: 10px 0; outline: none; font-size: 14px; }
.input-inline button { background: none; border: none; font-size: 11px; font-weight: 600; text-transform: uppercase; cursor: pointer; padding-left: 10px; }
.input-inline button.applied { color: #28a745; }

.address-detail, .discount-msg { font-size: 11px; color: #28a745; margin-top: 8px; font-weight: 500; }

.bill-details { margin-top: 35px; border-top: 1px solid #eee; padding-top: 25px; }
.bill-row { display: flex; justify-content: space-between; margin-bottom: 15px; font-size: 14px; }
.discount-val, .free { color: #28a745; }

.bill-total { display: flex; justify-content: space-between; align-items: flex-end; margin-top: 25px; padding-top: 25px; border-top: 1px solid #111; }
.total-group { text-align: right; }
.total-group strong { font-size: 26px; display: block; letter-spacing: -1px; }
.total-group small { font-size: 11px; color: #999; }

.checkout-btn { 
  width: 100%; background: #111; color: #fff; border: none; padding: 20px; 
  margin-top: 35px; text-transform: uppercase; font-weight: 600; letter-spacing: 2px; cursor: pointer;
  display: flex; justify-content: center; align-items: center;
}
.checkout-btn:hover { background: #333; }
.security-tag { display: flex; align-items: center; justify-content: center; gap: 6px; font-size: 10px; color: #ccc; margin-top: 20px; text-transform: uppercase; }

.spinner { animation: spin 1s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

/* ANIMAÇÕES */
.fade-list-enter-active, .fade-list-leave-active { transition: all 0.4s ease; }
.fade-list-enter-from, .fade-list-leave-to { opacity: 0; transform: translateX(-20px); }

@media (max-width: 900px) {
  .cart-grid { grid-template-columns: 1fr; gap: 40px; }
  .order-summary { order: -1; }
  .empty-title { font-size: 2rem; }
}
</style>