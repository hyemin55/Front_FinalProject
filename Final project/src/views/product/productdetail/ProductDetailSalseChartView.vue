<script setup>
import { GLOBAL_URL } from '@/api/util';
import axios from 'axios';
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import Chart from 'chart.js/auto';
// 1, 25 상품 데이터

const route = useRoute();
const idx = ref(0);
const totalSalseList = ref([null]);
console.log(idx.value);
const doLode = async () => {
  try {
    totalSalseList.value = await axios.get(`${GLOBAL_URL}/detail/chart/${idx.value}`);
    console.log(totalSalseList.value.data);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.error('상품을 찾을 수 없습니다.', totalSalseList.value); // 404 오류일 때
      // 필요에 따라 사용자에게 알림을 띄우거나, 기본 데이터를 반환할 수도 있습니다.
      return { message: '해당 상품을 찾을 수 없습니다.' };
    } else {
      console.error('오류가 발생했습니다:', error.message); // 다른 오류 처리
    }
  }
};

const ctx = document.getElementById('myChart');

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

watchEffect(() => {
  idx.value = route.params.idx;
  doLode();
});
</script>

<template>
  <figure id="salseChart">
    <h1>시세</h1>
    <div class="chartCycle">
      <p>1개월</p>
      <p>6개월</p>
      <p>전체</p>
    </div>
    <figcaption>차트상자 <canvas id="myChart"></canvas></figcaption>

    <h2 class="TransactionHistory">체결 거래</h2>
    <div class="TransactionHistoryPosition">
      <ul class="TransactionHistoryTitle">
        <li>옵션</li>
        <li>가격</li>
        <li>거래일</li>
      </ul>
      <ul class="TransactionHistoryContent" v-for="(list, index) in totalSalseList.data" :key="index">
        <li>{{ list.size }} ml</li>
        <li>￦ {{ list.tradePrice.toLocaleString() }}</li>
        <li>{{ list.tradeCompletedDate }}</li>
      </ul>
      <ul class="TransactionHistoryContent" v-if="totalSalseList.data == null || totalSalseList.data == 0">
        <p>체결거래 내역이 없습니다 ㅠㅡㅠ</p>
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
