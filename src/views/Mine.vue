<!-- mine -->
<template>
  <div class="mine">
    <!-- 我的界面开头 开始 -->
    <div class="mine-header">
      <div class="mine-icon">
        <span class="iconfont icon-pifugexinghuazhuti-xianxing"></span>
        <span class="iconfont icon-duanxin"></span>
        <span class="iconfont icon-shezhi"></span>
      </div>
    </div>
    <!-- 我的界面开头 结束 -->

    <!-- 用户信息 开始 -->
    <div class="user-information">
      <div class="user-top">
        <div class="left">
          <div class="img">
            <img src="../assets/img/user_default_header.png" alt="" />
          </div>
          <div class="user-name">
            <p>加油，努力奋斗</p>
            <div class="club">加入超漫俱乐部 享有好礼特权</div>
          </div>
        </div>
        <div class="right">
          <span class="iconfont icon-jiantouyou"></span>
        </div>
      </div>

      <div class="user-center">
        <div class="card-package">
          <p>卡卷包</p>
          <span>5</span>
        </div>
        <div class="vertical-bar"></div>
        <div class="month-ticket">
          <p>月票</p>
          <span>0</span>
        </div>
        <div class="vertical-bar"></div>
        <div class="coin">
          <p>漫币</p>
          <div class="first-charge">
            首充奖励<span class="iconfont icon-jiantouyou"></span>
          </div>
        </div>
      </div>

      <div class="user-botton">
        <img src="../assets/img/kaitong.png" alt="" />
      </div>
    </div>
    <!-- 用户信息 结束 -->

    <!-- 福利与积分 开始 -->
    <div class="welfare-integral">
      <div class="welfare">
        <div class="left">
          <img src="../assets/img/fuli.gif" alt="" />
        </div>

        <div class="right">
          <div class="welfare-center">
            福利中心
            <div class="Sign-in">去签到</div>
          </div>
          <div class="progress-of">解锁进度：0/28</div>
        </div>
      </div>

      <div class="line"></div>

      <div class="integral">
        <div class="left">
          <img src="../assets/img/yingbi.png" alt="" />
        </div>
        <div class="right">
          <div class="integral-shopping">赛季积分商城</div>
          <div class="progress-of">剩余赛季积分：0</div>
        </div>
      </div>
    </div>
    <!-- 福利与积分 结束 -->

    <!-- 漫画商城、活动中心、邀请有礼、我的已购 开始 -->
    <div class="application-class">
      <ul>
        <li v-for="(item, index) in confsOne" :key="index">
          <a :href="item.jump_url">
            <div class="img">
              <img :src="item.icon" alt="" />
            </div>
            <p>{{ item.title }}</p>
          </a>
        </li>
      </ul>
    </div>
    <!-- 漫画商城、活动中心、邀请有礼、我的已购 结束 -->
    <div class="mine-line"></div>

    <!-- 用户工具 开始 -->
    <div class="user-tool">
      <ul class="tool-lists">
        <li class="tool-item" v-for="(item, index) in confsTwo" :key="index">
          <div class="img">
            <img :src="item.icon" alt="" />
          </div>
          <p>{{ item.title }}</p>
        </li>

        <!-- <li class="tool-item">
          <div class="img">
            <span class="iconfont icon-youxiyouxiji"></span>
          </div>
          <p>游戏中心</p>
        </li>
        <li class="tool-item">
          <div class="img">
            <span class="iconfont icon-shouye"></span>
          </div>
          <p>自动购买管理</p>
        </li>
        <li class="tool-item">
          <div class="img">
            <span class="iconfont icon-manmanka"></span>
          </div>
          <p>看漫画免流量</p>
        </li>
        <li class="tool-item">
          <div class="img">
            <span class="iconfont icon-vip"></span>
          </div>
          <p>超漫俱乐部</p>
        </li>
        <li class="tool-item">
          <div class="img">
            <span class="iconfont icon-baohumoshi"></span>
          </div>
          <p>青少年模式</p>
        </li>
        <li class="tool-item">
          <div class="img">
            <span class="iconfont icon-kefufenxiermaikefu"></span>
          </div>
          <p>帮助中心</p>
        </li>
        <li class="tool-item">
          <div class="img">
            <span class="iconfont icon-fankui"></span>
          </div>
          <p>意见反馈</p>
        </li> -->
      </ul>
    </div>
    <!-- 用户工具 结束 -->
    <!-- 挑战答题 开始 -->
    <div class="challenge">
      <img src="../assets/img/mine_user_answer.png" alt="" />
      <span class="font">挑战转正答题</span>
      <span class="iconfont icon-jiantouyou"></span>
    </div>
    <!-- 挑战答题 结束 -->
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { getUCenterConf } from "@/api/other";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      confsOne: null,
      confsTwo: null,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 用户中心配置
    getUCenterConfFun() {
      getUCenterConf().then((data) => {
        console.log("用户中心配置", data);
        this.confsOne = data.data.confs.slice(0, 4);
        console.log(this.confsOne);
        this.confsTwo = data.data.confs.slice(4, 12);
        console.log(this.confsTwo);
      });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getUCenterConfFun();
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
.mine {
  width: 100%;
  height: calc(100vh - 50px);
  overflow: hidden;
  overflow-y: scroll;
  background-color: #f8f9fd;
  padding: 0 16px;
  .mine-header {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 39px;
    width: 100%;
    position: relative;
    padding: 0 17px;
    margin-bottom: 10px;
    .mine-icon {
      span {
        font-size: 24px;
        margin-left: 22px;
      }
    }
  }
  .user-information {
    width: 100%;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 1px 10px 0 skyblue;
    .user-top {
      width: 100%;
      display: flex;
      padding: 0 11px;
      position: relative;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        .img {
          width: 20%;
          overflow: hidden;
          border-radius: 50%;
          margin-top: -5px;
          margin-right: 18px;
          img {
            width: 100%;
          }
        }
        .user-name {
          margin-top: 18px;
          p {
            color: #1c1e1e;
            font-size: 14px;
          }
          .club {
            width: 151;
            height: 16px;
            font-size: 12px;
            line-height: 16px;
            background-color: #f5f6f8;
            text-align: center;
            border-radius: 7px;
          }
        }
      }
      .right {
        span {
          font-size: 14px;
        }
      }
    }
    .user-center {
      display: flex;
      width: 100%;
      height: 53px;
      align-items: center;
      margin-top: 22px;
      padding: 0 10px;
      .card-package {
        margin-right: 50px;
        p {
          font-size: 17px;
          color: #7a7d88;
        }
        span {
          color: #000000;
          font-size: 16px;
        }
      }
      .month-ticket {
        margin-right: 50px;
        margin-left: 12px;
        p {
          font-size: 17px;
          color: #7a7d88;
        }
        span {
          color: #000000;
          font-size: 16px;
        }
      }
      .coin {
        margin-left: 12px;
        p {
        }
        .first-charge {
          width: 68px;
          height: 24px;
          text-align: center;
          line-height: 24px;
          color: #ffffff;
          background-color: #fe9d10;
          border-radius: 9px;
          font-size: 12px;
          span {
            color: #ffffff;
            font-size: 12px;
          }
        }
      }
      .vertical-bar {
        height: 38px;
        background-color: #f3f3f3;
        border: 1px solid #f3f3f3;
      }
    }
    .user-botton {
      width: 100%;
      text-align: center;
      img {
        width: 93.1%;
        border-radius: 8px 8px 0 0;
        margin-top: 8px;
        margin-bottom: 14px;
      }
    }
  }
  .welfare-integral {
    width: 100%;
    display: flex;
    height: 58px;
    align-items: center;
    justify-content: space-between;
    margin-top: 11px;
    padding: 0 17px;
    .welfare {
      display: flex;
      height: 58px;
      align-items: center;
      .left {
        width: 40px;
        height: 40px;
        overflow: hidden;
        margin-right: 15px;
        img {
          width: 40px;
        }
      }
      .right {
        .welfare-center {
          display: flex;
          align-items: center;
          font-size: 14px;
          color: #000000;
          .Sign-in {
            width: 40px;
            height: 16px;
            color: #f0507c;
            font-size: 12px;
            background-color: #ffe9eb;
            border-radius: 6px;
            text-align: center;
            line-height: 16px;
            margin-left: 5px;
          }
        }
        .progress-of {
          font-size: 13px;
          color: #90929b;
        }
      }
    }
    .line {
      height: 31px;
      background-color: #f3f3f3;
      border: 1px solid #f3f3f3;
    }
    .integral {
      display: flex;
      height: 58px;
      align-items: center;
      .left {
        width: 30px;
        height: 30px;
        overflow: hidden;
        margin-right: 15px;
        img {
          width: 30px;
        }
      }
      .right {
        .integral-shopping {
          font-size: 14px;
          color: #000000;
        }
        .progress-of {
          font-size: 13px;
          color: #90929b;
        }
      }
    }
  }
  .application-class {
    width: 100%;
    padding: 0 9px;
    margin-top: 17px;
    ul {
      width: 100%;
      display: flex;
      // justify-content: space-between;
      li {
        width: 25%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .img {
          width: 41px;
          height: 41px;
          border-radius: 50%;
          overflow: hidden;
          img {
            width: 41px;
          }
        }
        p {
          font-size: 12px;
          color: #5e6370;
        }
      }
    }
  }
  .mine-line {
    width: 100%;
    border: 1px solid #f4f4f4;
    background-color: #f4f4f4;
    margin-top: 24px;
  }
  .user-tool {
    width: 100%;
    margin-bottom: 16px;
    .tool-lists {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      .tool-item {
        width: 25%;
        height: 82px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .img {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          overflow: hidden;
          margin-bottom: 12px;
          text-align: center;
          img {
            width: 30px;
            height: 30px;
          }
        }
        p {
          color: #454c5a;
          font-size: 14px;
        }
      }
    }
  }
  .challenge {
    height: 38px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: relative;
    background-color: #f0edfe;
    border-radius: 5px;
    img {
      position: absolute;
      top: -5px;
      left: 0;
      width: 60px;
    }
    .font {
      position: absolute;
      top: 10px;
      left: 66px;
      font-size: 12px;
    }
    .iconfont {
      margin-right: 16px;
    }
  }
}
</style>