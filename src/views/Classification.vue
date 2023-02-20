<!-- classification -->
<template>
  <div class="classification" @scroll="onScroll">
    <!-- 分类头部 开始 -->
    <van-sticky>
      <div class="classification-header">
        <!-- <span class="iconfont icon-jiantouzuo"></span> -->
        <h4>分类</h4>
      </div>
    </van-sticky>
    <!-- 分类头部 结束 -->
    <!-- 分割线 -->
    <div class="classification-line"></div>
    <!-- 筛选导航 开始 -->
    <div class="classification-nav" v-if="classConditions">
      <!-- 漫画类型分类 -->
      <ul class="nav-type">
        <li :class="{ active: stylesActive == -1 }" @click="stylesClick(-1)">
          全部
        </li>
        <li
          v-for="(item, index) in classConditions.styles"
          :key="item.id"
          @click="stylesClick(index)"
          :class="{ active: stylesActive == index }"
        >
          {{ item.name }}
        </li>
      </ul>
      <div class="classification-line"></div>
      <div class="other-options" v-show="showScreening">
        <!-- 漫画国际分类 -->
        <ul class="nav-item">
          <li :class="{ active: areasActive == -1 }" @click="areasClick(-1)">
            全部
          </li>
          <li
            v-for="(item, index) in classConditions.areas"
            :key="item.id"
            @click="areasClick(index)"
            :class="{ active: areasActive == index }"
          >
            {{ item.name }}
          </li>
        </ul>
        <!-- 漫画连载分类 -->
        <ul class="nav-item">
          <li :class="{ active: statusActive == -1 }" @click="statusClick(-1)">
            全部
          </li>
          <li
            v-for="(item, index) in classConditions.status"
            :key="item.id"
            @click="statusClick(index)"
            :class="{ active: statusActive == index }"
          >
            {{ item.name }}
          </li>
        </ul>
        <!-- 漫画付费分类 -->
        <ul class="nav-item">
          <li :class="{ active: pricesActive == -1 }" @click="pricesClick(-1)">
            全部
          </li>
          <li
            v-for="(item, index) in classConditions.prices"
            :key="item.id"
            @click="pricesClick(index)"
            :class="{ active: pricesActive == index }"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <!-- 漫画时间人气分类 -->
      <div class="nav-footer">
        <ul class="nav-item">
          <li
            v-for="(item, index) in classConditions.orders"
            :key="item.id"
            @click="ordersClick(index)"
            :class="{ active: ordersActive == index }"
          >
            {{ item.name }}
          </li>
        </ul>
        <div class="screening" @click="showScreening = !showScreening">
          <span
            :class="[
              'iconfont',
              showScreening ? 'icon-jiantoushang' : 'icon-jiantouxia',
            ]"
          ></span>
          <p>筛选</p>
        </div>
      </div>
    </div>
    <!-- 筛选导航 开始 -->

    <!-- 分类内容 开始 -->
    <div class="classify-content">
      <div class="loading" v-if="!classifylistData">
        <img src="../assets/img/loading.jpg" alt="" />
        <h3>快点，快点</h3>
      </div>
      <ul class="classify-lists">
        <router-link
          tag="li"
          :to="`/Details?id=${item.season_id}`"
          class="classify-item"
          v-for="item in classifylistData"
          :key="item.season_id"
        >
          <div class="img">
            <img :src="`${item.vertical_cover}@200w.jpg`" alt="" />
          </div>
          <h4>{{ item.title }}</h4>
          <p>更新至{{ item.total }}话</p>
        </router-link>
      </ul>
    </div>
    <!-- 分类内容 结束 -->
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { getClassifyConditions, getClassifyResults } from "@/api/classify";
import Vue from "vue";
import { Sticky } from "vant";

