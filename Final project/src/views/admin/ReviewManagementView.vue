<template>
  <section>
    <article>
      <AnnouncementComponent />
    </article>
    <article id="sortByAndSearch">
      <select name="sortBy" id="sortBy">
        <option value="total">전체</option>
        <option value="category">카테고리</option>
        <option value="product">상품명</option>
        <option value="rating">평점</option>
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
            <th>카테고리</th>
            <th>리뷰내용</th>
            <th>평점</th>
            <th>작성자</th>
            <th>작성일자</th>
            <th>도움되요</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          <tr class="TableBody">
            <td>1</td>
            <td><img class="productImages" src="@/assets/img/빵빵덕세안.png" alt="" /></td>
            <td>카레토 프린트 캔들</td>
            <td>340 ml</td>
            <td>Candle</td>
            <td>너무 좋아요. 향에 취하네요 ໒꒰ྀི◜ ཅ ◝ ꒱ྀི১◞♡</td>
            <td>★5</td>
            <td>흰수염</td>
            <td>2024-11-20</td>
            <td>20</td>
            <td class="stateButtons">
              <button class="stateButton" @click="HideButton">숨기기</button>
              <button class="stateButton" @click="DeleteButton">삭제</button>
            </td>
          </tr>
          <tr class="TableBody">
            <td>1</td>
            <td><img class="productImages" src="@/assets/img/빵빵덕세안.png" alt="" /></td>
            <td>카레토 프린트 캔들</td>
            <td>340 ml</td>
            <td>Candle</td>
            <td>너무 좋아요. 향에 취하네요 ໒꒰ྀི◜ ཅ ◝ ꒱ྀི১◞♡</td>
            <td>★5</td>
            <td>흰수염</td>
            <td>2024-11-20</td>
            <td class="stateButtons">
              <button class="stateButton" @click="HideButton">숨기기</button>
              <button class="stateButton" @click="DeleteButton">삭제</button>
            </td>
          </tr>
          <tr class="TableBody">
            <td>1</td>
            <td><img class="productImages" src="@/assets/img/빵빵덕세안.png" alt="" /></td>
            <td>카레토 프린트 캔들</td>
            <td>340 ml</td>
            <td>Candle</td>
            <td>너무 좋아요. 향에 취하네요 ໒꒰ྀི◜ ཅ ◝ ꒱ྀི১◞♡</td>
            <td>★5</td>
            <td>흰수염</td>
            <td>2024-11-20</td>
            <td class="stateButtons">
              <button class="stateButton" @click="HideButton">숨기기</button>
              <button class="stateButton" @click="DeleteButton">삭제</button>
            </td>
          </tr>
          <tr class="TableBody">
            <td>1</td>
            <td><img class="productImages" src="@/assets/img/빵빵덕세안.png" alt="" /></td>
            <td>카레토 프린트 캔들</td>
            <td>340 ml</td>
            <td>Candle</td>
            <td>너무 좋아요. 향에 취하네요 ໒꒰ྀི◜ ཅ ◝ ꒱ྀི১◞♡</td>
            <td>★5</td>
            <td>흰수염</td>
            <td>2024-11-20</td>
            <td class="stateButtons">
              <button class="stateButton" @click="HideButton">숨기기</button>
              <button class="stateButton" @click="DeleteButton">삭제</button>
            </td>
          </tr>
          <tr class="TableBody">
            <td>1</td>
            <td><img class="productImages" src="@/assets/img/빵빵덕세안.png" alt="" /></td>
            <td>카레토 프린트 캔들</td>
            <td>340 ml</td>
            <td>Candle</td>
            <td>너무 좋아요. 향에 취하네요 ໒꒰ྀི◜ ཅ ◝ ꒱ྀི১◞♡</td>
            <td>★5</td>
            <td>흰수염</td>
            <td>2024-11-20</td>
            <td class="stateButtons">
              <button class="stateButton" @click="HideButton">숨기기</button>
              <button class="stateButton" @click="DeleteButton">삭제</button>
            </td>
          </tr>
          <tr class="TableBody">
            <td>1</td>
            <td><img class="productImages" src="@/assets/img/빵빵덕세안.png" alt="" /></td>
            <td>카레토 프린트 캔들</td>
            <td>340 ml</td>
            <td>Candle</td>
            <td>너무 좋아요. 향에 취하네요 ໒꒰ྀི◜ ཅ ◝ ꒱ྀི১◞♡</td>
            <td>★5</td>
            <td>흰수염</td>
            <td>2024-11-20</td>
            <td class="stateButtons">
              <button class="stateButton" @click="HideButton">숨기기</button>
              <button class="stateButton" @click="DeleteButton">삭제</button>
            </td>
          </tr>
          <tr class="TableBody">
            <td>1</td>
            <td><img class="productImages" src="@/assets/img/빵빵덕세안.png" alt="" /></td>
            <td>카레토 프린트 캔들</td>
            <td>340 ml</td>
            <td>Candle</td>
            <td>너무 좋아요. 향에 취하네요 ໒꒰ྀི◜ ཅ ◝ ꒱ྀི১◞♡</td>
            <td>★5</td>
            <td>흰수염</td>
            <td>2024-11-20</td>
            <td class="stateButtons">
              <button class="stateButton" @click="HideButton">숨기기</button>
              <button class="stateButton" @click="DeleteButton">삭제</button>
            </td>
          </tr>
          <tr class="TableBody">
            <td>1</td>
            <td><img class="productImages" src="@/assets/img/빵빵덕세안.png" alt="" /></td>
            <td>카레토 프린트 캔들</td>
            <td>340 ml</td>
            <td>Candle</td>
            <td>너무 좋아요. 향에 취하네요 ໒꒰ྀི◜ ཅ ◝ ꒱ྀི১◞♡</td>
            <td>★5</td>
            <td>흰수염</td>
            <td>2024-11-20</td>
            <td class="stateButtons">
              <button class="stateButton" @click="HideButton">숨기기</button>
              <button class="stateButton" @click="DeleteButton">삭제</button>
            </td>
          </tr>
          <tr class="TableBody">
            <td>1</td>
            <td><img class="productImages" src="@/assets/img/빵빵덕세안.png" alt="" /></td>
            <td>카레토 프린트 캔들</td>
            <td>340 ml</td>
            <td>Candle</td>
            <td>너무 좋아요. 향에 취하네요 ໒꒰ྀི◜ ཅ ◝ ꒱ྀི১◞♡</td>
            <td>★5</td>
            <td>흰수염</td>
            <td>2024-11-20</td>
            <td class="stateButtons">
              <button class="stateButton" @click="HideButton">숨기기</button>
              <button class="stateButton" @click="DeleteButton">삭제</button>
            </td>
          </tr>
          <tr class="TableBody">
            <td>1</td>
            <td><img class="productImages" src="@/assets/img/빵빵덕세안.png" alt="" /></td>
            <td>카레토 프린트 캔들</td>
            <td>340 ml</td>
            <td>Candle</td>
            <td>너무 좋아요. 향에 취하네요 ໒꒰ྀི◜ ཅ ◝ ꒱ྀི১◞♡</td>
            <td>★5</td>
            <td>흰수염</td>
            <td>2024-11-20</td>
            <td class="stateButtons">
              <button class="stateButton" @click="HideButton">숨기기</button>
              <button class="stateButton" @click="DeleteButton">삭제</button>
            </td>
          </tr>
        </tbody>
      </table>
    </article>
  </section>
</template>

<script setup>
import AnnouncementComponent from '@/components/admin/AnnouncementComponent.vue';
import { ref } from 'vue';

const dolode = () => {};
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
  font-size: 14px;
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
.stateButtons {
}
.stateButton {
  background-color: var(--color-main-gray);
  padding: 10px;
  border-radius: 10px;
  margin: 0 5px;
}
</style>
