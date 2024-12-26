import axios from 'axios';
import { GLOBAL_URL } from './util';

// ApprovedListView.vue
export const getAcceptedList = async () => {
  try {
    const acceptedListRes = await axios.get(`${GLOBAL_URL}/api/verifiedSale/accepted-list?`, {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
      params: {
        pageNum: 0,
        size: 5,
      },
    });
    return acceptedListRes.data;
  } catch (error) {
    console.log('', error);
    throw error;
  }
};

// PetListView.vue
export const getRejectionList = async () => {
  try {
    const rejectionListRes = await axios.get(`${GLOBAL_URL}/api/verifiedSale/rejection-list?`, {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
      params: {
        pageNum: 0,
        size: 5,
      },
    });
    return rejectionListRes.data;
  } catch (error) {
    console.log('', error);
    throw error;
  }
};
