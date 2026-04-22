<template>
  <div class="products-admin">
    <h2>Gerenciar Produtos</h2>

    <!-- Formulário adicionar produto -->
    <form @submit.prevent="addProduct" class="product-form">
      <input v-model="name" placeholder="Nome" required />
      <input v-model.number="price" type="number" placeholder="Preço" required />
      <input v-model.number="stock" type="number" placeholder="Estoque" required />
      <input type="file" @change="handleFile" />
      <button type="submit">Adicionar</button>
    </form>

    <!-- Lista de produtos -->
    <div class="product-list">
      <div v-for="p in products" :key="p._id" class="product-card">
        <img v-if="p.image" :src="`http://localhost:3000${p.image}`" alt="produto" />
        <h3>{{ p.name }}</h3>
        <p>R$ {{ p.price }}</p>
        <p>Estoque: {{ p.stock }}</p>
        <button @click="editProduct(p)">Editar</button>
        <button @click="deleteProduct(p._id)">Deletar</button>
      </div>
    </div>

    <p v-if="message" class="message">{{ message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      name: "",
      price: 0,
      stock: 0,
      file: null,
      message: ""
    };
  },
  mounted() { this.fetchProducts(); },
  methods: {
    handleFile(e) { this.file = e.target.files[0]; },
    async fetchProducts() {
      const res = await fetch("http://localhost:3000/admin/products", {
        headers: { Authorization: localStorage.getItem("token") }
      });
      this.products = await res.json();
    },
    async addProduct() {
      const formData = new FormData();
      formData.append("name", this.name);
      formData.append("price", this.price);
      formData.append("stock", this.stock);
      if (this.file) formData.append("image", this.file);

      const res = await fetch("http://localhost:3000/admin/products", {
        method: "POST",
        headers: { Authorization: localStorage.getItem("token") },
        body: formData
      });
      if (res.ok) {
        this.message = "Produto adicionado com sucesso!";
        this.name = ""; this.price = 0; this.stock = 0; this.file = null;
        this.fetchProducts();
      }
    },
    async editProduct(p) {
      const name = prompt("Nome:", p.name) || p.name;
      const price = prompt("Preço:", p.price) || p.price;
      const stock = prompt("Estoque:", p.stock) || p.stock;

      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("stock", stock);

      const res = await fetch(`http://localhost:3000/admin/products/${p._id}`, {
        method: "PUT",
        headers: { Authorization: localStorage.getItem("token") },
        body: formData
      });

      if (res.ok) this.message = "Produto editado com sucesso!";
      this.fetchProducts();
    },
    async deleteProduct(id) {
      const res = await fetch(`http://localhost:3000/admin/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: localStorage.getItem("token") }
      });
      if (res.ok) {
        this.message = "Produto deletado!";
        this.fetchProducts();
      }
    }
  }
};
</script>

<style scoped>
.products-admin { padding: 20px; }
.product-form input { margin: 5px; }
.product-list { display: flex; flex-wrap: wrap; gap: 10px; }
.product-card { border: 1px solid #ccc; padding: 10px; width: 200px; text-align: center; }
.product-card img { width: 100%; height: 150px; object-fit: cover; }
.message { color: green; margin-top: 10px; }
</style>