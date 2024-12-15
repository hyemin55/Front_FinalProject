<template>
  <section>
    <article>
      <AnnouncementComponent />
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
                <option value="-" disabled>-------</option>
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
                  @select="fetchSuggestions('product', list)"
                >
                  {{ brand.brandId }}.{{ brand.brandName }}
                </option>
                <option value="brandNameInput">직접입력</option>
              </select>
            </td>
            <td rowspan="2">
              <p>기존값: {{ list.brand }}</p>
              <p class="InputDisplay" v-if="list.selectedBrand != ''">
                수정값:
                <input
                  v-if="list.selectedBrand === 'brandNameInput'"
                  :value="list.selectedBrand"
                  type="text"
                  placeholder="직접입력"
                />
                <span v-else>{{ list.selectedBrand }} </span>
              </p>
            </td>
            <!-- 상품명 검색 => 추후 브랜드 선택하면 select창이 뜨도록-->
            <td>
              <select v-model="list.selectedProduct">
                <option :value="product" v-for="(product, index) in list.productSuggestions" :key="index">
                  {{ product.productName }}ㆍ{{ product.size }} ml
                </option>
                <option value="productNameInput">직접입력</option>
              </select>
            </td>
            <td rowspan="2">
              <p>기존값: {{ list.productName }}ㆍ{{ list.size }} ml</p>

              <p class="InputDisplay" v-if="list.selectedProduct != ''">
                수정값:
                <input
                  v-if="list.selectedProduct === 'productNameInput'"
                  :value="list.selectedProduct"
                  type="text"
                  placeholder="직접입력"
                />
                <span v-else>{{ list.selectedProduct.productName }}ㆍ{{ list.selectedProduct.size }} ml</span>
              </p>
            </td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th class="TestResult">
              용량 (ml)
              <span class="icon"
                ><img src="@/assets/img/icon/free-icon-font-exclamation-3917663.svg" alt="" />
                <div class="TestResultModal">
                  <h3>용량 기준</h3>
                  <div>
                    판매 기준 용량은 상품 정량의 절반 이상이어야 합니다.
                    <br />
                    <br />
                    <h4>● 합격 기준</h4>
                    <span>
                      상품명 (프리지아 오드코롱) :
                      <br />
                      검수 용량 (25 ml) > 상품 정량 (50 ml)
                    </span>
                    <h4>● 불합격 기준</h4>
                    <span>
                      상품명 (프리지아 오드코롱) :
                      <br />
                      검수 용량 (24 ml) > 상품 정량 (50 ml)
                    </span>
                  </div>
                </div>
              </span>
            </th>
            <th>희망판매가격</th>
            <th>권장판매가격</th>

            <th colspan="2">상세설명</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowspan="2">
              기존용량: {{ list.size }} ml
              <br />
              검수용량:
              <input
                type="number"
                v-model="list.inspectionSize"
                step="1"
                :min="list.selectedProduct.size / 2"
                :max="list.selectedProduct.size"
                placeholder="용량(ml)"
                required
                @blur="validatedinspectionSize(list)"
              />
            </td>
            <td>￦ {{ list.expectedSellingPrice.toLocaleString() }}</td>
            <td>
              <input
                type="number"
                v-model="list.inspectionSellingPrice"
                min="5000"
                step="10"
                placeholder="권장판매가격(5,000원 이상)"
              />
            </td>

            <td colspan="2">{{ list.userContent }}</td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th>상품 검색 대표사진</th>
            <th>검수결과</th>
            <th v-if="list.TestResult == 'Y' || list.TestResult == ''" class="TestResult">
              등급
              <span class="icon"
                ><img src="@/assets/img/icon/free-icon-font-exclamation-3917663.svg" alt="" />
                <div class="TestResultModal">
                  <h3>판매 등급</h3>
                  <p>
                    <b>A</b>: 새상품과 거의 동일한 상태
                    <br />
                    B: 새상품이나 박스가 훼손된 상태
                    <br />
                    C: 사용한 흔적이 있거나 상품에 흠집이나 스크래치가 있는 상태
                    <br />
                    D: 사용한 흔적이 많고 상품에 흠집이나 스크래치, 약간의 파손이 있는 상태
                    <br />
                    E: 사용한 흔적이 많고 상품에 흠집이나 스크래치, 파손, 훼손이 있지만 사용하기엔 문제가 없는 상태
                  </p>
                </div></span
              >
            </th>
            <th v-if="list.TestResult == 'N'" class="TestResult">
              반려사유
              <span class="icon"
                ><img src="@/assets/img/icon/free-icon-font-exclamation-3917663.svg" alt="" />
                <div class="TestResultModal">
                  <h3>판매 불가 사유</h3>
                  <p>
                    1. 파손 또는 훼손이 심해 판매할 수 없는 상태입니다.
                    <br />
                    2. 정품이 아닙니다.
                    <br />
                    3. 유통기한이 지났습니다.
                    <br />
                    4. 유통기한은 문제가 없으나 내용물 변질이 일어났습니다.
                    <br />
                    5. 판매 기준 용량 미달입니다.
                    <br />
                    6. 향수, 캔들, 디퓨저에 해당하지 않는 제품입니다.
                    <br />
                    7. 그 외(기타사항에 입력해주세요.)
                  </p>
                </div>
              </span>
            </th>
            <th colspan="2">검수결과 참고사항</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td v-if="list.selectedProduct.mainImage">
              <img
                :src="`${GLOBAL_URL}/api/file/download/${list.selectedProduct.mainImage.filename}`"
                alt=""
                style="width: 50px"
              />
            </td>
            <td v-else>
              <img src="@/assets/img/icon/free-icon-font-image-slash-10742150.svg" alt="" style="width: 40px" />
              <p>이미지가 없습니다.</p>
            </td>
            <td>
              <select name="TestResults" id="" v-model="list.TestResult" required>
                <option value="" selected disabled>선택</option>
                <option value="" disabled>-------</option>
                <option value="Y">합격</option>
                <option value="N">불합격</option>
              </select>
            </td>
            <td v-if="list.TestResult == 'Y' || list.TestResult == ''">
              <select name="PassGradeId" id="" v-model="list.PassGrade">
                <option value="" selected disabled>상품 등급 선택</option>
                <option value="" disabled>-------</option>
                <option :value="PassGrade" v-for="PassGrade in PassGradeList" :key="PassGrade">
                  {{ PassGrade.gradeType }}. {{ PassGrade.gradeDescription }}
                </option>
              </select>
            </td>
            <td v-if="list.TestResult == 'N'">
              <select name="NotForSale" id="" v-model="list.FailReason">
                <option value="" selected disabled>판매불가 사유 선택</option>
                <option value="" disabled>-------</option>
                <option :value="FailReason" v-for="FailReason in FailReasonList" :key="FailReason">
                  {{ FailReason.rejectionReasonId }}. {{ FailReason.rejectionReason }}
                </option>
              </select>
            </td>
            <td colspan="2">
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
        <tbody>
          <tr>
            <th colspan="2">판매자 사진</th>
            <th colspan="2">검수자 등록 사진</th>
          </tr>
          <tr>
            <td colspan="2">
              <img
                :src="`${GLOBAL_URL}/api/file/download/${userSaleImage.name}`"
                v-for="(userSaleImage, index) in list.userSaleResImageList"
                :key="index"
                alt=""
                style="width: 70px"
                class="userSaleImage"
                @click="ImageDelete(userSaleImage, index)"
              />
            </td>
            <td colspan="2">
              <input type="file" id="photo" multiple @change="handleFileUpload" />
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <button @click="Send(list)">전송</button>
      </div>
    </article>
    <article>
      <PageNationComponent v-if="totalCount > 0" :pageNationData="pageNationData" @currentPage="pageUpdate" />
    </article>
    <article>
      <InspectionModalView v-if="InspectionModal" :Data="DeliveryData" @close="closeModal" />
    </article>
  </section>
