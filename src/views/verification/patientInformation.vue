<template>
  <div class="patient-information">
    <div class="information-head">
     <p>完善信息有利于尽快筹款,获得捐助者的信任</p>
     <p>*提示:以下信息用于审核，仅姓名会对外公开</p>
    </div>
    <div class="step-line"></div>

    <!--患者信息-->
    <div class="real-info">
      <div class="info-title">
         <p>患者信息</p>
      </div>
      <div class="real-name-area">
        <div class="area-left">
          <p>真实姓名</p>
        </div>
        <div class="area-right">
          <input type="text" v-model="patientName" maxlength="8" class="input-idcard" placeholder="与身份证一致，提升可信度">
        </div>
      </div>
      <!--选择证件类型-->
      <div class="choose-typeof-card">
        <div class="typeof-card-left">
          <p>证件类型</p>
        </div>

        <template v-for="(item,index) in chooseType">
          <div class="typeof-card-middle">
            <p @click="chooseItem(index,item)">
              <label class="check_user_list" :class="{userListSelectedColor:item.showFlag>=0}"></label>
              {{item.name}}
            </p>
          </div>
        </template>
      </div>
      <!--选择的证件类型-->
      <div class="real-name-area">
        <div class="area-left">
          <p>{{namePut}}</p>
        </div>
        <div class="area-right">
          <input type="text" class="input-idcard" v-model="valueCard" :placeholder="placeholder">
        </div>
      </div>
    </div>
    <div class="step-line"></div>

    <!--诊断信息-->
    <div class="real-info diagnosed-info">
      <div class="info-title">
        <p>诊断信息</p>
      </div>
      <div class="real-name-area">
        <div class="area-left">
          <p>所患疾病</p>
        </div>
        <div class="area-right">
          <input type="text" v-model="patientCase" maxlength="30" class="input-idcard" placeholder="填写所患疾病名称">
        </div>
      </div>


      <div class="real-name-area">
        <div class="area-left">
          <p>医院地址</p>
        </div>
        <div class="area-right"  @click='areaSeleted'>
          <input type="text" class="input-idcard" v-model="info.areaData" readonly placeholder="选择医院地址">
          <img src="../../images/black.png" class="chooseIcon">
        </div>
      </div>

      <div class="real-name-area">
        <div class="area-left">
          <p>医院名称</p>
        </div>
        <div class="area-right">
          <router-link to="/patientInformation/searchHos">
            <input type="text" class="input-idcard" v-model="resetHosName" readonly placeholder="请选择医院名称">
            <img src="../../images/black.png" class="chooseIcon">
          </router-link>
        </div>
      </div>
    </div>
    <!--提交按钮-->
    <div class="next-step">
      <div class="next-step-btn" @click="nextSubmit">
         <p>下一步提交资料</p>
      </div>
    </div>

    <m-area-picker :isPicker='isAreaPicker' :datakey='areaDataKey'
                   @confirm='areaPickerConfirm' @cancel="areaPickerCancel">
    </m-area-picker>
  <!--自路由-->
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>


    <!--信息提示框-->
    <message-tip :messageWord="messageWord" :messageShow="messageShow"></message-tip>
  </div>

</template>

