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
import { getNetProfitStatisticsData } from '@/api/AdministratorModeApi';
import { ref } from 'vue';
const netProfitData = ref([]);

const standard = ref('day');

const handleStandard = selectStandard => {
  standard.value = selectStandard;
  dolode();
};

const dolode = async () => {
  const netProfitStatisticsDataRes = await getNetProfitStatisticsData(standard.value);
  netProfitData.value = netProfitStatisticsDataRes;
  console.log(netProfitData.value);
};
dolode();
</script>

<style scoped></style>
