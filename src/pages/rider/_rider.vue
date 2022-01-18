<template>
  <div class="layout-container h-100">
    <div v-if="status === 202 || status === 200 || status === 201">
      <div class="rider-form">
        <nav class="level w-100">
          <div class="level-left is-flex">
            <div class="level-item pr-2">
              <img
                :src="
                  riderData.character === ''
                    ? '~/static/img/unknown_character.png'
                    : `${$config.metadataUrl}character/${riderData.character}.png`
                "
                class="rider-form__character__image"
                alt="마지막으로 사용한 캐릭터"
                @error="CharacterErrorCallback"
              />
            </div>
            <div class="level-item">
              <div>
                <div class="pb-2 is-flex">
                  <h1 class="subtitle has-text-white has-text-weight-bold">
                    {{ $route.params.rider }}
                  </h1>
                </div>
                <div class="field">
                  <LicenseBadge
                    :license="riderData.license"
                    :racing-master-emblem="riderData.racingMasterEmblem"
                  />
                </div>
                <b-button
                  type="is-primary"
                  :class="{ 'is-loading': isLoading }"
                  icon-left="ri-refresh-line"
                  class="is-radiusless"
                  @click="RefreshPlayerDetail"
                >
                  전적 갱신
                </b-button>
                <span class="is-block has-text-grey-light pt-1 is-size-7">{{
                  riderData.lastRenewal
                }}</span>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div class="card channel" style="border-top-width: 0px">
        <a
          class="navbar-item channel__item is-inline-block"
          style="height: 42px; padding-left: 1rem; padding-right: 1rem"
          :class="{
            'channel__dropdown--selected': currentChannel === 'all',
          }"
          @click="currentChannel = 'all'"
        >
          <span style="vertical-align: text-top">전체</span>
        </a>
        <b-dropdown
          v-model="currentChannel"
          position="is-bottom-right"
          append-to-body
          aria-role="menu"
          class="channel__dropdown"
          :class="{
            'channel__dropdown--selected':
              $store.getters['channel/getItemChannelInfoByChannel'](currentChannel) !==
              undefined,
          }"
        >
          <template #trigger>
            <a class="navbar-item channel__item">
              <span>아이템 전</span>
              <b-icon icon="ri-arrow-down-s-line"></b-icon>
            </a>
          </template>

          <b-dropdown-item
            v-for="(channel, i) of $store.getters['channel/getSupportItemChannel']"
            :key="i"
            custom
            class="channel__dropdown__item"
            :value="channel.channel"
            @click.native="currentChannel = channel.channel"
          >
            <b-tag v-if="channel.new" type="is-danger is-light">NEW</b-tag>
            <span>{{ channel.name }}</span>
          </b-dropdown-item>
        </b-dropdown>
        <b-dropdown
          v-model="currentChannel"
          position="is-bottom-right"
          append-to-body
          aria-role="menu"
          class="channel__dropdown"
          :class="{
            'channel__dropdown--selected':
              $store.getters['channel/getSpeedChannelInfoByChannel'](currentChannel) !==
              undefined,
          }"
        >
          <template #trigger>
            <a class="navbar-item channel__item">
              <span>스피드 전</span>
              <b-icon icon="ri-arrow-down-s-line"></b-icon>
            </a>
          </template>

          <b-dropdown-item
            v-for="(channel, i) of $store.getters['channel/getSupportSpeedChannel']"
            :key="i"
            custom
            class="channel__dropdown__item"
            :value="channel.channel"
            @click.native="currentChannel = channel.channel"
          >
            <b-tag v-if="channel.new" type="is-danger is-light">NEW</b-tag>
            <span>{{ channel.name }}</span>
          </b-dropdown-item>
        </b-dropdown>
        <b-dropdown
          v-model="currentChannel"
          position="is-bottom-right"
          append-to-body
          aria-role="menu"
          class="channel__dropdown"
          :class="{
            'channel__dropdown--selected':
              $store.getters['channel/getEtcChannelInfoByChannel'](currentChannel) !==
              undefined,
          }"
        >
          <template #trigger>
            <a class="navbar-item channel__item">
              <span>ETC</span>
              <b-icon icon="ri-arrow-down-s-line"></b-icon>
            </a>
          </template>

          <b-dropdown-item
            v-for="(channel, i) of $store.getters['channel/getSupportEtcChannel']"
            :key="i"
            custom
            class="channel__dropdown__item"
            :value="channel.channel"
            @click.native="currentChannel = channel.channel"
          >
            <b-tag v-if="channel.new" type="is-danger is-light">NEW</b-tag>
            <span>{{ channel.name }}</span>
          </b-dropdown-item>
        </b-dropdown>
      </div>
      <div v-show="!isLoading">
        <div v-if="error" class="pt-5">
          <Alert :title="error.title" :subtitle="error.subtitle" />
        </div>
        <div
          v-show="
            currentChannel.includes('speed') === true && 0 < trackRecord.rows.length
          "
          class="pt-5"
        >
          <div class="card">
            <header class="card-header is-shadowless">
              <h2
                class="
                  card-header-title
                  has-background-white has-text-weight-normal has-text-weight-semibold
                "
              >
                최근 200게임 트랙 전적
              </h2>
            </header>
            <divider />
            <vue-good-table
              :columns="trackRecord.columns"
              :rows="trackRecord.rows"
              :sort-options="{
                enabled: true,
                initialSortBy: { field: 'trackPlayCount', type: 'desc' },
              }"
              style-class="track-record-table"
            >
              <template slot="table-row" slot-scope="props">
                <span v-if="props.column.field == 'track'">
                  <img
                    class="track-record-table__track-image"
                    :src="`${$config.metadataUrl}track/${props.row.trackHash}.png`"
                    :alt="props.row.track"
                  />
                  <span class="pl-2 has-text-black">
                    {{ props.formattedRow[props.column.field] }}</span
                  >
                </span>
                <span v-else-if="props.column.field == 'winningRate'">
                  <span
                    :style="{
                      color:
                        props.row.winningRate >= 70
                          ? '#f14668'
                          : props.row.winningRate <= 69 && props.row.winningRate >= 60
                          ? '#48c78e'
                          : '',
                    }"
                  >
                    {{ props.row.winningRate.toFixed(2).toString() + "%" }}</span
                  >
                </span>
                <span v-else-if="props.column.field == 'bestTime'">
                  <span>
                    {{
                      props.row.bestTime.length === 0 ? "기록 없음" : props.row.bestTime
                    }}</span
                  >
                </span>
                <span v-else-if="props.column.field == 'top'">
                  <span> {{ props.row.top.toFixed(2).toString() + "%" }}</span>
                </span>
                <span v-else>
                  {{ props.formattedRow[props.column.field] }}
                </span>
              </template>
            </vue-good-table>
            <b-button
              v-show="trackRecord.visibleMoreButton"
              type="is-radiusless track-record-table__more-button"
              expanded
              icon-left="ri-arrow-down-s-line"
              @click="MoreShowTrackRecord()"
            >
              더보기
            </b-button>
          </div>
        </div>
        <div v-show="riderData.recentMatchSummary.mostPlayedTrack !== null" class="pt-5">
          <div class="card">
            <header class="card-header is-shadowless">
              <h2
                class="
                  card-header-title
                  has-background-white has-text-weight-normal has-text-weight-semibold
                "
              >
                최근
                {{ riderData.matches.length >= 20 ? 20 : riderData.matches.length }}게임
                요약
              </h2>
            </header>
            <divider />
            <div class="level">
              <div class="level-item has-text-centered pt-2 pb-2">
                <div>
                  <p class="heading">승률</p>
                  <p class="subtitle mb-2 has-text-weight-bold">
                    {{ riderData.recentMatchSummary.winRate.toFixed(2) + "%" }}
                  </p>
                  <p class="heading">
                    <span class="recent-matches-summary__win">{{
                      riderData.recentMatchSummary.win
                    }}</span
                    >승
                    <span class="recent-matches-summary__lose">{{
                      riderData.recentMatchSummary.lose
                    }}</span
                    >패
                  </p>
                </div>
              </div>
              <div class="level-item has-text-centered pt-2 pb-2">
                <div>
                  <p class="heading">평균 순위</p>
                  <p class="subtitle has-text-weight-bold">
                    {{
                      riderData.recentMatchSummary.averageRank != -1
                        ? riderData.recentMatchSummary.averageRank.toFixed(1) + "위"
                        : "없음"
                    }}
                  </p>
                </div>
              </div>
              <div class="level-item has-text-centered pt-2 pb-2">
                <div>
                  <p class="heading">가장 많이 플레이한 트랙</p>
                  <p class="subtitle has-text-weight-bold">
                    {{ riderData.recentMatchSummary.mostPlayedTrack }}
                  </p>
                </div>
              </div>
              <div class="level-item has-text-centered pt-2 pb-2">
                <div>
                  <p class="heading">가장 많이 사용한 카트바디</p>
                  <p class="subtitle has-text-weight-bold">
                    {{ riderData.recentMatchSummary.mostUsedKartbody }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="pt-5 pb-5">
          <b-collapse
            v-for="(match, index) of riderData.matches"
            :key="index"
            class="card match"
            :class="{
              'match--lose': !match.win,
              'match--win': match.win,
              'match--retire': match.rank == 99 || match.rank == -1,
            }"
            animation="slide"
            :open="false"
            :aria-id="match.matchId"
            @open="$set(openMatchDetail, match.matchId.toString(), true)"
          >
            <div slot="trigger" slot-scope="props" class="match__header">
              <div class="match__header__bar" />
              <div class="match__header__content">
                <div class="has-text-centered match__header__status">
                  <div class="match__header__status__warpper">
                    <p class="match__header__result">
                      {{ match.win ? "승리" : "패배" }}
                    </p>
                    <p class="is-size-7 has-text-grey">
                      {{
                        $dayjs
                          .duration($dayjs(match.endDateTime).diff($dayjs()))
                          .humanize(true)
                      }}
                    </p>
                    <div v-if="match.channel !== null">
                      <hr
                        class="mt-1 mb-1 has-background-grey-lighter"
                        style="
                          height: 1px;
                          width: 52px;
                          text-align: center;
                          margin: 0 auto;
                        "
                      />
                      <p>{{ match.channel }}</p>
                    </div>
                  </div>
                </div>
                <div class="match__header__info">
                  <span class="match__header__rank">{{
                    match.rank == 99 || match.rank == -1 ? "리타" : match.rank + "위"
                  }}</span>
                  <div class="match__header__track">
                    <span class="match__header__track__name">{{ match.track }}</span>
                    <span class="match__header__record">
                      {{ match.record }}
                    </span>
                  </div>
                </div>
                <div class="match__header__used-item">
                  <img
                    class="match__header__used-item__character"
                    :src="`${$config.metadataUrl}character/${match.characterHash}.png`"
                    :alt="match.character"
                    @error="CharacterErrorCallback"
                  />
                  <img
                    class="match__header__used-item__kartbody"
                    :src="`${$config.metadataUrl}kart/${match.kartbodyHash}.png`"
                    :alt="match.kartbody"
                    @error="KartbodyErrorCallback"
                  />
                </div>
              </div>
              <a class="card-header-icon">
                <b-icon
                  size="ri-lg"
                  :icon="props.open ? 'ri-arrow-up' : 'ri-arrow-down'"
                />
              </a>
            </div>
            <div v-if="openMatchDetail[match.matchId.toString()] === true">
              <MatchDetail :id="match.matchId" :access-id="riderData.accessId" />
            </div>
          </b-collapse>
          <b-button
            v-show="0 < riderData.matches.length && visibleMoreMatchesButton"
            expanded
            class="mt-2 card"
            size="is-large"
            :loading="moreMatchesLoading"
            @click="MoreMatches"
            >더보기</b-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { CharImgErrorCallback, KartbodyImgErrorCallback } from "../../helpers/callback";
