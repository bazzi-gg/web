<template>
  <client-only>
    <div>
      <div v-if="loaded === true">
        <LineChart v-if="loaded" :data="data" :options="options" :height="300" />
      </div>
      <Alert v-else-if="loaded === false" title="데이터가 없습니다." subtitle="" />
    </div>
  </client-only>
</template>
<script>
export default {
  data() {
    return {
      loaded: null,
      colors: [
        "#00a698",
        "#8a4f2a",
        "#db362c",
        "#f16f2e",
        "#f2cd39",
        "#d0c193",
        "#ddc21b",
        "#f67c25",
        "#f52652",
        "#4d3027",
      ],
      data: {
        labels: [],
        datasets: [],
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          labels: {
            usePointStyle: true,
            boxWidth: 10,
          },
        },
        tooltips: {
          intersect: false,
          mode: "label",
        },
      },
    };
  },
  async created() {
    for (let i = 0; i <= 23; i++) {
      this.data.labels.push(`${i}시`);
    }

    const doc = this.$fire.firestore
      .collection("stat-play-count-by-hour")
      .doc(this.$dayjs().format("YYYY-MM-DD"));
    const data = (await doc.get()).data();
    if (typeof data === "undefined") {
      this.loaded = false;
      return;
    }

    let idx = 0;
    for (const key in data) {
      this.data.datasets.push({
        label: key,
        data: data[key],
        fill: false,
        borderColor: this.colors[idx],
        backgroundColor: this.colors[idx],
      });
      idx++;
    }
    this.loaded = true;
  },
};
</script>
