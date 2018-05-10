<template>
  <div class="withdraw-wrapper">
    <template v-if="withDrawInfoFlag==1">
      <div class="withdraw-wrapper-top">
        <p class="withdraw-wrapper-title">可提现金额</p>
        <p class="withdraw-cash">
          <span>¥</span>
          {{totalInfo.borrow_amount||0.00}}
        </p>

        <div class="withdraw-card-box">
          <p>收款人银行卡账号</p>
          <div class="withdraw-card">
            <p>{{withdrawInfo.bank_name}}</p>
            <p>{{withdrawInfo.bank_number.slice(0,3)}}****{{withdrawInfo.bank_number.slice(-4)}}</p>
            <div class="card-owner">
              <p>{{withdrawInfo.withdraw_name}}</p>
            </div>
          </div>

          <div class="withdraw-warn">
            <p>1.当天申请提款平台需1-3个工作日审核；</p>
            <p>2.审核通过后次日平台放款，实际到账时间以银行为准；</p>
          </div>
        </div>
      </div>
    </template>
    <template v-if="withDrawInfoFlag==2">
      <div class="withdraw-wrapper-top">
        <div class="cash-nothing">
          <p><img src="../../images/kong.png"></p>
          <p>请完善提现信息哦</p>
        </div>
      </div>

    </template>
    <!--过度样式-->
    <div class="withdraw-cash-line"></div>
    <!--底部-->
    <div class="withdraw-wrapper-down">
      <p>手续费(试运营期间该费用由量子公益补贴)</p>
        <div class="fee-wrapper">
          <p>提现手续费</p>
          <p>0元</p>
        </div>
      <div class="fee-wrapper">
        <p></p>
        <p>共计：0元</p>
      </div>
    </div>
    <!--按钮-->
    <div class="withdraw-cash-btn" @click="cashWithdrawalAction">
        <div class="submit-area">
          <p>申请提现</p>
        </div>
    </div>
    <template v-if="withDrawInfoFlag==2">
      <div class="withdraw-cash-btn">
        <router-link :to="{path: '/accountInfo', query: {projectId: itemId}}">
          <div class="submit-area">
            <p>请完善申请提现信息</p>
          </div>
        </router-link>
      </div>
    </template>
    <message-tip :messageWord="messageWord" :messageShow="messageShow"></message-tip>
    <withdraw-box v-show="boxShow" :withdrawMessage="withdrawMessage" @messageTip="closeMessage"></withdraw-box>
    <withdraw-confirm v-show="confirmFlag" @closeAction="closeAction" @confirmAction="getWithdrawAction"></withdraw-confirm>
  </div>
</template>

