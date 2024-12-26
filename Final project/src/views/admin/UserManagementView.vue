<template>
  <section>
    <article>
      <AnnouncementComponent />
    </article>
    <article id="sortByAndSearch">
      <select name="sortBy" id="sortBy" v-model="sortByRole">
        <option value="">전체</option>
        <option value="USER">USER</option>
        <option value="APPRAISER">APPRAISER</option>
        <option value="ADMIN">ADMIN</option>
      </select>
      <div id="saveAndSearch">
        <div id="search">
          <input
            type="search"
            @input="fetchSuggestions()"
            v-model="emailSearchKeyword"
            id="productSearch"
            placeholder="이메일주소 검색"
          />
          <img class="searchIcon" src="@/assets/img/icon/free-icon-font-search-3917132.png" alt="productSearch" />
        </div>
        <div class="save" @click="memberRoleSave">저장</div>
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
            <td>{{ memberItem.memberId }}</td>
            <td v-if="memberItem.profileImage">
              <img class="productImages" :src="`${memberItem.profileImage}`" alt="" />
            </td>
            <td v-else><img class="productImages" src="@/assets/img/빵빵덕세안.png" alt="" /></td>
            <td>{{ memberItem.name }}</td>
            <td>{{ memberItem.phoneNum }}</td>
            <td>{{ memberItem.email }}</td>
            <td>
              <select name="sortBy" id="sortByColor" v-model="memberItem.role" @change="roleChange(memberItem)">
                <option value="USER">USER</option>
                <option value="APPRAISER">APPRAISER</option>
                <option value="ADMIN">ADMIN</option>
                {{
                  memberItem.role
                }}
              </select>
            </td>
            <td>{{ memberItem.joinDate }}</td>
            <td>{{ memberItem.withdrawDate === null ? '-' : memberItem.withdrawDate }}</td>
            <td>{{ memberItem.lastLoginDate }}</td>
            <td>{{ memberItem.nickName }}</td>
            <td>{{ memberItem.purchaseCount }}</td>
            <td>{{ memberItem.adReceived }}</td>
            <td>{{ memberItem.warnCount }}</td>
            <td>{{ memberItem.reviewCount }}</td>
          </tr>
        </tbody>
      </table>
      <article>
        <PageNationComponent v-if="totalCount > 0" :pageNationData="pageNationData" @currentPage="pageUpdate" />
      </article>
    </article>
  </section>
</template>

<script setup>
import { GLOBAL_URL } from '@/api/util';
import AnnouncementComponent from '@/components/admin/AnnouncementComponent.vue';
import PageNationComponent from '@/components/PageNationComponent.vue';
import axios from 'axios';
import { ref, watchEffect } from 'vue';

const sortByRole = ref('');
const pageNumber = ref(0);
const totalCount = ref(0);
const pageSize = ref(20);
const membersList = ref([]);
const memberRoleUpdate = ref([]);
const pageNationData = ref('');
const emailSearchKeyword = ref('');

const pageNation = () => {
  pageNationData.value = {
    totalCount: totalCount.value,
    pageSize: pageSize.value,
  };
};

// 상품명 검색 시 호출
const fetchSuggestions = () => {
  console.log(emailSearchKeyword.value);
};

// 페이지 선택 시 데이터 업데이트
const pageUpdate = pageNum => {
  pageNumber.value = pageNum;
};

// 권한 변경 후 서버에 데이터 전송
const memberRoleSave = async () => {
  console.log(memberRoleUpdate.value);
  if (memberRoleUpdate.value.length === 0) {
    alert('수정된 내용이 없습니다.');
    return;
  }
  try {
    for (let i = 0; memberRoleUpdate.value.length > i; i++) {
      const { memberId, role } = memberRoleUpdate.value[i];
      await axios.post(`${GLOBAL_URL}/admin/member/management/roleChange`, { memberId, role });
    }
    alert('저장되었습니다.');
  } catch (error) {
    console.error('권한 변경 전송 에러:', error.response?.data || error.message);
  }
};

// 멤버 권한 변경 시 담는 곳
const roleChange = item => {
  memberRoleUpdate.value.push(item);
};

// 첫 화면
const dolode = async () => {
  if (sortByRole.value === '') {
    const memberDataRes = await axios.get(`${GLOBAL_URL}/admin/member/management`, {
      params: {
        pageNum: pageNumber.value,
      },
    });
    membersList.value = memberDataRes.data.memberManageDtos;
    totalCount.value = memberDataRes.data.memberCount;
  } else {
    const memberDataRes = await axios.get(`${GLOBAL_URL}/admin/member/management`, {
      params: {
        role: sortByRole.value,
        pageNum: pageNumber.value,
      },
    });
    membersList.value = memberDataRes.data.memberManageDtos;
    totalCount.value = memberDataRes.data.memberCount;
  }
  console.log(totalCount.value);
  console.log(membersList.value);
  pageNation();
};

// 권한별 보기 방식
watchEffect(() => {
  sortByRole.value;
  dolode();
});
</script>

<style scoped>
input,
select,
option {
  border: none;
  background-color: unset;
}
input:focus,
select:focus,
option:focus {
  outline: none;
}
#sortByAndSearch {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 30px;
  margin: 20px 0 10px 0;
}
#saveAndSearch {
  display: flex;
  justify-content: right;
  width: 40%;
  gap: 1%;
}

#sortBy,
#search,
#sortByColor {
  background-color: white;
  border-radius: 10px;
  padding: 0 10px 0 5px;
  align-items: center;
}
#sortBy,
#sortByColor {
  width: 150px;
}
#sortByColor {
  background-color: var(--color-main-pink);
}
#search {
  width: 70%;
  display: flex;
  justify-content: space-between;
}
#productSearch {
  width: 100%;
}
.save {
  width: 20%;
  text-align: center;
  align-content: center;
  font-size: 1.8rem;
  color: white;
  border-radius: 10px;
  background-color: var(--color-main-bloode);
  cursor: pointer;
}
.searchIcon {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
#Inspection {
  background-color: white;
  width: 100%;
  height: auto;
  border-radius: 15px;
  padding: 5px;
  text-align: center;
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
  font-size: 1.4rem;
}
td {
  height: 50px;
  font-size: 1.3rem;
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
