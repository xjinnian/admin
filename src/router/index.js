import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: () => import('@/views/login/LoginPage.vue') }, // 登录页
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: '/article/manage',
      children: [
        {
          name: 'ArticleManage',
          path: '/article/manage',
          component: () => import('@/views/article/ArticleManage.vue')
        },
        {
          name: 'ArticleChannel',
          path: '/article/channel',
          component: () => import('@/views/article/ArticleChannel.vue')
        },
        {
          name: 'UserProfile',
          path: '/user/profile',
          component: () => import('@/views/user/UserProfile.vue')
        },
        {
          name: 'UserAvatar',
          path: '/user/avatar',
          component: () => import('@/views/user/UserAvatar.vue')
        },
        {
          name: 'UserPassword',
          path: '/user/password',
          component: () => import('@/views/user/UserPassword.vue')
        }
      ]
    }
  ]
})
export default router
