<script setup>
import {
  getReviewImageList,
  getReviewList,
  getReviewListGoodIconState,
  getViewCurrentPage,
} from '@/api/productDetailApi';
import { GLOBAL_URL } from '@/api/util';
import { dateTimeFormat } from '@/FormatData';
import { useUserStore } from '@/stores/Login';
import axios from 'axios';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const useStore = useUserStore();
const props = defineProps({
  // 받아오는props의 정의 방법
  reviewCount: {
    type: Number,
    required: true,
  },
});

const route = useRoute();
const router = useRouter();
const idx = ref(route.params.idx);
const currentPage = ref(1);
const totalPages = ref(10);
const currentPageGroup = ref(0);

const reviewCount = ref(props.reviewCount);
const reviewList = ref([null]);
let flag = 0;
const totalPageGroup = ref(0);
const pageSize = 5;
const startPage = ref(0);
const endPage = ref(0);
const star_list = ['★', '★★', '★★★', '★★★★', '★★★★★'];
const GoodIcon = ref(true);
// 유저별 리뷰 도움되요 표시
const dolode = async () => {
  // console.log('currentPage', currentPage.value);
  GoodIcon.value = [];
  if (useStore.loginCheck === false) {
    GoodIcon.value = false;
    return;
  }
  const reviewListRes = await getReviewList(idx.value, currentPage.value - 1);
  GoodIcon.value = reviewListRes.data;
  // console.log(GoodIcon.value);
};

// 유저별 도움돼요 클릭 시 서버로 데이터 넘기기
const GoodIconState = async reviewId => {
  // console.log(reviewId);
  if (!useStore.loginCheck) {
    alert('로그인이 필요한 기능입니다.');
    router.push({ name: 'login2' });
    return;
  }
  const reviewListRes = await getReviewListGoodIconState(reviewId);
  // console.log(reviewListRes.data.checked);
  // console.log(reviewList.value);
  // console.log(GoodIcon.value.checked);
  dolode();
  viewCurrentPage();
};

// 이전페이지
const backPage = () => {
  if (currentPageGroup.value <= 0) {
    // console.log('첫페이지입니다.');
    alert('첫페이지입니다.');
    return;
  }
  currentPage.value = startPage.value - 10;
  viewCurrentPage();
};

// 다음페이지
const nextPage = () => {
  if (currentPageGroup.value >= totalPageGroup.value) {
    // console.log('마지막페이지입니다.');
    alert('마지막페이지입니다.');
    return;
  }
  currentPage.value = endPage.value + 1;
  viewCurrentPage();
};

// 선택페이지
const goToPage = page => {
  // console.log('page', page);
  if (currentPage.value == page) {
    // console.log('현재페이지입니다.');
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
    // console.log(reviewList.value);
  }
  dolode();
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
  () => [route.params.idx, props.reviewCount], // source로 배열을 사용하여 다중 변수를 추적
  ([newIdx, newReviewCount]) => {
    idx.value = newIdx;
    reviewCount.value = newReviewCount;
    viewCurrentPage();
  },
  dolode(),
);
</script>

