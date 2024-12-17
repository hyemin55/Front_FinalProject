<script setup>
import { GLOBAL_URL } from '@/api/util';
import { useRouter } from 'vue-router';
import { computed, ref, watch, watchEffect } from 'vue';
import { useCartStore } from '@/stores/CartStore';
import axios from 'axios';
import { useUserStore } from '@/stores/Login';
import { wishClick } from '@/api/wishApi';
import { addCartDatabase } from '@/api/cartApi';
import { useWishStore } from '@/stores/WishStore';
// import { useQueryClient } from '@tanstack/vue-query';
// import { getProductData, getReviewData, getReviewImageList, getSlideImages, getstarCounting } from '@/api/productDetail';


// 로그인 pinia
const userStore = useUserStore();
const userLogin = computed(() => userStore.loginCheck);


// 장바구니 추가
// const cartStore = useCartStore();
// const addToCart = () => {
//   console.log('props.productInfo', props.productInfo);
//   cartStore.addItem(props.productInfo);
//   if (userLogin.value) {
//     const data = {
//       productId: props.productInfo.productId,
//       quantity: 1,
//     };
//     addCartDatabase(data);
//     alert('장바구니에 담았습니다.');
//   }
// };


// 상품리스트에 출력
const props = defineProps({
  // 받아오는props정의
  productInfo: {
    type: Object,
    required: true,
  },
});
const productName = ref(props.productInfo.productName || '상품이름');
const content = ref(props.productInfo.content || '상품설명');
const price = ref(props.productInfo.price || '가격');
const size = ref(props.productInfo.size || '사이즈');
// const review_avr = ref('평점');
const reviewCount = ref(props.productInfo.reviewCount || '0');
const brand = ref(props.productInfo.brand || 'Santa Maria Novella');

// useNavigator
const router = useRouter();
const navDetailProduct = () => {
  router.push({
    path: `/masonry/${props.productInfo.productId}`,
    query: {
      // 여기서 상품의 하나에 대한 카테고리 아이디를 넘겨준다.
      title: productName.value,
      brand: brand.value
    },
  });
};

// 찜목록 추가 #############################################
const redHeart = ref(false);
const iconClick = ref(false); // 찜하트 css
const wishStore = useWishStore();

watchEffect(()=>{
  const wishProduct = wishStore.wishList.find(
    item => item === props.productInfo.productId
  );
  console.log(wishProduct)
  if(wishProduct){
    redHeart.value = true;
    iconClick.value = true;
  }else{
    redHeart.value = false;
    iconClick.value = false;
  }
})

const addToWishlist = async () => {
  if(userLogin.value){
    // DB통신(추가,삭제)
    await wishClick(props.productInfo.productId);
    // Pinia(추가, 삭제)
    wishStore.makeWishList(props.productInfo.productId);
  }else{
    alert('로그인 후 사용이 가능합니다.')
    router.push({path: '/login2' });
  }
};
// ##########################################################

</script>

<template>
  <article class="products">
    <div class="product_img" @click="navDetailProduct">
      <p v-if="size > 50" class="brandNew">Brand new</p>
      <img :src="`${GLOBAL_URL}/api/file/download/${productInfo.images[0].filename}`" style="height: 90%" />
      <ul @click.stop>
        <!-- <li class="cart_push" @click.stop="addToCart"><img class="icon" src="@/assets/img/icon/free-icon-font-shopping-cart.svg" alt="" /></li> -->
        <li class="wish_push" :class="{ active: redHeart }" @click.stop="addToWishlist">
          <img class="icon" src="@/assets/img/icon/free-icon-font-heart-line.svg" alt="" :style="{ display: iconClick ? 'none' : 'flex' }" />
          <img class="icon" src="@/assets/img/icon/free-icon-font-heart.svg" alt="" :style="{ display: iconClick ? 'flex' : 'none' }" />
        </li>
      </ul>
    </div>
    <div class="product_text">
      <ul>
        <li @click="navDetailProduct" class="product_title">
          {{ productName }}
        </li>
        <li class="product_content">{{ content }}</li>
      </ul>
      <ul>
        <li class="product_price">￦ 190,000 ~ {{ price.toLocaleString() }}</li>
        <li class="product_review">
          <span>
            <img class="star" src="@/assets/img/icon/free-icon-font-star.svg" alt="" />
            4.5
          </span>
          (<span>{{ reviewCount }}</span
          >)
        </li>
      </ul>
    </div>
  </article>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
/* 전체설정 */
.products {
  max-width: 305px;
  width: 100%;
  /* height: 400px; */
  border: solid rgba(0, 0, 0, 0.1) 1px;
  border-radius: 6px;
  overflow: hidden;
  margin: 10px 0;
}
/* 상단_이미지 설정 */
.product_img {
  position: relative;
  width: 100%;
  height: 305px;
  background-color: var(--color-main-Lgray);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.product_img:hover > ul li {
  opacity: 1;
}
.product_img > ul {
  display: flex;
  position: absolute;
  bottom: 0;
  right: 0;
}
.product_img > ul > li {
  width: 35px;
  height: 35px;
  border: 2px solid rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin: 12px;
  cursor: pointer;
  transition: background-color 0.2s;
  background-color: var(--color-main-Lgray);
  transition: opacity 0.2s;
  opacity: 0;
}
.product_img > ul > li:hover {
  background-color: var(--color-main-gray);
  /* background-color:#fdf4f1; */
  border: 2px solid rgba(0, 0, 0, 0.05);
}

.wish_push.active {
  background-color: var(--color-main-gray);
  border: 2px solid rgba(0, 0, 0, 0.05);
  opacity: 1;
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
  /* height: 85px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
}
.product_text ul:nth-child(1) {
  width: 100%;
  /* height: 45px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.product_text ul:nth-child(2) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* height: 40px; */
  width: 100%;
}
.product_text li {
  cursor: pointer;
}
.product_title {
  font-weight: 500;
  font-size: 1.65rem;
  font-weight: 600;
  letter-spacing: -0.34px;
  color: #1f1f1f;
}
.product_content {
  font-size: 1rem;
  letter-spacing: -0.034rem;
  line-height: 1.4rem;
  margin: 7px 0 5px 0;
  color: var(--color-text-gray);
}
.product_price {
  letter-spacing: -0.034rem;
  font-weight: bold;
  font-size: 1.85rem;
  color: #1f1f1f;
}
.size {
  /* font-weight: 400; */
}
.brandNew{
  position: absolute;
  top: 8px;
  left: 8px;
  padding: 5px 8px;
  border-radius: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: rgb(247, 247, 247);
  box-shadow: inset -3px -3px 3px #ffffff73, inset 1px 1px 3px rgba(94, 104, 121, .288);
  font-family: "Playfair Display", serif;
  font-size: 1.2rem;
  font-weight: 600;
  color: orange;
  /* color: rgb(255, 188, 64); */
  /* color: var(--color-main-bloode); */
}

</style>
