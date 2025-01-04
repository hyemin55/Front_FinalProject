<template>
  <article>
    <div>
      <ul>
        <li @click="handleStandard('day')">일별</li>
        <li @click="handleStandard('month')">주별</li>
        <li @click="handleStandard('year')">연별</li>
      </ul>
    </div>
  </article>
</template>

<script setup>
import { getTotalSalesStatisticsData } from '@/api/AdministratorModeApi';
import { ref } from 'vue';
const totalSalesData = ref([]);
const standard = ref('day');

const handleStandard = selectStandard => {
  standard.value = selectStandard;
  dolode();
};

const dolode = async () => {
  const totalSalesStatisticsDataRes = await getTotalSalesStatisticsData(standard.value);
  totalSalesData.value = totalSalesStatisticsDataRes;
  console.log(totalSalesData.value);
};
dolode();
</script>

<style scoped></style>
