<template>
  <div class="products-admin">

    <div class="top">
      <h2>Gerenciar Produtos</h2>
    </div>

    <!-- FORM -->

    <form
      @submit.prevent="addProduct"
      class="product-form"
    >

      <input
        v-model="name"
        placeholder="Nome"
        required
      />

      <input
        v-model="description"
        placeholder="Descrição"
      />

      <input
        v-model.number="price"
        type="number"
        placeholder="Preço"
        required
      />

      <input
        v-model.number="stock"
        type="number"
        placeholder="Estoque"
        required
      />

      <input
        v-model="category"
        placeholder="Categoria ID"
      />

      <input
        type="file"
        @change="handleFile"
      />

      <button type="submit">
        Adicionar Produto
      </button>

    </form>

    <!-- LISTA -->

    <div class="product-list">

      <div
        v-for="p in products"
        :key="p._id"
        class="product-card"
      >

        <img
          v-if="p.image"
          :src="`http://localhost:3000${p.image}`"
          alt="produto"
        />

        <h3>{{ p.name }}</h3>

        <p class="price">
          R$ {{ p.price }}
        </p>

        <p>
          Estoque: {{ p.stock }}
        </p>

        <div class="actions">

          <button
            class="edit"
            @click="editProduct(p)"
          >
            Editar
          </button>

          <button
            class="delete"
            @click="deleteProduct(p._id)"
          >
            Deletar
          </button>

        </div>

      </div>

    </div>

    <p
      v-if="message"
      class="message"
    >
      {{ message }}
    </p>

  </div>
</template>

<script>
export default {

  data() {

    return {

      products: [],

      name: "",
      description: "",
      price: 0,
      stock: 0,
      category: "",

      file: null,

      message: ""

    };

  },

  mounted() {

    this.fetchProducts();

  },

  methods: {

    handleFile(e) {

      this.file = e.target.files[0];

    },

    async fetchProducts() {

      const res = await fetch(
        "http://localhost:3000/api/products"
      );

      this.products = await res.json();

    },

    async addProduct() {

      try {

        const formData = new FormData();

        formData.append(
          "name",
          this.name
        );

        formData.append(
          "description",
          this.description
        );

        formData.append(
          "price",
          this.price
        );

        formData.append(
          "stock",
          this.stock
        );

        formData.append(
          "category",
          this.category
        );

        if (this.file) {

          formData.append(
            "image",
            this.file
          );

        }

        const res = await fetch(
          "http://localhost:3000/api/products",
          {
            method: "POST",

            headers: {
              Authorization:
                `Bearer ${localStorage.getItem("token")}`
            },

            body: formData
          }
        );

        if (res.ok) {

          this.message =
            "Produto criado com sucesso";

          this.name = "";
          this.description = "";
          this.price = 0;
          this.stock = 0;
          this.category = "";
          this.file = null;

          this.fetchProducts();

        }

      } catch (error) {

        console.log(error);

      }

    },

    async editProduct(product) {

      const name =
        prompt("Nome", product.name)
        || product.name;

      const price =
        prompt("Preço", product.price)
        || product.price;

      const stock =
        prompt("Estoque", product.stock)
        || product.stock;

      const formData = new FormData();

      formData.append("name", name);

      formData.append("price", price);

      formData.append("stock", stock);

      const res = await fetch(

        `http://localhost:3000/api/products/${product._id}`,

        {

          method: "PUT",

          headers: {
            Authorization:
              `Bearer ${localStorage.getItem("token")}`
          },

          body: formData

        }

      );

      if (res.ok) {

        this.message =
          "Produto atualizado";

        this.fetchProducts();

      }

    },

    async deleteProduct(id) {

      const confirmDelete =
        confirm("Deseja deletar?");

      if (!confirmDelete) return;

      const res = await fetch(

        `http://localhost:3000/api/products/${id}`,

        {

          method: "DELETE",

          headers: {
            Authorization:
              `Bearer ${localStorage.getItem("token")}`
          }

        }

      );

      if (res.ok) {

        this.message =
          "Produto deletado";

        this.fetchProducts();

      }

    }

  }

};
</script>

<style scoped>

.products-admin {
  padding: 30px;
  color: white;
}

.top {
  margin-bottom: 20px;
}

.product-form {
  display: grid;
  gap: 12px;
  margin-bottom: 30px;
}

.product-form input {
  padding: 12px;
  border: 1px solid #333;
  background: #111;
  color: white;
  border-radius: 10px;
}

.product-form button {
  height: 45px;
  border: none;
  background: #c9a96e;
  color: black;
  font-weight: 700;
  border-radius: 10px;
  cursor: pointer;
}

.product-list {
  display: grid;
  grid-template-columns:
    repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
}

.product-card {
  background: #111;
  border: 1px solid #222;
  border-radius: 18px;
  padding: 16px;
}

.product-card img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 14px;
  margin-bottom: 12px;
}

.price {
  color: #c9a96e;
  font-weight: 700;
}

.actions {
  display: flex;
  gap: 10px;
  margin-top: 12px;
}

.actions button {
  flex: 1;
  height: 40px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.edit {
  background: #c9a96e;
  color: black;
}

.delete {
  background: #e74c3c;
  color: white;
}

.message {
  margin-top: 20px;
  color: #2ecc71;
}

</style>