<script setup>
import { useUserStore } from '@/stores/Login'
import { ref, watchEffect, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const HeaderMode = ref(false)

const useStore = useUserStore()

const loginCheck = ref(false)
const token = ref(false)
watchEffect(() => {
  HeaderMode.value = route.path === '/'
})

const kakaoLogout = () => {
  localStorage.removeItem('token')
  useStore.logout()
  console.log('로그아웃 성공')
  token.value = false
  window.location.reload()
}
onMounted(() => {
  const savedToken = localStorage.getItem('token')
  if (savedToken) {
    token.value = true
    useStore.loginCheck = true // 스토어에 로그인 상태 설정
  } else {
    useStore.loginCheck = false
  }
})
// onMounted(() => {
//   token.value = localStorage.getItem('token')
// })
// 대분류 카테코리를 이곳으로 받자(되면...)
const categories = [
  { title: 'Perfume', path: '/category/Perfume/3' },
  { title: 'Diffuser', path: '/category/Diffuser/2' },
  { title: 'Candle', path: '/category/Candle/1' },
]
</script>

<template>
  <section id="header" :class="{ sticky: !HeaderMode, fixed: HeaderMode }">
    <article id="header_top">
      <p>Where people linger, a fragrance remains</p>
      <template v-if="useStore.loginCheck">
        <ul class="login" @click="kakaoLogout()">
          <li>로그아웃</li>
          <li>|</li>
          <li>마이페이지</li>
        </ul>
      </template>
      <template v-else>
        <ul class="login">
          <li><RouterLink to="/login2">로그인</RouterLink></li>
          <li>|</li>
          <li>회원가입</li>
        </ul>
      </template>
    </article>

    <article id="header_bottom">
      <RouterLink class="logo" to="/">
        <img src="../img/logo_text.png" alt="" />
      </RouterLink>

      <ul class="gnb01">
        <li v-for="(category, index) in categories" :key="index">
          <RouterLink :to="category.path">{{ category.title }}</RouterLink>
        </li>
      </ul>

      <ul class="gnb02">
        <li>
          <img
            class="icon"
            src="../img/icon/free-icon-font-search-3917132.png"
            alt=""
          />
        </li>
        <li>
          <RouterLink to="/cart">
            <img
              class="icon"
              src="../img/icon/free-icon-font-basket-shopping-simple-9768421.png"
              alt=""
            />
          </RouterLink>
        </li>
      </ul>
    </article>
  </section>
</template>

<style scoped>
/* header 전체설정 */
#header {
  width: 100vw;
  height: 100px;
  display: flex;
  flex-direction: column;
  /* position: fixed; */
  z-index: 999;
  top: 0;
  left: 0;
}
.sticky {
  position: sticky;
  background-color: rgb(255, 255, 255, 1);
}
.fixed {
  position: fixed;
  background-color: rgb(255, 255, 255, 0.2);
}
#header > article {
  max-width: var(--main-max-width);
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#header > article:nth-child(1) {
  height: 30px;
}
#header > article:nth-child(2) {
  height: 70px;
}
#header > article > ul {
  display: flex;
}

/* header_top 설정 */
#header_top {
  font-size: 1.2rem;
}
#header_top > p {
  font-family: 'PRISTINA';
}
.login li {
  margin-left: 0.4rem;
}
#header_top::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 70px;
  width: 100vw;
  height: 0.2px;
  background-color: var(--color-main-bloode);
}

/* header_bottom 설정 */
.logo img {
  width: 95px;
  height: auto;
}
.gnb01 li {
  font-size: 1.8rem;
  margin: 0 2.4rem;
}
.gnb02 li {
  font-size: 1.5rem;
  margin-left: 1.8rem;
}
.icon {
  width: 2rem;
  height: auto;
}

/* 반응현 구간 설정 */
@media (max-width: 1280px) {
  #header {
    padding-right: 20px;
  }
}
</style>
