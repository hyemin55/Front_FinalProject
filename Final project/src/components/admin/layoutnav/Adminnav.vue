<template>
  <article id="Adminnav" v-if="role === 'ADMIN'">
    <ul>
      <RouterLink to="/mainDashboard"
        ><li><img src="@/assets/img/icon/free-icon-font-apps-3917482.svg" alt="" />대시보드</li></RouterLink
      >
      <RouterLink to="/reviewManagement"
        ><li><img src="@/assets/img/icon/free-icon-font-clipboard-list-7857488.svg" alt="" />상품관리</li></RouterLink
      >
      <RouterLink to="/orderManagement"
        ><li><img src="@/assets/img/icon/free-icon-font-clipboard-list-7857488.svg" alt="" />주문관리</li></RouterLink
      >
      <RouterLink to="/userManagement"
        ><li><img src="@/assets/img/icon/free-icon-font-user-3917559.svg" alt="" />사용자관리</li></RouterLink
      >
      <RouterLink to="/reviewManagement"
        ><li><img src="@/assets/img/icon/free-icon-font-comment-3916638.svg" alt="" />리뷰관리</li></RouterLink
      >
      <RouterLink to="/announcement"
        ><li><img src="@/assets/img/icon/free-icon-font-megaphone-3914404.svg" alt="" />공지사항</li></RouterLink
      >
      <RouterLink to="/mainInspectionList"
        ><li>
          <img src="@/assets/img/icon/free-icon-font-clipboard-list-7857488.svg" alt="" />판매신청목록
        </li></RouterLink
      >
      <RouterLink to="/approvedList"
        ><li><img src="@/assets/img/icon/free-icon-font-clipboard-list-7857488.svg" alt="" />승인목록</li></RouterLink
      >
      <RouterLink to="/petList"
        ><li><img src="@/assets/img/icon/free-icon-font-clipboard-list-7857488.svg" alt="" />반려목록</li></RouterLink
      >
      <RouterLink to="/statistics"
        ><li><img src="@/assets/img/icon/free-icon-font-chart-histogram-5528038.svg" alt="" />통계</li></RouterLink
      >
    </ul>
  </article>

  <article id="Adminnav" v-if="role === 'APPRAISER'">
    <ul>
      <RouterLink to="/mainInspectionList"
        ><li>
          <img src="@/assets/img/icon/free-icon-font-clipboard-list-7857488.svg" alt="" />판매신청목록
        </li></RouterLink
      >
      <RouterLink to="/approvedList"
        ><li><img src="@/assets/img/icon/free-icon-font-clipboard-list-7857488.svg" alt="" />승인목록</li></RouterLink
      >
      <RouterLink to="/petList"
        ><li><img src="@/assets/img/icon/free-icon-font-clipboard-list-7857488.svg" alt="" />반려목록</li></RouterLink
      >
    </ul>
  </article>
</template>

<script setup>
import { useUserStore } from '@/stores/Login';
import { watch } from 'vue';

const useStore = useUserStore();
const role = useStore.role;
console.log(role);
watch(useStore.role, _new => {
  console.log(_new);
});
</script>

<style scoped>
#Adminnav {
  position: fixed;
  left: 0;
  width: 200px;
  height: calc(100vh - 70px);
  background-color: var(--color-main-pink);
  font-size: 1.6rem;
  transition: all 0.3s;
}
li {
  width: 100%;
  height: 50px;
  cursor: pointer;
  align-content: center;
  padding-left: 20px;
}
li:hover {
  background-color: var(--color-main-bloode);
  color: white;
  transition: all 0.3s;
}

li:hover img {
  filter: invert(100%) brightness(200%);
}
li img {
  width: 10%;
  margin-right: 10px;
  transition: all 0.3s;
}
@media (max-width: 1000px) {
  #Adminnav {
    width: 100px;
    font-size: 1.2rem;
    transition: all 0.3s;
  }
  li {
    padding-left: 10px;
  }
  li img {
    width: 20%;
    margin-right: 1px;
    transition: all 0.3s;
  }
}
</style>
