<script setup>
import { GLOBAL_URL } from '@/api/util';
import HistoryProduct from '@/components/user/HistoryProduct.vue';
import axios from 'axios';
import { onMounted, ref } from 'vue';

const orderList = ref([]);
const getOrderList = async()=>{
  try{
    const res = await axios.get(`${GLOBAL_URL}/myPage/orderList`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        'Content-Type':'application/json'
      }
    })
    orderList.value = res.data.content;
    console.log("오더리스트", orderList.value);
  }catch(error){
    console.error(error)
  }
}
onMounted(()=>{
  getOrderList();
})
</script>

<template>
  <h1 class="orderHistory_title">전체 주문 내역</h1>
  <HistoryProduct :orderList="orderList" :type="'order'" :showBtn="true"></HistoryProduct>
</template>

<style scoped>
.orderHistory_title {
  font-size: 3.2rem;
  font-weight: 400;
  border-bottom: solid 1px #000;
  padding: 20px 0;
  margin-top: 32px;
}
</style>
