<template>
  <div class="auth-scene">

    <!-- VISUAL -->
    <section class="auth-visual">
      <div class="visual-overlay"></div>

      <div class="visual-content">

        <div class="brand-badge">
          EST. 2024
        </div>

        <span class="visual-tag">
          Coleção Heritage
        </span>

        <h1 class="visual-title">
          Onde a arte<br />
          encontra o <em>eterno</em>
        </h1>

        <p class="visual-sub">
          Sua jornada na alta joalheria começa com um olhar exclusivo.
        </p>

        <div class="feature-list">

          <div class="feature-item">
            <span class="dot"></span>
            <p>Curadoria de Diamantes Certificados</p>
          </div>

          <div class="feature-item">
            <span class="dot"></span>
            <p>Atendimento VIP Personalizado</p>
          </div>

        </div>

      </div>

      <div class="floating-shape"></div>
    </section>

    <!-- FORM -->
    <section class="auth-panel">

      <div class="auth-inner">

        <!-- HEADER -->
        <header class="auth-header">

          <router-link
            to="/"
            class="auth-logo"
          >
            IVY
          </router-link>

          <p class="auth-welcome">
            Bem-vindo à nossa Maison.
          </p>

        </header>

        <!-- TABS -->
        <div class="auth-tabs">

          <button
            type="button"
            :class="{ active: !isRegistering }"
            @click="switchMode(false)"
          >
            Entrar
          </button>

          <button
            type="button"
            :class="{ active: isRegistering }"
            @click="switchMode(true)"
          >
            Cadastrar
          </button>

          <div
            class="tab-indicator"
            :style="{
              transform: isRegistering
                ? 'translateX(100%)'
                : 'translateX(0)'
            }"
          ></div>

        </div>

        <!-- FORM -->
        <Transition
          name="page-slide"
          mode="out-in"
        >

          <form
            :key="isRegistering ? 'register' : 'login'"
            class="auth-form"
            @submit.prevent="handleAuth"
          >

            <!-- NAME -->
            <div
              v-if="isRegistering"
              class="field-group"
            >

              <label>
                Nome Completo
              </label>

              <div class="field-wrap">

                <input
                  v-model="form.name"
                  type="text"
                  placeholder="Como deseja ser chamado?"
                />

              </div>

            </div>

            <!-- EMAIL -->
            <div class="field-group">

              <label>
                E-mail
              </label>

              <div class="field-wrap">

                <input
                  v-model="form.email"
                  type="email"
                  placeholder="exemplo@ivy.com"
                  required
                />

              </div>

            </div>

            <!-- PASSWORD -->
            <div class="field-group">

              <div class="label-row">

                <label>
                  Senha
                </label>

                <a
                  v-if="!isRegistering"
                  href="#"
                  class="forgot-link"
                >
                  Esqueceu?
                </a>

              </div>

              <div class="field-wrap">

                <input
                  v-model="form.password"
                  :type="showPw ? 'text' : 'password'"
                  placeholder="Sua senha"
                  required
                />

                <button
                  type="button"
                  class="toggle-pw"
                  @click="showPw = !showPw"
                >
                  {{ showPw ? 'OCULTAR' : 'MOSTRAR' }}
                </button>

              </div>

            </div>

            <!-- ERROR -->
            <div
              v-if="error"
              class="message error"
            >
              {{ error }}
            </div>

            <!-- SUCCESS -->
            <div
              v-if="successMsg"
              class="message success"
            >
              {{ successMsg }}
            </div>

            <!-- BUTTON -->
            <button
              type="submit"
              class="btn-primary"
              :disabled="loading"
            >

              <span v-if="!loading">

                {{
                  isRegistering
                    ? 'Criar Conta'
                    : 'Entrar'
                }}

              </span>

              <div
                v-else
                class="loader"
              ></div>

            </button>

            <!-- DIVIDER -->
            <div class="divider-row">
              <span>Ou continue com</span>
            </div>

            <!-- SOCIAL -->
            <div class="social-row">

              <button
                type="button"
                class="btn-social"
                @click="loginGoogle"
              >
                Google
              </button>

              <button
                type="button"
                class="btn-social"
                @click="loginApple"
              >
                Apple
              </button>

            </div>

          </form>

        </Transition>

        <!-- FOOTER -->
        <footer class="auth-footer">

          <p>
            Ao continuar você aceita nossos
            <a href="#">Termos</a>
            e
            <a href="#">Privacidade</a>.
          </p>

        </footer>

      </div>

    </section>

  </div>
