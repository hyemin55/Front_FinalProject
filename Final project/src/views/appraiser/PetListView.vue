<template>
  <section>
    <article>
      <AnnouncementComponent />
    </article>
    <article id="Inspection">
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>판매 신청자</th>
            <th>판매신청날짜</th>
            <th>배송도착일</th>
     
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th>카테고리</th>
            <th>브랜드</th>
            <th>상품명</th>
            <th>용량</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th>희망판매가격</th>
            <th>권장판매가격</th>
            <th colspan="2">상세설명</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th>사용 유무</th>
            <th>판매불가 사유</th>
            <th colspan="2">검수결과 참고사항</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th>대표사진</th>
            <th colspan="2">등록사진</th>
            <th>판매현황</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </article>
  </section>
</template>

<script setup>
import AnnouncementComponent from '@/components/admin/AnnouncementComponent.vue';
</script>

<style scoped>
#Inspection {
  background-color: white;
  width: 100%;
  height: auto;
  margin: 30px 0;
  border-radius: 15px;
  border: 5px solid var(--color-main-bloode);
}
table {
  width: 100%;
  font-size: 14px;
  color: #333;
}
tr {
}
th {
  width: 15%;
  border-bottom: 0.5px solid #333;
  padding: 10px;
  background-color: var(--color-main-gray);
  border-start-start-radius: 10px;
  border-start-end-radius: 10px;
}
td {
  width: 15%;
  text-align: center;
  padding: 10px;
}
textarea {
  resize: none;
  height: auto;
  width: 100%;
}
input,
select,
option {
  width: 80%;
}
button {
  padding: 10px;
  background-color: var(--color-main-bloode);
  border-end-end-radius: 7px;
  width: 100%;
  text-align: center;
  font-size: 1.8rem;
  color: white;
}
</style>
