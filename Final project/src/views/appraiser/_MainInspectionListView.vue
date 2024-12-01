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
            <th>카테고리</th>
            <th>브랜드</th>
            <th>상품명</th>
            <th>용량</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>NV103455k234</td>
            <td>
              <select required>
                <option value="">선택</option>
                <option value="Perfurm">Perfurm</option>
                <option value="Diffuser">Diffuser</option>
                <option value="Candle">Candle</option>
              </select>
            </td>
            <td>
              <input type="search" placeholder="브랜드 검색" />
              <option value="">선택값</option>
            </td>
            <td>
              <input type="search" placeholder="상품명 검색" />
              <option value="">선택값</option>
            </td>
            <td>
              <input type="number" max="10000" placeholder="용량" required />ml
            </td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th>판매 신청자</th>
            <th>판매신청날짜</th>
            <th>배송현황</th>
            <th>배송도착일</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>빵빵덕 귀여워</td>
            <td>2024-12-01</td>
            <td>배송중</td>
            <td>2024-12-02</td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th>사진</th>
            <th>대표사진</th>
            <th>상세설명</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><img src="@/assets/img/빵빵덕세안핑크.png" alt="" style="width: 10%" /></td>
            <td><img src="@/assets/img/빵빵덕세안핑크.png" alt="" style="width: 10%" /></td>
            <td>판매자가 작성한 상세 정보 내용</td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th>희망판매가격</th>
            <th>권장판매가격</th>
            <th>검수결과</th>
            <th>등급</th>
            <th>검수결과 참고사항</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>100,000</td>
            <td>100,000</td>
            <td>
              <select name="TestResults" id="">
                <option value="Y">합격</option>
                <option value="N">불합격</option>
              </select>
            </td>
            <td>
              <select name="Rating" id="">
                <option value="NotForSale">판매불가</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
              </select>
            </td>
            <td><textarea name="" id="" maxlength="1000" placeholder="기타사항을 입력해주세요(최대 1000자)"></textarea></td>
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
  background-color: antiquewhite;
  width: 100%;
  height: auto;
  margin: 10px 0;
  border-radius: 10px;
}
</style>
