<template>
  <section>
    <article>
      <AnnouncementComponent />
    </article>
    <article>
      <h4>판매 등급</h4>
      <p>
        - A: 새상품과 거의 동일한 상태
        <br />
        - B: 새상품이나 박스가 훼손된 상태
        <br />
        - C: 사용한 흔적이 있거나 상품에 흠집이나 스크래치가 있는 상태
        <br />
        - D: 사용한 흔적이 많고 상품에 흠집이나 스크래치, 약간의 파손이 있는 상태
        <br />
        - E: 사용한 흔적이 많고 상품에 흠집이나 스크래치, 파손, 훼손이 있지만 사용하기엔 문제가 없는 상태
      </p>
      <br />
      <h4>판매 불가 사유</h4>
      <p>
        - 파손 또는 훼손이 심해 판매할 수 없는 상태입니다.
        <br />
        - 정품이 아닙니다.
        <br />
        - 유통기한이 지났습니다.
        <br />
        - 유통기한은 문제가 없으나 내용물 변질이 일어났습니다.
        <br />
        - 판매 기준 용량 미달입니다.
        <br />
        - 향수, 캔들, 디퓨저에 해당하지 않는 제품입니다.
        <br />
        - 그 외
      </p>
    </article>
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
              <p value="">기존값: {{ list.category }}</p>
              <select required v-model="list.categoryId">
                <option value="" selected disabled>선택</option>
                <option value="" disabled>-------</option>
                <option value="1">Perfume</option>
                <option value="2">Diffuser</option>
                <option value="3">Candle</option>
              </select>
            </td>
            <!-- 브랜드 검색 -->
            <td rowspan="2">
              <input
                type="text"
                v-model="list.brandKeyword"
                placeholder="브랜드 검색"
                @input="fetchSuggestions('brand', list)"
              /><br />
              <select v-model="list.selectedBrand">
                <option
                  :value="brand.brandId + '.' + brand.brandName"
                  v-for="(brand, index) in list.brandSuggestions"
                  :key="index"
                >
                  {{ brand.brandId }}.{{ brand.brandName }}
                </option>
                <option :value="brandNameInput">직접입력</option>
              </select>
            </td>
            <td rowspan="2">
              <p>기존값: {{ list.brand }}</p>
              <p class="InputDisplay" v-if="list.selectedBrand != ''">
                수정값:
                <input v-if="list.selectedBrand === brandNameInput" type="text" placeholder="직접입력" />
                <span v-else>{{ list.selectedBrand }}</span>
              </p>
            </td>
            <!-- 상품명 검색 => 추후 브랜드 선택하면 select창이 뜨도록-->
            <td>
              <input
                type="text"
                v-model="list.productKeyword"
                placeholder="상품명 검색"
                @input="fetchSuggestions('product', list)"
              /><br />
              <select v-model="list.selectedProduct">
                <option :value="product" v-for="(product, index) in list.productSuggestions" :key="index">
                  {{ product.productName }}ㆍ{{ product.size }} ml
                </option>
                <option :value="productNameInput">직접입력</option>
              </select>
            </td>
            <td rowspan="2">
              <p>기존값: {{ list.productName }}ㆍ{{ list.size }} ml</p>

              <p class="InputDisplay" v-if="list.selectedProduct != ''">
                수정값:
                <input v-if="list.selectedProduct === productNameInput" type="text" placeholder="직접입력" />
                <span v-else>{{ list.selectedProduct.productName }}ㆍ{{ list.selectedProduct.size }} ml</span>
              </p>
            </td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th>용량 (ml)</th>
            <th>판매자 사진</th>
            <th>상품 검색 대표사진</th>
            <th colspan="2">상세설명</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowspan="2">
              기존값: {{ list.size }} ml
              <br />
              <input type="number" max="10000" placeholder="용량(ml)" required />
            </td>
            <td>
              <img
                :src="`${GLOBAL_URL}/api/file/download/${userSaleImage.name}`"
                v-for="userSaleImage in list.userSaleResImageList"
                :key="userSaleImage"
                alt=""
                style="width: 50px"
              />
            </td>
            <td v-if="list.selectedProduct.mainImage">
              <img
                :src="`${GLOBAL_URL}/api/file/download/${list.selectedProduct.mainImage.filename}`"
                alt=""
                style="width: 50px"
              />
            </td>
            <td v-else>
              <img src="@/assets/img/빵빵덕세안.png" alt="" style="width: 50px" />
            </td>
            <td colspan="2">{{ list.userContent }}</td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th>희망판매가격</th>
            <th>권장판매가격</th>
            <th>검수결과</th>
            <th v-if="list.TestResult == 'Y' || list.TestResult == ''">등급</th>
            <th v-if="list.TestResult == 'N'">반려사유</th>
            <th>검수결과 참고사항</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>￦ {{ list.expectedSellingPrice.toLocaleString() }}</td>
            <td>
              <input
                type="number"
                v-model="list.inspectionSellingPrice"
                min="5000"
                placeholder="권장판매가격(5,000원 이상)"
              />
            </td>
            <td>
              <select name="TestResults" id="" v-model="list.TestResult">
                <option value="" selected disabled>선택</option>
                <option value="" disabled>-------</option>
                <option value="Y">합격</option>
                <option value="N">불합격</option>
              </select>
            </td>
            <td v-if="list.TestResult == 'Y' || list.TestResult == ''">
              <select name="Rating" id="" v-model="list.PassGradeId">
                <option value="" selected disabled>상품 등급 선택</option>
                <option value="" disabled>-------</option>
                <option :value="PassGrade.gradeId" v-for="PassGrade in PassGradeList" :key="PassGrade">
                  {{ PassGrade.gradeType }}. {{ PassGrade.gradeDescription }}
                </option>
              </select>
            </td>
            <td v-if="list.TestResult == 'N'">
              <select name="NotForSale" id="" v-model="list.FailReasonId">
                <option value="" selected disabled>판매불가 사유 선택</option>
                <option value="" disabled>-------</option>
                <option value="FailReason.rejectionReasonId" v-for="FailReason in FailReasonList" :key="FailReason">
                  {{ FailReason.rejectionReasonId }}. {{ FailReason.rejectionReason }}
                </option>
              </select>
            </td>
            <td>
              <textarea
                name=""
                v-model="list.Content"
                id=""
                maxlength="1000"
                placeholder="기타사항을 입력해주세요(최대 1000자)"
              ></textarea>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <button @click="Send(list)">전송</button>
      </div>
    </article>
  </section>
