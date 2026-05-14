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
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Montserrat:wght@300;400;500;600&display=swap');

:root{
  --gold: #d4af6a;
  --gold-soft: #b89252;

  --navy: #08111f;
  --navy-2: #0f1b2e;

  --white: #ffffff;
  --soft: rgba(255,255,255,.72);

  --border: rgba(255,255,255,.08);

  --shadow:
    0 10px 40px rgba(0,0,0,.35);

  --radius: 28px;
}

*{
  margin:0;
  padding:0;
  box-sizing:border-box;
}

.auth-scene{
  min-height:100vh;

  display:flex;

  background:
    radial-gradient(circle at top left,
      rgba(212,175,106,.10),
      transparent 30%),

    radial-gradient(circle at bottom right,
      rgba(212,175,106,.08),
      transparent 35%),

    linear-gradient(
      135deg,
      #050a13,
      #08111f 35%,
      #0d1a2d 100%
    );

  overflow:hidden;

  font-family:'Montserrat',sans-serif;

  position:relative;
}

/* BACKGROUND GLOW */

.auth-scene::before{
  content:"";

  position:absolute;

  width:500px;
  height:500px;

  background:rgba(212,175,106,.08);

  filter:blur(120px);

  border-radius:50%;

  top:-120px;
  left:-120px;
}

.auth-scene::after{
  content:"";

  position:absolute;

  width:420px;
  height:420px;

  background:rgba(255,255,255,.03);

  filter:blur(100px);

  border-radius:50%;

  right:-100px;
  bottom:-100px;
}

/* VISUAL */

.auth-visual{
  flex:1.15;

  position:relative;

  display:flex;
  align-items:center;

  padding:90px;

  overflow:hidden;
}

.auth-visual::before{
  content:"";

  position:absolute;
  inset:0;

  background:
    linear-gradient(
      90deg,
      rgba(4,8,15,.92),
      rgba(4,8,15,.70),
      rgba(4,8,15,.35)
    ),

    url('https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=2070&auto=format&fit=crop');

  background-size:cover;
  background-position:center;

  transform:scale(1.05);
}

.visual-content{
  position:relative;
  z-index:2;

  max-width:560px;
}

.brand-badge{
  display:inline-flex;

  padding:8px 18px;

  border:1px solid rgba(255,255,255,.08);

  background:rgba(255,255,255,.03);

  backdrop-filter:blur(12px);

  border-radius:999px;

  color:var(--gold);

  font-size:11px;
  letter-spacing:4px;

  margin-bottom:36px;
}

.visual-tag{
  display:block;

  color:rgba(255,255,255,.50);

  letter-spacing:5px;

  text-transform:uppercase;

  font-size:11px;

  margin-bottom:18px;
}

.visual-title{
  font-family:'Cormorant Garamond',serif;

  color:white;

  font-size:clamp(58px,6vw,88px);

  line-height:.92;

  font-weight:500;

  margin-bottom:26px;
}

.visual-title em{
  color:var(--gold);
  font-style:italic;
}

.visual-sub{
  color:rgba(255,255,255,.72);

  font-size:15px;

  line-height:1.9;

  max-width:470px;

  margin-bottom:42px;
}

.feature-list{
  display:flex;
  flex-direction:column;
  gap:18px;
}

.feature-item{
  display:flex;
  align-items:center;
  gap:14px;

  color:rgba(255,255,255,.88);

  font-size:13px;
}

.dot{
  width:8px;
  height:8px;

  border-radius:50%;

  background:var(--gold);

  box-shadow:
    0 0 12px rgba(212,175,106,.9);
}

/* PANEL */

.auth-panel{
  flex:1;

  display:flex;
  align-items:center;
  justify-content:center;

  padding:40px;

  position:relative;
  z-index:2;
}

.auth-inner{
  width:100%;
  max-width:470px;

  padding:48px;

  border-radius:var(--radius);

  background:
    rgba(255,255,255,.04);

  backdrop-filter:blur(22px);

  border:1px solid rgba(255,255,255,.08);

  box-shadow:var(--shadow);
}

/* HEADER */

.auth-header{
  text-align:center;

  margin-bottom:42px;
}

.auth-logo{
  text-decoration:none;

  font-family:'Cormorant Garamond',serif;

  font-size:58px;

  letter-spacing:14px;

  color:white;
}

.auth-welcome{
  margin-top:10px;

  color:rgba(255,255,255,.48);

  font-size:13px;
}

/* TABS */

.auth-tabs{
  position:relative;

  display:flex;

  background:rgba(255,255,255,.05);

  border:1px solid rgba(255,255,255,.05);

  border-radius:999px;

  padding:6px;

  margin-bottom:34px;
}

.auth-tabs button{
  flex:1;

  height:50px;

  border:none;
  background:transparent;

  cursor:pointer;

  border-radius:999px;

  color:rgba(255,255,255,.50);

  font-size:12px;
  font-weight:700;

  letter-spacing:1px;

  position:relative;
  z-index:2;

  transition:.35s;
}

.auth-tabs button.active{
  color:white;
}

