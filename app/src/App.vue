<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <!-- 在注册和登录页面不显示 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header/index.vue'
import Footer from './components/Footer/index.vue'
import { reqCateGoryList } from '@/api'
export default {
  components: { Header, Footer },
  async mounted () {
    let CateGoryList = await reqCateGoryList()
    CateGoryList = CateGoryList.data
    this.$store.dispatch('getCateGoryList', CateGoryList)
  }
}
</script>

<style lang="less">

</style>
