<script setup>
import { GLOBAL_URL } from '@/api/util'
import { useRouter } from 'vue-router';
import { ref } from 'vue'
import { useCartStore } from '@/stores/CartStore';

// 장바구니 추가
const cartStore =useCartStore();
const addToCart = () => {
  console.log("장바구니 추가")
  cartStore.addItem(props.productInfo);
}
// 찜목록 추가
const addToWishlist = () => {
  console.log("찜목록 추가")
}

// 상품리스트에 출력 
const props = defineProps({ // 받아오는props정의
  productInfo: {
    type: Object,
    required: true,
  },
});

const productName = ref(props.productInfo.productName || '상품이름')
const content = ref(props.productInfo.content || '상품설명')
const price = ref(props.productInfo.price || '가격')
// const review_avr = ref('평점');
const reviewCount = ref(props.productInfo.reviewCount || '0')

// useNavigator
const router = useRouter();
const navDetailProduct = () =>{
  router.push(`/productsdetail/${props.productInfo.productId}`);
}
</script>

<template v-for="item in list" :key="item.productId">
  <article class="products">
    <div class="product_img" @click="navDetailProduct" >
      <img :src="`${GLOBAL_URL}/api/file/download/${productInfo.images[0].filename}`" style="height: 100%;" />   
      <ul @click.stop>
        <li class="cart_push" @click.stop="addToCart">
          <img
            class="icon"
            src="../img/icon/free-icon-font-shopping-cart.svg"
            alt=""
          />
        </li>
        <li class="wish_push" @click.stop="addToWishlist">
          <img
            class="icon"
            src="../img/icon/free-icon-font-heart-line.svg"
            alt=""
          />
        </li>
      </ul>
    </div>
    <div class="product_text">
      <ul>
        <li @click="navDetailProduct" class="product_title">{{ productName }}</li>
        <li class="product_content">{{ content }}</li>
      </ul>
      <ul>
        <li class="product_price">￦{{ price }}</li>
        <li class="product_review">
          <span>
            <img
              class="star"
              src="../img/icon/free-icon-font-star.svg"
              alt=""
            />
            별점
          </span>
          (<span>{{ reviewCount }}</span
          >)
        </li>
      </ul>
    </div>
  </article>
</template>

<style scoped>
/* 전체설정 */
.products {
  width: 305px;
  height: 390px;
  border: solid rgba(0, 0, 0, 0.1) 1px;
  border-radius: 6px;
  overflow: hidden;
}
/* 상단_이미지 설정 */
.product_img {
  position: relative;
  width: 100%;
  height: 305px;
  background-color: var(--color-main-Lgray);
  cursor: pointer;
}
.product_img > ul {
  display: flex;
  position: absolute;
  bottom: 0;
  right: 0;
}
.product_img > ul > li {
  width: 45px;
  height: 45px;
  border: 2px solid rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin: 15px;
  cursor: pointer;
  transition: background-color 0.2s;
  background-color: var(--color-main-Lgray);
}
.product_img > ul > li:hover {
  background-color: rgba(20, 20, 20, 0.8);
  border: 2px solid rgba(255, 255, 255, 0.6);
}
.product_img > ul > li:nth-child(1) {
  margin-right: -10px;
}
.cart_push:hover .icon {
  filter: brightness(0) saturate(100%) invert(1); /* 흰색으로 변경 */
}

.icon {
  width: 60%;
  height: auto;
  transition: filter 0.4s; /* 부드러운 전환 효과 */
}
.star {
  width: 11px;
  height: auto;
}

/* 하단_텍스트 설정 */
.product_text {
  width: 100%;
  height: 85px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 10px;
}
.product_text ul:nth-child(1) {
  width: 100%;
  height: 45px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.product_text ul:nth-child(1) > li {
  margin-top: 4px;
}
.product_text ul:nth-child(2) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  width: 100%;
}
.product_text li{
  cursor: pointer;
}
.product_title {
  font-weight: 400;
  font-size: 16px;
}
.product_content {
  font-size: 10px;
}
.product_price {
  font-weight: bold;
  font-size: 19px;
}
</style>
