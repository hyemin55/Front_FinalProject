<script setup></script>

<template>
    <article class="products">
        <div class="product_img">
            <ul>
                <li class="cart_push"></li>
                <li class="wish_push"></li>
            </ul>
        </div>
        <div class="product_text">
            <ul>
                <li class="product_title">상품이름</li>
                <li class="product_content">상품설명</li>
            </ul>
            <ul>
                <li class="product_price">￦12,000</li>
                <li class="product_review">별점(4.8)</li>
            </ul>
        </div>
    </article>
</template>

<style scoped>
/* 전체설정 */
.products{
    width: 305px;
    height: 390px;
    border: solid rgba(0, 0, 0, 0.1) 1px;
    border-radius: 6px;
    overflow: hidden;
}
/* 상단_이미지 설정 */
.product_img{
    width: 100%;
    height: 305px;
    background-color: aliceblue;
}
.product_img>ul{
    
}
.product_img>li{
    
}

/* 하단_텍스트 설정 */
.product_text{
    width: 100%;
    height: 85px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.product_text ul:nth-child(1){

}
.product_text ul:nth-child(2){
    display: flex;
    justify-content: space-between;
}
.product_title{
    font-size: 18px;
}
.product_content{

}
.product_price{
    font-size: 20px;
}
</style>