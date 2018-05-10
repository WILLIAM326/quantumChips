<template v-cloak>
  <div class="helper-wrapper">
    <div class="line"></div>
    <div class="helper-list">
      <div class="helper-head">
        <p>帮助我的人</p>
      </div>
    </div>

    <template v-if="!donationData.info.length">
      <nothing-area :nothingDesc="nothingDesc"></nothing-area>
    </template>
    <template v-else>
      <div class="helper-list-item">
        <ul>
          <template v-for="(item,key) in donationData.info">
            <li>
              <div class="helper-list-top">
                <div class="helper-list-top-left">
                  <p>
                    <img :src="item.head_img">
                    <span>{{item.name|optimize}}</span>
                    <span>帮助了</span>
                    <span class="money-number">{{item.money}}元</span>
                  </p>
                </div>
                <div class="helper-list-top-right">
                  <p>{{item.pay_time}}</p>
                </div>
              </div>

              <template v-if="item.message">
                <div class="helper-list-down">
                  <p>
                    {{item.message}}
                  </p>
                </div>
              </template>
            </li>
          </template>

          <!--下拉刷新组件-->
          <infinite-loading @infinite="infiniteHandler" spinner="bubbles" ref="infiniteLoading">
            <!--<span slot="no-more">没有更多消息了</span>-->
          </infinite-loading>

        </ul>
      </div>
    </template>
    <div style="width: 100%;height: 3rem;"></div>
    <!--底部按钮-->
    <div class="list-button">
      <div class="button-item">
        <ul>
          <li>
            <router-link :to="{ path: '/projectManage', query: {projectId: projectPreviewInfo.id }}">
             <p>项目管理</p>
            </router-link>
          </li>
          <li @click="shareForHelp">
            <p>转发筹款</p>
          </li>
        </ul>
      </div>
    </div>
    <share-mask v-show="chatShareShow" @chatShareHide="chatShareHideAction"></share-mask>
    <chat-share-mask v-show="chatShareShow" @chatShareHide="chatShareHideAction"></chat-share-mask>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import InfiniteLoading from 'vue-infinite-loading';
  import {donationListAction,shareTimesTotal} from '../../../api/getData';
  import {formatDate} from '../../../utils/tools';
  import wx from 'weixin-js-sdk';
  import chatShareMask from '../../../components/common/weChatShareMask'
  import {configHTMLURL} from '../../../config/env';
  import {getToken} from '../../../utils/auth';
  import {weChatShareAction} from '../../../api/getData'
  import nothingArea from '../../../components/nothing/nothing'

  export default {
    data(){
      return {
        itemId: this.$route.query.projectId,
        chatShareShow: false,
        showAlert:false,
        nothingDesc:'暂时没有人帮助你哦',
        pageShareData: {//微信分享数据
          title: '',
          desc: '',
          link: '',
          imgUrl:''
        }
      }
    },
    components: {
      InfiniteLoading,
      chatShareMask,
      nothingArea
    },
    mounted: function () {

    },
    computed:{
      ...mapGetters(['projectPreviewInfo','donationData','shareAndCollectionProcess'])
    },
    methods: {
      initShareData(){
          const postData={
              token:getToken(),
              project_id:this.projectPreviewInfo.id
          }
          this.$store.dispatch('MONEY_COLLECTION_PROCESS',postData)
      },
      infiniteHandler($state) {
        const params = {
          pid: this.itemId,
          offset: Math.ceil(this.donationData.info.length/ 10-1) + 1,
          limit:10
        }
        donationListAction(params).then((res) => {
          if (res.data.data.length) {
            this.donationData.info = this.donationData.info.concat(res.data.data);
            $state.loaded()
            if (Math.ceil(this.donationData.info.length / 10) === this.donationData.count) {//总的页数
              $state.complete();
            }
          } else {
            $state.complete();
          }
        })
      },
      shareForHelp(){
        this.pageShareData.link=''
        this.chatShareShow = true;
        this.initWeChatShare(this.projectPreviewInfo.id)
        this.pageShareData.title = this.shareAndCollectionProcess.title
        this.pageShareData.desc = this.shareAndCollectionProcess.pro_remark
        this.pageShareData.imgUrl = this.shareAndCollectionProcess.pro_images[0]
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
              shareTimesTotal({token:getToken(),project_id:_this.projectPreviewInfo.id}).then((res)=>{})
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
              shareTimesTotal({token:getToken(),project_id:_this.projectPreviewInfo.id}).then((res)=>{})
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
              shareTimesTotal({token:getToken(),project_id:_this.projectPreviewInfo.id}).then((res)=>{})
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
              shareTimesTotal({token:getToken(),project_id:_this.projectPreviewInfo.id}).then((res)=>{})
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
              shareTimesTotal({token:getToken(),project_id:_this.projectPreviewInfo.id}).then((res)=>{})
            },
            cancel: function () {
            }
          });
        });
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
  @import "../../../style/mixin.scss";
  .helper-wrapper{
    .line{
      width: 100%;
      height: 0.5rem;
      background: #f4f4f4;
      display:-webkit-box;
    }
    .helper-list{
      width: 90%;
      margin: auto;
      padding:1rem 0;
      .helper-head{
        width: 50%;
        padding:0.1rem 0;
        border-left: 4px solid #ee6631;
        p{
          font-size:0.75rem;
          color:#353535;
          padding-left: 0.3rem;
          font-weight: bold;
        }
      }

    }
    .helper-list-item{
      width:100%;
      li:last-child{
        border-bottom: 0;
      }
      li{
        width: 100%;
        min-height: 3rem;
        padding: 1rem;
        border-bottom: 1px solid #f4f4f4;
        .helper-list-top{
          width: 100%;
          height: 2rem;
          .helper-list-top-left{
            float: left;
            p{
              font-size:0.7rem;
              color:#4c4c4c;
            }
            img{
              @include widthAndHeight(1.6rem,1.6rem);
              @include borderRadius(50%);
              vertical-align: middle;
            }
            .money-number{
              color:$fontSizeColorA;
            }
          }
          .helper-list-top-right{
            float: right;
            p{
              font-size:0.6rem;
              color:#808080;
              margin-top: 0.3rem;
            }
          }
        }
        /*helper-list-top end*/
        .helper-list-down{
          width:90%;
          min-height: 2rem;
          padding: 0.7rem;
          background: #f4f4f4;
          float: right;
          @include borderRadius(0.5rem);
          p{
            font-size:0.625rem;
            color:#898989;
            line-height: 1.7;
          }
        }
        /*helper-list-bottom end*/
      }
    }
    .list-button{
      position: fixed;
      bottom:0;
      @include widthAndHeight(100%,3rem);
      box-shadow: 0px 0px 10px 0px #e5e5e5;
      background: #fff;
      .button-item{
        width: 90%;
        margin: auto;
        padding-top:0.5rem;
        li{
          width:45%;
          height: 2rem;
          text-align: center;
          padding-top: 0.2rem;
          margin-left: 0.3rem;
        }
        li:nth-child(1){
          border: 1px solid $fontSizeColorA;
          @include borderRadius(1rem);
          p{
            font-size:1.1rem;
            color: $fontSizeColorA;
            font-weight: bold;
          }
        }
        li:nth-child(2){
          @include bis('../../../images/smbtn.png');
          margin-left: 0.7rem;
          @include borderRadius(1rem);
          p{
            font-size:1.1rem;
            color: $fontSizeColorE;
            font-weight: bold;
          }
        }
      }
    }
  }
</style>
