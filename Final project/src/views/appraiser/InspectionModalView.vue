<script setup>
import { GLOBAL_URL } from '@/api/util';
import { formatPrice } from '@/FormatPrice';
import axios from 'axios';
import { computed, ref, watch } from 'vue';

// 모달창 완료버튼(부모로 event 전달)
// 부모자에서 @sucess 이벤트를 발생시킴
const emit = defineEmits(['close']);
// const submitModal = () => {
//   emit('sucess');
// };
const props = defineProps({
  // 받아오는props의 정의 방법
  Data: {
    type: Object,
    required: true,
  },
});

const dataRes = props.Data?.DeliveryData || {};
const ListRes = props.Data?.list || {};
console.log(dataRes);
console.log(ListRes);

console.log('console = ' + ListRes.TestResult);
const TestResult = computed(() => {
  const testResult = ListRes?.TestResult;
  return testResult === 'Y' ? '합격' : '불합격';
});
// const CancelTransfer = () => {
//   // InspectionModal.value = false;
// };

const dolode = async () => {
  try {
    if (dataRes.inspectionResult) {
      await axios.post(`${GLOBAL_URL}/api/inspection/pass`, dataRes, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
      alert('합격 전송되었습니다.');
    }
    if (!dataRes.inspectionResult) {
      await axios.post(`${GLOBAL_URL}/api/inspection/reject`, dataRes, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
      alert('불합격 전송되었습니다.');
    }
    // 부모 컴포넌트에 모달 닫기 이벤트 전달
    emit('close');
  } catch (error) {
    console.error('전송 중 오류가 발생했습니다: ', error);
    alert('전송 실패. 다시 시도해주세요.');
  }
};
const cancelModal = () => {
  emit('close');
};
watch(
  () => props.Data,
  newValue => {
    console.log('Data updated:', newValue);
  },
  { immediate: true },
);
</script>
<template>
  <section class="sale_modal">
    <article class="modal_page">
      <div class="Result_modal_page">
        <h1>
          최종 검수 결과 : <span>[ {{ TestResult }} ]</span>
        </h1>
        <h2 v-if="ListRes.PassGrade.gradeType">" {{ ListRes.PassGrade.gradeType }} " 등급입니다.</h2>
        <h3 v-if="ListRes.FailReason.rejectionReason">사유 : " {{ ListRes.FailReason.rejectionReason }} "</h3>
        <table class="Result_content">
          <thead>
            <tr>
              <th>구분</th>
              <th>내용</th>
              <th>단위</th>
            </tr>
          </thead>
          <tr>
            <th>No.</th>
            <td>{{ dataRes.pendingSaleId }}</td>
            <td>-</td>
          </tr>

          <tr>
            <th>카테고리</th>
            <td>{{ dataRes.inspectionCategoryReqDto.categoryName }}</td>
            <td>-</td>
          </tr>
          <tr>
            <th>브랜드명</th>
            <td>{{ dataRes.inspectionBrandReqDto.brandId }}. {{ dataRes.inspectionBrandReqDto.brandName }}</td>
            <td>-</td>
          </tr>
          <tr>
            <th>상품명</th>
            <td>{{ dataRes.inspectionProductReqDto.productName }}</td>
            <td>-</td>
          </tr>
          <tr>
            <th>정량</th>
            <td>{{ ListRes.selectedProduct.size }}</td>
            <td>ml</td>
          </tr>
          <tr>
            <th>검수 후 실용량</th>
            <td>{{ dataRes.inspectionProductReqDto.productSize }}</td>
            <td>ml</td>
          </tr>
          <tr>
            <th>희망 판매 가격</th>
            <td>{{ Number(ListRes.expectedSellingPrice).toLocaleString() }}</td>
            <td>원</td>
          </tr>
          <tr>
            <th>권장 판매 가격</th>
            <td>{{ Number(dataRes.inspectionProductReqDto.verifiedSellingPrice).toLocaleString() }}</td>
            <td>원</td>
          </tr>
          <tr>
            <th>검수결과 참고사항</th>
            <td v-if="dataRes.inspectionContent">{{ dataRes.inspectionContent }}</td>
            <td v-else>-</td>
            <td>-</td>
          </tr>
        </table>
      </div>
      <div class="Results_transfer_button">
        <button @click="dolode()">전송</button>
        <button @click="cancelModal()">취소</button>
      </div>
    </article>

    <article class="modal_background"></article>
  </section>
</template>

<style scoped>
/* 모달 전체 설정 ##################*/
.sale_modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 950;
  display: flex;
  align-items: center;
  justify-content: center;
}
/* 모달 설정 */
.modal_page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  /* 크기조절 여기서 */
  width: 600px;
  height: 800px;
  background-color: rgb(255, 255, 255);
  z-index: 11;
  border: 1px solid var(--color-main-bloode);
  padding: 5%;
  line-height: 2;
  font-size: 1.6rem;
  /* overflow-y: scroll; */
}
/* 모달배경 설정 */
.modal_background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
}
.Result_modal_page {
  text-align: center;
}
.Result_modal_page > h1 {
  font-size: 3rem;
}
.Result_modal_page > h1 > span {
  color: red;
}
.Result_content {
  width: 500px;
  margin: 3% 0;
  text-align: center;
}
th {
  width: 30%;
}
td {
  width: 55%;
}
table,
th,
td {
  border: 1px solid #333;
  border-collapse: collapse;
}
.Results_transfer_button {
  width: 70%;
  text-align: center;
}
.Results_transfer_button > button {
  font-size: 2rem;
  width: 30%;
  height: auto;
  padding: 0.5%;
  text-align: center;
  border-radius: 10px;
  margin: 0 8%;
  border: 2px solid var(--color-main-bloode);
}
.Results_transfer_button > button:hover {
  color: white;
  border: 2px solid var(--color-main-bloode);
  background-color: orange;
}
</style>
