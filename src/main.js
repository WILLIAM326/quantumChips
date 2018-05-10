import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/index'
import store from './store/index'
import './utils/rem'
import FastClick from 'fastclick'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import {setLocalStorageStore,getLocalStorageStore} from './utils/auth'

import {getToken} from './utils/auth'


if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body);
  }, false);
}

Vue.use(VueRouter);
Vue.use(VueAwesomeSwiper);

const router = new VueRouter({
  mode: 'hash',
  routes,
  // mode: routerMode,
});

// Object.keys(formatDate).forEach(key => {
//   Vue.filter(key, formatDate[key])
// })

router.beforeEach((to, from, next) => {
  let ua =window.navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == 'micromessenger'){//微信浏览器中
    if (to.matched.some(r => r.meta.requireAuth)) {
      if (getToken()) {//存在tokend的时候
        if(getLocalStorageStore('storeOpenID')){
          if(!getLocalStorageStore('storeOpenID')==store.userOpenID){
            setLocalStorageStore("preUrl",to.fullPath)
            store.dispatch("weChatAuthorization")
          }else{
            next()
          }
        }
        next()
      }
      else {
        setLocalStorageStore("preUrl",to.fullPath)
        store.dispatch("weChatAuthorization")
      }
    }
    else {
      next();
    }
  }else{//非微信浏览器todo
    next()
  }
})

router.afterEach((to, from, next) => {
  document.title = to.name;
  window.scrollTo(0,0);//滚动到最顶部
});

new Vue({
  store,
  router,
}).$mount('#app');

