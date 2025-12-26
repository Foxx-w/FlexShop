<template>
  <div class="product-details">
    <div class="left-section">
      <div class="vertical-photo-wrapper">
        <img :src="product.cardImage || product.image" :alt="product.title" class="vertical-photo" />
      </div>

      <p class="photo-label">Фото карточки товара</p>

      <div class="seller-note-box">
        <p class="seller-note">Примечание для продавцов: Выставляя товар, вы обязаны заполнить все поля товара, в противном случае ваш товар будет удален!</p>
      </div>
    </div>

    <div class="center-section">
      <div class="product-image-wrapper">
        <img :src="product.image" :alt="product.title" class="product-image" />
      </div>
      
      <div class="product-description-box">
        <p class="product-description">Описание:</p>
      </div>

      <div class="price-section">
        <span class="price">{{ product.price }} Руб.</span>
      </div>
    </div>

    <div class="right-section">
      <h1 class="product-title">{{ product.title }}</h1>

      <div class="seller-info">
        <img src="/src/assets/icons/saleman.svg" alt="Продавец" class="seller-icon" />
        <span class="seller-name">{{ product.seller }}</span>
      </div>

      <div class="specs">
        <div class="spec-row">
          <span class="spec-label">Год выхода:</span>
          <span class="spec-value">{{ product.releaseYear }}</span>
        </div>
        <div class="spec-row">
          <span class="spec-label">Жанр:</span>
          <span class="spec-value">{{ product.genres?.join(', ') || '-' }}</span>
        </div>
        <div class="spec-row">
          <span class="spec-label">Разработчик:</span>
          <span class="spec-value">{{ product.developer }}</span>
        </div>
        <div class="spec-row">
          <span class="spec-label">Версия:</span>
          <span class="spec-value">{{ product.version }}</span>
        </div>
        <div class="spec-row">
          <span class="spec-label">Язык интерфейса:</span>
          <span class="spec-value">{{ product.language }}</span>
        </div>
      </div>

      <div class="buttons-section">
        <button class="btn btn-primary">Добавить в корзину</button>
        <button class="btn btn-success">Купить сейчас</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true,
    properties: {
      image: String,
      title: String,
      description: String,
      price: [String, Number],
      seller: String,
      releaseYear: [String, Number],
      genres: Array,
      developer: String,
      version: String,
      language: String
    }
  }
})
</script>

<style scoped>
.product-details {
  width: 1205px;
  height: 865px;
  background: #EFEFEF;
  border: 8px solid #A53DFF;
  border-radius: 30px;
  display: flex;
  gap: 30px;
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

.vertical-photo-wrapper {
  width: 280px;
  height: 305px;
  background: #E6E6E6;
  border-radius: 30px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.vertical-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

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

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.product-description-box {
  width: 612px;
  height: 115px;
  background: #E6E6E6;
  border-radius: 20px;
  padding: 16px;
  box-sizing: border-box;
  overflow: hidden;
}

.product-description {
  margin: 0;
  font-size: 20px;
  color: #666;
  line-height: 1.4;
  font-family: 'Montserrat Alternates', sans-serif;
}

.price-section {
  margin-top: 10px;
  background: #E6E6E6;
  padding: 20px;
  border-radius: 30px;
  width: fit-content;
}

.price {
  font-size: 64px;
  color: #A53DFF;
  font-weight: 700;
  font-family: 'Montserrat Alternates', sans-serif;
}

.right-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.product-title {
  margin: 0;
  font-size: 36px;
  background: #E6E6E6;
  padding: 20px;
  border-radius: 30px;
  color: #111;
  font-weight: 600;
  line-height: 1.3;
  word-break: break-word;
  text-align: center;
}

.seller-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 0;
  margin-top: -15px;
}

.seller-icon {
  width: 21px;
  height: 21px;
  flex-shrink: 0;
}

.seller-name {
  font-size: 24px;
  color: #454545;
  font-weight: 500;
}

.specs {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 20px;
  background: #E6E6E6;
  border-radius: 30px;
}

.spec-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  font-size: 24px;
  font-family: 'Montserrat Alternates', sans-serif;
}

.spec-label {
  color: #666;
  flex-shrink: 0;
  font-weight: 500;
}

.spec-value {
  display: none;
}

.seller-note-box {
  background: #F5F5F5;
  padding: 12px;
  border-radius: 20px;
  margin: 0;
  width: 280px;
  box-sizing: border-box;
  align-self: flex-start;
  margin-top: 12px;
}

.seller-note {
  margin: 0;
  font-size: 12px;
  color: #666;
  line-height: 1.3;
  font-family: 'Montserrat Alternates', sans-serif;
  font-weight: 400;
}

.buttons-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  margin-top: auto;
}

.btn {
  width: 435px;
  height: 80px;
  border: none;
  border-radius: 30px;
  font-size: 32px;
  font-family: 'Montserrat Alternates', sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-primary {
  background: #A53DFF;
  color: #FFFFFF;
  box-shadow: 0 8px 20px rgba(165, 61, 255, 0.25);
}

.btn-primary:hover {
  background: #8B1FD9;
  box-shadow: 0 10px 28px rgba(165, 61, 255, 0.35);
}

.btn-primary:active {
  transform: scale(0.98);
}

.btn-success {
  background: #52C41A;
  color: #FFFFFF;
  box-shadow: 0 8px 20px rgba(82, 196, 26, 0.25);
}

.btn-success:hover {
  background: #45A517;
  box-shadow: 0 10px 28px rgba(82, 196, 26, 0.35);
}

.btn-success:active {
  transform: scale(0.98);
}

@media (max-width: 1280px) {
  .product-details {
    width: 100%;
    height: auto;
    flex-direction: column;
  }

  .left-section {
    flex: 1;
  }

  .product-image {
    width: 100%;
  }

  .product-description-box {
    width: 100%;
  }

  .btn {
    width: 100%;
  }
}
</style>