</template>

<script setup>
import { ref, reactive } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

const isRegistering = ref(false)

const showPw = ref(false)

const loading = ref(false)

const error = ref("")

const successMsg = ref("")

const form = reactive({
  name: "",
  email: "",
  password: ""
})

const switchMode = (mode) => {

  isRegistering.value = mode

  error.value = ""
  successMsg.value = ""

  form.name = ""
  form.email = ""
  form.password = ""
}

const handleAuth = async () => {

  try {

    loading.value = true

    error.value = ""
    successMsg.value = ""

    // VALIDATION
    if (!form.email || !form.password) {

      error.value = "Preencha todos os campos"

      return
    }

    if (
      isRegistering.value &&
      !form.name
    ) {

      error.value = "Digite seu nome"

      return
    }

    /*
      EXEMPLO API
      SUBSTITUA PELA SUA
    */

    const response = {
      data: {
        token: "123456",
        user: {
          name: form.name || "Cliente",
          email: form.email
        }
      }
    }

    /*
      PROTEÇÃO
    */

    const user = response?.data?.user

    if (!user?.email) {

      error.value = "Erro ao autenticar"

      return
    }

    /*
      SAVE
    */

    localStorage.setItem(
      "token",
      response?.data?.token || ""
    )

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    )

    successMsg.value = isRegistering.value
      ? "Conta criada com sucesso"
      : "Login realizado com sucesso"

    setTimeout(() => {

      router.push("/")

    }, 1200)

  } catch (err) {

    console.error(err)

    error.value = "Erro interno"

  } finally {

    loading.value = false
  }
}

const loginGoogle = () => {

  console.log("Google login")
}

const loginApple = () => {

  console.log("Apple login")
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Montserrat:wght@300;400;500;600&display=swap');

:root {
  --gold: #c5a059;
  --dark: #121212;
  --soft: #faf8f5;
}

.auth-scene {
  min-height: 100vh;
  display: flex;
  background: white;
  font-family: 'Montserrat', sans-serif;
}

/* VISUAL */

.auth-visual {
  flex: 1.15;

  position: relative;

  background:
    url('https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=2070&auto=format&fit=crop');

  background-size: cover;
  background-position: center;

  display: flex;
  align-items: center;

  overflow: hidden;

  padding: 90px;
}

.visual-overlay {
  position: absolute;
  inset: 0;

  background:
    linear-gradient(
      90deg,
      rgba(10,10,12,.92),
      rgba(10,10,12,.55),
      rgba(10,10,12,.18)
    );
}

.visual-content {
  position: relative;
  z-index: 2;

  max-width: 520px;
}

.brand-badge {
  display: inline-flex;

  padding: 6px 14px;

  border: 1px solid rgba(255,255,255,.16);

  color: var(--gold);

  font-size: 10px;
  letter-spacing: 3px;

  margin-bottom: 34px;
}

.visual-tag {
  display: block;

  color: rgba(255,255,255,.58);

  font-size: 11px;
  letter-spacing: 4px;
  text-transform: uppercase;

  margin-bottom: 16px;
}

.visual-title {
  font-family: 'Cormorant Garamond', serif;

  color: white;

  font-size: clamp(48px,5vw,78px);

  line-height: .95;
  font-weight: 400;

  margin-bottom: 24px;
}

.visual-title em {
  color: var(--gold);
  font-style: italic;
}

.visual-sub {
  color: rgba(255,255,255,.7);

  line-height: 1.8;

  max-width: 460px;

  margin-bottom: 42px;
}

.feature-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 12px;

  color: rgba(255,255,255,.88);

  font-size: 13px;
}

.dot {
  width: 7px;
  height: 7px;

  border-radius: 50%;

  background: var(--gold);
}

/* PANEL */

.auth-panel {
  flex: 1;

  background: var(--soft);

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 40px;
}

.auth-inner {
  width: 100%;
  max-width: 420px;
}

.auth-header {
  text-align: center;

  margin-bottom: 50px;
}

.auth-logo {
  text-decoration: none;

  font-family: 'Cormorant Garamond', serif;

  font-size: 48px;
  letter-spacing: 12px;

  color: var(--dark);
}

.auth-welcome {
  margin-top: 12px;

  color: #8d8d8d;

  font-size: 12px;
}

