<template>
  <section class="politica">

    <!-- HERO -->
    <div class="hero">
      <div class="hero-content">
        <span class="subtitle">Transparência</span>
        <h1>Política de Privacidade</h1>
        <div class="divider"></div>
        <p>Seu cuidado e segurança são prioridade na IVY</p>
      </div>
    </div>

    <!-- CONTEÚDO -->
    <div class="container">

      <div class="card-politica">

        <p class="data">Última atualização: Abril de 2026</p>

        <p class="intro">
          A IVY valoriza a sua privacidade e está comprometida com a proteção dos seus dados pessoais.
          Esta Política descreve como coletamos, utilizamos e protegemos suas informações,
          em conformidade com a Lei Geral de Proteção de Dados (LGPD).
        </p>

        <h2>1. Coleta de dados pessoais</h2>
        <p>
          Coletamos informações fornecidas por você, como nome, e-mail, telefone e endereço,
          além de dados coletados automaticamente, como IP, localização aproximada e comportamento de navegação.
        </p>

        <h2>2. Finalidade do uso dos dados</h2>
        <p>
          Seus dados são utilizados para:
        </p>
        <ul>
          <li>Processamento de pedidos e entregas</li>
          <li>Comunicação com o cliente</li>
          <li>Melhoria da experiência no site</li>
          <li>Envio de ofertas e novidades (quando autorizado)</li>
        </ul>

        <h2>3. Compartilhamento de dados</h2>
        <p>
          Seus dados podem ser compartilhados com parceiros responsáveis por pagamento,
          logística e tecnologia, sempre respeitando a segurança e confidencialidade.
        </p>

        <h2>4. Uso de cookies</h2>
        <p>
          Utilizamos cookies para melhorar sua experiência, personalizar conteúdo e analisar o tráfego.
          Você pode gerenciar ou desativar cookies diretamente no seu navegador.
        </p>

        <h2>5. Segurança das informações</h2>
        <p>
          Adotamos medidas técnicas e organizacionais para proteger seus dados contra acessos não autorizados,
          perda ou alteração.
        </p>

        <h2>6. Retenção de dados</h2>
        <p>
          Seus dados são armazenados apenas pelo tempo necessário para cumprir as finalidades descritas,
          respeitando obrigações legais e regulatórias.
        </p>

        <h2>7. Direitos do titular</h2>
        <p>
          De acordo com a LGPD, você pode:
        </p>
        <ul>
          <li>Solicitar acesso aos seus dados</li>
          <li>Corrigir dados incompletos ou desatualizados</li>
          <li>Solicitar exclusão dos dados</li>
          <li>Revogar consentimentos</li>
        </ul>

        <h2>8. Alterações nesta política</h2>
        <p>
          Esta política pode ser atualizada periodicamente. Recomendamos a revisão regular desta página.
        </p>

        <h2>9. Contato</h2>
        <p>
          Para dúvidas ou solicitações relacionadas à privacidade:
        </p>
        <p class="contato">
          📧 contato@ivy.com <br>
          📞 (11) 4000-0000
        </p>

      </div>

    </div>

  </section>
</template>

<script>
export default {
  name: "PoliticaPrivacidade"
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:wght@400;600&family=Montserrat:wght@300;400&display=swap');

.politica {
  font-family: 'Montserrat', sans-serif;
  color: #222;
  background: #fff;
}

/* HERO */
.hero {
  height: 45vh;
  background: linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)),
              url("https://images.unsplash.com/photo-1450101499163-c8848c66ca85") center/cover no-repeat;
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
  max-width: 900px;
  margin: 60px auto;
  padding: 0 20px;
}

/* CARD */
.card-politica {
  background: #fff;
  padding: 50px;
  border-radius: 8px;
  border: 1px solid #eee;
  box-shadow: 0 10px 30px rgba(0,0,0,0.03);
}

/* INTRO */
.intro {
  font-size: 15px;
  color: #555;
  margin-bottom: 25px;
}

/* DATA */
.data {
  font-size: 13px;
  color: #888;
  margin-bottom: 20px;
}

/* TITULOS */
.card-politica h2 {
  font-family: 'Bodoni Moda', serif;
  margin-top: 25px;
  margin-bottom: 10px;
  font-size: 22px;
}

/* TEXTOS */
.card-politica p {
  line-height: 1.8;
  color: #555;
  margin-bottom: 12px;
}

/* LISTAS */
.card-politica ul {
  padding-left: 20px;
  margin-bottom: 15px;
}

.card-politica li {
  margin-bottom: 6px;
}

/* CONTATO */
.contato {
  margin-top: 10px;
  font-weight: 500;
}

/* RESPONSIVO */
@media (max-width: 768px) {
  .card-politica {
    padding: 30px 20px;
  }

  .hero h1 {
    font-size: 30px;
  }
}
</style>