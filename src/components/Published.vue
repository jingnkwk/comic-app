<!-- published 用户发表评价 -->
<template>
  <div class="published">
    <!-- 发表头部 开始· -->
    <div class="published-header">
      <div class="icon" @click="shutDown">
        <span class="iconfont icon-jiantouzuo"></span>
      </div>
      <h3>发表评价</h3>
    </div>
    <!-- 发表头部 结束 -->
    <!-- 发表内容 开始 -->
    <div class="pinlun">
      <div class="top">
        <div class="img">
          <img :src="`${$store.state.comicDetailData.vertical_cover}@200w.jpg`" alt="" />
        </div>
        <h2>{{$store.state.comicDetailData.title}}</h2>
        <van-rate
          v-model="value"
          :size="25"
          color="#fe9d10"
          void-icon="star"
          void-color="#eee"
          allow-half
        />
        <div class="dianji">点击评论</div>
      </div>
      <div class="text">
        <textarea
          placeholder="物觉得这部漫画怎么样呢?分享下阅读后的感受吧~"
          name=""
          id=""
          cols="30"
          rows="10"
        ></textarea>
      </div>
      <div class="longPl">转图文长评</div>
      <div class="botton-box">
        <div class="botton">发表</div>
      </div>
    </div>
    <!-- 发表内容 开始 -->
    <!-- 页脚 开始 -->
    <div class="prompt">
      <h3>点评内容该写什么呢?</h3>
      <p>1.可以向大家安利漫画中喜欢的情节、角色等</p>
      <p>2.可以向大家分享你对这部漫画最深的感情及感受</p>
      <p>3.如果你有其它的点评角度，也可以尽情发挥哦～</p>
    </div>
    <!-- 页脚 结束 -->
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

import Vue from "vue";
import { Rate } from "vant";

Vue.use(Rate);
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "Published",
  components: {},
  data() {
    //这里存放数据
    return {
      value: 0, //星星
    };
  },
  //监听属性 类似于data概念
  computed: {

  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    
    pinlun() {},
    // 关闭当前页面
    shutDown() {
      console.log("1111");
      this.$emit("changAge");
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
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
.published {
  width: 100%;
  height: 100vh;
  .published-header {
    width: 100%;
    height: 55px;
    text-align: center;
    position: relative;
    line-height: 55px;
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
  .pinlun {
    width: 100%;
    .top {
      width: 100%;
      height: 200px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .img {
        width: 84px;
        height: 112.14px;
        img {
          width: 84px;
          height: 112.14px;
        }
      }
      h2 {
        font-size: 16px;
        color: #000000;
        margin-top: 11px;
        margin-bottom: 20px;
      }
      .dianji {
        font-size: 12px;
        color: #a9acb1;
      }
    }
    .text {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 14px;
      textarea {
        width: 339px;
        height: 204px;
        max-height: 204px;
        max-width: 339px;
        min-width: 339px;
        min-height: 204px;
        padding: 13px 11px;
        font-size: 16px;
      }
    }
    .longPl {
      width: 100%;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 0 20px;
      color: #169aee;
      font-size: 12px;
    }
    .botton-box {
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: center;
      .botton {
        width: 90%;
        height: 50px;
        background-color: #9cd8fd;
        border-radius: 25px;
        text-align: center;
        color: #fff;
        font-size: 20px;
        line-height: 50px;
      }
    }
  }
  .prompt {
    margin-top: 22px;
    padding: 0 19px;
    h3 {
      font-size: 14px;
      color: #515565;
    }
    p {
      font-size: 12px;
      color: #9fa3a9;
    }
  }
}
</style>