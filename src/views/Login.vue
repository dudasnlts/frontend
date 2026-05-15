<template>
  <section class="auth-wrapper">

    <!-- LEFT -->
    <div class="auth-visual">

      <!-- VIDEO -->
      <video
        class="bg-video"
        autoplay
        muted
        loop
        playsinline
      >
        <source
          src="http://localhost:3000/uploads/luxo.mp4"
          type="video/mp4"
        />
      </video>

      <!-- OVERLAY -->
      <div class="overlay"></div>

      <!-- CONTENT -->
      <div class="visual-content">

        
        <h1>
          Elegância<br />
          Atemporal
        </h1>

       

      </div>

    </div>

    <!-- RIGHT -->
    <div class="auth-panel">

      <div class="auth-box">

        <!-- HEADER -->
        <div class="auth-header">

          <h2>
            {{
              isRegistering
                ? "Criar Conta"
                : "Bem-vinda"
            }}
          </h2>

          <p>
            {{
              isRegistering
                ? "Cadastre-se para acessar o universo IVY."
                : "Entre para continuar sua experiência."
            }}
          </p>

        </div>

        <!-- TABS -->
        <div class="tabs">

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
            Cadastro
          </button>

        </div>

        <!-- FORM -->
        <form
          class="auth-form"
          @submit.prevent="handleAuth"
        >

          <!-- NAME -->
          <div
            v-if="isRegistering"
            class="input-group"
          >

            <label>Nome</label>

            <input
              v-model="form.name"
              type="text"
              placeholder="Seu nome"
            />

          </div>

          <!-- EMAIL -->
          <div class="input-group">

            <label>E-mail</label>

            <input
              v-model="form.email"
              type="email"
              placeholder="exemplo@email.com"
              required
            />

          </div>

          <!-- PASSWORD -->
          <div class="input-group">

            <div class="label-row">

              <label>Senha</label>

              <a
                v-if="!isRegistering"
                href="#"
              >
                Esqueceu?
              </a>

            </div>

            <div class="password-wrap">

              <input
                v-model="form.password"
                :type="showPw ? 'text' : 'password'"
                placeholder="Sua senha"
                required
              />

              <button
                type="button"
                class="show-password"
                @click="showPw = !showPw"
              >
                {{ showPw ? "Ocultar" : "Mostrar" }}
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
            class="submit-btn"
            type="submit"
            :disabled="loading"
          >

            <span v-if="!loading">

              {{
                isRegistering
                  ? "Criar Conta"
                  : "Entrar"
              }}

            </span>

            <div
              v-else
              class="loader"
            ></div>

          </button>

          <!-- DIVIDER -->
          <div class="divider">
            <span>ou continue com</span>
          </div>

          <!-- SOCIAL -->
          <div class="socials">

            <button
              type="button"
              class="social-btn"
            >
              Google
            </button>

            <button
              type="button"
              class="social-btn"
            >
              Apple
            </button>

          </div>

        </form>

      </div>

    </div>

  </section>
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
// hamar função de login do back-end
// armazenar informações do usuário no localStorage.setItem()
    loading.value = true

    error.value = ""
    successMsg.value = ""

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

    successMsg.value =
      isRegistering.value
        ? "Conta criada com sucesso"
        : "Login realizado com sucesso"

    setTimeout(() => {

      router.push("/")

    }, 1200)

  } catch (err) {

    console.log(err)

    error.value = "Erro interno"

  } finally {

    loading.value = false
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600&display=swap');

*{
  margin:0;
  padding:0;
  box-sizing:border-box;
}

:root{
  --navy:#081a33;
  --text:#243447;
  --soft:#6c7a8c;
  --line:#e5ecf4;
  --shadow:0 25px 70px rgba(8,26,51,.12);
  --radius:32px;
}
.auth-wrapper{
  min-height:100vh;

  display:grid;
  grid-template-columns:1.1fr 1fr;

  background:#f6f8fb;

  overflow:hidden;

  font-family:'Montserrat',sans-serif;
}
/* LEFT */

.auth-visual{
  position:relative;

  overflow:hidden;

  display:flex;
  align-items:center;

  padding:90px;
}

/* VIDEO */

.bg-video{
  position:absolute;

  inset:0;

  width:100%;
  height:100%;

  object-fit:cover;

  z-index:1;
}

/* OVERLAY */

.overlay{
  position:absolute;

  inset:0;

  background:
    linear-gradient(
      90deg,
      rgba(255,255,255,.38),
      rgba(255,255,255,.12),
      rgba(255,255,255,.02)
    );

  z-index:2;
}

/* CONTENT */

.visual-content{
  position:relative;

  z-index:3;

  max-width:540px;
}

.mini-badge{
  display:inline-flex;

  padding:10px 18px;

  border-radius:999px;

  background:
    rgba(255,255,255,.70);

  backdrop-filter:blur(10px);

  border:
    1px solid rgba(255,255,255,.35);

  color:var(--navy);

  font-size:11px;
  font-weight:700;

  letter-spacing:3px;

  margin-bottom:30px;
}

.visual-content h1{
  font-family:'Cormorant Garamond',serif;

  font-size:92px;

  line-height:.92;

  color:white;

  margin-bottom:24px;

  text-shadow:
    0 10px 40px rgba(0,0,0,.35);
}

.visual-content p{
  color:rgba(255,255,255,.92);

  font-size:15px;

  line-height:1.9;

  margin-bottom:42px;

  max-width:450px;
}

.benefits{
  display:flex;
  flex-direction:column;
  gap:18px;
}

.benefit{
  display:flex;
  align-items:center;
  gap:14px;
}

.dot{
  width:10px;
  height:10px;

  border-radius:50%;

  background:white;

  box-shadow:
    0 0 15px rgba(255,255,255,.45);
}

.benefit p{
  margin:0;

  color:white;

  font-size:14px;
  font-weight:500;
}

/* RIGHT */

.auth-panel{
  display:flex;
  align-items:center;
  justify-content:center;

  padding:50px;

  background:#f6f8fb;
}

.auth-box{
  width:100%;
  max-width:500px;

  background:white;

  border-radius:var(--radius);

  padding:52px;

  box-shadow:var(--shadow);

  border:
    1px solid rgba(0,0,0,.04);
}

/* HEADER */

.auth-header{
  margin-bottom:34px;
}

.auth-header h2{
  font-size:46px;

  color:var(--navy);

  margin-bottom:10px;

  font-family:'Cormorant Garamond',serif;
}

.auth-header p{
  color:var(--soft);

  line-height:1.8;

  font-size:14px;
}

/* TABS */

.tabs{
  display:flex;

  background:#eef3f8;

  border-radius:999px;

  padding:6px;

  margin-bottom:34px;
}

.tabs button{
  flex:1;

  height:56px;

  border:none;
  background:none;

  border-radius:999px;

  cursor:pointer;

  font-size:12px;
  font-weight:700;

  color:#7f8a99;

  transition:.35s;
}

.tabs button.active{
  background:#000;

  color:white;

  box-shadow:
    0 10px 25px rgba(0,0,0,.12);
}

/* FORM */

.auth-form{
  display:flex;
  flex-direction:column;
  gap:22px;
}

.input-group label{
  display:block;

  margin-bottom:10px;

  color:var(--navy);

  font-size:11px;
  font-weight:700;

  letter-spacing:2px;

  text-transform:uppercase;
}

.input-group input{
  width:100%;
  height:60px;

  border-radius:18px;

  border:1px solid var(--line);

  padding:0 20px;

  outline:none;

  font-size:14px;

  transition:.35s;
}

.input-group input:focus{
  border-color:var(--navy);

  box-shadow:
    0 0 0 5px rgba(8,26,51,.06);
}

.label-row{
  display:flex;
  align-items:center;
  justify-content:space-between;
}

.label-row a{
  text-decoration:none;

  color:var(--navy);

  font-size:11px;
}

.password-wrap{
  position:relative;
}

.show-password{
  position:absolute;

  top:50%;
  right:18px;

  transform:translateY(-50%);

  border:none;
  background:none;

  cursor:pointer;

  color:var(--navy);

  font-size:11px;
  font-weight:700;
}

/* BUTTON */

.submit-btn{
  height:62px;

  border:none;

  border-radius:20px;

  background:#000;

  color:white;

  cursor:pointer;

  font-size:12px;
  font-weight:800;

  letter-spacing:3px;

  text-transform:uppercase;

  transition:.35s;
}

.submit-btn:hover{
  transform:translateY(-3px);

  background:#111;

  box-shadow:
    0 18px 40px rgba(0,0,0,.18);
}

/* DIVIDER */

.divider{
  position:relative;

  text-align:center;

  margin:8px 0;
}

.divider::before{
  content:"";

  position:absolute;

  top:50%;
  left:0;

  width:100%;
  height:1px;

  background:#e7edf5;
}

.divider span{
  position:relative;

  background:white;

  padding:0 14px;

  color:#96a2b2;

  font-size:11px;
}

/* SOCIAL */

.socials{
  display:flex;
  gap:14px;
}

.social-btn{
  flex:1;

  height:56px;

  border-radius:18px;

  border:1px solid var(--line);

  background:white;

  cursor:pointer;

  font-size:13px;
  font-weight:600;

  color:var(--navy);

  transition:.35s;
}

.social-btn:hover{
  transform:translateY(-3px);

  border-color:var(--navy);
}

/* MESSAGE */

.message{
  padding:16px;

  border-radius:16px;

  font-size:13px;
}

.error{
  background:#fff2f2;

  border:1px solid #ffdada;

  color:#d94c4c;
}

.success{
  background:#eefcf4;

  border:1px solid #caf2da;

  color:#1c8b54;
}

/* LOADER */

.loader{
  width:18px;
  height:18px;

  border-radius:50%;

  border:2px solid rgba(255,255,255,.3);
  border-top-color:white;

  margin:auto;

  animation:spin .7s linear infinite;
}

@keyframes spin{
  to{
    transform:rotate(360deg);
  }
}

/* RESPONSIVE */

@media(max-width:1100px){

  .auth-wrapper{
    grid-template-columns:1fr;

    margin-top:120px;
  }

  .auth-visual{
    display:none;
  }
}

@media(max-width:700px){

  .auth-panel{
    padding:20px;
  }

  .auth-box{
    padding:34px 24px;
  }

  .socials{
    flex-direction:column;
  }

  .visual-content h1{
    font-size:58px;
  }
}
</style>