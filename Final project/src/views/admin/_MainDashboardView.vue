<template>
  <section id="dashboard" v-if="joinCount && logInCount && orderList && pendingList && reviewList">
    <!-- 상단 왼쪽 / 구매 리스트 -->
    <article id="orderList">
      <h1>구매 신청 목록</h1>
      <router-link to="/orderManagement">더보기▸</router-link>
      <div v-for="(item,index) in orderList.dashOrderListDtoList" :key="index">
        <ul>
          <li>{{ item.orderId }}</li>
          <li>{{ item.categoryName }}</li>
          <li>{{ item.productName }}</li>
          <li>{{ item.price }}</li>
          <li>{{ dateTimeFormat(item.createDate) }}</li>
        </ul>
      </div>
    </article>

    <!-- 상단 오른쪽/ 오늘의 신규회원 및 방문자 수 -->
    <article id="todayCount">
      <div>
        <h1>Today</h1>
        <h1>{{ dateFormat(today) }}</h1>
      </div>
      <div>
        <ul>
          <li>{{ joinCount.memberCount }}</li>
          <li>신규회원</li>
        </ul>
        <ul>
          <li>{{ logInCount.memberCount }}</li>
          <li>방문자</li>
        </ul>
        <ul>
          <li>{{ orderList.orderCount }}</li>
          <li>구매</li>
        </ul>
        <ul>
          <li>{{ pendingList.pendingSaleCount }}</li>
          <li>판매신청</li>
        </ul>
        <ul v-for="(joinMember, index) in joinCount.dashMemberListDtoJoinList" :key="index">
          <li>{{ joinMember.nickName }} 님이 가입했습니다.</li>
          <li>{{ timeFormat(joinMember.joinDate) }}</li>
        </ul>
        <ul v-for="(loginMember, index) in logInCount.dashMemberLogInListDtoList" :key="index">
          <li>{{ loginMember.nickName }} 님이 로그인했습니다.</li>
          <li>{{ timeFormat(loginMember.logInDate) }}</li>
        </ul>
      </div>
    </article>
    <!-- 중간 왼쪽 / 판매신청 리스트 -->
    <article id="pendingList">
      <h1>판매리스트</h1>
      <router-link to="/mainInspectionList">더보기▸</router-link>
      <div>
        <ul>
          <li>No.</li>
          <li>브랜드</li>
          <li>상품명</li>
          <li>닉네임</li>
          <li>신청시간</li>
        </ul>
        <ul v-for="(item,index) in pendingList.dashPendingListDtoList" :key="index">
          <li>{{ item.pendingSaleId }}</li>
          <li>{{ item.categoryName }}</li>
          <li>{{ item.productName }}</li>
          <li>{{ item.nickName }}</li>
          <li>{{ dateTimeFormat(item.createDate)}}</li>
        </ul>
      </div>
    </article>
    <!-- 중간 오른쪽 공지사항 -->
    <article>
      <h1>공지사항</h1>
      <router-link to="/announcement">더보기▸</router-link>
      <div>
        <p>lfsldflsjfljslfsldfljdslk</p>
      </div>
    </article>
    <!--하단 왼쪽 / 리뷰리스트 -->
    <article id="reviewList">
      <h1>리뷰 리스트</h1>
      <router-link to="/reviewManagement">더보기▸</router-link>
      <div>

      </div>
    </article>
  </section>
</template>

<script setup>
import {
  getDashboardJoinCount,
  getDashboardLogInCount,
  getDashboardOrderList,
  getDashboardPendingList,
  getDashboardReviewList,
} from '@/api/AdminDashboardApi';
import { dateFormat, dateTimeFormat, timeFormat } from '@/FormatData';
import { ref } from 'vue';
const today = Date();
const joinCount = ref();
const logInCount = ref();
const orderList = ref();
const pendingList = ref();
const reviewList = ref([]);

const doload = async () => {
  const dashboardJoinCountRes = await getDashboardJoinCount();
  joinCount.value = dashboardJoinCountRes;
  const dashboardLogInCountRes = await getDashboardLogInCount();
  logInCount.value = dashboardLogInCountRes;
  const dashboardOrderListRes = await getDashboardOrderList();
  orderList.value = dashboardOrderListRes;
  const dashboardPendingListRes = await getDashboardPendingList();
  pendingList.value = dashboardPendingListRes;
  const dashboardReviewListRes = await getDashboardReviewList();
  reviewList.value = dashboardReviewListRes;

  console.log('dashboardJoinCountRes', joinCount.value);
  console.log('dashboardLogInCountRes', logInCount.value);
  console.log('dashboardOrderListRes', orderList.value);
  console.log('dashboardPendingListRes', pendingList.value);
  console.log('dashboardReviewListRes', (reviewList.value || []).slice(0,5));
};
doload();
</script>

<style scoped>
#dashboard {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding-top: 15px;
}
article {
  background-color: antiquewhite;
  padding: 10px;
}
</style>
