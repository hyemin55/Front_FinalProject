<template>
  <div class="wrapper">
    <Carousel
      :items-to-show="3"
      :snapAlign="'start'"
      :wrap-around="true"
      :pause-autoplay-on-hover="true"
      :autoplay="0"
      :mouse-drag="false"
    >
      <Slide
        v-for="(slide, index) in slides"
        :key="index"
        :class="{ 'first-slide': index === 0, 'third-slide': index === 2 }"
        @click="handleClick(index)"
      >
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
import home_3 from '@/img/빵빵덕세안.png'

import 'vue3-carousel/dist/carousel.css'
import Queue from 'queue-fifo'

const slides = ref([home_1, home_2, home_3])

let queue = new Queue()
let image_list = []
// 1. img idx => q
for (let i = 0; i < slides.value.length; i++) {
  queue.enqueue(i)
  image_list.push(slides.value[i])
}
// 2. 클릭 시 제일 앞으로
// 클릭 시 index 값을 받아오는 함수
const handleClick = index => {
  console.log('Clicked index:', index)
  // 클릭한 슬라이드의 index에 따른 로직 추가

  console.log(queue.peek())
  //
  if (queue.peek() == index) return
  while (queue.peek() != index) {
    queue.enqueue(queue.dequeue())
    console.log('queue : ' + queue.elements)
  }
  slides.value = []
  while (!queue.isEmpty()) {
    const index = queue.dequeue() // 큐에서 인덱스 값 추출
    console.log(index)
    if (index >= 0 && index < image_list.length) {
      // 유효한 인덱스인지 확인
      slides.value.push(image_list[index])
    } else {
      console.warn(`Invalid index: ${index}`)
    }
  }

  image_list = []
  for (let i = 0; i < slides.value.length; i++) {
    queue.enqueue(i)
    image_list.push(slides.value[i])
  }
}
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
