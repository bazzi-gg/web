<template>
  <div class="container h-100">
    <div class="wrapper">
      <Alert :title="error.statusCode" :subtitle="error.message" />
      <nuxt-link to="/" class="pt-5"> 홈으로 </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      default: null,
      type: Object,
      required: true,
    },
  },
  head() {
    return this.$seo({
      title: this.error.message,
      description: `${this.error.statusCode} ${this.error.message}`,
    });
  },
};
</script>
