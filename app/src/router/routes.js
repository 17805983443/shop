// 导入路由组件
// import Home from '@/pages/Home'
// import Search from '@/pages/Search'
// import Login from '@/pages/Login'
// import Register from '@/pages/Register'
// import Detail from '@/pages/Detail'
// import AddCartSuccess from '@/pages/AddCartSuccess'
// import ShopCart from '@/pages/ShopCart'
// import Trade from '@/pages/Trade'
// import Pay from '@/pages/Pay'
// import PaySuccess from '@/pages/PaySuccess'

export default [
  {
    path: '/center',
    component: () => import('@/pages/Center'),
    meta: { show: true },
    children: [
      {
        path: 'myorder',
        component: () => import('@/pages/MyOrder')
      },
      {
        path: 'grouporder',
        component: () => import('@/pages/GroupOrder')
      },
      {
        path: '/center',
        redirect: '/center/myorder'
      }

    ]
  },
  {
    path: '/paysuccess',
    component: () => import('@/pages/PaySuccess'),
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      if (from.path !== '/pay') {
        next(false)
      } else {
        next()
      }
    }
  },
  {
    path: '/pay',
    component: () => import('@/pages/Pay'),
    meta: { show: true }
  },
  {
    path: '/trade',
    component: () => import('@/pages/Trade'),
    meta: { show: true }
  },
  {
    path: '/shopcart',
    component: () => import('@/pages/ShopCart'),
    meta: { show: true }
  },
  {
    name: 'addcartsuccess',
    path: '/addcartsuccess',
    component: () => import('@/pages/AddCartSuccess'),
    meta: { show: true }
  },
  {
    path: '/detail/:skuId?',
    component: () => import('@/pages/Detail'),
    meta: { show: true }
  },
  {
    path: '/home',
    component: () => import('@/pages/Home'),
    meta: { show: true }
  },
  {
    path: '/search/:keyword?',
    component: () => import('@/pages/Search'),
    meta: { show: true },
    name: 'search'
  },
  {
    path: '/login',
    component: () => import('@/pages/Login'),
    meta: { show: false }
  },
  {
    path: '/register',
    component: () => import('@/pages/Register'),
    meta: { show: false }
  },
  {
    path: '*',
    redirect: '/home'
  }

]
