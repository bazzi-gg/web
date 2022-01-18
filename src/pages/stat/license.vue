<template>
  <div class="container">
    <DisplayAdsense ad-slot="2043168894" />
    <div class="card">
      <header class="card-header">
        <button class="card-header-icon" aria-label="more options">
          <b-icon size="ri-lg" icon="ri-information-fill" class="pl-5" />
        </button>
        <p class="card-header-title pl-0">
          {{ $dayjs().add(-1, "day").format("YYYY-MM-DD") + " 데이터입니다." }}
        </p>
      </header>
    </div>
    <div class="columns is-multiline">
      <div class="column is-6">
        <div class="card mt-5">
          <header class="card-header">
            <p class="card-header-title">라이센스 통계</p>
          </header>
          <LicenseDistribution />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  head() {
    return this.$seo({
      title: "라이센스 통계",
      description: `${this.$dayjs()
        .add(-1, "day")
        .format("YYYY-MM-DD")} 라이센스 통계를 살펴보세요.`,
    });
  },
};
</script>
<style scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
