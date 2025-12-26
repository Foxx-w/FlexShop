<template>
  <div class="cart-root">
    <SiteHeader />

    <main class="cart-canvas">
      <div class="cart-inner">
        <section class="cart-container">
          <div class="cart-header">
            <h1 class="cart-title">Корзина</h1>
            <div class="cart-count">
              <span class="cart-items-number">{{ totalItems }}</span>
              <span class="cart-items-label">товаров</span>
            </div>
          </div>

          <div class="cart-controls">
            <CheckBox v-model="allChecked" class="select-all-checkbox" />
            <div class="cart-select-all">Выбрать всё</div>
          </div>

          <div class="cart-divider"></div>

          <div class="cart-body">
            <CartItem 
              v-for="item in cartItems" 
              :key="item.id"
              :item="item"
              @delete="removeItem"
              @download="downloadItem"
              @update:item="updateItem"
            />
            
            <div v-if="cartItems.length === 0" class="cart-empty">
              <div class="empty-icon">🛒</div>
              <h3 class="empty-title">Корзина пуста</h3>
              <p class="empty-text">Добавьте товары, чтобы сделать заказ</p>
            </div>
          </div>
        </section>

        <aside class="cart-sidebar">
          <div class="summary-box">
            <div class="summary-title">Итого:</div>
            <div class="summary-price">{{ totalPrice }} ₽</div>
            <button 
              class="order-btn"
              @click="handleOrder"
              :disabled="isOrdering || cartItems.length === 0"
            >
              Заказать
            </button>
            <div class="summary-note">{{ totalItems }} товаров</div>
          </div>
        </aside>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import SiteHeader from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import CheckBox from '../components/CheckBox.vue'
import CartItem from '../components/CartItem.vue'

const allChecked = ref(false)
const isOrdering = ref(false)

const cartItems = ref([
  {
    id: 1,
    title: 'Plants vs. Zombies',
    platform: 'Steam ключ',
    price: 1800,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=105&h=135&crop=entropy',
    link: '/product/plants-vs-zombies'
  },
  {
    id: 2,
    title: 'Cyberpunk 2077',
    platform: 'Steam ключ',
    price: 2499,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-1.2.1&auto=format&fit=crop&w=105&h=135&crop=entropy',
    link: '/product/cyberpunk-2077'
  },
  {
    id: 3,
    title: 'The Witcher 3: Wild Hunt',
    platform: 'Steam ключ',
    price: 1499,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&auto=format&fit=crop&w=105&h=135&crop=entropy',
    link: '/product/the-witcher-3'
  },
  {
    id: 4,
    title: 'Red Dead Redemption 2',
    platform: 'Steam ключ',
    price: 1999,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=105&h=135&crop=entropy',
    link: '/product/red-dead-redemption-2'
  }
])

const totalItems = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
})

const totalPrice = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
})

watch(allChecked, (newValue) => {
  console.log('Выбрать всё:', newValue)
})

const handleOrder = () => {
  if (isOrdering.value || cartItems.length === 0) return
  
  isOrdering.value = true
  
  setTimeout(() => {
    isOrdering.value = false
    alert(`Заказ оформлен на сумму ${totalPrice.value} ₽!`)
  }, 1500)
}

const removeItem = (itemId) => {
  cartItems.value = cartItems.value.filter(item => item.id !== itemId)
}

const downloadItem = (itemId) => {
  const item = cartItems.value.find(item => item.id === itemId)
  if (item) {
    alert(`Скачивание товара: ${item.title}`)
  }
}

const updateItem = (updatedItem) => {
  const index = cartItems.value.findIndex(item => item.id === updatedItem.id)
  if (index !== -1) {
    cartItems.value[index] = updatedItem
  }
}
</script>

<style scoped>
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
  padding: 30px 20px; 
  box-sizing: border-box;
}

.cart-inner {
  width: 100%;
  max-width: 1200px; 
  display: flex;
  gap: 30px;
  padding: 0; 
  box-sizing: border-box;
  align-items: flex-start;
}

