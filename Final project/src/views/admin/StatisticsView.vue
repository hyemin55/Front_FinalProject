<template>
  <section>
    <!-- 총매출 -->
    <article>
      <TotalSalesStatisticsView />
    </article>
    <!-- 순수익 -->
    <article>
      <NetProfitStatisticsView />
    </article>
  </section>
</template>

<script setup>
import NetProfitStatisticsView from './statistics/NetProfitStatisticsView.vue';
import TotalSalesStatisticsView from './statistics/TotalSalesStatisticsView.vue';
</script>

<style scoped></style>
