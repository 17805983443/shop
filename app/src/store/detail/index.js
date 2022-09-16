import { reqDetailList, reqAddToCart } from '@/api'
import { Promise } from 'core-js'
import { getUuidToken } from '@/utils/getUuid'

const state = {
  DetailList: [],
  UUID_Token: getUuidToken()
}

const mutations = {
  getDetailList (state, value) {
    state.DetailList = value
  }
}

const actions = {
  async getDetailList (context, value) {
    let detailList = await reqDetailList(value)
    context.commit('getDetailList', detailList.data)
  },
  async getAddToCart (context, value) {
    let result = await reqAddToCart(value.skuId, value.skuNum)
    if (result !== '') {
      return 'ok'
    } else {
      return Promise.reject(new Error('falil'))
    }
  }
}

const getters = {
  categoryView (state) {
    return state.DetailList.categoryView || []
  },
  skuInfo (state) {
    return state.DetailList.skuInfo || []
  },
  spuSaleAttrList (state) {
    return state.DetailList.spuSaleAttrList || []
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
