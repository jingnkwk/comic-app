<!-- Search 搜索页面 -->
<template>
  <div class="search">
    <!-- 输入框 开始 -->
    <div class="search-input">
      <van-search
        class="input"
        v-model="value"
        shape="round"
        placeholder="充值福利小岛"
        @input="searchInput"
        @search="search"
      />
      <router-link tag="div" to="/home/HotCartoon" class="cancel"
        >取消</router-link
      >
    </div>
    <!-- 输入框 结束 -->
    <div class="search-line"></div>
    <!-- 热门搜索 开始 -->
    <div class="hot-search" v-show="isShowsearchRecommend">
      <!-- 搜索历史 -->
      <div class="search-history" v-show="searchHistory.length">
        <div class="history">
          <div class="left">搜索记录</div>
          <span class="iconfont icon-shanchu" @click="clearHistory"></span>
        </div>
        <ul>
          <li
            v-for="(item, index) in searchHistory"
            :key="index"
            @click="recordSearch(item)"
          >
            {{ item }}
          </li>
          <!-- <li>就是建设</li>
          <li>人们就是建设</li>
          <li>是建设</li>
          <li>人们就是建设</li> -->
        </ul>
      </div>
      <div class="hot-search-header">热门搜索</div>
      <ul class="hot-search-lists" v-if="searchRecommendData">
        <router-link
          tag="li"
          :to="`/Details?id=${item.season_id}`"
          class="hot-search-item"
          v-for="(item, index) in searchRecommendData.slice(3, 9)"
          :key="item.season_id"
        >
          <div class="ranking">{{ index + 1 }}</div>
          <div class="img">
            <img :src="`${item.vertical_cover}`" alt="" />
          </div>
          <div class="comic-name">
            <p>{{ item.title }}</p>
            <span v-if="item.styles">{{ item.styles[0] }}</span>
          </div>
        </router-link>
      </ul>
      <!-- 广告 开始 -->
      <!-- <div class="advertising-img">
        <img src="../assets/img/01.jpg" alt="" />
      </div> -->
      <!-- 广告 结束 -->
    </div>
    <!-- 热门搜索 结束 -->

    <!-- 搜索建议 开始 -->
    <div class="search-advice" v-show="isAdvice">
      <ul>
        <li
          v-for="(item, index) in searchAdviceData"
          :key="index"
          @click="quickSearch(index)"
        >
          <div class="advice">
            <span class="iconfont icon-sousuo_o"></span>
            <p v-html="item"></p>
          </div>
          <div class="line"></div>
        </li>
      </ul>
    </div>
    <!-- 搜索建议 结束 -->

    <!-- 搜索内容 开始 -->
    <div class="search-content" v-show="isShowContent" @scroll="onScroll">
      <div class="top-nav">
        <van-dropdown-menu active-color="#0392f3">
          <van-dropdown-item
            v-model="value1"
            :options="option1"
            @change="changeType1"
          />
          <van-dropdown-item
            v-model="value2"
            :options="option2"
            @change="changeType2"
          />
        </van-dropdown-menu>
      </div>
      <!-- 加载 -->
      <div class="loading" v-if="!SearchContentData">
        <img src="../assets/img/loading.jpg" alt="" />
        <h3>快点，快点</h3>
      </div>
      <div class="search-comic">
        <ul>
          <router-link
            tag="li"
            :to="`/Details?id=${item.id}`"
            v-for="item in SearchContentData"
            :key="item.id"
          >
            <div class="left">
              <img :src="`${item.vertical_cover}@200w.jpg`" alt="" />
            </div>
            <div class="right">
              <div class="title" v-html="item.title"></div>
              <div class="info">
                <div class="top">
                  <p
                    v-for="(val1, index) in item.author_name"
                    :key="index"
                    v-html="val1"
                  ></p>
                </div>
                <div class="botton">
                  <p
                    v-for="(val2, index) in item.styles"
                    :key="index"
                    v-html="val2"
                  ></p>
                </div>
                <p>连载中</p>
              </div>
            </div>
          </router-link>
        </ul>
      </div>
    </div>
    <!-- 搜索内容 结束 -->
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { getSearchRecommend, getAdvice, getSearchContent } from "@/api/search";
import Vue from "vue";
import { Search, DropdownMenu, DropdownItem, Toast } from "vant";

