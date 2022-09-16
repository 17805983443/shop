import { reqShopCart, reqCheckCart, reqDeleteCart } from '@/api'

const state = {
  ShopCartList: []
}

const mutations = {
  getShopCartList (state, value) {
    state.ShopCartList = value
  }
}

const actions = {
  async getShopCartList (context) {
    let shopCartList = await reqShopCart()
    context.commit('getShopCartList', shopCartList.data)
  },
  async getCheckCart (context, value) {
    let checkCart = await reqCheckCart(value.skuID, value.isChecked)
  },
  async delShopCart (context, value) {
    let delShopCart = await reqDeleteCart(value.skuId)
  },
  changeAllCheck ({ dispatch }, value) {
    let data = value.data
    let promiseAll = []
    data.forEach(element => {
      let promise = dispatch('getCheckCart', { skuID: element.skuId, isChecked: value.isChecked })
      promiseAll.push(promise)
    })
    return Promise.all(promiseAll)
  }
}

const getters = {
  cartInfoLists (state) {
    return state.ShopCartList[0] || {}
  },
  cartInfoLists1 (state) {
    return state.ShopCartList[1] || {}
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
