<script setup>
import { useUserStore } from '@/stores/Login'
import { onMounted } from 'vue'
import { GLOBAL_URL } from '@/api/util'

const user = useUserStore()

onMounted(() => {})
</script>

<template>
  <section id="mypage">
    <article id="myInfoNav">
      <img
        :src="`${GLOBAL_URL}/api/file/download/${user.profileImage}`"
        alt=""
      />
      <p>{{ user.nickName }}</p>
      <ul id="myInfoNavList">
        <li>주문 내역 조회</li>
        <li>파매 내역 조회</li>
        <li>찜 목록</li>
        <li>내 리뷰 관리</li>
        <li>회원 정보 관리</li>
      </ul>
    </article>

    <div id="rightGroub">
      <article id="currentSituation"></article>

      <article id="myDetailInfo"></article>
    </div>
  </section>
</template>

<style scoped>
#mypage {
  display: flex;
  width: var(--main-max-width);
  margin: 0 auto;
}
#myInfoNav {
  width: 30%;
  background-color: antiquewhite;
  padding: 30px 0;
  position: fixed;
}
#myInfoNav img {
  width: 8%;
  border-radius: 100%;
  border: 0.1px solid var(--color-main-Lgray);
}
#myInfoNavList li {
  content: '';
  left: 0;
  height: 0.2px;
  background-color: var(--color-main-bloode);
  width: 13%;
}
#rightGroub {
  width: 70%;
}
#currentSituation {
  background-color: aquamarine;
  height: 400px;
}
#myDetailInfo {
  background-color: brown;
}
</style>
