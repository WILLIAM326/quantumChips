<template>
  <div class="paySuccess_wrapper">
    <div class="paySuccess_content">
      <div class="content_head">
        <p>
          <img src="../../images/sicon.png">
          <span>支付成功</span>
        </p>
      </div>

      <div class="silk_area">
        <p>
          <img src="../../images/silk.png">
        </p>
        <p>感谢您的热心支持！</p>
        <p>转发好友帮TA获得更多救助</p>
      </div>

      <!--查看捐款凭证-->
      <router-link to="/mine/myhelped">
        <div class="check_proof">
          <p>查看捐款凭证</p>
        </div>
      </router-link>

      <div class="share_proof" @click="shareForHelp">
        <p>转发筹款</p>
      </div>
    </div>

    <!--大病医疗-->
    <div class="another_plan">
      <a href="https://www.liangzihuzhu.com.cn/xwh5/pages/index.html">
        <img src="../../images/plan.png">
      </a>
    </div>
    <chat-share-mask v-show="chatShareShow" @chatShareHide="chatShareHideAction"></chat-share-mask>
  </div>
</template>
<script>
  import wx from 'weixin-js-sdk';
  import chatShareMask from '../../components/common/weChatShareMask'
  import {getLocalStorageStore,getToken} from '../../utils/auth'
  import {weChatShareAction,projectBasicInfoAction} from '../../api/getData';
  import {configHTMLURL} from '../../config/env';

  export default {
      data(){
          return{
            chatShareShow:false,
            shareProjectId:getLocalStorageStore("shareProjectId"),
//            shareToken:getLocalStorageStore("shareToken"),
            pageShareData: {//微信分享数据
              title: '',
              desc: '',
              link: '',
              imgUrl:''
            },
            shareData:{}//分享的数据
          }
      },
      components:{
        chatShareMask
      },
      mounted(){
          this.initShareData()
      },
      methods:{
        initShareData(){
          const postData = {
//              token:this.shareToken,
              project_id:this.shareProjectId
          }
          projectBasicInfoAction(postData).then((res) => {
            if (res.stauts == 1) {
              this.shareData = res.data
            }
          })
        },
        shareForHelp(){
          this.chatShareShow = true
          this.pageShareData.link=''
          this.initWeChatShare(this.shareProjectId)
          this.pageShareData.title = this.shareData.title
          this.pageShareData.desc = this.shareData.pro_remark
          this.pageShareData.imgUrl = this.shareData.pro_images[0]
          this.pageShareData.link = configHTMLURL+'?#/sharePreview?projectId=' + this.shareProjectId
        },
        chatShareHideAction(){
          this.chatShareShow=false
        },
        //获取微信jstoken
        initWeChatShare(pid) {
          const _this = this;
          const weChatParam={
            token:getToken(),
            url:location.href,
            pid:pid
          }
          weChatShareAction(weChatParam).then((res)=>{
            if(res.stauts==1){
              _this.wxConfig(res.data.weachat_js_sign);
            }
          })
        },
        wxConfig: function (conf) {
          const _this = this;
          wx.config({
            debug: false,
            appId: conf.appid, //公众号的唯一标识
            timestamp: conf.timestamp, //生成签名的时间戳
            nonceStr: conf.noncestr, //生成签名的随机串
            signature: conf.signature, //签名
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
          });

          wx.ready(function () {
            //分享给朋友
            wx.onMenuShareAppMessage({
              title: _this.pageShareData.title, // 分享标题
              desc: _this.pageShareData.desc, // 分享描述
              link: _this.pageShareData.link, // 分享链接
              imgUrl: _this.pageShareData.imgUrl, // 分享图标
              type: 'link', // 分享类型,music、video或link，不填默认为link
              dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
              success: function () {
              },
              cancel: function () {
              }
            });
            //分享给朋友圈
            wx.onMenuShareTimeline({
              title: _this.pageShareData.title, // 分享标题
              desc: _this.pageShareData.desc, // 分享描述
              link: _this.pageShareData.link, // 分享链接
              imgUrl: _this.pageShareData.imgUrl, // 分享图标
              success: function () {
                // 用户确认分享后执行的回调函数
              },
              cancel: function () {
                // 用户取消分享后执行的回调函数
              }
            });
            //分享到QQ
            wx.onMenuShareQQ({
              title: _this.pageShareData.title, // 分享标题
              desc: _this.pageShareData.desc, // 分享描述
              link: _this.pageShareData.link, // 分享链接
              imgUrl: _this.pageShareData.imgUrl, // 分享图标
              success: function () {
              },
              cancel: function () {
              }
            });

            //分享到腾讯微博
            wx.onMenuShareWeibo({
              title: _this.pageShareData.title, // 分享标题
              desc: _this.pageShareData.desc, // 分享描述
              link: _this.pageShareData.link, // 分享链接
              imgUrl: _this.pageShareData.imgUrl, // 分享图标
              success: function () {
              },
              cancel: function () {
              }
            });
            //分享到QQ空间
            wx.onMenuShareQZone({
              title: _this.pageShareData.title, // 分享标题
              desc: _this.pageShareData.desc, // 分享描述
              link: _this.pageShareData.link, // 分享链接
              imgUrl: _this.pageShareData.imgUrl, // 分享图标
              success: function () {
              },
              cancel: function () {
              }
            });
          });
        }
      }
    }
</script>

<style lang="scss" scoped>
  @import "../../style/mixin.scss";
  .paySuccess_wrapper{
    width: 100%;
    height: 30rem;
    padding-top: 1rem;
    @include bis('../../images/messagebg.png');
    .paySuccess_content{
      width: 90%;
      height: 18rem;
      margin: auto;
      border-radius: 0.8rem;
      background: #fff;
      -webkit-box-shadow: 0 3px 9px #ababab;
      .content_head{
        @include widthAndHeight(100%,2rem);
        @include bis('../../images/sc.png');
        p{
          text-align: center;
          font-size: 1rem;
          color:#fff;
          font-weight: bold;
          padding-top: 0.25rem;
          img{
            width: 1rem;
            height: 1rem;
            vertical-align: middle;
          }
          span{
            font-size:0.8rem;
            color: #fff;
            font-weight: bold;
          }
        }
      }
      /*silk*/
      .silk_area{
        text-align:center;
        margin-top:1.5rem;
        p{
          font-size:0.8rem;
          color:#565656;
          line-height:1.7;
          img{
            width: 4.7rem;
            height: 4.7rem;
          }
        }
      }
      /*proof*/
      .check_proof{
        width: 80%;
        height: 2rem;
        border-radius: 1rem;
        border: 1px solid #ff6631;
        margin: auto;
        margin-top:0.7rem;
        p{
          font-size:1rem;
          color:#ff6631;
          text-align: center;
          font-weight: bold;
          padding-top: 0.2rem;
        }
      }
      .share_proof{
        @extend .check_proof;
        @include bis('../../images/proveBtn.png');
        border: 0;
        p{
          color: #fff;
        }
      }
    }
    /*大病医疗*/
    .another_plan{
      width:90%;
      margin:auto;
      margin-top: 1rem;
      img{
        width: 100%;
      }
    }
  }

</style>
