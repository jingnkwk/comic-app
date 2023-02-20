<!-- Discuss 漫画讨论专区 -->
<template>
  <div class="discuss" @scroll="onScroll">
    <!-- 头部 开始 -->
    <van-sticky>
      <div class="discuss-header">
        <div class="icon" @click="shutDown">
          <span class="iconfont icon-jiantouzuo"></span>
        </div>
        <h3>讨论区({{ all_count }})</h3>
      </div>
    </van-sticky>
    <!-- 头部 结束 -->
    <!-- 线 -->
    <div class="line"></div>
    <!-- 广告 开始 -->
    <van-notice-bar left-icon="volume-o" scrollable mode="closeable">
      技术是开发它的人的共同灵魂。
    </van-notice-bar>
    <!-- 广告 结束 -->
    <!-- 讨论专区 开始 -->
    <div class="discuss-content">
      <div class="content-header">
        <div class="left">热门评论</div>
        <div class="right">
          <span class="iconfont icon-qiehuanlie"></span>
          <p @click="sortData" v-show="!sortState">按热度</p>
          <p @click="sortData" v-show="sortState">按时间</p>
        </div>
      </div>
      <ul class="discuss-list">
        <li class="discuss-item" v-for="item in replies" :key="item.rpid">
          <div class="user-pinglin">
            <div class="left" @click.stop="jumpUserInfo">
              <img :src="`${item.member.avatar}@200w.jpg`" alt="" />
            </div>
            <div class="right">
              <div class="content">
                <h3>{{ item.member.uname }}</h3>
                <span class="time">{{ item.ctime | fliterTime }}</span>
                <p>
                  {{ item.content.message }}
                </p>
                <div class="icon-list">
                  <div class="zang">
                    <span class="iconfont icon-dianzan"></span> {{ item.like }}
                  </div>
                  <div class="Bad">
                    <span class="iconfont icon-chaping-xianxing"></span>
                  </div>
                  <div class="share">
                    <span class="iconfont icon-fenxiang1"></span>
                  </div>
                  <div class="pinglun">
                    <span class="iconfont icon-pinglun2"></span>
                    {{ item.rcount }}
                  </div>
                </div>
              </div>
              <div class="icon">
                <span class="iconfont icon-gengduo-shuxiang"></span>
              </div>
            </div>
          </div>
          <div class="reply">
            <ul v-if="item.replies">
              <li v-for="val in item.replies" :key="val.rpid">
                <span>{{ val.member.uname }}:</span>{{ val.content.message }}
              </li>
              <!-- <li>
                雨夜莹草回复@谢怜本怜-:我说的都是事实，主角看起来牛逼哄哄的刚刚开始修炼adsjfkhdasf1
              </li> -->
              <div class="dianjiReply" @click="kaishiReply(item.rpid)">
                {{ item.reply_control.sub_reply_entry_text
                }}<span class="iconfont icon-jiantouyou"></span>
              </div>
            </ul>
          </div>
          <div class="line"></div>
        </li>
      </ul>
    </div>
    <!-- 讨论专区 结束 -->
    <!-- 底部输入框 开始 -->
    <div class="discuss-footer">
      <div class="input-box">
        <input type="text" placeholder="发条友善的评论" />
      </div>
      <div>发送</div>
    </div>
    <!-- 底部输入框 结束 -->

    <!-- 回复界面 开始 -->
    <van-popup
      v-model="showReply"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <reply-page :rootid="rootid" :comicId="comicId" @replyStat="replyStat"></reply-page>
    </van-popup>
    <!-- 回复界面 结束 -->
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { getReplyMain } from "@/api/details";
import ReplyPage from "@/components/ReplyPage";
import Vue from "vue";
import { NoticeBar, Sticky, Popup, Toast } from "vant";

