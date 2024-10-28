import { GLOBAL_URL } from '@/api/util';
import  { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCartStore = defineStore('cart', {
    state: ()=>({
        cartItems: [],
        // ↓ axios 통신으로 데이터베이스에서 통신할 id를 모으기 위해서 사용하는 배열이다.
        cartCheckList: [],
    }),
    actions:{
        // 장바구니 담기
        addItem(item){
            const Duplicatecheck = this.cartItems.find(cartItem => cartItem.productId === item.productId);
            if(Duplicatecheck){
                Duplicatecheck.quantity++;
            }
            else{
                this.cartItems.push({ ...item, quantity: 1, isChecked: true });
            }
        },
        // 장바구니 삭제
        removeItem(){
            this.cartItems = this.cartItems.filter(item => !item.isChecked);
            this.cartCheckList = [];
        },
        // 토글 전체선택
        toggleAllCheck(isChecked) {
            this.cartItems.forEach(item => {
                item.isChecked = isChecked;
            })
        },
        // 장바구니 회원정보 불러오기
        updateCart(items) {
            // 장바구니 초기화
            this.cartItems = [];
            items.forEach(item => {
                const p = {
                    productId: item.productResDto.productId,
                    productName: item.productResDto.productName,
                    images: item.productResDto.images,
                    price: item.productResDto.price,
                    quantity: item.quantity || 1, // 기본값 1 설정
                    isChecked: true, // 기본 체크 여부
                };
                // 생성한 객체를 cartItems에 추가
                this.cartItems.push(p);
            });
        },

        // 수량변경
        upQuantity(productId){
            console.log(productId)
            const item = this.cartItems.find(cartItem => cartItem.productId === productId);
            console.log(item.quantity);
            if (item) {
                item.quantity += 1;
            }
        },
        downQuantity(productId){
            console.log(productId)
            const item = this.cartItems.find(cartItem => cartItem.productId === productId);
            console.log(item.quantity);
            if (item) {
                item.quantity -= 1;
            }
        },
    },

    getters: {
        // 선택 상품 가격합계
        totalPrice: (state) => {
          return state.cartCheckList.reduce((sum, item) => sum + item.price * item.quantity, 0);
        },
    },

    persist:{
        enabled: true,
        strategies: [
            {
                paths: ['cartItems'], 
                storage: localStorage,
            },
        ],
    },

})