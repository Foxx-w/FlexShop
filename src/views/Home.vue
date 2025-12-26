<template>
  <div class="app-root">
    <SiteHeader />

    <main class="home-canvas" role="main" aria-label="Главная страница">
      <section class="three-blocks">
        <aside class="left-block">
          <h2 class="left-title">Новинки!</h2>
          <ol class="new-list">
            <li>Solo Leveling</li>
            <li>Night Swarm</li>
            <li>Escape from Tarkov</li>
            <li>Arc Raiders</li>
            <li>Dispatch</li>
            <li>Hades II</li>
            <li>Megabonk</li>
            <li>No, I'm not a Human</li>
            <li>CloverPit</li>
            <li>Hollow Knight: Silksong</li>
          </ol>
        </aside>

        <div class="center-block">
          <img src="/src/assets/photos/baner.png" alt="baner" />
        </div>

        <div class="right-block">
          <div class="promo-text">Новинка!</div>
          <img src="/src/assets/photos/new.png" alt="new" />
        </div>
      </section>
      
      <div class="price-filter" role="region" aria-label="Фильтр по цене">
        <div class="pf-fields">
          <label class="pf-field">
            <span class="pf-label">Цена от:</span>
            <input class="pf-input" type="number" inputmode="numeric" pattern="\\d*" aria-label="Цена от" min="0" step="1" oninput="this.value=this.value.replace(/[^0-9]/g,'')" onwheel="event.preventDefault()" onkeydown="if(event.key==='ArrowUp'||event.key==='ArrowDown'){event.preventDefault()}" />
          </label>
          <label class="pf-field">
            <span class="pf-label">До:</span>
            <input class="pf-input" type="number" inputmode="numeric" pattern="\\d*" aria-label="Цена до" min="0" step="1" oninput="this.value=this.value.replace(/[^0-9]/g,'')" onwheel="event.preventDefault()" onkeydown="if(event.key==='ArrowUp'||event.key==='ArrowDown'){event.preventDefault()}" />
          </label>
        </div>
        <button class="pf-btn" aria-label="Готово">Готово</button>
      </div>

      <div class="products-grid">
        <!-- Карточки товаров будут здесь -->
      </div>

      
    </main>

    <Footer />

  </div>
</template>

<script setup>
import SiteHeader from '../components/Header.vue'
import Footer from '../components/Footer.vue'
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@400;600&display=swap');
html,body,#app{height:100%;margin:0}
body{font-family:Inter, system-ui, Arial, sans-serif;background:#F5F5F5}
.app-root{min-height:100vh;display:flex;flex-direction:column;align-items:center}

.home-canvas{max-width:1920px;width:100%;min-height:calc(100vh - 164px);background:#F5F5F5}

.three-blocks{display:flex;justify-content:center;align-items:center;gap:110px;margin-top:36px;padding:0 64px;box-sizing:border-box}

.left-block{width:370px;height:400px;background:#EFEFEF;border-radius:30px;padding:22px;box-sizing:border-box}
.left-title{font-family:'Montserrat Alternates', sans-serif;font-size:36px;margin:0 0 12px;color:#111;padding-left: 8px;}
.new-list{font-family:'Montserrat Alternates', sans-serif;font-size:18px;line-height:1.25;margin:0;padding-left:32px;color:#111;overflow-wrap:break-word;hyphens:auto}
.new-list li{margin:6px 0}

.center-block{width:780px;height:440px;border-radius:30px;overflow:hidden;align-self:center}
.center-block img{width:100%;height:100%;object-fit:cover;display:block}

.right-block{width:370px;height:400px;border-radius:30px;overflow:hidden;position:relative;display:flex;align-items:center;justify-content:center;align-self:center}
.right-block img{width:100%;height:100%;object-fit:cover;display:block}
.promo-text{position:absolute;top:18px;left:50%;transform:translateX(-50%);z-index:2;font-family:'Montserrat Alternates', sans-serif;font-size:36px;color:#ffffff;text-align:center;pointer-events:none}

.price-filter{width:535px;max-width:90%;margin:35px auto 0;background:#E2E2E2;border-radius:30px;height:60px;padding:10px 18px;display:flex;align-items:center;justify-content:flex-start;gap:16px;box-sizing:border-box;font-size:20px}
.pf-label{font-family:'Montserrat Alternates', sans-serif;font-size:20px;color:#A53DFF;margin-right:6px}
.pf-fields{display:flex;align-items:center;gap:12px}
.pf-input{width:90px;height:28px;background:#F4F4F4;border-radius:30px;border:0;padding:4px 8px;font-size:20px;font-family:'Montserrat Alternates', sans-serif;box-sizing:border-box;text-align:left}

.pf-input[type="number"]::-webkit-outer-spin-button,
.pf-input[type="number"]::-webkit-inner-spin-button{
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
}
.pf-input[type="number"]{
  -moz-appearance: textfield;
  -webkit-appearance: none;
  appearance: none;
}
.pf-btn{width:130px;height:40px;background:#222222;color:#fff;border-radius:30px;border:0;cursor:pointer;font-size:20px;font-family:'Montserrat Alternates', sans-serif;box-shadow:0 6px 16px rgba(0,0,0,0.25);align-self:center;margin-left: 10px;}

@media (max-width:1600px){
  .three-blocks{gap:40px;padding:0 16px}
  .left-block{width:320px;height:340px}
  .new-list{width:320px;height:340px;font-size:16px}
  .center-block{width:600px;height:340px}
  .right-block{width:320px;height:340px}
}

@media (max-width:1200px){
  .three-blocks{gap:40px;padding:0 16px}
  .left-block,.right-block{display:none}
  .center-block{width:90%;height:auto;border-radius:30px}
  .right-block{width:320px;height:340px}
}

@media (max-width:580px){
.price-filter{max-width:90%;height:80px}

.pf-label{white-space: nowrap}
}

.products-grid{max-width:1920px;width:100%;margin-top:40px;padding:0 64px;box-sizing:border-box;display:flex;flex-wrap:wrap;gap:20px;justify-content:flex-start}

.product-details-temp{display:flex;justify-content:center;margin-top:40px;margin-bottom:40px;padding:0 20px;box-sizing:border-box}

</style>
