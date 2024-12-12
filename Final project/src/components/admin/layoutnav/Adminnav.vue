<template>
  <article id="AdminNav" v-if="role === 'ADMIN'">
    <ul>
      <Router-link v-for="(item, index) in adminMenu" :key="index" :to="item.route" @click="setActive(index)">
        <li :class="{ active: activeIndex === index }"><img :src="item.icon" alt="" />{{ item.label }}</li>
      </Router-link>
    </ul>
  </article>

  <article id="AdminNav" v-if="role === 'APPRAISER'">
    <ul>
      <RouterLink :to="item.route" v-for="(item, index) in appraiserMenu" :key="index" @click="setActive(index)">
        <li :class="{ active: activeIndex === index }"><img :src="item.icon" alt="" />{{ item.label }}</li>
      </RouterLink>
    </ul>
  </article>
</template>

<script setup>
import { useUserStore } from '@/stores/Login';
import { watch, ref } from 'vue';

const useStore = useUserStore();
const role = useStore.role;
const activeIndex = ref(null);

// 메뉴 항목 데이터
const adminMenu = [
  { route: '/mainDashboard', icon: '@/assets/img/icon/free-icon-font-apps-3917482.svg', label: '대시보드' },
  {
    route: '/productManagement',
    icon: '@/assets/img/icon/free-icon-font-clipboard-list-7857488.svg',
    label: '상품관리',
  },
  { route: '/orderManagement', icon: '@/assets/img/icon/free-icon-font-clipboard-list-7857488.svg', label: '주문관리' },
  { route: '/userManagement', icon: '@/assets/img/icon/free-icon-font-user-3917559.svg', label: '사용자관리' },
  { route: '/reviewManagement', icon: '@/assets/img/icon/free-icon-font-comment-3916638.svg', label: '리뷰관리' },
  { route: '/announcement', icon: '@/assets/img/icon/free-icon-font-megaphone-3914404.svg', label: '공지사항' },
  {
    route: '/mainInspectionList',
    icon: '@/assets/img/icon/free-icon-font-clipboard-list-7857488.svg',
    label: '판매신청목록',
  },
  { route: '/approvedList', icon: '@/assets/img/icon/free-icon-font-clipboard-list-7857488.svg', label: '승인목록' },
  { route: '/petList', icon: '@/assets/img/icon/free-icon-font-clipboard-list-7857488.svg', label: '반려목록' },
  { route: '/statistics', icon: '@/assets/img/icon/free-icon-font-chart-histogram-5528038.svg', label: '통계' },
];

const appraiserMenu = [
  {
    route: '/mainInspectionList',
    icon: '@/assets/img/icon/free-icon-font-clipboard-list-7857488.svg',
    label: '판매신청목록',
  },
  { route: '/approvedList', icon: '@/assets/img/icon/free-icon-font-clipboard-list-7857488.svg', label: '승인목록' },
  { route: '/petList', icon: '@/assets/img/icon/free-icon-font-clipboard-list-7857488.svg', label: '반려목록' },
];

const setActive = index => {
  activeIndex.value = index;
};
watch(useStore.role, _new => {
  console.log(_new);
});
</script>

<style scoped>
#AdminNav {
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
li:hover,
li:active {
  background-color: var(--color-main-bloode);
  color: white;
  transition: all 0.3s;
}
li:hover img,
li:active img {
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
