<template>
  <div class="page">

    <!-- HERO -->
    <header class="hero">
      <div class="hero-inner">
        <span class="tag">ENVIO PREMIUM</span>
        <h1>Política de Entrega</h1>
        <p>Precisão, cuidado e excelência em cada detalhe da sua experiência</p>
      </div>
    </header>

    <!-- FRETE -->
    <section class="shipping">

      <h2>Calcular entrega</h2>

      <div class="form">
        <input v-model="cep" placeholder="Digite seu CEP" />
        <button @click="calcularFrete">Calcular</button>
      </div>

      <div v-if="resultado" class="result-box">
        <p>{{ resultado }}</p>
      </div>

    </section>

    <!-- CARDS -->
    <main class="grid">

      <article class="card">
        <IconTruck />
        <h3>Prazos de entrega</h3>
        <p>Envios rápidos com logística otimizada em todo Brasil.</p>
        <span>2 a 12 dias úteis</span>
      </article>

      <article class="card">
        <IconBox />
        <h3>Processamento</h3>
        <p>Seu pedido passa por inspeção e embalagem premium.</p>
        <span>Até 2 dias úteis</span>
      </article>

      <article class="card">
        <IconCard />
        <h3>Frete</h3>
        <p>Cálculo automático com base na sua localização.</p>
        <span>Grátis acima de R$ 299</span>
      </article>

      <article class="card">
        <IconShield />
        <h3>Segurança</h3>
        <p>Envios protegidos com embalagem reforçada e discreta.</p>
        <span>Garantia total</span>
      </article>

    </main>

    <!-- WHATSAPP -->
    <a class="whatsapp" href="https://wa.me/5531999999999">
      <IconWhats />
    </a>

  </div>
</template>

<script>
export default {
  name: "PoliticaEntrega",

  data() {
    return {
      cep: "",
      resultado: "",
    };
  },

  methods: {
    calcularFrete() {
      if (!this.cep || this.cep.length < 8) {
        this.resultado = "Digite um CEP válido.";
        return;
      }

      const n = parseInt(this.cep.replace("-", ""));

      if (n < 39999999) {
        this.resultado = "Entrega expressa • 2–5 dias úteis • R$ 14,90";
      } else if (n < 69999999) {
        this.resultado = "Entrega padrão • 3–8 dias úteis • R$ 19,90";
      } else {
        this.resultado = "Entrega estendida • até 12 dias úteis • R$ 29,90";
      }
    },
  },
};

/* ICONS */
const IconTruck = {
  template: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
    <path d="M3 7h12v8H3z"/>
    <path d="M15 9h4l2 3v3h-6z"/>
    <circle cx="7" cy="17" r="1.5"/>
    <circle cx="17" cy="17" r="1.5"/>
  </svg>`
};

const IconBox = {
  template: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
    <path d="M4 7l8-4 8 4-8 4-8-4z"/>
    <path d="M4 7v10l8 4 8-4V7"/>
  </svg>`
};

const IconCard = {
  template: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
    <rect x="3" y="5" width="18" height="14" rx="2"/>
    <path d="M3 9h18"/>
  </svg>`
};

const IconShield = {
  template: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
    <path d="M12 2l7 4v6c0 5-3 9-7 10-4-1-7-5-7-10V6l7-4z"/>
  </svg>`
};

const IconWhats = {
  template: `<svg viewBox="0 0 32 32" fill="currentColor">
    <path d="M19 17c-2-1-3-2-4-3s-2-2-3-3c-1-1-2-1-2 0-1 2-1 3 0 5 2 3 5 6 8 8 2 1 3 1 5 0 1-1 1-2 0-2-1-1-2-1-4-2z"/>
  </svg>`
};
</script>

<style scoped>

/* BASE */
.page {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI";
  background: #f5f5f7;
  color: #1d1d1f;
  padding-bottom: 70px;
}

/* HERO */
.hero {
  padding: 90px 20px 50px;
  text-align: center;
}

.tag {
  font-size: 11px;
  letter-spacing: 2px;
  color: #a88c5d;
}

.hero h1 {
  font-size: 42px;
  font-weight: 600;
  margin-top: 10px;
}

.hero p {
  margin-top: 12px;
  color: #6e6e73;
}

