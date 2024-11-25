<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router';
import Header from '@/components/layoutnav/Header.vue';
import Footer from '@/components/layoutnav/Footer.vue';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { login } from './api/KakaoLoginApi';
import AdminHeader from './components/admin/AdminHeader.vue';

const role = useUserStore();
console.log(role.nickName)
const route = useRoute();

// window height의 높이에서 scrollTop 을 뺀 값을 변수로 잡아서
// 20000 px 있는곳에 넣어라

const isScrolled = ref(false);
const scrollHeight = () => {
  isScrolled.value = window.scrollY >= 500;
};
const pageUp = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
const pageDown = () => {
  window.scrollTo({ top: 30000, behavior: 'smooth' });
};

onMounted(() => {
  window.addEventListener('scroll', scrollHeight);
});
onBeforeUnmount(() => {
  window.removeEventListener('scroll', scrollHeight);
});
</script>

<template>
  <div>
    <template v-if="role.nickName === '민이♡'">
      <div>
        <!-- <RouterView /> -->
      </div>
    </template>
    
    <template v-else>
      <Header></Header>

      <div class="min-height">
        <RouterView />
      </div>

      <Footer></Footer>
    </template>

    <div class="scroll_btn pagaUp" v-if="isScrolled" @click="pageUp">
      <img src="@/assets/img/icon/up.svg" alt="" />
    </div>
    <div class="scroll_btn pagaDown" v-if="isScrolled" @click="pageDown">
      <img src="@/assets/img/icon/up.svg" alt="" />
    </div>
  </div>
</template>

    <style scoped>
      .min-height {
        min-height: calc(100vh - 320px);
      }
      .scroll_btn {
        position: fixed;
        right: 30px;
        width: 40px;
        height: 40px;
        background-color: white;
        border: 0.5px solid var(--color-main-gray);
        border-radius: 50%;
        cursor: pointer;
        overflow: hidden;
        z-index: 999;
      }
      .pagaUp {
        bottom: 100px;
      }
      .pagaDown {
        bottom: 50px;
      }
      .pagaDown img {
        transform: rotate(180deg);
      }
      .pagaUp img {
        width: 100%;
        height: auto;
      }
    </style>
  </template>
</template>
