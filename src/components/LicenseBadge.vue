<template>
  <span
    class="license"
    :class="{
      'license--newbie': license === '초보',
      'license--rookie': license === '루키',
      'license--l3': license === 'L3',
      'license--l2': license === 'L2',
      'license--l1': license === 'L1' && racingMasterEmblem === false,
      'license--l1-mre': license === 'L1' && racingMasterEmblem === true,
      'license--pro': license === 'PRO',
    }"
    >{{ license
    }}{{ license === "L1" && racingMasterEmblem === true ? "/마엠블" : "" }}</span
  >
</template>
<script>
export default {
  props: {
    license: {
      default: null,
      type: String,
      required: true,
    },
    racingMasterEmblem: {
      default: false,
      type: Boolean,
      required: false,
    },
  },
};
</script>
<style scoped>
@-webkit-keyframes rainbow {
  0% {
    background-position: 0% 82%;
  }
  50% {
    background-position: 100% 19%;
  }
  100% {
    background-position: 0% 82%;
  }
}
@-moz-keyframes rainbow {
  0% {
    background-position: 0% 82%;
  }
  50% {
    background-position: 100% 19%;
  }
  100% {
    background-position: 0% 82%;
  }
}
@-o-keyframes rainbow {
  0% {
    background-position: 0% 82%;
  }
  50% {
    background-position: 100% 19%;
  }
  100% {
    background-position: 0% 82%;
  }
}
@keyframes rainbow {
  0% {
    background-position: 0% 82%;
  }
  50% {
    background-position: 100% 19%;
  }
  100% {
    background-position: 0% 82%;
  }
}
.license--newbie {
  background-color: #ffcd33 !important;
  color: black !important;
}
.license--rookie {
  background-color: #33c073 !important;
  color: black !important;
}
.license--l3 {
  background-color: #1e88e5 !important;
  color: white !important;
}
.license--l2 {
  background-color: #e53935 !important;
  color: white !important;
}
.license--l1 {
  background-color: #6a1b9a !important;
  color: white !important;
}
.license--pro {
  /* https://codepen.io/nohoid/pen/kIfto */
  background: linear-gradient(
    124deg,
    #ff2400,
    #e81d1d,
    #e8b71d,
    #e3e81d,
    #1de840,
    #1ddde8,
    #2b1de8,
    #dd00f3,
    #dd00f3
  );
  background-size: 1800% 1800%;

  -webkit-animation: rainbow 18s ease infinite;
  -z-animation: rainbow 18s ease infinite;
  -o-animation: rainbow 18s ease infinite;
  animation: rainbow 18s ease infinite;
  color: white !important;
}
.license--l1-mre {
  background: #2592f5;
  background: -webkit-radial-gradient(center, #2b1de8, #dd00f3);
  background: -moz-radial-gradient(center, #2b1de8, #dd00f3);
  background: radial-gradient(ellipse at center, #2b1de8, #dd00f3);
  background-size: 600% 600%;
  -webkit-animation: rainbow 6s ease infinite;
  -z-animation: rainbow 6s ease infinite;
  -o-animation: rainbow 6s ease infinite;
  animation: rainbow 6s ease infinite;
  color: white !important;
}
.license {
  align-items: center;
  border-radius: 4px;
  display: inline-flex;
  font-size: 0.75rem;
  height: 2em;
  justify-content: center;
  line-height: 1.5;
  padding-left: 0.75em;
  padding-right: 0.75em;
  white-space: nowrap;
  background-color: whitesmoke;
}
</style>
