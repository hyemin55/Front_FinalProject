<script setup></script>

<template>
  <section>
    <h1 class="mypage_info_title">회원 정보 관리</h1>

    <article class="mypage_info_wrapper">
      <div class="profile_image">
        <div class="profile_img_box">
          <img src="../../assets/img/빵빵덕세안핑크.png" alt="">
        </div>
        <p>프로필 사진변경</p>
      </div>

      <div class="user_info">
        <form>
          <div class="form-group">
            <label for="nickname">닉네임</label>
            <input type="text" id="nickname" value="나의 닉네임은?" />
          </div>
          <div class="form-group">
            <label for="address">주소</label>
            <input type="text" id="address" value="대구광역시 달서구 반월로 135 그린컴퓨터아트학원 5층 505호" />
          </div>
          <div class="form-group">
            <label for="name">이름</label>
            <input type="text" id="name" value="채류체리" />
          </div>
          <div class="form-group">
            <label for="phone">핸드폰번호</label>
            <input type="tel" id="phone" value="010-1234-1234" />
          </div>
          <div class="form-group">
            <label for="email">이메일</label>
            <input type="email" id="email" value="abcdefhijk@naver.com" />
            <!-- <small class="email_small">카카오 계정입니다.</small> -->
          </div>
          <div class="form-group">
            <label for="gender">성별</label>
            <input type="text" id="gender" value="여" />
          </div>
        </form>
      </div>
    </article>

    <!-- <article></article> -->
  </section>
</template>

<style scoped>
.mypage_info_title {
  font-size: 3.2rem;
  font-weight: 400;
  border-bottom: solid 1px #000;
  padding: 20px 0;
  margin-top: 32px;
}
/* 전체설정 */
.mypage_info_wrapper {
  display: flex;
  width: 100%;
  height: 730px;
}
/* 프로필이미지 설정 */
.profile_image {
  width: 250px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.profile_img_box{
  width: 160px;
  height: 160px;
  border-radius: 50%;
  overflow: hidden;
  background-color: var(--color-main-gray);
}
.profile_img_box img{
  width: 100%;
  height: auto;
}
/* 유저정보 설정 */
.user_info {
  width: calc(100% - 250px);
  height: 100%;
}
.form-group {
  margin: 15px 0;
  display: flex;
}
label {
  display: block;
  font-size: 14px;
  font-weight: bold;
  color: #333;
  width: 100px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: start;
}
input[type="text"],
input[type="tel"],
input[type="email"] {
  width: 50%;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
}
input[type="text"]:focus,
input[type="tel"]:focus,
input[type="email"]:focus {
  border-color: var(--color-main-bloode);
}
.email_small {
  position: absolute;
  font-size: 12px;
  color: #666;
}
</style>
