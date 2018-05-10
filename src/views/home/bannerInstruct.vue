<template>
  <div class="home-page-content">
    <div class="home-page-info">
      <div class="info-step-ins">
        <p>只需三步，快速筹款</p>
      </div>
      <div class="info-box1">
        <ul>
          <li>
            <img src="../../images/num1.png">
          </li>
          <li class="info-detail">
            <p>第一步</p>
            <p>填写信息，开始筹款</p>
          </li>
        </ul>
      </div>
      <div class="info-box2">
        <ul>
          <li>
            <img src="../../images/num2.png">
          </li>
          <li class="info-detail">
            <p>第二步</p>
            <p>转发朋友圈，大家来捐款</p>
          </li>
        </ul>
      </div>
      <div class="info-box3">
        <ul>
          <li>
            <img src="../../images/num3.png" style="width:1.75rem;height: 1.9rem">
          </li>
          <li class="info-detail">
            <p>第三步</p>
            <p>提现筹款金额</p>
          </li>
        </ul>
      </div>
      <alert-tip v-show="showAlert" @closeTip="closeTextBox" :alertText="alertText"></alert-tip>
    </div>
    <div class="perfect-information">
      <div class="send-btn" @click="needhelp">
       <p>填写筹款信息</p>
      </div>
    </div>
  </div>
</template>

<script>

  import {getLocalStorageStore,setLocalStorageStore,getToken} from '../../utils/auth';
  import alertTip from '../../components/common/alertTip';
  import {getWeChatUserInfo}  from '../../api/login'
  export default {
    data(){
      return{
        alertText:'',
        showAlert:false,
        userInfo:'',
        chatToken:getToken()//微信token
      }
    },
    components: {
      alertTip
    },
    methods:{
      needhelp(){
        this.showAlert=true;
      },
      closeTextBox(){
        if(this.chatToken){
          this.checkPhone(this.chatToken)
        }else{
          setLocalStorageStore("preUrl",this.$route.fullPath)
          this.$store.dispatch("weChatAuthorization")
        }
      },
      checkPhone(token){
        getWeChatUserInfo(token).then((res)=>{
          if (res.stauts == 1) {
            if(!res.data.member_list_tel){//手机号不存在
              this.$router.push({path:'/login'})
            }else{
              this.$router.push({path:'/callHelp'})
            }
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/mixin.scss";
  .home-page-content{
    width:100%;
    height:29rem;
    padding-top: 7.5rem;
    @include bis('../../images/bannerBg.png');
    .home-page-info{
      background: $backGroundA;
      box-shadow: 0px 0px 10px 0px #e5e5e5;
      margin: auto;
      @include widthAndHeight(80%,19rem);
      @include borderRadius(0.5rem);
      .info-step-ins{
        padding-top:1.5rem;
        height:4rem;
        border-bottom:1px dotted #4c4c4c;
        p{
          font-size:0.8rem;
          color: #4c4c4c;
          font-weight: bold;
          text-align: center;
        }
      }
      .info-box1{
        width:100%;
        padding: 0.8rem 1rem;
        min-height: 2rem;
        border-bottom: 1px dotted $fontSizeColorC;
        ul{
          display: inline-block;
        li{
        img{
          @include widthAndHeight(1.7rem,1.7rem);
          margin-top: 0.5rem;
        }
      }
      .info-detail{
        margin-top:0.3rem;
        p{
          line-height: 1.7;
          margin-left:0.5rem;
        }
        p:nth-child(1){
          @include sc(0.7rem,#8086ff);
          font-weight: bold;
        }
        p:nth-child(2){
          @include sc(0.65rem,#353535);
        }
        p:nth-child(3){
          @include sc(0.65rem,#353535);
          }
        }
      }
    }
      .info-box2,.info-box3{
      @extend .info-box1;
      }
      .info-box3{
      border-bottom:0;
        }
        &:after{
          content: '';
          display: block;
          height: 4rem;
        }
      }
    .perfect-information{
      position: fixed;
      bottom: 0;
      -webkit-box-shadow: 0 0 10px 0 #e5e5e5;
      box-shadow: 0 0 10px 0 #e5e5e5;
      background: #fff;
      width: 100%;
      height: 3rem;
      .send-btn{
        width: 70%;
        height: 2.1rem;
        @include bis('../../images/send.png');
        margin: auto;
        margin-top: 0.5rem;
        p{
          font-size:1.1rem;
          color: $fontSizeColorE;
          text-align: center;
          font-weight: bold;
          padding-top: 0.2rem;
        }
      }
    }
  }

</style>
