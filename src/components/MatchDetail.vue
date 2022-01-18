<template>
  <div :class="{ isLoading: isLoading === true }">
    <div v-if="error === null">
      <div v-if="players.length === 0">
        <b-loading v-model="isLoading" :is-full-page="false" :can-cancel="false" />
      </div>
      <table v-if="0 < players.length" class="match__detail">
        <thead>
          <tr>
            <th class="match__detail__header__cell match__detail__header__rank">순위</th>
            <th class="match__detail__header__cell">라이더</th>
            <th class="match__detail__header__cell">라이센스</th>
            <th
              class="match__detail__header__cell match__detail__header__cell__flyingpet"
            >
              플라잉 펫
            </th>
            <th class="match__detail__header__cell">기록</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(player, idx) of players"
            :key="idx"
            class="match__detail__team match__detail__row"
            :class="{ 'match__detail__my-team': player.myTeam }"
          >
            <td class="match__detail__cell">
              {{ player.record === "" ? "리타이어" : idx + 1 + "위" }}
            </td>

            <td class="match__detail__cell has-text-left">
              <img
                class="match__detail__cell__character"
                :src="`${$config.metadataUrl}character/${player.characterHash}.png`"
                :alt="player.character"
                @error="CharacterErrorCallback"
              />
              <img
                class="match__detail__cell__kartbody"
                :src="`${$config.metadataUrl}kart/${player.kartbodyHash}.png`"
                :alt="player.kartbody"
                @error="KartbodyErrorCallback"
              />
              <span v-if="idx === meIndex" class="icon--me">나</span>
              <nuxt-link
                :to="{
                  name: 'rider-rider',
                  params: { rider: player.nickname },
                }"
                class="match__detail__cell__nickname text__underline--hover"
              >
                {{ player.nickname }}
              </nuxt-link>
              <b-icon
                size="ri-1x"
                icon="ri-links-line"
                style="width: 13px; vertical-align: middle"
              />
            </td>
            <td class="match__detail__cell">
              <LicenseBadge
                :license="player.license"
                :racing-master-emblem="player.racingMasterEmblem"
              />
            </td>
            <td class="match__detail__cell match__detail__flyingpet">
              {{ player.flyingPet }}
            </td>
            <td class="match__detail__cell">
              {{ player.record == "" ? "-" : player.record }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <Alert :title="error.title" :subtitle="error.subtitle" />
    </div>
  </div>
</template>
<script>
import { CharImgErrorCallback, KartbodyImgErrorCallback } from "../helpers/callback";
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    accessId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      meIndex: -1,
      players: [],
      isLoading: true,
      error: null,
    };
  },
  async mounted() {
    this.isLoading = true;
    const res = await this.$api.getMatchDetail(this.id, this.accessId);
    if (res.success) {
      this.players = res.result.players;
      this.meIndex = res.result.index;
    } else {
      switch (res.status) {
        case 404:
          this.error = {
            title: "매치 정보를 가져올 수 없음",
            subtitle: "매치 정보는 최근 1년치만 조회할 수 있습니다.",
          };
          break;
        default:
          this.error = {
            title: "알 수 없는 에러",
            subtitle: "알 수 없는 에러가 발생했습니다.",
          };
          break;
      }
    }
    this.isLoading = false;
  },
  methods: {
    CharacterErrorCallback: CharImgErrorCallback,
    KartbodyErrorCallback: KartbodyImgErrorCallback,
  },
};
</script>
<style scoped>
.match--win .match__detail__my-team {
  background-color: #bbdefb;
}
.match--lose .match__detail__my-team {
  background-color: #f8bbd0;
}
.match__detail {
  border-top: 1px solid #e6e6e6;
  color: #363636;
  width: 100%;
}
.match__detail__header__cell {
  padding-bottom: 0.6rem;
  padding-top: 0.6rem;
  text-align: center;
  background-color: #363944;
  color: white;
  font-weight: normal;
}
.match__detail__row {
  text-align: center;
  border-top: 1px solid #e6e6e6;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
}
.match__detail__header__rank {
  width: 70px;
}
.match__detail__cell {
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
  vertical-align: middle;
}
.match__detail__cell__character {
  width: 50px;
  vertical-align: middle;
}
.match__detail__cell__kartbody {
  width: 40px;
  margin-left: -10px;
  vertical-align: middle;
}
.match__detail__cell__nickname {
  padding-left: 18px;
  vertical-align: middle;
  color: #292929;
  font-weight: bold;
}
.match__detail__cell__nickname:hover {
  cursor: pointer;
  text-decoration: underline;
}
@media screen and (max-width: 600px) {
  .match__detail__flyingpet,
  .match__detail__header__cell__flyingpet,
  .match__detail__cell__character {
    display: none;
  }
}
</style>
<style scoped>
.isLoading {
  position: relative;
  display: flex;
  height: 100px;
}
.icon--me {
  background-color: #4a4a4a;
  color: white;
  border-radius: 50%;
  padding: 2px;
  position: absolute;
  font-size: 11px;
  width: 20px;
  height: 20px;
  line-height: 1.6;
  text-align: center;
}
</style>
