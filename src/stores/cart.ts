import { reactive, watch } from "vue"

export const cart = reactive({
  items: JSON.parse(localStorage.getItem("cart")) || []
})

// Salva no LocalStorage sempre que o carrinho mudar
watch(
  () => cart.items,
  () => {
    localStorage.setItem("cart", JSON.stringify(cart.items))
  },
  { deep: true }
)

export const addToCart = (product) => {
  // Verificamos por _id ou id para garantir compatibilidade
  const productId = product._id || product.id
  const existing = cart.items.find(i => (i._id || i.id) === productId)

  if (existing) {
    existing.quantity++
  } else {
    cart.items.push({ ...product, quantity: 1 })
  }
}

export const removeFromCart = (id) => {
  cart.items = cart.items.filter(i => (i._id !== id && i.id !== id))
}

// --- ESSA É A FUNÇÃO QUE ESTAVA FALTANDO ---
export const updateQuantity = (id, amount) => {
  const item = cart.items.find(i => (i._id === id || i.id === id))
  if (item) {
    item.quantity += amount
    if (item.quantity < 1) {
      removeFromCart(id)
    }
  }
}

export const getTotal = () => {
  return cart.items.reduce((acc, item) => {
    return acc + item.price * item.quantity
  }, 0)
}