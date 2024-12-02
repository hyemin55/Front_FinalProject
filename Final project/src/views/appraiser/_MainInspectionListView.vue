<template>
  <section>
    <article>
      <AnnouncementComponent />
    </article>
    <article></article>
    <article id="Inspection">
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>판매 신청자</th>
            <th>판매신청날짜</th>
            <th>배송현황</th>
            <th>배송도착일</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>NV103455k234</td>
            <td>빵빵덕 귀여워</td>
            <td>2024-12-01</td>
            <td>배송중</td>
            <td>2024-12-02</td>
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
            <td>
              <select required>
                <option value="">선택</option>
                <option value="Perfurm">Perfurm</option>
                <option value="Diffuser">Diffuser</option>
                <option value="Candle">Candle</option>
              </select>
            </td>
            <td>
              <input type="text" v-model="keyword" placeholder="브랜드 검색" />
              <option value="keyword">선택값</option>
              <ul v-if="suggestions.length">
                <li v-for="(suggestion, index) in suggestions" :key="index">
                  {{ suggestion.name }}
                </li>
              </ul>
            </td>
            <td>
              <input type="search" placeholder="상품명 검색" />

              <option value="">선택값</option>
            </td>
            <td><input type="number" max="10000" placeholder="용량" required />ml</td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th>사진</th>
            <th>대표사진</th>
            <th colspan="2">상세설명</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><img src="@/assets/img/빵빵덕세안핑크.png" alt="" style="width: 10%" /></td>
            <td><img src="@/assets/img/빵빵덕세안핑크.png" alt="" style="width: 10%" /></td>
            <td colspan="2">판매자가 작성한 상세 정보 내용</td>
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
            <td><input type="number" min="5000" placeholder="권장판매가격(5,000원 이상)" /></td>
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
      <div>
        <button>전송</button>
      </div>
    </article>
  </section>
</template>

<script setup>
import { GLOBAL_URL } from '@/api/util';
import AnnouncementComponent from '@/components/admin/AnnouncementComponent.vue';
import axios from 'axios';
import { ref, watch } from 'vue';

const InspectionList = ref();

// 검색어와 검색 결과를 상태로 관리
const keyword = ref('');
const suggestions = ref([]);
console.log(keyword.value);
// 검색 로직
const fetchSuggestions = async () => {
  if (keyword.value.length > 1) {
    // 최소 2자 입력 후 검색
    console.log(keyword.value);
    try {
      const response = await axios.get(`${GLOBAL_URL}/api/inspection/search-brands`, { params: { keyword: keyword.value } });
      suggestions.value = response.data;
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  } else {
    suggestions.value = [];
  }
};

// const dolode = async () => {
//   const InspectionListRes = await axios.get(`${GLOBAL_URL}/api/inspection/list`);
//   console.log(InspectionListRes);
//   InspectionList.value = InspectionListRes.data;
//   console.log(InspectionList.value);
// };

// 입력값 변경 시 fetchSuggestions 호출
watch(keyword, fetchSuggestions);
</script>

<style scoped>
#Inspection {
  background-color: white;
  width: 100%;
  height: auto;
  margin: 10px 0;
  border-radius: 10px;
}
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  color: #333;
}
tr {
}
th {
  border-bottom: 0.5px solid #333;
  padding: 10px;
  background-color: antiquewhite;
  border-start-start-radius: 10px;
  border-start-end-radius: 10px;
}
td {
  text-align: center;
  padding: 10px;
}
textarea {
  resize: none;
  height: auto;
}
button {
  padding: 10px;
  background-color: orange;
  border-radius: 10px;
  width: 10%;
  text-align: center;
  font-size: 1.8rem;
}
</style>