Vue.use(DropdownMenu).use(DropdownItem).use(Search).use(Toast);
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      value: "", //输入数据
      searchRecommendData: null, //热门搜索数据
      isShowsearchRecommend: true, //热门搜索的显示、隐藏
      isAdvice: false, //搜索建议显示、隐藏
      isShowContent: false, //搜索出内容显示、隐藏
      searchAdviceData: null, //搜索建议数据
      SearchContentData: null, //搜索漫画内容
      pageNum: 1, //搜索页面页数
      timer: null, //定时器
      searchHistory: [], //历史数据
      value1: -1,
      value2: -1,
      option1: [
        { text: "全部", value: -1 },
        { text: "大陆", value: 1 },
        { text: "日本", value: 2 },
        { text: "韩国", value: 6 },
        { text: "其他", value: 5 },
      ],
      option2: [
        { text: "默认排序", value: -1 },
        { text: "人气推荐", value: 0 },
        { text: "更新时间", value: 1 },
        { text: "追漫人数", value: 2 },
        { text: "上架时间", value: 3 },
      ],
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 使用搜索记录
    recordSearch(item) {
      this.value = item;
      this.pageNum = 1;
      this.isShowsearchRecommend = false;
      this.isShowContent = true;
      this.SearchContentData = null;
      this.getSearchContentFun();
    },
    // 清除搜索历史
    clearHistory() {
      this.searchHistory = [];
      window.localStorage.clear();
    },
    // 使用搜索建议
    quickSearch(index) {
      let reg = /[\u4e00-\u9fa5]/g;
      this.searchAdviceData[index].match(reg);
      let num = this.searchAdviceData[index].match(reg);
      this.value = num.join("");
      this.isAdvice = false;
      this.pageNum = 1;
      this.isShowContent = true;
      this.SearchContentData = null;
      // this.searchHistory.push(this.value);
      if (this.searchHistory.indexOf(this.value) == -1) {
        if (this.searchHistory.length == 10) {
          this.searchHistory.shift();
          this.searchHistory.push(this.value);
        } else {
          this.searchHistory.push(this.value);
        }
        window.localStorage.setItem(
          "searchHistory",
          JSON.stringify(this.searchHistory)
        ); //将搜索内容存储
      }

      this.getSearchContentFun();
    },
    //筛选国家
    changeType1() {
      // console.log("1111", this.value1);
      this.pageNum = 1;
      this.SearchContentData = null;
      this.getSearchContentFun();
    },
    //筛选默认排序、人气推荐....
    changeType2() {
      // console.log("1111", this.value2);
      this.pageNum = 1;
      this.SearchContentData = null;
      this.getSearchContentFun();
    },
    // 搜索漫画
    search() {
      this.isAdvice = false;
      this.isShowContent = true;
      this.pageNum = 1;
      this.SearchContentData = null;
      console.log("何大佬的精准判断", this.searchHistory.indexOf(this.value));
      if (this.searchHistory.indexOf(this.value) == -1) {
        if (this.searchHistory.length == 10) {
          this.searchHistory.shift();
          this.searchHistory.push(this.value);
        } else {
          this.searchHistory.push(this.value);
        }
        window.localStorage.setItem(
          "searchHistory",
          JSON.stringify(this.searchHistory)
        ); //将搜索内容存储
      }

      this.getSearchContentFun();
    },
    // 搜索漫画内容
    getSearchContentFun() {
      getSearchContent({
        keyWord: this.value,
        styleId: -1,
        areaId: this.value1,
        isFinish: -1,
        order: this.value2,
        isFree: -1,
        pageNum: this.pageNum,
        pageSize: 20,
      }).then((data) => {
        // console.log("搜索漫画内容", data);
        if (this.SearchContentData && this.pageNum != 1) {
          Toast.loading({
            message: "加载中...",
            forbidClick: true,
            duration: 1000,
          });
          this.SearchContentData = [
            ...this.SearchContentData,
            ...data.data.list,
          ];
          console.log("型数据", data.data.list);
          return;
        }
        this.SearchContentData = data.data.list;
        console.log(this.SearchContentData);
      });
    },
    // 搜索建议数据
    getAdviceFun() {
      getAdvice({
        term: this.value,
        num: 20,
      }).then((data) => {
        console.log(data);
        this.searchAdviceData = data.data;
      });
    },
    // 热门搜索数据
    getSearchRecommendFun() {
      getSearchRecommend({
        num: 6,
      }).then((data) => {
        console.log("热门搜索数据", data);
        this.searchRecommendData = data.data;
      });
    },
    // 输入事件
    searchInput() {
      if (this.value === "") {
        this.isShowsearchRecommend = true;
        this.isAdvice = false;
        this.isShowContent = false;
        return;
      }
      this.isShowsearchRecommend = false;
      this.isAdvice = true;
      this.getAdviceFun();
    },
    //搜索页面滚动加载
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
            this.getSearchContentFun();
          }, 2000);
        }
      }
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    if (window.localStorage.getItem("searchHistory")) {
      this.searchHistory = JSON.parse(
        window.localStorage.getItem("searchHistory")
      );
    }
    this.getSearchRecommendFun();
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
.search {
  width: 100%;
  height: 100vh;
  background-color: #fff;
  z-index: 100;
  position: relative;
  .search-input {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    .input {
      flex: 1;
      height: 29px;
    }
    .cancel {
      font-size: 15px;
      color: #3c3d3e;
      margin-right: 16px;
    }
  }
  .search-line {
    width: 100%;
    border: 1px solid #f3f3f3;
    background-color: #f3f3f3;
  }
  .hot-search {
    width: 100%;
    padding: 13px 15px 0 15px;
    .search-history {
      width: 100%;
      .history {
        width: 100%;
        height: 27px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left {
          font-size: 14px;
          color: #81858f;
        }
        span {
          font-size: 16px;
        }
      }
      ul {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        li {
          width: max-content;
          height: 30px;
          background-color: #f1f1f3;
          color: #17181a;
          margin-left: 9px;
          line-height: 30px;
          border-radius: 6px;
          padding: 0 11px;
          margin-bottom: 7px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    .hot-search-header {
      width: 100%;
      height: 25px;
      color: #9b9ea6;
      line-height: 25px;
    }

    .hot-search-lists {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      .hot-search-item {
        width: 50%;
        height: 60px;
        display: flex;
        align-items: center;
        .ranking {
          font-size: 20px;
          margin-right: 11px;
        }
        .img {
          width: 36px;
          height: 47px;
          margin-right: 8px;
          img {
            width: 36px;
          }
        }
        .comic-name {
          p {
            width: 100px;
            font-size: 15px;
            color: #000000;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 12px;
          }
          span {
            font-size: 12px;
            color: #8a8c95;
          }
        }
      }
    }
    .advertising-img {
      width: 100%;
      border-radius: 4px;
      overflow: hidden;
      margin-top: 14px;
      img {
        width: 100%;
      }
    }
  }
  .search-advice {
    width: 100%;
    height: calc(100vh - 62px);
    overflow-y: scroll;
    padding: 0 6px;
    ul {
      li {
        width: 100%;
        height: 49px;
        .advice {
          width: 100%;
          height: 49px;
          display: flex;
          align-items: center;
          padding: 0 18px;
          span {
            font-size: 24px;
            margin-right: 18px;
            color: #b1b2b8;
          }
          p {
            font-size: 16px;
            color: #2e2f30;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            em.keyword {
              color: #189cf3;
            }
          }
        }
        .line {
          width: 100%;
          background-color: #f5f5f5;
          border: 1px solid #f5f5f5;
        }
      }
    }
  }
  .search-content {
    width: 100%;
    height: calc(100vh - 62px);
    overflow-y: scroll;
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
    .top-nav {
      width: 100%;
      height: 57px;
    }
    .search-comic {
      width: 100%;
      padding: 0 17px;
      ul {
        width: 100%;
        li {
          width: 100%;
          height: 121px;
          display: flex;
          align-items: center;
          .left {
            width: 80px;
            height: 106px;
            margin-right: 17px;
            img {
              width: 80px;
              height: 106px;
            }
          }
          .right {
            height: 106px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .title {
              font-size: 16px;
              font-weight: bolder;
              color: #0e0f10;
              .keyword {
                color: #189cf3;
              }
            }
            .info {
              color: #898c95;
              font-size: 12px;
              .top {
                display: flex;
                p {
                  margin-right: 5px;
                  .keyword {
                    color: #189cf3;
                  }
                }
              }
              .botton {
                display: flex;
                p {
                  .keyword {
                    color: #189cf3;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>