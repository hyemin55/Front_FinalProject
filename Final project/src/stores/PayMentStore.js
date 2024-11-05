const { defineStore } = require("pinia");

export const usePayMentStore = defineStore('payment', {
    state: ()=>({
        payProduct : ref([]),
    }),
    actions: {
        productScan(item){
            
        }
    }
});