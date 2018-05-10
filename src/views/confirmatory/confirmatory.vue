<template>
  <!--所有证实-->
  <div class="confirmatory-wrapper">
    <div class="list-content">
      <!--1-->
      <template v-if="!proveInfo.length">
        <div class="list-nothing">
          <p>
            <img src="../../images/without.png">
          </p>
          <p>暂无证实</p>
          <p>越多的亲友证实将获得</p>
          <p>更多信任和帮助哦</p>
        </div>
      </template>
      <template v-else>
        <div class="item-detail" v-for="item in proveInfo">
          <div class="detail-title">
            <ul>
              <li>
                <p>
                  <img :src="item.head_img">
                  <span>{{item.real_name}}</span>
                </p>
              </li>
              <li class="confirm-status">
                <p>
                  <!--1:亲人 2:朋友 3:同事 4:病友 5:邻居 6:同学 7:志愿者 8:其他-->
                  <template v-if="item.relat==1">
                    <span>亲人</span>
                  </template>
                  <template v-if="item.relat==2">
                    <span>朋友</span>
                  </template>
                  <template v-if="item.relat==3">
                    <span>同事</span>
                  </template>
                  <template v-if="item.relat==4">
                    <span>病友</span>
                  </template>
                  <template v-if="item.relat==5">
                    <span>邻居</span>
                  </template>
                  <template v-if="item.relat==6">
                    <span>同学</span>
                  </template>
                  <template v-if="item.relat==7">
                    <span>志愿者</span>
                  </template>
                  <template v-if="item.relat==8">
                    <span>其他</span>
                  </template>
                  <img src="../../images/shiming.png">
                </p>
              </li>
            </ul>
          </div>
          <div class="word-box">
            <p>{{item.prove_detail}}</p>
          </div>
          <div class="update-time">
            <p>{{item.create_time}}</p>
          </div>
        </div>
        <!--下拉刷新组件-->
        <infinite-loading @infinite="infiniteHandler" spinner="bubbles" ref="infiniteLoading">
         <!--<span slot="no-more">没有更多消息了</span>-->
        </infinite-loading>
      </template>
    </div>

    <div class="invite-friends-prove">
      <div class="help-action" @click="shareForHelp">
        <p>邀请好友证实</p>
      </div>
    </div>

    <chat-share-mask v-show="chatShareShow" @chatShareHide="chatShareHideAction"></chat-share-mask>
  </div>
</template>

