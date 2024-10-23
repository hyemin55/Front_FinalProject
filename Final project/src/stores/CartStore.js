import  { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
    state: ()=>({
        cartItems: [],
    }),
    actions:{
        addItem(item){
            const Duplicatecheck = this.cartItems.find(cartItem => cartItem.productId === item.productId);
            if(Duplicatecheck){
                Duplicatecheck.quantity++;
            }
            else{
                this.cartItems.push({ ...item, quantity: 1, isChecked: false });
            }
        },

        toggleAllCheck(isChecked) {
            this.cartItems.forEach(item => {
                console.log(isChecked) //이거는 작동됨 
                // 바뀌는것은 확인이 되었지만 
                // 이미 생성된 컴포넌트들의 상태를 바꾸지 못한다.
                item.isChecked = isChecked;
            });
        },
    }

})