<template>
  <div class="history-root">
    <SiteHeader />

    <main class="history-canvas">
      <div class="history-inner">
        <section class="history-container">
          <div class="history-header">
            <h1 class="history-title">История покупок</h1>
            <div class="history-count"><span class="history-items-label">товаров</span><span class="history-items-number"></span></div>
          </div>

          <div class="history-body">
            <!-- Товары будут добавлены позже -->
          </div>
        </section>

        <aside class="history-sidebar">
          <img src="/src/assets/photos/history.png" alt="История покупок" class="history-image" />
        </aside>
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
.history-root{min-height:100vh;display:flex;flex-direction:column;background:#F5F5F5}
.history-canvas{flex:1;display:flex;justify-content:center;min-height:calc(100vh - 164px);padding-bottom:40px}
.history-inner{width:1400px;display:flex;gap:140px;padding:40px 0 0;box-sizing:border-box;align-items:stretch}
.history-container{flex:1;background:#FDFDFD;border-top-left-radius:30px;border-top-right-radius:30px;border-bottom-left-radius:30px;border-bottom-right-radius:30px;padding:30px 36px 30px;box-sizing:border-box;min-height:100%}
.history-header{display:flex;flex-direction:column;align-items:flex-start;gap:12px;padding-bottom:16px;border-bottom:1px solid #E0E0E0}
.history-title{font-size:36px;margin:0;font-weight:500}
.history-count{font-size:20px;color:#676767}
.history-body{margin-top:24px}
.history-sidebar{width:340px;display:flex;align-items:center;justify-content:center;margin-left:auto}
.history-image{width:423px;height:624px;border-radius:30px;object-fit:cover}
.history-count{font-size:20px;color:#676767;display:flex;align-items:center;gap:8px}
.history-items-label{color:#676767;font-family:'Montserrat Alternates', sans-serif;font-size:20px}
.history-items-number{min-width:56px;display:inline-block}

@media (max-width:1486px){
  .history-inner{flex-direction:column;gap:20px;align-items:stretch}
  .history-sidebar{order:-1;width:100%;display:flex;justify-content:center;padding-bottom:0}
  .history-image{display:none}
  .history-container{order:0;width:100%;max-width:100%}
  .history-canvas{padding-bottom:0}
}

@media (max-width:975px){
  .history-inner{flex-direction:column;gap:20px;align-items:stretch}
  .history-sidebar{order:-1;width:100%;display:flex;justify-content:center;padding-bottom:0}
  .history-image{display:none}
  .history-container{order:0;width:100%;max-width:100%}
  .history-canvas{padding-bottom:0}
}

@media (max-width:768px){
  .history-inner{flex-direction:column;gap:20px;align-items:stretch}
  .history-container{padding:20px 36px 20px;border-radius:30px;flex:1;min-height:0}
  .history-canvas{min-height:auto}
}

</style>
