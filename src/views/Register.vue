<template>
  <div class="register-root">
    <SiteHeader />

    <main class="register-canvas" role="main" aria-label="Регистрация">
      <div class="register-layout">
        <div class="register-image" aria-hidden="true"></div>

        <div class="register-form">
          <h1 class="reg-title">Создание аккаунта</h1>
          <p class="reg-sub">Введите детали аккаунта</p>

          <label class="reg-field"><input placeholder="Логин" /></label>
          <label class="reg-field"><input placeholder="Почта" type="email" /></label>
          <label class="reg-field"><input placeholder="Пароль" type="password" /></label>
          <label class="reg-field"><input placeholder="Повторите пароль" type="password" /></label>

          <button class="reg-submit">Создать аккаунт</button>

          <div class="reg-footer">Уже имеете аккаунт? <a href="/login">Войти</a></div>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import SiteHeader from '../components/Header.vue'
import Footer from '../components/Footer.vue'
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@400;600&display=swap');
.register-root{min-height:100vh;display:flex;flex-direction:column;align-items:center;background:#F5F5F5}
.register-canvas{width:100%;display:flex;justify-content:flex-start;background:#F5F5F5;flex:1;padding-top:150px;padding-bottom:150px;padding-left:70px;padding-right:70px;box-sizing:border-box}

.register-layout{display:flex;align-items:center;gap:160px}
.register-image{width:900px;height:510px;background-image:url('/src/assets/photos/registration.png');background-size:cover;background-position:center;border-radius:30px;flex:0 0 900px}
.register-form{width:420px;max-width:calc(100% - 900px);display:flex;flex-direction:column;gap:18px}
.reg-title{font-family:'Montserrat Alternates', sans-serif;font-size:36px;margin:0 0 6px}
.reg-sub{margin:0;color:#333}
.reg-field{display:block}
.reg-field input{width:100%;border:0;border-bottom:1px solid #cfcfcf;padding:12px 6px;font-size:16px;background:transparent;outline:none}
.reg-submit{margin-top:8px;background:#222;color:#fff;border:0;border-radius:30px;padding:12px 18px;font-size:16px;cursor:pointer}
.reg-footer{margin-top:12px;color:#666}
.reg-footer a{color:#222;text-decoration:none;margin-left:6px}

@media (max-width:1600px){
  .register-layout{width:100%;height:100%}
  .register-image{width:300px;height:510px}
}

@media (max-width:1366px){
  .register-canvas{padding-left:20px;padding-right:20px;padding-top:40px;padding-bottom:40px}
  .register-layout{flex-direction:column;align-items:stretch;gap:24px}
  .register-image{display:none}
  .register-form{width:100%;max-width:700px;margin:0 auto}
}

</style>
