<script setup>
import { GLOBAL_URL } from '@/api/util';
import PageNationComponent from '@/components/PageNationComponent.vue';
import HistoryProduct from '@/components/user/HistoryProduct.vue';
import MypageEmptyComponent from '@/components/user/MypageEmptyComponent.vue';
import SaleProductModal from '@/components/user/SaleProductModal.vue';
import axios from 'axios';
import { onMounted, ref } from 'vue';

const saleModal = ref(false);
const showModal = () => {
  saleModal.value = !saleModal.value;
};

const saleList = ref([]);
const getSaleList = async () => {
  try {
    const res = await axios.get(`${GLOBAL_URL}/myPage/saleList`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    saleList.value = res.data;
    console.log('세일리스트', saleList.value);
  } catch (error) {
    console.error(error);
  }
};
onMounted(() => {
  getSaleList();
  pageNation();
});

const Rendering = () => {
  getSaleList();
};

// 페이지네이션
const totalCount = ref(50);
const pageSize = ref(5);
const pageNumber = ref(0);
const pageNationData = ref('');

const pageUpdate = pageNum => {
  pageNumber.value = pageNum;
};
const pageNation = () => {
  pageNationData.value = {
    totalCount: totalCount.value,
    pageSize: pageSize.value,
  };
};
</script>

<template>
  <div class="salesWrapper">
    <h1 class="orderHistory_title">전체 판매 내역</h1>
    <h2 @click="showModal" class="salesApplication">
      판매 신청하기
      <img src="@/assets/img/wing_money.gif" alt="" />
    </h2>
  </div>

  <article v-if="saleList.length > 0"> 
    <HistoryProduct
      :saleList="saleList"
      :type="'sale'"
      :showBtn="false"
      @UpdateRendering="Rendering"
      @DeleteRendering="Rendering"
    ></HistoryProduct>
    <PageNationComponent :pageNationData="pageNationData" @currentPage="pageUpdate" />
  </article>
  <article v-else>
    <MypageEmptyComponent></MypageEmptyComponent>
  </article>


  <SaleProductModal v-if="saleModal" @closeModal="showModal" />
  
</template>

<style scoped>
.salesWrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 1px #000;
  padding: 20px 0;
  margin-top: 32px;
}
.orderHistory_title {
  font-size: 3.2rem;
  font-weight: 400;
}
.salesApplication {
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-main-bloode);
  cursor: pointer;
  animation: blink 8s infinite;
  display: flex;
  align-items: center;
  overflow: hidden;
}
.salesApplication img {
  height: 36px;
  width: auto;
  margin-left: 6px;
}
.salesApplication:hover img {
  animation: ani1 0.7s;
}

/* 애니메이션을 정의 */
@keyframes blink {
  0% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  86% {
    opacity: 0;
  }
  90% {
    opacity: 1;
  }
  95% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes ani1 {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(100px, -100px);
  }
  50.1% {
    transform: translate(-100px, 100px);
  }
  100% {
    transform: translate(0, 0);
  }
}
</style>
