<template>
  <section>
    <article>
      <AnnouncementComponent />
    </article>
    <article id="sortByAndSearch">
      <select name="sortBy" id="sortBy" v-model="reviewSortBy">
        <option value="">전체</option>
        <option value="category">카테고리</option>
        <option value="productName">상품명</option>
        <option value="starDesc">별점 높은순</option>
        <option value="starAsc">별점 낮은순</option>
      </select>
      <div id="search">
        <input type="search" id="productSearch" placeholder="상품명 검색" />
        <img class="searchIcon" src="@/assets/img/icon/free-icon-font-search-3917132.png" alt="productSearch" />
      </div>
    </article>
    <article id="Inspection">
      <table>
        <thead>
          <tr class="TableHeader">
            <th>No.</th>
            <th colspan="2">상품명</th>
            <th>옵션</th>
            <th>카테고리</th>
            <th>리뷰내용</th>
            <th>평점</th>
            <th>작성자</th>
            <th>작성일자</th>
            <th>도움되요</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          <tr class="TableBody" v-for="(item, index) in reviewList" :key="index">
            <td>{{ item.reviewId }}</td>
            <td><img class="productImages" src="@/assets/img/빵빵덕세안.png" alt="" /></td>
            <td>{{ item.productName }}</td>
            <td>{{ item.productSize }} ml</td>
            <td>{{ item.categoryName }}</td>
            <td>{{ item.content }}</td>
            <td>★ {{ item.star }}</td>
            <td>{{ item.nickName }}</td>
            <td>{{ item.reviewCreationDate }}</td>
            <td>{{ item.favoriteCount }}</td>
            <td class="stateButtons">
              <button class="stateButton" @click="HideButton">숨기기</button>
              <button class="stateButton" @click="DeleteButton">삭제</button>
            </td>
          </tr>
        </tbody>
      </table>
      <article>
        <PageNationComponent :pageNationData="pageNationData" @currentPage="pageUpdate" />
      </article>
    </article>
  </section>
</template>

<script setup>
import { GLOBAL_URL } from '@/api/util';
import AnnouncementComponent from '@/components/admin/AnnouncementComponent.vue';
import PageNationComponent from '@/components/PageNationComponent.vue';
import axios from 'axios';
import { ref, watchEffect } from 'vue';

const reviewList = ref([]);
const reviewSortBy = ref('');
const totalCount = ref(0);
const reviewDataRes = ref([]);
const pageNumber = ref(0);
const pageNationData = ref('');
const pageSize = ref(20);

const pageNation = () => {
  pageNationData.value = {
    totalCount: totalCount.value,
    pageSize: pageSize.value,
  };
};

const pageUpdate = pageNum => {
  pageNumber.value = pageNum;
  // dolode()
};

const dolode = async () => {
  if (reviewSortBy.value === '') {
    reviewDataRes.value = await axios.get(`${GLOBAL_URL}/admin/review/management`, {
      params: {
        pageNum: pageNumber.value,
        size: pageSize.value,
      },
    });
  } else {
    reviewDataRes.value = await axios.get(`${GLOBAL_URL}/admin/review/management`, {
      params: {
        sort: reviewSortBy.value,
        pageNum: pageNumber.value,
        size: pageSize.value,
      },
    });
  }
  reviewList.value = reviewDataRes.value.data.reviewManageDtos.content;
  totalCount.value = reviewDataRes.value.data.reviewCount;
  pageNation();
};

watchEffect(() => {
  dolode();
});
</script>

<style scoped>
#Inspection {
  background-color: white;
  width: 100%;
  height: auto;
  border-radius: 15px;
  padding: 5px 0 20px 0;
  text-align: center;
}
input,
select,
option {
  border: none;
  background-color: unset;
}
#sortByAndSearch {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 30px;
  margin: 20px 0 10px 0;
}
#sortBy,
#search {
  background-color: white;
  border-radius: 10px;
  padding: 0 10px 0 5px;
  align-items: center;
}
#sortBy {
  width: 150px;
}
#search {
  width: 30%;
  display: flex;
  justify-content: space-between;
}
#productSearch {
  width: 100%;
}
.searchIcon {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.TableHeader {
}
.productImages {
  width: 45px;
  height: 45px;
  padding: 2px;
  border: 0.5px solid var(--color-main-Lgray);
  border-radius: 5px;
}
table {
  width: 100%;
  font-size: 1.4rem;
}
td {
  height: 50px;
  border-bottom: 0.5px solid var(--color-main-gray);
}
th {
  border-bottom: 2px solid var(--color-main-gray);
  height: 40px;
}
.TableBody > td:nth-child(6) {
  text-align: left;
}
.stateButtons {
}
.stateButton {
  background-color: var(--color-main-gray);
  padding: 10px;
  border-radius: 10px;
  margin: 0 5px;
}
</style>
