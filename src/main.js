import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/reset.css'//引入重置样式
import "swiper/css/swiper.min.css";//引入swiper样式
import "./assets/font/iconfont.css"
import Carousel3d from 'vue-carousel-3d';

Vue.use(Carousel3d);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
