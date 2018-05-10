<template>
  <div class="home-page-info">
    <div class="info-box1">
      <ul>
        <li>
          <img src="../../images/homepageicon1.png">
        </li>
        <li class="info-detail">
          <p>新颖分享方式</p>
          <p>提高转发率</p>
        </li>
      </ul>
    </div>
    <div class="info-box2">
      <ul>
        <li>
          <img src="../../images/homepageicon2.png">
        </li>
        <li class="info-detail">
          <p>一键精准分享</p>
          <p>平台为认证用户提供专项</p>
          <p>公益筹款通道</p>
        </li>
      </ul>
    </div>
    <div class="info-box3">
      <ul>
        <li>
          <img src="../../images/homepageicon3.png">
        </li>
        <li class="info-detail">
          <p>传递契约精神</p>
          <p>把每个人的爱心传递出去</p>
        </li>
      </ul>
      <div class="needHelp" @click="needhelp">
        <p>发起求助</p>
      </div>
      <div class="server-phone">
        <p>客服电话<a href="tel:400-900-8690"><span>400-900-8690</span></a></p>
      </div>
    </div>
    <alert-tip v-show="showAlert" @closeTip="closeTextBox" :alertText="alertText"></alert-tip>
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

  .home-page-info{
    background: $backGroundA;
    box-shadow: 0px 0px 10px 0px #e5e5e5;
    margin: auto;
    margin-top: 0.8rem;
    @include widthAndHeight(80%,19rem);
    @include borderRadius(0.5rem);
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
        .info-detail p{
          line-height: 1.7;
          margin-left:0.5rem;
        }
        .info-detail p:nth-child(1){
          @include sc(0.7rem,#8086ff);
          font-weight: bold;
        }
        .info-detail p:nth-child(2){
         @include sc(0.65rem,#353535);
        }
        .info-detail p:nth-child(3){
        @include sc(0.65rem,#353535);
        }
      }
    }
    .info-box2,.info-box3{
      @extend .info-box1;
    }
    .info-box3{
      border-bottom:0;
      .needHelp{
        @include widthAndHeight(9rem,2.2rem);
        @include bis('../../images/needBtn1.png');
        margin: auto;
        margin-top: 0.5rem;
        p{
          @include sc(1rem,#fff);
          text-align: center;
          padding-top: 0.4rem;
          font-weight: bold;
        }
      }
    }
  &:after{
    content: '';
    display: block;
    height: 4rem;
   }
   .server-phone{
     margin-top:0.6rem;
     p{
       @include sc(0.5rem,#6d6d6d);
       text-align: center;
       span{
         @include sc(0.85rem,#8086ff);
         margin-left: 0.2rem;
         font-family: Knockout-lzhz;
       }
     }
   }
  }

</style>
