<template>
  <div class="orders-page">

    <!-- HEADER -->
    <section class="orders-header">
      <h1>Sobre os Pedidos</h1>
      <p>Tudo o que você precisa saber sobre suas compras</p>
    </section>

    <!-- CONTEÚDO -->
    <section class="orders-container">

      <div class="order-box">
        <h3>Como faço um pedido?</h3>
        <p>
          Escolha seus produtos, adicione ao carrinho e finalize a compra preenchendo seus dados pessoais e endereço.
        </p>
      </div>

      <div class="order-box">
        <h3>Como acompanhar meu pedido?</h3>
        <p>
          Após a confirmação da compra, você receberá um código de rastreio por e-mail para acompanhar a entrega.
        </p>
      </div>

      <div class="order-box">
        <h3>Posso cancelar um pedido?</h3>
        <p>
          Sim, desde que o pedido ainda não tenha sido enviado. Entre em contato com nosso suporte o quanto antes.
        </p>
      </div>

      <div class="order-box">
        <h3>Posso alterar meu endereço?</h3>
        <p>
          Alterações só podem ser feitas antes do envio do pedido. Após o envio, não é possível modificar.
        </p>
      </div>

      <div class="order-box">
        <h3>O que fazer se meu pedido atrasar?</h3>
        <p>
          Caso o prazo seja ultrapassado, entre em contato com nossa equipe para verificarmos o ocorrido.
        </p>
      </div>

    </section>

  </div>
</template>

<script>
export default {
  name: "Pedidos"
};
</script>

<style scoped>
.orders-page {
  font-family: Arial, sans-serif;
  background: #f8f8f8;
  min-height: 100vh;
}

/* HEADER */
.orders-header {
  text-align: center;
  padding: 60px 20px 30px;
}

.orders-header h1 {
  font-size: 32px;
  margin-bottom: 10px;
}

.orders-header p {
  color: #666;
}

/* CONTAINER */
.orders-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

/* BOX */
.order-box {
  background: #fff;
  padding: 20px;
  margin-bottom: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.order-box h3 {
  margin-bottom: 8px;
  font-size: 16px;
}

.order-box p {
  font-size: 14px;
  color: #555;
}

/* MOBILE */
@media (max-width: 600px) {
  .orders-header h1 {
    font-size: 24px;
  }
}
</style>