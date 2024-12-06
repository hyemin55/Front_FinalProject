<!-- <template>
  <article>
    <ul id="totalPages">
      <li @click="backPage">이전</li>
      <li class="totalPages" v-for="pageNum in endPage - startPage + 1" v-bind:key="pageNum" @click="goToPage(startPage + pageNum - 1)" :class="{ active: activePage(pageNum) }">
        {{ startPage + pageNum - 1 }}
        {{ startPage }}
        {{ pageNum }}
      </li>
      <li @click="nextPage">다음</li>
    </ul>
  </article>
</template>

<script setup>
import { getViewCurrentPage } from '@/api/productDetailApi';
import { useUserStore } from '@/stores/Login';
import { ref, watch } from 'vue';

const currentPage = ref(1);
const totalPages = ref(10);
const currentPageGroup = ref(0);
let flag = 0;
const totalPageGroup = ref(0);
const pageSize = 5;
const startPage = ref(0);
const endPage = ref(0);

// 이전페이지
const backPage = () => {
  if (currentPageGroup.value <= 0) {
    console.log('첫페이지입니다.');
    alert('첫페이지입니다.');
    return;
  }
  currentPage.value = startPage.value - 10;
  viewCurrentPage();
};

// 다음페이지
const nextPage = () => {
  if (currentPageGroup.value >= totalPageGroup.value) {
    console.log('마지막페이지입니다.');
    alert('마지막페이지입니다.');
    return;
  }
  currentPage.value = endPage.value + 1;
  viewCurrentPage();
};

// 선택페이지
const goToPage = page => {
  console.log('page', page);
  if (currentPage.value == page) {
    console.log('현재페이지입니다.');
    return;
  }
  currentPage.value = page;
  viewCurrentPage();
};

// 현재페이지
const viewCurrentPage = async () => {
  currentPageGroup.value = Math.floor((currentPage.value - 1) / 10);
  if (currentPageGroup.value == currentPage.value - 1 && flag) {
    flag = true;
    return;
  } else {
    reviewList.value = await getViewCurrentPage(idx.value, currentPage.value - 1);
    totalPages.value = Math.ceil(reviewCount.value / pageSize);
    totalPageGroup.value = Math.floor(totalPages.value / 10);
    startPage.value = currentPageGroup.value * 10 + 1;
    endPage.value = Math.min(startPage.value + 9, totalPages.value);
    // console.log(reviewCount.value);
  }
};

// 선택된 페이지번호에 CSS 설정
const activePage = pageNum => {
  if (currentPageGroup.value <= 0) {
    return currentPage.value === pageNum;
  } else {
    return currentPage.value - 1 - currentPageGroup.value * 10 === pageNum - 1;
  }
};

// 주소줄의 idx값이 바뀌면 리뷰리스트와 페이지네이션 변경을 위해 재통신 필요.
watch(
  () => props.reviewCount, // source로 배열을 사용하여 다중 변수를 추적
  newReviewCount => {
    reviewCount.value = newReviewCount;
    viewCurrentPage();
  },
  dolode(),
);
</script>

<style scoped>
#totalPages {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 30px;
  /* background-color: rgb(161, 160, 158); */
  font-size: 1.3rem;
  /* gap: 1%; */
}
#totalPages li {
  cursor: pointer;
  padding: 1%;
}
.totalPages {
  /* background-color: rgb(236, 207, 172); */
  display: flex;
  align-items: center;
  justify-content: center;
  /* width: 10%; */
  /* margin: 0 1%; */
}
.totalPages.active {
  color: var(--color-main-bloode);
  font-weight: 600;
  text-decoration: underline;
}
</style> -->
