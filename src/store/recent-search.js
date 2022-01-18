const ADD_NICKNAME = "ADD_NICKNAME";
const REMOVE_NICKNAME = "REMOVE_NICKNAME";
const POP_NICKNAME = "POP_NICKNAME";
export const state = () => ({
  recentSearches: [],
});

export const getters = {
  get: (state) => {
    return state.recentSearches;
  },
  existNickname: (state) => (nickname) => {
    return state.recentSearches.findIndex((node) => node === nickname) !== -1;
  },
};

export const mutations = {
  [ADD_NICKNAME](state, nickname) {
    state.recentSearches.unshift(nickname);
  },
  [REMOVE_NICKNAME](state, nickname) {
    const idx = state.recentSearches.findIndex((node) => node === nickname);
    if (idx === -1) {
      return false;
    }
    state.recentSearches.splice(idx, 1);
    return true;
  },
  [POP_NICKNAME](state) {
    if (state.recentSearches.length < 6) {
      return;
    }
    state.recentSearches.pop();
  },
};

export const actions = {
  addNickname({ commit, getters }, nickname) {
    if (getters.existNickname(nickname)) {
      commit(REMOVE_NICKNAME, nickname);
    } else {
      commit(POP_NICKNAME);
    }
    commit(ADD_NICKNAME, nickname);
  },
};