<template>
  <div id="userReviewList" class="border" v-for="(list, index) in reviewList.data" :key="index">
    <ul class="userInfoAndGood">
      <div class="userInfo">
        <li>
          <img :src="`${list.memberDetailReviewResDto.profileImage}`" alt="" class="userInfoImg" />
        </li>
        <div class="userInfoNicknameAndUserReviewStar">
          <li class="userInfoNickname">
            {{ list.memberDetailReviewResDto.nickName }}
          </li>
          <p class="userReviewStar">
            {{ star_list[list.star - 1] }} <span style="color: #333; font-size: 1.5rem">{{ list.star }}</span>
          </p>
        </div>
      </div>
      <template v-if="useStore.loginCheck && GoodIcon">
        <li
          class="reviewGoodIcon reviewGoodIconTrue"
          v-if="GoodIcon[index]?.checked"
          @click="GoodIconState(GoodIcon[index].reviewId)"
        >
          <img src="@/assets/img/icon/free-icon-font-hand-holding-heart-17766584.svg" alt="" />
          {{ list.favoriteCount }} 도움되요
        </li>
        <li class="reviewGoodIcon" v-else @click="GoodIconState(GoodIcon[index].reviewId)">
          <img src="@/assets/img/icon/free-icon-font-hand-holding-heart-17766580.svg" alt="" />
          {{ list.favoriteCount }} 도움되요
        </li>
      </template>
      <template v-else>
        <li class="reviewGoodIcon" @click="GoodIconState(0)">
          <img src="@/assets/img/icon/free-icon-font-hand-holding-heart-17766580.svg" alt="" />
          {{ list.favoriteCount }} 도움되요
        </li>
      </template>
    </ul>

    <div class="userReviewImgs">
      <img :src="`${GLOBAL_URL}/api/file/download/${list.reviewImageResDto.filename}`" alt="" class="userReviewImg" />
    </div>
    <p class="userReviewText">{{ list.content }}</p>
    <p class="userReviewTime">
      {{ dateTimeFormat(list.reviewCreationDate) }}
    </p>
  </div>

  <template v-if="reviewCount == 0 || reviewCount == null">
    <div id="userReviewList" class="border noUserReviewList">
      <img src="@/assets/img/icon/free-icon-font-note-sticky-9798415.svg" alt="" />
      <p>아직 리뷰가 등록되지 않았어요 ㅠㅡㅠ</p>
    </div>
  </template>

  <ul id="totalPages">
    <li @click="backPage">이전</li>
    <li
      class="totalPages"
      v-for="pageNum in endPage - startPage + 1"
      v-bind:key="pageNum"
      @click="goToPage(startPage + pageNum - 1)"
      :class="{ active: activePage(pageNum) }"
    >
      {{ startPage + pageNum - 1 }}
    </li>
    <li @click="nextPage">다음</li>
  </ul>
</template>

<style scoped>
#userReviewList {
  /* line-height: 35px; */
}
#userReviewList::after {
  position: absolute;
  content: '';
  border: 0.5px dashed var(--color-main-Lgray);
  height: 0.1px;
  width: var(--main-max-width);
  display: flex;
}
.noUserReviewList > img {
  width: 100px;
  margin-top: 20px;
}
.noUserReviewList::before {
  position: absolute;
  content: '';
  border: 0.5px dashed var(--color-main-Lgray);
  height: 0.1px;
  width: var(--main-max-width);
  display: flex;
  /* top: 20px; */
}
.noUserReviewList {
  text-align: center;
  height: 150px;
  font-size: 1.4rem;
  line-height: 40px;
  /* background-color: antiquewhite; */
}
.userReviewStar {
  font-size: 2rem;
  color: orange;
  /* margin-top: 20px; */
}
.reviewGoodIcon {
  width: 10%;
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 0;
  padding: 0.5%;
  gap: 10%;
  font-size: 1.5rem;
  border: 0.5px solid var(--color-main-gray);
  border-radius: 30px;
  cursor: pointer;
  /* background-color: antiquewhite; */
}
.reviewGoodIcon > img {
  width: auto;
  height: 100%;
}
.reviewGoodIconTrue {
  color: orange;
}
.userReviewImgs {
  display: flex;
  align-items: center;
  justify-content: start;
  width: 100%;
  height: auto;
  /* background-color: antiquewhite; */
}
.userReviewImg {
  width: 8%;
  height: auto;
  margin-right: 1%;
  border: 0.5px solid var(--color-main-Lgray);
  border-radius: 10px;
}
.userReviewImg:last-child {
  margin-right: 0;
}
.userInfoNicknameAndUserReviewStar {
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.userReviewText {
  margin-top: 10px;
}
.userReviewText,
.userInfoNickname {
  font-size: 1.4rem;
  /* background-color: bisque; */
}
.userReviewTime {
  font-size: 1.2rem;
  margin: 10px 0;
  color: var(--color-text-gray);
}
.userInfoAndGood {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  width: auto;
}
.userInfo {
  display: flex;
  align-items: center;
  justify-content: left;
  height: 100%;
  gap: 10px;
  /* background-color: aqua; */
}
.userInfoImg {
  border: 0.5px solid var(--color-main-Lgray);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  padding: 1px;
  object-fit: cover;
}
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
.totalPages.active,
#totalPages li:hover {
  color: var(--color-main-bloode);
  font-weight: 600;
  text-decoration: underline;
}
</style>
