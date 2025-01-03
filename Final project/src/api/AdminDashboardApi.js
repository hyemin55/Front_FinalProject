import axios from 'axios';
import { GLOBAL_URL } from './util';

// View.vue
export const getProductManagementList = async (pageNum, size) => {
  try {
    const ProductManagementListRes = await axios.get(`${GLOBAL_URL}/admin/product/management/usedProduct?`, {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
      params: {
        pageNum: pageNum,
        size: size,
      },
    });
    return ProductManagementListRes.data;
  } catch (error) {
    console.log('', error);
    throw error;
  }
};
