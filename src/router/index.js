import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'el-icon-s-home' }
    }]
  },
  {
    path: '/weixin',
    component: Layout,
    redirect: '/weixin',
    children: [{
      path: 'weixin',
      name: 'weixin',
      component: () => import('@/views/weixin/index'),
      meta: { title: '微信授权管理', icon:'el-icon-user'}
    }]
  },
  {
    path: '/parking',
    component: Layout,
    redirect: '/parking',
    children: [{
      path: 'parking',
      name: 'parking',
      component: () => import('@/views/parking/index'),
      meta: { title: '车位信息管理', icon:'el-icon-place'}
    }]
  },
  {
    path: '/stop',
    component: Layout,
    redirect: '/stop',
    children: [{
      path: 'stop',
      name: 'stop',
      component: () => import('@/views/stop/index'),
      meta: { title: '停车信息管理', icon:'el-icon-collection-tag'}
    }]
  },
  {
    path: '/pay',
    component: Layout,
    redirect: '/pay',
    children: [{
      path: 'pay',
      name: 'pay',
      component: () => import('@/views/pay/index'),
      meta: { title: '支付信息管理', icon:'el-icon-money'}
    }]
  },
  // {
  //   path: '/wallet',
  //   component: Layout,
  //   redirect: '/wallet',
  //   children: [{
  //     path: 'wallet',
  //     name: 'wallet',
  //     component: () => import('@/views/wallet/index'),
  //     meta: { title: '用户钱包管理', icon:'el-icon-money'}
  //   }]
  // },
  {
    path: '/report',
    component: Layout,
    redirect: '/report',
    children: [{
      path: 'report',
      name: 'report',
      component: () => import('@/views/report/index'),
      meta: { title: '统计报表', icon:'el-icon-s-data'}
    }]
  },


  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
