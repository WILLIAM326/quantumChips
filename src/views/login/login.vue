<template>
  <div class="login-wrapper">
    <div class="banner-box">
       <img src="../../images/loginbanner.png">
    </div>

    <div class="login-name-input input-top">
      <div class="input-left">
        <p>
          <!--<i class="iconfont">&#xe64f;</i>-->
          <img src="../../images/iphone.png">
        </p>
      </div>
      <div class="input-right">
        <input type="tel" maxlength="11" v-model="userPhone" placeholder="请输入手机号">
      </div>
    </div>

    <div class="login-password-input">
      <div class="input-left">
        <p>
          <!--<i class="iconfont">&#xe650;</i>-->
          <img src="../../images/password.png">
        </p>
      </div>
      <div class="input-middle">
        <input type="tel" v-model="userVercode" placeholder="请输入验证码">
      </div>
      <div class="input-right" v-show="verCodeShow" @click="getVerCode">
        <div class="get-vercode">
          <p>获取验证码</p>
        </div>
      </div>
      <div class="input-right" v-show="!verCodeShow">
        <div class="get-vercode count-down-color">
          <p>{{count}}s</p>
        </div>
      </div>

    </div>

    <!--登陆按钮-->
    <div class="login-button" @click="bindPhoneEvent">
      <p>登录</p>
    </div>

    <div class="login-agreement" @click="agreementAction">
      <p>
        <img src="../../images/right.png">
        我已阅读《xx筹用户协议》</p>
    </div>

    <div class="friendly-reminder">
      <p>若长时间没法收到验证码</p>
      <p class="server-phone">
        <img src="../../images/servePhone.png">
        <a href="tel:400-900-8690">请点击拨打客服电话</a>
      </p>
    </div>
    <message-tip :messageWord="messageWord" :messageShow="messageShow"></message-tip>
    <agreement v-show="agreementShow" :agreementData="agreementData" @goback="closeBack"></agreement>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import {checkMobile} from '../../utils/validate';
  import messageTip from '../../components/common/messageTip';
  import {sendMessageAction,bindPhoneAction,getAgreementAction} from '../../api/getData';
  import {setToken,getToken} from '../../utils/auth';
  import agreement from '../../views/agreement/agreement';
  export default {
    data(){
      return {
        userPhone:'',
        userVercode:'',
        messageWord:'',//提示信息
        messageShow:false,
        verCodeShow:true,
        count: '',
        timer:null,//默认倒数30秒
        agreementData:{},//协议数据
        agreementShow:false
      }
    },
    mounted(){

    },
    components:{
      messageTip,
      agreement
    },
    computed: {
      ...mapState([
        'username'
      ])
    },
    methods: {
      closeBack(){
          this.agreementShow=false
      },
      getVerCode(){
        if (!this.userPhone) {
          this.messageShow = true;
          this.messageWord = "手机号不能为空";
          return false;
        }
        if (this.userPhone && !checkMobile(this.userPhone)) {
          this.messageShow = true;
          this.messageWord = "请输入正确的手机号";
          return false;
        }else{
          this.countDown();
          const sendData={
            token:getToken(),
            phone:this.userPhone
          }
          sendMessageAction(sendData).then(((res)=>{
              if(res.stauts=='1'){
                this.messageShow = true;
                this.messageWord = res.msg;
              }
          }))
        }
      },
      countDown(){
        if (!this.timer) {
          const TIME_COUNT = 60;
          this.count = TIME_COUNT;
          this.verCodeShow = false;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.verCodeShow = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000)
        }
      },
      bindPhoneEvent(){
        if (!this.userPhone) {
          this.messageShow = true;
          this.messageWord = "手机号不能为空";
          return false;
        }
        if (this.userPhone && !checkMobile(this.userPhone)) {
          this.messageShow = true;
          this.messageWord = "请输入正确的手机号";
          return false;
        }
        if (!this.userVercode) {
          this.messageShow = true;
          this.messageWord = "请输入短信验证码";
          return false;
        } else{
          const bindData = {
            token: getToken(),
            phone: this.userPhone,
            code:this.userVercode
          }
          bindPhoneAction(bindData).then((res)=>{
            if(res.stauts=='1'){
              this.messageShow = true;
              this.messageWord = res.msg;
              this.$router.push({path: '/callHelp'});
            }
            if(res.stauts=='0'){
              this.messageShow = true;
              this.messageWord = res.msg;
            }
          })
        }
      },
      agreementAction(){
        const str='user_agreement'
        getAgreementAction(str).then((res)=>{
          if(res.stauts==1){
            this.agreementData=res.data
            this.agreementShow=true
          }
        })
      }
    },
    watch:{
      'messageShow'(){
        setTimeout(()=>{
          this.messageShow=false;
        },1500)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/mixin.scss";
  .login-wrapper{
    .banner-box{
      img{
        @include widthAndHeight(100%,11.3rem);
        display: block;
      }
    }

    .login-name-input{
      @include widthAndHeight(13.5rem,2.3rem);
      border: 1px solid #bcbcbc;
      border-radius: 0.3rem;
      margin: auto;
      margin-top:0.5rem;
      .input-left{
        width: 15%;
        float: left;
        p{
          text-align: center;
          padding-top: 0.4rem;
          img{
            width: 1rem;
            height: 1rem;
          }
        }
      }
      .input-right{
        width: 85%;
        float: right;
        input{
          width: 100%;
          height: 2.2rem;
          border-radius: 0.3rem;
          font-size: 0.8rem;
          &::-webkit-input-placeholder{
             color:#cccccc;
           }
        }
      }
    }
    .input-top{
      margin-top: 1.5rem;
    }
    .login-password-input{
      @extend .login-name-input;
      .input-middle{
        float: left;
        width:40%;
        input{
          width:100%;
          height: 2.2rem;
          border-radius: 0.3rem;
          font-size: 0.8rem;
          &::-webkit-input-placeholder{
             color:#cccccc;
          }
        }
      }
      .input-right{
        width:35%;
        margin-right:0.5rem;
        .get-vercode{
          width: 5rem;
          height: 1.7rem;
          border: 1px solid $fontSizeColorF;
          border-radius: 1rem;
          margin-top:0.3rem;
          p{
            font-size: 0.6rem;
            color:$fontSizeColorF;
            text-align: center;
            padding-top: 0.4rem;
          }
        }
        .count-down-color{
          background: #f4f4f4;
          border: 1px solid #f4f4f4;
        }

      }
    }
    .login-button{
      @include widthAndHeight(80%,2.4rem);
      @include bis('../../images/loginbtn.png');
      margin: auto;
      margin-top: 1rem;
      p{
        font-size: 1.25rem;
        color: #fff;
        text-align: center;
        font-weight: bold;
        padding-top: 0.3rem;
      }
    }
    .login-agreement{
      margin-top:0.8rem;
      p{
        font-size:0.6rem;
        color:#7f7f7f;
        text-align: center;
        img{
          width: 0.75rem;
          height: 0.75rem;
          vertical-align: text-top;
        }
      }

    }
    .friendly-reminder{
      margin-top: 2rem;
      text-align:center;
      p:nth-child(1){
        font-size:0.55rem;
        color:#898989;
      }
      .server-phone{
        img{
          width: 1rem;
          height: 1rem;
          vertical-align: middle;
        }
        a{
          font-size:0.6rem!important;
          color:#6680ff;
        }
      }
    }
  }

</style>
