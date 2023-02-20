<!-- review 点评页面 -->
<template>
  <div class="reviewPage" @scroll="onScroll">
    <!-- 点评页面头部 开始 -->
    <div class="reviewPage-header">
      <div class="top">
        <span class="iconfont icon-guanbi" @click="shutDown"></span>
        <h3>{{ short_reviews_data.title }}</h3>
        <span class="iconfont icon-shuoming"></span>
      </div>

      <div class="bottom">
        <div class="left">7.6</div>
        <div class="center">
          <div class="zongHe">
            综合评分<span class="iconfont icon-shuoming"></span>
          </div>
          <div class="stars">
            <van-rate
              v-model="zhonHeValue"
              :size="25"
              color="#fe9d10"
              void-icon="star"
              void-color="#eee"
              allow-half
              readonly
            />
          </div>
        </div>
        <div class="right" @click="showScorBiao = true">
          <span class="iconfont icon-pinglun1"></span>
          评分
        </div>
      </div>
    </div>
    <!-- 点评页面头部 结束 -->
    <!-- 点评内容 开始 -->
    <div class="comments">
      <van-sticky>
        <div class="comments-header">
          <div class="left">
            <div @click="chooseOne" :class="['item', { active: choose == 0 }]">
              短评
            </div>
            <div @click="chooseTow" :class="['item', { active: choose == 1 }]">
              长评
            </div>
          </div>
          <div class="right">
            <span class="iconfont icon-qiehuanlie"></span>
            <p @click="sortData" v-show="!sortState">按热度</p>
            <p @click="sortData" v-show="sortState">按时间</p>
          </div>
        </div>
      </van-sticky>
      <div class="user-comments">
        <ul>
          <li v-for="item in reviews" :key="item.id">
            <div class="left">
              <img :src="`${item.face}@200w.jpg`" alt="" />
            </div>
            <div class="right">
              <div class="content">
                <h3>{{ item.nick_name }}</h3>
                <van-rate
                  v-model="item.score"
                  :size="12"
                  color="#fe9d10"
                  void-icon="star"
                  void-color="#eee"
                  allow-half
                  readonly
                />
                <span class="time">{{ item.mtime }}</span>
                <p>
                  {{ item.content }}
                </p>
                <div class="zang">
                  <span class="iconfont icon-dianzan"></span>
                  110
                </div>
              </div>
              <div class="icon">
                <span class="iconfont icon-gengduo-shuxiang"></span>
              </div>
            </div>
            <div class="line"></div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 点评内容 结束 -->

    <!-- 点评的评分表 开始 -->
    <van-popup
      v-model="showScorBiao"
      position="right"
      :style="{ width: '100%', height: '100%' }"
    >
      <Published  @changAge="changAge"></Published>
    </van-popup>
    <!-- 点评的评分表 结束 -->
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { getListReviews } from "@/api/details";
import Published from "./Published";
import Vue from "vue";
import { Sticky, Popup, Toast } from "vant";