</template>

<script setup>
import { GLOBAL_URL } from '@/api/util';
import AnnouncementComponent from '@/components/admin/AnnouncementComponent.vue';
import axios from 'axios';
import { onMounted, reactive, ref } from 'vue';
import InspectionModalView from '@/views/appraiser/InspectionModalView.vue';
import PageNationComponent from '@/components/PageNationComponent.vue';

const InspectionList = ref([]);
const PassGradeList = ref([]);
const FailReasonList = ref([]);
const categoriesList = ['Perfume', 'Diffuser', 'Candle'];
const DeliveryData = ref([]);
const InspectionModal = ref(false);
const totalCount = ref(0);
const pageNumber = ref(0)

// console.log(DeliveryData.value);
const pageNationData = reactive({
  name: 'InspectionList',
  totalCount: totalCount.value,
  pageSize: 5,
});

const ImageDelete = (img, index) => {
  console.log('삭제하려는 이미지', index);
  // InspectionList.value[index].userSaleResImageList(img);
  console.log(InspectionList.value, '       ', img.name);
  const res = confirm('[ ' + img.name + ' ]를 삭제하시겠습니까?');
  if (res) {
    console.log('삭제되었습니다.');
  } else {
    console.log('취소되었습니다.');
  }
};

// pageNation emit 업데이트 
const pageUpdate = (pageNum) =>{
pageNumber.value = pageNum
dolode()
}

