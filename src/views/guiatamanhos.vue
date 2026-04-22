<template>
  <div class="page">

    <!-- HERO -->
    <header class="hero">
      <span class="kicker">GUIA OFICIAL IVY</span>
      <h1>Guia de Tamanhos</h1>
      <p>Encontre o ajuste perfeito para suas joias com precisão e elegância</p>
    </header>

    <!-- CARDS -->
    <main class="grid">

      <!-- ANÉIS -->
      <section class="card">
        <div class="icon">
          <svg viewBox="0 0 24 24" class="svg-icon">
            <path d="M7 10a5 5 0 0 1 10 0c0 2.5-2 5-5 7-3-2-5-4.5-5-7Z"
              fill="none" stroke="currentColor" stroke-width="1.5"/>
            <circle cx="12" cy="10" r="2.5"
              fill="none" stroke="currentColor" stroke-width="1.5"/>
          </svg>
        </div>
        <h3>Anéis</h3>
        <p>Utilize um anel existente como referência ou meça o diâmetro interno com uma régua milimetrada.</p>
        <span>Dica: evite medir dedos frios</span>
      </section>

      <!-- PULSEIRAS -->
      <section class="card">
        <div class="icon">
          <svg viewBox="0 0 24 24" class="svg-icon">
            <path d="M6 12c0-3 2-6 6-6s6 3 6 6-2 6-6 6-6-3-6-6Z"
              fill="none" stroke="currentColor" stroke-width="1.5"/>
            <path d="M8 12h8"
              stroke="currentColor" stroke-width="1.5"/>
          </svg>
        </div>
        <h3>Pulseiras</h3>
        <p>Meça o pulso e adicione 1 cm para ajuste confortável e elegante.</p>
        <span>Ajuste ideal e delicado</span>
      </section>

      <!-- COLARES -->
      <section class="card">
        <div class="icon">
          <svg viewBox="0 0 24 24" class="svg-icon">
            <path d="M6 6c2 3 4 4 6 4s4-1 6-4"
              fill="none" stroke="currentColor" stroke-width="1.5"/>
            <path d="M12 10v8"
              stroke="currentColor" stroke-width="1.5"/>
          </svg>
        </div>
        <h3>Colares</h3>
        <p>40cm: curto • 45cm: clássico • 50cm+: estilo alongado sofisticado.</p>
        <span>Escolha pelo estilo desejado</span>
      </section>

      <!-- BRINCOS -->
      <section class="card">
        <div class="icon">
          <svg viewBox="0 0 24 24" class="svg-icon">
            <circle cx="9" cy="12" r="2"
              fill="none" stroke="currentColor" stroke-width="1.5"/>
            <circle cx="15" cy="12" r="2"
              fill="none" stroke="currentColor" stroke-width="1.5"/>
            <path d="M9 14v4M15 14v4"
              stroke="currentColor" stroke-width="1.5"/>
          </svg>
        </div>
        <h3>Brincos</h3>
        <p>Considere peso, proporção e conforto no uso diário da peça.</p>
        <span>Conforto em primeiro lugar</span>
      </section>

    </main>

    <!-- TABELA -->
    <section class="table">

      <h2>Referência de tamanhos — Anéis</h2>

      <div class="table-card">
        <table>
          <thead>
            <tr>
              <th>Diâmetro (mm)</th>
              <th>Tamanho BR</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>15.7</td><td>12</td></tr>
            <tr><td>16.5</td><td>15</td></tr>
            <tr><td>17.3</td><td>18</td></tr>
            <tr><td>18.1</td><td>20</td></tr>
          </tbody>
        </table>
      </div>

    </section>

  </div>
</template>

<script>
export default {
  name: "GuiaTamanhos"
};
</script>

<style scoped>
.page {
  font-family: Georgia, serif;
  background: linear-gradient(180deg, #ffffff 0%, #faf7f2 100%);
  min-height: 100vh;
  padding: 80px 20px;
  color: #2b2b2b;
}

/* HERO */
.hero {
  text-align: center;
  max-width: 720px;
  margin: auto;
  margin-bottom: 60px;
}

.kicker {
  font-size: 11px;
  letter-spacing: 2px;
  color: #b08d57;
}

.hero h1 {
  font-size: 38px;
  font-weight: 400;
  margin: 10px 0;
}

.hero p {
  font-size: 15px;
  color: #6b6b6b;
}

/* GRID */
.grid {
  max-width: 950px;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
}

/* CARD */
.card {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 18px;
  padding: 26px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.04);
  position: relative;
  overflow: hidden;
  transition: 0.3s;
}

.card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 3px;
  width: 100%;
  background: linear-gradient(90deg, #b08d57, #e6d3b3);
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 25px 60px rgba(0,0,0,0.08);
}

/* ICON */
.icon {
  color: #b08d57;
  margin-bottom: 12px;
}

.svg-icon {
  width: 26px;
  height: 26px;
}

/* TEXT */
h3 {
  font-size: 17px;
  margin-bottom: 8px;
  font-weight: 500;
}

p {
  font-size: 13px;
  color: #555;
  line-height: 1.6;
}

span {
  display: block;
  margin-top: 10px;
  font-size: 12px;
  color: #b08d57;
}

/* TABLE */
.table {
  max-width: 700px;
  margin: 70px auto 0;
}

h2 {
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 18px;
}

.table-card {
  background: #fff;
  border-radius: 16px;
  border: 1px solid #eee;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.03);
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  text-align: left;
  font-size: 12px;
  color: #a08a6b;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

td {
  padding: 12px 0;
  font-size: 13px;
  border-bottom: 1px solid #f2f2f2;
  color: #444;
}

/* RESPONSIVO */
@media (max-width: 700px) {
  .grid {
    grid-template-columns: 1fr;
  }

  .hero h1 {
    font-size: 30px;
  }
}
</style>