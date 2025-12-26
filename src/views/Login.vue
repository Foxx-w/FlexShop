<template>
  <div class="login-root">
    <SiteHeader />

    <main class="login-canvas" role="main" aria-label="Вход">
      <div class="login-layout">
        <div class="login-image" aria-hidden="true"></div>

        <div class="login-form">
          <h1 class="login-title">Вход в аккаунт</h1>
          <p class="login-sub">Введите детали входа</p>

          <label class="login-field"><input placeholder="Почта или Логин" /></label>
          <label class="login-field"><input placeholder="Пароль" type="password" /></label>

          <div class="login-actions">
            <button class="login-submit">Войти</button>
            <a class="login-forgot" href="#" @click.prevent="noop">Забыли пароль?</a>
          </div>

        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import SiteHeader from '../components/Header.vue'
import Footer from '../components/Footer.vue'

const noop = () => {}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@400;600&display=swap');
.login-root{min-height:100vh;display:flex;flex-direction:column;align-items:center;background:#F5F5F5}
.login-canvas{width:100%;display:flex;justify-content:center;background:#F5F5F5;flex:1;padding-top:150px;padding-bottom:150px;padding-left:70px;padding-right:70px;box-sizing:border-box}

.login-layout{display:flex;align-items:center;gap:160px}
.login-image{width:900px;height:510px;background-image:url('/src/assets/photos/login.png');background-size:cover;background-position:center;border-radius:30px;flex:0 0 900px}
.login-form{width:420px;max-width:calc(100% - 900px);display:flex;flex-direction:column;gap:18px}
.login-title{font-family:'Montserrat Alternates', sans-serif;font-size:36px;margin:0 0 6px}
.login-sub{margin:0;color:#333}
.login-field{display:block}
.login-field input{width:100%;border:0;border-bottom:1px solid #cfcfcf;padding:12px 6px;font-size:16px;background:transparent;outline:none}
.login-submit{margin-top:8px;background:#222;color:#fff;border:0;border-radius:30px;padding:12px 18px;font-size:16px;cursor:pointer}
.login-forgot{margin-top:12px;color:#666;text-decoration:none;margin-left:12px}

.login-actions{display:flex;align-items:center;gap:24px}

@media (max-width:1542px){
  .login-canvas{padding-left:20px;padding-right:20px;padding-top:40px;padding-bottom:40px}
  .login-image{display:none}
  .login-form{width:90%;max-width:700px}
}

</style>
