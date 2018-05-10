<template>
  <div class="launch-wrapper">
    <template v-if="!myHelpedList">
      <nothing-content :nothingDesc="nothingDesc"></nothing-content>
    </template>
    <template v-else v-for="item in myHelpedList">
      <div class="project-list">
        <div @click="checkHelpItem(item)">
          <div class="help-status">
            <ul>
              <li>
                <template v-if="item.status==1">
                  <p>项目进行中</p>
                </template>
                <template v-if="item.status==2">
                  <p>筹款结束</p>
                </template>
                <template v-if="item.status==-1">
                  <p>已下架</p>
                </template>
                <template v-if="item.status==-2">
                  <p>已退款</p>
                </template>
              </li>
              <li>
                <p class="private-help">个人求助</p>
              </li>
            </ul>
          </div>
          <div class="private-item-info">
            <ul>
              <li>
                <img :src="item.image">
              </li>
              <li>
                <p>{{item.title}}</p>
                <p>目标<span class="need-money">{{item.amount}}</span>元<span style="margin-left: 0.4rem">已筹<span
                  class="need-money">{{item.borrow_amount}}</span>元</span>
                </p>
              </li>
            </ul>
          </div>
        </div>
        <!--按钮-->
        <div class="private-button-list">
          <div class="button-list-left">
            <p>累计捐款</p>
            <p>¥<span>{{item.money}}</span></p>
          </div>
          <div class="button-list-right" @click="shareForHelp(item)">
            <p>转发帮TA</p>
          </div>
        </div>
      </div>
    </template>

    <!--extend-->
    <div style="width: 100%;height: 3rem"></div>
    <message-tip :messageWord="messageWord" :messageShow="messageShow"></message-tip>
    <chat-share-mask v-show="chatShareShow" @chatShareHide="chatShareHideAction"></chat-share-mask>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import wx from 'weixin-js-sdk';
  import {weChatShareAction,shareTimesTotal} from '../../../api/getData';
  import nothingContent from '../../../components/nothing/nothing'
  import messageTip from '../../../components/common/messageTip';
  import {getToken} from '../../../utils/auth';
  import chatShareMask from '../../../components/common/weChatShareMask'
  import {configHTMLURL} from '../../../config/env';
  export default {
    data(){
      return {
        pageShareData: {//微信分享数据
          title: '',
          desc: '',
          link: '',
          imgUrl:''
        },
        chatShareShow:false,
        shareTimesID:'',//获取分享次数的id
        messageWord:'',
        messageShow:false,
        nothingDesc:'暂时没有帮助的项目'
      }
    },
    computed:{
      ...mapGetters(['myHelpedList'])
    },
    components:{
      chatShareMask,
      nothingContent,
      messageTip
    },
    methods:{
      shareForHelp(item){
        if (item.status == -3) {
          this.messageWord='该项目已被删除，不能转发筹款'
          this.messageShow = true
          return false
        }
        if (item.status == -1 || item.status == -2) {
          this.messageShow=true
          this.messageWord = '该项目已经下架'
          return false
        } else{
          this.pageShareData.link = ''
          this.chatShareShow = true;
          this.initWeChatShare(item.id)
          this.shareTimesID=item.id
          this.pageShareData.title = item.title
          this.pageShareData.desc = item.pro_remark
          this.pageShareData.imgUrl = item.image
          this.pageShareData.link = configHTMLURL+'?#/sharePreview?projectId=' + item.id;
//          this.pageShareData.link = configHTMLURL+'?#/sharePreview?projectId=' + item.id + '&shareToken=' + getToken()
        }
      },
      chatShareHideAction(){
        this.chatShareShow=false
      },
      checkHelpItem(item){
          if(item.status==-3){
              this.messageWord='该项目已经被发起者删除,不能查看详情哦'
              this.messageShow=true
              return false
          }
          if (item.status == -1 || item.status == -2) {
          this.messageShow=true
          this.messageWord = '该项目已经下架'
          return false
          } else{
            this.$router.push({path:'/sharePreview',query:{projectId:item.id}})
          }
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
  @import "../../../style/mixin.scss";
  .launch-wrapper{
    width:100%;
    .project-list{
      width:90%;
      min-height: 7rem;
      margin: auto;
      margin-top: 1rem;
      background: #fff;
      padding:0 0.6rem 3rem 0.6rem;
      @include borderRadius(0.5rem);
      -webkit-box-shadow: 0px 3px 9px #ababab;
      .help-status{
        float: right;
        li{
          p{
            text-align: center;
          @include sc(0.55rem,#fff);
          @include borderRadius(0.1rem);
            margin-right: 0.2rem;
            background: #ff6631;
            padding: 0 0.3rem;
          }
        .private-help{
          background: #8086ff;
        }
    }
  }
  /*项目信息*/
    .private-item-info{
      padding-top:1rem;
      li{
        img{
        @include widthAndHeight(2.5rem,2.5rem);
        @include borderRadius(50%);
        }
      }
      li:nth-child(2){
        margin-left:0.1rem;
        width:74%;
        p{
        @include sc(0.65rem,#7c7c7c);
          line-height:1.7;
          .need-money{
            @include sc(0.9rem,#ff6631);
            font-family: Knockout-lzhz;
            margin-left: 0.2rem;
          }
    }
    p:nth-child(1){
    @include sc(0.75rem,#333);
    }
  }

  }
  /*end*/
  .private-button-list{
    font-size:1rem;
    margin-top:3.5rem;
    width:100%;
    .button-list-left{
      float: left;
      font-size:1rem;
      p:nth-child(1){
        font-size:0.55rem;
        color:#7c7c7c;
      }
      p:nth-child(2){
        font-size:1rem;
        color:$fontSizeColorA;
        span{
          font-size:1.5rem;
          font-family: Knockout-lzhz;
        }
      }
    }
    .button-list-right{
      @include widthAndHeight(5rem,1.7rem);
      @include borderRadius(1rem);
      @include bis('../../../images/smbtn.png');
      color:#ffffff;
      text-align: center;
      float: right;
      padding-top: 0.25rem;
      p{
        font-weight:bold;
        font-size: 0.8rem;
      }
    }

  }
  /*private-button-list end*/

  }

  }


</style>
