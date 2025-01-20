<script setup>
import { GLOBAL_URL } from '@/api/util';
import axios from 'axios';
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const loginType = ref('kakaoLogin');
const kakaoLogin = () => {
  window.Kakao.Auth.authorize({
    redirectUri: 'http://localhost:5173/login',
  });
};

const loginSelectType = type => {
  loginType.value = type;
  console.log(loginType.value);
};

const handleLogin = async() => {
  const data = {
    email: email.value,
    password: password.value,
  };
  console.log(data);
  const res = await axios.get(`${GLOBAL_URL}/formLogin`)
};
</script>

<template>
  <section id="login">
    <article id="login_box">
      <h1 class="login_box_h1">Sign in</h1>
      <div id="loginType_box">
        <span class="loginType" @click="loginSelectType('kakaoLogin')">Social Login</span> |
        <span class="loginType" @click="loginSelectType('formLogin')">Login</span>
      </div>
      <form @submit.prevent="handleLogin" v-if="loginType === 'formLogin'">v 
        <div class="formLogin">
          <input class="input_box" type="email" placeholder="email" v-model="email" required />
          <input class="input_box" type="password" placeholder="password" v-model="password" required />
          <button class="input_login_box" type="submit">login</button>
        </div>
      </form>
      <div v-else>
        <div class="login_box_btn" @click="kakaoLogin()">
          <a id="kakao-login-btn"> <img src="@/assets/img/btn_kakao.svg" />카카오로 시작하기 </a>
        </div>
        <div class="login_box_btn" @click="kakaoLogin()">
          <a id="kakao-login-btn"> <img src="@/assets/img/btn_naver.svg" />네이버로 시작하기 </a>
        </div>
        <div class="login_box_btn" @click="kakaoLogin()">
          <a id="kakao-login-btn"> <img src="@/assets/img/btn_google.svg" />구글로 시작하기 </a>
        </div>
      </div>
    </article>
  </section>
</template>

<style scoped>
#login {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
}
#login_box {
  /* background-color: antiquewhite; */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 485px;
  height: 343px;
  transform: translateY(-15%);
  /* background-color: rgb(240, 240, 240);
  border-radius: 50px; */
}
.login_box_h1 {
  font-size: 1.7rem;
  padding: 20px;
  margin-top: -20px;
}
#loginType_box {
  width: 50%;
  height: auto;
  padding: 0 2%;
  text-align: center;
}
.loginType {
  padding: 0 2%;
  color: #333;
  cursor: pointer;
}
.formLogin{
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  padding: 20px;
}
.input_box{
  border: 0.5px solid var(--color-main-bloode);
  width: 350px;
  height: 35px;
  border-radius: 9px;
  margin: 5px 0;
  padding: 2%;
}
.input_login_box{
  border: 0.5px solid var(--color-main-bloode);
  background-color: var(--color-main-bloode);
  color: white;
  text-align: center;
  font-size: 1.7rem;
  width: 350px;
  height: 35px;
  border-radius: 9px;
  margin: 5px 0;
}
.login_box_btn {
  display: flex;
  border: 0.5px solid var(--color-main-bloode);
  width: 350px;
  height: 45px;
  border-radius: 9px;
  cursor: pointer;
  margin: 10px 0;
}
#kakao-login-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-gray);
  font-size: 1.2rem;
}
#kakao-login-btn img {
  width: 30px;
  margin: 0 10px;
}
</style>
