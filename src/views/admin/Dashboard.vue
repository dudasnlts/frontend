<template>
  <div>
    <h1>Painel Admin</h1>
    <nav>
      <router-link to="/admin/products">Produtos</router-link>
      <button @click="logout">Sair</button>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/admin/login");
    }
  }
};
</script>