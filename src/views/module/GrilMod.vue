<!-- gril 女生模块 -->
<template>
  <div class="gril">
    <van-tabs @click="switchContent" @rendered="InitializeContent">
      <van-tab v-for="item in grilNav" :title="item.name" :key="item.id">
        <div class="loading" v-if="!grilModuleData">
          <img src="../../assets/img/loading.jpg" alt="" />
          <h3>快点，快点</h3>
        </div>
        <!-- 女生各个模块内容 开始 -->
        <van-pull-refresh
          success-text="刷新成功"
          v-model="isLoading"
          @refresh="onRefresh"
        >
          <div class="gril-list">
            <ul>
              <router-link
                tag="li"
                :to="`/Details?id=${item.item_id}`"
                v-for="item in grilModuleData"
                :key="item.item_id"
              >
                <div class="img">
                  <img :src="`${item.image}@200w.jpg`" alt="" />
                </div>
                <h4>{{ item.title }}</h4>
                <div class="decision" v-if="item.comic_info.decision">
                  {{ item.comic_info.decision }}
                </div>
                <p class="main_style_name" v-if="!item.comic_info.decision">
                  更新至第{{ item.comic_info.lastest_short_title }}话
                </p>
              </router-link>
            </ul>
          </div>
        </van-pull-refresh>
        <!-- 女生各个模块内容 结束 -->
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { getSexComics, getTabModulelist } from "@/api/home";
import Vue from "vue";
import { Tab, Tabs, Toast, PullRefresh } from "vant";

Vue.use(Toast).use(Tab).use(Tabs).use(PullRefresh);

export default {
  //import引入的组件需要注入到对象中才能使用
  name: "GrilMod",
  components: {},
  data() {
    //这里存放数据
    return {
      grilNav: [],
      grilModuleData: [], //女生各个模块数据
      currentModuleId: null, //当前模块id
      pageNum: 1, //请求的第几页
      timer: null, //定时器
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
      this.pageNum++;
      this.getSexComicsFun();
    },
    // 女生的漫画类型切换
    switchContent(index) {
      console.log(index);
      this.grilModuleData = null;
      this.currentModuleId = this.grilNav[index].id;
      this.getSexComicsFun();
    },
    //女生数据初始化
    InitializeContent(index) {
      if (index == 0) {
        console.log(index);
        this.grilModuleData = null;
        this.currentModuleId = this.grilNav[index].id;
        this.getSexComicsFun();
      }
    },
    //女生tab列表
    getTabModulelistFun() {
      getTabModulelist({
        tabId: 262,
      }).then((data) => {
        console.log("女生列表", data);
        this.grilNav = data.data.layout;
        console.log(this.grilNav);
      });
    },
    //女生各个模块数据
    getSexComicsFun() {
      getSexComics({
        moduleId: this.currentModuleId,
        pageNum: this.pageNum,
        pageSize: 10,
      }).then((data) => {
        if (this.grilModuleData) {
          console.log("111");
          Toast.loading({
            message: "加载中...",
            forbidClick: true,
            duration: 1000,
          });
          console.log(data.data.comics);
          this.grilModuleData = [...this.grilModuleData, ...data.data.comics];
          return;
        }
        this.grilModuleData = data.data.comics;
        console.log("女生数据", data.data.comics);
      });
    },
    //女生的滚动事件
    onScroll(e) {
      let scrollTop = e.target.scrollTop;
      let scrollHeight = e.target.scrollHeight;
      let offsetHeight = Math.ceil(e.target.getBoundingClientRect().height);
      let currentHeight = scrollTop + offsetHeight;
      if (currentHeight + 1 >= scrollHeight) {
        let cd = false;
        if (cd) {
          return;
        } else {
          console.log("触底了");
          this.timer = setTimeout(() => {
            cd = true;
            this.pageNum++;
            this.getSexComicsFun();
          }, 1000);
        }
      }
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getTabModulelistFun();
    this.$store.commit("ONSCROLL", this.onScroll);
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {
    clearTimeout(this.timer);
  }, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less">
.gril {
  .van-tabs {
    .van-tabs__wrap {
      .van-tabs__nav {
        .van-tab--active {
          font-weight: bolder;
        }
        .van-tabs__line {
          width: 18px;
          background-color: #0085e5;
        }
      }
    }
  }
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
  .gril-list {
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