/* SHIPPING */
.shipping {
  max-width: 720px;
  margin: 0 auto 40px;
  background: #fff;
  border-radius: 26px;
  padding: 32px;
  box-shadow: 0 25px 60px rgba(0,0,0,0.06);
}

.shipping h2 {
  font-size: 13px;
  letter-spacing: 2px;
  color: #a88c5d;
  margin-bottom: 16px;
}

/* FORM */
.form {
  display: flex;
  gap: 12px;
}

.form input {
  flex: 1;
  padding: 15px;
  border-radius: 14px;
  border: 1px solid #d2d2d7;
}

.form input:focus {
  outline: none;
  border-color: #a88c5d;
}

.form button {
  padding: 15px 22px;
  border-radius: 14px;
  background: #1d1d1f;
  color: #fff;
  cursor: pointer;
}

.form button:hover {
  transform: translateY(-2px);
}

/* RESULTADO */
.result-box {
  margin-top: 18px;
  padding: 14px;
  border-radius: 12px;
  background: #f8f6f2;
  border: 1px solid #eee;
  font-weight: 500;
}

/* GRID */
.grid {
  max-width: 950px;
  margin: auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
}

/* CARD */
.card {
  background: #fff;
  border-radius: 26px;
  padding: 28px;
  border: 1px solid #eee;
  transition: 0.3s;
  position: relative;
}

.card::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 0%;
  background: #a88c5d;
  transition: 0.4s;
}

.card:hover::after {
  width: 100%;
}

.card:hover {
  transform: translateY(-6px);
}

.card svg {
  width: 22px;
  margin-bottom: 12px;
}

.card span {
  display: inline-block;
  margin-top: 10px;
  font-size: 12px;
  border-top: 1px solid #eee;
  padding-top: 8px;
}

