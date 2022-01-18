export const state = () => ({
  supportItemChannels: [
    {
      channel: "itemIndiCombine",
      name: "통합 개인전",
    },
    {
      channel: "itemTeamCombine",
      name: "통합 팀전",
    },
    {
      channel: "itemNewItemIndiFastest2Enchant",
      name: "가장빠름 개인전",
    },
    {
      channel: "itemNewItemTeamFastest2Enchant",
      name: "가장빠름 팀전",
    },
    {
      channel: "clubRace_item",
      name: "클럽 레이싱",
    },
    {
      channel: "grandprix_itemNewItemIndi",
      name: "빠름 개인전 그랑프리",
    },
    {
      channel: "tierMatching_itemNewItemTeam",
      name: "등급전",
    },
  ],
  supportSpeedChannels: [
    {
      channel: "speedIndiCombine",
      name: "통합 개인전",
    },
    {
      channel: "speedTeamCombine",
      name: "통합 팀전",
    },
    {
      channel: "speedIndiFastest",
      name: "매우빠름 개인전",
    },
    {
      channel: "speedTeamFastest",
      name: "매우빠름 팀전",
    },
    {
      channel: "speedIndiInfinit",
      name: "무한부스터 개인전",
    },
    {
      channel: "speedTeamInfinit",
      name: "무한부스터 팀전",
    },
    {
      channel: "clubRace_speed",
      name: "클럽 레이싱",
    },
    {
      channel: "tierMatching_speedIndi",
      name: "등급전(개인)",
    },
    {
      channel: "tierMatching_speedTeam",
      name: "등급전(팀)",
    },
    {
      channel: "bokbulbokSpeedIndi",
      name: "V1 엔진 복불복(개인)",
    },
    {
      channel: "grandprix_speedIndiInfinit",
      name: "로디 크로스 그랑프리(개인)",
    },
  ],
  supportEtcChannels: [
    {
      channel: "battle",
      name: "아이템 배틀",
    },
  ],
});

export const getters = {
  getSupportItemChannel: (state) => {
    return state.supportItemChannels;
  },
  getSupportSpeedChannel: (state) => {
    return state.supportSpeedChannels;
  },
  getSupportEtcChannel: (state) => {
    return state.supportEtcChannels;
  },
  getItemChannelInfoByChannel: (state) => (channel) => {
    return state.supportItemChannels.find((p) => p.channel === channel);
  },
  getSpeedChannelInfoByChannel: (state) => (channel) => {
    return state.supportSpeedChannels.find((p) => p.channel === channel);
  },
  getEtcChannelInfoByChannel: (state) => (channel) => {
    return state.supportEtcChannels.find((p) => p.channel === channel);
  },
};
