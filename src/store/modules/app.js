const state = {
  // 页面初始化loading
  pageLoading: false,
  // 系统初始化loading
  sysLoading: true,
  // 当前环境
  currentEnv: process.env.VUE_APP_ENV
};

const mutations = {
  SET_PAGE_LOADING: (state, pageLoading) => {
    state.pageLoading = pageLoading;
  },
  SET_SYS_LOADING: (state, sysLoading) => {
    state.sysLoading = sysLoading;
  }
};

const actions = {
  setPageLoading({ commit }, pageLoading) {
    commit("SET_PAGE_LOADING", pageLoading);
  },
  setSysLoading({ commit }, sysLoading) {
    commit("SET_SYS_LOADING", sysLoading);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
