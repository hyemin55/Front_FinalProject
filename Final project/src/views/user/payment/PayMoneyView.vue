<script setup>
import { ref } from 'vue';

const props = defineProps({
  productInfo: {
    type: Object,
    required: true,
  },
})
const payProductMoney = ref(props.productInfo.totalPrice || '상품총금액');

</script>

<template>
    <section id="pay_money">
        <div class="pay_money_product s">
            <p class="title_text">상품 가격</p>
            <p class="price_text">{{ payProductMoney.toLocaleString() }}원</p>
        </div>

        <div class="operation_symbol">+</div>

        <div class="pay_money_delivery s">
            <p class="title_text">배송비</p>
            <p class="price_text">0원</p>
        </div>

        <div class="operation_symbol">=</div>

        <div class="pay_money_mount s">
            <p class="title_text">총 결제 금액</p>
            <p class="price_text">{{ payProductMoney.toLocaleString() }}원</p>
        </div>
    </section>
</template>

<style scoped>
#pay_money{
    height: 170px;/* 높이 임시 설정 */
    
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
#pay_money>div{
    margin: 0 15px;
}
.s p{
    margin: 0.2rem 0;
}

.pay_money_product{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.pay_money_delivery{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.pay_money_mount{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}


.title_text{
    font-size: 2rem;
    letter-spacing: -0.034rem;
    color: rgb(44, 44, 44);
}
.price_text{
    font-size: 2.5rem;
    font-weight: 600;
    letter-spacing: -0.034rem;
    color: rgb(19, 19, 19);
}
.operation_symbol{
    font-size: 2rem;
}
</style>