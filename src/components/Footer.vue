<template>
  <footer class="site-footer" role="contentinfo" aria-label="Футер">
    <div class="footer-inner">
      <div class="footer-left">
        <a href="/" class="footer-logo-link">
          <div class="footer-logo-wrap">
            <div class="footer-logo-text">Flex-Shop</div>
            <img src="/src/assets/icons/logo.svg" alt="logo" class="footer-logo-icon" />
          </div>
        </a>
        <div class="footer-sub">© Flex-Shop 2025. Все права защищены.</div>
      </div>

      <div class="footer-right">
        <div class="footer-title">Мы в соцсетях</div>
        <div class="footer-icons">
          <a class="social-link" href="#" aria-label="Telegram">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="58 112 29 26" class="social-svg" fill="currentColor">
              <path d="M86.9202 115.276L82.6948 136.491C82.3761 137.988 81.5447 138.361 80.3634 137.655L73.9253 132.605L70.8188 135.785C70.475 136.152 70.1875 136.458 69.5249 136.458L69.9875 129.477L81.9198 117.998C82.4386 117.505 81.8073 117.232 81.1134 117.725L66.3621 127.614L60.0116 125.497C58.6302 125.038 58.6052 124.027 60.2991 123.321L85.1388 113.133C86.2889 112.674 87.2952 113.406 86.9202 115.276Z" />
            </svg>
            <span class="social-label">Telegram</span>
          </a>

          <a class="social-link" href="#" aria-label="Вконтакте">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="107 116 28 18" class="social-svg" fill="currentColor">
              <path d="M134.362 117.221C134.554 116.517 134.362 116 133.437 116H130.375C129.595 116 129.237 116.444 129.044 116.939C129.044 116.939 127.485 121.051 125.281 123.717C124.569 124.488 124.242 124.736 123.852 124.736C123.659 124.736 123.363 124.488 123.363 123.785V117.221C123.363 116.377 123.145 116 122.5 116H117.687C117.198 116 116.907 116.394 116.907 116.759C116.907 117.558 118.009 117.744 118.124 119.994V124.876C118.124 125.945 117.947 126.142 117.557 126.142C116.517 126.142 113.991 122.013 112.494 117.288C112.193 116.371 111.896 116 111.112 116H108.05C107.177 116 107 116.444 107 116.939C107 117.817 108.04 122.176 111.839 127.936C114.371 131.868 117.936 134 121.18 134C123.129 134 123.368 133.527 123.368 132.712C123.368 128.954 123.192 128.6 124.169 128.6C124.621 128.6 125.401 128.848 127.22 130.743C129.299 132.993 129.642 134 130.806 134H133.868C134.741 134 135.183 133.528 134.928 132.594C134.346 130.631 130.411 126.592 130.235 126.322C129.782 125.692 129.912 125.411 130.235 124.848C130.24 124.843 133.977 119.15 134.362 117.221Z" />
            </svg>
            <span class="social-label">ВКонтакте</span>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jeju+Myeongjo&display=swap');
.site-footer{margin-top:auto;width:100%;background-color:#222222;height:auto;color:#fff}
.footer-inner{display:flex;align-items:center;justify-content:space-between;padding:60px 150px;box-sizing:border-box}

.footer-left{display:flex;flex-direction:column;gap:18px}
.footer-logo-link{text-decoration:none;cursor:pointer;transition:opacity .18s ease}
.footer-logo-link:hover{opacity:0.8}
.footer-logo-wrap{display:flex;align-items:center;gap:18px}
.footer-logo-text{font-family:'Jeju Myeongjo', serif;font-size:96px;color:#FFFFFF;line-height:1}
.footer-logo-icon{width:77px;height:70px;margin-top:20px}

.footer-sub{font-family:'Jeju Myeongjo', serif;font-size:20px;color:#DADADA}
.footer-right{display:flex;flex-direction:column;align-items:center;gap:8px}
.footer-title{font-family:'Jeju Myeongjo', serif;font-size:36px}
.footer-icons{display:flex;gap:16px;align-items:center}
.social-link{display:flex;align-items:center;gap:10px;color:#fff;text-decoration:none;transition:color .18s ease}
.social-svg{width:28px;height:28px;flex:0 0 28px}
.social-label{font-family:'Jeju Myeongjo', serif;font-size:18px;color:inherit}
.social-link:hover{color:#A53DFF}

@media(max-width:1060px){
 .footer-logo-text{white-space: nowrap}
 .footer-inner{padding:30px 40px;flex-direction:column;align-items:flex-start;gap:24px}
  .footer-right{align-items:flex-start}
}

@media (max-width:536px){
  .footer-inner{padding:20px 20px}
  .footer-logo-text{font-size:64px}
}

</style>
