<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(ShopCart,index) in cartInfo" :key="index">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="ShopCart.isChecked" @change="changeCheck(index,$event.target.checked)" ref="checkOne">
          </li>
          <li class="cart-list-con2">
            <img :src="ShopCart.imgUrl">
            <div class="item-msg">{{ShopCart.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ShopCart.cartPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handler('sub',index)">-</a>
            <input autocomplete="off" type="text" :value="ShopCart.skuNum" minnum="1" class="itxt" @change="handler('change',index,$event)">
            <a href="javascript:void(0)" class="plus" @click="handler('add',index)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ShopCart.skuNum*ShopCart.cartPrice}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteCart(ShopCart)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>

      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="AllCheck&&cartInfo.length>0" @change="changeAllCheck">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteCheck">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{GoodsCheck}}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{AllCount}}</i>
        </div>
        <div class="sumbtn">
          <!-- <a class="sum-btn" href="###" target="_blank">结算</a> -->
          <router-link to="/trade" class="sum-btn">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { throttle } from 'lodash'
export default {
  name: 'ShopCart',
  data () {
    return {
    }
  },
  mounted () {
    this.getDate()
  },
  computed: {
    ...mapState({
      ShopCartList: state => state.shopcart.ShopCartList || {}
    }),
    ...mapGetters(['cartInfoLists', 'cartInfoLists1']),
    cartInfo () {
      let c1 = this.cartInfoLists1.cartInfoList || []
      let c = this.cartInfoLists.cartInfoList || []
      if (c1.length !== 0) {
        if (c.length !== 0) {
          c.push(c1[0])
        }
      }
      return c
    },
    AllCheck () {
      return this.cartInfo.every(item => item.isChecked)
    },
    AllCount () {
      let sum = this.cartInfo.reduce((sum, item) => {
        if (item.isChecked) {
          sum += item.cartPrice * item.skuNum
        }
        return sum
      }, 0)
      return sum
    },
    GoodsCheck () {
      let count = this.cartInfo.reduce((count, item) => {
        if (item.isChecked) {
          count += item.skuNum
        }
        return count
      }, 0)
      return count
    }
  },
  methods: {
    getDate () {
      this.$store.dispatch('getShopCartList')
    },
    // 处理数量
    handler: throttle(async function (type, index, event) {
      let num = this.cartInfo[index].skuNum
      switch (type) {
        case 'add':
          num = 1
          break
        case 'change':
          if (isNaN(event.target.value * 1) || event.target.value < 1) {
            event.target.value = num
            num = 0
          } else {
            num = parseInt(event.target.value) - num
          }
          break
        case 'sub':
          num = num > 1 ? -1 : 0
          break
      }
      try {
        let result = await this.$store.dispatch('getAddToCart', { skuId: this.cartInfo[index].skuId, skuNum: num })
        this.getDate()
      } catch (error) {
        console.log(error.message)
      }
    }, 1000),

    // 修改商品选中状态
    async changeCheck (index, check) {
      // let check = event.target.checked
      try {
        let result = await this.$store.dispatch('getCheckCart', { skuID: this.cartInfo[index].skuId, isChecked: check ? 1 : 0 })
        this.getDate()
      } catch (error) {
        console.log(error.message)
      }
    },

    // 删除一个商品
    async deleteCart (ShopCart) {
      try {
        let result = await this.$store.dispatch('delShopCart', { skuId: ShopCart.skuId })
        this.getDate()
      } catch (error) {
        console.log(error.mesage)
      }
    },

    // 全选按钮改变
    async changeAllCheck (e) {
      let check = e.target.checked ? '1' : '0'
      try {
        await this.$store.dispatch('changeAllCheck', { data: this.cartInfo, isChecked: check })
        this.getDate()
      } catch (error) {
        console.log(error.message)
      }
    },

    // 删除选中
    deleteCheck () {
      let arr = this.cartInfo.filter(item => item.isChecked)
      arr.forEach((item) => {
        this.deleteCart(item)
      })
    }

  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 20.8333%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
