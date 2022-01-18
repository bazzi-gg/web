<template>
  <client-only>
    <div>
      <div v-if="loaded === true">
        <PieChart v-if="loaded" :data="data" :options="options" :height="300" />
      </div>
      <Alert v-else-if="loaded === false" title="데이터가 없습니다." subtitle="" />
    </div>
  </client-only>
</template>
<script>
const Enumerable = require("linq");
export default {
  data() {
    return {
      loaded: null,
      data: {
        labels: [],
        datasets: [
          {
            per: [],
            data: [],
            backgroundColor: [
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
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          labels: {
            usePointStyle: true,
            boxWidth: 10,
          },
        },
        plugins: {
          datalabels: {
            anchor: "end",
            align: "start",
            display: "auto",
            color: "white",
            formatter: function (value, context) {
              return (context.dataset.per[context.dataIndex] * 100).toFixed(2) + "%";
            },
          },
        },
      },
    };
  },
  async created() {
    const doc = this.$fire.firestore
      .collection("stat-play-count-by-game-type")
      .doc(this.$dayjs().format("YYYY-MM-DD"));
    const data = (await doc.get()).data();
    if (typeof data === "undefined") {
      this.loaded = false;
      return;
    }
    const sum = Enumerable.from(data)
      .select((p) => p.value)
      .sum();

    for (const key in data) {
      this.data.datasets[0].per.push(data[key] / sum);
      this.data.datasets[0].data.push(data[key]);
      this.data.labels.push(key);
    }
    this.loaded = true;
  },
};
</script>
