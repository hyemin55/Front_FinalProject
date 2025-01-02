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
        <input
          type="search"
          id="productSearch"
          placeholder="상품명 검색"
          v-model="searchKeyword"
          @keydown.enter="reviewSearchKeyword"
        />
        <labe>
          <img
            class="searchIcon"
            @click="reviewSearchKeyword"
            src="@/assets/img/icon/free-icon-font-search-3917132.png"
            alt="productSearch"
          />
        </labe>
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
            <td><img class="productImages" :src="`${GLOBAL_URL}/api/file/download/${item.reviewImage}`" alt="" /></td>
            <td>{{ item.productName }}</td>
            <td>{{ item.productSize }} ml</td>
            <td>{{ item.categoryName }}</td>
            <td>{{ item.content }}</td>
            <td>★ {{ item.star }}</td>
            <td>{{ item.nickName }}</td>
            <td>{{ dateTimeFormat(item.reviewCreationDate) }}</td>
            <td>{{ item.favoriteCount }}</td>
            <td class="stateButtons">
              <!-- <button class="stateButton" @click="HideButton">숨기기</button> -->
              <button class="stateButton" @click="DeleteButton(item)">삭제</button>
            </td>
          </tr>
        </tbody>
      </table>
    </article>
    <article>
      <PageNationComponent :pageNationData="pageNationData" @currentPage="pageUpdate" />
    </article>
  </section>
</template>

<script setup>
import {
  deleteReviewManagement,
  sortByReviewData,
  notSortByReviewData,
  getSearchKeyword,
} from '@/api/AdministratorModeApi';
import { GLOBAL_URL } from '@/api/util';
import AnnouncementComponent from '@/components/admin/AnnouncementComponent.vue';
import PageNationComponent from '@/components/PageNationComponent.vue';
import { dateTimeFormat } from '@/FormatData';
import axios from 'axios';
import { ref, watchEffect } from 'vue';

const reviewList = ref([]);
const reviewSortBy = ref('');
const totalCount = ref(0);
const pageSize = ref(20);
const reviewDataRes = ref([]);
const pageNumber = ref(0);
const pageNationData = ref('');
const searchKeyword = ref('');

const pageNation = () => {
  pageNationData.value = {
    totalCount: totalCount.value,
    pageSize: pageSize.value,
  };
};

const reviewSearchKeyword = async () => {
  console.log(searchKeyword.value);
  pageNumber.value = 0;
  dolode('search');
};

// 서버에 삭제할 데이터 넘겨주기
const DeleteButton = async item => {
  console.log(item);
  const result = confirm('정말 리뷰를 삭제하시겠습니까?');
  if (result) {
    console.log('리뷰 삭제합니다.');
    const deleteReviewManagementRes = await deleteReviewManagement(item.reviewId);
    console.log(deleteReviewManagementRes);
    dolode();
  }
};
const pageUpdate = pageNum => {
  pageNumber.value = pageNum;
};

const dolode = async search => {
  if (search === 'search' || searchKeyword.value.length > 1) {
    if (searchKeyword.value.length > 1) {
      console.log('실행되나?');
      const searchKeywordRes = await getSearchKeyword(searchKeyword.value, pageNumber.value);
      console.log(searchKeywordRes);
      reviewList.value = searchKeywordRes.data.reviewManageDtos.content;
      totalCount.value = searchKeywordRes.data?.reviewCount;
      console.log(totalCount.value);
      pageNation();
    }
  } else {
    if (reviewSortBy.value === '') {
      reviewDataRes.value = await notSortByReviewData(pageNumber.value, pageSize.value);
    } else {
      reviewDataRes.value = await sortByReviewData(reviewSortBy.value, pageNumber.value, pageSize.value);
    }
    reviewList.value = reviewDataRes.value.data.reviewManageDtos.content;
    totalCount.value = reviewDataRes.value.data.reviewCount;
    pageNation();
    console.log(reviewList.value);
  }
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
input:focus,
select:focus,
option:focus {
  outline: none;
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
table {
  width: 100%;
  font-size: 1.4rem;
}
td {
  height: 50px;
  padding: 2px 3px;
  border-bottom: 0.5px solid var(--color-main-gray);
}
th {
  border-bottom: 2px solid var(--color-main-gray);
  padding: 2px;
  height: 40px;
}
.TableBody:hover{
  background-color: var(--color-main-Lgray);
}
.TableBody > td:nth-child(6) {
  text-align: left;
}
.productImages {
  width: 45px;
  height: 45px;
  padding: 2px;
  background-color: white;
  border: 0.5px solid var(--color-main-Lgray);
  border-radius: 5px;
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
