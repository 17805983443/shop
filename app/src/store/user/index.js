import { reqRegister, reqGetCode, reqLogin, reqUserInfo, reqLoginout } from '@/api'
import { setToken, getToken, remToken } from '@/utils/Token'

const state = {
  userInfo: {},
  token: getToken()
}
const mutations = {
  getLogin (state, value) {
    state.token = value
  },
  getUserInfo (state, value) {
    state.userInfo = value
  },
  clear (state) {
    state.userInfo = {}
    state.token = ''
    remToken()
  }

}
const actions = {
  async getRegister ({ commit }, data) {
    let result = await reqRegister(data)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  },

  async getCode ({ commit }, value) {
    let result = await reqGetCode(value)
    if (result.code === 200) {
      return result.data
    } else {
      return Promise.reject(new Error('failed'))
    }
  },

  async getLogin ({ commit }, value) {
    let result = await reqLogin(value)
    if (result.code === 200) {
      commit('getLogin', result.data.token)
      setToken(result.data.token)
    } else {
      return Promise.reject(new Error('failed'))
    }
  },

  async getUserInfo ({ commit }, value) {
    let result = await reqUserInfo()
    if (result.code === 200) {
      commit('getUserInfo', result.data)
    } else {
      return Promise.reject(new Error('failed'))
    }
  },

  async getLoginout ({ commit }) {
    let result = await reqLoginout()
    if (result.code === 200) {
      commit('clear')
    } else {
      Promise.reject(new Error('failed'))
    }
  }
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
