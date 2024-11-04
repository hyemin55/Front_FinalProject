<script setup>
import { GLOBAL_URL } from '@/api/util'
import axios from 'axios'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const idx = ref(route.params.idx)
const ReviewList = ref([])
const reviewcount = ref(0)

const review = 132
const totalPages = ref(10)
const num = ref(0)

const star_list = ['★', '★★', '★★★', '★★★★', '★★★★★']
onMounted(async () => {
  const res = await axios.get(`${GLOBAL_URL}/detail/review/${idx.value}`)
  // const res = await axios.get(`${GLOBAL_URL}/detail/review/${idx}`)
  ReviewList.value = res.data
  // console.log('별이 5개 맞아?', ReviewList.value[0].star)
})

num.value = review / 5

if (num.value <= 0) {
  totalPages.value = 1
} else if (num.value % 5 == 0) {
  totalPages.value = num.value
} else {
  totalPages.value = Math.ceil(num.value) //소수 올림
}

const viewpageNum = async pageNum => {
  const res = await axios.get(
    `${GLOBAL_URL}/detail/review/1?pageNum=${pageNum}`,
  )
  console.log(pageNum, res.data)
  ReviewList.value = res.data
  return pageNum
}
</script>

<template>
  <div
    id="userReviewList"
    class="border"
    v-for="(list, index) in ReviewList"
    :key="index"
  >
    <p class="userReviewStar">{{ star_list[list.star - 1] }}</p>
    <div class="userReviewImgs">
      <img src="@/assets/img/p_003.png" alt="" class="userReviewImg" />
    </div>
    <p class="userReviewText">{{ list.content }}</p>
    <p class="userReviewTime">
      {{ list.reviewCreationDate }}
    </p>
    <ul class="userInfo">
      <li>
        <img
          :src="`${list.memberDetailReviewResDto.profileImage}`"
          alt=""
          class="userInfoImg"
        />
      </li>
      <li class="userInfoNickname">
        {{ list.memberDetailReviewResDto.nickName }}
      </li>
    </ul>
  </div>

  <ul id="totalPages">
    <!-- <li @click="viewpageNum(pageNum.value - 1)" v-if="pageNum.value > 0">
      이전
    </li> -->
    <li
      class="totalPages"
      v-for="pageNum in totalPages"
      v-bind:key="pageNum"
      @click="viewpageNum(pageNum - 1)"
      :class="{ active: viewpageNum.value === pageNum - 1 }"
    >
      {{ pageNum }}
    </li>
    <!-- <li
      @click="viewpageNum(pageNum.value + 1)"
      v-if="pageNum.value < totalPages - 1"
    >
      다음
    </li> -->
  </ul>
</template>

<style scoped>
#userReviewList {
  line-height: 35px;
}
#userReviewList::after {
  position: absolute;
  content: '';
  border: 0.5px dashed var(--color-main-Lgray);
  height: 0.1px;
  width: var(--main-max-width);
  display: flex;
}
.userReviewStar {
  font-size: 2rem;
  color: orange;
  margin-top: 20px;
}
.userReviewImgs {
  display: flex;
  align-items: center;
  justify-content: start;
  width: 100%;
  height: auto;
  /* background-color: antiquewhite; */
}
.userReviewImg {
  width: 8%;
  height: auto;
  margin-right: 1%;
  border: 0.5px solid var(--color-main-Lgray);
  border-radius: 10px;
}
.userReviewImg:last-child {
  margin-right: 0;
}
.userReviewText,
.userInfoNickname {
  font-size: 1.4rem;
  /* background-color: bisque; */
}
.userReviewTime {
  font-size: 1.2rem;
  margin-top: -15px;
  color: var(--color-text-gray);
}
.userInfo {
  display: flex;
  align-items: center;
  justify-content: left;
  height: 40px;
  width: auto;
  gap: 10px;
  margin-bottom: 10px;
  /* background-color: aqua; */
}
.userInfoImg {
  border: 0.5px solid var(--color-main-Lgray);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  padding: 1px;
  object-fit: cover;
}
#totalPages {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 30px;
  /* background-color: rgb(161, 160, 158); */
}
.totalPages {
  /* background-color: rgb(236, 207, 172); */
  display: flex;
  align-items: center;
  justify-content: center;
  /* width: 10%; */
  /* margin: 0 1%; */
  cursor: pointer;
  padding: 1%;
}
.clickpageNum {
  color: red;
  font-size: large;
}
</style>
