<!-- ReplyPage 回复界面 -->
<template>
  <div class="replyPage" @scroll="onScroll">
    <!-- 回复界面头部 开始 -->
    <van-sticky>
      <div class="replyPage-header">
        <div class="icon" @click="shutDown">
          <span class="iconfont icon-jiantouzuo"></span>
        </div>
        <h3>评论详情</h3>
      </div>
    </van-sticky>
    <!-- 回复界面头部 结束 -->

    <!-- 回复界面内容 开始 -->
    <div class="replyPage-content">
      <ul class="replyPage-list">
        <li class="discuss-item">
          <div class="user-pinglin" v-if="replyData">
            <div class="left" @click.stop="jumpUserInfo">
              <img :src="`${replyData.member.avatar}@200w.jpg`" alt="" />
            </div>
            <div class="right" v-if="replyData">
              <div class="content">
                <h3>{{ replyData.member.uname }}</h3>
                <span class="time">{{ replyData.ctime | fliterTime }}</span>
                <p>
                  {{ replyData.content.message }}
                </p>
                <div class="icon-list">
                  <div class="zang">
                    <span class="iconfont icon-dianzan"></span>
                    {{ replyData.like }}
                  </div>
                  <div class="Bad">
                    <span class="iconfont icon-chaping-xianxing"></span>
                  </div>
                  <div class="pinglun">
                    <span class="iconfont icon-pinglun2"></span>
                    {{ replyData.count }}
                  </div>
                </div>
              </div>
              <div class="icon">
                <span class="iconfont icon-gengduo-shuxiang"></span>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div class="line"></div>
      <div class="related" v-if="replyData">
        相关回复共{{ replyData.count }}条
      </div>
      <ul class="replyPage-list" v-if="replyData">
        <li
          class="discuss-item"
          v-for="(item, index) in replyData.replies"
          :key="index"
        >
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
                  <div class="pinglun">
                    <span class="iconfont icon-pinglun2"></span>
                    {{ item.count }}
                  </div>
                </div>
              </div>
              <div class="icon">
                <span class="iconfont icon-gengduo-shuxiang"></span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 回复界面内容 结束 -->

    <!-- 底部输入框 开始 -->
    <div class="replyPage-footer">
      <div class="input-box">
        <input type="text" placeholder="发条友善的评论" />
      </div>
      <div>发送</div>
    </div>
    <!-- 底部输入框 结束 -->
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Vue from "vue";
import { Toast } from "vant";

Vue.use(Toast);
import { getReplyDetail } from "@/api/details";
export default {
  //import引入的组件需要注入到对象中才能使用
  props: ["comicId", "rootid"],
  components: {},
  data() {
    //这里存放数据
    return {
      replyData: null,
      next: 1,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 回复的数据请求
    getReplyDetailFun() {
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      getReplyDetail({
        oid: this.comicId,
        root: this.rootid,
        ps: 15,
        next: 1,
      }).then((data) => {
        console.log(data);
        if (this.replyData) {
          this.replyData.replies = [
            ...this.replyData.replies,
            ...data.data.root.replies,
          ];
          Toast.clear()
          return;
        }
        this.replyData = data.data.root;
        Toast.clear()
      });
    },
    shutDown() {
      this.$emit("replyStat");
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
            this.getReplyDetailFun();
          }, 1000);
        }
      }
    },
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
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getReplyDetailFun();
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
.replyPage {
  width: 100%;
  height: calc(100vh - 54px);
  overflow: hidden;
  overflow-y: scroll;
  position: relative;
  .replyPage-header {
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

  .replyPage-content {
    .replyPage-list {
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
    .line {
      width: 100%;
      height: 7px;
      background-color: #f1f1f3;
    }
    .related {
      width: 100%;
      height: 33px;
      padding-left: 12px;
      line-height: 33px;
      font-size: 14px;
      color: #9597a0;
    }
  }

  .replyPage-footer {
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