<script>
  import {mapState,mapGetters} from 'vuex';
  import {getWithdrawInfo,cashWithdrawal} from '../../api/getData'
  import {getToken} from '../../utils/auth'
  import messageTip from '../../components/common/messageTip'
  import withdrawBox from '../../components/withdraw/withdrawTip'
  import withdrawConfirm from '../../components/withdraw/withdrawConfirm'

  export default {
    data(){
      return {
        itemId: this.$route.query.projectId,
        withdrawInfo: {},
        totalInfo:{},
        messageWord:'',//提示信息
        messageShow:false,
        withDrawInfoFlag:'',
        boxShow:false,
        withdrawMessage:'',
        confirmFlag:false
      }
    },
    mounted(){
        this.initWithDraw();
    },
    components:{
      messageTip,
      withdrawBox,
      withdrawConfirm
    },
    computed: {
    },
    methods: {
      initWithDraw(){
        const postData = {
          token: getToken(),
          project_id: this.itemId
        }
        getWithdrawInfo(postData).then((res) => {
          if(res.stauts==1){
            this.withDrawInfoFlag=1
            this.totalInfo=res.data
            this.withdrawInfo=res.data.withdrow_info
          }
          if(res.stauts==401){
              this.withDrawInfoFlag=2
          }
        })
      },
      closeMessage(){
        if (this.totalInfo.status > 0 && (this.totalInfo.project_audit_status == 0||this.totalInfo.project_audit_status==4)) {//项目资料未提交
          this.$router.push({path:'/patientInformation',query:{projectId:this.itemId}})
        }else{
          this.boxShow=false
        }
      },
      cashWithdrawalAction(){
        if (this.totalInfo.status > 0 && this.totalInfo.project_audit_status == 0) {//项目资料未提交
           this.withdrawMessage='您的项目资料尚未提交，提交审核成功后方可提现'
           this.boxShow=true
           return false
        }
        if (this.totalInfo.status > 0 && this.totalInfo.project_audit_status == 1) {//项目资料未提交
          this.withdrawMessage='您的项目资料正在审核，审核通过后方可提现'
          this.boxShow=true
          return false
        }
        if (this.totalInfo.status > 0 && this.totalInfo.project_audit_status == 4) {//项目被驳回
          this.withdrawMessage='您的项目资料审核审核失败，重新提交审核成功后方可提现'
          this.boxShow=true
          return false
        }

        else{
          this.confirmFlag=true
        }
      },
      getWithdrawAction(){
        if (!this.totalInfo.borrow_amount) {
          this.messageShow = true;
          this.messageWord = "金额为0元不能提现";
          return false;
        }
        const postData = {
          token: getToken(),
          project_id: this.itemId
        }
        cashWithdrawal(postData).then((res) => {
          if (res.stauts == 1) {
            this.messageShow = true;
            this.messageWord = res.msg;
            this.$router.push({path: '/process', query: {projectId: this.itemId}})
          }
          if (res.stauts == 400) {
            this.messageShow = true;
            this.messageWord = res.msg;
          }
        })
      },
      closeAction(){
        this.confirmFlag=false
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

  .withdraw-wrapper {
    width: 100%;
    height: 30rem;
    @include bis('../../images/messagebg.png');
    padding-top:1rem;
    .withdraw-wrapper-top{
      width: 90%;
      min-height: 10rem;
      border-top-left-radius: 0.5rem;
      border-top-right-radius: 0.5rem;
      background: #fff;
      margin: auto;
      padding:0.8rem 0;
      .cash-nothing{
        margin-top:2rem;
        p{
          text-align: center;
          font-size:0.75rem;
          color:#4c4c4c;
          img{
            width: 5.75rem;
            height: 5.75rem;
          }
        }
      }
      .withdraw-wrapper-title{
        text-align: center;
        font-size:0.9rem;
        color:#4f4f4f;
      }
      .withdraw-cash{
        text-align: center;
        font-family: Knockout-lzhz;
        color:$fontSizeColorA;
        font-size:2rem;
        span{
          font-size:1rem;
          font-weight:bold;
        }
      }
       /*end*/
      .withdraw-card-box{
        width:90%;
        margin: auto;
        p:nth-child(1){
          color:#4f4f4f;
          font-size:0.7rem;
        }
        .withdraw-card{
          margin-top: 0.3rem;
          @include widthAndHeight(100%,6rem)
          @include bis('../../images/cardbg.png');
          padding:0.8rem 1rem;
          p:nth-child(1){
            font-size:0.9rem;
            color:#fff8fa;
          }
          p:nth-child(2){
            font-size:1.5rem;
            color:#fff;
            font-family: Knockout-lzhz;

          }
          .card-owner{
            p{
              font-size:0.9rem;
              font-weight: bold;
              margin-top: 0.4rem;
            }
          }
        }
        .withdraw-warn{
          margin-top:0.5rem;
          p{
            font-size:0.55rem;
            color:#898989;
            line-height: 1.7;
          }
        }

      }

    }
    .withdraw-cash-line{
      @include widthAndHeight(90%,1rem);
      @include bis('../../images/col.png');
      margin: auto;
      margin-top: -1px;
    }
    .withdraw-wrapper-down{
      width: 90%;
      margin:auto;
      margin-top: -1px;
      border-bottom-left-radius: 0.5rem;
      border-bottom-right-radius: 0.5rem;
      min-height: 10rem;
      background:#fff;
      padding:0.8rem;
      p{
        font-size:0.65rem;
        color:#4f4f4f;
      }
      .fee-wrapper{
        width: 90%;
        height: 1rem;
        margin-top:0.5rem;
        p:nth-child(1){
          font-size:0.55rem;
          color:#898989;
          float: left;
        }
        p:nth-child(2){
          font-size:0.55rem;
          color:#898989;
          float: right;
        }

      }

    }
    .withdraw-cash-btn{
      position: fixed;
      bottom: 0;
      @include widthAndHeight(100%,3rem);
      box-shadow: 0px 0px 10px 0px #e5e5e5;
      background: #fff;
      .submit-area{
        @include widthAndHeight(12.5rem,2.2rem);
        @include bis('../../images/withdraw.png');
        margin: auto;
        margin-top: 0.4rem;
        p{
          text-align: center;
          font-size:1.1rem;
          color:#fff;
          padding-top: 0.3rem;
          font-weight: bold;
        }
      }
    }
    &:after{
       content: '';
       display: block;
       height: 4rem;
    }
  }

</style>
