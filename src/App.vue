<template>
  <div id="app">
    <!-- 一级路由视口 -->
    <router-view />
    <van-tabbar
      v-model="active"
      class="tabber"
      active-color="#2a2b2d"
      inactive-color="#a9acb1"
      z-index="50"
      route
    >
      <van-tabbar-item name="home" to="/home">
        <p>首页</p>
        <template #icon="props">
          <img :src="props.active ? icon1.inactive : icon1.active" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item name="classfiy" to="/classification">
        <p>分类</p>
        <template #icon="props">
          <img :src="props.active ? icon2.inactive : icon2.active" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item name="bookcase" to="/bookrack">
        <p>书架</p>
        <template #icon="props">
          <img :src="props.active ? icon3.inactive : icon3.active" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item name="my" to="/mine">
        <p>我的</p>
        <template #icon="props">
          <img :src="props.active ? icon4.inactive : icon4.active" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import home from "@/assets/img/home.png";
import home2 from "@/assets/img/home2.png";
import classfig from "@/assets/img/classfig.png";
import classfig2 from "@/assets/img/classfig2.png";
import bookcase from "@/assets/img/bookcase.png";
import bookcase2 from "@/assets/img/bookcase2.png";
import my from "@/assets/img/my.png";
import my2 from "@/assets/img/my2.png";
import Vue from "vue";
import { Tabbar, TabbarItem } from "vant";

Vue.use(Tabbar);
Vue.use(TabbarItem);
export default {
  name: "App",
  data() {
    return {
      active: "home",
      icon1: {
        active: home,
        inactive: home2,
      },
      icon2: {
        active: classfig,
        inactive: classfig2,
      },
      icon3: {
        active: bookcase,
        inactive: bookcase2,
      },
      icon4: {
        active: my,
        inactive: my2,
      },
    };
  },
};
</script>

<style lang="less">
html,
body {
  width: 100%;
  height: 100%;
  #app {
    max-width: 750px;
    min-width: 375px;
    margin: 0 auto;
  }
  .tabber {
    width: 100%;
    height: 50px;
    img {
      width: 25px;
      height: 25px;
    }
  }
}
</style>