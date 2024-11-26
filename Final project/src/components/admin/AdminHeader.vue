<template>
  <div>
    <nav id="header">
      <img src="@/assets/img/logo_text_white.png" alt="" />
      <ul class="header_nav">
        <li><a href="/" target="_blank" rel="noopener noreferrer">사이트로 이동</a></li>
        <li>새로고침</li>
        <li>LOGOUT</li>
      </ul>
    </nav>
  </div>
</template>

<script setup></script>

<style scoped>
#header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1%;
  font-size: 1.8rem;
  width: 100%;
  height: 70px;
  color: white;
  background-color: var(--color-main-bloode);
}
#header > img {
  width: 150px;
}
.header_nav {
  display: flex;
  justify-content: right;
  width: 50%;
  height: auto;
  gap: 2%;
}
.header_nav li a:nth-child(1) {
  border-bottom: 1px solid white;
}
.header_nav li:nth-child(2) {
}
.header_nav li:nth-child(3) {
  background-color: var(--color-main-pink);
}
</style>
