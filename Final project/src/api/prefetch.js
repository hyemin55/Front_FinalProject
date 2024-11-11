// src/api/api.js
import axios from 'axios';
import { GLOBAL_URL } from '@/api/util';

// 제품 상세 정보 호출
export const fetchProductDetail = async (idx) => {
  const response = await axios.get(`${GLOBAL_URL}/detail/detailProductInfo/${idx}`);
  return response.data;
};

// 리뷰 정보 호출
export const fetchReviewInfo = async (idx) => {
  const response = await axios.get(`${GLOBAL_URL}/detail/detailReviewInfo/${idx}`);
  return response.data;
};