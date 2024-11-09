<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import Header from './components/layoutnav/Header.vue'
import Footer from './components/layoutnav/Footer.vue'
import { onBeforeUnmount, onMounted, ref } from 'vue';

const route = useRoute()

const isScrolled = ref(false);
const scrollHeight = () => {
  isScrolled.value = window.scrollY >= 500; 
};
const pageUp = ()=>{window.scrollTo({ top: 0, behavior: 'smooth' });}
onMounted(() => {window.addEventListener('scroll', scrollHeight);});
onBeforeUnmount(() => {window.removeEventListener('scroll', scrollHeight);});


</script>

<template>
  <Header></Header>

  <div class="min-height">
    <RouterView />
  </div>

  <Footer></Footer>

  <div class="pagaUp" v-if="isScrolled" @click="pageUp">
    <img  src="../src/assets/img/icon/up.svg" alt="">
  </div>
</template>

<style scoped>
.min-height {
  min-height: calc(100vh - 320px);
}
.pagaUp{
  position: fixed;
  right: 30px;
  bottom: 50px;
  width: 40px; 
  height: 40px;
  background-color: var(--color-main-bloode);
  border-radius: 50%;
  cursor: pointer;
  overflow: hidden;
  z-index: 999;
}
.pagaUp img{
  width: 100%;
  height: auto;
}
</style>
