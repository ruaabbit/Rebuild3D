import { createRouter, createWebHistory } from 'vue-router';

// 引入页面组件


const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home/index.vue'),
  },
  {
    path: '/:pathMatch(.*)*', // 404 页面匹配所有未定义路由
    name: 'NotFound',
    component: () => import('@/views/NotFound/index.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
