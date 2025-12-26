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
            <input 
              class="pf-input" 
              type="number" 
              inputmode="numeric" 
              pattern="\\d*" 
              aria-label="Цена от" 
              min="0" 
              step="1" 
              v-model="minPriceInput"
              @input="validateInput($event, 'min')"
              @keyup.enter="applyFilter"
              @blur="handleInputBlur('min')"
            />
          </label>
          <label class="pf-field">
            <span class="pf-label">До:</span>
            <input 
              class="pf-input" 
              type="number" 
              inputmode="numeric" 
              pattern="\\d*" 
              aria-label="Цена до" 
              min="0" 
              step="1" 
              v-model="maxPriceInput"
              @input="validateInput($event, 'max')"
              @keyup.enter="applyFilter"
              @blur="handleInputBlur('max')"
            />
          </label>
          
          <!-- Кнопка сброса фильтра -->
          <button 
            v-if="filterApplied" 
            class="reset-filter-btn"
            @click="resetFilter"
            aria-label="Сбросить фильтр"
            title="Сбросить фильтр"
          >
            ×
          </button>
        </div>

        <button 
          class="pf-btn" 
          :class="{ 'btn-loading': isLoading, 'btn-success': isSuccess }"
          :disabled="isLoading"
          @click="applyFilter"
          @mouseenter="hoverButton"
          @mouseleave="resetButton"
          aria-label="Готово"
        >
          <span v-if="!isLoading && !isSuccess">Готово</span>
          <span v-else-if="isSuccess" class="success-icon">✓</span>
          <span v-else class="loader"></span>
        </button>
      </div>

      <!-- Информация о фильтре -->
      <div v-if="filterApplied && (minPrice || maxPrice)" class="filter-info">
        <span class="filter-text">Фильтр: </span>
        <span v-if="minPrice && maxPrice" class="filter-range">
          от {{ formatPrice(minPrice) }} до {{ formatPrice(maxPrice) }} ₽
        </span>
        <span v-else-if="minPrice" class="filter-range">
          от {{ formatPrice(minPrice) }} ₽
        </span>
        <span v-else-if="maxPrice" class="filter-range">
          до {{ formatPrice(maxPrice) }} ₽
        </span>
        <span class="filter-count">
          (найдено {{ displayedProducts.length }} из {{ products.length }} товаров)
        </span>
      </div>

      <div class="products-grid">
        <!-- Загружаем карточки товаров -->
        <ProductCard 
          v-for="product in paginatedProducts" 
          :key="product.id"
          :product="product"
        />
        
        <div v-if="displayedProducts.length === 0 && filterApplied" class="no-results">
          {{ noResultsMessage }}
        </div>
      </div>

      <!-- Пагинация -->
      <div v-if="totalPages > 1 && displayedProducts.length > 0" class="pagination">
        <button 
          class="page-btn prev-btn" 
          @click="prevPage"
          :disabled="currentPage === 1"
          aria-label="Предыдущая страница"
        >
          ←
        </button>
        
        <div class="page-numbers">
          <button 
            v-for="page in visiblePages" 
            :key="page"
            class="page-number" 
            :class="{ active: page === currentPage }"
            @click="goToPage(page)"
            :aria-label="`Страница ${page}`"
            :aria-current="page === currentPage ? 'page' : null"
          >
            {{ page }}
          </button>
          
          <span v-if="hasEllipsisEnd" class="page-ellipsis">...</span>
        </div>
        
        <button 
          class="page-btn next-btn" 
          @click="nextPage"
          :disabled="currentPage === totalPages"
          aria-label="Следующая страница"
        >
          →
        </button>
        
        <div class="page-info">
          Страница {{ currentPage }} из {{ totalPages }}
        </div>
      </div>
      
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import SiteHeader from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import ProductCard from '../components/ProductCard.vue'

// Реактивные данные для фильтров
const minPriceInput = ref('')
const maxPriceInput = ref('')
const minPrice = ref(null) // Фактическое значение фильтра
const maxPrice = ref(null) // Фактическое значение фильтра
const isLoading = ref(false)
const isSuccess = ref(false)
const filterApplied = ref(false)

