<template>
  <div class="product-details">
    <div class="left-section">
      <div class="vertical-photo-wrapper card-size">
        <img :src="product.cardImage || product.image" :alt="product.title" class="vertical-photo" />
        <div class="photo-overlay">
          <button type="button" class="photo-add-btn" aria-label="Добавить фото">+</button>
        </div>
      </div>

      <p class="photo-label">Фото карточки товара</p>

      <div class="photo-upload-placeholder" data-photo-upload></div>

      <div class="seller-note-plain">
        Примечатие для продавцов:<br />
        Выставляя товар, вы обязаны заполнить все поля товара, в противном случае, ваш товар будет удален!
      </div>
    </div>

    <div class="center-section">
      <div class="product-image-wrapper">
        <img :src="product.image" :alt="product.title" class="product-image" />
        <div class="photo-overlay large">
          <button type="button" class="photo-add-btn" aria-label="Добавить фото">+</button>
        </div>
      </div>
      
      <div class="product-description-box">
        <label class="field-label">Описание:</label>
        <textarea v-model="product.description" class="product-description-input" rows="4"></textarea>
      </div>

      <div class="price-section">
        <label class="field-label">Цена Руб.</label>
        <input type="number" v-model.number="product.price" class="price-input" min="0" />
      </div>
    </div>

    <div class="right-section">
      <input v-model="product.title" class="product-title-input" placeholder="Название" />

      <div class="seller-info">
        <img src="/src/assets/icons/saleman.svg" alt="Продавец" class="seller-icon" />
        <span class="seller-name">{{ product.seller || 'Продавец' }}</span>
      </div>

      <div class="specs">
              <div class="spec-row">
                <div class="spec-label">Год выхода:</div>
                <input class="spec-input" v-model="product.releaseYear" placeholder="" />
              </div>
              <div class="spec-row">
                <div class="spec-label">Жанр:</div>
                <input class="spec-input" v-model="product.genres" placeholder="" />
              </div>
              <div class="spec-row">
                <div class="spec-label">Разработчик:</div>
                <input class="spec-input" v-model="product.developer" placeholder="" />
              </div>
              <div class="spec-row">
                <div class="spec-label">Версия:</div>
                <input class="spec-input" v-model="product.version" placeholder="" />
              </div>
              <div class="spec-row">
                <div class="spec-label">Язык интерфейса:</div>
                <input class="spec-input" v-model="product.language" placeholder="" />
              </div>
      </div>

      <div class="buttons-section">
        <button class="btn btn-save" @click="onSave">Сохранить</button>
        <button class="btn btn-cancel" @click="onCancel">Отменить</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    default: () => ({
      title: '',
      description: '',
      price: 0,
      image: '',
      cardImage: '',
      seller: ''
    })
  }
})

const emit = defineEmits(['save','cancel','update:product'])

const product = reactive({ ...props.product })
// Если genres пришли как массив — сохраняем их в редакторе как строку
if (Array.isArray(product.genres)) product.genres = product.genres.join(', ')

watch(() => props.product, (p) => {
  if (!p) return
  const copy = { ...p }
  if (Array.isArray(copy.genres)) copy.genres = copy.genres.join(', ')
  Object.assign(product, copy || {})
})

function onSave() {
  const out = { ...product }
  if (typeof out.genres === 'string') {
    out.genres = out.genres.split(',').map(s => s.trim()).filter(Boolean)
  }
  emit('save', out)
  emit('update:product', out)
}

function onCancel() {
  emit('cancel')
}
</script>

<style scoped>
.product-details {
  width: 1505px;
  height: 865px;
  background: #EFEFEF;
  border: 8px solid #A53DFF;
  border-radius: 30px;
  display: flex;
  gap: 50px;
  padding: 30px;
  box-sizing: border-box;
  font-family: 'Montserrat Alternates', sans-serif;
}

.left-section {
  flex: 0 0 280px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
}

.vertical-photo-wrapper.card-size {
  width: 280px;
  height: 350px;
  background: #E6E6E6;
  border-radius: 30px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.vertical-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.photo-upload-placeholder { height:40px; width:100%; box-sizing:border-box }

.photo-overlay { position: absolute; inset: 0; display:flex; align-items:center; justify-content:center; background: rgba(0,0,0,0.04); pointer-events: none }
.photo-add-btn { pointer-events: auto; background: transparent; border: none; color: #A53DFF; font-size: 38px; line-height:1; cursor: pointer; padding: 4px 8px; transition: transform 0.12s ease, color 0.12s ease }
.photo-add-btn:hover { transform: scale(1.06); color: #5c00c5 }

.photo-label { margin: 0; font-size: 16px; color: #666; align-self: center; text-align: center; }

.seller-note-plain { margin-top: 100px; color: #666; font-size: 24px; line-height:1.3 }

.center-section {
  flex: 0 0 612px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.product-image-wrapper {
  width: 612px;
  height: 428px;
  background: #E6E6E6;
  border-radius: 30px;
  overflow: hidden;
  position: relative;
}

.product-image { width:620; height:430; }

.product-description-box { width:100%; background: transparent; }
.field-label { display:block; margin-bottom:6px; color:#666;}
.product-description-input { width:590px; height: 115px; padding:12px; border-radius:15px;background:#E6E6E6; font-size: 20px; font-family: 'Montserrat Alternates', sans-serif }

.price-section { margin-top: 10px; background: transparent; padding:0 }
.price-input { width:288px; height: 113px; padding:8px 12px; border-radius:15px; font-size: 64px ;color:#A53DFF;background:#E6E6E6;}

.right-section { flex: 0 0 372px; display: flex; flex-direction: column; gap:20px; padding:0; box-sizing: border-box; align-items: flex-start }
.product-title-input { width:100%; height:73px; border-radius:15px; background:#E6E6E6; font-size:28px; color:#A53DFF; box-sizing: border-box; text-align: center; font-family: 'Montserrat Alternates', sans-serif ; font-weight: bold;}

.seller-info { display:flex; width:100%; justify-content:center; align-items:center; gap:8px; padding:6px 0; margin-top:8px }
.seller-icon { width:21px; height:21px }

.specs { flex:1; display:flex; flex-direction:column; gap:18px; padding:0; border-radius:15px }
.spec-row { display:flex; justify-content:space-between; align-items:center; gap:12px; font-size:18px }
.spec-label { padding:0; min-width:140px; color:#666; font-weight:600; text-align:left }
.spec-input { width:220px; flex: 0 0 220px; padding:12px 14px; border-radius:12px; border:1px solid rgba(0,0,0,0.08); background:#E6E6E6; font-size:16px; font-family: 'Montserrat Alternates', sans-serif }

.buttons-section { display:flex; flex-direction:column; gap:16px; align-items:center; margin-top:auto }
.btn { width:435px; height:80px; border:none; border-radius:15px; font-size:32px; font-family:'Montserrat Alternates', sans-serif; font-weight:600; cursor:pointer; transition: transform 0.12s ease, box-shadow 0.12s ease }
.btn-save { background:#A53DFF; color:#fff; box-shadow:0 8px 20px rgba(165,61,255,0.25) }
.btn-cancel { background:#0962C9; color:#fff; box-shadow:0 8px 20px rgba(9,98,201,0.25) }

.btn:active { transform: translateY(3px) scale(0.995); box-shadow: 0 6px 14px rgba(0,0,0,0.12) }

</style>
