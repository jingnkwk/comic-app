<!-- details 详情 -->
<template>
  <div class="details">
    <div class="details-top">
      <!-- 详情头部 开始 -->
      <div class="details-header">
        <div class="left" @click="goBack">
          <span class="iconfont icon-jiantouzuo"></span>
        </div>
        <div class="right" @click="showShare = true">
          <span class="iconfont icon-fenxiang"></span>
        </div>
      </div>
      <!-- 详情头部 结束 -->
      <!-- 详情内容 开始 -->
      <div class="details-content" v-if="comicDetailData">
        <!-- 开始图片 -->
        <div class="details-img">
          <img :src="`${comicDetailData.horizontal_cover}@400w.jpg`" alt="" />
          <div :class="['collection', { active: cState }]" @click="collection">
            <span class="iconfont icon-shoucangxiao"></span>
            <p v-show="!cState">收藏</p>
          </div>
        </div>

        <!-- 漫画信息 -->
        <div class="comic-information">
          <div class="comic-title">
            <h3>{{ comicDetailData.title }}</h3>
          </div>
          <div class="reading-amount">
            <div class="reading">
              阅读指数<span>{{ watch | playCountNum }}</span>
            </div>
          </div>
          <div class="updata">
            <p>{{ comicDetailData.renewal_time }}</p>
          </div>
          <div class="creation">
            <div class="left">
              <span>{{ comicDetailData.author_name[0] }}</span>
              |
              <span v-if="comicDetailData.total"
                >已更新至{{ comicDetailData.total }}话</span
              >
            </div>
            <div class="right" @click="showIntroduction = !showIntroduction">
              <p>查看简介<span class="iconfont icon-jiantouxia"></span></p>
            </div>
          </div>
          <div class="comic-Introduction" v-show="showIntroduction">
            <p>
              作者：<span
                v-for="(item, index) in comicDetailData.author_name"
                :key="index"
                >{{ item }}</span
              >
            </p>
            <p>简介：{{ comicDetailData.evaluate }}</p>
          </div>
          <div class="introduce"></div>
        </div>

        <!-- 互相点赞、推荐 -->
        <div class="praise-recommend">
          <van-tabs v-model="active" scrollspy sticky class="lists">
            <van-tab title="互动点赞">
              <div class="praise">
                <div class="praise-header" v-if="short_reviews">
                  <div class="title">漫画评论</div>
                  <div class="check" @click="showReview = true">
                    查看全部<span class="iconfont icon-jiantouyou"></span>
                  </div>
                </div>
                <div
                  class="ul"
                  v-for="item in short_reviews"
                  :key="item.uid"
                  @click="showReview = true"
                >
                  <div class="user-name">
                    <div class="img" @click.stop="jumpUserInfo(item.uid)">
                      <img :src="item.face" alt="" />
                    </div>
                    <p>{{ item.nick_name }}</p>
                    <van-rate
                      v-model="score"
                      :size="12"
                      color="#ffd21e"
                      void-icon="star"
                      void-color="#eee"
                      allow-half
                      readonly
                    />
                  </div>
                  <p class="user-praise">
                    {{ item.content }}
                  </p>
                  <div class="user-good">
                    <span class="iconfont icon-dianzan"></span>
                    {{ item.like_count }}
                  </div>
                </div>

                <div class="praise-footer" @click="showDiscuss = true">
                  <div class="left">漫画讨论专区</div>
                  <div class="right">
                    <p>{{ all_count }}条评论等你来看</p>
                    <span class="iconfont icon-jiantouyou"></span>
                  </div>
                </div>
              </div>
            </van-tab>
            <van-tab title="推荐">
              <div class="recommend">
                <div class="recommend-header">
                  <h3>更多推荐</h3>
                  <div class="check">
                    <span class="iconfont icon-shuaxin"></span>
                    <p>换一换</p>
                  </div>
                </div>
                <div class="recommend-content">
                  <ul v-if="moreRecommend">
                    <li
                      @click="jumpNewDetails(item.id)"
                      class="today-hot-item"
                      v-for="item in moreRecommend"
                      :key="item.id"
                    >
                      <div class="img">
                        <img :src="`${item.vertical_cover}@200w.jpg`" alt="" />
                      </div>
                      <h4>{{ item.title }}</h4>
                      <p>更新至{{ item.total }}话</p>
                    </li>
                  </ul>
                </div>
              </div>
            </van-tab>
          </van-tabs>
        </div>
      </div>
      <!-- 详情内容 开始 -->
    </div>
    <!-- 详情底部 开始 -->
    <div class="details-botton" v-if="comicDetailData">
      <div class="left" @click="showPopup = true">
        <span class="iconfont icon-mulu"></span>
        目录
      </div>
      <ul class="center">
        <router-link
          tag="li"
          :to="`/comicPage?id=${item.id}`"
          v-for="item in ep_list"
          :key="item.id"
        >
          {{ item.short_title }}
        </router-link>
      </ul>
      <router-link
        tag="div"
        :to="`/comicPage?id=${ep_list[0].id}`"
        class="right"
      >
        开始阅读
      </router-link>
    </div>
    <!-- 详情底部 结束 -->
    <!-- 目录弹出层 开始 -->
    <van-popup v-model="showPopup" position="bottom" :style="{ height: '80%' }">
      <div class="directory">
        <div class="directory-header" v-if="comicDetailData">
          <h3>全部章节({{ comicDetailData.ep_list.length }})</h3>
          <div class="model" @click="switchLists = !switchLists">
            <span class="iconfont icon-fenlei"></span>
            <p v-show="!switchLists">列表模式</p>
            <p v-show="switchLists">缩略模式</p>
          </div>
        </div>

        <ul class="chapter">
          <router-link
            tag="li"
            :to="`/comicPage?id=${item.id}`"
            class="chapter-list"
            v-for="item in ep_list"
            :key="item.id"
            v-show="!switchLists"
          >
            <div class="img">
              <img :src="`${item.cover}@200w.jpg`" alt="" />
            </div>
            <div class="chapter-name">
              <div class="top">
                <span>{{ item.short_title }}</span>
                <h4>{{ item.title }}</h4>
              </div>
              <div class="bottom">
                <div class="update">{{ item.pub_time.substring(6, 10) }}</div>
                <div class="comments">
                  <span class="iconfont icon-fankui"></span>
                  {{ item.comments }}
                </div>
                <div class="like">
                  <span class="iconfont icon-dianzan_kuai"></span>
                  {{ item.like_count }}
                </div>
              </div>
            </div>
          </router-link>
        </ul>

        <ul class="suo-list" v-show="switchLists">
          <router-link
            tag="li"
            :to="`/comicPage?id=${item.id}`"
            class="item"
            v-for="item in ep_list"
            :key="item.id"
          >
            {{ item.short_title }}
          </router-link>
        </ul>
      </div>
    </van-popup>
    <!-- 目录弹出层 结束 -->

    <!-- 详情分享 开始 -->
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
    />
    <!-- 详情分享 结束 -->

    <!-- 漫画点评列表 开始 -->
    <van-popup
      v-model="showReview"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <review
        :short_reviews_data="short_reviews_data"
        :comicId="comicId"
        @changeState="changeState"
      ></review>
    </van-popup>
    <!-- 漫画点评列表 结束 -->

    <!-- 漫画讨论专区 开始 -->
    <van-popup
      v-model="showDiscuss"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <discuss :comicId="comicId" @DiscussState="DiscussState"></discuss>
    </van-popup>
    <!-- 漫画讨论专区 结束 -->
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Review from "@/components/Review";
import Discuss from "@/components/Discuss";
import {
  getComicDetail,
  getMoreRecommend,
  getGetReviewDetailByComicID,
  getReplyMain,
} from "@/api/details";
import Vue from "vue";

