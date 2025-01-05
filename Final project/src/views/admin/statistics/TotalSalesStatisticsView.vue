<template>
  <article>
    <div class="chartBox">
      <ul class="handleStandardButton">
        <li @click="handleStandard('day')" :class="{ active: standard === 'day' }">일별</li>
        <p class="slash">|</p>
        <li @click="handleStandard('month')" :class="{ active: standard === 'month' }">주별</li>
        <p class="slash">|</p>
        <li @click="handleStandard('year')" :class="{ active: standard === 'year' }">연별</li>
      </ul>
    </div>
    <canvas id="stackedBarChart"></canvas>
  </article>
</template>

<script setup>
import { getTotalSalesStatisticsData } from '@/api/AdministratorModeApi';
import { ref, watch } from 'vue';
import { Chart, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const totalSalesData = ref([]);
const standard = ref('day');
const chartInstance = ref(null);
const chartData = ref({ labels: [], datasets: [] });

// Chart.js 등록
Chart.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, ChartDataLabels);

const dolode = async () => {
  const totalSalesStatisticsDataRes = await getTotalSalesStatisticsData(standard.value);
  totalSalesData.value = totalSalesStatisticsDataRes;

  // 중복되지 않는 날짜 리스트 생성
  const labels = [...new Set(totalSalesData.value.map(item => item.saleDate))];

  // 카테고리별 데이터 생성
  const categoryNames = [...new Set(totalSalesData.value.map(item => item.categoryName))];
  const datasets = categoryNames.map(category => {
    return {
      label: category,
      data: labels.map(date =>
        totalSalesData.value
          .filter(item => item.saleDate === date && item.categoryName === category)
          .reduce((sum, item) => sum + item.categoryTotalPrice, 0),
      ),
      backgroundColor: getRandomColor(category),
    };
  });

  chartData.value = { labels, datasets };
};

const renderChart = () => {
  if (chartInstance.value) {
    chartInstance.value.destroy();
  }

  const ctx = document.getElementById('stackedBarChart');
  chartInstance.value = new Chart(ctx, {
    type: 'bar',
    data: chartData.value,
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: { display: true, text: '총 매출', font: { size: 20 }, color: '#333' },
        datalabels: {
          anchor: 'center',
          align: 'center',
          color: '#555',
          font: { size: 13 },
          formatter: value => {
            return value > 0 ? `₩${value.toLocaleString()}` : '';
          }, // 데이터 레이블 표시 형식
        },
        tooltip: { callbacks: { label: ctx => `₩${ctx.raw.toLocaleString()}` } },
      },
      scales: {
        x: {
          stacked: true,
          title: { display: true, text: '거래날짜' },
        },
        y: {
          stacked: true,
          title: { display: true, text: '총매출 (₩)' },
        },
      },
    },
  });
};

// 랜덤 색상 생성 함수
const getRandomColor = category => {
  const colorName = [
    { name: 'perfume', value: 'rgb(81, 150, 241)' },
    { name: 'Candle', value: 'rgb(241, 81, 81)' },
    { name: 'Diffuser', value: 'rgb(241, 214, 81)' },
  ];
  const colorObject = colorName.find(item => item.name.toLowerCase() === category.toLowerCase());
  return colorObject ? colorObject.value : 'rgb(241, 81, 177)';
};

const handleStandard = selectStandard => {
  standard.value = selectStandard;
  dolode();
};

// 데이터 변경 시 차트 업데이트
watch(chartData, renderChart);

dolode();
</script>

<style scoped>
* {
  font-size: 1.5rem;
}
.handleStandardButton {
  height: 30px;
  font-size: 1.4rem;
  display: flex;
  justify-content: end;
  align-items: center;
}
.handleStandardButton li,
.slash {
  text-align: center;
  background-color: white;
  padding: 10px 0;
}
.handleStandardButton li {
  color: #555;
  cursor: pointer;
  padding: 10px 50px;
}
.handleStandardButton li:hover,
.active {
  text-decoration: underline;
  text-underline-position: under;
}
.active {
  color: #000 !important;
  font-weight: 600;
}
#stackedBarChart {
  background-color: white;
  width: 100%;
  height: auto;
  padding:1%;
}
</style>
