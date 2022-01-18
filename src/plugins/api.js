import { request } from "./api/http";
class Api {
  constructor(axios, config, dayjs) {
    this._axios = axios;
    this._config = config;
    this._dayjs = dayjs;
  }

  async _request(method, url, form = null) {
    return await request(this._axios, method, url, form);
  }

  async getAutocomplete(keyword) {
    return await this._request("get", `/api/autocomplete?keyword=${keyword}`);
  }

  async getAuthToken() {
    return await this._request("post", "/api/token", {
      Key: this._config.Key.toString(),
    });
  }
  async getInfluencer() {
    return await this._request("get", "/api/influencer");
  }
  async getMatchDetail(matchId, myAccessId) {
    return await this._request(
      "get",
      `/api/match/detail?matchId=${matchId}&accessId=${myAccessId}`
    );
  }
  async getMoreMatches(accessId, startMatchId, channel) {
    return await this._request(
      "get",
      `/api/match/more-matches?accessId=${accessId}&startMatchId=${startMatchId}&channel=${channel}`
    );
  }

  async userLicensePrediction(nickname) {
    return await this._request(
      "get",
      `/api/player/license-prediction?nickname=${nickname}`
    );
  }

  async getPlayerDetail(nickname, channel) {
    let playerDetail = await this._request(
      "get",
      `/api/player?nickname=${nickname}&channel=${channel}`
    );
    this._updateRiderData(playerDetail._result);
    return playerDetail;
  }

  async RefreshPlayerDetail(nickname, channel) {
    let playerDetail = await this._request("post", "/api/player", {
      Nickname: nickname,
      channel,
    });
    this._updateRiderData(playerDetail._result);
    return playerDetail;
  }
  _updateRiderData(data) {
    // 오브젝트가 아니면 200, 201 등 정상적인 반환이 아님
    if (typeof data !== "object") {
      return;
    }
    data.lastRenewalRaw = data.lastRenewal;
    const lastRenewal = this._dayjs(data.lastRenewal);
    if (lastRenewal.year() === 1901) {
      data.lastRenewal = "조회 기록 없음";
    } else if (this._dayjs().isSame(lastRenewal, "second")) {
      data.lastRenewal = "방금";
    } else {
      data.lastRenewal = this._dayjs
        .duration(lastRenewal.diff(this._dayjs().tz().format("YYYY-MM-DD HH:mm:ss")))
        .humanize(true);
    }
  }
}

export default ({ app }, inject) => {
  const api = new Api(app.$axios, app.$config, app.$dayjs);

  inject("api", api);
};
