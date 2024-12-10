import axios from 'axios';
import { GLOBAL_URL } from '@/api/util';

// 찜목록 추가/삭제 (클릭마다 변경되는)
export const wishClick = async (info) => {
  try {
    const data = info;
    const res = await axios.post(`${GLOBAL_URL}/wish/click`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    });
    console.log('Wishlist updated:', res.data);
  } catch (error) {
    console.error('add wishList error', error);
  }
};

// 찜목록 DB에서 불러오기
export const wishList = async () => {
  try {
    const res = await axios.get(`${GLOBAL_URL}/myPage/wishList`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error('wishList error', error);
  }
};
