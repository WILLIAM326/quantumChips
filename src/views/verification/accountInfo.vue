<template>
  <div class="account-wrapper">
    <div class="account-content">
      <div class="account-head">
        <div class="account-head-title">
          <p>与患者的关系</p>
        </div>
        <div class="choose-relationship">
          <ul>
            <li @click="gotoAddress('/accountInfo')" :class="{'link-active-color':selfColorFlag}">
              <p>本人</p>
            </li>
            <li @click="gotoAddress('/accountInfo/relatices')" :class="{'link-active-color':activeColorFlag}">
              <p>亲属</p>
            </li>
          </ul>
          <p class="warm-tip">*提示:以下信息用于审核，仅姓名会对外公开</p>
        </div>
      </div>

      <!--收款人信息-->
      <div class="payee-information">
        <div class="account-head-title">
          <p>收款人信息</p>
        </div>

        <div class="account-realname">
          <div class="account-realname-left">
            <p>真实姓名</p>
          </div>
          <div class="account-realname-right">
            <input type="text" v-model="payeeName" placeholder="与身份证一致，提升可信度">
          </div>
        </div>
        <!--身份证-->
        <div class="account-realname">
          <div class="account-realname-left">
            <p>身份证号</p>
          </div>
          <div class="account-realname-right">
            <input type="text" v-model="idCardNumber" maxlength="18" placeholder="以备后续申请筹款提现">
          </div>
        </div>
      </div>
    </div>
    <div class="step-line"></div>
    <!--开户银行-->
    <div class="bank-info">
        <div class="payee-information">
          <div class="account-realname" @click='chooseBank'>
            <div class="account-realname-left">
              <p>开户银行</p>
            </div>
            <div class="account-realname-right">
              <input type="text" v-model="bankname" readonly placeholder="请选择(仅限储蓄卡)">
            </div>
          </div>
          <!--银行卡号-->
          <div class="account-realname">
            <div class="account-realname-left">
              <p>银行卡号</p>
            </div>
            <div class="account-realname-right">
              <input type="text" maxlength="19" v-model="bankCardID" placeholder="填写收款人的银行卡号">
            </div>
          </div>
        </div>
    </div>
    <div class="step-line"></div>

    <div class="check-bank-info">
      <div class="bank-phone-info">
        <div class="bank-phone-info-left">
          <p>手机号码</p>
        </div>
        <div class="bank-phone-info-right">
          <input type="text" v-model="mobilePhone" placeholder="填写银行预留手机号">
        </div>
      </div>
      <!--验证码-->
      <div class="bank-identifying">
        <div class="bank-identifying-left">
           <p>验证码</p>
        </div>

        <div class="bank-identifying-middle">
          <input type="text" v-model="verifyCode" placeholder="填写验证码">
        </div>

        <div class="bank-identifying-right" v-show="verCodeShow" @click="getVerifycode">
          <div class="identifying-click">
            <p>获取验证码</p>
          </div>
        </div>

        <div class="bank-identifying-right" v-show="!verCodeShow">
          <div class="identifying-click count-down-color">
            <p>{{count}}s</p>
          </div>
        </div>


      </div>
    </div>

    <!--确认提交按钮-->
    <div class="confirm-bank" @click="confirmSubmit">
      <div class="confirm-bank-submit">
          <p>确认提交</p>
      </div>
    </div>
    <m-picker :slots='slots' :isPicker='isPicker' :indexText='indexText'
              :datakey='datakey' :valueKey='valueKey'
              @confirm='pickerConfirm' @cancel='pickerCancel'>
    </m-picker>

    <!--自路由-->
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>

    <message-tip :messageWord="messageWord" :messageShow="messageShow"></message-tip>
  </div>

</template>

<script>
  import {mapGetters} from 'vuex'
  import mPicker from '../../components/picker/index';
  import {withdrawlAction} from '../../api/getData';
  import {getToken} from '../../utils/auth';
  import messageTip from '../../components/common/messageTip';
  import {isSpace,checkRealName,checkMobile,checkIdCard,checkBankCard} from '../../utils/validate';
