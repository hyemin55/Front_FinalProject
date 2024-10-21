<script setup>
import { watchEffect } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const route = useRoute();

const kakaoLogin = async() => {
  await window.Kakao.Auth.authorize({
    redirectUri: "http://localhost:5173/oauth",
  });
  console.log(route.query.code)
};

watchEffect(async() => {
  if (route.query.code) {
    await axios.post("https://kauth.kakao.com/oauth/token", null, {
  params: {
    grant_type: "authorization_code",
    client_id: "a74d8c37f265d73b45045ad6a81d7f87", // 카카오 REST API 키
    redirect_uri: "http://localhost:5173/oauth", // 리다이렉트 URI
    code: route.query.code // 받은 인가 코드
  },
})
.then((response) => {
  const accessToken = response.data.access_token;
  console.log("Access Token:", accessToken);
  // 이후 동의 화면 처리를 위한 로직 추가 가능

return axios.get("https://kapi.kakao.com/v2/user/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`, // 액세스 토큰을 헤더에 포함
        },
      });
    })
    .then((res) => {
      console.log("User Info:", res.data); // 사용자 정보 확인 가능
    })
    .catch((error) => {
      console.error("Error fetching token or user info:", error);
    });
  }
});

const kakaoLogout = () => {
	window.Kakao.Auth.logout();
	// localStorage.removeItem('kakao_access_token');
	// localStorage.removeItem('kakao_refresh_token');
	// localStorage.removeItem('kakao_id');
	alert('로그아웃 성공');
};
// watchEffect(() => {
//   if (route.query.code) {
//     axios.get("http://localhost:5173/kakao/login?code=" + route.query.code)
//   .then((response) => {
//     console.log(response.data);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
//   }
// });

// const kakaoLogout = () => {
//   window.Kakao.Auth.logout((res) => {
//     console.log(res);
//   });
// };
</script>

<template>
  <section id="login">
    <article id="login_box">
      <h1 class="login_box_h1">Sign in</h1>
      <div class="login_box_btn">
        <a id="kakao-login-btn" @click="kakaoLogin()">
          <img src="../img/btn_kakao.svg" />카카오로 시작하기
        </a>
      </div>
        <!-- <div @click="kakaoLogout()"></div> -->
    </article>
  </section>
</template>

<style scoped>
#login {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
#login_box{
  /* background-color: antiquewhite; */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;  
  width: 485px;
  height: 343px;
}
#kakao-login-btn img {
  width: 30px;
  margin: 0 10px;
}
#kakao-login-btn{
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-gray);
}
.login_box_h1{
  font-size: 1.7rem;
  padding: 20px;
}
.login_box_btn{
  display: flex;
  border: 0.5px solid var(--color-main-bloode);
  width: 350px;
  height: 45px;
  border-radius: 9px;
}
</style>
