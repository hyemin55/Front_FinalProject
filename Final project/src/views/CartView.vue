<script setup>
import CartProductComponent from '@/components/CartProductComponent.vue';
import { useCartStore } from '@/stores/CartStore';
import { ref, watchEffect } from 'vue';

const cartStore = useCartStore();
const cart = cartStore.cartItems;

const allChecked = ref(false);

const deleteToCart = () => {
  console.log('삭제')
};

// 전체 선택 체크박스 토글
const toggleAllCheck = () => {
  allChecked.value = allChecked.value; // 체크 상태 반전
  console.log(allChecked.value); 
  // watchEffect(() => {
    
  // })
  cartStore.toggleAllCheck(allChecked.value); // Pinia Store에서 상태 업데이트
};
</script>

<template>
  <section id="cart_wrapper">
    <article class="cart_product">
      <ul class="cart_ctroll">
        <li><input @change="toggleAllCheck" v-model="allChecked" type="checkbox" name="allCheck" id="allCheck">전체선택</li>
        <li><button @click="deleteToCart">삭제</button></li>
      </ul>

      <CartProductComponent 
      v-for="(item, index) in cartStore.cartItems" 
      :key="index" 
      :productInfo="item"
      :isChecked="item.isChecked" />
    </article>

    <article class="cart_total_price">
      <div>
        <h1 class="cart_title">장바구니</h1>

        <div id="calculate">
          <ul class="product_price price_list">
            <li>상품 금액</li>
            <li>3,000원</li>
          </ul>
          <ul class="delivery_pirce price_list">
            <li>배송비</li>
            <li>5,000원</li>
          </ul>
        </div>
        
        <div id="total_amount">
          <ul class="price_list">
            <li style="font-weight: 800;">총 결제 금액</li>
            <li>8,000원</li>
          </ul>
        </div>        
        
        <button class="payment">결제하기</button>
      </div>
    </article>
  </section>
</template>


<style scoped>
/* 장바구니 전체설정 */
#cart_wrapper{
  max-width: var(--main-max-width);
  width: 100%;
  margin: 0 auto;
  height: calc(100vh - 100px);
  display: flex;
}

/* 장바구니 상품 설정 */
.cart_product{
  position: relative;
  width: 670px;
  height: 100%;
  background-color: aliceblue;
  overflow-y: scroll;
}
.cart_ctroll{
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 80px;
  padding: 20px;
}

/* 결제금액 설정 */
.cart_total_price{
  position: relative;
  width: 610px;
  height: 100%;
  background-color: antiquewhite;
}
.cart_total_price>div{
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -291px;
  margin-left: -147.5px;
  width: 295px;
  height: 382px;
}
.cart_title{
  font-size: 2.4rem;
  font-weight: 800;
  padding: 2.0rem;
}
#calculate{
  border-top: 1.5px solid black;
  border-bottom: 1.5px solid black;
  padding: 10px 0;
}
.price_list{
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: auto;
}
.price_list li{
  font-size: 1.8rem;
  padding: 2.0rem;
}
.price_list li:nth-child(2){
  font-weight: 800;
}
#total_amount{
  margin: 10px 0;
}
.payment{
  width: 100%;
  height: 62px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgb(146, 146, 146);
  border-radius: 5px;
  font-size: 16px;
}
</style>