// Пагинация
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Массив товаров
const products = ref([
  {
    id: 1,
    name: 'The Witcher 3: Wild Hunt',
    price: 1499,
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/292030/capsule_616x353.jpg'
  },
  {
    id: 2,
    name: 'Cyberpunk 2077',
    price: 1999,
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/capsule_616x353.jpg'
  },
  {
    id: 3,
    name: 'Elden Ring',
    price: 2499,
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/capsule_616x353.jpg'
  },
  {
    id: 4,
    name: 'Red Dead Redemption 2',
    price: 1799,
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/capsule_616x353.jpg'
  },
  {
    id: 5,
    name: 'Baldur\'s Gate 3',
    price: 2999,
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/capsule_616x353.jpg'
  },
  {
    id: 6,
    name: 'Counter-Strike 2',
    price: 0,
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/730/capsule_616x353.jpg'
  },
  {
    id: 7,
    name: 'Dota 2',
    price: 0,
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/570/capsule_616x353.jpg'
  },
  {
    id: 8,
    name: 'Apex Legends',
    price: 0,
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1172470/capsule_616x353.jpg'
  },
  {
    id: 9,
    name: 'Grand Theft Auto V',
    price: 899,
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/271590/capsule_616x353.jpg'
  },
  {
    id: 10,
    name: 'The Sims 4',
    price: 0,
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1222670/capsule_616x353.jpg'
  },
  {
    id: 11,
    name: 'Call of Duty: Modern Warfare III',
    price: 3499,
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1938090/capsule_616x353.jpg'
  },
  {
    id: 12,
    name: 'Starfield',
    price: 2799,
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1716740/capsule_616x353.jpg'
  },
  {
    id: 13,
    name: 'Forza Horizon 5',
    price: 2199,
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/capsule_616x353.jpg'
  },
  {
    id: 14,
    name: 'Hogwarts Legacy',
    price: 2599,
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/990080/capsule_616x353.jpg'
  },
  {
    id: 15,
    name: 'Marvel\'s Spider-Man Remastered',
    price: 2399,
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1817070/capsule_616x353.jpg'
  },
  {
    id: 16,
    name: 'God of War',
    price: 2299,
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/capsule_616x353.jpg'
  },
  {
    id: 17,
    name: 'Resident Evil 4',
    price: 2499,
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/capsule_616x353.jpg'
  },
  {
    id: 18,
    name: 'Dead Space',
    price: 2099,
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1693980/capsule_616x353.jpg'
  },
  {
    id: 19,
    name: 'Sea of Thieves',
    price: 899,
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1172620/capsule_616x353.jpg'
  },
  {
    id: 20,
    name: 'Fallout 4',
    price: 999,
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/377160/capsule_616x353.jpg'
  }
])

// Форматирование цены
const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

// Валидация ввода
const validateInput = (event, type) => {
  const input = event.target
  let value = input.value.replace(/[^0-9]/g, '')
  
  // Ограничение максимальной длины
  if (value.length > 7) {
    value = value.slice(0, 7)
  }
  
  input.value = value
  
  if (type === 'min') {
    minPriceInput.value = value
  } else {
    maxPriceInput.value = value
  }
}

// Обработка потери фокуса
const handleInputBlur = (type) => {
  if (type === 'min' && minPriceInput.value) {
    const value = parseInt(minPriceInput.value)
    if (value < 0) minPriceInput.value = '0'
    if (value > 9999999) minPriceInput.value = '9999999'
    
    // Автоматическая коррекция если min > max
    if (maxPriceInput.value && value > parseInt(maxPriceInput.value)) {
      maxPriceInput.value = minPriceInput.value
    }
  }
  
  if (type === 'max' && maxPriceInput.value) {
    const value = parseInt(maxPriceInput.value)
    if (value < 0) maxPriceInput.value = '0'
    if (value > 9999999) maxPriceInput.value = '9999999'
    
    // Автоматическая коррекция если max < min
    if (minPriceInput.value && value < parseInt(minPriceInput.value)) {
      minPriceInput.value = maxPriceInput.value
    }
  }
}

// Применение фильтра
const applyFilter = async () => {
  if (isLoading.value) return
  
  isLoading.value = true
  
  // Устанавливаем значения фильтра
  minPrice.value = minPriceInput.value ? parseInt(minPriceInput.value) : null
  maxPrice.value = maxPriceInput.value ? parseInt(maxPriceInput.value) : null
  
  // Проверка на корректность
  if (minPrice.value !== null && maxPrice.value !== null && minPrice.value > maxPrice.value) {
    maxPrice.value = minPrice.value
    maxPriceInput.value = minPriceInput.value
  }
  
  filterApplied.value = true
  currentPage.value = 1 // Сбрасываем на первую страницу
  
  // Имитация загрузки данных
  await new Promise(resolve => setTimeout(resolve, 600))
  
  isLoading.value = false
  isSuccess.value = true
  
  // Сброс успешного состояния через 2 секунды
  setTimeout(() => {
    isSuccess.value = false
  }, 2000)
}