<script>
  import {projectproveAction,projectBasicInfoAction} from '../../api/getData'
  import wx from 'weixin-js-sdk';
  import {weChatShareAction,shareTimesTotal} from '../../api/getData';
  import {getToken} from '../../utils/auth';
  import messageTip from '../../components/common/messageTip';
  import chatShareMask from '../../components/common/weChatShareMask'
  import {configHTMLURL} from '../../config/env';
  import InfiniteLoading from 'vue-infinite-loading';

  export default {
    data(){
      return {
          itemId:this.$route.query.projectId,
          proveInfo:[],
          totalCount:'',//总的页数
          shareData:{},
          pageShareData: {//微信分享数据
            title: '',
            desc: '',
            link: '',
            imgUrl:''
          },
          chatShareShow:false,
          shareTimesID:''//获取分享次数的id
      }
    },
    mounted(){
      this.initData()
      this.initShareData()
    },
    components: {
      InfiniteLoading,
      chatShareMask
    },
    methods: {
      initShareData(){
        const postData = {
          token: getToken(),
          project_id: this.itemId
        }
        projectBasicInfoAction(postData).then((res)=>{
            if(res.stauts==1){
                this.shareData=res.data
            }
        })
      },
      shareForHelp(){
        this.pageShareData.link=''
          this.chatShareShow = true;
          this.initWeChatShare(this.itemId)
          this.shareTimesID=this.itemId
          this.pageShareData.title = this.shareData.title
          this.pageShareData.desc = this.shareData.pro_remark
          this.pageShareData.imgUrl = this.shareData.pro_images[0]
          this.pageShareData.link = configHTMLURL+'?#/sharePreview?projectId='+ this.itemId;
      },
      chatShareHideAction(){
        this.chatShareShow=false
      },
      initData(){
        const postData = {
          pid: this.itemId,
          offset:0,
          limit:10
        }
        projectproveAction(postData).then((res) => {
          if (res.stauts == 1) {
            this.proveInfo = res.data.list
            this.totalCount=res.data.total_num
          }
        })
      },
      infiniteHandler($state){
        const params = {
          pid: this.itemId,
          offset: Math.ceil(this.proveInfo.length/10-1) + 1,
          limit:10
        }
        projectproveAction(params).then((res) => {
          if (res.data.list.length) {
            this.proveInfo = this.proveInfo.concat(res.data.list);
            $state.loaded()
            if (Math.ceil(this.proveInfo.length / 10 )=== this.totalCount) {//总的页数
              $state.complete();
            }
          } else {
          $state.complete();
        }
        })
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
              shareTimesTotal({token:getToken(),project_id:_this.shareTimesID}).then((res)=>{})

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
              shareTimesTotal({token:getToken(),project_id:_this.shareTimesID}).then((res)=>{})
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
              shareTimesTotal({token:getToken(),project_id:_this.shareTimesID}).then((res)=>{})

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
              shareTimesTotal({token:getToken(),project_id:_this.shareTimesID}).then((res)=>{})

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
              shareTimesTotal({token:getToken(),project_id:_this.shareTimesID}).then((res)=>{})

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
  .confirmatory-wrapper{
    width: 100%;
    min-height: 30rem;
    padding-top: 1rem;
    padding-bottom: 4rem;
    @include bis('../../images/messagebg.png');
    .list-content{
      width: 90%;
      margin: auto;
      min-height: 20rem;
      padding: 1rem;
      background: #fff;
      @include borderRadius(0.8rem);
      .item-detail{
        width: 100%;
        min-height:5rem;
        border-bottom:1px solid #f4f4f4;
        padding-bottom:2rem;
        margin-top:1rem;
        .detail-title{
          height:2.5rem;
          li{
            p{
              img{
                @include widthAndHeight(2rem,2rem);
                border-radius: 50%;
                vertical-align: middle;
              }
              span{
                font-size:0.75rem;
                color:#353535;
                font-weight: bold;
              }
            }
          }
          .confirm-status{
            float: right;
            margin-top:0.5rem;
            p{
              font-size: 0.65rem;
              color:#757575;
              img{
                width: 2.7rem;
                height: 1rem;
                border-radius: 0;
                vertical-align: text-top;
              }
            }
          }
        }
        .word-box{
          width: 85%;
          min-height: 3rem;
          padding: 0.5rem;
          /*float: right;*/
          background: #f4f4f4;
          border-radius: 0.3rem;
          margin-left:1.5rem;
          p{
            font-size:0.6rem;
            color:#545352;
          }
        }
        .update-time{
          width:85%;
          float:right;
          margin-top:0.2rem;
          p{
            font-size:0.6rem;
            color:#adadad;
            text-align: left;
          }
        }

      }
      .item-detail:last-child{
        border-bottom: 0;
      }
      .list-nothing{
        padding-top:5rem;
        p{
          text-align: center;
          font-size:0.75rem;
          color:#ff6631;
          line-height:1.7;
          img{
            width: 5.6rem;
            height: 5.6rem;
          }
        }
      }

    }
    .invite-friends-prove{
      position: fixed;
      width: 100%;
      height: 3rem;
      bottom:0;
      z-index:200;
      background: #fff;
      padding-top:0.5rem;
      .help-action{
        @include widthAndHeight(12rem,2rem);
        @include bis('../../images/proveBtn.png');
        margin: auto;
        padding-top:0.3rem;
        p{
          font-size:1rem;
          color:#fff;
          font-weight: bold;
          text-align: center;
        }
      }
    }
  }

</style>
