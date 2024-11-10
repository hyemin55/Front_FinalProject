<script setup>
import { GLOBAL_URL } from '@/api/util';
import axios from 'axios';
import { computed, ref, watchEffect, onMounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import Chart from 'chart.js/auto';

const route = useRoute();
const idx = ref(0);
const totalSalseList = ref([]);
const displayedList = ref([]);
const chartRef = ref(null); // chart element 참조
let chartInstance = null;
const showMore = ref(5)

// 데이터 로드 함수
const doLode = async () => {
  try {
    const response = await axios.get(`${GLOBAL_URL}/detail/chart/${idx.value}`);
    totalSalseList.value = response.data.sort((a, b) => new Date(b.tradeCompletedDate) - new Date(a.tradeCompletedDate));;
    console.log(response.data[0].tradeCompletedDate)
    displayedList.value = totalSalseList.value.slice(0, showMore.value);
    if (totalSalseList.value.length > 0) {
      initializeChart();
    } else {
      console.warn("No transaction history found.");
    }
  } catch (error) {
    console.error("오류가 발생했습니다:", error.message);
  }
};

// x축은 첫 거래일부터 현재까지의 날짜
const generateDateLabels = (startDate) => {
  console.log(startDate)
  const labels = [];
  let date = new Date(startDate);
  const today = new Date();
  while (date <= today) {
    labels.push(new Intl.DateTimeFormat('ko-KR', { month: 'short', day: 'numeric' }).format(date));
    date.setDate(date.getDate() + 30); // 한 달 간격으로 라벨 추가
  }
  return labels;
};

// 차트 초기화 함수
const initializeChart = async() => {
  await nextTick();
  // 기존 차트 인스턴스가 있으면 제거 (재설정)
  if (chartInstance) {
    chartInstance.destroy();
  }
    // 데이터가 존재할 때만 차트를 생성
    if (totalSalseList.value.length > 0) {
      const firstTradeDate = new Date(totalSalseList.value[totalSalseList.value.length - 1].tradeCompletedDate);
      const maxPrice = Math.ceil(Math.max(...totalSalseList.value.map((item) => item.tradePrice)) * 1.1) // 최대 가격의 110%

  chartInstance = new Chart(chartRef.value, {
    type: 'line',
    data: {
      labels: generateDateLabels(firstTradeDate), // X축 라벨
      datasets: [
        {
          label: 'Sales Figures',
          data: totalSalseList.value.map((item) => item.tradePrice),
          borderColor: '#4CAF50',
          backgroundColor: 'rgba(76, 175, 80, 0.2)',
          borderWidth: 2,
          pointRadius: 3,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          labels: {
            font: { size: 14 },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: maxPrice,
          grid: {
            color: 'rgba(200, 200, 200, 0.3)',
          },
          title: {
            display: true,
            text: 'Sales',
            text: 'Sales (₩)',
          },
        },
        x: {
          grid: {
            color: 'rgba(200, 200, 200, 0.3)',
          },
          title: {
              display: true,
              text: 'Date',
            },
        },
      },
    },
  });
}
};

const loadMore = ()=>{
  console.log(totalSalseList.value.length)
  if(totalSalseList.value.length>showMore.value){
  showMore.value += 5
  displayedList.value = totalSalseList.value.slice(0, showMore.value);
  }
}
const closeList = () =>{
  showMore.value == 5
  console.log(showMore.value)
  displayedList.value = totalSalseList.value.slice(0, showMore.value);
}
onMounted(() => {
  doLode();
  watchEffect(() => {
    if (totalSalseList.value.length > 0) {
      initializeChart();
    }
  });
});

watchEffect(() => {
  idx.value = route.params.idx;
  doLode();
});
</script>

<template>
  <figure id="salseChart" v-if="
                                totalSalseList.length > 0">
    <h1>시세</h1>
    <div class="chartCycle">
      <p>1개월</p>
      <p>6개월</p>
      <p>전체</p>
    </div>
    <figcaption>차트상자 
      <canvas ref="chartRef" style="height: 250px; width: 100%;"></canvas>
    </figcaption>

    <h2 class="TransactionHistory">체결 거래</h2>
    <div class="TransactionHistoryPosition">
      <ul class="TransactionHistoryTitle">
        <li>옵션</li>
        <li>가격</li>
        <li>거래일</li>
      </ul>
      <ul class="TransactionHistoryContent" v-for="(list, index) in displayedList" :key="index">
        <li>{{ list.size }} ml</li>
        <li>￦ {{ list.tradePrice.toLocaleString() }}</li>
        <li>{{ list.tradeCompletedDate }}</li>
      </ul>
      <button v-if="showMore && totalSalseList.length > showMore" @click="loadMore">더보기</button>
      <button v-if="showMore && totalSalseList.length <= showMore" @click="closeList">닫기</button>
    </div>
  </figure>
</template>

<style scoped>
#salseChart {
  /* 스타일 수정 */
}
.chartCycle {
  display: flex;
  justify-content: space-between;
  width: 100%;
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
  /* background-color: rgb(245, 206, 206); */
}
.TransactionHistory {
  margin: 10px 0 0 10px;
  font-size: 1.6rem;
}
.TransactionHistoryPosition {
  margin: 15px 0;
}
.TransactionHistoryTitle,
.TransactionHistoryContent {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 0 3%;
  font-size: 1.4rem;
}
</style>
