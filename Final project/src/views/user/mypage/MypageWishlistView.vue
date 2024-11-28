<script setup>
import { GLOBAL_URL } from '@/api/util';
import { wishClick, wishList } from '@/api/wishApi';
import { useCartStore } from '@/stores/CartStore';
import { ref, watchEffect } from 'vue';

const cartStore = useCartStore();
const isChecked = ref(false);



// 찜 목록 정보를 DB에서 가져옴.
const data = ref();
const LoadingwishList = async()=>{
  const wishListData = await wishList();
  data.value = wishListData; 
  console.log(data.value)
}

// 화면 랜더링
watchEffect(()=>{
  LoadingwishList();
})

// 찜목록 삭제
const wishDelete = async(productId)=>{
  await wishClick(productId)
  console.log('찜목록 삭제')  
  await LoadingwishList();
}

// 장바구니 담기
// 로그인 되고 마이페이지에서 진행이 때문에 무조건 DB로 들어가고 머지, 안그럼 오류
const addCart = (productId)=>{
  console.log('장바구니 담기')
  // cartStore.addItem(productId);
}
</script>


<template>
  <div>
    <h1 class="wishlist_title">찜 목록</h1>
    <div class="product_select">
      <p><input id="allcheck" type="checkbox" /><label for="allcheck">전체 선택</label></p>
      <p>선택 삭제하기</p>
    </div>

    <!-- 상품 컴포넌트 -->
    <div class="wish_product" v-for="(product, index) in data" key="index">
      <input class="pro_check" type="checkbox" v-model="isChecked"/>

      <div class="product_box">
        <div class="img_box">
          <img :src="`${GLOBAL_URL}/api/file/download/${product.mainImage}`" alt="" />
        </div>
        <ul class="content_box">
          <li>상품명 : {{ product.productName }}</li>
          <li>가격 : {{ product.productPrice }}</li>
          <li>옵션 : {{ product.size }}</li>
        </ul>
      </div>
      <div class="btn">
        <div class="cart_btn" @click="addCart(product.productId)">장바구니 담기</div>
        <div class="delet_btn" @click="wishDelete(product.productId)">삭제</div>
      </div>
    </div>
  
  </div>
</template>

<style scoped>
/* 전체설정 */
.wishlist_title {
  font-size: 3.2rem;
  font-weight: 400;
  border-bottom: solid 1px #000;
  padding: 20px 0;
  margin-top: 32px;
}
.product_select {
  width: 100%;
  height: 57px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #000;
  padding: 0 7px;
}
.product_select p {
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 1.4rem;
}
.product_select p input {
  margin: 0 5px;
}
.product_select p label {
  cursor: pointer;
}

/* 상품컴포넌트 설정 ############################ */
.wish_product {
  position: relative;
  width: 100%;
  height: 185px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 4px solid var(--color-main-gray);
}
.pro_check {
  position: absolute;
  top: 12px;
  left: 5px;
}
/* 상품설정 */
.product_box {
  display: flex;
  align-items: center;
  height: 100%;
}
.img_box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 240px;
  height: 100%;
}
.img_box img {
  height: 80%;
  width: auto;
  background-color: var(--color-main-pink);
  border-radius: 1.5rem;
}
.content_box li:nth-child(1) {
  font-size: 2rem !important;
}
.content_box li {
  font-size: 1.6rem;
  margin: 10px 0;
}
/* 버튼설정 */
.btn > div {
  width: 150px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-align: center;
  font-size: 1.3rem;
  border: 1px solid var(--color-main-gray);
  border-radius: 0.7rem;
  margin: 5px 0;
}
.btn > div:hover {
  background-color: #000;
  color: #fff;
}
</style>
