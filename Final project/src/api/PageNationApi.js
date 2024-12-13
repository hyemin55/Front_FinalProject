import { errorMessages } from 'vue/compiler-sfc';

const { default: axios } = require('axios');
const { GLOBAL_URL } = require('./util');

export const getReviewPageNation = async (idx, currentPage) => {
  try {
    const reviewPageNationRes = await axios.get(`${GLOBAL_URL}`);
    console.log('reviewPageNationRes.data', reviewPageNationRes.data);
    return reviewPageNationRes.data;
  } catch (err) {
    console.error('reviewPageNationRes.data', errorMessages);
  }
};

export const getInspectionListPageNation = async (idx, currentPage) => {
  try {
    const InspectionListPageNationRes = await axios.get(`${GLOBAL_URL}`);
    console.log('InspectionListPageNationRes.data', InspectionListPageNationRes.data);
    return InspectionListPageNationRes.data;
  } catch (err) {
    console.error('reviewPageNationRes.data', errorMessages);
  }
};