import { Tab, Tabs, Popup, ShareSheet, Toast, Rate } from "vant";
Vue.use(Popup).use(Tab).use(Tabs).use(ShareSheet).use(Toast).use(Rate);
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "Details",
  components: {
    Review,
    Discuss,
  },
  data() {
    //这里存放数据
    return {
      showDiscuss: false, //讨论显示与隐藏
      showReview: false, //漫画点评列表显示与隐藏
      switchLists: false, //列表模式和缩略模式切换
      watch: null, //阅读量
      score: 10, //用户的评分
      active: 0,
      comicDetailData: null, //漫画详情数据
      moreRecommend: null, //更多推荐漫画
      showIntroduction: false, //显示与隐藏简介
      showPopup: false, //显示与隐藏目录弹出层
      showShare: false, //分享显示与隐藏
      comicId: this.$route.query.id, //漫画id
      short_reviews: null, //漫画点评
      short_reviews_data: null, //漫画点评
      all_count: null, //讨论数量
      cState: false, //收藏状态
      options: [
        [
          { name: "微信", icon: "wechat" },
          { name: "朋友圈", icon: "wechat-moments" },
          { name: "微博", icon: "weibo" },
          { name: "QQ", icon: "qq" },
        ],
        [
          { name: "复制链接", icon: "link" },
          { name: "分享海报", icon: "poster" },
          { name: "二维码", icon: "qrcode" },
          { name: "小程序码", icon: "weapp-qrcode" },
        ],
      ],
    };
  },
  //监听属性 类似于data概念
  computed: {
    // 漫画详情章节列表 正序
    ep_list() {
      if (this.comicDetailData) {
        return this.comicDetailData.ep_list.reverse();
      }
    },
  },
  //方法集合
  methods: {
    collection() {
      this.cState = !this.cState;
      if (this.cState) {
        Toast("成功收藏");
        let enshrineObje = {
          cState: this.cState,
          comicDetailData: this.comicDetailData,
        };
        if (window.localStorage.getItem("enshrineData")) {
          let arr = JSON.parse(window.localStorage.getItem("enshrineData"));
          arr.push(enshrineObje);
          window.localStorage.setItem("enshrineData", JSON.stringify(arr));
        } else {
          window.localStorage.setItem(
            "enshrineData",
            JSON.stringify([enshrineObje])
          );
        }
      } else {
        Toast("取消收藏");
        let arr2 = JSON.parse(window.localStorage.getItem("enshrineData"));
        let index = arr2.findIndex((item) => {
          return item.comicDetailData.id == this.comicId;
        });
        arr2.splice(index, 1);
        window.localStorage.setItem("enshrineData", JSON.stringify(arr2));
      }
    },
    // 跳转至用户页面
    jumpUserInfo(id) {
      console.log("11111");
      this.$router.push({
        path: "/taUser",
        query: {
          uid: id,
        },
      });
    },
    // 关闭讨论
    DiscussState() {
      this.showDiscuss = false;
    },
    // 关闭漫画点评页面
    changeState() {
      this.showReview = false;
    },
    //漫画讨论专区数据
    getReplyMainFun() {
      getReplyMain({
        oid: this.comicId,
      }).then((data) => {
        // console.log("漫画讨论专区数据", data);
        this.all_count = data.data.cursor.all_count;
      });
    },
    //精选漫画点评
    getGetReviewDetailByComicIDFun() {
      getGetReviewDetailByComicID({
        comicId: this.comicId,
      }).then((data) => {
        console.log("精选漫画点评", data);
        if (data.data.short_reviews.length) {
          this.short_reviews = data.data.short_reviews;
        }
        // console.log('this.short_reviews====================>',this.short_reviews);
        this.score = data.data.score / 2;
        this.watch = data.data.watch;
        this.short_reviews_data = data.data;
        // console.log("short_reviews_data", this.short_reviews_data);
      });
    },
    // 跳转至新的详情页面
    jumpNewDetails(id) {
      console.log(id);
      this.comicId = id;
      this.getComicDetailFun();
      this.getMoreRecommendFun();
    },
    //漫画详情章节列表
    getComicDetailFun() {
      getComicDetail({
        comicId: this.comicId,
      }).then((data) => {
        console.log(data);
        this.comicDetailData = data.data;
        console.log("漫画详情章节列表", this.comicDetailData);
        this.$store.commit("COMICLIST", this.comicDetailData);
      });
    },
    //详情页面更多漫画推荐
    getMoreRecommendFun() {
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      getMoreRecommend({
        comicId: this.comicId,
      }).then((data) => {
        // console.log("更多漫画推荐", data);
        this.moreRecommend = data.data.recommend_comics.slice(0, 6);
        Toast.clear();
      });
    },
    // 返回上一级
    goBack() {
      this.$router.go(-1);
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getGetReviewDetailByComicIDFun();
    this.getReplyMainFun();
    // 确认该漫画是否已经收藏
    if (window.localStorage.getItem("enshrineData")) {
      let arr = JSON.parse(window.localStorage.getItem("enshrineData"));
      let index = arr.findIndex((item) => {
        return item.comicDetailData.id == this.$route.query.id;
      });
      // console.log("下标=======================", index);
      if (index != -1) {
        this.cState = arr[index].cState;
      }
    }
  },
  beforeUpdate() {
    // 确认该漫画是否已经收藏
    if (window.localStorage.getItem("enshrineData")) {
      let arr = JSON.parse(window.localStorage.getItem("enshrineData"));
      let index = arr.findIndex((item) => {
        return item.comicDetailData.id == this.$route.query.id;
      });
      // console.log("下标=======================", index);
      if (index != -1) {
        this.cState = arr[index].cState;
      }
    }
  },
  //监控data中的数据变化
  watch: {
    comicId: {
      immediate: true,
      handler() {
        this.getComicDetailFun();
        this.getMoreRecommendFun();
      },
    },
  },
  filters: {
    playCountNum(value) {
      // console.log(value);
      if (value < 10000) {
        return value;
      }
      let w = value > 10000 ? value / 10000 : value; //数以万计
      let y = w > 10000 ? parseInt(w / 10000) + "亿" : parseInt(w) + "万";
      return y;
    },
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less">
.details {
  width: 100%;
  height: 100vh;
  z-index: 100;
  position: relative;
  background-color: #fff;

  .details-top {
    width: 100%;
    height: calc(100vh - 66px);
    overflow-y: scroll;
    .details-header {
      width: 100%;
      height: 46px;
      line-height: 46px;
      display: flex;
      justify-content: space-between;
      padding: 0 18px;
      background-color: rgba(255, 255, 255, 0.1);
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1;
      .left {
        span {
          font-size: 23px;
          color: #000000;
        }
      }
      .right {
        span {
          font-size: 23px;
          color: #000000;
        }
      }
    }
    .details-content {
      width: 100%;
      .details-img {
        width: 100%;
        height: 210px;
        position: relative;
        // z-index: -1;
        img {
          width: 100%;
          height: 210px;
        }
        .collection {
          width: 92px;
          height: 45px;
          position: absolute;
          bottom: -9px;
          right: 17px;
          background-color: #fe9d10;
          border-radius: 16px 0 16px 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          transition: width 0.6s, background-color 0.6s;
          span {
            font-size: 23px;
            color: #fff;
            margin-right: 5px;
          }
        }
        .active {
          width: 50px;
          height: 45px;
          background-color: #656977;
        }
      }
      .comic-information {
        width: 100%;
        margin-top: 11px;
        padding: 0 17px;
        margin-bottom: 18px;
        .comic-title {
          width: 100%;
          height: 32px;
          h3 {
            font-size: 20px;
            color: #000000;
            line-height: 32px;
          }
        }
        .reading-amount {
          width: 100%;
          height: 32px;
          display: flex;
          align-items: center;
          .reading {
            width: max-content;
            height: 23px;
            font-size: 12px;
            color: #90929b;
            line-height: 23px;
            background-color: #f4f5f7;
            padding: 0 8px;
            span {
              color: #4b4c4e;
              margin-left: 4px;
            }
          }
        }
        .updata {
          width: 100%;
          height: 26px;
          line-height: 26px;
          p {
            color: #000000;
            font-size: 12px;
            font-weight: bolder;
          }
        }
        .creation {
          display: flex;
          justify-content: space-between;
          width: 100%;
          height: 21px;
          font-size: 12px;
          .left {
            color: #aaacb1;
          }
          .right {
            color: #aaacb1;
            span {
              font-size: 12px;
            }
          }
        }
        .comic-Introduction {
          width: 100%;
          p {
            margin-top: 12px;
            word-wrap: break-word;
            color: #80848e;
            font-size: 12px;
          }
        }
      }
      .praise-recommend {
        width: 100%;
        .lists {
          .van-tabs__wrap {
            border-bottom: 2px solid #f4f4f4;
            .van-tabs__nav {
              .van-tabs__active {
                font-weight: bolder;
              }
              .van-tabs__line {
                background-color: #2f2f31;
                width: 18px;
              }
            }
          }
        }
        .praise {
          padding: 0 17px;
          .praise-header {
            width: 100%;
            margin-top: 15px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .title {
              font-size: 16px;
              color: #1d1e1f;
            }
            .check {
              color: #82858e;
              font-size: 12px;
              span {
                font-size: 12px;
                color: #82858e;
              }
            }
          }
          .ul {
            .user-name {
              width: 100%;
              height: 49px;
              display: flex;
              align-items: center;
              .img {
                width: 37px;
                height: 37px;
                border-radius: 50%;
                overflow: hidden;
                margin-right: 10px;
                img {
                  width: 37px;
                  height: 37px;
                }
              }
              p {
                font-size: 14px;
                color: #787b8a;
                margin-right: 5px;
              }
            }
            .user-praise {
              width: 100%;
              word-wrap: break-word;
              // word-break: break-all;
            }
            .user-good {
              width: 100%;
              height: 29px;
              color: #989aa0;
              line-height: 29px;
              span {
                font-size: 16px;
              }
            }
          }
          .praise-footer {
            width: 100%;
            height: 56px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: #f5f6f8;
            padding: 0 17px;
            margin-top: 22px;
            .left {
              color: #17181a;
              font-size: 16px;
            }
            .right {
              display: flex;
              font-size: 12px;
              color: #7b7c88;
              span {
                font-size: 12px;
                color: #7b7c88;
              }
            }
          }
        }
        .recommend {
          width: 100%;
          margin-top: 34px;
          .recommend-header {
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
                margin-right: 5px;
              }
            }
          }
          .recommend-content {
            width: 100%;
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
          // .recommend-footer {
          //   width: 100%;
          //   height: 60px;
          //   display: flex;
          //   align-items: center;
          //   justify-content: center;
          //   .button {
          //     width: 223px;
          //     height: 37px;
          //     text-align: center;
          //     line-height: 37px;
          //     border-radius: 17px;
          //     background-color: #f1f1f3;
          //     color: #262729;
          //     font-size: 16px;
          //   }
          // }
        }
      }
    }
  }
  .details-botton {
    width: 100%;
    height: 66px;
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    .left {
      width: 52px;
      height: 66px;
      box-shadow: 5px -8px 13px 0px #eee;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #656977;
      font-size: 12px;
      span {
        color: #656977;
        font-size: 24px;
      }
    }
    .center {
      flex: 1;
      display: flex;
      align-items: center;
      overflow-x: scroll;
      li {
        width: 66px;
        height: 37px;
        flex-shrink: 0;
        background-color: #f5f6f8;
        text-align: center;
        line-height: 37px;
        font-size: 12px;
        color: #5e6270;
        margin-right: 7px;
        border-radius: 2px;
        &:first-child {
          margin-left: 10px;
        }
      }
    }
    .right {
      width: 105px;
      height: 66px;
      line-height: 66px;
      background-color: #32aaff;
      color: #fff;
      text-align: center;
      font-size: 14px;
    }
  }
  .directory {
    width: 100%;
    height: 80vh;
    overflow: hidden;
    overflow-y: scroll;
    position: relative;
    .directory-header {
      width: 100%;
      height: 45px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 17px;
      position: fixed;
      top: 19vh;
      left: 0;
      background-color: #fff;
      h3 {
        font-size: 16px;
        color: #010203;
      }
      .model {
        display: flex;
        align-items: center;
        span {
          font-size: 16px;
          color: #0091fc;
          margin-right: 5px;
        }
        p {
          font-size: 12px;
          color: #6b6f7a;
        }
      }
    }
    .chapter {
      width: 100%;
      margin-top: 45px;
      margin-top: 45px;
      margin-top: 45px;
      .chapter-list {
        width: 100%;
        height: 78px;
        display: flex;
        align-items: center;
        padding: 0 17px;
        .img {
          width: 119px;
          height: 69px;
          overflow: hidden;
          border-radius: 5px;
          margin-right: 12px;
          img {
            width: 119px;
            height: 69px;
          }
        }
        .chapter-name {
          height: 69px;
          width: 162px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .top {
            display: flex;
            align-items: center;
            span {
              color: #000000;
              font-size: 14px;
              margin-right: 9px;
              font-weight: bolder;
            }
            h4 {
              color: #000000;
              font-size: 16px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
          .bottom {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .update {
              color: #7f828c;
              font-size: 12px;
            }
            .comments {
              color: #7f828c;
              font-size: 12px;
              span {
                font-size: 12px;
                color: #7f828c;
              }
            }
            .like {
              color: #7f828c;
              font-size: 12px;
              span {
                font-size: 12px;
                color: #7f828c;
              }
            }
          }
        }
      }
    }
    .suo-list {
      width: 100%;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      padding: 0 8px;
      .item {
        width: 66px;
        height: 37px;
        //   flex-shrink: 0;
        background-color: #f5f6f8;
        text-align: center;
        line-height: 37px;
        font-size: 12px;
        color: #5e6270;
        margin-right: 7px;
        border-radius: 2px;
        margin-top: 7px;
        &:nth-child(5n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>