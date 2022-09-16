import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import store from '@/store'

// 重写push和replace方法
const OriginPush = VueRouter.prototype.push
const OriginReplace = VueRouter.prototype.replace

// 解决编程式导航多次触发的报错提醒
// call和apply都可以改变this的指向并且调用函数，但是call传递的参数用逗号隔开，apply只能传递数组参数
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve & reject) {
    OriginPush.call(this, location, resolve, reject)
  } else {
    OriginPush.call(this, location, () => {}, () => {})
  }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve & reject) {
    OriginReplace.call(this, location, resolve, reject)
  } else {
    OriginReplace.call(this, location, () => {}, () => {})
  }
}

// 使用插件
Vue.use(VueRouter)

// 配置路由
const router = new VueRouter({
  // 配置路由
  routes,
  // 设置滚动条的位置
  scrollBehavior () {
    // 滚动行为这个函数,需要有返回值,返回值为一个对象。
    // 经常可以设置滚动条x|y位置 [x|y数值的设置一般最小是零]
    return { y: 0 }
  }
})

export default router

router.beforeEach(async (to, from, next) => {
  let token = store.state.user.token
  let name = store.state.user.userInfo.name
  if (token) {
    if (to.path === '/login' || to.path === '/register') {
      next('/home')
    } else {
      if (name) {
        next()
      } else {
        try {
          await store.dispatch('getUserInfo')
          next()
        } catch (error) {
          // Token失效
          await store.dispatch('getLoginout')
          next('/login')
        }
      }
    }
  } else {
    let toPath = to.path
    if (toPath.indexOf('center') !== -1 || toPath.indexOf('pay') !== -1 || toPath.indexOf('trade') !== -1) {
      next('/login?redirect=' + toPath)
    } else {
      next()
    }
  }
})