/* WHATSAPP */
.whatsapp {
  position: fixed;
  bottom: 22px;
  right: 22px;
  width: 60px;
  height: 60px;
  background: #25d366;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* RESPONSIVO */
@media (max-width: 700px) {
  .grid {
    grid-template-columns: 1fr;
  }

  .form {
    flex-direction: column;
  }
}

</style>

<template>
  <div class="page">

    <!-- HERO -->
    <header class="hero">
      <div class="hero-inner">
        <span class="tag">ENVIO PREMIUM</span>
        <h1>Política de Entrega</h1>
        <p>Precisão, cuidado e excelência em cada detalhe da sua experiência</p>
      </div>
    </header>

    <!-- FRETE -->
    <section class="shipping">

      <h2>Calcular entrega</h2>

      <div class="form">
        <input v-model="cep" placeholder="Digite seu CEP" />
        <button @click="calcularFrete">Calcular</button>
      </div>

      <div v-if="resultado" class="result-box">
        <p>{{ resultado }}</p>
      </div>

    </section>

    <!-- CARDS -->
    <main class="grid">

      <article class="card">
        <IconTruck />
        <h3>Prazos de entrega</h3>
        <p>Envios rápidos com logística otimizada em todo Brasil.</p>
        <span>2 a 12 dias úteis</span>
      </article>

      <article class="card">
        <IconBox />
        <h3>Processamento</h3>
        <p>Seu pedido passa por inspeção e embalagem premium.</p>
        <span>Até 2 dias úteis</span>
      </article>

      <article class="card">
        <IconCard />
        <h3>Frete</h3>
        <p>Cálculo automático com base na sua localização.</p>
        <span>Grátis acima de R$ 299</span>
      </article>

      <article class="card">
        <IconShield />
        <h3>Segurança</h3>
        <p>Envios protegidos com embalagem reforçada e discreta.</p>
        <span>Garantia total</span>
      </article>

    </main>

    <!-- WHATSAPP -->
    <a class="whatsapp" href="https://wa.me/5531999999999">
      <IconWhats />
    </a>

  </div>
</template>

<script>
export default {
  name: "PoliticaEntrega",

  data() {
    return {
      cep: "",
      resultado: "",
    };
  },

  methods: {
    calcularFrete() {
      if (!this.cep || this.cep.length < 8) {
        this.resultado = "Digite um CEP válido.";
        return;
      }

      const n = parseInt(this.cep.replace("-", ""));

      if (n < 39999999) {
        this.resultado = "Entrega expressa • 2–5 dias úteis • R$ 14,90";
      } else if (n < 69999999) {
        this.resultado = "Entrega padrão • 3–8 dias úteis • R$ 19,90";
      } else {
        this.resultado = "Entrega estendida • até 12 dias úteis • R$ 29,90";
      }
    },
  },
};

/* ICONS */
const IconTruck = {
  template: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
    <path d="M3 7h12v8H3z"/>
    <path d="M15 9h4l2 3v3h-6z"/>
    <circle cx="7" cy="17" r="1.5"/>
    <circle cx="17" cy="17" r="1.5"/>
  </svg>`
};

const IconBox = {
  template: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
    <path d="M4 7l8-4 8 4-8 4-8-4z"/>
    <path d="M4 7v10l8 4 8-4V7"/>
  </svg>`
};

const IconCard = {
  template: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
    <rect x="3" y="5" width="18" height="14" rx="2"/>
    <path d="M3 9h18"/>
  </svg>`
};

const IconShield = {
  template: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
    <path d="M12 2l7 4v6c0 5-3 9-7 10-4-1-7-5-7-10V6l7-4z"/>
  </svg>`
};

const IconWhats = {
  template: `<svg viewBox="0 0 32 32" fill="currentColor">
    <path d="M19 17c-2-1-3-2-4-3s-2-2-3-3c-1-1-2-1-2 0-1 2-1 3 0 5 2 3 5 6 8 8 2 1 3 1 5 0 1-1 1-2 0-2-1-1-2-1-4-2z"/>
  </svg>`
};
</script>

<style scoped>

/* BASE */
.page {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI";
  background: #f5f5f7;
  color: #1d1d1f;
  padding-bottom: 70px;
}

/* HERO */
.hero {
  padding: 90px 20px 50px;
  text-align: center;
}

.tag {
  font-size: 11px;
  letter-spacing: 2px;
  color: #a88c5d;
}

.hero h1 {
  font-size: 42px;
  font-weight: 600;
  margin-top: 10px;
}

.hero p {
  margin-top: 12px;
  color: #6e6e73;
}

/* SHIPPING */
.shipping {
  max-width: 720px;
  margin: 0 auto 40px;
  background: #fff;
  border-radius: 26px;
  padding: 32px;
  box-shadow: 0 25px 60px rgba(0,0,0,0.06);
}

.shipping h2 {
  font-size: 13px;
  letter-spacing: 2px;
  color: #a88c5d;
  margin-bottom: 16px;
}

/* FORM */
.form {
  display: flex;
  gap: 12px;
}

.form input {
  flex: 1;
  padding: 15px;
  border-radius: 14px;
  border: 1px solid #d2d2d7;
}

.form input:focus {
  outline: none;
  border-color: #a88c5d;
}

.form button {
  padding: 15px 22px;
  border-radius: 14px;
  background: #1d1d1f;
  color: #fff;
  cursor: pointer;
}

.form button:hover {
  transform: translateY(-2px);
}

/* RESULTADO */
.result-box {
  margin-top: 18px;
  padding: 14px;
  border-radius: 12px;
  background: #f8f6f2;
  border: 1px solid #eee;
  font-weight: 500;
}

/* GRID */
.grid {
  max-width: 950px;
  margin: auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
}

/* CARD */
.card {
  background: #fff;
  border-radius: 26px;
  padding: 28px;
  border: 1px solid #eee;
  transition: 0.3s;
  position: relative;
}

.card::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 0%;
  background: #a88c5d;
  transition: 0.4s;
}

.card:hover::after {
  width: 100%;
}

.card:hover {
  transform: translateY(-6px);
}

.card svg {
  width: 22px;
  margin-bottom: 12px;
}

.card span {
  display: inline-block;
  margin-top: 10px;
  font-size: 12px;
  border-top: 1px solid #eee;
  padding-top: 8px;
}

/* WHATSAPP */
.whatsapp {
  position: fixed;
  bottom: 22px;
  right: 22px;
  width: 60px;
  height: 60px;
  background: #25d366;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* RESPONSIVO */
@media (max-width: 700px) {
  .grid {
    grid-template-columns: 1fr;
  }

  .form {
    flex-direction: column;
  }
}

</style>
