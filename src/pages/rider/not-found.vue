<template>
  <div class="container h-100">
    <div class="wrapper">
      <Alert :title="title" :subtitle="subtitle" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "해당 라이더를 찾을 수 없습니다.",
      subtitle: "라이더명에 오타는 없는지 확인해주세요.",
    };
  },
  head() {
    return this.$seo({
      title: this.title,
      description: this.subtitle,
    });
  },
};
</script>
