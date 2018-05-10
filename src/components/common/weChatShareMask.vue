<template>
  <div class="weChatShareMask-wrapper" @click="chatShareHide">
    <img src="../../images/weChatPoint.png" class="sharePointPic">
    <div class="share-content">
        <div class="content-title">
          <p>点击右上角分享到</p>
        </div>
        <div class="share-icon-list">
          <ul>
            <li>
              <img src="../../images/weChat.png">
              <p>微信</p>
            </li>
            <li>
              <img src="../../images/chatpengyou.png">
              <p>朋友圈</p>
            </li>
            <!--<li>-->
              <!--<img src="../../images/qq.png">-->
              <!--<p>QQ</p>-->
            <!--</li>-->
            <!--<li>-->
              <!--<img src="../../images/qqzone.png">-->
              <!--<p>QQ空间</p>-->
            <!--</li>-->
          </ul>

        </div>
        <!--微博分享-->
        <!--<div class="webo-share-list">-->
          <!--<ul>-->
            <!--<li>-->
              <!--<span>其他分享</span>-->
              <!--<p class="keep-store">保存链接二维码至本地相册</p>-->
            <!--</li>-->
            <!--<li>-->
              <!--<img src="../../images/webo.png">-->
              <!--<p>微博</p>-->
            <!--</li>-->
          <!--</ul>-->
        <!--</div>-->
    </div>

  </div>

</template>

<script>

    export default {
        data(){
          return{
            positionY: 0,
            timer: null
          }
        },
        methods:{
          chatShareHide(){
            this.$emit('chatShareHide')
          }
        }
    }
</script>

<style lang="scss" scoped>
    .weChatShareMask-wrapper {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 200;
      background: rgba(0, 0, 0, 0.7);
    }
    .share-content{
      position: fixed;
      width: 90%;
      min-height: 10rem;
      top:47%;
      left: 50%;
      border-radius: 0.5rem;
      transform: translate(-50%,-50%);
      z-index:2;
      padding: 0.8rem 0.5rem;
    }
    .sharePointPic{
      position:fixed;
      width: 7.4rem;
      height: 6.4rem;
      top: 0.5rem;
      right: 0.7rem;
    }
    .content-title{
      margin-left:0.5rem;
      p{
        font-size:0.75rem;
        color:#fff;
        text-align: center;
      }

    }
    .share-icon-list{
      width: 100%;
      margin-left: 3rem;
      margin-top:0.5rem;
      li{
        width: 25%;
        text-align: center;
        img{
          width: 2.5rem;
          height: 2.5rem;
        }
        p{
          font-size:0.7rem;
          color:#fff;
        }
      }
    }
    .webo-share-list{
      width: 100%;
      margin-top:5.5rem;
      li:first-child{
        width: 70%;
        span{
          font-size:0.7rem;
          color:#353535;
          margin-left: 0.5rem;
        }
        .keep-store{
          color: #fff;
          font-size:0.7rem;
          padding: 0.3rem;
          border-radius: 1rem;
          border: 1px solid #fff;
          text-align: center;
          margin-top: 0.5rem;
        }
      }
      li:nth-child(2){
        width: 30%;
        text-align:center;
        img{
          width: 2.5rem;
          height: 2.5rem;
        }
        p{
          font-size:0.7rem;
          color:#fff;
        }
      }
    }

</style>
