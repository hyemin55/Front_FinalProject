import  { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
    state: ()=>({
        cartItems: [],
    }),
    actions:{
        addItem(item){
            this.cartItems.push(item);
        }
    }

})