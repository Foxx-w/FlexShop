<template>
  <div class="cart-root">
    <SiteHeader />

    <main class="cart-canvas">
      <div class="cart-inner">
        <section class="cart-container">
          <div class="cart-header">
            <h1 class="cart-title">Корзина</h1>
            <div class="cart-count">
              <span class="cart-items-label">товаров</span>
              <span class="cart-items-number"></span>
            </div>
          </div>

          <div class="cart-controls">
            <CheckBox v-model="allChecked" />
            <div class="cart-select-all">Выбрать всё</div>
          </div>

          <div class="cart-body">
            <!-- Товары будут добавлены позже -->
          </div>
        </section>

        <aside class="cart-sidebar">
          <div class="summary-box">
            <div class="summary-title">Итого:</div>
            <div class="summary-price">Руб.</div>
            <button 
              class="order-btn"
              @click="handleOrder"
              :disabled="isOrdering"
            >
              Заказать
            </button>
            <div class="summary-note">Товары</div>
          </div>
        </aside>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SiteHeader from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import CheckBox from '../components/CheckBox.vue'

const allChecked = ref(false)
const isOrdering = ref(false)

const handleOrder = () => {
  if (isOrdering.value) return
  
  isOrdering.value = true
  
  // Имитация процесса оформления заказа
  setTimeout(() => {
    isOrdering.value = false
    // Здесь будет логика оформления заказа
    console.log('Заказ оформлен')
  }, 1000)
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@400;600&display=swap');

.cart-root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #F5F5F5;
}

.cart-canvas {
  flex: 1;
  display: flex;
  justify-content: center;
  min-height: calc(100vh - 164px);
  padding: 40px 20px; 
  box-sizing: border-box;
}

.cart-inner {
  width: 100%;
  max-width: 1200px; 
  display: flex;
  gap: 40px;
  padding: 0; 
  box-sizing: border-box;
  align-items: stretch;
}

.cart-container {
  flex: 1;
  background: #FDFDFD;
  border-radius: 30px; 
  padding: 30px 36px;
  box-sizing: border-box;
  min-height: 100%;
}

.cart-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.cart-title {
  font-size: 36px;
  margin: 0;
  font-weight: 500;
}

.cart-count {
  font-size: 20px;
  color: #676767;
}

.cart-controls {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #E0E0E0;
}

.cart-select-all {
  font-size: 20px;
  font-family: 'Montserrat Alternates', sans-serif;
}

.cart-body {
  margin-top: 24px;
}

.cart-sidebar {
  width: 340px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.summary-box {
  width: 340px;
  height: 275px;
  border: 5px solid #A53DFF;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  background: transparent;
  box-sizing: border-box;
  padding: 18px;
  font-family: 'Montserrat Alternates', sans-serif;
}

.summary-title {
  font-size: 32px;
  font-weight: 600;
}

.summary-price {
  font-size: 28px;
  color: #A53DFF;
  font-weight: 600;
}

.order-btn {
  background: #A53DFF;
  color: #fff;
  border: 0;
  border-radius: 30px;
  padding: 12px 24px;
  font-size: 18px;
  cursor: pointer;
  font-family: 'Montserrat Alternates', sans-serif;
  min-width: 140px;
  text-align: center;
}

.order-btn:active {
  background: #8C2BD9;
}

.order-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.cart-count {
  font-size: 20px;
  color: #676767;
  display: flex;
  align-items: center;
  gap: 8px;
}

.cart-items-label {
  color: #676767;
  font-family: 'Montserrat Alternates', sans-serif;
  font-size: 20px;
}

.cart-items-number {
  min-width: 56px;
  display: inline-block;
}

.summary-note {
  font-size: 16px;
  color: #666;
}

@media (max-width: 1200px) {
  .cart-inner {
    gap: 30px;
    padding: 0;
  }
  
  .cart-sidebar {
    width: 300px;
    flex-shrink: 0;
  }
  
  .summary-box {
    width: 100%;
    max-width: 300px;
  }
  
  .cart-container {
    padding: 25px 30px;
  }
}

@media (max-width: 975px) {
  .cart-canvas {
    padding: 30px 20px;
  }
  
  .cart-inner {
    flex-direction: column;
    gap: 30px;
    align-items: stretch;
  }
  
  .cart-sidebar {
    width: 100%;
    order: -1;
    justify-content: center;
  }
  
  .summary-box {
    width: 100%;
    max-width: 100%;
    height: 250px;
  }
  
  .cart-container {
    order: 0;
    width: 100%;
  }
}

@media (max-width: 768px) {
  .cart-canvas {
    padding: 20px 15px;
    min-height: auto;
  }
  
  .cart-inner {
    gap: 20px;
  }
  
  .cart-container {
    padding: 20px;
  }
  
  .cart-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .cart-title {
    font-size: 28px;
  }
  
  .summary-box {
    height: 220px;
    padding: 15px;
  }
  
  .summary-title {
    font-size: 28px;
  }
  
  .summary-price {
    font-size: 24px;
  }
  
  .order-btn {
    padding: 10px 20px;
    font-size: 16px;
    min-width: 120px;
  }
}

@media (max-width: 480px) {
  .cart-canvas {
    padding: 15px 10px;
  }
  
  .cart-container {
    padding: 15px;
    border-radius: 20px;
  }
  
  .cart-title {
    font-size: 24px;
  }
  
  .cart-select-all {
    font-size: 18px;
  }
  
  .summary-box {
    height: 200px;
    border-width: 3px;
    border-radius: 25px;
  }
  
  .summary-title {
    font-size: 24px;
  }
  
  .summary-price {
    font-size: 22px;
  }
  
  .order-btn {
    padding: 8px 16px;
    font-size: 16px;
  }
}
</style>