Vue.use(NoticeBar).use(Sticky).use(Popup).use(Toast);
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    ReplyPage,
  },
  props: ["comicId"],
  data() {
    //这里存放数据
    return {
      showReply: false, //显示隐藏回复页面
      all_count: null, //评论总数
      replies: null, //热门评论数据
      sortState: false, //按热门排序 时间排序
      next: 1, //下一页
      mode: 3, //排序方式
      rootid: null, //当前评论id
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    kaishiReply(id) {
      this.showReply = true;
      this.rootid = id;
    },
    // 数据排序 时间 热度
    sortData() {
      this.sortState = !this.sortState;
    },
    //漫画讨论专区数据
    getReplyMainFun() {
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      getReplyMain({
        oid: this.comicId,
        mode: this.mode,
        ps: 20,
        next: this.next,
      }).then((data) => {
        console.log("漫画讨论专区数据", data);
        if (this.replies) {
          this.replies = [...this.replies, ...data.data.replies];
          Toast.clear();
          return;
        }
        this.all_count = data.data.cursor.all_count;
        this.replies = data.data.replies;
        Toast.clear();
        // console.log("漫画讨论专区数据", this.replies);
      });
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
            this.next++;
            this.getReplyMainFun();
          }, 1000);
        }
      }
    },
    // 关闭回复页面
    replyStat() {
      this.showReply = false;
    },
    // 跳转至用户页面
    jumpUserInfo() {},
    // 关闭
    shutDown() {
      console.log("111");
      this.$emit("DiscussState");
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getReplyMainFun();
  },

  filters: {
    fliterTime(value) {
      let time = new Date(value * 1000);
      let y = time.getFullYear();
      let m = time.getMonth();
      let d = time.getDate();
      return y + "-" + m + "-" + d;
    },
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
<style lang="less" scoped>
.discuss {
  width: 100%;
  height: calc(100vh - 54px);
  overflow: hidden;
  overflow-y: scroll;
  position: relative;
  .discuss-header {
    width: 100%;
    height: 55px;
    text-align: center;
    position: relative;
    line-height: 55px;
    background-color: #fff;
    .icon {
      position: absolute;
      left: 21px;
      span {
        color: #000000;
        font-size: 19px;
      }
    }
    h3 {
      color: #000000;
      font-size: 18px;
    }
  }
  .line {
    width: 100%;
    background-color: #f5f5f5;
    border: 1px solid #f5f5f5;
  }
  .discuss-content {
    width: 100%;
    .content-header {
      width: 100%;
      height: 33px;
      display: flex;
      justify-content: space-between;
      padding: 0 13px;
      align-items: center;
      .left {
        font-size: 14px;
        color: #323335;
        align-items: center;
      }
      .right {
        display: flex;
        span {
          font-size: 12px;
          color: #8d8f98;
        }
        p {
          font-size: 12px;
          color: #8d8f98;
        }
      }
    }
    .discuss-list {
      .discuss-item {
        width: 100%;
        padding: 10px 21px 0px 15px;

        .user-pinglin {
          width: 100%;
          display: flex;
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
              .icon-list {
                width: 200px;
                height: 49px;

                font-size: 12px;
                color: #505465;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .zang {
                  span {
                    color: #505465;
                    font-size: 16px;
                  }
                }
                .Bad {
                  span {
                    color: #505465;
                    font-size: 16px;
                  }
                }
                .share {
                  span {
                    color: #505465;
                    font-size: 16px;
                  }
                }
                .pinglun {
                  span {
                    color: #505465;
                    font-size: 16px;
                  }
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
        }
        .reply {
          padding: 0 0 0 48px;
          width: 100%;
          ul {
            background-color: #f5f6f8;
            padding: 14px;
            li {
              word-break: break-all;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              margin-top: 16px;
              font-size: 16px;
              color: #6a6d7c;
              &:first-child {
                margin-top: 0;
              }
              span {
                color: #0996f8;
              }
            }
            .dianjiReply {
              font-size: 12px;
              color: #0996f8;
              margin-top: 16px;
              span {
                font-size: 12px;
                color: #0996f8;
              }
            }
          }
        }
        .line {
          margin-top: 13px;
        }
      }
    }
  }
  .discuss-footer {
    width: 100%;
    height: 54px;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .input-box {
      width: 81%;
      height: 37px;
      background-color: #f1f1f3;
      border-radius: 17px;
      display: flex;
      align-items: center;
      input {
        width: 100%;
        background-color: transparent;
        outline: none;
        border: none;
        padding: 0 18px;
        font-size: 16px;
        color: #a3a5ab;
      }
    }
  }
}
</style>