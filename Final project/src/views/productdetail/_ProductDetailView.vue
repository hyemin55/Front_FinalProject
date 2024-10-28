<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const productId = computed(() => route.params.idx)
</script>

<template>
  <nav>{{ productId }}번 상품 상세페이지 경로</nav>
  <section id="product">
    <main id="productMain">
      <article id="productSlide">
        <h1>이미지 슬라이드</h1>
      </article>

      <div id="productInfosection">
        <article id="productInfo">
          <h1>상품명</h1>
        </article>
        <figure id="salseChart">
          <h1>차트</h1>
          <figcaption></figcaption>
        </figure>
      </div>
    </main>

    <article>
      <h1>상품 상세페이지</h1>
    </article>

    <article>
      <h1>리뷰들</h1>
    </article>
  </section>
</template>

<style scoped>
*{
  width: var(--main-max-width);
  margin: 0 auto;
}
nav{
  padding: 10px 0;
  color: var(--color-text-gray);
}

/* 상단 구역 */
#productMain{
  display: flex;
  /* justify-content: center; */
  height: 500px;
  background-color: antiquewhite;
  
}
#productSlide{
  text-align: center;
  background-color: aqua;
  width: 50%;
  display: flex;
}
#productInfosection{
  text-align: center;
  background-color: aquamarine;
 width: 50%;
}
#salseChart{

}
</style>
