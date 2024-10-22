<template>
  <section id="main_wrapper">
    <article id="main_video">
      <!-- <video autoplay muted loop src="../img/main.mp4"></video> -->
    </article>

    <article id="main_best">
      <h1>BEST</h1>
      <div class="best_left_box">
        <div class="best_product_banner">
          <p>
            <button @click="best_page_left">&lt;</button>
            1 / 3
            <button @click="best_page_right">&gt;</button>
          </p>
        </div>
        <div class="best_product">
          <img class="best_img" src="../img/p_003.png" alt="" />
          <ul class="best_left_text">
            <li>Dior</li>
            <li>
              향수 설명글이에요 조금 길게 적어볼게요 어떻게 나오는지
              확인하는거에요
            </li>
          </ul>
        </div>
      </div>
    </article>

    <article id="main_product_list"></article>
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
  background-color: blanchedalmond;
  height: 760px;
  margin: 0 auto;
  width: var(--main-max-width);
}
#main_best > h1 {
  font-size: 4rem;
  font-family: var(--font-JacquesFrancois);
  display: flex;
  justify-content: center;
  padding: 35px 0;
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
.best_product_banner > p {
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
.best_img {
  width: 350px;
  height: 350px;
}
.best_left_text {
  text-align: center;
  font-size: 2rem;
}
</style>
