const SET_TOKEN = "SET_TOKEN";
export const state = () => ({
  token: null,
});
export const mutations = {
  [SET_TOKEN](state, token) {
    state.token = token;
  },
};
