<!-- 他人用户界面 -->
<template>
  <div class="taUser">
    <div class="taUser-header" style="" v-if="userData">
      <!-- <img :src="`${userData.background_uri}`" alt="" /> -->
      <video autoplay loop src="../assets/video/oterUser.mp4"></video>
      <van-sticky>
        <div class="img-icon" @click="goBack">
          <span class="iconfont icon-jiantouzuo"></span>
        </div>
      </van-sticky>
    </div>
    <!-- 用户信息 开始 -->
    <div class="user-content" v-if="userData">
      <div class="user-info">
        <div class="img">
          <img :src="`${userData.avatar}@200w.jpg`" alt="" />
        </div>
        <div class="guangzhu">
          <ul>
            <li>
              <p>关注</p>
              <span>{{ userData.line_follows }}</span>
            </li>
            <li>
              <p>粉丝</p>
              <span>{{ userData.line_fans }}</span>
            </li>
            <li>
              <p>获赞</p>
              <span>{{ userData.like_cnt }}</span>
            </li>
          </ul>
          <div class="button">关注</div>
        </div>
      </div>

      <div class="name-jiesao">
        <div class="user-name">{{ userData.nickname }}</div>
        <div class="user-jiesao">追漫小天才还没有自我介绍哦~</div>
      </div>

      <ul class="user-manghua-she">
        <li @click="choose = 0" :class="['manghua', { active: choose == 0 }]">
          漫画
        </li>
        <li @click="choose = 1" :class="['she', { active: choose == 1 }]">
          绘星社
        </li>
      </ul>
      <!-- 用户漫画 开始 -->
      <div class="user-comic" v-show="choose == 0">
        <ul class="comic-nav">
          <li
            @click="taRecord = 0"
            :class="['ta-review', { active: taRecord == 0 }]"
          >
            Ta的点评
          </li>
          <li
            @click="taRecord = 1"
            :class="['ta-comic', { active: taRecord == 1 }]"
          >
            Ta的追漫
          </li>
        </ul>
        <!-- Ta的点评 开始 -->
        <ul class="review-content" v-if="taRecord == 0 && reviewsUser">
          <li v-for="(item, index) in reviewsUser" :key="index">
            <div class="top">
              <div class="left">
                <div class="score">
                  打分
                  <van-rate
                    v-model="item.score"
                    :size="14"
                    color="#fe9d10"
                    void-icon="star"
                    void-color="#eee"
                    allow-half
                    readonly
                  />
                </div>
                <div class="time">2020.12.27</div>
              </div>
              <div class="right">
                <span class="iconfont icon-gengduo-shuxiang"></span>
              </div>
            </div>
            <div class="comic-name">{{ item.content }}</div>

            <router-link
              tag="div"
              :to="`/Details?id=${item.comic_id}`"
              class="sc-comic"
            >
              <div class="img">
                <img :src="`${item.comic_vcover}`" alt="" />
              </div>
              <div class="font">
                <h3>{{ item.comic_title }}</h3>
                <p></p>
              </div>
              <span class="iconfont icon-jiantouyou"></span>
            </router-link>
            <div class="line"></div>
          </li>
        </ul>
        <!-- Ta的点评 结束 -->
        <!-- Ta的追漫 开始 -->
        <div class="comic-content" v-if="taRecord == 1">
          <div class="classify-content">
            <ul class="classify-lists">
              <router-link
                tag="li"
                :to="`/Details?id=${item.comic_id}`"
                class="classify-item"
                v-for="item in fav_comics"
                :key="item.id"
              >
                <div class="img">
                  <img :src="`${item.vcover}@200w.jpg`" alt="" />
                </div>
                <h4>{{ item.title }}</h4>
                <p>
                  <span v-for="(val, index) in item.styles" :key="index">
                    {{ val }}
                  </span>
                </p>
              </router-link>
            </ul>
          </div>
        </div>
        <!-- Ta的追漫 结束 -->
      </div>
      <!-- 用户漫画 结束 -->
      <!-- 用户的彗星社 开始 -->
      <div class="user-community" v-show="choose == 1">
        <div class="kongkong-img">
          <img
            src="../assets/img/comic_placeholder_userzone_empty.png"
            alt=""
          />
          <span>这里空空的什么也没有T_T</span>
        </div>
      </div>
      <!-- 用户的彗星社 结束 -->
    </div>
    <!-- 用户信息 结束 -->
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {
  getGetBaseSpaceInfo,
  getGetReviews,
  getGetFavComics,
} from "@/api/otherUser";
import Vue from "vue";
import { Rate, Sticky } from "vant";

