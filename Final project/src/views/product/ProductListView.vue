<script setup>
import { GLOBAL_URL } from '@/api/util'
import ProductComponent from '@/components/ProductComponent.vue'
import axios from 'axios'
import { computed, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const categoryTitle = computed(() => route.params.title)
const categoryId = computed(() => route.params.idx)
const list = ref([])
const sortedList = ref([])  // 정렬된 리스트를 저장할 변수

// 정렬버튼 텍스트
const sortTitle = ref('추천순 ⇅')
const hiddenItem = ref(0);

// 데이터 스크롤 로딩
const loading = ref(false); // 로딩 상태를 추적
const pageNum = ref(1);  // 한 번에 불러올 데이터 개수

watchEffect(async () => {
  console.log('작동')
  try {
    const res = await axios.get(`${GLOBAL_URL}/api/categories/${categoryId.value}`)
    console.log(res)
    if (res.status == 200) {
      list.value = res.data
      
      sortedList.value = [...list.value]  // 데이터를 불러온 후 초기화
      sortTitle.value = '추천순 ⇅'
      hiddenItem.value = 0;
    }
    return res
  } catch (e) {
    console.error('실패', e)
  }
})
const DataLoadScroll = ()=>{
  const container = $refs.scrollContainer;
  if (container.scrollTop + container.clientHeight >= container.scrollHeight - 50 && !loading.value) {
    watchEffect();
  }
}


// 정렬 함수들
const latestDate = () => {sortedList.value = [...list.value].sort((a, b) => new Date(a.registerDate) - new Date(b.registerDate))}
const oldeDate = () => {sortedList.value = [...list.value].sort((a, b) => new Date(b.registerDate) - new Date(a.registerDate))}
const highPrice = () => {sortedList.value = [...list.value].sort((a, b) => b.price - a.price)}
const lowPrice = () => {sortedList.value = [...list.value].sort((a, b) => a.price - b.price)}

// 정렬 기준을 바꿀 때 호출되는 함수
const sortList = (order, index) => {
  hiddenItem.value = index;
  switch (order) {
    case 'latestDate':
      latestDate()
      sortTitle.value = '최신순'
      break
    case 'oldeDate':
      oldeDate()
      sortTitle.value = '오래된 순'
      break
    case 'highPrice':
      highPrice()
      sortTitle.value = '높은 가격순'
      break
    case 'lowPrice':
      lowPrice()
      sortTitle.value = '낮은 가격순'
      break
    case 'basic':
    default:
      sortedList.value = [...list.value]  // 기본적으로 원래 순서로 돌아감
      sortTitle.value = '추천순 ⇅'
  }
}

</script>

<template>
  <section id="product_wrapper" @scroll="DataLoadScroll" ref="scrollContainer">
    <article class="product_gnb">
      <h1 class="product_category_title">{{ categoryTitle }}</h1>
      <ul class="product_category">
        <li><router-link to="/">전체상품</router-link></li>
        <li><router-link to="/">남성향수</router-link></li>
        <li><router-link to="/">여성향수</router-link></li>
        <li><router-link to="/">등등</router-link></li>
      </ul>

      <div class="product_dropdown">
        <p class="product_mount">총 '{{ sortedList.length }}개' 제품</p>
        <div class="sort_container">
          <p class="sort_trigger">{{ sortTitle }}</p>
          <ul class="product_sort">
            <li @click="sortList('basic',0)" :style="{ display: hiddenItem === 0 ? 'none' : '' }">추천순 ⇅</li>
            <li @click="sortList('latestDate',1)" :style="{ display: hiddenItem === 1 ? 'none' : '' }">최신순</li>
            <li @click="sortList('oldeDate',2)" :style="{ display: hiddenItem === 2 ? 'none' : '' }">오래된 순</li>
            <li @click="sortList('highPrice',3)" :style="{ display: hiddenItem === 3 ? 'none' : '' }">높은 가격순</li>
            <li @click="sortList('lowPrice',4)" :style="{ display: hiddenItem === 4 ? 'none' : '' }">낮은 가격순</li>
          </ul>
        </div>
      </div>
    </article>

    <article class="product_list">
      <ProductComponent
        v-for="product in sortedList"
        :key="product.productId"
        :productInfo="product"
      />
      <!-- props -->
    </article>
  </section>
</template>

<style scoped>
/* 전체설정 */
#product_wrapper {
  max-width: var(--main-max-width);
  width: 100%;
  margin: 0 auto;
}
/* 상품 gnd 설정 */
.product_gnb {
  position: relative;
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.product_category_title {
  font-family: var(--font-JacquesFrancois);
  font-size: 2.8rem;
}
.product_category {
  display: flex;
  margin-top: 2rem;
}
.product_category li {
  font-size: 1.4rem;
  margin: 0 1rem;
}

/* dropdown 메뉴 설정 */
.product_dropdown {
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
}
.product_mount{
  font-size: 1.2rem;
  margin-right: 1.2rem;
}
.sort_container {
  cursor: pointer;
}

.product_sort {
  display: none;
  position: absolute; /* 드롭다운 위치 조정 */
  top: 100%; /* 드롭다운을 바로 아래에 표시 */
  right: 0; /* 왼쪽 정렬 */
  background-color: white;
  border: 1px solid #ccc;
  z-index: 900;
  width: 75px;
  text-align: center;
}
.sort_trigger {
  width: 75px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background-color: #ccc;
}
.sort_container:hover .product_sort {
  display: block;
}
.product_sort li {
  padding: 10px;
}
.product_sort li:hover {
  background-color: #f0f0f0;
}


/* 상품 리스트 설정 */
.product_list {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
/* 미디어쿼리 구간 */
@media (max-width: 630px) {
  .product_list {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
