<template>
  <div class="w-100 h-100">
    <div class="background">
      <div class="layer wrap">
        <img
          class="logo is-clickable"
          src="~static/img/text-logo.svg"
          alt=""
          @click="refreshPage()"
        />
        <client-only>
          <SearchBar
            @RecentSearchClick="ToRiderPage"
            @Search="ToRiderPage"
            @AutoCompleteClick="ToRiderPage"
          />
        </client-only>
      </div>
    </div>
    <div class="layout-container">
      <section v-if="itemPickRates.length > 0" class="section">
        <p class="is-size-5">
          <span class="has-text-weight-semibold">{{
            $dayjs().add(-1, "day").format("YYYY-MM-DD")
          }}</span>
          아이템 전 픽률
        </p>
        <div class="card w-100 mt-3">
          <div class="columns is-mobile is-multiline">
            <div
              v-for="(item, i) of itemPickRates"
              :key="i"
              class="column is-4-mobile pick-rate__item"
            >
              <img
                class="pick-rate__item__img"
                :src="`${$config.metadataUrl}kart/${item.Hash}.png`"
                :alt="item.Kartbody"
              />
              <p class="has-text-weight-semibold text__overflow__hidden">
                {{ item.Kartbody }}
              </p>
              <b-icon
                v-show="i === 0 || i === 1 || i === 2"
                size="ri-lg"
                icon="ri-medal-fill"
                :class="{
                  'medal--first': i === 0,
                  'medal--second': i === 1,
                  'medal--third': i === 2,
                }"
              />
              <span class="has-text-grey-light pick-rate__item__value"
                >{{ item.Value.toFixed(2) }}%</span
              >
            </div>
          </div>
        </div>
      </section>
      <section v-if="speedPickRates.length > 0" class="section pt-0">
        <p class="is-size-5">
          <span class="has-text-weight-semibold">{{
            $dayjs().add(-1, "day").format("YYYY-MM-DD")
          }}</span>
          스피드 전 픽률
        </p>
        <div class="card w-100 mt-3">
          <div class="columns is-mobile is-multiline">
            <div
              v-for="(item, i) of speedPickRates"
              :key="i"
              class="column is-4-mobile pick-rate__item"
            >
              <div>
                <img
                  class="pick-rate__item__img"
                  :src="`${$config.metadataUrl}kart/${item.Hash}.png`"
                  :alt="item.Kartbody"
                />
                <p class="has-text-weight-semibold text__overflow__hidden">
                  {{ item.Kartbody }}
                </p>
                <b-icon
                  v-show="i === 0 || i === 1 || i === 2"
                  size="ri-lg"
                  icon="ri-medal-fill"
                  :class="{
                    'medal--first': i === 0,
                    'medal--second': i === 1,
                    'medal--third': i === 2,
                  }"
                /><span class="has-text-grey-light pick-rate__item__value"
                  >{{ item.Value.toFixed(2) }}%</span
                >
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
const Enumerable = require("linq");
export default {
  name: "Index",
  data() {
    return {
      itemPickRates: [],
      speedPickRates: [],
    };
  },
  async mounted() {
    this.itemPickRates = await this.getPickRate("item-kartbody-pick-rate");
    this.speedPickRates = await this.getPickRate("speed-kartbody-pick-rate");
  },
  methods: {
    ToRiderPage(nickname) {
      this.$router.push({
        name: "rider-rider",
        params: { rider: nickname },
      });
    },
    refreshPage() {
      window.location.reload(true);
    },
    async getPickRate(collectionName) {
      const doc = this.$fire.firestore
        .collection(collectionName)
        .doc(this.$dayjs().format("YYYY-MM-DD"));
      const data = (await doc.get()).data();
      if (typeof data === "undefined") {
        return [];
      }
      const result = Enumerable.from(Object.entries(data))
        .select((p) => {
          const key = p[0],
            value = p[1];
          const obj = JSON.parse(value);
          obj["Hash"] = key;
          return obj;
        })
        .orderByDescending((p) => p.Value)
        .toArray();
      return result;
    },
  },
};
</script>

<style lang="css" scoped>
.layer {
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.background {
  position: relative;
  background-position: center;
  background-size: cover;
  background-image: url("~static/img/header-background.png");
  height: 400px;
  width: 100%;
}
.wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.logo {
  width: 200px;
  height: 100px;
  margin-top: 50px;
  margin-bottom: 50px;
  fill: #ddccf5;
}
.pick-rate__item {
  height: inherit;
  text-align: center;
  position: relative;
}
.pick-rate__item__rank {
  position: absolute;
  top: 30px;
  left: 40px;
  z-index: 10;
}
.pick-rate__item__img {
  width: 60px;
}
.pick-rate__item__value {
  vertical-align: text-bottom;
}
.medal--first {
  color: gold;
}
.medal--second {
  color: silver;
}
.medal--third {
  color: peru;
}
@media screen and (max-width: 768px) {
  .logo {
    margin-top: 0px;
    margin-bottom: 0px;
  }
  .background {
    height: 300px;
  }
}
</style>