// Сброс фильтра
const resetFilter = () => {
  minPriceInput.value = ''
  maxPriceInput.value = ''
  minPrice.value = null
  maxPrice.value = null
  filterApplied.value = false
  currentPage.value = 1
}

// Отфильтрованные товары
const displayedProducts = computed(() => {
  if (!filterApplied.value) {
    return products.value
  }
  
  return products.value.filter(product => {
    const price = product.price
    
    // Если не указаны границы - показываем все
    if (minPrice.value === null && maxPrice.value === null) {
      return true
    }
    
    // Проверка минимальной цены
    const minValid = minPrice.value === null || price >= minPrice.value
    
    // Проверка максимальной цены
    const maxValid = maxPrice.value === null || price <= maxPrice.value
    
    return minValid && maxValid
  })
})

// Пагинация
const totalPages = computed(() => {
  return Math.ceil(displayedProducts.value.length / itemsPerPage.value)
})

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return displayedProducts.value.slice(start, end)
})

// Отображаемые номера страниц
const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  
  if (totalPages.value <= maxVisible) {
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i)
    }
  } else {
    let start = Math.max(1, currentPage.value - 2)
    let end = Math.min(totalPages.value, start + maxVisible - 1)
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1)
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
  }
  
  return pages
})

const hasEllipsisEnd = computed(() => {
  return visiblePages.value[visiblePages.value.length - 1] < totalPages.value
})

// Сообщение при отсутствии результатов
const noResultsMessage = computed(() => {
  if (!filterApplied.value) return ''
  
  if (minPrice.value !== null && maxPrice.value !== null) {
    return `Товары в диапазоне от ${formatPrice(minPrice.value)} до ${formatPrice(maxPrice.value)} ₽ не найдены`
  } else if (minPrice.value !== null) {
    return `Товары от ${formatPrice(minPrice.value)} ₽ не найдены`
  } else if (maxPrice.value !== null) {
    return `Товары до ${formatPrice(maxPrice.value)} ₽ не найдены`
  }
  
  return 'Товары не найдены'
})

// Функции пагинации
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    scrollToTop()
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    scrollToTop()
  }
}

const goToPage = (page) => {
  currentPage.value = page
  scrollToTop()
}

const scrollToTop = () => {
  window.scrollTo({
    top: document.querySelector('.products-grid').offsetTop - 100,
    behavior: 'smooth'
  })
}

// Анимация при наведении
const hoverButton = (event) => {
  if (!isLoading.value && !isSuccess.value) {
    event.target.style.transform = 'translateY(-2px)'
  }
}

const resetButton = (event) => {
  if (!isLoading.value && !isSuccess.value) {
    event.target.style.transform = 'translateY(0)'
  }
}
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

.price-filter {
  width: 600px;
  max-width: 90%;
  margin: 35px auto 0;
  background: #E2E2E2;
  border-radius: 30px;
  height: 60px;
  padding: 10px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  box-sizing: border-box;
  font-size: 20px;
}

