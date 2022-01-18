<template>
  <div v-if="title.length > 0" class="alert is-flex w-100">
    <div class="layout-container" style="height: 40px; line-height: 40px">
      <b-icon
        size="ri-lg"
        icon="ri-alarm-warning-line"
        style="vertical-align: middle; color: white"
      />
      <a
        :href="link"
        class="alert__text text__underline--hover text__overflow__hidden"
        target="blank"
        >{{ title }}</a
      >
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "",
      link: "",
    };
  },
  async mounted() {
    const doc = this.$fire.firestore.collection("notice").doc("KcOWZ4W4M2jahAkBcbbu");
    const data = (await doc.get()).data();
    this.title = data.title;
    this.link = data.link;
  },
};
</script>
<style scoped>
a {
  color: white !important;
}
.alert {
  background-color: #f19914;
}
</style>
