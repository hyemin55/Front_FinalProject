<template>
  <section id="main_wrapper">

    <article id="main_video">
      <!-- <video autoplay muted loop src="@/assets/img/main.mp4"></video> -->
      <article id="IntroductionModal">
        <div>
          이건 모달창
          <div>
            <input type="checkbox" id=""></input>
            <label for="">3일간 보지 않기</label>
          </div>
        </div>
      </article>
    </article>

    <MainBestView />
    <MainListView />
    <MainPromotionBannerView />
    <MainEditorView />
    <MainNewView />
  </section>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';
import MainBestView from '@/views/user/main/MainBestView.vue';
import MainListView from '@/views/user/main/MainListView.vue';
import MainPromotionBannerView from '@/views/user/main/MainPromotionBannerView.vue';
import MainEditorView from '@/views/user/main/MainEditorView.vue';
import MainNewView from '@/views/user/main/MainNewView.vue';

// const MainEditorView = defineAsyncComponent(() => import('./MainEditorView.vue'));
// const MainNewView = defineAsyncComponent(() => import('./MainNewView.vue'));

</script>

<style scoped>
/* 1-section 설정 */
#main_wrapper {
  position: relative;
}
#main_video {
  width: 100%;
  height: 100vh;
  background-color: rgb(35, 138, 74);
}
#main_video video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 1px solid white;
}
#IntroductionModal{
  background-color: bisque;
  position: absolute;
  top:130px;
  left: 20%;
}
</style>
