<template>
  <div class="container">
    <section class="section pb-0 pt-0">
      <b-input
        v-model="filterStr"
        class="is-radiusless"
        placeholder="선수, 인플루언서 이름 (전대웅, scamper중선s)"
      ></b-input>
    </section>
    <section class="section pt-3 pb-0">
      <div class="is-pulled-right">
        <a
          target="_blank"
          href="https://docs.google.com/forms/d/1XSs76X_stfo1yXl_Dn8h1GcTajDk2ItC-HY69C3JtsM"
        >
          <b-button class="is-radiusless" size="is-small"
            >정보 변경/추가 요청</b-button
          ></a
        >
      </div>
    </section>
    <section v-if="influencers.length > 0" class="section">
      <p class="pb-5 is-size-4 pl-3">
        프로게이머, 스트리머 등 등록된 인플루언서는 {{ influencers.length }}명 입니다.
      </p>
      <div class="columns is-multiline ml-0">
        <div
          v-for="(player, i) in filters"
          :key="i"
          class="is-3 box influencer-box ml-3 mr-3"
          style="margin-bottom: 1.5rem"
        >
          <nuxt-link
            :to="{
              name: 'rider-rider',
              params: { rider: player.nickname },
            }"
            class="
              is-size-4
              mb-0
              is-clickable
              text__underline--hover
              is-block
              has-text-black
            "
          >
            {{ player.nickname }}
          </nuxt-link>
          <b-tag type="is-success">{{ player.description }}</b-tag>
          <p class="has-text-grey is-size-7">
            마지막 확인: {{ $dayjs(player.lastUpdated).format("YYYY-MM-DD HH:mm") }}
          </p>
          <div>
            <a
              v-if="player.twitchLink !== null && player.twitchLink !== ''"
              :href="player.twitchLink"
              target="_blank"
            >
              <b-icon size="ri-lg" icon="ri-twitch-fill" />
            </a>
            <a
              v-if="player.youtubeLink !== null && player.youtubeLink !== ''"
              :href="player.youtubeLink"
              target="_blank"
            >
              <b-icon size="ri-lg" icon="ri-youtube-line" />
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      influencers: [],
      filterStr: "",
    };
  },
  head() {
    return this.$seo({
      title: "프로, 인플루언서 리스트",
      description: "BAZZI.GG에 등록된 프로, 인플루언서를 확인해보세요.",
    });
  },
  computed: {
    filters() {
      if (this.filterStr === "") {
        return this.influencers;
      }
      return this.influencers.filter(
        (item) =>
          item.nickname.startsWith(this.filterStr) ||
          item.keywords.findIndex((p) => p.startsWith(this.filterStr)) !== -1
      );
    },
  },
  async created() {
    this.influencers = (await this.$api.getInfluencer()).result;
  },
};
</script>
<style scoped>
.influencer-box {
  min-width: 240px;
}
</style>
