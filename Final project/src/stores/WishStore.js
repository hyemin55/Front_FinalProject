import { defineStore } from "pinia";

export const useWishStore = defineStore('wish', {
    state: ()=>({
        wishList:[],
    }),
    actions:{
        makeWishList(product){
            console.log('pinia에 들어온 값', product)
            const aready = this.wishList.find(
                wishList => wishList.productId === product.productId)
                
            if(aready){
                this.wishList.filter(item => !item.wishList);
                console.log('찜삭제', this.wishList)
            }
            else{
                this.wishList.push(product)
                console.log('찜추가', this.wishList)
            }

        },

    },
    getter:{}
    
});