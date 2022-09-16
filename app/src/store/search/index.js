import { reqSearchList } from '@/api'

const state = {
  SearchLists: []
}
const mutations = {
  getSearchList (state, value) {
    state.SearchLists = value
  }
}
const actions = {
  async getSearchList (context, value) {
    let SearchList = await reqSearchList(value)
    context.commit('getSearchList', SearchList.data)
  }
}
const getters = {
  trademarkList (state) {
    return state.SearchLists.trademarkList || []
  },
  attrsList (state) {
    return state.SearchLists.attrsList || []
  },
  goodsList (state) {
    return state.SearchLists.goodsList || []
  }
}

export default ({
  state,
  mutations,
  actions,
  getters
})
