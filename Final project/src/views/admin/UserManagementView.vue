<template>
  <section>
    <article>
      <AnnouncementComponent />
    </article>
    <article id="sortByAndSearch">
      <select name="sortBy" id="sortBy">
        <option value="total">전체</option>
        <option value="USER">USER</option>
        <option value="APPRAISER">APPRAISER</option>
        <option value="ADMIN">ADMIN</option>
      </select>
      <div id="search">
        <input type="search" id="productSearch" placeholder="상품명 검색" />
        <img class="searchIcon" src="@/assets/img/icon/free-icon-font-search-3917132.png" alt="productSearch" />
      </div>
    </article>
    <article id="Inspection">
      <table>
        <thead>
          <tr class="TableHeader">
            <th>No.</th>
            <th colspan="2">이름</th>
            <th>번호</th>
            <th>이메일주소</th>
            <th>권한</th>
            <th>가입날짜</th>
            <th>탈퇴날짜</th>
            <th>마지막로그인</th>
            <th>닉네임</th>
            <th>구매횟수</th>
            <th>광고</th>
            <th>경고횟수</th>
            <th>리뷰수</th>
          </tr>
        </thead>
        <tbody v-for="(memberItem, index) in membersList" :key="index">
          <tr class="TableBody">
            <td>1</td>
            <td><img class="productImages" src="@/assets/img/빵빵덕세안.png" alt="" /></td>
            <td>{{ memberItem.name }}</td>
            <td>{{ memberItem.phoneNum }}</td>
            <td>{{ memberItem.email }}</td>
            <td>{{ memberItem.role }}</td>
            <td>{{ memberItem.joinDate }}</td>
            <td>-</td>
            <td>2024-12-10</td>
            <td>{{ memberItem.nickName }}</td>
            <td>100</td>
            <td>Y</td>
            <td>0</td>
            <td>{{ memberItem.reviewCount }}</td>
          </tr>
        </tbody>
      </table>
    </article>
  </section>
</template>

<script setup>
import { GLOBAL_URL } from '@/api/util';
import AnnouncementComponent from '@/components/admin/AnnouncementComponent.vue';
import { useUserStore } from '@/stores/Login';
import axios from 'axios';
import { ref } from 'vue';

const useStore = useUserStore();
const role = ref(useStore.role);
const membersList = ref([]);
const dolode = async () => {
  const memberDataRes = await axios.get(`${GLOBAL_URL}/admin/member/management${role}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  });
  membersList.value = memberDataRes.data;
  console.log('membersList.value', membersList.value);
};
dolode();
</script>

<style scoped>
#Inspection {
  background-color: white;
  width: 100%;
  height: auto;
  border-radius: 15px;
  padding: 5px;
  text-align: center;
}
input,
select,
option {
  border: none;
  background-color: unset;
}
#sortByAndSearch {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 30px;
  margin: 20px 0 10px 0;
}
#sortBy,
#search {
  background-color: white;
  border-radius: 10px;
  padding: 0 10px 0 5px;
  align-items: center;
}
#sortBy {
  width: 150px;
}
#search {
  width: 30%;
  display: flex;
  justify-content: space-between;
}
#productSearch {
  width: 100%;
}
.searchIcon {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.TableHeader {
}
.productImages {
  width: 45px;
  height: 45px;
  padding: 2px;
  border: 0.5px solid var(--color-main-Lgray);
  border-radius: 5px;
}
table {
  width: 100%;
  font-size: 14px;
}
td {
  height: 50px;
  border-bottom: 0.5px solid var(--color-main-gray);
}
th {
  border-bottom: 2px solid var(--color-main-gray);
  height: 40px;
}
.TableBody > td:nth-child(3) {
  text-align: left;
}
</style>
