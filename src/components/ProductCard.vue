<template>
  <div class="product-card">
    <div class="product-image-wrapper">
      <img :src="product.image" :alt="product.name" class="product-image" />
    </div>
    
    <div class="product-info">
      <h3 class="product-name">{{ product.name }}</h3>
      <div class="product-price">{{ product.price }} Руб.</div>
    </div>

    <button class="add-to-cart-btn" aria-label="Добавить в корзину">В корзину</button>
  </div>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true,
    properties: {
      name: String,
      price: [String, Number],
      image: String
    }
  }
})
</script>

<style scoped>
.product-card{width:240px;height:400px;background:#E2E2E2;border:8px solid #CFCFCF;border-radius:30px;display:flex;flex-direction:column;align-items:center;box-sizing:border-box;padding:20px 12px 12px}

.product-image-wrapper{width:180px;height:245px;background:#F5F5F5;border-radius:20px;overflow:hidden;margin-bottom:12px}

.product-image{width:100%;height:100%;object-fit:cover;display:block}

.product-info{width:100%;text-align:center;margin-bottom:12px}

.product-name{font-size:20px;margin:0 0 6px;color:#A53DFF;font-weight:600;font-family:'Montserrat Alternates', sans-serif;line-height:1.2;overflow-wrap:break-word;hyphens:auto}

.product-price{font-size:20px;color:#A53DFF;font-weight:600;font-family:'Montserrat Alternates', sans-serif}

.add-to-cart-btn{width:204px;height:40px;background:#222222;color:#FFFFFF;border:none;border-radius:30px;font-size:18px;font-family:'Montserrat Alternates', sans-serif;font-weight:600;cursor:pointer;box-shadow:0 4px 12px rgba(0, 0, 0, 0.2);transition:all 0.3s ease}

.add-to-cart-btn:hover{background:#111111;box-shadow:0 6px 16px rgba(0, 0, 0, 0.3)}

.add-to-cart-btn:active{transform:scale(0.98)}

@media (max-width:768px){
  .product-card{width:200px;height:350px}
  .product-image-wrapper{width:160px;height:210px}
  .product-name{font-size:16px}
  .product-price{font-size:16px}
  .add-to-cart-btn{width:170px;height:36px;font-size:16px}
}
</style>
