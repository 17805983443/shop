import { reqBannerList, reqFloorList } from '@/api'

const state = {
  CateGoryList: [],
  BannerList: [],
  FloorList: []
}
const mutations = {
  getCateGoryList (state, value) {
    state.CateGoryList = value
  },
  getBannerList (state, value) {
    state.BannerList = value
  },
  getFloorList (state, value) {
    state.FloorList = value
  }
}
const actions = {
  getCateGoryList (context, value) {
    context.commit('getCateGoryList', value)
  },
  async getBannerList (context) {
    let bannerList = await reqBannerList()
    if (bannerList.code === 200) {
      context.commit('getBannerList', bannerList.data)
    }
  },
  async getFloorList (context) {
    let floorList = await reqFloorList()
    if (floorList.code === 200) {
      context.commit('getFloorList', floorList.data)
    }
  }
}
const getters = {}

export default ({
  state,
  mutations,
  actions,
  getters
})