.tab-indicator{
  position:absolute;

  top:6px;
  left:6px;

  width:calc(50% - 6px);
  height:calc(100% - 12px);

  border-radius:999px;

  background:
    linear-gradient(
      135deg,
      rgba(212,175,106,.22),
      rgba(212,175,106,.10)
    );

  border:1px solid rgba(212,175,106,.20);

  transition:.45s cubic-bezier(.19,1,.22,1);
}

/* FORM */

.auth-form{
  display:flex;
  flex-direction:column;
  gap:22px;
}

.field-group label{
  display:block;

  margin-bottom:10px;

  color:rgba(255,255,255,.65);

  font-size:11px;

  letter-spacing:2px;

  text-transform:uppercase;
}

.label-row{
  display:flex;
  align-items:center;
  justify-content:space-between;
}

.field-wrap{
  height:58px;

  display:flex;
  align-items:center;

  padding:0 18px;

  border-radius:16px;

  background:
    rgba(255,255,255,.04);

  border:1px solid rgba(255,255,255,.06);

  transition:.35s;
}

.field-wrap:hover{
  border-color:rgba(212,175,106,.18);
}

.field-wrap:focus-within{
  border-color:rgba(212,175,106,.45);

  box-shadow:
    0 0 0 4px rgba(212,175,106,.08);
}

.field-wrap input{
  flex:1;

  border:none;
  outline:none;

  background:transparent;

  color:white;

  font-size:14px;

  font-family:inherit;
}

.field-wrap input::placeholder{
  color:rgba(255,255,255,.28);
}

.toggle-pw{
  border:none;
  background:none;

  cursor:pointer;

  color:var(--gold);

  font-size:10px;
  font-weight:700;

  letter-spacing:1px;
}

.forgot-link{
  text-decoration:none;

  color:rgba(255,255,255,.45);

  font-size:11px;
}

/* BUTTON */

.btn-primary{
  height:60px;

  border:none;

  border-radius:18px;

  cursor:pointer;

  margin-top:6px;

  background:
    linear-gradient(
      135deg,
      var(--gold),
      var(--gold-soft)
    );

  color:#111;

  font-size:12px;
  font-weight:800;

  letter-spacing:3px;

  text-transform:uppercase;

  transition:.35s;
}

.btn-primary:hover{
  transform:
    translateY(-3px);

  box-shadow:
    0 18px 40px rgba(212,175,106,.18);
}

/* DIVIDER */

.divider-row{
  position:relative;

  text-align:center;

  margin:8px 0;
}

.divider-row::before{
  content:"";

  position:absolute;

  left:0;
  top:50%;

  width:100%;
  height:1px;

  background:rgba(255,255,255,.08);
}

.divider-row span{
  position:relative;
  z-index:2;

  padding:0 16px;

  background:transparent;

  color:rgba(255,255,255,.35);

  font-size:11px;
}

/* SOCIAL */

.social-row{
  display:flex;
  gap:14px;
}

.btn-social{
  flex:1;

  height:54px;

  border-radius:16px;

  border:1px solid rgba(255,255,255,.08);

  background:
    rgba(255,255,255,.04);

  color:white;

  cursor:pointer;

  font-size:13px;
  font-weight:600;

  transition:.35s;
}

.btn-social:hover{
  border-color:rgba(212,175,106,.25);

  transform:translateY(-2px);
}

/* MESSAGE */

.message{
  padding:16px;

  border-radius:16px;

  font-size:13px;
}

.error{
  background:rgba(255,0,0,.08);

  border:1px solid rgba(255,0,0,.12);

  color:#ffb8b8;
}

.success{
  background:rgba(0,255,120,.08);

  border:1px solid rgba(0,255,120,.12);

  color:#a8ffd0;
}

/* FOOTER */

.auth-footer{
  margin-top:38px;

  text-align:center;

  color:rgba(255,255,255,.35);

  font-size:11px;

  line-height:1.8;
}

.auth-footer a{
  color:var(--gold);

  text-decoration:none;
}

/* LOADER */

.loader{
  width:18px;
  height:18px;

  border-radius:50%;

  border:2px solid rgba(0,0,0,.2);
  border-top-color:#111;

  margin:auto;

  animation:spin .7s linear infinite;
}

@keyframes spin{
  to{
    transform:rotate(360deg);
  }
}

/* TRANSITION */

.page-slide-enter-active,
.page-slide-leave-active{
  transition:.35s ease;
}

.page-slide-enter-from{
  opacity:0;
  transform:translateY(15px);
}

.page-slide-leave-to{
  opacity:0;
  transform:translateY(-15px);
}

/* MOBILE */

@media(max-width:1100px){

  .auth-visual{
    display:none;
  }

  .auth-panel{
    flex:1;
  }
}

@media(max-width:600px){

  .auth-panel{
    padding:20px;
  }

  .auth-inner{
    padding:32px 24px;
  }

  .auth-logo{
    font-size:44px;
    letter-spacing:10px;
  }

  .social-row{
    flex-direction:column;
  }

  .visual-title{
    font-size:58px;
  }
}
</style>