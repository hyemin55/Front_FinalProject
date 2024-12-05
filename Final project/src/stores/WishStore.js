import { defineStore } from "pinia";

export const useWishStore = defineStore('wish', {
    state: ()=>({
        wishList : JSON.parse(localStorage.getItem('wishList')) || [],
    }),
    actions:{
        // 찜목록에 추가(기본추가 / 이미있으면 삭제)
        makeWishList(product){
            // 들어오는 id값 하나라 객체가 아니다. 그렇기 때문에 뒤에 .productId가 안들어가되됨
            // product.productId 이렇게 찾아야할 값이 => product인 것이다.
            console.log('pinia에 들어온 값', product)
            const aready = this.wishList.find(item => item === product);          

            if(aready){
                this.wishList = this.wishList.filter(item => item !== product);
                localStorage.setItem('wishList', JSON.stringify(this.wishList))
            }
            else{
                this.wishList.push(product)
                localStorage.setItem('wishList', JSON.stringify(this.wishList))
            }
        },
        removeWishList(){
            localStorage.removeItem('wishList');
            this.wishList = [];
        },
        
    },
    getter:{}
    
});