.cart-container {
  flex: 1;
  background: #FFFFFF;
  border-radius: 12px; 
  padding: 25px 30px;
  box-sizing: border-box;
  min-height: 100%;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.cart-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.cart-title {
  font-size: 28px;
  margin: 0;
  font-weight: 600;
  font-family: 'Montserrat Alternates', sans-serif;
  color: #333;
}

.cart-count {
  font-size: 18px;
  color: #666;
  display: flex;
  align-items: center;
  gap: 4px;
}

.cart-items-number {
  font-weight: 600;
  color: #333;
}

.cart-items-label {
  color: #666;
}

.cart-controls {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 15px;
}

.select-all-checkbox {
  transform: scale(1.1);
}

.cart-select-all {
  font-size: 16px;
  font-family: 'Montserrat Alternates', sans-serif;
  color: #333;
  font-weight: 500;
}

.cart-divider {
  height: 1px;
  background: #E0E0E0;
  margin-bottom: 10px;
}

.cart-body {
  margin-top: 10px;
}

.cart-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  border-radius: 10px;
  background: #F8F8F8;
  margin-top: 20px;
}

.empty-icon {
  font-size: 60px;
  margin-bottom: 20px;
  opacity: 0.7;
}

.empty-title {
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 10px 0;
  color: #333;
  font-family: 'Montserrat Alternates', sans-serif;
}

.empty-text {
  font-size: 15px;
  color: #666;
  margin: 0;
  max-width: 250px;
}

.cart-sidebar {
  width: 300px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  position: sticky;
  top: 30px;
}

.summary-box {
  width: 300px;
  height: 220px;
  border: 2px solid #A53DFF;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: transparent;
  box-sizing: border-box;
  padding: 24px;
  font-family: 'Montserrat Alternates', sans-serif;
  box-shadow: 0 3px 15px rgba(165, 61, 255, 0.08);
}

.summary-title {
  font-size: 22px;
  font-weight: 600;
  color: #333;
}

.summary-price {
  font-size: 28px;
  color: #A53DFF;
  font-weight: 700;
  margin: 5px 0 10px 0;
}

.order-btn {
  background: #A53DFF;
  color: #fff;
  border: 0;
  border-radius: 8px;
  padding: 12px 40px;
  font-size: 16px;
  cursor: pointer;
  font-family: 'Montserrat Alternates', sans-serif;
  font-weight: 600;
  text-align: center;
  transition: all 0.2s;
  margin: 5px 0;
  width: 100%;
  max-width: 200px;
}

.order-btn:hover:not(:disabled) {
  background: #8C2BD9;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(165, 61, 255, 0.2);
}

.order-btn:active:not(:disabled) {
  transform: translateY(0);
}

.order-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.summary-note {
  font-size: 14px;
  color: #666;
  margin-top: 5px;
}

@media (max-width: 1100px) {
  .cart-inner {
    gap: 25px;
  }
  
  .cart-sidebar {
    width: 280px;
  }
  
  .summary-box {
    width: 280px;
    height: 200px;
  }
}

@media (max-width: 975px) {
  .cart-canvas {
    padding: 20px 15px;
  }
  
  .cart-inner {
    flex-direction: column;
    gap: 20px;
    align-items: stretch;
  }
  
  .cart-sidebar {
    width: 100%;
    order: -1;
    justify-content: center;
    position: static;
  }
  
  .summary-box {
    width: 100%;
    max-width: 100%;
    height: 180px;
  }
  
  .cart-container {
    order: 0;
    width: 100%;
    padding: 20px;
  }
}

@media (max-width: 768px) {
  .cart-canvas {
    padding: 15px 10px;
  }
  
  .cart-inner {
    gap: 15px;
  }
  
  .cart-container {
    padding: 16px;
  }
  
  .cart-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .cart-title {
    font-size: 24px;
  }
  
  .cart-count {
    font-size: 16px;
  }
  
  .summary-box {
    height: 160px;
    padding: 20px;
  }
  
  .summary-title {
    font-size: 20px;
  }
  
  .summary-price {
    font-size: 24px;
  }
  
  .order-btn {
    padding: 10px 30px;
    font-size: 15px;
    max-width: 180px;
  }
}

@media (max-width: 480px) {
  .cart-canvas {
    padding: 12px 8px;
  }
  
  .cart-container {
    padding: 14px;
  }
  
  .cart-title {
    font-size: 22px;
  }
  
  .cart-select-all {
    font-size: 15px;
  }
  
  .summary-box {
    height: 150px;
    padding: 16px;
    border-radius: 10px;
  }
  
  .summary-title {
    font-size: 18px;
  }
  
  .summary-price {
    font-size: 22px;
  }
  
  .order-btn {
    padding: 10px 25px;
  }
}
</style>