// InspectionMadal emit 업데이트
const closeModal = () => {
  InspectionModal.value = false;
  console.log('InspectionList.value.PassGrade', InspectionList.value);
  for (let i = 0; InspectionList.value.length > i; i++) {
    InspectionList.value[i].PassGrade = '';
    InspectionList.value[i].FailReason = '';
  }
  console.log('InspectionList.value.FailReason', InspectionList.value.FailReason);
};

const validatedinspectionSize = list => {
  console.log('여기여기???');
  if (list.inspectionSize > list.selectedProduct.size) {
    alert('검수 용량이 상품 기준 용량보다 많습니다.' + '\n' + '상품 기준 용량 : ' + list.selectedProduct.size + ' ml');
    return false;
  }
  if (list.inspectionSize <= list.selectedProduct.size / 2) {
    alert(
      '검수 용량이 상품 기준 용량의 절반 이하입니다.' + '\n' + '상품 기준 용량 : ' + list.selectedProduct.size + ' ml',
    );
    return false;
  } else {
    return true;
  }
};
// 검수 전송 버튼 눌렀을 때
const Send = async list => {
  console.log(list.TestResult);

  console.log('list', list);
  const InspectionResultId = [list.PassGrade.gradeId, list.FailReason.rejectionReasonId];
  // 각 항목에 필드 이름과 값을 함께 저장
  const valueError = [
    { field: '검수 결과', value: list.TestResult },
    { field: '판매 신청자', value: list.saleApplicationId },
    { field: '카테고리', value: list.categoryId },
    { field: '카테고리', value: categoriesList[list.categoryId - 1] },
    { field: '브랜드', value: list.selectedBrand.split('.')[0] },
    { field: '브랜드', value: list.selectedBrand.split('.')[1] },
    { field: '상품명', value: list.selectedProduct.productName },
    { field: '용량', value: list.inspectionSize },
    { field: '권장 판매 가격', value: list.inspectionSellingPrice },
    {
      field: list.TestResult === 'Y' ? '등급' : '반려사유',
      value: list.TestResult === 'Y' ? InspectionResultId[0] : InspectionResultId[1],
    },
  ];

  // 배열 순회하며 값 검증
  for (let i = 0; i < valueError.length; i++) {
    console.log('valueError.values', valueError[i]);

    if (valueError[i].value === '' || valueError[i].value === null || valueError[i].value === 0) {
      alert(`"${valueError[i].field}" 값이 입력되지 않았습니다.`);
      return; // 입력 오류 발생 시 함수 종료
    }
  }
  const error = validatedinspectionSize(list);

  if (!error) return;
  // if (list.inspectionSize > list.selectedProduct.size) {
  //   alert('검수 용량이 상품 기준 용량보다 많습니다.' + '\n' + '상품 기준 용량 : ' + list.selectedProduct.size + ' ml');
  //   return;
  // }
  // if (list.inspectionSize <= list.selectedProduct.size / 2) {
  //   alert('검수 용량이 상품 기준 용량의 절반 이하입니다.' + '\n' + '판매 기준 용량 미달로 불합격 사유에 해당합니다.');
  //   return;
  // }
  if (list.TestResult === 'Y') {
    console.log('모든 값이 올바르게 입력되었습니다.');

    const passData = {
      pendingSaleId: list.saleApplicationId,
      gradeId: list.PassGrade.gradeId,
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
        productSize: list.inspectionSize,
        verifiedSellingPrice: list.inspectionSellingPrice,
        quantity: 0,
      },
      inspectionContent: list.Content,
      inspectionResult: true,
    };
    console.log('gradeId', passData.gradeId);
    DeliveryData.value = { DeliveryData: passData, list: list };
    console.log(DeliveryData.value);
  } else if (list.TestResult === 'N') {
    const failData = {
      pendingSaleId: list.saleApplicationId,
      rejectionReasonId: list.FailReason.rejectionReasonId,
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
        productSize: list.inspectionSize,
        verifiedSellingPrice: list.inspectionSellingPrice,
        quantity: 0,
      },
      inspectionContent: list.Content,
      inspectionResult: false,
    };
    console.log('rejectionReasonId', failData.rejectionReasonId);
    DeliveryData.value = { DeliveryData: failData, list: list };
  }
  InspectionModal.value = true;
  console.log('모달창 나옵니다.');
};

