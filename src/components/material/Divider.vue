<template>
  <hr :class="{ 'is-vertical': vertical }" />
</template>
<script>
export default {
  props: {
    vertical: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style scoped>
hr {
  background-color: #efefef;
  width: 100%;
  margin: 0;
}
.is-vertical {
  width: 1px;
  height: 100%;
}
</style>
