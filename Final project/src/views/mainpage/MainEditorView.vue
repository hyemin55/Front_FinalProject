<template>
  <article id="main_editor">
      <h1>Editor's Picks</h1>

      <!-- <ul id="main_editor_list">
        <li class="main_editor_img1">
          <img src="../../img/editor_front_img.png" alt="" />
        </li>
        <li class="main_editor_img2">
          <img src="../../img/editor_front_img.png" alt="" />
        </li>
      </ul> -->

      <EditorPicksSlide></EditorPicksSlide>
    </article>
</template>

<script setup>
import EditorPicksSlide from '../../components/EditorPicksSlide.vue'

</script>

<style scoped>
/* ==== main_editor ==== */
#main_editor {
  width: var(--main-max-width);
  margin: 0 auto;
  height: 800px;
  background-color: #f3eed9;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
#main_editor > h1 {
  font-size: 4rem;
  font-family: var(--font-JacquesFrancois);
  display: flex;
  justify-content: center;
  padding: 40px 0;
}
#main_editor_list {
  display: flex;
  gap: 1%;
  justify-content: space-around;
  align-items: end;
}
.main_editor_img1 {
  width: 49%;
  height: auto;
  background-color: var(--color-main-Lgray);
  /* border: 0.5pt solid #333; */
  border-radius: 10%;
}
.main_editor_img1 > img {
  width: 100%;
  height: auto;
  background-color: #411420;
}
.main_editor_img2,
.main_editor_img3,
.main_editor_img4,
.main_editor_img5 {
  width: 27%;
  height: auto;
}
.main_editor_img2 > img {
  width: 100%;
  height: auto;
}
</style>