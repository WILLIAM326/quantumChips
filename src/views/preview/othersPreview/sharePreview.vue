<template>
  <div>
    <swiper :options="swiperOption" class="swiper-box">
        <swiper-slide class="swiper-item">
          <preview-head></preview-head>
          <div class="next-step-arrow">
            <img src="../../../images/down.png">
          </div>
        </swiper-slide>
        <swiper-slide class="swiper-item second-content">
          <share-detail></share-detail>
          <div class="next-step-arrow">
            <img src="../../../images/down.png">
          </div>
        </swiper-slide>
        <!--证明材料-->
        <template v-if="shareAuth">
          <swiper-slide class="swiper-item">
            <material-certificate></material-certificate>
            <div class="next-step-arrow">
              <img src="../../../images/down.png">
            </div>
          </swiper-slide>
        </template>
        <swiper-slide class="swiper-item">
          <company-desc></company-desc>
        </swiper-slide>
    </swiper>
    <!--底部按钮-->
    <div class="list-button">
      <div class="button-item">
        <ul>
          <li @click="shareForHelp">
            <p>转发帮TA</p>
          </li>
          <li @click="helpAction">
            <p>帮助TA</p>
          </li>
        </ul>
      </div>
    </div>
    <chat-share-mask v-show="chatShareShow" @chatShareHide="chatShareHideAction"></chat-share-mask>
    <message-tip :messageWord="messageWord" :messageShow="messageShow"></message-tip>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import wx from 'weixin-js-sdk';
  import {swiper, swiperSlide} from 'vue-awesome-swiper';
  import previewHead from '../../preview/othersPreview/previewHead';
  import shareDetail from '../../preview/othersPreview/shareDetail';//分享详情
  import materialCertificate from '../../preview/othersPreview/materialCertificate';//资料证明
  import companyDesc from '../../preview/othersPreview/companyDesc';//公司描述
  import {getToken,setLocalStorageStore} from '../../../utils/auth'
  import chatShareMask from '../../../components/common/weChatShareMask'
  import {weChatShareAction,projectBasicInfoAction,ownLookAroundProject,shareTimesTotal} from '../../../api/getData';
  import {configHTMLURL} from '../../../config/env';
  import messageTip from '../../../components/common/messageTip';
  export default {
    name: 'mdcard',
    data() {
      return {
        swiperOption: {
          pagination: '.swiper-pagination',
//          direction: 'vertical',
          slidesPerView:1,
          spaceBetween: 0
        },
        chatShareShow:false,
        pageShareData: {//微信分享数据
          title: '',
          desc: '',
          link: '',
          imgUrl:''
        },
        shareData:{},//分享的数据
        itemId:this.$route.query.projectId,
        token:this.$route.query.shareToken,
        messageWord:'',
        messageShow:false
      }
    },
    components: {
      swiper,
      swiperSlide,
      previewHead,
      shareDetail,
      materialCertificate,
      companyDesc,
      chatShareMask,
      messageTip
    },
    computed: {
      ...mapGetters(['afterShareInfo','shareAndCollectionProcess','shareAuth'])
    },
    mounted(){
      this.initData();
      this.initShareData();
//      setLocalStorageStore("shareToken", this.token);//保存token
      setLocalStorageStore("shareProjectId", this.itemId);//保存分享的项目id
    },
    methods:{
        initData(){
          const postData={
            id:this.itemId,
//            token:this.token,
            extendRouter:this.$router
          }
          this.$store.dispatch('AFTER_SHARE_PROJECT_INFO',postData)
        },
        initShareData(){
          const postData = {
            project_id:this.itemId
//            token:this.token
          }
          this.$store.dispatch('MONEY_COLLECTION_PROCESS',postData)
        },
        helpAction(){
          if(this.afterShareInfo.projectinfo.status==2){//筹款结束
            this.messageShow=true
            this.messageWord='此项目筹款已结束'
            return false
          } else{
              this.$router.push({path: '/donation', query: {projectId:this.itemId}})
          }
        },
        shareForHelp(){
          this.pageShareData.link=''
          this.chatShareShow = true;
          this.initWeChatShare(this.itemId)
          this.pageShareData.title = this.shareAndCollectionProcess.title
          this.pageShareData.desc = this.shareAndCollectionProcess.pro_remark
          this.pageShareData.imgUrl = this.shareAndCollectionProcess.share_img
          this.pageShareData.link = configHTMLURL+'?#/sharePreview?projectId='+ this.itemId
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
                shareTimesTotal({token:_this.token,project_id:_this.itemId}).then((res)=>{
                })
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
                shareTimesTotal({token:_this.token,project_id:_this.itemId}).then((res)=>{

                })
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
                shareTimesTotal({token:_this.token,project_id:_this.itemId}).then((res)=>{})
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
                shareTimesTotal({token:_this.token,project_id:_this.itemId}).then((res)=>{})
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
                shareTimesTotal({token:_this.token,project_id:_this.itemId}).then((res)=>{})
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
  @import "../../../style/swiper.css";
  .swiper-box {
    width: 100%;
    height: 100%;
    margin: 0 auto;

  }
  .swiper-item {
    width: 100%;
    min-height: 30rem;
    text-align: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    @include bis('../../../images/messagebg.png');
    .next-step-arrow{
      position: fixed;
      top: 45%;
      right:-0.3rem;
      p{
        font-size: 0.7rem;
        color: #fff;
      }
      img{
        width: 1.2rem;
        height: 0.65rem;
        transform:rotate(-90deg);
      }
    }
  }
  .second-content{
    padding-bottom: 2rem;
  }
  .list-button{
    position: fixed;
    bottom:0;
    z-index: 1000;
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
        color:$fontSizeColorA;
        @include borderRadius(1rem);
        p{
          font-size:1.1rem;
          color: $fontSizeColorA;
          font-weight: bold;
        }
      }
      li:nth-child(2){
        @include bis('../../../images/smbtn.png');
        @include borderRadius(1rem);
        p{
          font-size:1.1rem;
          color: $fontSizeColorE;
          font-weight: bold;
        }
      }
    }
  }
</style>