//  import {sendMessageAction} from '../../api/getData';
  import {getVercode} from '../../api/login';

  export default {
        data(){
            return{
              itemId:this.$route.query.projectId,
              isPicker: false, // 普通选择器显示或隐藏
              valueKey: 'v', // 下拉框设置 value-key 属性来指定显示的字段名
              indexText: '贷款品种', // 选择器名称
              datakey: '', // 选择器结果赋值到对象的key值
              typeOfRealation:'1',//默认的关系：本人1
              payeeName:'',//收款人姓名
              idCardNumber:'',//身份证号
              bankCardID:'',//银行卡号
              mobilePhone:'',//手机号
              verifyCode:'',//验证码
              messageWord:'',//提示信息
              messageShow:false,
              verCodeShow:true,
              count: '',
              timer:null,//默认倒数30秒
              slots: [], // slot 对象数组
              info: {
                loanBreed: '',
                loanPlan: '',
                dateTime: '',
                areaData: ''
              },
              bankname:'',
              activeColorFlag:false,
              selfColorFlag:true,
              postData:{}//提交的数据
            }
        },
        components:{
          mPicker,
          messageTip
        },
        created() {
          this.slots = [{values: []}];
        },
        computed:{
          ...mapGetters(['withdrawMutualPhotoes'])
        },
        mounted(){
//          this.gotoAddress(this.$route.path)
        },
        methods:{
          chooseBank(){
            this.isPicker = true;
            this.datakey = 'loanPlan';
            this.indexText = '银行名称';
            this.slots = [{
              values: [
                {k: '1', v: '招商银行'},
                {k: '2', v: '中国工商银行'},
                {K: '3', v: '中国农业银行'},
                {K: '4', v: '中国建设银行'},
                {K: '5', v: '中国银行'},
                {K: '6', v: '浦发银行'},
                {K: '7', v: '交通银行'},
              ]
            }];
          },
          pickerConfirm(value, key) {
            this.isPicker = false;
            this.bankname = value[this.valueKey];
          },
          pickerCancel() {
            this.isPicker = false;
          },
          gotoAddress(path){
            this.$router.push({path:path,query:{projectId:this.itemId}});
            if (path == '/accountInfo') {
              this.selfColorFlag = true;
              this.activeColorFlag = false;
              this.typeOfRealation = 1;
            }
            if (path == '/accountInfo/relatices') {
              this.selfColorFlag = false;
              this.activeColorFlag = true;
              this.typeOfRealation = 2;
              this.withdrawMutualPhotoes=this.withdrawMutualPhotoes
            }
          },
          getVerifycode(){
            if (!this.mobilePhone) {
              this.messageShow = true;
              this.messageWord = "手机号不能为空";
              return false;
            }
            if (this.mobilePhone && !checkMobile(this.mobilePhone)) {
              this.messageShow = true;
              this.messageWord = "请输入正确的手机号";
              return false;
            }else{
              this.countDown();
              const sendData={
                token:getToken(),
                mobile:this.mobilePhone
              }
              getVercode(sendData).then(((res)=>{
                if(res.stauts=='1'){
                  this.messageShow = true;
                  this.messageWord = res.msg;
                }
              }))
            }
          },
          countDown(){
            if (!this.timer) {
              const TIME_COUNT = 60;
              this.count = TIME_COUNT;
              this.verCodeShow = false;
              this.timer = setInterval(() => {
                if (this.count > 0 && this.count <= TIME_COUNT) {
                  this.count--;
                } else {
                  this.verCodeShow = true;
                  clearInterval(this.timer);
                  this.timer = null;
                }
              }, 1000)
            }
          },
          confirmSubmit(){
            if (!this.payeeName) {
              this.messageShow = true;
              this.messageWord = "姓名不能为空";
              return false;
            }
            if(this.payeeName&&isSpace(this.payeeName)){
              this.messageShow = true;
              this.messageWord = "姓名不能为空格";
              return false;
            }

            if(this.payeeName&&!checkRealName(this.payeeName)){
              this.messageShow = true;
              this.messageWord = "姓名只能为中文";
              return false;
            }
            if (!this.idCardNumber) {
              this.messageShow = true;
              this.messageWord = "身份证号不能为空";
              return false;
            }
            if(this.idCardNumber&&isSpace(this.idCardNumber)){
              this.messageShow = true;
              this.messageWord = "姓名不能为空格";
              return false;
            }
            if(this.idCardNumber&&!checkIdCard(this.idCardNumber)){
              this.messageShow = true;
              this.messageWord = "请填写正确的身份证号";
              return false;
            }
            if(!this.bankname){
              this.messageShow = true;
              this.messageWord = "请选择银行";
              return false;
            }
            if(!this.bankCardID){
              this.messageShow = true;
              this.messageWord = "银行卡号不能为空";
              return false;
            }
            if(this.bankCardID&&isSpace(this.bankCardID)){
              this.messageShow = true;
              this.messageWord = "银行卡号不能为空格";
              return false;
            }
            if(this.bankCardID&&!checkBankCard(this.bankCardID)){
              this.messageShow = true;
              this.messageWord = "请输入正确的银行卡号";
              return false;
            }
            if(!this.mobilePhone){
              this.messageShow = true;
              this.messageWord = "手机号不能为空";
              return false;
            }
            if (this.mobilePhone && !checkMobile(this.mobilePhone)) {
              this.messageShow = true;
              this.messageWord = "请输入正确的手机号";
              return false;
            }
            if(!this.verifyCode){
              this.messageShow = true;
              this.messageWord = "短信验证码不能为空";
              return false;
            }
            if(this.typeOfRealation==1){//本人
              this.postData = {
                token:getToken(),
                project_id:this.itemId,
                type: this.typeOfRealation,
                name: this.payeeName,
                card_id: this.idCardNumber,
                bank_name: this.bankname,
                bank_card: this.bankCardID,
                mobile: this.mobilePhone,
                verify_code: this.verifyCode
              }
            }
            if(this.typeOfRealation==2){//亲属
              this.postData.token = getToken()
              this.postData.project_id = this.itemId
              this.postData.type = this.typeOfRealation
              this.postData.name = this.payeeName
              this.postData.card_id = this.idCardNumber
              this.postData.bank_name = this.bankname
              this.postData.bank_card = this.bankCardID
              this.postData.mobile = this.mobilePhone
              this.postData.verify_code = this.verifyCode
              for (let j = 0; j < this.withdrawMutualPhotoes.length; j++) {
                if (this.withdrawMutualPhotoes[j].uploadPhoto.indexOf('static/img/') < 0) {
                  switch (j) {
                    case 0:
                      this.postData.card_image=this.withdrawMutualPhotoes[j].uploadPhoto
                      break;
                    case 1:
                      this.postData.register_home=this.withdrawMutualPhotoes[j].uploadPhoto
                      break;
                    case 2:
                      this.postData.register_index=this.withdrawMutualPhotoes[j].uploadPhoto
                      break;
                    case 3:
                      this.postData.receiver_home=this.withdrawMutualPhotoes[j].uploadPhoto
                      break;
                    case 4:
                      this.postData.receiver_index=this.withdrawMutualPhotoes[j].uploadPhoto
                      break;
                    case 5:
                      this.postData.other_certify=this.withdrawMutualPhotoes[j].uploadPhoto
                      break;
                  }
                }
              }
            }
            withdrawlAction(this.postData).then((res)=>{
                if(res.stauts==1){
                  this.messageShow = true;
                  this.messageWord = res.msg;
                  this.$router.push({path:'/withdraw',query:{projectId:this.itemId}})
                }
                if(res.stauts==400){
                  this.messageShow = true;
                  this.messageWord = res.msg;
                }
            })
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
  .account-wrapper{
    width: 100%;
    min-height: 30rem;
    @include bis('../../images/messagebg.png');
    padding-top:1rem;
    padding-bottom:4rem;
    .account-content{
      width: 92%;
      min-height: 10rem;
      margin: auto;
      padding: 1rem;
      background: #fff;
      border-top-left-radius: 0.5rem;
      border-top-right-radius: 0.5rem;
      .account-head{
        .account-head-title{
          width:100%;
          height: 1.3rem;
          border-left: 0.25rem solid #ff6631;
          p{
            font-size:0.75rem;
            color:#353535;
            font-weight: bold;
            padding-top: 0.1rem;
            padding-left: 0.3rem;
          }
        }
        .choose-relationship{
          padding:0.5rem;
          li{
            width: 47%;
            height: 1.5rem;
            border: 1px solid #ff6631;
            @include borderRadius(0.3rem);
            margin-right: 0.3rem;
            color:#ff6631;
            p{
              text-align: center;
              font-size:0.75rem;
              font-weight: bold;
              padding-top:0.15rem
            }
          }
          .warm-tip{
            font-size:0.55rem;
            color: #9d9d9d;
            margin-top:2rem;
          }

        }

      }
      /*end*/
      .payee-information{
        .account-head-title{
          width:100%;
          height: 1.3rem;
          border-left: 0.25rem solid #ff6631;
          p{
            font-size:0.75rem;
            color:#353535;
            font-weight: bold;
            padding-top: 0.1rem;
            padding-left: 0.3rem;
          }
        }
        .account-realname{
          width: 100%;
          height: 2rem;
          background: #f4f4f4;
          @include borderRadius(0.3rem);
          margin-top:0.6rem;
          .account-realname-left{
            float: left;
            width: 25%;
            p{
              font-size:0.7rem;
              color:#4c4c4c;
              padding-left: 0.2rem;
              padding-top: 0.5rem;
            }
          }
          .account-realname-right{
            float: right;
            width: 75%;
            input{
              width:100%;
              height:2rem;
              background:#f4f4f4;
              border-radius:0.3rem;
              padding-top:0.1rem;
              padding-left:0.2rem;
              font-size:0.75rem;
              &::-webkit-input-placeholder{
                 color: #bcbcbc;
                 font-size:0.7rem;
              }
            }

          }

        }

      }

    }
    .confirm-bank{
      width: 100%;
      height: 3rem;
      background: #fff;
      position: fixed;
      bottom:0;
      z-index:10;
      box-shadow: 0px 0px 10px 0px #e5e5e5;
      .confirm-bank-submit{
        @include widthAndHeight(70%,2.3rem);
        @include bis('../../images/send.png');
        margin: auto;
        margin-top: 0.3rem;
        p{
          text-align: center;
          font-size:1rem;
          color:#fff;
          font-weight: bold;
          padding-top: 0.4rem;
        }
      }
    }
  /*银行信息*/
    .bank-info{
      @extend .account-content;
      border-radius: 0;
      margin-top: -1px;
      min-height: 4rem;
    }
    /*银行信息*/
    .check-bank-info{
      width: 90%;
      min-height: 4rem;
      margin: auto;
      margin-top: -1px;
      background: #fff;
      padding: 1rem;
      border-bottom-left-radius: 0.5rem!important;
      border-bottom-right-radius: 0.5rem!important;
      .bank-phone-info{
        width: 100%;
        height: 2rem;
        background: #f4f4f4;
        border-radius: 0.3rem;
        .bank-phone-info-left{
          width: 30%;
          float:left;
          p{
            font-size:0.7rem;
            color:#4c4c4c;
            padding-top: 0.6rem;
            padding-left: 0.2rem;
          }
        }
        .bank-phone-info-right{
          width: 70%;
          float:right;
          input{
            width:100%;
            height:2rem;
            background:#f4f4f4;
            border-radius:0.3rem;
            padding-top:0.1rem;
            padding-left:0.2rem;
            font-size:0.75rem;
            &::-webkit-input-placeholder{
               color: #bcbcbc;
               font-size:0.7rem;
             }
            }

        }
      }
      .bank-identifying{
        width: 100%;
        height: 2rem;
        background: #f4f4f4;
        border-radius: 0.3rem;
        margin-top: 0.5rem;
        .bank-identifying-left{
          float: left;
          width: 30%;
          p{
            font-size:0.7rem;
            color:#4c4c4c;
            padding-top: 0.6rem;
            padding-left: 0.3rem;
          }
        }
        .bank-identifying-middle{
          @extend .bank-identifying-left;
          width:35%;
          input{
            width:100%;
            height:2rem;
            background:#f4f4f4;
            border-radius:0.3rem;
            padding-top:0.1rem;
            padding-left:0.2rem;
            font-size:0.75rem;
            &::-webkit-input-placeholder{
               color: #bcbcbc;
               font-size:0.7rem;
             }
            }
          }

        }
        .bank-identifying-right{
          float: right;
          width: 35%;
          padding:0 0.3rem;
          .identifying-click{
            width: 100%;
            height: 1.4rem;
            border: 1px solid #8086ff;
            border-radius: 0.3rem;
            padding-top:0.25rem;
            margin-top:0.4rem;
            p{
              font-size:0.55rem;
              color: #8086ff;
              text-align: center;
            }
          }
        }

      }
    .step-line{
      width: 90%;
      height: 1rem;
      margin: auto;
      margin-top: -1px;
      @include bis('../../images/col.png');
    }
    .link-active-color{
      background: #ff6631;
      color: #fff!important;
    }
    .count-down-color{
      background: #f4f4f4;
      border: 1px solid #f4f4f4;
    }

  }

</style>
