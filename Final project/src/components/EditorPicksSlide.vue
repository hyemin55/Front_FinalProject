<template>
  <div class="wrapper">
    <Carousel :items-to-show="3" 
    :autoplay="2000" 
    :snapAlign="'start'" 
    :wrap-around="true" 
    :pause-autoplay-on-hover="true">
      <Slide v-for="(slide, index) in slides" 
      :key="index" 
      :class="{'first-slide'
      : index === 0, 'third-slide': index === 2}">
        <div class="carousel__item">
          <img class="slideImg" :src="slide" />
        </div>
      </Slide>

      <template #addons>
        <Pagination />
      </template>
      <Navigation />
    </Carousel>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Carousel, Pagination, Slide, Navigation } from 'vue3-carousel'
import home_1 from '@/img/editor_front_img.png'
import home_2 from '@/img/p_003.png'
import home_3 from '@/img/editor_front_img.png'

import 'vue3-carousel/dist/carousel.css';

const slides = ref([home_1, home_2, home_3])
</script>

<style scoped>
.carousel__item {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.first-slide .slideImg {
  max-height: 500px;
  max-width: 100%;
}

.carousel__item img {
  width: 100%;
  object-fit: cover;
}

.carousel__slide {
  padding: 10px;
}

.first-slide {
  flex-grow: 2; /* 첫 번째 슬라이드를 크게 만듭니다. */
}

.third-slide {
  position: relative;
  /* right: -50px; 세 번째 슬라이드가 살짝 오른쪽에서 잘리도록 */
}

.carousel__item img {
  max-height: 500px;
}

.first-slide img {
  max-height: 500px; /* 첫 번째 이미지는 크게 */
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}

.wrapper {
  margin-top: 3vh;
}
</style>
