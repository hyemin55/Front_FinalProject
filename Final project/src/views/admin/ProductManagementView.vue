<template>
  <section>
    <article>
      <AnnouncementComponent />
    </article>
    <article id="sortByAndSearch">
      <select name="sortBy" id="sortBy">
        <option value="total">전체</option>
        <option value="onSale">판매중</option>
        <option value="soldOut">품절</option>
        <option value="hiding">숨김</option>
        <option value="waitingForSale">판매대기</option>
        <option value="saleCompleted">판매완료</option>
      </select>
      <div id="search">
        <input type="search" id="productSearch" placeholder="상품명 검색" />
        <img class="searchIcon" src="@/assets/img/icon/free-icon-font-search-3917132.png" alt="productSearch" />
      </div>
    </article>
    <article id="Inspection">
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th colspan="2">상품명</th>
            <th>옵션</th>
            <th>판매가</th>
            <th>카테고리</th>
            <th>상태</th>
            <th>재고</th>
            <th>등록일</th>
            <th>수정일</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td><img class="productImages" src="@/assets/img/빵빵덕세안.png" alt="" /></td>
            <td>카레토 프린트 캔들</td>
            <td>340 ml</td>
            <td>134,000</td>
            <td>Candle</td>
            <td>
              <select name="state" id="">
                <option value="total">전체</option>
                <option value="onSale">판매중</option>
                <option value="soldOut">품절</option>
                <option value="hiding">숨김</option>
                <option value="waitingForSale">판매대기</option>
                <option value="saleCompleted">판매완료</option>
              </select>
            </td>
            <td>2</td>
            <td>2024-11-19</td>
            <td>2024-11-20</td>
          </tr>
        </tbody>
      </table>
    </article>
  </section>
</template>

<script setup>
import AnnouncementComponent from '@/components/admin/AnnouncementComponent.vue';

const dolode = () => {};
dolode();
</script>

<style scoped>
#Inspection {
  background-color: white;
  width: 100%;
  height: auto;
  border-radius: 15px;
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
  background-color: antiquewhite;
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
.productImages {
  width: 50px;
  height: 50px;
}

table {
  width: 100%;
  font-size: 14px;
  color: #333;
}
</style>
