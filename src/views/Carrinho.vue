<template>
  <main class="cart-page">
    <div class="container">

      <!-- CARRINHO VAZIO -->
      <section v-if="cart.items.length === 0" class="empty-cart">
        <div class="empty-icon">
          <ShoppingBag :size="42" stroke-width="1.5" />
        </div>

        <h1>Sua sacola está vazia</h1>

        <p>
          Descubra peças exclusivas e eternize momentos especiais
          com a coleção IVY.
        </p>

        <router-link to="/" class="shop-btn">
          Explorar Coleções
        </router-link>

        <div class="empty-links">
          <router-link to="/aneis">Anéis</router-link>
          <router-link to="/colares">Colares</router-link>
          <router-link to="/brincos">Brincos</router-link>
        </div>
      </section>

      <!-- CARRINHO -->
      <section v-else>

        <!-- TOPO -->
        <div class="cart-top">
          <div>
            <h1 class="title">
              Minha Sacola
            </h1>

            <span class="items-count">
              {{ cart.items.length }}
              {{ cart.items.length > 1 ? 'itens' : 'item' }}
            </span>
          </div>

          <div class="shipping-banner">
            <Truck :size="17" />

            <span v-if="amountToFreeShipping > 0">
              Faltam
              <strong>
                R$ {{ amountToFreeShipping.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}
              </strong>
              para frete grátis
            </span>

            <span v-else class="free-text">
              Você desbloqueou frete grátis ✨
            </span>
          </div>
        </div>

        <!-- GRID -->
        <div class="cart-grid">

          <!-- PRODUTOS -->
          <section class="products">

            <TransitionGroup name="cart-animation">

              <article
                class="product-card"
                v-for="item in cart.items"
                :key="item._id || item.id"
              >

                <!-- FOTO -->
                <div class="image-wrapper">
                  <img
                    :src="item.image || fallbackImage"
                    :alt="item.name"
                  />
                </div>

                <!-- INFO -->
                <div class="product-info">

                  <div class="top-info">
                    <div>
                      <h2>{{ item.name }}</h2>

                      <span class="reference">
                        REF:
                        {{
                          String(item._id || item.id || '000000')
                            .substring(0, 6)
                            .toUpperCase()
                        }}
                      </span>
                    </div>

                    <button
                      class="remove-btn"
                      @click="removeFromCart(item._id || item.id)"
                    >
                      <X :size="18" />
                    </button>
                  </div>

                  <div class="bottom-info">

                    <!-- QUANTIDADE -->
                    <div class="quantity-box">

                      <button
                        @click="updateQuantity(item._id || item.id, -1)"
                        :disabled="item.quantity <= 1"
                      >
                        -
                      </button>

                      <span>
                        {{ item.quantity }}
                      </span>

                      <button
                        @click="updateQuantity(item._id || item.id, 1)"
                      >
                        +
                      </button>

                    </div>

                    <!-- PREÇO -->
                    <strong class="price">
                      R$
                      {{
                        (item.price * item.quantity).toLocaleString(
                          'pt-BR',
                          { minimumFractionDigits: 2 }
                        )
                      }}
                    </strong>

                  </div>
                </div>

              </article>

            </TransitionGroup>

          </section>

          <!-- RESUMO -->
          <aside class="summary">

            <div class="summary-card">

              <h2>Resumo do Pedido</h2>

              <!-- CEP -->
              <div class="field">

                <label>Calcular Frete</label>

                <div class="input-group">

                  <input
                    v-model="zipCode"
                    type="text"
                    placeholder="00000-000"
                    maxlength="9"
                  />

                  <button
                    @click="handleShipping"
                    :disabled="shippingLoading"
                  >
                    <Loader2
                      v-if="shippingLoading"
                      class="spin"
                      :size="16"
                    />

                    <span v-else>
                      OK
                    </span>
                  </button>

                </div>

                <small
                  v-if="addressResult"
                  class="success-msg"
                >
                  <MapPin :size="12" />
                  {{ addressResult.localidade }},
                  {{ addressResult.uf }}
                </small>

              </div>

              <!-- CUPOM -->
              <div class="field">

                <label>Cupom</label>

                <div class="input-group">

                  <input
                    v-model="couponInput"
                    type="text"
                    placeholder="Digite seu cupom"
                  />

                  <button @click="applyCoupon">
                    Aplicar
                  </button>

                </div>

                <small
                  v-if="discount > 0"
                  class="success-msg"
                >
                  Cupom aplicado com sucesso
                </small>

              </div>

              <!-- VALORES -->
              <div class="values">

                <div class="value-row">
                  <span>Subtotal</span>

                  <strong>
                    R$
                    {{
                      subtotal.toLocaleString(
                        'pt-BR',
                        { minimumFractionDigits: 2 }
                      )
                    }}
                  </strong>
                </div>

                <div class="value-row">
                  <span>Frete</span>

                  <strong>
                    {{
                      shippingValue === 0
                        ? 'Grátis'
                        : `R$ ${shippingValue.toLocaleString('pt-BR', {
                            minimumFractionDigits: 2
                          })}`
                    }}
                  </strong>
                </div>

                <div
                  v-if="discount > 0"
                  class="value-row discount"
                >
                  <span>Desconto</span>

                  <strong>
                    - R$
                    {{
                      discount.toLocaleString(
                        'pt-BR',
                        { minimumFractionDigits: 2 }
                      )
                    }}
                  </strong>
                </div>

              </div>

              <!-- TOTAL -->
              <div class="total-box">

                <span>Total</span>

                <div class="total-values">

                  <strong>
                    R$
                    {{
                      finalTotal.toLocaleString(
                        'pt-BR',
                        { minimumFractionDigits: 2 }
                      )
                    }}
                  </strong>

                  <small>
                    ou 10x de
                    R$
                    {{
                      (finalTotal / 10).toLocaleString(
                        'pt-BR',
                        { minimumFractionDigits: 2 }
                      )
                    }}
                  </small>

                </div>

              </div>

              <!-- BOTÃO -->
              <button
                class="checkout-btn"
                @click="handleFinalize"
                :disabled="checkoutLoading"
              >

                <Loader2
                  v-if="checkoutLoading"
                  class="spin"
                  :size="20"
                />

                <span v-else>
                  Finalizar Compra
                </span>

              </button>

              <div class="secure">
                <Lock :size="13" />
                Ambiente 100% seguro
              </div>

            </div>

          </aside>

        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from "vue"
import { useRouter } from "vue-router"
import axios from "axios"

import {
  ShoppingBag,
  Truck,
  X,
  Loader2,
  MapPin,
  Lock
} from "lucide-vue-next"

import {
  cart,
  removeFromCart,
  updateQuantity,
  getTotal
} from "@/stores/cart"

const router = useRouter()

const fallbackImage =
  "https://via.placeholder.com/300x400/f5f5f5/999999"

const zipCode = ref("")
const shippingValue = ref(0)
const shippingLoading = ref(false)
const addressResult = ref(null)

const couponInput = ref("")
const discount = ref(0)

const checkoutLoading = ref(false)

const subtotal = computed(() => {
  return getTotal()
})

const amountToFreeShipping = computed(() => {
  const remaining = 1500 - subtotal.value
  return remaining > 0 ? remaining : 0
})

const finalTotal = computed(() => {
  return subtotal.value + shippingValue.value - discount.value
})

const handleShipping = async () => {
  const cep = zipCode.value.replace(/\D/g, "")

  if (cep.length !== 8) {
    return alert("Digite um CEP válido")
  }

  shippingLoading.value = true

  try {
    const response = await axios.get(
      `https://viacep.com.br/ws/${cep}/json/`
    )

    if (response.data.erro) {
      throw new Error()
    }

    addressResult.value = response.data

    if (subtotal.value >= 1500) {
      shippingValue.value = 0
    } else {
      shippingValue.value =
        response.data.uf === "SP" ? 25 : 45
    }

  } catch (error) {
    alert("CEP não encontrado")
  } finally {
    shippingLoading.value = false
  }
}

const applyCoupon = () => {
  const code = couponInput.value
    .trim()
    .toUpperCase()

  if (code === "WELCOME15") {
    discount.value = subtotal.value * 0.15
    return
  }

  if (code === "IVY10") {
    discount.value = subtotal.value * 0.10
    return
  }

  discount.value = 0

  alert("Cupom inválido")
}

const handleFinalize = async () => {
  const token = localStorage.getItem("token")

  if (!token) {
    router.push("/login?redirect=cart")
    return
  }

  checkoutLoading.value = true

  try {
    await axios.post(
      "http://localhost:3000/api/orders",
      {
        items: cart.items,
        total: finalTotal.value,
        address: addressResult.value
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    alert("Pedido realizado com sucesso")

    cart.items = []

    router.push("/perfil")

  } catch (error) {
    alert("Erro ao finalizar pedido")
  } finally {
    checkoutLoading.value = false
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Inter:wght@300;400;500;600&display=swap');

.cart-page {
  min-height: 100vh;
  background: #ffffff;
  padding: 60px 0;
  font-family: 'Inter', sans-serif;
}

.container {
  max-width: 1250px;
  margin: 0 auto;
  padding: 0 24px;
}

/* EMPTY */

.empty-cart {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
}

.empty-icon {
  width: 95px;
  height: 95px;
  border-radius: 50%;
  border: 1px solid #ececec;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 28px;
}

.empty-cart h1 {
  font-size: 42px;
  margin-bottom: 14px;
  font-family: 'Cormorant Garamond', serif;
  font-weight: 600;
}

.empty-cart p {
  color: #777;
  max-width: 500px;
  line-height: 1.7;
}

.shop-btn {
  margin-top: 35px;
  background: #111;
  color: white;
  text-decoration: none;
  padding: 18px 45px;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 12px;
  transition: 0.3s;
}

.shop-btn:hover {
  transform: translateY(-3px);
}

.empty-links {
  margin-top: 30px;
  display: flex;
  gap: 20px;
}

.empty-links a {
  text-decoration: none;
  color: #888;
}

/* TOPO */

.cart-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
  gap: 20px;
}

.title {
  font-size: 44px;
  font-family: 'Cormorant Garamond', serif;
}

.items-count {
  color: #999;
  font-size: 14px;
}

.shipping-banner {
  background: #fafafa;
  border: 1px solid #ececec;
  padding: 15px 22px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 14px;
  font-size: 14px;
}

.free-text {
  color: #1e9b58;
}

/* GRID */

.cart-grid {
  display: grid;
  grid-template-columns: 1fr 390px;
  gap: 55px;
}

/* PRODUTOS */

.products {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.product-card {
  display: flex;
  gap: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #f2f2f2;
}

.image-wrapper img {
  width: 150px;
  height: 190px;
  object-fit: cover;
  border-radius: 18px;
  background: #f8f8f8;
}

.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.top-info {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.top-info h2 {
  font-size: 20px;
  margin-bottom: 8px;
}

.reference {
  font-size: 11px;
  color: #999;
  letter-spacing: 1px;
}

.remove-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #bbb;
  transition: 0.2s;
}

.remove-btn:hover {
  color: #111;
}

.bottom-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.quantity-box {
  display: flex;
  align-items: center;
  border: 1px solid #ececec;
  border-radius: 12px;
  overflow: hidden;
}

.quantity-box button {
  width: 42px;
  height: 42px;
  border: none;
  background: white;
  cursor: pointer;
  font-size: 18px;
}

.quantity-box span {
  width: 45px;
  text-align: center;
}

.price {
  font-size: 22px;
}

/* SUMMARY */

.summary-card {
  border: 1px solid #ececec;
  border-radius: 24px;
  padding: 35px;
  position: sticky;
  top: 30px;
}

.summary-card h2 {
  margin-bottom: 30px;
  font-size: 28px;
  font-family: 'Cormorant Garamond', serif;
}

.field {
  margin-bottom: 26px;
}

.field label {
  display: block;
  margin-bottom: 10px;
  font-size: 12px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #888;
}

.input-group {
  display: flex;
  border: 1px solid #e8e8e8;
  border-radius: 14px;
  overflow: hidden;
}

.input-group input {
  flex: 1;
  border: none;
  padding: 16px;
  outline: none;
}

.input-group button {
  width: 110px;
  border: none;
  background: #111;
  color: white;
  cursor: pointer;
  font-size: 12px;
  letter-spacing: 1px;
}

.success-msg {
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 6px;
  color: #1e9b58;
}

.values {
  margin-top: 35px;
  border-top: 1px solid #efefef;
  padding-top: 25px;
}

.value-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 18px;
}

.discount {
  color: #1e9b58;
}

.total-box {
  margin-top: 25px;
  padding-top: 25px;
  border-top: 1px solid #111;
  display: flex;
  justify-content: space-between;
}

.total-values {
  text-align: right;
}

.total-values strong {
  display: block;
  font-size: 34px;
}

.total-values small {
  color: #999;
}

.checkout-btn {
  width: 100%;
  margin-top: 35px;
  border: none;
  background: #111;
  color: white;
  height: 60px;
  border-radius: 16px;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 600;
  transition: 0.3s;
}

.checkout-btn:hover {
  transform: translateY(-2px);
}

.secure {
  margin-top: 18px;
  display: flex;
  justify-content: center;
  gap: 6px;
  color: #999;
  font-size: 12px;
}

.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* ANIMAÇÃO */

.cart-animation-enter-active,
.cart-animation-leave-active {
  transition: all 0.4s ease;
}

.cart-animation-enter-from,
.cart-animation-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* RESPONSIVO */

@media (max-width: 980px) {

  .cart-grid {
    grid-template-columns: 1fr;
  }

  .summary {
    order: -1;
  }

  .cart-top {
    flex-direction: column;
    align-items: flex-start;
  }

}

@media (max-width: 700px) {

  .product-card {
    flex-direction: column;
  }

  .image-wrapper img {
    width: 100%;
    height: 320px;
  }

  .bottom-info {
    margin-top: 20px;
  }

  .title {
    font-size: 34px;
  }

}
</style>