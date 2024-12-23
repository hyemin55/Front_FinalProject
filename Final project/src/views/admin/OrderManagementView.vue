<template>
  <section>
    <article>
      <AnnouncementComponent />
    </article>
    <article id="sortByAndSearch">
      <select name="sortBy" id="sortBy">
        <option value="total">전체</option>
        <option value="PaymentCompleted">결제완료</option>
        <option value="InDelivery">배송중</option>
        <option value="DeliveryCompleted">배송완료</option>
        <option value="PurchaseConfirmation">구매확정</option>
        <option value="CancelPurchase">구매취소</option>
        <option value="WaitingForPurchaseReturn">구매반품대기</option>
        <option value="PurchaseReturnCompleted">구매반품완료</option>
        <option value="WaitingForSalesReturn">판매반품대기</option>
        <option value="SalesReturnCompleted">판매반품완료</option>
      </select>
      <div id="search">
        <input type="search" id="productSearch" placeholder="상품명 검색" />
        <img class="searchIcon" src="@/assets/img/icon/free-icon-font-search-3917132.png" alt="productSearch" />
      </div>
    </article>
    <article id="Inspection">
      <table>
        <thead>
          <tr class="TableHeader">
            <th>No.</th>
            <th colspan="2">상품명</th>
            <th>옵션</th>
            <th>판매가</th>
            <th>카테고리</th>
            <th>상태</th>
            <th>수량</th>
            <th>주문일</th>
            <th>배송완료일</th>
            <th>구매확정</th>
            <th>구매자</th>
            <th>정산</th>
          </tr>
        </thead>
        <tbody>
          <tr class="TableBody">
            <td>1</td>
            <td><img class="productImages" src="@/assets/img/빵빵덕세안.png" alt="" /></td>
            <td>카레토 프린트 캔들</td>
            <td>340 ml</td>
            <td>134,000</td>
            <td>Candle</td>
            <td>
              <select name="state" id="" v-model="selectState.value">
                <option :value="list" v-for="(list, index) in stateOption" :key="index">{{ list.name }}</option>
              </select>
            </td>
            <td>1</td>
            <td>2024-11-19</td>
            <td>2024-11-20</td>
            <td>2024-11-25</td>
            <td>2</td>
            <td>Y</td>
          </tr>
          <tr class="TableBody">
            <td>1</td>
            <td><img class="productImages" src="@/assets/img/빵빵덕세안.png" alt="" /></td>
            <td>카레토 프린트 캔들</td>
            <td>340 ml</td>
            <td>134,000</td>
            <td>Candle</td>
            <td>
              <select name="state" id="" v-model="selectState.value">
                <option :value="list" v-for="(list, index) in stateOption" :key="index">{{ list.name }}</option>
              </select>
            </td>
            <td>1</td>
            <td>2024-11-19</td>
            <td>2024-11-20</td>
            <td>2024-11-25</td>
            <td>2</td>
            <td>Y</td>
          </tr>
          <tr class="TableBody">
            <td>1</td>
            <td><img class="productImages" src="@/assets/img/빵빵덕세안.png" alt="" /></td>
            <td>카레토 프린트 캔들</td>
            <td>340 ml</td>
            <td>134,000</td>
            <td>Candle</td>
            <td>
              <select name="state" id="" v-model="selectState.value">
                <option :value="list" v-for="(list, index) in stateOption" :key="index">{{ list.name }}</option>
              </select>
            </td>
            <td>1</td>
            <td>2024-11-19</td>
            <td>2024-11-20</td>
            <td>2024-11-25</td>
            <td>2</td>
            <td>Y</td>
          </tr>
          <tr class="TableBody">
            <td>1</td>
            <td><img class="productImages" src="@/assets/img/빵빵덕세안.png" alt="" /></td>
            <td>카레토 프린트 캔들</td>
            <td>340 ml</td>
            <td>134,000</td>
            <td>Candle</td>
            <td>
              <select name="state" id="" v-model="selectState.value">
                <option :value="list" v-for="(list, index) in stateOption" :key="index">{{ list.name }}</option>
              </select>
            </td>
            <td>1</td>
            <td>2024-11-19</td>
            <td>2024-11-20</td>
            <td>2024-11-25</td>
            <td>2</td>
            <td>Y</td>
          </tr>
          <tr class="TableBody">
            <td>1</td>
            <td><img class="productImages" src="@/assets/img/빵빵덕세안.png" alt="" /></td>
            <td>카레토 프린트 캔들</td>
            <td>340 ml</td>
            <td>134,000</td>
            <td>Candle</td>
            <td>
              <select name="state" id="" v-model="selectState.value">
                <option :value="list" v-for="(list, index) in stateOption" :key="index">{{ list.name }}</option>
              </select>
            </td>
            <td>1</td>
            <td>2024-11-19</td>
            <td>2024-11-20</td>
            <td>2024-11-25</td>
            <td>2</td>
            <td>Y</td>
          </tr>
          <tr class="TableBody">
            <td>1</td>
            <td><img class="productImages" src="@/assets/img/빵빵덕세안.png" alt="" /></td>
            <td>카레토 프린트 캔들</td>
            <td>340 ml</td>
            <td>134,000</td>
            <td>Candle</td>
            <td>
              <select name="state" id="" v-model="selectState.value">
                <option :value="list" v-for="(list, index) in stateOption" :key="index">{{ list.name }}</option>
              </select>
            </td>
            <td>1</td>
            <td>2024-11-19</td>
            <td>2024-11-20</td>
            <td>2024-11-25</td>
            <td>2</td>
            <td>Y</td>
          </tr>
          <tr class="TableBody">
            <td>1</td>
            <td><img class="productImages" src="@/assets/img/빵빵덕세안.png" alt="" /></td>
            <td>카레토 프린트 캔들</td>
            <td>340 ml</td>
            <td>134,000</td>
            <td>Candle</td>
            <td>
              <select name="state" id="" v-model="selectState.value">
                <option :value="list" v-for="(list, index) in stateOption" :key="index">{{ list.name }}</option>
              </select>
            </td>
            <td>1</td>
            <td>2024-11-19</td>
            <td>2024-11-20</td>
            <td>2024-11-25</td>
            <td>2</td>
            <td>Y</td>
          </tr>
          <tr class="TableBody">
            <td>1</td>
            <td><img class="productImages" src="@/assets/img/빵빵덕세안.png" alt="" /></td>
            <td>카레토 프린트 캔들</td>
            <td>340 ml</td>
            <td>134,000</td>
            <td>Candle</td>
            <td>
              <select name="state" id="" v-model="selectState.value">
                <option :value="list" v-for="(list, index) in stateOption" :key="index">{{ list.name }}</option>
              </select>
            </td>
            <td>1</td>
            <td>2024-11-19</td>
            <td>2024-11-20</td>
            <td>2024-11-25</td>
            <td>2</td>
            <td>Y</td>
          </tr>
          <tr class="TableBody">
            <td>1</td>
            <td><img class="productImages" src="@/assets/img/빵빵덕세안.png" alt="" /></td>
            <td>카레토 프린트 캔들</td>
            <td>340 ml</td>
            <td>134,000</td>
            <td>Candle</td>
            <td>
              <select name="state" id="" v-model="selectState.value">
                <option :value="list" v-for="(list, index) in stateOption" :key="index">{{ list.name }}</option>
              </select>
            </td>
            <td>1</td>
            <td>2024-11-19</td>
            <td>2024-11-20</td>
            <td>2024-11-25</td>
            <td>2</td>
            <td>Y</td>
          </tr>
          <tr class="TableBody">
            <td>1</td>
            <td><img class="productImages" src="@/assets/img/빵빵덕세안.png" alt="" /></td>
            <td>카레토 프린트 캔들</td>
            <td>340 ml</td>
            <td>134,000</td>
            <td>Candle</td>
            <td>
              <select name="state" id="" v-model="selectState.value">
                <option :value="list" v-for="(list, index) in stateOption" :key="index">{{ list.name }}</option>
              </select>
            </td>
            <td>1</td>
            <td>2024-11-19</td>
            <td>2024-11-20</td>
            <td>2024-11-25</td>
            <td>2</td>
            <td>Y</td>
          </tr>
        </tbody>
      </table>
    </article>
  </section>