Vue.use(Sticky).use(Popup).use(Toast);
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "Review",
  props: ["comicId", "short_reviews_data"],
  components: {
    Published,
  },
  data() {
    //这里存放数据
    return {
      value: 0, //星星评分
      choose: 0, //0短评、1长评切换
      showScorBiao: false, //点评的评分表的显示与隐藏
      reviews: null, // 漫画点评列表s数据
      sortState: false, //排序状态
      pageNum: 1, //漫画点评列表s数据页数
    };
  },
  //监听属性 类似于data概念
  computed: {
    //综合星星评分
    zhonHeValue() {
      let score = this.short_reviews_data.score;
      return score / 2;
    },
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 数据排序 时间 热度
    sortData() {
      this.pageNum = 1;
      this.reviews = null;
      this.sortState = !this.sortState;
      this.getListReviewsFun();
    },
    // 长评
    chooseTow() {
      this.choose = 1;
      this.pageNum = 1;
      this.reviews = null;
      this.getListReviewsFun();
    },
    // 短评
    chooseOne() {
      this.choose = 0;
      this.pageNum = 1;
      this.reviews = null;
      this.getListReviewsFun();
    },
    // 漫画点评列表s数据
    getListReviewsFun() {
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      getListReviews({
        comicId: this.comicId,
        pageSize: 15,
        pageNum: this.pageNum,
        type: this.choose,
        sort: this.sortState ? 1 : 0,
      }).then((data) => {
        console.log("漫画点评列表s数据", data);
        if (this.reviews) {
          this.reviews = [...this.reviews, ...data.data.reviews];
          Toast.clear();
          return;
        }
        this.reviews = data.data.reviews;
        Toast.clear();
      });
    },
    changAge() {
      this.showScorBiao = false;
    },
    // 关闭当前页面
    shutDown() {
      console.log("11111");
      this.$emit("changeState");
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
            this.getListReviewsFun();
          }, 1000);
        }
      }
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    console.log(this.$store.state.comicDetailData);
    this.getListReviewsFun();
  },
};
</script>
<style lang="less" scoped>
.reviewPage {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  overflow-y: scroll;
  .reviewPage-header {
    width: 100%;
    height: 147px;
    background-color: #3c3650;
    .top {
      width: 100%;
      height: 43px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 14px;
      span {
        font-size: 20px;
        color: #fff;
      }
      h3 {
        font-size: 20px;
        color: #fff;
      }
    }
    .bottom {
      width: 100%;
      height: 104px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .left {
        color: #fff;
        font-size: 37px;
      }
      .center {
        .zongHe {
          color: #fff;
          font-size: 12px;
          span {
            color: #fff;
            font-size: 12px;
          }
        }
      }
      .right {
        width: 103px;
        height: 44px;
        border-radius: 25px;
        background-color: rgba(255, 255, 255, 0.4);
        text-align: center;
        line-height: 44px;
        color: #fff;
        font-size: 18px;
        span {
          color: #fff;
          font-size: 24px;
        }
      }
    }
  }
  .comments {
    width: 100%;
    .comments-header {
      width: 100%;
      height: 54px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 17px;
      background-color: #fff;
      .left {
        width: 130px;
        display: flex;
        justify-content: space-between;
        .item {
          color: #6b6f7f;
          font-size: 16px;
          &.active {
            color: #1e1f21;
            position: relative;
            font-weight: bolder;
            &::after {
              position: absolute;
              left: 7px;
              bottom: -10px;
              content: "";
              display: inline-block;
              width: 14px;
              height: 4px;
              background-color: #121315;
              border-radius: 3px;
            }
          }
        }
      }
      .right {
        display: flex;
        align-items: center;
        color: #a7a8af;
        font-size: 12px;
        span {
          color: #a7a8af;
          font-size: 12px;
          margin-right: 3px;
        }
      }
    }
    .user-comments {
      width: 100%;
      ul {
        width: 100%;
        li {
          width: 100%;
          display: flex;
          padding: 10px 21px 0px 15px;
          position: relative;
          .left {
            width: 37px;
            height: 37px;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 14px;
            img {
              width: 37px;
              height: 37px;
            }
          }
          .right {
            flex: 1;
            display: flex;
            justify-content: space-between;
            .content {
              h3 {
                color: #505465;
              }
              p {
                margin-top: 11px;
                color: #505465;
                word-wrap: break-word;
                word-break: break-all;
                // white-space: normal;
                font-size: 16px;
              }
              .time {
                font-size: 12px;
                color: #505465;
              }
              .zang {
                font-size: 12px;
                color: #505465;
                span {
                  color: #505465;
                  font-size: 16px;
                }
              }
            }
            .icon {
              width: 20px;
              display: flex;
              align-items: flex-end;
              span {
                font-size: 24px;
              }
            }
          }
          .line {
            position: absolute;
            bottom: 0px;
            left: 64px;
            width: 100%;
            background-color: #f7f7f7;
            border: 1px solid #f7f7f7;
          }
        }
      }
    }
  }
}
</style>