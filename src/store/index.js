import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    homeScroll: null, // 各个模块滚动事件状态存放
    comicDetailData: null // 漫画详情章节列状态
  },
  getters: {},
  mutations: {
    ONSCROLL(state, value) {
      state.homeScroll = value
    },
    // 漫画详情章节列状态
    COMICLIST(state, value) {
      state.comicDetailData = value
    }
  },
  actions: {},
  modules: {}
})
