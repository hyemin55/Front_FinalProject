<template>
  <section>
    <article>
      <AnnouncementComponent />
    </article>
    <article></article>
    <article id="Inspection" v-for="(list, index) in InspectionList" :key="index">
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
            <td>{{ list.saleApplicationId }}</td>
            <td>{{ list.seller }}</td>
            <td>{{ list.saleApplicationDate }}</td>
            <td>{{ list.shipStatus }}</td>
            <td>{{ list.shippedDate }}</td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th>카테고리</th>
            <th colspan="2">브랜드</th>
            <th colspan="2">상품명</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <select required>
                <option value="default">{{ list.category }}</option>
                <option value="" disabled>-------</option>
                <option value="Perfurm">Perfurm</option>
                <option value="Diffuser">Diffuser</option>
                <option value="Candle">Candle</option>
              </select>
            </td>
            <!-- 브랜드 검색 -->
            <td rowspan="2">
              <input type="text" v-model="list.brandKeyword" placeholder="브랜드 검색" @input="fetchSuggestions('brand', list)" /><br />
              <select v-if="list.brandSuggestions.length" v-model="list.selectedBrand">
                <option :value="brand.brandId + '.' + brand.brandName" v-for="(brand, index) in list.brandSuggestions" :key="index">{{ brand.brandId }}.{{ brand.brandName }}</option>
              </select>
              <input v-else type="text" placeholder="직접입력" />
            </td>
            <td rowspan="2">
              기존값: {{ list.brand }}
              <br />
              수정값:{{ list.selectedBrand }}
            </td>
            <!-- 상품명 검색 => 추후 브랜드 선택하면 select창이 뜨도록-->
            <td>
              <input type="text" v-model="list.productKeyword" placeholder="상품명 검색" @input="fetchSuggestions('product', list)" /><br />
              <select v-if="list.productSuggestions.length" v-model="list.selectedProduct">
                <option :value="product.productName" v-for="(product, index) in list.productSuggestions" :key="index">
                  {{ product.productName }}
                </option>
              </select>
              <input v-else type="text" placeholder="직접입력" />
            </td>
            <td rowspan="2">
              기존값: {{ list.productName }}
              <br />
              수정값:{{ list.selectedBrand }}
            </td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th>용량 (ml)</th>
            <th>사진</th>
            <th>대표사진</th>
            <th colspan="2">상세설명</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowspan="2">
              기존값: {{ list.size }} ml
              <br />
              <input type="number" max="10000" placeholder="용량" required />
            </td>
            <td><img src="@/assets/img/빵빵덕세안핑크.png" alt="" style="width: 50px" /></td>
            <td><img src="@/assets/img/빵빵덕세안핑크.png" alt="" style="width: 50px" /></td>
            <td colspan="2">{{ list.userContent }}</td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th>희망판매가격</th>
            <th>권장판매가격</th>
            <th>검수결과</th>
            <th v-if="TestResult == 'Y' || TestResult == ''">등급</th>
            <th v-if="TestResult == 'N'">반려사유</th>
            <th>검수결과 참고사항</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ list.expectedSellingPrice }}</td>
            <td><input type="number" min="5000" placeholder="권장판매가격(5,000원 이상)" /></td>
            <td>
              <select name="TestResults" id="" v-model="TestResult">
                <option value="" selected disabled>선택</option>
                <option value="" disabled>-------</option>
                <option value="Y">합격</option>
                <option value="N">불합격</option>
              </select>
            </td>
            <td v-if="TestResult == 'Y' || TestResult == ''">
              <select name="Rating" id="" v-model="Rating">
                <option value="" selected disabled>상품 등급 선택</option>
                <option value="" disabled>-------</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
              </select>
            </td>
            <td v-if="TestResult == 'N'">
              <select name="NotForSale" id="" v-model="NotForSale">
                <option value="" selected disabled>판매불가 사유 선택</option>
                <option value="" disabled>-------</option>
                <option value="">1.</option>
                <option value="">2.</option>
                <option value="">3.</option>
                <option value="">4.</option>
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
import { ref, watch, watchEffect } from 'vue';

const InspectionList = ref();

// 검색어와 검색 결과를 상태로 관리
// const brandKeyword = ref([]);
// const productKeyword = ref([]);
// const brandSuggestions = ref([]);
// const productSuggestions = ref([]);
// const selectedBrand = ref();
// const selectedProduct = ref();
const TestResult = ref('');
const Rating = ref('');
const NotForSale = ref('');

// 검색 로직
// const selected = (type, event) => {
//   console.log(type, event.target.value);
//   if (type === 'brand') selectedBrand.value = event.target.value;
//   else if (type === 'product') selectedProduct.value = event.target.value;
//   else return;
// };

const fetchSuggestions = async (type, list) => {
  // 검색어가 변경될 때만 API를 호출하는 명령어
  // clearTimeout(debounceTimeout);

  if (type === 'brand' && list.brandKeyword.length > 1) {
    // 최소 2자 입력 후 검색
    console.log(list.brandKeyword);
    try {
      const brandResponse = await axios.get(`${GLOBAL_URL}/api/inspection/search-brands`, { params: { keyword: list.brandKeyword } });
      console.log(brandResponse);
      list.brandSuggestions = brandResponse.data;
    } catch (error) {
      console.error('Error fetching brandSuggestions:', error);
    }
  } else if (type === 'product' && list.productKeyword.length > 1) {
    try {
      const productResponse = await axios.get(`${GLOBAL_URL}/api/inspection/search-products`, { params: { keyword: list.productKeyword } });
      console.log(productResponse);
      list.productSuggestions = productResponse.data;
    } catch (error) {
      console.error('Error fetching productSuggestions:', error);
    }
  } else {
    return;
  }
};

const dolode = async () => {
  try {
    const InspectionListRes = await axios.get(`${GLOBAL_URL}/api/inspection/list`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    });
    console.log(InspectionListRes);
    InspectionList.value = InspectionListRes.data.map(item => ({
      ...item,
      brandKeyword: '',
      productKeyword: '',
      brandSuggestions: [],
      productSuggestions: [],
      selectedBrand: '',
      selectedProduct: '',
    }));
  } catch (error) {
    console.error('Error loading inspection list:', error);
  }
};

watch(
  () => InspectionList.value,
  newList => {
    newList.forEach(list => {
      if (list.brandKeyword.length > 1) {
        fetchSuggestions('brand', list);
      }
      if (list.productKeyword.length > 1) {
        fetchSuggestions('product', list);
      }
    });
  },
  { deep: true },
);

dolode();
// 입력값 변경 시 fetchSuggestions 호출
// watchEffect(() => {
//   fetchSuggestions, dolode();
// });
</script>

<style scoped>
#Inspection {
  background-color: white;
  width: 100%;
  height: auto;
  margin: 30px 0;
  border-radius: 10px;
  border: 5px solid var(--color-main-bloode);
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
select {
  width: 80%;
}
button {
  padding: 10px;
  background-color: orange;
  border-radius: 10px;
  width: 100%;
  text-align: center;
  font-size: 1.8rem;
}
</style>
