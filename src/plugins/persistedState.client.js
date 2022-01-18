import createPersistedState from "vuex-persistedstate";

export default ({ store }) => {
  createPersistedState({
    paths: [
      "recent-search",
      "channel.checkedItemChannels",
      "channel.checkedSpeedChannels",
      "channel.checkedEtcChannels",
    ],
  })(store);
};
