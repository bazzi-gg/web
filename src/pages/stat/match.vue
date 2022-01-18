<template>
  <div class="container">
    <DisplayAdsense ad-slot="8359991777" />
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
      <div class="column is-12">
        <div class="card mt-5">
          <header class="card-header">
            <p class="card-header-title">모드, 시간대별 매치 횟수</p>
          </header>
          <PlayCountByHour />
        </div>
      </div>
      <div class="column is-6">
        <div class="card mt-5">
          <header class="card-header">
            <p class="card-header-title">모드별 매치 횟수</p>
          </header>
          <PlayCountByGameType />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  head() {
    return this.$seo({
      title: "매치 통계",
      description: `${this.$dayjs()
        .add(-1, "day")
        .format("YYYY-MM-DD")} 매치 통계를 살펴보세요.`,
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
