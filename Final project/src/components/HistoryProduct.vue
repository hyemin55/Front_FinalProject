<script setup>

</script>

<template>
    <article class="history_box">
    <div class="top_box">
      <div>
        <p class="history_date"><span>주문날짜</span> 2024년 10월 12일</p>
        <p class="history_number">주문번호 123123132231321</p>
      </div>
      <p class="detail_more">주문상세 ></p>
    </div>

    <div class="bottom_box">
      <p class="complete_date">배송완료 2024년 10월 13일</p>
      <div class="history_product">
        
      </div>
    </div>
  </article>
</template>

<style scoped>
/* 컴포넌트 설정 ########### */
.history_box {
  background-color: aliceblue;
}

/* 윗 박스 */
.top_box {
  height: 70px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: solid 1px var(--color-main-gray);
}
.history_date {
  font-size: 2rem;
  letter-spacing: -0.034rem;
}
.history_date span {
  color: rgb(226, 28, 28);
}
.history_number {
  font-size: 1.3rem;
  letter-spacing: -0.034rem;
}
.history_more {
  font-size: 1.5rem;
  letter-spacing: -0.034rem;
}
.detail_more{
  font-size: 1.5rem;
  cursor: pointer;
}

/* 아래 박스 */
.bottom_box {
  width: 100%;
  height: 230px;
}
.complete_date{
  height: 50px;
  width: 100%;
  font-size: 2rem;
  letter-spacing: -0.034rem;
  display: flex;
  align-items: center;
}
.history_product{
  height: 180px;
  width: 100%;
}
</style>