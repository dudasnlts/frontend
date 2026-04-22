<template>
  <div class="faq-page">

    <!-- HEADER -->
    <section class="faq-header">
      <h1>Dúvidas Frequentes</h1>
      <p>Encontre respostas rápidas para suas perguntas</p>
    </section>

    <!-- CONTEÚDO -->
    <section class="faq-container">

      <div class="faq-box">
        <h3>Quais são as formas de pagamento?</h3>
        <p>
          Aceitamos cartão de crédito, Pix e boleto bancário.
        </p>
      </div>

      <div class="faq-box">
        <h3>Qual o prazo de entrega?</h3>
        <p>
          O prazo varia de acordo com sua região e é informado no momento da compra.
        </p>
      </div>

      <div class="faq-box">
        <h3>Os produtos têm garantia?</h3>
        <p>
          Sim, todos os nossos produtos possuem garantia contra defeitos de fabricação.
        </p>
      </div>

      <div class="faq-box">
        <h3>Posso trocar ou devolver um produto?</h3>
        <p>
          Sim, você tem até 7 dias após o recebimento para solicitar troca ou devolução.
        </p>
      </div>

      <div class="faq-box">
        <h3>Como entro em contato com o suporte?</h3>
        <p>
          Você pode entrar em contato conosco através do e-mail ou WhatsApp disponíveis na página de contato.
        </p>
      </div>

    </section>

  </div>
</template>

<script>
export default {
  name: "Duvidas"
};
</script>

<style scoped>
.faq-page {
  font-family: Arial, sans-serif;
  background: #f8f8f8;
  min-height: 100vh;
}

/* HEADER */
.faq-header {
  text-align: center;
  padding: 60px 20px 30px;
}

.faq-header h1 {
  font-size: 32px;
  margin-bottom: 10px;
}

.faq-header p {
  color: #666;
}

/* CONTAINER */
.faq-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

/* BOX */
.faq-box {
  background: #fff;
  padding: 20px;
  margin-bottom: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.faq-box h3 {
  margin-bottom: 8px;
  font-size: 16px;
}

.faq-box p {
  font-size: 14px;
  color: #555;
}

/* MOBILE */
@media (max-width: 600px) {
  .faq-header h1 {
    font-size: 24px;
  }
}
</style>