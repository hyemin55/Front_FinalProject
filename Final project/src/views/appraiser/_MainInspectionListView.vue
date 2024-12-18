<template>
  <section>
    <article>
      <AnnouncementComponent />
    </article>
    <article id="Inspection" v-for="(item, index) in InspectionList" :key="index">
      <MainInspectionItemView :item="item" />
    </article>

    <article>
      <PageNationComponent v-if="totalCount > 0" :pageNationData="pageNationData" @currentPage="pageUpdate" />
    </article>
  </section>
</template>

<script setup>
import { GLOBAL_URL } from '@/api/util';
import AnnouncementComponent from '@/components/admin/AnnouncementComponent.vue';
import axios from 'axios';
import { onMounted, reactive, ref } from 'vue';
import PageNationComponent from '@/components/PageNationComponent.vue';
import MainInspectionItemView from './MainInspectionItemView.vue';

const totalCount = ref(0);
const pageNumber = ref(0);
const InspectionList = ref([]);

// 부모 컴포넌트의 반응형 변수가 바뀌면 자식 컴포넌트는 재랜더링이 된다.

const pageNationData = reactive({
  totalCount: totalCount.value,
  pageSize: 5,
});

// 페이지 넘버가 바뀌면 dolode를 호출해야한다.
const pageUpdate = pageNum => {
  pageNumber.value = pageNum;
  // dolode();
};

const dolode = async () => {
  console.log('pageNum', pageNumber.value);
  const countRes = await axios.get(`${GLOBAL_URL}/api/inspection/pending-sale/total-count`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  });
  totalCount.value = countRes.data;
  pageNationData.totalCount = totalCount.value;
  // 검수 합격 등급 리스트

  try {
    // 판매 신청 리스트
    const InspectionListRes = await axios.get(`${GLOBAL_URL}/api/inspection/list`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
      params: {
        pageNum: pageNumber.value,
      },
    });

    InspectionList.value = InspectionListRes.data.map(item => ({
      ...item,
      brandKeyword: '',
      productKeyword: '',
      brandSuggestions: [],
      productSuggestions: [],
      selectedBrand: '',
      selectedProduct: [],
      productNameInput: '',
      brandNameInput: '',
      categoryId: 0,
      inspectionSize: 0,
      inspectionSellingPrice: 5000,
      TestResult: '',
      PassGrade: [],
      FailReason: [],
      Content: '',
    }));
    console.log('InspectionList.value', InspectionList.value);
  } catch (error) {
    console.error('Error loading inspection list:', error);
  }
};
onMounted(() => {
  dolode();
});
</script>

<style scoped>
#Inspection {
  background-color: white;
  width: 100%;
  height: auto;
  margin: 30px 0;
  border-radius: 15px;
  border: 5px solid var(--color-main-bloode);
}
</style>