/* TABS */

.auth-tabs {
  position: relative;

  display: flex;

  background: #ede8df;

  border-radius: 999px;

  padding: 5px;

  margin-bottom: 40px;
}

.auth-tabs button {
  flex: 1;

  height: 48px;

  border: none;
  background: transparent;

  border-radius: 999px;

  cursor: pointer;

  font-size: 12px;
  font-weight: 700;

  color: #8d8d8d;

  position: relative;
  z-index: 2;

  transition: .3s;
}

.auth-tabs button.active {
  color: var(--dark);
}

.tab-indicator {
  position: absolute;

  left: 5px;
  top: 5px;

  width: calc(50% - 5px);
  height: calc(100% - 10px);

  background: white;

  border-radius: 999px;

  transition: .45s cubic-bezier(.19,1,.22,1);
}

/* FORM */

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.field-group label {
  display: block;

  margin-bottom: 8px;

  font-size: 11px;
  font-weight: 700;

  letter-spacing: 1px;
  text-transform: uppercase;

  color: #555;
}

.label-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.field-wrap {
  display: flex;
  align-items: center;

  border-bottom: 1px solid #d8d8d8;

  transition: .3s;
}

.field-wrap:focus-within {
  border-color: var(--dark);
}

.field-wrap input {
  flex: 1;

  border: none;
  outline: none;

  background: transparent;

  height: 52px;

  font-size: 14px;

  font-family: inherit;
}

.toggle-pw {
  border: none;
  background: none;

  cursor: pointer;

  font-size: 10px;
  font-weight: 700;

  color: #999;
}

.forgot-link {
  font-size: 11px;

  color: #999;

  text-decoration: none;
}

/* BUTTON */

.btn-primary {
  height: 58px;

  border: none;
  border-radius: 8px;

  background: var(--dark);
  color: white;

  cursor: pointer;

  font-size: 11px;
  font-weight: 700;

  letter-spacing: 2px;
  text-transform: uppercase;

  transition: .3s;

  margin-top: 8px;
}

.btn-primary:hover {
  transform: translateY(-2px);

  background: #232323;
}

.btn-primary:disabled {
  opacity: .7;
  cursor: not-allowed;
}

/* DIVIDER */

.divider-row {
  position: relative;

  text-align: center;

  margin: 8px 0;
}

.divider-row::before {
  content: "";

  position: absolute;
  left: 0;
  top: 50%;

  width: 100%;
  height: 1px;

  background: #ddd;
}

.divider-row span {
  position: relative;
  z-index: 2;

  background: var(--soft);

  padding: 0 16px;

  font-size: 10px;
  color: #aaa;
}

/* SOCIAL */

.social-row {
  display: flex;
  gap: 14px;
}

.btn-social {
  flex: 1;

  height: 50px;

  border-radius: 8px;
  border: 1px solid #ddd;

  background: white;

  cursor: pointer;

  font-size: 12px;
  font-weight: 600;

  transition: .3s;
}

.btn-social:hover {
  border-color: var(--dark);
}

/* MESSAGE */

.message {
  padding: 14px;

  border-radius: 8px;

  font-size: 12px;
}

.error {
  background: #fdeaea;
  color: #a94442;
}

.success {
  background: #e7f7ea;
  color: #256d3f;
}

/* FOOTER */

.auth-footer {
  margin-top: 40px;

  text-align: center;

  font-size: 11px;
  color: #999;

  line-height: 1.8;
}

.auth-footer a {
  color: var(--dark);
}

/* LOADER */

.loader {
  width: 18px;
  height: 18px;

  border: 2px solid rgba(255,255,255,.3);
  border-top-color: white;

  border-radius: 50%;

  margin: auto;

  animation: spin .7s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* TRANSITION */

.page-slide-enter-active,
.page-slide-leave-active {
  transition: .35s ease;
}

.page-slide-enter-from {
  opacity: 0;
  transform: translateY(18px);
}

.page-slide-leave-to {
  opacity: 0;
  transform: translateY(-18px);
}

/* MOBILE */

@media (max-width: 1024px) {

  .auth-visual {
    display: none;
  }

  .auth-panel {
    flex: 1;
  }
}

@media (max-width: 600px) {

  .auth-panel {
    padding: 24px;
  }

  .auth-logo {
    font-size: 40px;
  }

  .social-row {
    flex-direction: column;
  }
}
</style>