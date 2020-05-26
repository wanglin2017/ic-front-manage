import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '@/views/Home.vue'
import Layout from '@/views/Layout.vue'
import Login from '@/views/Login.vue'

Vue.use(VueRouter)

/**
 * 路由相关属性说明
 * hidden: 当设置hidden为true时，意思不在sideBars侧边栏中显示
 * mete{
 * title: xxx,  设置sideBars侧边栏名称
 * icon: xxx,  设置ideBars侧边栏图标
 * noCache: true  当设置为true时不缓存该路由页面
 * }
 */

// 先定义权限通用路由表（公共页面）
export const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: '登陆页面'
    },
    hidden: true
  },
  {
    path: '/',
    component: Home,
    redirect: '/about',
    name: '首页'
  }
]

// 异步挂载的路由
// 动态需要根据权限加载的路由表
export const asyncRouterMap = [
  {
    path: '/content',
    name: 'contentManage',
    meta: { role: ['admin', 'research'] },
    children: [
      {
        path: '/solution',
        name: 'solution',
        meta: { role: ['admin', 'research'] }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

// 实例化vue时挂载静态路由
const createRouter = () => {
  return new VueRouter({
    routes: constantRouterMap,
    scrollBehavior() {
      return { x: 0, y: 0 }
    }
  })
}
const router = createRouter()

export default router
