<template>
  <section class="trabalhe">

    <!-- HERO -->
    <div class="hero">
      <div class="hero-content">
        <span class="subtitle">Carreiras</span>
        <h1>Trabalhe Conosco</h1>
        <div class="divider"></div>
        <p>Construa sua história com a IVY</p>
      </div>
    </div>

    <!-- INTRO -->
    <div class="container">
      <div class="intro">
        <h2>Faça parte da nossa equipe</h2>
        <p>
          Na <strong>IVY</strong>, buscamos pessoas que valorizam excelência, elegância e atenção aos detalhes.
          Aqui, cada talento contribui para criar experiências únicas.
        </p>
      </div>

      <!-- BENEFÍCIOS -->
      <div class="beneficios">
        <div class="card">
          <h3>Ambiente Sofisticado</h3>
          <p>Trabalhe em um espaço que inspira criatividade e estilo.</p>
        </div>

        <div class="card">
          <h3>Crescimento Profissional</h3>
          <p>Oportunidades reais de evolução dentro da empresa.</p>
        </div>

        <div class="card">
          <h3>Valorização</h3>
          <p>Reconhecemos e incentivamos o seu talento.</p>
        </div>
      </div>

      <!-- FORMULÁRIO -->
      <div class="form-section">
        <h2>Envie seu currículo</h2>

        <form @submit.prevent="enviar">
          <input type="text" v-model="nome" placeholder="Nome completo" required />
          <input type="email" v-model="email" placeholder="E-mail" required />
          <textarea v-model="mensagem" placeholder="Fale sobre você"></textarea>

          <button type="submit">ENVIAR</button>
        </form>
      </div>
    </div>

  </section>
</template>

<script>
export default {
  name: "TrabalheConosco",
  data() {
    return {
      nome: "",
      email: "",
      mensagem: ""
    }
  },
  methods: {
    enviar() {
      alert(`Obrigado, ${this.nome}! Recebemos suas informações.`);
      this.nome = "";
      this.email = "";
      this.mensagem = "";
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:wght@400;600&family=Montserrat:wght@300;400&display=swap');

.trabalhe {
  font-family: 'Montserrat', sans-serif;
  color: #222;
}

/* HERO */
.hero {
  height: 65vh;
  background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
              url("https://images.unsplash.com/photo-1521334884684-d80222895322") center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.hero-content {
  color: #fff;
}

.subtitle {
  letter-spacing: 4px;
  font-size: 12px;
  color: #c5a059;
}

.hero h1 {
  font-family: 'Bodoni Moda', serif;
  font-size: 42px;
  letter-spacing: 2px;
}

.divider {
  width: 60px;
  height: 2px;
  background: #c5a059;
  margin: 15px auto;
}

/* CONTAINER */
.container {
  max-width: 1100px;
  margin: 60px auto;
  padding: 0 20px;
}

/* INTRO */
.intro {
  text-align: center;
  margin-bottom: 50px;
}

.intro h2 {
  font-family: 'Bodoni Moda', serif;
}

/* BENEFÍCIOS */
.beneficios {
  display: flex;
  gap: 30px;
  margin-bottom: 60px;
  flex-wrap: wrap;
}

.card {
  flex: 1;
  padding: 30px;
  border: 1.5px solid #c5a059;
  text-align: center;
  border-radius: 6px;
}

/* FORM */
.form-section {
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 500px;
  margin: 0 auto;
}

input, textarea {
  padding: 12px;
  border: 1px solid #ccc;
  font-family: 'Montserrat', sans-serif;
}

button {
  padding: 12px;
  background: #000;
  color: #fff;
  border: none;
  letter-spacing: 2px;
  cursor: pointer;
}

button:hover {
  opacity: 0.85;
}
</style>