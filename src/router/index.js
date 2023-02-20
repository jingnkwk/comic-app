import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AdvertisementCom from '@/views/AdvertisementCom'
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/advertisement'
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    redirect: '/home/HotCartoon',
    meta: {
      keep: true
    },
    children: [
      {
        path: 'recommend',//推荐
        name: 'recommend',
        component: () => import('@/views/module/Recommend'),
      },
      {
        path: 'hotCartoon',//热门
        name: 'hotCartoon',
        component: () => import('@/views/module/HotCartoon'),
      },
      {
        path: 'boyMod',//男生
        name: 'boyMod',
        component: () => import('@/views/module/BoyMod'),
      },
      {
        path: 'grilMod',//女生
        name: 'grilMod',
        component: () => import('@/views/module/GrilMod'),
      },
    ]
  },
  {
    path: '/classification',//分类
    name: 'classification',
    component: () => import('@/views/Classification'),
  },
  {
    path: '/bookrack',//书架
    name: 'bookrack',
    component: () => import('@/views/Bookrack'),
  },
  {
    path: '/mine',//我的
    name: 'mine',
    component: () => import('@/views/Mine'),
  },
  {
    path: '/search',//搜索页面
    name: 'search',
    component: () => import('@/views/Search')
  },
  {
    path: '/details',//详情页面
    name: 'details',
    component: () => import('@/views/Details')
  },
  {
    path: '/comicPage',//漫画页面
    name: 'comicPage',
    component: () => import('@/views/ComicPage')
  },
  {
    path: '/taUser',//他人用户界面
    name: 'taUser',
    component: () => import("@/views/TaUser")
  },
  {
    path: '/advertisement',//广告页
    name: 'advertisement',
    component: AdvertisementCom,
    // beforeEnter: (to, from, next) => {
    //   let guidePage = window.localStorage.getItem("guidePage");
    //   if (guidePage) {
    //     next();
    //     return;
    //   } else {
    //     next("/guidePage");
    //   }
    // }
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
