import Vue from 'vue'
import App from './App.vue'
import router from './router'
import TypeNav from '@/components/TypeNav'
import store from '@/store/index'
import Carousel from '@/components/Carousel'
import Pager from '@/components/Pager'
import * as API from '@/api'
import { MessageBox } from 'element-ui'
import '@/mock/mockServe'
import '@/plugin/validate'

// 注册三级联动的全局组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pager.name, Pager)

Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$msgbox = MessageBox

Vue.config.productionTip = false

new Vue({
  router,
  // 注册仓库，每个组件会多一个$store的属性
  store,
  render: h => h(App),
  beforeCreate () {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  }
}).$mount('#app')
