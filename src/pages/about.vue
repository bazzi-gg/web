<template>
  <div class="container">
    <div class="wrapper">
      <client-only>
        <vue-typed-js
          :loop="true"
          :show-cursor="true"
          :type-speed="75"
          :back-speed="30"
          :strings="[
            '<p>가장 많이 <strong>픽</strong>한 카트바디는 뭘까?</p>',
            '<p>L1은 <strong>몇명</strong>이나 될까?</p>',
            '<p>어떤 라이센스가 가장 많을까?</p>',
            '<p>아이템전 전적은?</p>',
          ]"
          :content-type="'html'"
        >
          <h1 class="typing" />
        </vue-typed-js>
      </client-only>
      <span>BAZZI.GG는 이런 궁금증에서 시작했습니다.</span>
    </div>
  </div>
</template>
<script>
export default {
  head() {
    return this.$seo({
      title: "BAZZI.GG에 대해",
      description: "카트라이더 전적 검색 사이트, BAZZI.GG에 대해 알아보세요.",
    });
  },
};
</script>
<style scoped>
.container {
  width: 100%;
  height: 100%;
}
button {
  background: none;
  border: none;
  padding: 0;
  outline: inherit;
  cursor: pointer;
}
.heart-comment {
  display: flex;
  justify-content: center;
  align-items: center;
}
.toggle-favorite {
  padding: 0rem 0.5rem 0rem 0.5rem;
}
</style>
