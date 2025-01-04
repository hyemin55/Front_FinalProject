<script setup>
import { GLOBAL_URL } from '@/api/util';
import axios from 'axios';
import { ref } from 'vue';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// 계속 쇼핑하기
const router = useRouter();
const gohome = () => {
  router.push({ name: 'main' });
};

const buyerInfoRef = ref(null);

// 주무자 정보 받아오기
const route = useRoute();
const merchantUid = route.query.merchant_uid;
console.log('merchantUid:', merchantUid);

onMounted(async () => {
  const res = await axios.get(`${GLOBAL_URL}/api/payment/orderCompleted?merchant_uid=${merchantUid}`);
  buyerInfoRef.value = res.data;
  console.log(buyerInfoRef.value);
});
</script>

<template>
  <section class="order_complete_wrapper" v-if="buyerInfoRef">
    <article class="order_complete_title">
      <ul>
        <li>상품 주문이 완료되었습니다.</li>
        <li>주문번호 : {{ buyerInfoRef.purchaseId }}</li>
        <li @click="gohome()">계속 쇼핑하기</li>
      </ul>
    </article>

    <article class="order_complete_delivery">
      <ul>
        <li>주문자 : {{ buyerInfoRef.buyerName }}</li>
        <li>배송지 : {{ buyerInfoRef.buyerAddr }} {{ buyerInfoRef.buyerPostcode }}</li>
      </ul>
    </article>

    <article class="order_complete_product">
      <p>상품정보</p>
      <ul v-for="item in buyerInfoRef.usedProductResDtos" :key="item.idx">
        <li>
          <img
            :src="`${GLOBAL_URL}/api/file/download/${item.userSaleImages[0].filename}`"
            alt=""
            class="userReviewImg"
          />
        </li>
        <li>상품명 : {{ item.productName }}</li>
        <li>브랜드 : {{ item.brandName }}</li>
        <li>사이즈 : {{ item.size }}</li>
        <li>등급 : {{ item.verifiedSaleGradeType }}</li>
      </ul>

      <p>결제정보</p>
      <ul>
        <li>주문금액 : {{ buyerInfoRef.amount }}</li>
        <li>배송비 : 0</li>
        <li>결제금액 : {{ buyerInfoRef.amount }}</li>
      </ul>
    </article>
  </section>
</template>

<style scoped>
/* 전체설정 */
.order_complete_wrapper {
  max-width: var(--main-max-width);
  width: 100%;
  margin: 0 auto;
  text-align: center;
}
/* 주문완료 타이틀 */
.order_complete_title {
  text-align: center;
  border-bottom: 2px solid #e2e2e2;
  padding: 20px 0;
}
.order_complete_title ul {
  margin-top: 20px;
}
.order_complete_title ul li {
  margin: 5px 0;
}
.order_complete_title ul li:nth-child(1) {
  font-size: 2.7rem;
}
.order_complete_title ul li:nth-child(2) {
  font-size: 1.5rem;
}
.order_complete_title ul li:nth-child(3) {
  font-size: 1.4rem;
  background-color: aliceblue;
  display: inline-block;
  padding: 8px 10px;
  border-radius: 1.5rem;
  cursor: pointer;
}
/* 주문완료 배송지 */
.order_complete_delivery {
  width: 50%;
  margin: 0 auto;
  text-align: left;
}

/* 주문완료 상품 */
.order_complete_product {
  width: 50%;
  margin: 0 auto;
  text-align: left;
}
</style>
