<!-- Recommend 推荐 -->
<template>
  <div class="recommend">
    <van-pull-refresh
      success-text="刷新成功"
      v-model="isLoading"
      @refresh="onRefresh"
    >
      <!-- 推荐轮播图 开始 -->
      <div class="swiper-container recommend-swiper">
        <div class="swiper-wrapper">
          <div class="loading" v-if="!RecommendBanner">
            <img src="../../assets/img/loading.jpg" alt="" />
            <h3>快点，快点</h3>
          </div>
          <a
            tag="div"
            :href="item.jump_value"
            class="swiper-slide"
            v-for="item in RecommendBanner"
            :key="item.id"
          >
            <img :src="`${item.img}@800w.jpg`" alt="" />
          </a>
        </div>
      </div>
      <!-- 漫画列表 开始 -->
      <div class="manga-list" v-if="RecommendBanner">
        <ul v-if="RecommendedLists.feeds">
          <router-link
            tag="li"
            :to="`/Details?id=${item.item_id}`"
            v-for="(item, index) in RecommendedLists.feeds"
            :key="index"
          >
            <div class="img" v-if="item.image">
              <img :src="`${item.image}@200w.jpg`" alt="" />
            </div>
            <h4>{{ item.title }}</h4>
            <div class="decision" v-if="item.comic_info.decision">
              {{ item.comic_info.decision }}
            </div>
            <p
              class="main_style_name"
              v-if="
                item.comic_info.main_style_name && !item.comic_info.decision
              "
            >
              {{ item.comic_info.main_style_name }}
            </p>
          </router-link>
        </ul>
      </div>
      <!-- 漫画列表 结束-->
    </van-pull-refresh>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Swiper from "swiper"; // 注意引入的是Swiper
import { getRecommendedBanner, getRecommendedLists } from "@/api/home";
import Vue from "vue";
import { Toast, PullRefresh } from "vant";

Vue.use(Toast).use(PullRefresh);
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "Recommend",
  components: {},
  data() {
    //这里存放数据
    return {
      RecommendBanner: null, //推荐banner数据
      recommendSwiper: undefined,
      RecommendedLists: [], //漫画列表数据
      pageNum: 0, //请求漫画列表第几页
      timer: null, //定时器
      isLoading: false, //下拉加载
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 请求推荐轮播图数据
    getRecommendedBannerFun() {
      getRecommendedBanner().then((data) => {
        console.log("banner", data);
        this.RecommendBanner = data.data;
        console.log(this.RecommendBanner);
      });
    },
    // 请求推荐漫画列表
    getRecommendedListsFun() {
      getRecommendedLists({ pageNum: this.pageNum, pageSize: 10 }).then(
        (data) => {
          // console.log("请求推荐漫画列表", data.data);
          if (this.RecommendedLists.feeds == []) {
            Toast({
              message: "没有更多内容了",
              position: "bottom",
            });
          }
          if (this.RecommendedLists.feeds) {
            Toast.loading({
              message: "加载中...",
              forbidClick: true,
              duration: 1000,
            });
            this.RecommendedLists.feeds = [
              ...this.RecommendedLists.feeds,
              ...data.data.feeds,
            ];
            return;
          } else if (!this.RecommendedLists.feeds) {
            this.RecommendedLists = data.data;
            return;
          }
        }
      );
    },
    // 下拉刷新
    onRefresh() {
      this.isLoading = false;
      this.pageNum++;
      this.getRecommendedListsFun();
    },
    // 滚动触底加载数据
    onScroll(e) {
      let scrollTop = e.target.scrollTop;
      let scrollHeight = e.target.scrollHeight;
      let offsetHeight = Math.ceil(e.target.getBoundingClientRect().height);
      let currentHeight = scrollTop + offsetHeight;
      if (currentHeight + 1 >= scrollHeight) {
        // console.log("触底了");
        let cd = false;
        if (cd) {
          return;
        } else {
          console.log("触底了");
          this.timer = setTimeout(() => {
            cd = true;
            this.pageNum++;
            this.getRecommendedListsFun();
          }, 1000);
        }
      }
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getRecommendedBannerFun();
    this.getRecommendedListsFun();
    this.$store.commit("ONSCROLL", this.onScroll);
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.recommendSwiper = function () {
      new Swiper(".recommend-swiper", {
        //图片进行懒加载
        lazy: {
          loadPrevNext: true,
        },
        loop: true, // 循环模式选项
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true,
        preventClicksPropagation: true, //阻止点击事件冒泡
        touchMoveStopPropagation: true, //阻止触摸事件冒泡
        autoplay: {
          //自动开始
          delay: 3000, //时间间隔
          disableOnInteraction: false, //*手动操作轮播图后不会暂停*
        },
      });
    };
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {
    Toast.clear();
    this.recommendSwiper();
  }, //生命周期 - 更新之后
  beforeDestroy() {
    clearTimeout(this.timer);
  }, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
  deactivated() {},
};
</script>
<style lang="less" scoped>
.recommend {
  width: 100%;
  height: calc(100vh - 46px - 46px - 50px);
  // 轮播图样式 开始
  .swiper-container {
    .swiper-wrapper {
      .loading {
        width: 100%;
        height: 50vh;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 20%;
        }
      }
      .swiper-slide {
        text-align: center;
        img {
          width: 90%;
          height: 172px;
        }
      }
    }
  }

  .manga-list {
    width: 100%;
    padding: 0 17px;
    ul {
      margin-top: 14px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li {
        width: 48.6%;
        margin-bottom: 21px;
        border-radius: 8px;
        border: 1px solid #f3f3f3;
        overflow: hidden;
        padding: 0 0 7px 0;
        .img {
          width: 100%;
          img {
            width: 100%;
          }
        }
        h4 {
          width: 100%;
          font-size: 14px;
          padding: 0 11px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .decision {
          width: max-content;
          height: 21px;
          background-color: #fffaf0;
          color: #ef971c;
          font-size: 12px;
          line-height: 21px;
          padding: 0 7px;
          margin-top: 7px;
          margin-left: 11px;
        }
        .main_style_name {
          height: 21px;
          line-height: 21px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 12px;
          margin-top: 7px;
          margin-left: 11px;
        }
      }
    }
  }
}
</style>