Vue.use(Rate).use(Sticky);
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      choose: 0, //0漫画 1绘星社
      value: 5, //星星分数
      taRecord: 0, //0.Ta的点评 1.Ta的追漫
      uid: null, //用户id
      userData: null, //用户数据
      reviewsUser: null, //Ta的点评列表
      fav_comics: null, //Ta的收藏列表
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 返回一级
    goBack() {
      this.$router.go(-1);
    },
    // 用户详情
    getGetBaseSpaceInfoFun() {
      getGetBaseSpaceInfo({
        uid: this.uid,
      }).then((data) => {
        console.log("用户详情", data);
        this.userData = data.data;
      });
    },
    // Ta的漫画助攻
    // getGetBestFavComicFun() {
    //   getGetBestFavComic({
    //     uid: this.uid,
    //   }).then((data) => {
    //     console.log("Ta的漫画助攻", data);
    //   });
    // },
    // Ta的点评列表
    getGetReviewsFun() {
      getGetReviews({
        uid: this.uid,
        pageSize: 15,
        pageNum: 1,
      }).then((data) => {
        console.log("Ta的点评列表", data);
        this.reviewsUser = data.data.reviews;
      });
    },
    // Ta的收藏列表
    getGetFavComicsFun() {
      getGetFavComics().then((data) => {
        console.log("Ta的收藏列表", data);
        this.fav_comics = data.data.fav_comics;
      });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.uid = this.$route.query.uid;
    console.log("this.$route.query", this.$route.query);
    this.getGetBaseSpaceInfoFun();
    // this.getGetBestFavComicFun();
    this.getGetReviewsFun();
    this.getGetFavComicsFun();
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
.taUser {
  width: 100%;
  height: 100vh;
  z-index: 100;
  position: relative;
  background-color: #fff;
  overflow-y: scroll;
  .van-sticky--fixed {
    width: 100%;
    height: 40px;
    background-color: #fff;
    display: flex;
    align-items: center;

    .img-icon {
      position: relative;
      top: 5px;
      background-color: transparent;
      span {
        color: #000000;
      }
    }
  }
  .img-icon {
    position: absolute;
    top: 21px;
    left: 15px;
    width: 33px;
    height: 33px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      font-size: 19px;
      color: #fff;
    }
  }
  .taUser-header {
    width: 100%;
    height: 223px;
    img {
      width: 100%;
    }
    video {
      width: 100%;
    }
  }
  .user-content {
    width: 100%;
    background-color: #fff;
    position: relative;
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
    .user-info {
      width: 100%;
      position: relative;
      display: flex;
      justify-content: flex-end;

      .img {
        width: 95px;
        height: 95px;
        border-radius: 50%;
        overflow: hidden;
        position: absolute;
        left: 27px;
        top: -21px;
        img {
          width: 95px;
          height: 95px;
        }
      }
      .guangzhu {
        width: 52.8%;
        height: 95px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding-right: 17px;
        ul {
          width: 100%;
          display: flex;
          justify-content: space-between;
          margin-bottom: 11px;
          li {
            color: #90939d;
            font-size: 12px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            span {
              color: #0f0f11;
            }
          }
        }
        .button {
          width: 100%;
          height: 29px;
          color: #fff;
          border-radius: 14px;
          background-color: #32aaff;
          text-align: center;
          line-height: 29px;
        }
      }
    }
    .name-jiesao {
      width: 100%;
      height: 78px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 0 16px;
      .user-name {
        font-size: 16px;
        color: #000000;
        font-weight: bolder;
      }
      .user-jiesao {
        font-size: 12px;
        color: #6a6d7b;
        margin-top: 15px;
      }
    }
    .user-manghua-she {
      width: 100%;
      height: 43px;
      display: flex;
      align-items: center;
      justify-content: center;
      .manghua {
        margin-right: 55px;
        color: #686b79;
        font-size: 16px;
      }
      .she {
        color: #686b79;
        font-size: 16px;
      }
      li {
        &.active {
          color: #000000;
          font-weight: bolder;
          position: relative;
          &::after {
            position: absolute;
            left: 7px;
            bottom: -10px;
            content: "";
            display: inline-block;
            width: 14px;
            height: 4px;
            background-color: #32aaff;
            border-radius: 3px;
          }
        }
      }
    }
    .user-comic {
      width: 100%;
      background-color: #ffffff;
      .comic-nav {
        width: 100%;
        height: 54px;
        display: flex;
        align-items: center;
        padding: 0 17px;
        .ta-review {
          color: #737581;
          font-size: 14px;
          margin-right: 32px;
        }
        .ta-comic {
          color: #737581;
          font-size: 14px;
        }
        li {
          &.active {
            color: #000000;
            font-weight: bolder;
            position: relative;
          }
        }
      }
      .review-content {
        width: 100%;

        li {
          width: 100%;
          padding: 0 17px;
          .top {
            width: 100%;
            height: 26px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .left {
              display: flex;
              font-size: 12px;
              color: #979aa3;
              .score {
                margin-right: 7px;
              }
            }
            .right {
              color: #44485a;
              font-size: 16px;
            }
          }
        }
      }

      .comic-content {
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
                span {
                  display: flex;
                }
              }
            }
          }
        }
      }
      .comic-name {
        width: 100%;
        color: #afb0b7;
        font-size: 14px;
      }
      .sc-comic {
        width: 100%;
        height: 72px;
        display: flex;
        align-items: center;
        background-color: #f5f6f8;
        position: relative;
        margin-top: 5px;
        .img {
          width: 46px;
          height: 58px;
          overflow: hidden;
          border-radius: 5px;
          margin-right: 9px;
          img {
            width: 46px;
            height: 58px;
          }
        }
        .font {
          h3 {
            font-size: 16px;
            color: #000000;
          }
          p {
            font-size: 12px;
            color: #a1a2aa;
          }
        }
        span {
          position: absolute;
          right: 15px;
          color: #434758;
          font-size: 12px;
        }
      }

      .line {
        margin-top: 12px;
        width: 100%;
        height: 3px;
        background-color: #f4f4f4;
      }
    }
  }
  .user-community {
    width: 100%;
    .kongkong-img {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      img {
        width: 65%;
      }
      span {
        width: 65%;
      }
    }
  }
}
</style>