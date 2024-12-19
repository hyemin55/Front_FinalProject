<template>
  <section>
    <article id="sortByAndSearch">
      <div id="search">
        <input
          type="search"
          @input="fetchSuggestions()"
          v-model="emailSearchKeyword"
          id="titleSearch"
          placeholder="제목 또는 내용 검색"
        />
        <img class="searchIcon" src="@/assets/img/icon/free-icon-font-search-3917132.png" alt="productSearch" />
      </div>
      <div class="save" @click="memberRoleSave">글쓰기</div>
    </article>

    <article id="announcementData">
      <table class="announcementDataTitle">
        <thead>
          <tr>
            <th>No.</th>
            <th>제목</th>
            <th>작성시간</th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody>
          <tr class="tableBody">
            <td>1</td>
            <td class="tableBodyTitle">
              <p>
                2025-01-26 ~ 2025-01-30 설연휴 배송 업체 휴무일 입니다. 배송 업무에 참고하시길 바랍니다. 2025-01-26 ~
                2025-01-30 설연휴 배송 업체 휴무일 입니다. 배송 업무에 참고하시길 바랍니다. 2025-01-26 ~ 2025-01-30
                설연휴 배송 업체 휴무일 입니다. 배송 업무에 참고하시길 바랍니다.
              </p>
            </td>
            <td>2024-12-19</td>
            <td>100</td>
          </tr>
        </tbody>
      </table>
    </article>
  </section>
</template>

<script setup></script>

<style scoped>
#sortByAndSearch {
  width: 100%;
}
input,
select,
option {
  border: none;
  background-color: unset;
}
#sortByAndSearch {
  display: flex;
  justify-content: right;
  width: 100%;
  height: 30px;
  margin: 20px 0 10px 0;
  gap: 1%;
}
#search {
  background-color: white;
  border-radius: 10px;
  padding: 0 10px 0 5px;
  align-items: center;
  width: 30%;
  display: flex;
  justify-content: space-between;
}
#titleSearch {
  width: 100%;
}
.searchIcon {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.save {
  width: 10%;
  text-align: center;
  align-content: center;
  font-size: 1.8rem;
  color: white;
  border-radius: 10px;
  background-color: var(--color-main-bloode);
  cursor: pointer;
}
/* 공지사항 내용들 */
#announcementData {
  background-color: white;
  width: 100%;
  height: auto;
  border-radius: 20px;
  padding: 1%;
  min-height: calc(100vh - 150px);
}
.announcementDataTitle {
  width: 100%;
  background-color: antiquewhite;
  font-size: 1.4rem;
  text-align: center;
}
th {
  border-bottom: 2px solid var(--color-main-gray);
  height: 40px;
}
td {
  width: 10%;
  height: 50px;
  border-bottom: 0.5px solid var(--color-main-gray);
}

.tableBody {
  width: 100%;
  position: relative;
  cursor: pointer;
  /* background-color: red; */
}
.tableBodyTitle {
  /* display: inline-block; */
  width: 60%;
  text-align: left;
  overflow: hidden;
  position: relative;
  background-color: aqua;
}
.tableBodyTitle p {
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.tableBodyTitle:hover p {
  animation: scroll_left 10s linear infinite;
}

@keyframes scroll_left {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}
</style>
