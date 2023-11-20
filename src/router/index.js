import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: () => import('@/views/login/LoginPage.vue') }, //登录页
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'), //首页架子
      // redirect: '/article/manage',
      children: [
        {
          path: '/article/manage',
          component: () => import('@/views/article/ArticleManage.vue') //文章管理
        },
        {
          path: '/article/channel',
          component: () => import('@/views/article/ArticleChannel.vue') //频道管理
        },
        {
          path: '/user/profile',
          component: () => import('@/views/user/UserProfile.vue') //个人详情
        },
        {
          path: '/user/avatar',
          component: () => import('@/views/user/UserAvatar.vue') //更换头像
        },
        {
          path: '/user/password',
          component: () => import('@/views/user/UserPassword.vue') //重置密码
        }
      ]
    }
  ]
})

export default router
