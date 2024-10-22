<template>
  <section id="main_wrapper">
    <article id="main_video">
      <!-- <video autoplay muted loop src="../img/main.mp4"></video> -->
    </article>

    <article id="main_best">
      <h1>BEST</h1>
      <div id="best_position">
        <div class="best_left_box">
          <div class="best_product_banner">
            <p class="best_product_category">Perfume</p>
            <p class="best_product_page">
              <button @click="best_page_left">&lt;</button>
              1 / 3
              <button @click="best_page_right">&gt;</button>
            </p>
          </div>
          <div class="best_product">
            <img class="best_product_img" src="../img/p_003.png" alt="" />
            <ul class="best_left_text">
              <li>Dior</li>
              <li>향수 설명글이에요 조금 길게 적어볼게요</li>
            </ul>
          </div>
        </div>
        <div class="best_right_box">
          <p class="best_right_text">
            가장 인기 많은 향수<br />&nbsp;시원한 오이향에 빠져보세요*^.^*
          </p>
          <img class="best_promotion_img" src="../img/best_img.png" alt="" />
        </div>
      </div>
    </article>

    <article id="main_product_list"></article>

    <article id="promotion_banner">
      <div class="promotion_banner_size">
        <img class="promotion_banner_logo" src="../img/logo_text.png" alt="" />
        <p class="promotion_banner_text">
          지난 추억의 잔향을 나누고,<br />&nbsp;&nbsp;&nbsp;&nbsp;새 이야기의
          향기를 품어보세요
        </p>
        <!-- to 나중에 판매페이지로 바꿔야함 -->
        <RouterLink to="/productList" class="promotion_banner_link">바로 판매하기 →</RouterLink>
      </div>
    </article>

    <article id="main_editor"></article>
    <article id="main_new"></article>
  </section>
</template>

<script setup>
import { ref } from 'vue'
</script>

<style scoped>
/* 1-section 설정 */
#main_video {
  width: 100%;
  height: 200vh;
  background-color: rgb(35, 138, 74);
}
#main_video video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ====BEST===== */
#main_best {
  /* background-color: blanchedalmond; */
  height: 760px;
  margin: 0 auto;
  width: var(--main-max-width);
}
#main_best > h1 {
  font-size: 4rem;
  font-family: var(--font-JacquesFrancois);
  display: flex;
  justify-content: center;
  padding: 55px 0;
}
#best_position {
  display: flex;
  height: 467px;
}
.best_left_box {
  /* background-color: rgb(250, 183, 183); */
  position: relative;
  width: 57%;
  height: 450px;
  left: 5%;
}
.best_product_banner {
  position: absolute;
  background-color: rgba(96, 0, 0, 0.5);
  width: 100%;
  height: 275px;
}
.best_product_category {
  transform: rotate(-90deg);
  transform-origin: left bottom;
  position: absolute;
  font-size: 5rem;
  top: 62%;
  left: 15%;
}
.best_product_page {
  position: absolute;
  right: 2%;
  top: 10px;
  font-size: 2rem;
  color: var(--color-main-Lgray);
}
.best_product {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 10%;
}
.best_product_img {
  width: 100%;
  height: auto;
}
.best_left_text {
  text-align: center;
  font-size: 2rem;
}

.best_right_box {
  width: 47.5%;
  position: relative;
  top: 20px;
  font-size: 2rem;
  right: 5%;
}
.best_promotion_img {
  width: 100%;
  height: auto;
  margin-top: 100px;
}
.best_right_text {
  margin-left: 24%;
}

/* ==== main_product_list ===== */
#main_product_list::before {
  content: '';
  position: absolute;
  width: 70vw;
  left: 0;
  height: 0.2px;
  background-color: var(--color-main-bloode);
}
#main_product_list::after {
  content: '';
  position: absolute;
  width: 70vw;
  right: 0;
  height: 0.2px;
  bottom: 0;
  background-color: var(--color-main-bloode);
}
#main_product_list {
  background-color: #F3EED9;
  position: relative;
  /* width: var(--main-max-width); */
  margin: 0 auto;
  height: 600px;
}

/* ==== main_editor ==== */

/* ====promotion_banner==== */
#promotion_banner {
  background: linear-gradient( to right, #A85D71,#F3EED9 );
  margin: 0 auto;
  height: 189px;
  display: flex;
  margin: 10% 0;
}
.promotion_banner_size{
  position: relative;
  width: var(--main-max-width);
  margin: 0 auto;
}
.promotion_banner_logo{
  position: absolute;
  /* width: var(--main-max-width); */
  height: 188px;
  opacity: 0.15;
  margin: 0 auto;
}
.promotion_banner_text{
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  font-size: 3.6rem;
  display: block;
}
.promotion_banner_link{
  position: absolute;
  right: 0;
  top: 50%;
  font-size: 2rem;
}
@media(max-width: 300px){
  .promotion_banner_text{
    display: none;
  }
}
</style>