.pf-label{font-family:'Montserrat Alternates', sans-serif;font-size:20px;color:#A53DFF;margin-right:6px}

.pf-fields {
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
}

.pf-field {
  display: flex;
  align-items: center;
  gap: 6px;
}

.reset-filter-btn {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #A53DFF;
  color: white;
  border: none;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  margin-left: 8px;
  flex-shrink: 0;
}

.reset-filter-btn:hover {
  background: #8C2BD9;
  transform: rotate(90deg) scale(1.1);
}

.reset-filter-btn:active {
  transform: rotate(90deg) scale(0.95);
}

.filter-info {
  text-align: center;
  margin: 20px auto 0;
  padding: 12px 24px;
  background: #E2E2E2;
  border-radius: 20px;
  max-width: 800px;
  font-family: 'Montserrat Alternates', sans-serif;
  font-size: 16px;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
  animation: fadeIn 0.5s ease-out;
}

.filter-text {
  font-weight: 600;
  color: #A53DFF;
}

.filter-range {
  font-weight: 600;
  color: #222;
}

.filter-count {
  color: #666;
  font-size: 14px;
}

.pf-input{
  width:90px;
  height:28px;
  background:#F4F4F4;
  border-radius:30px;
  border:0;
  padding:4px 8px;
  font-size:20px;
  font-family:'Montserrat Alternates', sans-serif;
  box-sizing:border-box;
  text-align:left
}

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

.pf-btn{
  width:130px;
  height:40px;
  background:#222222;
  color:#fff;
  border-radius:30px;
  border:0;
  cursor:pointer;
  font-size:20px;
  font-family:'Montserrat Alternates', sans-serif;
  box-shadow:0 6px 16px rgba(0,0,0,0.25);
  align-self:center;
  margin-left: 10px;
}

/* Анимации для кнопки фильтра */
.pf-btn {
  width: 130px;
  height: 40px;
  background: #222222;
  color: #fff;
  border-radius: 30px;
  border: 0;
  cursor: pointer;
  font-size: 20px;
  font-family: 'Montserrat Alternates', sans-serif;
  box-shadow: 0 6px 16px rgba(0,0,0,0.25);
  align-self: center;
  margin-left: 10px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Эффект наведения (когда не в состоянии загрузки/успеха) */
.pf-btn:not(.btn-loading):not(.btn-success):hover {
  background: #A53DFF;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(165, 61, 255, 0.3);
}

/* Эффект нажатия */
.pf-btn:not(.btn-loading):not(.btn-success):active {
  transform: translateY(0);
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

/* Состояние загрузки */
.pf-btn.btn-loading {
  background: #444;
  cursor: not-allowed;
}

/* Состояние успеха */
.pf-btn.btn-success {
  background: #4CAF50;
  animation: successPulse 0.5s ease-in-out;
}

/* Анимация пульсации при успехе */
@keyframes successPulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

/* Лоадер (вращающийся круг) */
.loader {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255,255,255,0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Иконка успеха */
.success-icon {
  font-size: 24px;
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Эффект волны при клике */
.pf-btn::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 5px;
  background: rgba(255, 255, 255, 0.5);
  opacity: 0;
  border-radius: 100%;
  transform: scale(1, 1) translate(-50%);
  transform-origin: 50% 50%;
}

.pf-btn:focus:not(:active)::after {
  animation: ripple 1s ease-out;
}

@keyframes ripple {
  0% {
    transform: scale(0, 0);
    opacity: 0.5;
  }
  100% {
    transform: scale(40, 40);
    opacity: 0;
  }
}

/* Плавное появление/исчезновение текста */
.pf-btn span {
  transition: opacity 0.3s ease;
}

/* Анимация для полей ввода при фокусе */
.pf-input:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(165, 61, 255, 0.2);
  animation: inputFocus 0.3s ease;
}

@keyframes inputFocus {
  from { box-shadow: 0 0 0 0 rgba(165, 61, 255, 0); }
  to { box-shadow: 0 0 0 2px rgba(165, 61, 255, 0.2); }
}

/* Плавное изменение цвета текста при вводе */
.pf-input:valid {
  color: #A53DFF;
}

/* Анимация появления сообщения об отсутствии результатов */
.no-results {
  width: 100%;
  text-align: center;
  padding: 40px;
  font-family: 'Montserrat Alternates', sans-serif;
  font-size: 18px;
  color: #666;
  animation: fadeInUp 0.5s ease-out;
  grid-column: 1 / -1;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Отключенное состояние кнопки */
.pf-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Обновленные стили для products-grid с центрированием */
.products-grid{
  max-width: 1920px;
  width: 100%;
  margin: 40px auto 0;
  padding: 0 64px;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(5, minmax(200px, 240px));
  gap: 20px;
  justify-content: center;
}

/* Пагинация */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin: 40px 0;
  padding: 20px;
  flex-wrap: wrap;
}

.page-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #A53DFF;
  background: white;
  color: #A53DFF;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.page-btn:hover:not(:disabled) {
  background: #A53DFF;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(165, 61, 255, 0.3);
}

.page-btn:active:not(:disabled) {
  transform: translateY(0);
}

.page-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
  border-color: #ccc;
  color: #ccc;
}

.page-numbers {
  display: flex;
  gap: 8px;
  align-items: center;
}

.page-number {
  min-width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 2px solid #E2E2E2;
  background: white;
  color: #333;
  font-size: 16px;
  font-family: 'Montserrat Alternates', sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
}

.page-number:hover:not(.active) {
  border-color: #A53DFF;
  color: #A53DFF;
  transform: translateY(-2px);
}

.page-number.active {
  background: #A53DFF;
  color: white;
  border-color: #A53DFF;
  font-weight: 600;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(165, 61, 255, 0.3);
}

.page-ellipsis {
  color: #666;
  font-size: 18px;
  padding: 0 4px;
}

.page-info {
  font-family: 'Montserrat Alternates', sans-serif;
  font-size: 16px;
  color: #666;
  margin-left: 16px;
  white-space: nowrap;
}

/* Адаптивные стили для products-grid с центрированием */
@media (max-width: 1600px) {
  .three-blocks {
    gap: 40px;
    padding: 0 16px;
  }
  
  .left-block {
    width: 320px;
    height: 340px;
  }
  
  .new-list {
    width: 320px;
    height: 340px;
    font-size: 16px;
  }
  
  .center-block {
    width: 600px;
    height: 340px;
  }
  
  .right-block {
    width: 320px;
    height: 340px;
  }
  
  .products-grid {
    grid-template-columns: repeat(4, minmax(200px, 240px));
    padding: 0 40px;
    gap: 25px;
  }
}

@media (max-width: 1400px) {
  .products-grid {
    grid-template-columns: repeat(4, minmax(180px, 220px));
    padding: 0 40px;
    gap: 25px;
  }
}

@media (max-width: 1200px) {
  .three-blocks {
    gap: 40px;
    padding: 0 16px;
  }
  
  .left-block, .right-block {
    display: none;
  }
  
  .center-block {
    width: 90%;
    height: auto;
    border-radius: 30px;
  }
  
  .right-block {
    width: 320px;
    height: 340px;
  }
  
  .products-grid {
    grid-template-columns: repeat(3, minmax(180px, 220px));
    padding: 0 30px;
    gap: 20px;
  }
}

@media (max-width: 1000px) {
  .products-grid {
    grid-template-columns: repeat(2, minmax(200px, 250px));
    gap: 20px;
    padding: 0 40px;
  }
}

@media (max-width: 900px) {
  .products-grid {
    grid-template-columns: repeat(2, minmax(180px, 220px));
    gap: 20px;
    padding: 0 30px;
  }
}

@media (max-width: 768px) {
  .price-filter {
    width: 90%;
    height: auto;
    padding: 15px;
    flex-direction: column;
    gap: 15px;
  }
  
  .pf-fields {
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .filter-info {
    margin: 15px 10px 0;
    padding: 10px 15px;
    font-size: 14px;
    flex-direction: column;
    gap: 5px;
  }
  
  .products-grid {
    grid-template-columns: repeat(2, minmax(150px, 200px));
    padding: 0 20px;
    gap: 15px;
    margin-top: 30px;
  }
  
  .pagination {
    flex-direction: column;
    gap: 16px;
    margin: 30px 0;
  }
  
  .page-info {
    margin-left: 0;
  }
  
  .no-results {
    padding: 40px;
    font-size: 20px;
  }
}

@media (max-width: 650px) {
  .products-grid {
    grid-template-columns: minmax(250px, 300px);
    justify-content: center;
    padding: 0 20px;
  }
  
  .page-numbers {
    flex-wrap: wrap;
    justify-content: center;
  }
}

@media (max-width: 580px) {
  .price-filter {
    max-width: 90%;
    height: 80px;
  }
  
  .pf-label {
    white-space: nowrap;
  }
  
  .pf-btn {
    width: 100px;
    font-size: 18px;
  }
  
  .loader {
    width: 16px;
    height: 16px;
  }
  
  .success-icon {
    font-size: 20px;
  }
  
  .pf-fields {
    gap: 8px;
  }
  
  .pf-field {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
  
  .pf-label {
    font-size: 16px;
  }
  
  .pf-input {
    width: 80px;
    font-size: 16px;
  }
  
  .reset-filter-btn {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
}

@media (max-width: 480px) {
  .products-grid {
    grid-template-columns: minmax(250px, 1fr);
    padding: 0 15px;
    gap: 15px;
    margin-top: 25px;
  }
  
  .no-results {
    padding: 30px;
    font-size: 18px;
  }
  
  .pagination {
    gap: 8px;
  }
  
  .page-btn,
  .page-number {
    width: 32px;
    height: 32px;
    font-size: 14px;
  }
  
  .page-info {
    font-size: 14px;
  }
  
  .products-grid > * {
    justify-self: center;
    width: 100%;
    max-width: 300px;
  }
}

.product-details-temp {
  display: flex;
  justify-content: center;
  margin-top: 40px;
  margin-bottom: 40px;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>