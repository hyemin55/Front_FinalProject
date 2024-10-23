<script setup>
import { ref } from 'vue';
import { GLOBAL_URL } from '@/api/util'

// 상품리스트에 출력 
const props = defineProps({ // 받아오는props정의
  productInfo: {
    type: Object,
    required: true,
  },
});
const cart_product_name = ref(props.productInfo.productName);
const cart_product_price = ref(props.productInfo.price);
</script>

<template v-for="item in cart" :key="item.idx">
  <article id="cart_product_component_wrapper">
    <input type="checkbox" name="check" id="product_check">

    <div class="img">
        <img :src="`${GLOBAL_URL}/api/file/download/${productInfo.images[0].filename}`" style="height: 100%;" /> 
    </div>
    <div class="text">
        <div class="text_box">
            <p class="title">{{ cart_product_name }}</p>
            <p class="price">{{ cart_product_price }}</p>
        </div>
        <div class="count">
            <button>+</button>
            <p>수량 : 1</p>
            <button>-</button>
        </div>
    </div>
  </article>
</template>

<style scoped>
/* 전체 설정 */
#cart_product_component_wrapper{
    position: relative;
    display: flex;
    width: 630px;
    height: 172px;
    border: 1px solid black;
    border-radius: 0.5rem;
}
#product_check{
    position: absolute;
    top: 0;
    left: 0;
}
/* 이미지 박스 설정 */
.img{
    width: 197px;
    height: 100%;
    background-color: antiquewhite;
}

/* 텍스트 박스 설정 */
.text{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 433px;
    height: 100%;
}
.text_box{
    font-weight: 600;
}
.title{
    font-size: 2rem;
}
.price{
    font-size: 2.2rem;
}
/* 버튼 설정 */
.count{
  display: flex;
  align-items: center;
  justify-content: center; 
  gap: 10px;
  font-size: 1.2rem;
}

button {
  background-color: #007bff; 
  border: none;
  border-radius: 5px;
  padding: 2px 8px;
  cursor: pointer;
  font-size: 2rem;
}


</style>
