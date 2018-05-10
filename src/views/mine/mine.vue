<template>
  <div class="mine-wrapper">
    <div class="mine-wrapper-head">
      <div class="head-line">
        <router-link :to="{ path: '/message'}">
          <div class="message-remind">
            <template v-if="messageFalg==0">
              <div class="red-dot"></div>
            </template>
          </div>
        </router-link>
      </div>
      <div class="card-box">
        <div class="card-box-top">
          <div class="card-box-left">
            <ul>
              <li>
                <p><img :src="userInfo.head_img"></p>
              </li>
              <li>
                <p>{{userInfo.name|optimize}}</p>
                <p>{{userInfo.member_list_tel}}</p>
              </li>
            </ul>
          </div>

          <router-link :to="{ path: '/myPromise'}">
            <div class="card-box-right">
              <p>我的承诺</p>
            </div>
          </router-link>

        </div>
        <!--底部-->
        <div class="current-funds">
          <p>目前筹款总额</p>
          <p>
            <span>¥</span>
            {{projectInfo.all_amount}}
          </p>
        </div>

      </div>

    </div>

    <!--头部底下导航-->
    <div class="item-list">
      <ul>
        <li @click="gotoAddress('/mine/mylaunch')" :class="{'link-active-border':activeColorFlag}">
            <p>{{projectInfo.project_count}}<span>次</span></p>
            <p>我发起的</p>
        </li>
        <li @click="gotoAddress('/mine/myhelped')" :class="{'link-active-border':myhelpedFlag}">
            <p>{{projectInfo.contribution}}<span>元</span></p>
            <p>我帮助的</p>
        </li>
        <li>
          <a href="https://www.quonline.cn/xwh5/pages/index.html">
          <p><img src="../../images/logo.png"></p>
          <p>量子互助</p>
          </a>
        </li>
        <li>
          <router-link to="/helpCenter">
            <p><img src="../../images/scale.png" class="scale-img"></p>
            <p>帮助中心</p>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="line"></div>
    <footer-guide></footer-guide>
    <!--子路由-->
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  import footerGuide from '../../components/footer/footer.vue';
  import {getQueryString} from '../../utils/tools';
  import {setToken,getToken,setLocalStorageStore,removeLocalStorageStore} from '../../utils/auth';
  import {checkMessageStatusAction} from '../../api/getData';
  import {weChatLogin,getWeChatUserInfo} from '../../api/login';//获取数据的方法
  export default {
    data(){
      return{
          activeColorFlag:true,//切换路由的颜色
          myhelpedFlag:false,
          chatToken:getToken(),//获取存储的token
          messageFalg:3
      }
    },
    components:{
      footerGuide
    },
    mounted(){
        this.initMessageStatus()
        this.gotoAddress(this.$route.path)
        this.$store.dispatch("reloadGetWeChatInfo",this.chatToken);//刚进入页面走的授权拿到的信息,刷新的时候需要在请求一次
        this.$store.dispatch("MyProfileInfo",this.chatToken);//个人中心数据
        this.$nextTick(() => {//解决ios白屏问题
          window.scrollTo(0, 1)
          window.scrollTo(0, 0)
        })
    },
    computed:{
      ...mapGetters(['projectInfo','userInfo'])
    },
    methods: {
      initMessageStatus(){
        checkMessageStatusAction(this.chatToken).then((res)=>{
          if (res.stauts == 1) {
            if (res.data.unread_mess == 0) {
              this.messageFalg = 0;//用户有未读消息
            }
          }
        })
      },
      gotoAddress(path){
        this.$router.push(path);
        if(path=='/mine/mylaunch'){
          this.activeColorFlag = true;
          this.myhelpedFlag = false;
        }
        if(path=='/mine/myhelped'){
          this.activeColorFlag=false;
          this.myhelpedFlag=true;
        }
      }
    },
    filters: {
      optimize(word){
        if (word.length > 5) {
          return word.slice(0, 5) + '...'
        } else {
          return word
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

  @import "../../style/mixin.scss";
  .mine-wrapper{
    .mine-wrapper-head{
      @include widthAndHeight(100%,10.3rem);
      @include bis('../../images/mybg.png');
      .head-line{
        width: 92%;
        height: 1.5rem;
        margin:auto;
        .message-remind{
          @include widthAndHeight(1rem,0.75rem);
          @include bis('../../images/ms.png');
          float:right;
          margin-top: 0.5rem;
          .red-dot{
            position: relative;
            width: 0.4rem;
            height: 0.4rem;
            border-radius: 50%;
            background: #ff6631;
            float: right;
            top:-0.2rem;
            right: -0.2rem;
          }

        }

      }
      /*card-box容器*/
      .card-box{
        margin: auto;
        @include widthAndHeight(90%,8rem);
        @include bis('../../images/mycard.png');
        padding:1.5rem 0.8rem;
        .card-box-top{
          width: 100%;
          height: 3rem;
          .card-box-left{
            float: left;
            li:first-child{
              img{
                width:2.5rem;
                height:2.5rem;
                border-radius: 50%;
              }
            }
            li:nth-child(2){
              color:#333333;
              line-height:1.7;
              margin-left:0.3rem;
              p:nth-child(1){
                font-size:0.8rem;
                font-weight: bold;
              }
              p:nth-child(2){
                font-size:0.6rem;
              }
            }

          }
          .card-box-right{
            float: right;
            p{
              font-size:0.625rem;
              color:$fontSizeColorA;
            }
          }

        }
        .current-funds{
          position: relative;
          bottom: 0;
          float: right;
          text-align:right;
          p:nth-child(1){
            font-size:0.65rem;
            color:#666;
          }
          p:nth-child(2){
            font-family: Knockout-lzhz;
            font-size:2rem;
            color:$fontSizeColorA;
            span{
              font-size:1rem;
              font-weight: bold;
            }
          }
        }
      }
    }
     /*head end*/
    .item-list{
      @include widthAndHeight(100%,4rem);
      padding:0.5rem 0;
      li{
        width: 25%;
        height: 3rem;
        border-right: 1px solid #f4f4f4;
        text-align: center;
        padding-top:0.4rem;
        p:nth-child(1){
          font-size:1.1rem;
          color:#8090ff;
          font-family: Knockout-lzhz;
          font-weight:bold;
          span{
            font-size:0.6rem;
            margin-left: 0.1rem;
          }
          img{
            width: 0.8rem;
            height: 0.95rem;
          }
          .scale-img{
            width: 0.8rem;
            height: 0.83rem;
          }
        }
        p:nth-child(2){
          margin: auto;
          font-size:0.625rem;
          color:#4f4f4f;
        }
      }
      li:last-child{
        border-right: 0;
      }
    }
    .line{
      width: 100%;
      height: 0.5rem;
      background: #f4f4f4;
    }
    .link-active-border:after{
      content: '';
      display: block;
      height: 3px;
      width: 3rem;
      margin: auto;
      margin-top:0.7rem;
      background: #ff6631;
    }

  }

  /*.fade-enter-active, .fade-leave-active {*/
    /*transition: opacity .5s;*/
  /*}*/
  /*.fade-enter, .fade-leave-active {*/
    /*opacity: 0;*/
  /*}*/
  /*.fade-choose-enter-active, .fade-choose-leave-active {*/
    /*transition: opacity .5s;*/
  /*}*/
  /*.fade-choose-leave, .fade-choose-leave-active {*/
    /*display: none;*/
  /*}*/
  /*.fade-choose-enter, .fade-choose-leave-active {*/
    /*opacity: 0;*/
  /*}*/
  /*.router-slid-enter-active, .router-slid-leave-active {*/
    /*transition: all .4s;*/
  /*}*/
  /*.router-slid-enter, .router-slid-leave-active {*/
    /*transform: translate3d(2rem, 0, 0);*/
    /*opacity: 0;*/
  /*}*/
  /*.toggle-cart-enter-active, .toggle-cart-leave-active {*/
    /*transition: all .3s ease-out;*/
  /*}*/
  /*.toggle-cart-enter, .toggle-cart-leave-active {*/
    /*transform: translateY(100%);*/
  /*}*/

</style>
