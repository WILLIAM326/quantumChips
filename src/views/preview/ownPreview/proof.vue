<template>
  <div class="credential-wrapper">
    <div class="line"></div>
    <div class="credential-detail">
      <div class="credential-head">
        <p>有<span>{{nameValidation.count}}</span>人实名为我证实</p>
      </div>
      <template >
        <div class="credential-info">
          <template v-if="nameValidation.info.length">
            <div class="help-name-list">
              <ul>
                <template v-for="item in nameValidation.info">
                  <li><img :src="item.head_img"></li>
                </template>
                <router-link :to="{path:'/confirmatory',query:{projectId:itemId}}">
                  <li><img src="../../../images/more.png"></li>
                  <li><img src="../../../images/black.png"></li>
                </router-link>
              </ul>
            </div>
          </template>
          <template v-else>
            <p class="invite-friend-prove"><img src="../../../images/friend.png"></p>
          </template>
          <div class="word-detail">
            <p>邀请好友为您证实</p>
            <p>你将获得更多信任和帮助哦</p>
          </div>
        </div>

        <div class="send-credential" @click="inviteFriends(item)">
          <p>邀请好友证实</p>
        </div>
      </template>
    </div>
    <chat-share-mask v-show="chatShareShow" @chatShareHide="chatShareHideAction"></chat-share-mask>
  </div>

</template>

<script>
  import {mapGetters} from 'vuex'
  import wx from 'weixin-js-sdk';
  import chatShareMask from '../../../components/common/weChatShareMask'
  import {weChatShareAction,shareTimesTotal} from '../../../api/getData'
  import {getToken} from '../../../utils/auth'
  import {configHTMLURL} from '../../../config/env'

  export default {
    data(){
      return{
        chatShareShow:false,
        itemId:this.$route.query.projectId,
        pageShareData: {//微信分享数据
          title: '',
          desc: '',
          link: '',
          imgUrl:''
        }
      }
    },
    computed:{
      ...mapGetters(['nameValidation','projectPreviewInfo'])
    },
    components:{
      chatShareMask
    },
    methods:{
      inviteFriends(){
        this.pageShareData.link=''
        this.chatShareShow = true;
        this.initWeChatShare(this.projectPreviewInfo.id)
        this.pageShareData.title = this.projectPreviewInfo.title
        this.pageShareData.desc = this.projectPreviewInfo.pro_remark
        this.pageShareData.imgUrl = this.projectPreviewInfo.share_img
        this.pageShareData.link = configHTMLURL+'?#/sharePreview?projectId=' + this.projectPreviewInfo.id
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
              shareTimesTotal({token:getToken(),project_id:_this.itemId}).then((res)=>{})
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
              shareTimesTotal({token:getToken(),project_id:_this.itemId}).then((res)=>{})
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
              shareTimesTotal({token:getToken(),project_id:_this.itemId}).then((res)=>{})
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
              shareTimesTotal({token:getToken(),project_id:_this.itemId}).then((res)=>{})
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
              shareTimesTotal({token:getToken(),project_id:_this.itemId}).then((res)=>{})
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
  @import "../../../style/mixin.scss";
  .credential-wrapper{
    .line{
      width: 100%;
      height: 0.5rem;
      background: #f4f4f4;
    }
    .credential-detail{
      width: 90%;
      margin: auto;
      padding:1rem 0;
      .credential-head{
        width: 100%;
        padding:0.1rem 0;
        border-left: 4px solid #ee6631;
        p{
          font-size:0.75rem;
          color:#353535;
          padding-left: 0.3rem;
          font-weight: bold;
          span{
            color:#ff6631;
          }
        }
      }
      .credential-info{
        margin-top:1.3rem;
        .help-name-list{
          width: 100%;
          height:2.5rem;
          li{
            float: left;
            margin-left:0.3rem;
            img{
             @include widthAndHeight(1.6rem,1.6rem);
              border-radius: 50%;
            }
          }
          li:last-child{
            float: right;
            margin-top:0.3rem;
            img{
              @include widthAndHeight(0.6rem,1rem);
            }
          }
        }
        .invite-friend-prove{
          text-align: center;
        }
        .word-detail{
          p{
            text-align: center;
            font-size:0.75rem;
            color:$fontSizeColorA;
            line-height:1.7;
          }
        }
        img{
          @include widthAndHeight(4.7rem,4.7rem);
        }
      }
      .send-credential{
        margin: auto;
        margin-top: 1rem;
        @include widthAndHeight(80%,2.2rem);
        @include bis('../../../images/scbtn.png');
        p{
          color: $fontSizeColorE;
          text-align: center;
          padding-top: 0.3rem;
          font-weight: bold;
        }

      }
    }
  }

</style>
