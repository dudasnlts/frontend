<template>
  <div class="cart-container">
    <h1>Seu Carrinho</h1>

    <div v-if="cart.items.length === 0" class="empty-state">
      <p>Puxa, seu carrinho está vazio!</p>
      <router-link to="/" class="btn-continue">Voltar às compras</router-link>
    </div>

    <div v-else class="cart-content">
      <div class="items-list">
        <div class="item-card" v-for="item in cart.items" :key="item.id">
          <div class="item-info">
            <h3>{{ item.name }}</h3>
            <p class="price">R$ {{ item.price.toFixed(2) }}</p>
          </div>

          <div class="item-controls">
            <div class="quantity-selector">
              <button @click="updateQuantity(item.id, -1)" :disabled="item.quantity <= 1">-</button>
              <span>{{ item.quantity }}</span>
              <button @click="updateQuantity(item.id, 1)">+</button>
            </div>
            
            <button class="btn-remove" @click="removeFromCart(item.id)">
              Remover
            </button>
          </div>
        </div>
      </div>

      <div class="cart-summary">
        <div class="summary-row">
          <span>Subtotal</span>
          <span>R$ {{ getTotal().toFixed(2) }}</span>
        </div>
        <div class="summary-row total">
          <span>Total</span>
          <span>R$ {{ getTotal().toFixed(2) }}</span>
        </div>
        <button class="btn-checkout">Finalizar Compra</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { cart, removeFromCart, getTotal, updateQuantity } from "@/stores/cart"
</script>

<style scoped>
.cart-container {
  max-width: 1000px;
  margin: 40px auto;
  padding: 0 20px;
  font-family: 'Inter', sans-serif;
}

h1 {
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  margin-bottom: 40px;
  border-bottom: 2px solid #f4f4f4;
  padding-bottom: 10px;
}

/* Layout em duas colunas para telas maiores */
.cart-content {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 40px;
}

@media (max-width: 768px) {
  .cart-content { grid-template-columns: 1fr; }
}

.item-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 0;
  border-bottom: 1px solid #eee;
}

.price {
  color: #666;
  font-weight: 500;
}

.item-controls {
  display: flex;
  align-items: center;
  gap: 20px;
}

.quantity-selector {
  display: flex;
  align-items: center;
  background: #f8f8f8;
  border-radius: 25px;
  padding: 5px 15px;
  gap: 15px;
}

.quantity-selector button {
  background: none;
  color: black;
  font-weight: bold;
  padding: 0;
  width: 20px;
}

.btn-remove {
  background: transparent;
  color: #ff4444;
  font-size: 0.9rem;
  text-decoration: underline;
}

.btn-remove:hover { background: transparent; color: #cc0000; }

/* Resumo da Compra */
.cart-summary {
  background: #f9f9f9;
  padding: 30px;
  border-radius: 12px;
  height: fit-content;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.total {
  font-size: 1.3rem;
  font-weight: bold;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #ddd;
}

.btn-checkout {
  width: 100%;
  background: black;
  color: white;
  padding: 15px;
  border-radius: 8px;
  margin-top: 20px;
  font-weight: bold;
  transition: opacity 0.2s;
}

.btn-checkout:hover { opacity: 0.8; }
</style>