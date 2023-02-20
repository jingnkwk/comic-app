<!-- HotCartoon  -->
<template>
  <div class="hot-cartoon">
    <!-- 加载 -->
    <div class="loading_box" v-if="!bannerData">
      <img src="../../assets/img/loading.jpg" alt="" />
      <h3>快点，快点</h3>
    </div>
    <!-- 背景 -->
    <div class="bg" :style="`background-image: url(${bgUrl})`"></div>
    <van-pull-refresh
      success-text="刷新成功"
      v-model="isLoading"
      @refresh="onRefresh"
    >
      <!-- 热门轮播图 开始 -->
      <div class="hot-banner" v-if="bannerData">
        <!-- :autoplayTimeout="5000" :autoplay="true" -->
        <carousel-3d
          :autoplay="true"
          :autoplayTimeout="5000"
          :perspective="40"
          :display="5"
          :animationSpeed="500"
          :controlsVisible="false"
          :loop="true"
          :width="251"
          :height="335"
          :onMainSlideClick="onMainSlideClick"
          @after-slide-change="onSlideChange"
          @load="onSlideChange"
        >
          <slide v-for="(item, i) in bannerData" :index="i" :key="item.id">
            <!-- slot-scope="obj" @click="imgClick(item, obj)" -->
            <template>
              <router-link
                tag="img"
                :to="`/Details?id=${item.jump_url.match(/\d+(.\d+)?/g)}`"
                style="border-radius: 8px"
                :src="item.image_url"
              />
            </template>
          </slide>
        </carousel-3d>
      </div>
      <!-- 热门轮播图 结束 -->
      <!-- 今日热门速递 开始 -->
      <div class="today-hot" v-if="bannerData">
        <div class="today-hot-header" v-if="todayHotTitle">
          <h3>{{ todayHotTitle.name }}</h3>
          <div class="check">
            <p>查看全部</p>
            <span class="iconfont icon-jiantouyou"></span>
          </div>
        </div>
        <!-- 加载 -->
        <div class="loading" v-if="!roll_six_comics">
          <img src="../../assets/img/loading.jpg" alt="" />
          <h3>快点，快点</h3>
        </div>
        <div class="today-hot-content" v-if="roll_six_comics">
          <ul>
            <router-link
              tag="li"
              :to="`/Details?id=${item.comic_id}`"
              class="today-hot-item"
              v-for="item in roll_six_comics"
              :key="item.comic_id"
            >
              <div class="img">
                <img :src="`${item.vertical_cover}@200w.jpg`" alt="" />
              </div>
              <h4>{{ item.title }}</h4>
              <p>{{ item.recommendation }}</p>
            </router-link>
          </ul>
        </div>
        <div class="today-hot-footer">
          <div class="button" @click="replaceData">
            <span class="iconfont icon-shuaxin"></span>
            换一批
          </div>
        </div>
      </div>
      <!-- 今日热门速递 结束 -->

      <!-- 新作飙升榜 开始 -->
      <div class="new-soaring-list" v-if="bannerData">
        <div class="new-soaring-header">
          <h3>新作飙升榜</h3>
        </div>

        <div v-if="rank">
          <router-link
            tag="div"
            :to="`/Details?id=${item.comic_id}`"
            class="new-soaring-contert"
            v-for="item in rank.slice(0, 1)"
            :key="item.comic_id"
          >
            <div class="img">
              <img :src="`${item.cover}@400w.jpg`" alt="" />
            </div>
            <h4>{{ item.comic_title }}</h4>
            <p v-if="item.recommendation">{{ item.recommendation }}</p>
            <p v-if="!item.recommendation">
              更新至第{{ item.last_short_title }}话
            </p>
          </router-link>
        </div>

        <ul class="new-soaring-contert-two" v-if="rank">
          <router-link
            tag="li"
            :to="`/Details?id=${item.comic_id}`"
            v-for="item in rank.slice(1, 5)"
            :key="item.comic_id"
          >
            <div class="img">
              <img :src="`${item.cover}@400w.jpg`" alt="" />
            </div>
            <h4>{{ item.comic_title }}</h4>
            <p v-if="item.recommendation">{{ item.recommendation }}</p>
            <p v-if="!item.recommendation">
              更新至第{{ item.last_short_title }}话
            </p>
          </router-link>
        </ul>

        <ul class="new-soaring-contert-three" v-if="rank">
          <router-link
            tag="li"
            :to="`/Details?id=${item.comic_id}`"
            v-for="item in rank.slice(5, 9)"
            :key="item.comic_id"
          >
            <div class="img">
              <img :src="`${item.cover}@400w.jpg`" alt="" />
            </div>
            <p>{{ item.comic_title }}</p>
          </router-link>
        </ul>
      </div>
      <!-- 新作飙升榜 结束 -->

      <!-- 1V1超甜狗粮! 开始 -->
      <div class="super-sweet-dog" v-if="bannerData">
        <div class="super-sweet-header">
          <h3>1V1超甜狗粮!</h3>
          <div class="check">
            <p>查看全部</p>
            <span class="iconfont icon-jiantouyou"></span>
          </div>
        </div>
        <!-- 加载 -->
        <div class="loading" v-if="!roll_six_comics_dog">
          <img src="../../assets/img/loading.jpg" alt="" />
          <h3>快点，快点</h3>
        </div>
        <div class="super-sweet-content" v-if="roll_six_comics_dog">
          <ul>
            <router-link
              tag="li"
              :to="`/Details?id=${item.comic_id}`"
              class="today-hot-item"
              v-for="item in roll_six_comics_dog"
              :key="item.comic_id"
            >
              <div class="img">
                <img :src="`${item.vertical_cover}@200w.jpg`" alt="" />
              </div>
              <h4>{{ item.title }}</h4>
              <p>{{ item.recommendation }}</p>
            </router-link>
          </ul>
        </div>
        <div class="super-sweet-footer">
          <div class="button" @click="replaceDataDog">
            <span class="iconfont icon-shuaxin"></span>
            换一批
          </div>
        </div>
      </div>
      <!-- 1V1超甜狗粮! 结束 -->
    </van-pull-refresh>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
