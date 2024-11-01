<script setup>
import { GLOBAL_URL } from '@/api/util'
import PayMethod from '@/views/payment/PayMethodView.vue'
import PayMoney from '@/views/payment/PayMoneyView.vue'
import PayProduct from '@/views/payment/PayProductView.vue'
import PayUserInfo from '@/views/payment/_PayUserInfoView.vue'
import axios from 'axios'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
// JSON 문자열을 객체로 변환
// const cartItems = route.params.item ? route.params.item.split(',') : [];
const route = useRoute()
const cartData = JSON.parse(decodeURIComponent(route.query.item))
console.log('받은 배열', cartData.purchaseProductDtos)
console.log('받은 총 가격', cartData.totalPrice)

onMounted(async () => {
  const res = await axios.post(`${GLOBAL_URL}/api/purchase/create`, cartData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  })
  console.log(res)
})
</script>

<template>
  <section id="payment_wrapper">
    <h2>주문자 정보</h2>
    <PayUserInfo></PayUserInfo>

    <h2>주문 상품</h2>
    <PayProduct></PayProduct>

    <h2>결제금액</h2>
    <PayMoney></PayMoney>

    <h2>결제수단</h2>
    <PayMethod></PayMethod>
  </section>
</template>

<style scoped>
#payment_wrapper {
  max-width: 1064px;
  width: 100%;
  margin: 0 auto;
}
h2 {
  margin: 30px 0 10px 0;
}
</style>