<script>

  import mAreaPicker from '../../components/picker/area-picker';
  import {mapGetters} from 'vuex';
  import {setLocalStorageStore,getToken} from '../../utils/auth';
  import {postProjectVerify} from '../../api/getData';
  import messageTip from '../../components/common/messageTip';
  import {checkRealName,isSpace,checkIdCard,checkBirthCard} from '../../utils/validate';

  export default {
    data(){
      return {
        itemId: this.$route.query.projectId,
        chooseType: [{
          name: '身份证',
          showFlag: 1
        }, {
          name: '出生证明',
          showFlag: -1
        }],
        namePut: '身份证号',
        placeholder: '填写患者身份证号',
        cardType:'1',//输入的证件类型
        valueCard: '',//输入的值
        messageWord:'',//提示信息
        messageShow:false,
        patientName: '',//患者名字
        patientCase:'',//所患疾病
        isPicker: false, // 普通选择器显示或隐藏
        isDatePicker: false, // 时间选择器显示或隐藏
        isAreaPicker: false, // 地区选择器显示或隐藏
        valueKey: 'v', // 下拉框设置 value-key 属性来指定显示的字段名
        indexText: '贷款品种', // 选择器名称
        isSell: true,
        datakey: '', // 选择器结果赋值到对象的key值
        dateDatakey: 'dateTime',
        areaDataKey: 'areaData',
        slots: [],// slot 对象数组
        info: {
          dateTime: '',//时间
          areaData: ''//地区
        }
      }
    },
    components: {
      mAreaPicker,
      messageTip
    },
    mounted(){

    },
    computed: {
      ...mapGetters(['resetHosName'])
    },
    methods: {
      chooseItem(index){
        let _this = this;
        _this.chooseType.forEach(function (item) {
          item.showFlag = -1;
        });
        _this.chooseType[index].showFlag = 1;
        if (index == 0) {
          _this.cardType=1;
          _this.namePut = '身份证号';
          _this.placeholder = '填写患者身份证号';
        }
        if (index == 1) {
          _this.cardType=2;
          _this.namePut = '出生证编号';
          _this.placeholder = '填写患者出生证编号';
        }
      },
      areaSeleted() {
        this.isDatePicker = false;
        this.isAreaPicker = true;
      },
      areaPickerCancel() {
        this.isAreaPicker = false;
      },
      areaPickerConfirm(value, key) {
        this.isAreaPicker = false;
        this.info[key] = value.v;
      },
      nextSubmit(){
        if (!this.patientName) {
          this.messageShow = true;
          this.messageWord = "姓名不能为空";
          return false;
        }
        if(this.patientName&&isSpace(this.patientName)){
          this.messageShow = true;
          this.messageWord = "姓名不能为空格";
          return false;
        }
        if(this.patientName&&this.patientName.length<2){
          this.messageShow = true;
          this.messageWord = "姓名不能为一个字";
          return false;
        }
        if (this.patientName&&!checkRealName(this.patientName)) {
          this.messageShow = true;
          this.messageWord = "姓名只能为汉字";
          return false;
        }
        if(this.cardType==1){
          if (!this.valueCard) {
            this.messageShow = true;
            this.messageWord = "身份证号不能为空";
            return false;
          }
          if(this.valueCard&&isSpace(this.valueCard)){
            this.messageShow = true;
            this.messageWord = "身份证号不能为空格";
            return false;
          }
          if (this.valueCard&&!checkIdCard(this.valueCard)) {
            this.messageShow = true;
            this.messageWord = "请填写正确的身份证号";
            return false;
          }
        }
        if(this.cardType==2){
          if (!this.valueCard) {
            this.messageShow = true;
            this.messageWord = "出生证编号不能为空";
            return false;
          }
          if(this.valueCard&&isSpace(this.valueCard)){
            this.messageShow = true;
            this.messageWord = "出生证编号不能为空格";
            return false;
          }
          if (this.valueCard&&!checkBirthCard(this.valueCard)) {
            this.messageShow = true;
            this.messageWord = "请填写正确的出生证编号";
            return false;
          }
        }
        if (!this.patientCase) {
          this.messageShow = true;
          this.messageWord = "所患疾病不能为空";
          return false;
        }
        if(this.patientCase&&isSpace(this.patientCase)){
          this.messageShow = true;
          this.messageWord = "所患疾病不能为空格";
          return false;
        }
        if (!this.info.areaData) {
          this.messageShow = true;
          this.messageWord = "医院地址不能为空";
          return false;
        }
        if (!this.resetHosName) {
          this.messageShow = true;
          this.messageWord = "医院名称不能为空";
          return false;
        }

        const params = {
          token: getToken(),
          project_id: this.itemId,
          patient_name: this.patientName.trim(),
          patient_cert_type:this.cardType,
          patient_cert_number:this.valueCard,
          disease:this.patientCase,
          address:this.info.areaData,
          visiting_hospital:this.resetHosName
        }
        postProjectVerify(params).then((res)=>{
          if(res.stauts==1){
            setLocalStorageStore("patientName",this.patientName);
            this.messageShow = true;
            this.messageWord = res.msg;
            this.$store.commit('RETSET_HOS_NAME','')
            this.$router.push({path:'/evidenceUpload',query:{projectId:this.itemId}});
          }
          if(res.stauts==0){
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
  .patient-information{
    @include widthAndHeight(100%,32rem);
    @include bis('../../images/messagebg.png');
    padding-top:1rem;
    .information-head{
      width:94%;
      height: 3rem;
      background: #fff;
      margin: auto;
      border-top-left-radius: 0.8rem;
      border-top-right-radius: 0.8rem;
      padding:1rem 0.8rem;
      line-height:1.7;
      p:nth-child(1){
        font-size:0.6rem;
        color:#ff6631;
      }
      p:nth-child(2){
        font-size:0.5rem;
        color:#9d9d9d;
      }

    }
    .step-line{
      width: 94%;
      height: 1rem;
      margin: auto;
      @include bis('../../images/col.png');
    }
    .real-info{
      width:94%;
      height: 10rem;
      background: #fff;
      margin: auto;
      padding:1rem;
      .info-title{
        width:50%;
        height:1rem;
        border-left:5px solid #ff6631;
        padding-left:0.5rem;
        p{
          font-size:0.75rem;
          color:#353535;
        }

      }
      .real-name-area{
        width: 100%;
        height: 2rem;
        background: #f4f4f4;
        margin-top: 0.5rem;
        @include borderRadius(0.3rem);
        .area-left{
          float: left;
          width:30%;
          p{
            font-size:0.7rem;
            color:#4c4c4c;
            text-align: center;
            padding-top: 0.5rem;
          }
        }
        .area-right{
          float: right;
          width:70%;
          padding-right:0.5rem;
          .input-idcard{
            width: 90%;
            height:2rem;
            font-size:0.7rem;
            color:#4c4c4c;
            float: left;
            background: #f4f4f4;

          }
        }
      }
      /*end*/
      .choose-typeof-card{
        width: 100%;
        height: 2rem;
        bckground:#fff;
        margin-top: 0.5rem;
        @include borderRadius(0.3rem);
        .typeof-card-left{
          float: left;
          width:30%;
          p{
            font-size:0.7rem;
            color:#4c4c4c;
            text-align: center;
            padding-top: 0.5rem;
          }
        }
        .typeof-card-middle{
          @extend .typeof-card-left;

        }
        .typeof-card-right{
          @extend .typeof-card-left;
        }
      }
    }
    .check_user_list{
      border: 0.05rem solid #ff6631;
      padding: 0.3rem;
      display: inline-block;
      position: relative;
      border-radius: 50%;
      vertical-align: middle;
      background: #fff;
    &:after {
       content: '';
       width: 0.15rem;
       height: 0.3rem;
       border-right: 0.1rem solid #fff;
       border-bottom: 0.1rem solid #fff;
       -webkit-transform: rotate(40deg);
       transform: rotate(40deg);
       position: absolute;
       top: 0.05rem;
       left: .15rem;
       color: #44C278;
     }
    }
    .userListSelectedColor {
      background-color: #ff6631 !important;
      border-color: #ff6631 !important;
    }
    .chooseIcon{
      width: 0.3rem;
      height: 0.5rem;
      margin-top: 0.8rem;
    }
    .diagnosed-info{
      border-bottom-left-radius: 0.5rem;
      border-bottom-right-radius: 0.5rem;
      height: 11rem;
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
