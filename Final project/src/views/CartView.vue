<script setup>
import CartProductComponent from '@/components/CartProductComponent.vue';
import { useCartStore } from '@/stores/CartStore';
const cartStore = useCartStore();
const cart = cartStore.cartItems;
</script>

<template>
  <section id="cart_wrapper">
    <article class="cart_product">
      <CartProductComponent 
      v-for="(item, index) in cart" 
      :key="index" 
      :productInfo="item" />
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
