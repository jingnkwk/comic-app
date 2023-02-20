<!-- AdvertisementCom 广告页 -->
<template>
  <div class="advertisement">
    <a :href="list[0].jump_value" v-if="list">
      <div class="box"></div>
    </a>
    <video autoplay loop src="../assets/video/guangao.mp4"></video>

    <!-- <img src="../assets/img/01.jpg" alt="" /> -->
    <div class="botton" @click.stop="goHome">跳过{{ num }}s</div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { getListFlash } from "@/api/other";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      num: 5,
      clearNum: null,
      list: null,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    //启动首屏广告
    getListFlashFun() {
      getListFlash().then((data) => {
        console.log(data);
        this.list = data.data.list;
      });
    },
    goHome() {
      // 跳转首页
      this.$router.push("/home/HotCartoon");
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getListFlashFun();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.clearNum = setInterval(() => {
      this.num -= 1;
      if (this.num <= 0) {
        clearInterval(this.clearNum); //清除定时器
        this.$router.push("/home/HotCartoon");
      }
    }, 1000);
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {
    clearInterval(this.clearNum);
  }, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less" scoped>
.advertisement {
  width: 100%;
  height: 100vh;
  position: relative;
  z-index: 200;
  background-color: #fff;
  a {
    display: block;
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 200;
  }
  img {
    width: 100%;
  }
  video {
    width: 100%;
  }
  .botton {
    position: absolute;
    top: 30px;
    right: 20px;
    width: 65px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    color: #fff;
    border-radius: 30px;
    z-index: 200;
    background-color: rgba(0, 0, 0, 0.3);
  }
}
</style>