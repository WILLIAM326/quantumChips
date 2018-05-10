<template>
   <!--本人上传证明材料-->
  <div class="evidence-upload-wrapper">
    <div class="evidence-content">
      <div class="evidence-head">
        <p>
          患者{{storeName}}手持身份证照片
        </p>
        <div class="self-upload-area">
          <template v-if="!selfHandImage">
            <div class="upload-note" :style="{'background-image': 'url(' + backgroundImg + ')'}">
              <!--<img src="../../images/s1.png">-->
            </div>
          </template>
          <template v-else>
            <div class="upload-note" :style="{'background-image': 'url(' + selfHandImage + ')'}">
              <!--<img :src="selfHandImage">-->
            </div>
          </template>
          <upload-images></upload-images>
        </div>
        <div class="word-warn">
          <p>*身份证上的所有信息必须可见，必须能看清楚身份证号</p>
        </div>
      </div>
      <!--上传照片区域-->
      <div class="friendly-tip">
        <p>医疗证明(上传的越多有利于获得更多的捐助)</p>
      </div>
      <div class="upload-content" v-for="item in hospitalProof">
        <template>
          <div class="list-img" :style="{'background-image': 'url(' + item.url + ')'}">
              <!--<img :src="item.url">-->
          </div>
        </template>
        <upload-images :item="item"></upload-images>
      </div>
      <!--客服电话-->
      <service-phone></service-phone>
    </div>
    <!--content end-->

    <!--提交按钮-->
    <div class="next-step">
      <div class="next-step-btn" @click="nextSubmit">
        <p>确认提交</p>
      </div>
    </div>
    <message-tip :messageWord="messageWord" :messageShow="messageShow"></message-tip>
    <send-success-box v-show="dataObj.successBox" @closeTip="dataObj.successBox=false" @shareForHelp="shareForHelpAction" :dataObj="dataObj"></send-success-box>
    <chat-share-mask v-show="chatShareShow" @chatShareHide="shareHide"></chat-share-mask>
    <!--content end-->
    <load-animate v-show="proofLoadingFlag"></load-animate>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {getLocalStorageStore,getToken} from '@/utils/auth';
  import chatShareMask from '../../components/common/weChatShareMask'
  import loadAnimate from '../../components/common/loadingAnimate'
  import uploadImages from '../../components/upload/upload';
  import servicePhone from '../../components/servicePhone/service';
  import messageTip from '../../components/common/messageTip';
  import sendSuccessBox  from '../../components/common/sendSuccess';
  import {weChatShareAction,shareTimesTotal,projectBasicInfoAction,authUploadAction} from '../../api/getData';
  import wx from 'weixin-js-sdk';
  import {configHTMLURL} from '../../config/env';
  import Img from '../../images/s1.png'

  export default {
        data(){
            return{
              selfImg:'',
              itemId:this.$route.query.projectId,
              storeName:getLocalStorageStore("patientName"),
              messageWord:'',//提示信息
              messageShow:false,
              chatShareShow:false,
              backgroundImg:Img,//背景图片
              dataObj:{
                statusId:'',
                projectId:'',
                successBox:false,//发送成功提示弹窗
              },
              postData:{//图片上传路径
                token:getToken(),
                project_id:this.$route.query.projectId,
                hand_idcard_image:'',
                diagnosis_result_pic:'',
                charge_note_pic:'',
                case_pic:'',
                inspection_report_pic:'',
                hostpital_certificate_pic:'',
                other_pic:''
              },
              shareTimesID:'',//获取分享次数的id
              pageShareData: {//微信分享数据
                title: '',
                desc: '',
                link: '',
                imgUrl:''
              }
            }
        },
        computed:{
          ...mapGetters(['selfHandImage','hospitalProof','proofLoadingFlag'])
        },
        mounted(){
        },
        components:{
          uploadImages,
          servicePhone,
          messageTip,
          sendSuccessBox,
          loadAnimate,
          chatShareMask
        },
        methods:{
          nextSubmit(){
            if (!this.selfHandImage) {
              this.messageShow = true;
              this.messageWord = "请上传手持照片";
              return false;
            }else{
              this.postData.hand_idcard_image=this.selfHandImage
              for (let j = 0; j < this.hospitalProof.length; j++) {
                if (this.hospitalProof[j].url.indexOf('static/img/') < 0) {
                  switch (j) {
                    case 0:
                      this.postData.diagnosis_result_pic=this.hospitalProof[j].url
                      break;
                    case 1:
                      this.postData.charge_note_pic=this.hospitalProof[j].url
                      break;
                    case 2:
                      this.postData.case_pic=this.hospitalProof[j].url
                      break;
                    case 3:
                      this.postData.inspection_report_pic=this.hospitalProof[j].url
                      break;
                    case 4:
                      this.postData.hostpital_certificate_pic=this.hospitalProof[j].url
                      break;
                    case 5:
                      this.postData.other_pic=this.hospitalProof[j].url
                      break;
                  }
                }
              }
              authUploadAction(this.postData).then((res) => {
                if (res.stauts == 1) {
                  this.dataObj.successBox=true
                  this.dataObj.statusId=1
                  this.dataObj.projectId=this.itemId
                }
                if(res.stauts==0){
                  this.messageShow=true
                  this.messageWord=res.msg
                }
              })
            }
          },
          shareHide(){
            this.chatShareShow = false;
          },
          shareForHelpAction(){
            const postData = {
              token: getToken(),
              project_id: this.itemId
            }
            projectBasicInfoAction(postData).then((res)=>{
              if(res.stauts==1){
                this.chatShareShow = true
                this.pageShareData.link=''
                this.dataObj.successBox=false
                this.initWeChatShare(this.itemId)
                this.shareTimesID=this.dataObj.projectId
                this.pageShareData.title = res.data.title
                this.pageShareData.desc = res.data.pro_remark
                this.pageShareData.imgUrl = res.data.pro_images[0]
                this.pageShareData.link = configHTMLURL+'?#/sharePreview?projectId='+ this.itemId
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
  .evidence-upload-wrapper{
    width: 100%;
    min-height:40rem;
    padding-top:1rem;
    padding-bottom: 5rem;
    @include bis('../../images/messagebg.png');
    .evidence-content{
      width:90%;
      margin: auto;
      background:#fff;
      min-height:15rem;
      padding-bottom:1rem;
      @include borderRadius(0.5rem);
      .evidence-head{
        width: 100%;
        min-height:10rem;
        border-bottom:1px dotted #9d9d9d;
        padding:1rem;
        p{
          font-size:0.7rem;
          color:$fontSizeColorA;
        }
        .self-upload-area{
          width: 100%;
          height: 7rem;
          margin-top: 0.5rem;
          position:relative;
          @include borderRadius(0.5rem);
          .upload-note{
            width:100%;
            height: 7rem;
            position:relative;
            background-size:cover;
            background-position: center;
            background-repeat: no-repeat;
            border-radius: 0.5rem;
            /*img{*/
              /*max-width:100%;*/
              /*max-height: 7rem;*/
              /*@include borderRadius(0.5rem);*/
            /*}*/
          }

        }
        .word-warn{
          margin-top:0.5rem;
          p{
            font-size:0.55rem;
            color:#9d9d9d;
          }
        }
      }
      .friendly-tip{
        width: 90%;
        margin: auto;
        margin-top:0.8rem;
        p{
          font-size:0.65rem;
          color: #ff6631;
        }
      }
      /*上传图片区域*/
      .upload-content{
        width:100%;
        height: 7rem;
        padding:0 5%;
        margin-top:0.6rem;
        position: relative;
        .list-img{
          width: 100%;
          height:7rem;
          border-radius:0.5rem;
          background-size: cover;
          background-repeat: no-repeat;
          -webkit-box-shadow:0px 3px 9px #ababab;
          /*img{*/
            /*max-width: 100%;*/
            /*max-height: 7rem;*/
            /*border-radius: 0.5rem;*/
          /*}*/
        }
      }
    }


    .next-step{
        position: fixed;
        bottom: 0;
        -webkit-box-shadow: 0px 0px 10px 0px #e5e5e5;
        box-shadow: 0px 0px 10px 0px #e5e5e5;
        background: #ffffff;
        width: 100%;
        height: 3.5rem;
        .next-step-btn{
          @include widthAndHeight(70%,2.3rem);
          @include bis('../../images/send.png');
            margin: auto;
            margin-top: 0.6rem;
            p{
              text-align: center;
              font-size:1rem;
              color:#fff;
              font-weight: bold;
              padding-top: 0.4rem;
            }
        }
    }

  }

</style>
