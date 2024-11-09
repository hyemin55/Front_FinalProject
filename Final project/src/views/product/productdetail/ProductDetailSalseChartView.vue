<script setup>
import { GLOBAL_URL } from '@/api/util';
import axios from 'axios';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { errorMessages } from 'vue/compiler-sfc';
// 1, 25 상품 데이터

const route = useRoute();
const idx = ref(route.params.idx);
const size = ref(0);
console.log(idx.value);
const doLode = async () => {
  try {
    const res = await axios.get(`${GLOBAL_URL}/detail/chart/${idx.value}`);
    if (res.status == 404) {
      console.log('구매내역이 없어요');
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.error('상품을 찾을 수 없습니다.'); // 404 오류일 때
      // 필요에 따라 사용자에게 알림을 띄우거나, 기본 데이터를 반환할 수도 있습니다.
      return { message: '해당 상품을 찾을 수 없습니다.' };
    } else {
      console.error('오류가 발생했습니다:', error.message); // 다른 오류 처리
    }
  }
};

doLode();
</script>

<template>
  <figure id="salseChart">
    <h1>시세</h1>
    <div class="chartCycle">
      <p>1개월</p>
      <p>6개월</p>
      <p>전체</p>
    </div>
    <figcaption>차트상자</figcaption>

    <h2 class="TransactionHistory">체결 거래</h2>
    <div class="TransactionHistoryPosition">
      <ul class="TransactionHistoryTitle">
        <li>옵션</li>
        <li>가격</li>
        <li>거래일</li>
      </ul>
      <ul class="TransactionHistoryContent">
        <li>30ml</li>
        <li>￦ 500,000</li>
        <li>2024-10-28</li>
        <li>30ml</li>
        <li>￦ 500,000</li>
        <li>2024-10-28</li>
        <li>30ml</li>
        <li>￦ 500,000</li>
        <li>2024-10-28</li>
      </ul>
    </div>
  </figure>
</template>

<style scoped>
#salseChart {
}
#salseChart h1 {
  font-size: 2rem;
  margin: 10px 0;
}
.chartCycle {
  display: flex;
  justify-content: space-between;
  width: 100%;
  /* height: 30px; */
  gap: 2%;
}
.chartCycle p:hover {
  background-color: var(--color-main-bloode);
  color: white;
  border: none;
}

.chartCycle p {
  width: 33%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.5px solid var(--color-main-gray);
  border-radius: 7px;
  font-size: 1.4rem;
  padding: 5px 0;
  cursor: pointer;
}
figcaption {
  height: 250px;
  margin: 10px 0;
  background-color: rgb(245, 206, 206);
}
.TransactionHistory {
  margin: 10px 0 0 10px;
  font-size: 1.6rem;
}
.TransactionHistoryPosition {
  margin: 15px 0;
  /* background-color: blueviolet; */
}
.TransactionHistoryTitle {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  /* background-color: pink; */
  margin: 10px 0 15px 0;
  padding: 0 3%;
  font-size: 1.4rem;
}
.TransactionHistoryTitle::after {
  position: absolute;
  content: '';
  border: 0.1px dashed var(--color-main-gray);
  width: 100%;
  bottom: -10px;
}
.TransactionHistoryContent {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  padding: 0 3%;
  font-size: 1.4rem;
}
.TransactionHistoryContent li {
  margin: 5px 0;
  /* background-color: aquamarine; */
}
</style>