</template>

<script setup>
import { GLOBAL_URL } from '@/api/util';
import AnnouncementComponent from '@/components/admin/AnnouncementComponent.vue';
import axios from 'axios';
import { ref } from 'vue';

const InspectionList = ref([]);
const PassGradeList = ref([]);
const FailReasonList = ref([]);
const categoriesList = ['Perfume', 'Diffuser', 'Candle'];

const Send = list => {
  if (list.TestResult === 'Y') {
    const passData = {
      pendingSaleId: list.saleApplicationId,
      gradeId: list.PassGradeId,
      inspectionCategoryReqDto: {
        categoryId: list.categoryId,
        categoryName: categoriesList[list.categoryId - 1],
      },
      inspectionBrandReqDto: {
        brandId: list.selectedBrand.split('.')[0],
        brandName: list.selectedBrand.split('.')[1],
      },
      inspectionProductReqDto: {
        productName: list.selectedProduct.productName,
        productSize: list.selectedProduct.size,
        verifiedSellingPrice: list.inspectionSellingPrice,
        quantity: 0,
      },
      inspectionContent: list.Content,
      inspectionResult: true,
    };
    console.log(passData);

    axios.post(`${GLOBAL_URL}/api/inspection/pass`, passData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    });
  }
};
// 브랜드, 상품명 검색 입력 시 호출
const fetchSuggestions = async (type, list) => {
  // 검색어가 변경될 때만 API를 호출하는 명령어
  // clearTimeout(debounceTimeout);
  if (type === 'brand' && list.brandKeyword.length > 1) {
    // 최소 2자 입력 후 검색
    try {
      // 브랜드 검색어 입력 시 서버와 통신
      const brandResponse = await axios.get(`${GLOBAL_URL}/api/inspection/search-brands`, {
        params: { keyword: list.brandKeyword },
      });
      list.brandSuggestions = brandResponse.data;
      if (list.brandSuggestions.length > 0) {
        list.selectedBrand = `${list.brandSuggestions[0].brandId}.${list.brandSuggestions[0].brandName}`;
      } else {
        list.selectedBrand = '';
      }
    } catch (error) {
      console.error('Error fetching brandSuggestions:', error);
    }
  } else if (type === 'product' && list.productKeyword.length > 1) {
    try {
      // 상품명 검색어 입력 시 서버와 통신
      const productResponse = await axios.get(`${GLOBAL_URL}/api/inspection/search-products`, {
        params: { keyword: list.productKeyword },
      });
      list.productSuggestions = productResponse.data;
      if (list.productSuggestions.length > 0) {
        console.log(list.productSuggestions);
        list.selectedProduct = list.productSuggestions[0];
      } else {
        list.selectedProduct = '';
      }
    } catch (error) {
      console.error('Error fetching productSuggestions:', error);
    }
  } else {
    return;
  }
};

const dolode = async () => {
  try {
    // 판매 신청 리스트
    const InspectionListRes = await axios.get(`${GLOBAL_URL}/api/inspection/list`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    });
    InspectionList.value = InspectionListRes.data.map(item => ({
      ...item,
      brandKeyword: '',
      productKeyword: '',
      brandSuggestions: [],
      productSuggestions: [],
      selectedBrand: '',
      selectedProduct: [],
      productNameInput: '',
      brandNameInput: '',
      categoryId: 0,
      inspectionSellingPrice: 0,
      TestResult: '',
      PassGradeId: 0,
      FailReasonId: 0,
      Content: '',
    }));
    // 검수 합격 등급 리스트
    const passRes = await axios.get(`${GLOBAL_URL}/api/inspection/pass/grade`);
    PassGradeList.value = passRes.data;
    // 검수 불합격 사유 리스트
    const failRes = await axios.get(`${GLOBAL_URL}/api/inspection/fail/reason`);
    FailReasonList.value = failRes.data;
    // userSaleImageList.value = InspectionList.value.userSaleResImageList;
    console.log(InspectionList.value);
  } catch (error) {
    console.error('Error loading inspection list:', error);
  }
};

dolode();
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
select,
option {
  width: 80%;
}
button {
  padding: 10px;
  background-color: var(--color-main-bloode);
  border-radius: 10px;
  width: 100%;
  text-align: center;
  font-size: 1.8rem;
  color: white;
}
.InputDisplay {
  display: flex;
  align-items: center;
}
</style>
