<template>
  <div class="home" @scroll="onScroll">
    <!-- 搜索框 开始 -->
    <router-link tag="div" to="/search" class="home-search">
      <van-search
        class="home-search-input"
        shape="round"
        placeholder="搜索"
        disabled
      />
    </router-link>
    <!-- 搜索框 结束 -->

    <!-- 各个模块选项 开始 -->
    <van-sticky>
      <div class="module-content">
        <van-tabs v-model="active" @click="clickEachMod">
          <van-tab
            title="热门"
            name="hotCartoon"
            to="/home/hotCartoon"
          ></van-tab>
          <van-tab title="推荐" name="recommend" to="/home/recommend"></van-tab>
          <van-tab title="男生" name="boyMod" to="/home/boyMod"></van-tab>
          <van-tab title="女生" name="grilMod" to="/home/grilMod"></van-tab>
        </van-tabs>
      </div>
    </van-sticky>
    <!-- 各个模块选项 结束 -->
    <router-view :human="human"></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import Vue from "vue";
import { Search, Tab, Tabs, Sticky } from "vant";
import { getTabModule } from "@/api/home";
Vue.use(Search).use(Tab).use(Tabs).use(Sticky);
export default {
  data() {
    return {
      active: 0,
      human: [], //男女模块数据的依赖
    };
  },
  methods: {
    getTabModuleFun() {
      getTabModule().then((data) => {
        console.log("数据Tab配置", data);
        this.human = data.data.human;
      });
    },
    // 滚动事件
    onScroll(e) {
      if (this.$store.state.homeScroll) {
        this.$store.state.homeScroll(e);
      }
    },
    // 热门、推荐... 之间的切换
    clickEachMod(name) {
      // if (name != "recommend") {
      //   this.$store.commit("ONSCROLL", null);
      // }
      this.$store.commit("ONSCROLL", null);
    },
  },
  created() {
    this.getTabModuleFun();
  },
};
</script>
<style lang="less">
.home {
  width: 100%;
  height: calc(100vh - 50px);
  overflow: hidden;
  overflow-y: scroll;
  .van-sticky--fixed {
    background-color: #fff;
    transition: background-color 0.3s;
  }
  .home-search {
    width: 100%;
    height: 46px;
    .home-search-input {
      height: 46px;
      background-color: transparent;
      .van-search__content {
        background-color: rgba(255, 255, 255, 0.4);
      }
    }
  }
  .module-content {
    width: 100%;
    height: 46px;
    .van-tabs {
      .van-tabs__wrap {
        height: 46px;
        border-bottom: 2px solid #f4f4f4;
        .van-tabs__nav {
          padding: 0;
          background-color: transparent;
          .van-tab {
            font-size: 18px;
            padding: 0 17px;
          }
          .van-tab--active {
            font-size: 20px;
            font-weight: bolder;
          }
          .van-tabs__line {
            opacity: 0;
          }
        }
      }
    }
  }
}
</style>