// 브랜드, 상품명 검색 입력 시 호출
const fetchSuggestions = async (type, list) => {
  if (list.brandKeyword.length < 2) return;
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
  }
  if (Number(list.selectedBrand.split('.')[0]) != 0 || Number(list.selectedBrand.split('.')[0]) != null) {
    try {
      // 상품명 검색어 입력 시 서버와 통신
      const productResponse = await axios.get(`${GLOBAL_URL}/api/inspection/search-products`, {
        params: { brandId: Number(list.selectedBrand.split('.')[0]) },
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
      params:{
        pageNum: pageNumber.value
      }
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
      inspectionSize: 0,
      inspectionSellingPrice: 5000,
      TestResult: '',
      PassGrade: [],
      FailReason: [],
      Content: '',
    }));
  } catch (error) {
    console.error('Error loading inspection list:', error);
  }
};
onMounted(async () => {
  dolode();
  const countRes = await axios.get(`${GLOBAL_URL}/api/inspection/pending-sale/total-count`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  });
  totalCount.value = countRes.data;
  pageNationData.totalCount = totalCount.value;
  // 검수 합격 등급 리스트
  const passRes = await axios.get(`${GLOBAL_URL}/api/inspection/pass/grade`);
  PassGradeList.value = passRes.data;
  // 검수 불합격 사유 리스트
  const failRes = await axios.get(`${GLOBAL_URL}/api/inspection/fail/reason`);
  FailReasonList.value = failRes.data;
});
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
.InputDisplay {
  display: flex;
  align-items: center;
}
.icon {
  position: relative;
  justify-content: center;
  align-content: center;
}
.icon:hover .TestResultModal {
  display: block;
}
.icon > img {
  width: 1.4rem;
}
.userSaleImage {
  cursor: pointer;
  margin: 0 5px;
}

.TestResultModal {
  width: 250px;
  height: 265px;
  padding: 15px;
  text-align: left;
  line-height: 1.5;
  font-family: 'Pretendard-Light';
  background-color: var(--color-main-Lgray);
  position: absolute;
  top: -285px;
  left: -118px;
  display: none;
  border-radius: 15px; /* 둥근 모서리 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.TestResultModal::after {
  content: '';
  position: absolute;
  bottom: -20px; /* 삼각형 위치 조정 */
  left: 50%; /* 가운데 정렬 */
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-top: 20px solid var(--color-main-Lgray); /* 말풍선 삼각형 색상 */
}
</style>