</template>

<script setup>
import AnnouncementComponent from '@/components/admin/AnnouncementComponent.vue';
import { ref } from 'vue';

const selectState = ref([]);
const stateOption = [
  { value: 'PaymentCompleted', name: '결제완료' },
  { value: 'InDelivery', name: '배송중' },
  { value: 'DeliveryCompleted', name: '배송완료' },
  { value: 'PurchaseConfirmation', name: '구매확정' },
  { value: 'CancelPurchase', name: '구매취소' },
  { value: 'WaitingForPurchaseReturn', name: '구매반품대기' },
  { value: 'PurchaseReturnCompleted', name: '구매반품완료' },
  { value: 'WaitingForSalesReturn', name: '판매반품대기' },
  { value: 'SalesReturnCompleted', name: '판매반품완료' },
];

const dolode = () => {
  selectState.value = stateOption[0];
};
dolode();
</script>

<style scoped>
#Inspection {
  background-color: white;
  width: 100%;
  height: auto;
  border-radius: 15px;
  padding: 5px;
  text-align: center;
}
input,
select,
option {
  border: none;
  background-color: unset;
}
input:focus,
select:focus,
option:focus {
  outline: none;
}
#sortByAndSearch {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 30px;
  margin: 20px 0 10px 0;
}
#sortBy,
#search {
  background-color: white;
  border-radius: 10px;
  padding: 0 10px 0 5px;
  align-items: center;
}
#sortBy {
  width: 150px;
}
#search {
  width: 30%;
  display: flex;
  justify-content: space-between;
}
#productSearch {
  width: 100%;
}
.searchIcon {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.TableHeader {
}
.productImages {
  width: 45px;
  height: 45px;
  padding: 2px;
  border: 0.5px solid var(--color-main-Lgray);
  border-radius: 5px;
}
table {
  width: 100%;
  font-size: 1.4rem;
}
td {
  height: 50px;
  border-bottom: 0.5px solid var(--color-main-gray);
}
th {
  border-bottom: 2px solid var(--color-main-gray);
  height: 40px;
}
.TableBody > td:nth-child(3) {
  text-align: left;
}
</style>
