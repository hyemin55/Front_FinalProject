<script setup>
import { addCartDatabase } from '@/api/cartApi';
import { GLOBAL_URL } from '@/api/util';
import { wishClick, wishList } from '@/api/wishApi';
import { useCartStore } from '@/stores/CartStore';
import { useUserStore } from '@/stores/Login';
import { useWishStore } from '@/stores/WishStore';
import { computed, ref, watch, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

// 로그인 pinia
const userStore = useUserStore();
const userLogin = computed(() => userStore.loginCheck);

const wishStore = useWishStore();
const cartStore = useCartStore();

// 전체석택
let allChecked = ref(false);
let allCheckedList = ref([]);

const allCheck = () => {
  if (allChecked.value == true) {
    data.value.forEach(product => {
      product.isChecked = allChecked.value;
      if (product.isChecked) {
        allCheckedList.value.push(product.productId);
        console.log(allCheckedList.value);
      }
    });
  } else {
    data.value.forEach(product => {
      product.isChecked = allChecked.value;
    });
    allCheckedList.value = [];
  }
};
const allCheckDelete = () => {
  // 추후에 왜 배열로 보내지 않고 값 하나하나 보냈나 의문을 가질 수 있는데,
  // 벡에서 받는 데이터를 배열로 받지 않아서 그냥 풀어서 보낸거다.
  const normalArray = [...allCheckedList.value];
  if (normalArray.length === 0) {
    alert('선택된 제품이 없습니다.');
    return;
  }
  normalArray.forEach((productId) => {
    wishDelete(productId, true);
  });
};

// 찜 목록 정보를 DB에서 가져옴.
const data = ref([]);
const LoadingwishList = async () => {
  const wishListData = await wishList();
  data.value = wishListData.map(product => ({
    ...product,
    isChecked: false,
  }));
  console.log('찜목록 데이터', data.value);
};

// 화면 랜더링
watchEffect(() => {
  LoadingwishList();
});

// 찜목록 삭제
const wishDelete = async (productId, check) => {
  if (check == true) {
    await wishClick(productId);
    console.log('찜목록 삭제');
    wishStore.makeWishList(productId);
    await LoadingwishList();
  } else {
    alert('선택된 제품이 없습니다.');
  }
};

// 장바구니 담기
const addCart = (productId, check) => {
  const data = {
    productId: productId,
    quantity: 1,
  };
  const cartData = {
    productId: productId,
    brandName : "",
    content : "",
    dtype : "",
    images : [],
    mainImage : {filename: 'p_011.png', path: 'images/file/\\p_011.png', fileDesc: 'perfume11'},
    price : 100800,
    productId : 37,
    productName : "소바쥬 오 드 뚜왈렛",
    registerDate : "2024-10-23 06:49:37",
    reviewCount : 0,
    size : 30   
  };
  if (userLogin.value && check == true) {
    cartStore.addItem(cartData);
    addCartDatabase(data);
    alert('장바구니에 담았습니다.');
  } else {
    alert('선택된 제품이 없습니다.');
  }
};

// 상품으로 이동
const router = useRouter();

const moveDetail = (productId, productSize) => {
  router.push({
    path: `/productsdetail/${productId}`,
    query: {
      size: productSize,
    },
  });
};
</script>

<template>
  <div>
    <h1 class="wishlist_title">찜 목록</h1>
    <div class="product_select">
      <p>
        <input id="allcheck" type="checkbox" @change="allCheck" v-model="allChecked" /><label for="allcheck"
          >전체 선택</label
        >
      </p>
      <p @click="allCheckDelete">선택 삭제하기</p>
    </div>

    <!-- 상품 컴포넌트 -->
    <div class="wish_product" v-for="product in data" :key="product.productId">
      <input class="pro_check" type="checkbox" v-model="product.isChecked" />

      <div class="product_box">
        <div class="img_box">
          <img
            @click="moveDetail(product.productId, product.size)"
            :src="`${GLOBAL_URL}/api/file/download/${product.mainImage}`"
            alt=""
          />
        </div>
        <ul @click="moveDetail(product.productId, product.size)" class="content_box">
          <li>상품명 : {{ product.productName }}</li>
          <li>가격 : {{ product.productPrice }}</li>
          <li>옵션 : {{ product.size }}</li>
        </ul>
      </div>

      <div class="btn">
        <div class="cart_btn" @click="addCart(product.productId, product.isChecked)">장바구니 담기</div>
        <div class="delet_btn" @click="wishDelete(product.productId, product.isChecked)">삭제</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 전체설정 */
.wishlist_title {
  font-size: 3.2rem;
  font-weight: 400;
  border-bottom: solid 1px #000;
  padding: 20px 0;
  margin-top: 32px;
}
.product_select {
  width: 100%;
  height: 57px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #000;
  padding: 0 7px;
}
.product_select p {
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 1.4rem;
}
.product_select p input {
  margin: 0 5px;
}
.product_select p label {
  cursor: pointer;
}

/* 상품컴포넌트 설정 ############################ */
.wish_product {
  position: relative;
  width: 100%;
  height: 185px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 4px solid var(--color-main-gray);
}
.pro_check {
  position: absolute;
  top: 12px;
  left: 5px;
}
/* 상품설정 */
.product_box {
  display: flex;
  align-items: center;
  height: 100%;
}
.img_box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 240px;
  height: 100%;
}
.img_box img {
  height: 80%;
  width: auto;
  background-color: var(--color-main-pink);
  border-radius: 1.5rem;
  cursor: pointer;
}
.content_box li:nth-child(1) {
  font-size: 2rem !important;
}
.content_box li {
  cursor: pointer;
  font-size: 1.6rem;
  margin: 10px 0;
}
/* 버튼설정 */
.btn > div {
  width: 150px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-align: center;
  font-size: 1.3rem;
  border: 1px solid var(--color-main-gray);
  border-radius: 0.7rem;
  margin: 5px 0;
}
.btn > div:hover {
  background-color: #000;
  color: #fff;
}
</style>
