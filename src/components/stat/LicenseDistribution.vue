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
      colors: {
        없음: "rgba(158, 158, 158,1.0)",
        초보: "#ffcd33",
        뉴비: "#33c073",
        L3: "#1e88e5",
        L2: "#e53935",
        L1: "#6a1b9a",
        PRO: "rgba(63, 81, 181,1.0)",
      },
      data: {
        labels: [],
        datasets: [
          {
            per: [],
            data: [],
            backgroundColor: [],
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
      .collection("stat-license-distribution")
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
      this.data.datasets[0].backgroundColor.push(this.colors[key]);
      this.data.labels.push(key);
    }
    this.loaded = true;
  },
};
</script>
