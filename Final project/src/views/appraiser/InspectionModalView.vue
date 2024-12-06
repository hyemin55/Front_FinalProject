<script setup>
// 모달창 완료버튼(부모로 event 전달)
// 부모자에서 @sucess 이벤트를 발생시킴
const emit = defineEmits();
const submitModal = () => {
  emit('sucess');
};

if (list.TestResult === 'Y') {
  console.log('모든 값이 올바르게 입력되었습니다.');
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

  await axios.post(`${GLOBAL_URL}/api/inspection/pass`, passData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  });
} else if (list.TestResult === 'N') {
  const failData = {
    pendingSaleId: list.saleApplicationId,
    rejectionReasonId: list.FailReasonId,
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
    inspectionResult: false,
  };
  await axios.post(`${GLOBAL_URL}/api/inspection/reject`, failData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  });
}
</script>
<template>
  <section class="sale_modal">
    <article class="modal_page"></article>

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
.modal_page {
  position: relative;
  /* 크기조절 여기서 */
  width: 600px;
  height: 800px;
  background-color: rgb(255, 255, 255);
  z-index: 11;
  border: 1px solid var(--color-main-bloode);
  /* overflow-y: scroll; */
}
</style>
