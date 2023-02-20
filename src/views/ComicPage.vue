<!-- comicPage 漫画页面 -->
<template>
  <div
    class="comicPage"
    ref="comicPage"
    @click.stop="dianJiaPage"
    @scroll="onScroll"
  >
    <!-- 漫画 开始 -->
    <div class="comicPage-box">
      <ul class="lists">
        <li class="item" v-for="(item, index) in imageUrl" :key="index">
          <img :src="`${item.url}?token=${item.token}`" alt="" />
        </li>
      </ul>
    </div>
    <!-- 漫画 结束 -->

    <!-- 漫画设置 开始 -->
    <div class="comic-install">
      <!-- 顶部 -->
      <transition name="install_top">
        <div class="install-top" v-show="isInstall">
          <div class="left" @click.stop="goBack">
            <span class="iconfont icon-jiantouzuo"></span>
          </div>
          <div class="center">
            <h3>{{ $store.state.comicDetailData.title }}</h3>
            <!-- <div class="xianqi">详情</div> -->
          </div>
          <div class="right">
            <span class="iconfont icon-fenxiang"></span>
          </div>
        </div>
      </transition>
      <!-- 底部 -->
      <transition name="install_botton">
        <div class="install-botton" ref="install_botton" v-show="isInstall">
          <div class="progress">
            <div class="last" @click.stop="lastChapter">上一话</div>
            <!-- 滑块 开始 -->
            <div class="bar">
              <van-slider
                v-model="value"
                :min="0"
                :max="scrollHeight"
                @change="onChange"
              />
            </div>
            <!-- 滑块 结束 -->
            <div class="next" @click.stop="nextChapter">下一话</div>
          </div>

          <ul>
            <li>
              <span class="iconfont icon-shoucangxiao"></span>
              <p>追漫</p>
            </li>
            <li>
              <span class="iconfont icon-brightj2"></span>
              <p>亮度</p>
            </li>
            <li>
              <span class="iconfont icon-pinglun"></span>
              <p>评论</p>
            </li>
            <li @click="sheZhiPopup = true">
              <span class="iconfont icon-shezhi1"></span>
              <p>设置</p>
            </li>
            <li @click.stop="zhanjiePopup = true">
              <span class="iconfont icon-mulu"></span>
              <p>章节</p>
            </li>
          </ul>
        </div>
      </transition>
    </div>
    <!-- 漫画设置 结束 -->

    <!-- 漫画章节 开始 -->
    <van-popup
      v-model="zhanjiePopup"
      position="bottom"
      :style="{ height: '80%' }"
    >
      <div class="directory">
        <div class="directory-header">
          <h3>全部章节({{ $store.state.comicDetailData.ep_list.length }})</h3>
          <div class="model" @click.stop="switchLists = !switchLists">
            <span class="iconfont icon-fenlei"></span>
            <p v-show="!switchLists">列表模式</p>
            <p v-show="switchLists">缩略模式</p>
          </div>
        </div>

        <ul v-show="!switchLists">
          <li
            :class="['chapter-list', { active: epId == item.id }]"
            v-for="item in $store.state.comicDetailData.ep_list"
            :key="item.id"
            @click.stop="chooseChapter(item.id)"
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
          </li>
        </ul>
        <ul class="suo-list" v-show="switchLists">
          <li
            @click.stop="chooseChapter(item.id)"
            :class="['item', { active: epId == item.id }]"
            v-for="item in $store.state.comicDetailData.ep_list"
            :key="item.id"
          >
            {{ item.short_title }}
          </li>
        </ul>
      </div>
    </van-popup>
    <!-- 漫画章节 结束 -->

    <!-- 漫画设置弹出层 开始 -->
    <van-popup
      v-model="sheZhiPopup"
      position="bottom"
      :style="{ height: '60%' }"
    >
      内容
    </van-popup>
    <!-- 漫画设置弹出层 结束 -->
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { getGetImageIndex, getImageToken } from "@/api/comic";
import Vue from "vue";
import { Slider, Toast, Popup } from "vant";
Vue.use(Slider).use(Toast).use(Popup);
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      value: 0, //漫画滚动条
      isInstall: true,
      zhanjiePopup: false,
      sheZhiPopup: false,
      imageUrl: null, //漫画图片
      epId: null, //图片&索引id
      switchLists: false, //列表模式和缩略模式切换
      scrollHeight: 100, //漫画元素高度
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    // scrollTop() {
    //   console.log("1111");
    // },
  },
  //方法集合
  methods: {
    // 选择漫画第几章节
    chooseChapter(id) {
      this.epId = id;
      this.imageUrl = null;
      this.getGetImageIndexFun();
    },
    // 上一话
    lastChapter() {
      let ep_list = this.$store.state.comicDetailData.ep_list;
      let index = ep_list.findIndex((item) => {
        return item.id == this.epId;
      });
      if (index <= 0) {
        Toast("已经是第一话了");
        return;
      }
      this.epId = ep_list[index - 1].id;
      this.imageUrl = null;
      this.getGetImageIndexFun();
    },
    // 下一话
    nextChapter() {
      let ep_list = this.$store.state.comicDetailData.ep_list;
      console.log("ep_list", ep_list);
      let index = ep_list.findIndex((item) => {
        return item.id == this.epId;
      });
      console.log(index);
      if (index >= ep_list.length - 1) {
        Toast("已经是最新一话了");
        return;
      }
      this.epId = ep_list[index + 1].id;
      this.imageUrl = null;
      this.getGetImageIndexFun();
    },
    // 漫画章节内容图片&索引
    getGetImageIndexFun() {
      getGetImageIndex({
        epId: this.epId,
      }).then((data) => {
        console.log("内容图片&索引", data);
        let images = data.data.images;
        let host = data.data.host;
        let urls = [];
        images.forEach((item) => {
          // console.log("1456465465456", item, i);
          let url = host + item.path + "@660w.webp";
          // console.log("url", url);
          urls.push(url);
        });
        this.getImageTokenFun(JSON.stringify(urls));
      });
    },
    // 漫画章节内容图片Token
    getImageTokenFun(urls) {
      getImageToken({
        urls,
      }).then((data) => {
        console.log("众多图片", data);
        this.imageUrl = data.data;
      });
    },
    // 点击屏幕不同位置触发不同事件
    dianJiaPage() {
      if (window.event.clientY < 100) {
        this.$refs.comicPage.scrollTop -= 300;
      } else if (window.event.clientY > 570) {
        this.$refs.comicPage.scrollTop += 300;
      } else {
        this.isInstall = !this.isInstall;
      }
    },

    // 返回上一级
    goBack() {
      this.$router.go(-1);
    },
    // 漫画进度条
    onChange(value) {
      // Toast("当前值：" + value);
      console.log(this.$refs.comicPage);
      // let scrollTop = this.$refs.comicPage.scrollTop;
      //  let offsetHeight = Math.ceil(
      //   this.$refs.comicPage.getBoundingClientRect().height
      // );
      let scrollHeight = this.$refs.comicPage.scrollHeight;
      this.scrollHeight = scrollHeight;
      this.$refs.comicPage.scrollTop = this.value;
    },
    // 滚动触底加载数据
    onScroll(e) {
      // console.log('e.target===========================>',e.target);
      let scrollTop = e.target.scrollTop;
      let scrollHeight = e.target.scrollHeight;
      let offsetHeight = Math.ceil(e.target.getBoundingClientRect().height);
      let currentHeight = scrollTop + offsetHeight;
      this.scrollHeight = scrollHeight;
      this.value = scrollTop;
      // console.log("滚动高度scrollTop====>", scrollTop);
      // console.log("实际总高度scrollHeight====>", scrollHeight);
      // if (currentHeight + 1 >= scrollHeight) {
      //   // console.log("触底了");
      //   let cd = false;
      //   if (cd) {
      //     return;
      //   } else {
      //     console.log("触底了");
      //     this.timer = setTimeout(() => {
      //       cd = true;
      //     }, 1000);
      //   }
      // }
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.epId = this.$route.query.id;
    this.getGetImageIndexFun();
    // console.log("this.$route", this.$route.query.id);
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.comicPage {
  width: 100%;
  height: 100vh;
  z-index: 100;
  position: relative;
  overflow-y: scroll;
  background-color: #fff;
  .comicPage-box {
    width: 100%;
    .lists {
      width: 100%;
      .item {
        width: 100%;
        img {
          width: 100%;
        }
      }
    }
  }
  .comic-install {
    width: 100%;
    height: 100vh;
    z-index: 200;
    position: absolute;
    top: 0;
    left: 0;

    .install-top {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 46px;
      background-color: #1e202c;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 18px;
      position: fixed;
      top: 0;
      left: 0;
      .left {
        span {
          font-size: 23px;
          color: #fff;
        }
      }
      .center {
        color: #fff;
        font-size: 16px;
        display: flex;
        align-items: center;
        .xianqi {
          width: 47px;
          height: 26px;
          text-align: center;
          line-height: 22px;
          border: 3px solid #0091fc;
          background-color: #8cc6f0;
          border-radius: 25px;
          margin-left: 15px;
          font-size: 12px;
        }
      }
      .right {
        span {
          font-size: 23px;
          color: #fff;
        }
      }
    }
    .install-botton {
      position: fixed;
      bottom: 0;
      left: 0;
      background-color: #1e202c;
      width: 100%;
      height: 114px;
      .progress {
        width: 100%;
        height: 46px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        .last {
          color: #fff;
        }
        .bar {
          width: 181px;
        }
        .next {
          color: #fff;
        }
      }
      ul {
        width: 100%;
        height: 69px;
        display: flex;
        align-items: center;

        li {
          width: 20%;
          height: 69px;
          text-align: center;
          span {
            color: #fff;
            font-size: 24px;
          }
          p {
            color: #fff;
          }
        }
      }
    }

    .install_top-enter,
    .install_top-leave-to {
      transform: translateY(-100%);
    }
    .install_top-enter-active,
    .install_top-leave-active {
      transition: transform 0.5s linear;
    }
    .install_top-enter-to,
    .install_top-leave {
      transform: translateY(0);
    }

    .install_botton-enter,
    .install_botton-leave-to {
      transform: translateY(100%);
    }
    .install_botton-enter-active,
    .install_botton-leave-active {
      transition: transform 0.5s linear;
    }
    .install_botton-enter-to,
    .install_botton-leave {
      transform: translateY(0);
    }
  }
  .directory {
    width: 100%;
    height: 80vh;
    overflow: hidden;
    overflow-y: scroll;
    position: relative;
    background-color: #1d1f2b;
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
      background-color: #1d1f2b;
      h3 {
        font-size: 16px;
        color: #fff;
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
          color: #fff;
        }
      }
    }
    ul {
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
              color: #fff;
              font-size: 14px;
              margin-right: 9px;
              font-weight: bolder;
            }
            h4 {
              color: #fff;
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
      .active {
        .chapter-name {
          .top {
            span {
              color: #0091fc;
            }
            h4 {
              color: #0091fc;
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
        border: 3px solid #fff;
        background-color: #1d1f2b;
        // text-align: center;
        // line-height: 37px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        color: #fff;
        margin-right: 7px;
        border-radius: 4px;
        margin-top: 7px;
        &:nth-child(5n) {
          margin-right: 0;
        }
      }
      .active {
        border: 3px solid #0091fc;
        background-color: rgba(50, 170, 255, 0.2);
      }
    }
  }
}
</style>