<!-- bookrack -->
<template>
  <div class="bookrack">
    <!-- 头部导航 开始 -->
    <div class="bookrack-nav">
      <ul>
        <li
          :class="{ active: navState == index }"
          @click="chooseType(index)"
          v-for="(item, index) in navData"
          :key="index"
        >
          {{ item }}
        </li>
      </ul>
      <!-- <div v-if="enshrineData">
        <div class="editor" v-show="enshrineData.length">编辑</div>
      </div> -->
    </div>
    <!-- 头部导航 结束 -->
    <div class="bookrack-line"></div>
    <!-- 追漫 开始 -->
    <div class="chase-talk-random" v-show="navState == 0">
      <!-- 追漫顺序、更新顺序、.... 开始 -->
      <div class="drum-options">
        <ul>
          <li>追漫顺序</li>
          <li>追漫顺序</li>
          <li>追漫顺序</li>
          <li>追漫顺序</li>
        </ul>
      </div>
      <!-- 追漫顺序、更新顺序、.... 结束 -->
      <!-- 用户收藏漫画 开始 -->
      <div class="comic-content">
        <ul>
          <router-link
            tag="li"
            :to="`/details?id=${item.comicDetailData.id}`"
            class="comic-content-item"
            v-for="item in enshrineData"
            :key="item.comicDetailData.id"
          >
            <div class="img">
              <img
                :src="`${item.comicDetailData.vertical_cover}@200w.jpg`"
                alt=""
              />
            </div>
            <h4>{{ item.comicDetailData.title }}</h4>
            <p>最新一话{{ item.comicDetailData.last_short_title }}</p>
          </router-link>
          <router-link tag="li" to="/classification" class="active">
            <img class="box" src="../assets/img/01.jpg" alt="" />
            <img
              class="icon"
              src="../assets/img/reader_bookmark_plus.png"
              alt=""
            />
          </router-link>
        </ul>
      </div>
      <!-- 用户收藏漫画 结束 -->
    </div>
    <!-- 追漫 结束  -->
    <!-- 历史 开始 -->
    <div class="history" v-show="navState == 1">
      <div class="history-content">
        <div class="history-header">今天</div>
      </div>
      <ul class="history-lists">
        <li class="history-item" v-for="item in 6" :key="item">
          <div class="left">
            <img src="../assets/img/01.jpg" alt="" />
          </div>
          <div class="center">
            <div class="comic-name">
              <h4>凡人修修仙传</h4>
              <span>看打发打发JFK发的发生</span>
            </div>
            <div class="item">14:19</div>
          </div>
          <div class="right">
            <div class="button">继续看</div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 历史 结束 -->
    <!-- 缓存 开始 -->
    <div class="cache" v-show="navState == 2">
      <img src="../assets/img/c41.png" alt="" />
    </div>
    <!-- 缓存 结束 -->
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      navData: ["追漫", "历史", "缓存"],
      navState: 0,
      enshrineData: null, //收藏的数据
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    chooseType(index) {
      this.navState = index;
    },
  },
  created() {
    this.enshrineData = JSON.parse(window.localStorage.getItem("enshrineData"));
  },
};
</script>
<style lang="less" scoped>
.bookrack {
  width: 100%;
  .bookrack-nav {
    width: 100%;
    height: 40px;
    position: relative;
    margin-bottom: 3px;
    ul {
      width: 100%;
      display: flex;
      height: 40px;
      align-items: center;
      justify-content: space-between;
      padding: 0 105px;
      li {
        font-size: 16px;
        color: #6d727e;
        &.active {
          color: #000000;
          position: relative;
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
    .editor {
      position: absolute;
      top: 10px;
      right: 21px;
    }
  }
  .bookrack-line {
    width: 100%;
    border: 1px solid #f3f3f3;
    background-color: #f3f3f3;
  }
  .chase-talk-random {
    width: 100%;
    .drum-options {
      width: 100%;
      height: 48px;
      padding: 0 8px;
      overflow-x: scroll;
      ul {
        height: 48px;
        display: flex;
        align-items: center;
        li {
          flex-shrink: 0;
          height: 31px;
          border-radius: 21px;
          background-color: #f1f1f3;
          text-align: center;
          line-height: 31px;
          color: #646776;
          padding: 0 21px;
          margin-right: 8px;
        }
      }
    }
  }

  .comic-content {
    padding: 0 15px;
    margin-top: 11px;
    height: calc(100vh - 43px - 48px - 11px - 50px);
    overflow-y: scroll;
    ul {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      width: 100%;
      .comic-content-item {
        width: 31%;
        margin-right: 12px;
        margin-top: 27px;
        &:nth-child(3n) {
          margin-right: 0;
        }
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
          white-space: nowrap;
        }
        p {
          width: 100%;
          height: 17px;
          line-height: 17px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 12px;
          color: #94979e;
        }
      }
      .active {
        width: 31%;
        border: 3px solid #cdebfc;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        .box {
          width: 100%;
          visibility: hidden;
          margin-right: 12px;
        }
        .icon {
          position: absolute;
        }
      }
    }
  }
  .history {
    width: 100%;
    height: calc(100vh - 43px - 50px);
    overflow-y: scroll;
    .history-header {
      width: 100%;
      height: 25px;
      line-height: 25px;
      padding: 0 17px;
      color: #8a8d96;
    }
    .history-lists {
      width: 100%;
      padding: 0 16px;
      .history-item {
        width: 100%;
        height: 130px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left {
          width: 81px;
          height: 106px;
          overflow: hidden;
          // margin-right: 13px;
          img {
            width: 81px;
          }
        }
        .center {
          height: 130px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          // .comic-name {
          // }
        }
        .right {
          .button {
            width: 82px;
            height: 35px;
            border: 1px solid #83c6eb;
            border-radius: 13px;
            text-align: center;
            line-height: 35px;
            color: #0b94f2;
            font-size: 14px;
          }
        }
      }
    }
  }
  .cache {
    width: 100%;
    height: calc(100vh - 43px - 50px);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>