// import axios from "@/api/instance";
// import Swiper from "swiper"; // 注意引入的是Swiper
import {
  getTabModulelist,
  getBanner,
  getHomeConventional,
  getHomeInnovation,
} from "@/api/home";
import { Carousel3d, Slide } from "vue-carousel-3d";
import Vue from "vue";
import { Toast, PullRefresh } from "vant";

Vue.use(Toast).use(PullRefresh);
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "HotCartoon",
  components: {
    Carousel3d,
    Slide,
  },
  data() {
    //这里存放数据
    return {
      swiperInstance: null,
      bannerId: null, //轮播id
      bannerData: null, //首页轮播数据
      bgUrl: null, //轮播图当前轮到图片
      todayHotId: null, //今日热门速递id
      roll_six_comics: null, //今日热门速递数据
      todayHotTitle: null, //今日热门速递数据标题
      pageNum: 1, //请求页数
      newSoaringListId: null, //新作飙升榜数据id
      rank: null, //新作飙升榜数据
      dogId: null, //1V1超甜狗粮id
      dogPageNum: 1, //1V1超甜狗粮页数
      roll_six_comics_dog: null, //1V1超甜狗粮数据
      isLoading: false, //下拉加载状态
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 下拉加载触发
    onRefresh() {
      this.isLoading = false;
    },
    //切换轮播图更换背景
    onSlideChange(index) {
      // this.bgUrl = this.bannerData[index].image_url + "@200w.jpg";
      this.bgUrl = this.bannerData[index].image_url;
    },
    // 轮播图当前轮到图片 点击调用
    onMainSlideClick(index) {
      console.log(index);
    },
    // imgClick(data, obj) {
    //   // console.log(data);
    //   // console.log(obj);
    // },
    // 换一批
    replaceData() {
      this.pageNum++;
      console.log(this.pageNum);
      this.roll_six_comics = null;
      this.getHomeConventionalFun(this.todayHotId);
    },
    // 换一批 1V1超甜狗粮数据
    replaceDataDog() {
      this.dogPageNum++;
      this.roll_six_comics_dog = null;
      this.getHomeConventionalDogFun(this.dogId);
    },

    //热门分布
    getTabModulelistFun() {
      getTabModulelist({
        tabId: 341,
      }).then((data) => {
        console.log("热门分布", data);
        //热门轮播图 在数据中的下标
        let bannerIndex = data.data.layout.findIndex((item) => {
          return item.name == "banner";
        });
        //今日热门速递 在数据中的下标
        let todayHotIndex = data.data.layout.findIndex((item) => {
          return item.name == "今日热门速递";
        });
        // "新作飙升榜" 在数据中的下标
        let newSoaringListIndex = data.data.layout.findIndex((item) => {
          return item.name == "新作飙升榜";
        });
        this.bannerId = data.data.layout[0].id;
        this.todayHotId = data.data.layout[todayHotIndex].id;
        this.todayHotTitle = data.data.layout[todayHotIndex];
        this.newSoaringListId = data.data.layout[newSoaringListIndex].id;
        this.dogId = data.data.layout[4].id;
        this.getBannerFun();
        this.getHomeConventionalFun(this.todayHotId);
        this.getHomeInnovationFun();
        this.getHomeConventionalDogFun(this.dogId);
      });
    },
    //热门轮播图数据
    getBannerFun() {
      getBanner({
        id: this.bannerId,
      }).then((data) => {
        console.log("热门轮播数据", data);
        this.bannerData = data.data.banner;
      });
    },
    // 今日热门速递数据
    getHomeConventionalFun(id) {
      getHomeConventional({
        id: id,
        pageNum: this.pageNum,
        pageSize: 6,
        isAll: 0,
      }).then((data) => {
        this.roll_six_comics = data.data.roll_six_comics;
        // console.log("今日热门速递数据", this.roll_six_comics);
      });
    },
    // 新作飙升榜数据
    getHomeInnovationFun() {
      getHomeInnovation({
        id: this.newSoaringListId,
      }).then((data) => {
        console.log("新作飙升榜数据", data);
        this.rank = data.data.rank;
        // .sort((a, b) => {
        //   return b.total - a.total;
        // });
        console.log("this.rank", this.rank);
      });
    },
    // 1V1超甜狗粮
    getHomeConventionalDogFun(id) {
      getHomeConventional({
        id: id,
        pageNum: this.dogPageNum,
        pageSize: 6,
        isAll: 0,
      }).then((data) => {
        this.roll_six_comics_dog = data.data.roll_six_comics;
        // console.log("1V1超甜狗粮", this.roll_six_comics_dog);
      });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getTabModulelistFun();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less">
.hot-cartoon {
  width: 100%;
  position: relative;
  .loading_box {
    width: 100%;
    height: 50vh;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 20%;
    }
  }
  .bg {
    position: absolute;
    top: -92px;
    left: 0;
    z-index: -1;
    width: 100%;
    height: calc(337px + 46px + 46px + 30px);
    background-size: 100%;
    background-repeat: no-repeat;
    transition: background-image 0.1s;
    filter: blur(20px);
  }
  .hot-banner {
    .carousel-3d-container {
      margin: 0;
      .carousel-3d-slider {
        .carousel-3d-slide {
          border: none;
          // background-color: #fff;
        }
      }
    }
  }

  // 今日热门速递
  .today-hot {
    width: 100%;
    margin-top: 34px;
    .loading {
      width: 100%;
      height: 401px;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 20%;
      }
    }
    .today-hot-header {
      width: 100%;
      height: 38px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 17px;
      h3 {
        font-size: 20px;
      }
      .check {
        display: flex;
        font-size: 12px;
        color: #c2c4c8;
        span {
          color: #c2c4c8;
          font-size: 12px;
        }
      }
    }
    .today-hot-content {
      width: 100%;
      height: 401px;
      padding: 0 16px;
      ul {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        .today-hot-item {
          width: 31%;
          margin-bottom: 20px;
          .img {
            width: 100%;
            img {
              width: 100%;
            }
          }
          h4 {
            width: 100%;
            height: 19px;
            line-height: 19px;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          p {
            width: 100%;
            height: 17px;
            line-height: 17px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
    .today-hot-footer {
      width: 100%;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      .button {
        width: 223px;
        height: 37px;
        text-align: center;
        line-height: 37px;
        border-radius: 17px;
        background-color: #f1f1f3;
        color: #262729;
        font-size: 16px;
      }
    }
  }
  // 新作飙升榜
  .new-soaring-list {
    width: 100%;
    padding: 0 17px;
    margin-top: 16px;
    // background-color: #fbfbfb;
    .new-soaring-header {
      width: 100%;
      height: 36px;
      h3 {
        font-size: 20px;
      }
    }
    .new-soaring-contert {
      .img {
        width: 100%;
        height: 194px;
        border-radius: 6px;
        overflow: hidden;
        img {
          width: 100%;
          height: 194px;
        }
      }
      h4 {
        margin-top: 5px;
        width: 100%;
        height: 30px;
        color: #17181a;
        font-size: 20px;
      }
      p {
        width: 100%;
        height: 25px;
        font-size: 16px;
        color: #989aa2;
      }
    }
    .new-soaring-contert-two {
      margin-top: 14px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li {
        width: 48.6%;
        margin-bottom: 21px;
        .img {
          width: 100%;
          img {
            width: 100%;
            height: 94px;
          }
        }
        h4 {
          width: 100%;
          font-size: 14px;
        }
        p {
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 12px;
          color: #a9abb2;
        }
      }
    }
    .new-soaring-contert-three {
      width: 100%;
      display: flex;
      justify-content: space-between;
      li {
        width: 21%;
        .img {
          width: 100%;
          overflow: hidden;
          border-radius: 5px;
          img {
            width: 100%;
            height: 79px;
          }
        }
        p {
          margin-top: 8px;
          width: 100%;
          height: 40px;
          font-size: 14px;
          overflow: hidden;
          text-overflow: ellipsis;
          // white-space: nowrap;
        }
      }
    }
  }
  // 1V1超甜狗粮!
  .super-sweet-dog {
    width: 100%;
    margin-top: 34px;
    .loading {
      width: 100%;
      height: 401px;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 20%;
      }
    }
    .super-sweet-header {
      width: 100%;
      height: 38px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 17px;
      h3 {
        font-size: 20px;
      }
      .check {
        display: flex;
        font-size: 12px;
        color: #c2c4c8;
        span {
          color: #c2c4c8;
          font-size: 12px;
        }
      }
    }
    .super-sweet-content {
      width: 100%;
      padding: 0 16px;
      height: 401px;
      ul {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        .today-hot-item {
          width: 31%;
          margin-bottom: 20px;
          .img {
            width: 100%;
            img {
              width: 100%;
            }
          }
          h4 {
            width: 100%;
            height: 19px;
            line-height: 19px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          p {
            width: 100%;
            height: 17px;
            line-height: 17px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
    .super-sweet-footer {
      width: 100%;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      .button {
        width: 223px;
        height: 37px;
        text-align: center;
        line-height: 37px;
        border-radius: 17px;
        background-color: #f1f1f3;
        color: #262729;
        font-size: 16px;
      }
    }
  }
}
</style>