export default {
  name: "Rider",
  async asyncData({ route, $api, error }) {
    const data = {
      head: {
        title: `${route.params.rider} - 전적 검색`,
        subtitle: "",
      },
      currentChannel:
        typeof route.query.channel === "string" ? route.query.channel : "all",
    };
    const riderUrlEncode = encodeURI(route.params.rider);
    const res = await $api.getPlayerDetail(riderUrlEncode, data.currentChannel);
    data.status = res.status;
    switch (res.status) {
      case 200:
        data.head.description = `${route.params.rider} / ${res.result.license} 라이센스 / 승률: ${res.result.recentMatchSummary.winRate}%, 승: ${res.result.recentMatchSummary.win}, 패: ${res.result.recentMatchSummary.lose} / 가장많이 사용한 카트바디: ${res.result.recentMatchSummary.mostUsedKartbody} / 가장 많이 플레이한 트랙: ${res.result.recentMatchSummary.mostPlayedTrack}`;
        break;
      case 202:
        data.error = {
          title: "전적 갱신 필요",
          subtitle: "전적 갱신이 필요합니다.",
        };
        break;
      case 404:
        error({
          statusCode: 404,
          message: "해당 라이더가 존재하지 않습니다.",
        });
        data.error = {
          subtitle: "해당 라이더가 존재하지 않습니다.",
        };
        break;
      default:
        data.error = {
          title: "에러",
          subtitle: "알 수 없는 에러가 발생하였습니다.",
        };
    }
    data.riderData = res.result;
    if (!res.success) {
      data.head.description = data.error.subtitle;
      // 오브젝트가 아니면 200, 201 등 정상적인 반환이 아님
      if (typeof data !== "object") {
        data.riderData.lastRenewal = "조회 기록 없음";
      }
    }
    return data;
  },
  data() {
    return {
      openMatchDetail: {},
      error: null,
      isLoading: false,
      riderData: null,
      status: null,
      head: {
        title: null,
        description: null,
      },
      visibleMoreMatchesButton: true,
      moreMatchesLoading: false,
      trackRecord: {
        columns: [
          {
            label: "트랙",
            field: "track",
            sortable: false,
          },
          {
            label: "승률",
            field: "winningRate",
            tdClass:
              "vgt-center-align vgt-vertical-align track-record-table__winningRate",
            thClass: "vgt-center-align track-record-table__winningRate",
            type: "number",
            width: "100px",
          },
          {
            label: "플레이 횟수",
            field: "trackPlayCount",
            tdClass:
              "vgt-center-align vgt-vertical-align track-record-table__trackPlayCount",
            thClass: "vgt-center-align track-record-table__trackPlayCount",
            type: "number",
            width: "100px",
          },
          {
            label: "최고 기록",
            field: "bestTime",
            tdClass: "vgt-center-align vgt-vertical-align track-record-table__bestTime",
            thClass: "vgt-center-align track-record-table__bestTime",
            width: "150px",
          },
          {
            label: "상위",
            field: "top",
            tdClass: "vgt-center-align vgt-vertical-align track-record-table__top",
            thClass: "vgt-center-align track-record-table__top",
            type: "number",
            width: "120px",
          },
        ],
        rows: [],
        visibleMoreButton: true,
      },
    };
  },
  async fetch() {
    if (parseInt(this.status / 100) === 2) {
      this.$store.dispatch("recent-search/addNickname", this.$route.params.rider);
    }
    if (this.status === 200 || this.status === 204) {
      // 초기에는 총 10개를 로드하기 위해 2번 호출함
      this.MoreShowTrackRecord();
      this.MoreShowTrackRecord();
    }
  },
  head() {
    return this.$seo({
      title: this.head.title,
      description: this.head.description,
    });
  },
  watch: {
    async currentChannel(val) {
      if (this.currentChannel === this.$route.query.channel) {
        return;
      }
      this.$router.replace({
        to: "/rider",
        query: { ...this.$route.query, channel: val },
      });
      await this.GetPlayerDetail();
    },
  },
  mounted() {
    const lastRenewal = this.$dayjs(this.riderData.lastRenewalRaw);
    let serverTime = this.$dayjs().tz().format("YYYY-MM-DD hh:mm:ss");
    serverTime = this.$dayjs(serverTime);
    // 한국 시간과 전적 검색 시간을 초 단위로 비교한다.
    const time = serverTime.diff(lastRenewal.format("YYYY-MM-DD hh:mm:ss"), "second");
    // 전적 검색한지 120초 이상이면
    if (120 < time) {
      this.RefreshPlayerDetail();
    }
  },
  methods: {
    CharacterErrorCallback: CharImgErrorCallback,
    KartbodyErrorCallback: KartbodyImgErrorCallback,
    async GetPlayerDetail() {
      this.visibleMoreMatchesButton = this.isLoading = true;
      this.riderData.matches.length = this.trackRecord.rows.length = 0;
      this.error = null;
      const res = await this.$api.getPlayerDetail(
        this.$route.params.rider,
        this.currentChannel
      );
      this.riderData = res.result;
      switch (res.status) {
        case 200:
          this.MoreShowTrackRecord();
          this.MoreShowTrackRecord();
          break;
        case 202:
          this.riderData.lastRenewal = "조회 기록 없음";
          this.error = {
            title: "전적 갱신 필요",
            subtitle: "전적 갱신이 필요합니다.",
          };
          break;
        case 404:
          this.$router.push({ path: "/rider/not-found" });
          break;
        default:
          this.error = {
            title: "에러",
            subtitle: "알 수 없는 에러가 발생하였습니다.",
          };
      }
      if (!res.success) {
        this.head.description = this.error.subtitle;
      }
      if (this.riderData.matches.length < 20) {
        this.visibleMoreMatchesButton = false;
      }
      this.isLoading = false;
    },
    async RefreshPlayerDetail() {
      if (this.isLoading === true) {
        alert("전적 갱신 중입니다.");
        return;
      }
      this.isLoading = true;
      this.error = null;
      const res = await this.$api.RefreshPlayerDetail(
        this.$route.params.rider,
        this.currentChannel
      );
      let data = {};
      switch (res.status) {
        case 201:
          this.riderData = res.result;
          this.visibleMoreMatchesButton = true;
          this.trackRecord.rows.length = 0;
          this.MoreShowTrackRecord();
          this.MoreShowTrackRecord();
          break;
        case 204:
          this.riderData.lastRenewal = "조회 기록 없음";
          data.error = {
            title: "플레이 기록 없음",
            subtitle: "조회할 수 있는 플레이 기록이 없습니다.",
          };
          break;
        case 400:
          data.error = {
            title: "요청 데이터 에러",
            subtitle: "허용 되지 않은 요청입니다.",
          };
          break;
        case 404:
          this.$router.push({ path: "/rider/not-found" });
          break;
        case 418:
          alert(res.result);
          break;
        default:
          data.error = {
            title: "알 수 없는 에러",
            subtitle: "알 수 없는 에러가 발생했습니다.",
          };
          break;
      }
      if (res.status !== 201 && res.status !== 418) {
        this.error = data.error;
      }
      if (this.riderData.matches.length < 20) {
        this.visibleMoreMatchesButton = false;
      }
      this.isLoading = false;
    },
    MoreShowTrackRecord(limit = 5) {
      if (this.riderData.recentTrackRecords === null) {
        return;
      }
      const trackRecordLength = this.riderData.recentTrackRecords.length;
      for (let i = 0; i < limit && i < trackRecordLength; i++) {
        const trackRecord = this.riderData.recentTrackRecords.shift();
        this.trackRecord.rows.push(trackRecord);
      }
      if (this.riderData.recentTrackRecords.length === 0) {
        this.trackRecord.visibleMoreButton = false;
      } else {
        this.trackRecord.visibleMoreButton = true;
      }
    },
    async MoreMatches() {
      this.moreMatchesLoading = true;
      const lastMatchId =
        this.riderData.matches[this.riderData.matches.length - 1].matchId;
      const res = await this.$api.getMoreMatches(
        this.riderData.accessId,
        lastMatchId,
        this.currentChannel
      );
      this.riderData.matches.push(...res.result.matches);
      this.moreMatchesLoading = false;
      this.visibleMoreMatchesButton = res.result.moreMatches;
    },
  },
};
</script>
<style scoped>
.channel >>> .dropdown-trigger:focus,
.channel__dropdown__item:focus {
  outline-style: none;
}
.channel__dropdown {
  border-bottom-color: #eeeeee;
  border-bottom-style: solid;
  border-bottom-width: 2px;
}
.channel__dropdown--selected {
  border-bottom-color: #0440d4;
  border-bottom-style: solid;
  border-bottom-width: 2px;
}
.channel__item {
  color: black;
}
.channel__item:focus,
.channel__item:hover,
.channel__dropdown__item:hover {
  color: white;
  outline-style: none;
  background-color: #0440d4;
}
.channel__dropdown__item.is-active > span:last-child {
  text-decoration-color: #0440d4;
  text-decoration-line: underline;
  text-underline-position: under;
}
.channel__dropdown__item {
  cursor: pointer;
}
</style>
<style>
.table-ri-arrow-up-s-line {
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='16px' height='16px'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M12 10.828l-4.95 4.95-1.414-1.414L12 8l6.364 6.364-1.414 1.414z' fill='rgba(50,115,220,1)'/%3E%3C/svg%3E");
}
/* 전적 갱신중에는 갱신 아이콘이 가려지도록 */
.button.is-loading .icon {
  visibility: hidden;
}
.ri-refresh-line {
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='16px' height='16px'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M5.463 4.433A9.961 9.961 0 0 1 12 2c5.523 0 10 4.477 10 10 0 2.136-.67 4.116-1.81 5.74L17 12h3A8 8 0 0 0 6.46 6.228l-.997-1.795zm13.074 15.134A9.961 9.961 0 0 1 12 22C6.477 22 2 17.523 2 12c0-2.136.67-4.116 1.81-5.74L7 12H4a8 8 0 0 0 13.54 5.772l.997 1.795z' fill='rgba(255,255,255,1)'/%3E%3C/svg%3E");
}
</style>
<style scoped src="~/assets/css/match.css"></style>
<style scoped>
@media screen and (max-width: 457px) {
  section {
    padding: 1.5rem 0px 1.5rem 0px;
  }
  .container > section {
    padding: 0rem !important;
  }
}
</style>
<style scoped>
::v-deep .visibe-channel-config-tab-item {
  margin-left: auto;
}
.nickname-history-button {
  margin-left: 9px;
  border-width: 0px;
  height: 25px;
  background-color: #6002ee;
}
.social-list {
  margin-top: auto;
  margin-bottom: 30px;
}
.social-list img {
  padding-left: 18px;
  height: 24px;
}
/* 맨 위 라이더 정보 */
.rider-form {
  display: flex;
  padding: 24px 16px 24px 16px;
  background-position: center;
  background-size: cover;
  background-image: url("~static/img/rider-header-background.png");
}
.rider-form__character__image {
  border: solid 1px white;
  padding: 16px 0px 16px 0px;
  width: 130px;
}
</style>
<style scoped>
/* 트랙 이미지 */
.track-record-table__track-image {
  width: 40px;
  vertical-align: middle;
  display: inline-block;
}
/* 더보기 버튼 */
.track-record-table__more-button {
  border-color: transparent;
  border-top-color: #dbdbdb;
}
.track-record-table__more-button:focus {
  border-color: transparent;
  border-top-color: #dbdbdb;
}
.track-record-table__more-button:hover {
  border-color: transparent;
  border-top-color: #dbdbdb;
}
</style>
<style scoped>
.recent-matches-summary__win {
  color: #4dabf5;
}
.recent-matches-summary__lose {
  color: #ed4b82;
}
</style>
