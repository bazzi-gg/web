export const actions = {
  // eslint-disable-next-line no-unused-vars
  async nuxtServerInit({ commit }, { app, $api }) {
    if (process.env.MAINTENANCE_MODE == "true") {
      return;
    }
    const res = await $api.getAuthToken();
    if (res.success) {
      app.$axios.setToken(res.result, "Bearer");
      commit("auth/SET_TOKEN", res.result);
    }
  },
};
