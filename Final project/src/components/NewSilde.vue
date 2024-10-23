<template>
  <div class="wrapper">
    <Carousel :items-to-show="3.2" 
    :autoplay="2000" 
    :snapAlign="'center'" 
    :wrap-around="true" 
    :pause-autoplay-on-hover="true">
      <Slide v-for="(slide, index) in slides" 
      :key="index">
        <div class="carousel__item">
          <p class="time_check">00:00:10 등록</p>
          <img class="slideImg" :src="slide" />
          <div class="item_info">
            <p>Dior</p>
            <p>미스 디올 오 드 퍼퓸미스 디올 오 드 퍼퓸</p>
            <p>￦130,000</p>
          </div>
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
import home_4 from '@/img/p_003.png'
import home_5 from '@/img/editor_front_img.png'
import home_6 from '@/img/p_003.png'
import home_7 from '@/img/editor_front_img.png'
import home_8 from '@/img/p_003.png'
import home_9 from '@/img/editor_front_img.png'
import home_10 from '@/img/p_003.png'

import 'vue3-carousel/dist/carousel.css';

const slides = ref([home_1, home_2, home_3, home_4, home_5, home_6, home_7, home_8, home_9, home_10])
</script>

<style scoped>
.carousel__item {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  overflow: hidden;
  width: 95%;
  height: 700px;
  border-radius: 10px;
  background-color: var(--color-main-Lgray);
  color: black;
}

.carousel__item img {
  width: 95%;
  max-height: 400px;
}


.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}

.wrapper {
  margin-top: 3vh;
}
.time_check{
  font-size: 2rem;
}
.carousel__item p{
  display: flex;
  flex-direction: column;
  /* justify-content: flex-start; */
  text-align: left;
  font-size: 2.4rem;
  max-height: 150px;
  /* margin-left: -30%; */
  padding: 5px 20px;
}
</style>
