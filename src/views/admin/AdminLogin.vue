<template>
  <div class="admin-login">
    <h2>Login Admin</h2>
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Senha" />
    <button @click="login">Entrar</button>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  data() { return { email: "", password: "", error: "" }; },
  methods: {
    async login() {
      try {
        const res = await fetch("http://localhost:3000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: this.email, password: this.password })
        });
        const data = await res.json();
        if (!res.ok) { this.error = data.message; return; }

        localStorage.setItem("token", data.token);

        const payload = JSON.parse(atob(data.token.split(".")[1]));
        if (payload.role !== "admin") { 
          this.error = "Acesso negado"; 
          localStorage.removeItem("token"); 
          return; 
        }

        this.$router.push("/admin");

      } catch { this.error = "Erro de conexão"; }
    }
  }
};
</script>