Vue.use(Sticky);
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      showScreening: false, //是否显示筛选
      classConditions: null, //分类数据条件
      classifylistData: null, //分类数据列表
      stylesActive: -1, //漫画类型选项高亮
      areasActive: -1, //漫画国际选项高亮
      statusActive: -1, //漫画连载选项高亮
      pricesActive: -1, //漫画付费选项高亮
      ordersActive: 0, //漫画时间人气选项高亮
      stylesid: null,
      areasid: null,
      statusid: null,
      pricesId: null,
      ordersId: null,
      pageNum: 1, //分类页面请求的页数
      timer: null, //定时器
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 漫画类型分类
    stylesClick(index) {
      this.stylesActive = index;
      this.classifylistData = null;
      this.pageNum = 1;
      if (index != -1) {
        this.stylesid = this.classConditions.styles[index].id;
      }
      this.getClassifyResultsFun();
    },
    //漫画国际分类
    areasClick(index) {
      this.areasActive = index;
      this.classifylistData = null;
      this.pageNum = 1;
      if (index != -1) {
        this.areasid = this.classConditions.areas[index].id;
      }
      this.getClassifyResultsFun();
    },
    // 漫画连载分类
    statusClick(index) {
      this.statusActive = index;
      this.classifylistData = null;
      this.pageNum = 1;
      if (index != -1) {
        this.statusid = this.classConditions.status[index].id;
      }
      this.getClassifyResultsFun();
    },
    // 漫画付费分类
    pricesClick(index) {
      this.pricesActive = index;
      this.classifylistData = null;
      this.pageNum = 1;
      if (index != -1) {
        this.pricesId = this.classConditions.prices[index].id;
      }
      this.getClassifyResultsFun();
    },
    // 漫画时间人气分类
    ordersClick(index) {
      this.ordersActive = index;
      this.classifylistData = null;
      this.pageNum = 1;
      this.ordersId = this.classConditions.orders[index].id;
      this.getClassifyResultsFun();
    },
    // 分类的筛选条件
    getClassifyConditionsFun() {
      getClassifyConditions().then((data) => {
        console.log("分类的筛选条件", data);
        this.classConditions = data.data;
      });
    },
    // 分类筛选结果列表
    getClassifyResultsFun() {
      getClassifyResults({
        styleId: this.stylesActive == -1 ? -1 : this.stylesid,
        areaId: this.areasActive == -1 ? -1 : this.areasid,
        isFinish: this.statusActive == -1 ? -1 : this.statusid,
        isFree: this.pricesActive == -1 ? -1 : this.pricesId,
        order: this.ordersId,
        pageNum: this.pageNum,
        pageSize: 12,
      }).then((data) => {
        if (this.classifylistData && this.pageNum != 1) {
          this.classifylistData = [...this.classifylistData, ...data.data];
          console.log("分类筛选结果列表", data.data);
          return;
        }
        this.classifylistData = data.data;
        console.log("分类筛选结果列表", this.classifylistData);
      });
    },
    // 滚动事件触底
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
            this.getClassifyResultsFun();
          }, 1000);
        }
      }
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getClassifyConditionsFun();
    this.getClassifyResultsFun();
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
<style lang="less" scoped>
.classification {
  width: 100%;
  height: calc(100vh - 50px);
  overflow: hidden;
  overflow-y: scroll;
  .classification-header {
    width: 100%;
    height: 39px;
    line-height: 39px;
    display: flex;
    padding: 0 23px;
    margin-bottom: 10px;
    background-color: #ffffff;
    // span {
    //   font-size: 20px;
    // }
    h4 {
      flex: 1;
      font-size: 19px;
      text-align: center;
    }
  }
  .classification-line {
    width: 100%;
    border: 1px solid #f5f5f5;
    background-color: #f5f5f5;
  }
  .classification-nav {
    width: 100%;
    padding: 0 16px;
    .nav-type {
      display: flex;
      flex-wrap: wrap;
      li {
        margin-right: 18px;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        color: #45495d;
      }
      .active {
        color: #1198f3;
      }
    }
    .other-options {
      width: 100%;
      .nav-item {
        display: flex;
        flex-wrap: wrap;
        li {
          margin-right: 18px;
          height: 30px;
          line-height: 30px;
          font-size: 14px;
          color: #45495d;

          &:last-child {
            margin-right: 0;
          }
        }
        .active {
          color: #1198f3;
        }
      }
    }
    .nav-footer {
      width: 100%;
      display: flex;
      justify-content: space-between;
      .nav-item {
        display: flex;
        flex-wrap: wrap;
        li {
          margin-right: 18px;
          height: 30px;
          line-height: 30px;
          font-size: 14px;
          color: #45495d;

          // &:first-child {
          //   color: #1198f3;
          // }
          &:last-child {
            margin-right: 0;
          }
        }
        .active {
          color: #1198f3;
        }
      }
      .screening {
        height: 30px;
        line-height: 30px;
        display: flex;
        span {
          font-size: 12px;
        }
      }
    }
  }
  .classify-content {
    width: 100%;
    padding: 0 17px;
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
    .classify-lists {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .classify-item {
        width: 30.5%;
        margin-bottom: 20px;
        .img {
          width: 100%;
          img {
            width: 100%;
          }
        }
        h4 {
          width: 100%;
          font-size: 14px;
          color: #151618;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        p {
          width: 100%;
          font-size: 12px;
          color: #a0a3aa;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>