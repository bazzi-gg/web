<template>
  <div class="wrapper">
    <b-image
      :src="require('@/static/ico/android-icon-192x192.png')"
      alt="bazzi.gg logo"
      :rounded="true"
    />
    <h1 class="is-size-2 pt-5">서비스 점검 중입니다.</h1>
    <span>점검 중에는 서비스 이용이 불가능합니다.</span>
    <p>
      자세한 점검 내용은 <a href="https://bazzi.gg/discord">디스코드를</a>를 참고해주세요.
    </p>
    <main>
      <nuxt />
    </main>
  </div>
</template>
<script>
export default {
  head() {
    return this.$seo({
      title: "서비스 점검",
      description: "서비스 점검 중입니다.",
    });
  },
};
</script>
<style lang="css">
@media screen and (max-width: 768px) {
  body {
    font-size: 12px;
  }
}
</style>
