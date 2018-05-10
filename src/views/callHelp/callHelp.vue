<template>
  <div>
    <!--金额输入-->
    <div class="input-cash-number">
      <div class="cash-area">
        <input type="tel" v-model="cashTotal=totalEditBaseInfo.amount" maxlength="7" placeholder="请输入筹款金额">
        <div class="rmb-smybol" v-show="rmbFlag">
          <p>元</p>
        </div>
      </div>
    </div>
    <!--标题输入-->
    <div class="input-tittle-wrapper">
      <div class="cash-area">
        <p class="collect-title">筹款标题<span @click="caseReference">参考示例</span></p>
        <input type="text" v-model="collectTitle=totalEditBaseInfo.title" maxlength="20" placeholder="好的标题筹款更快(不超过20字)">
      </div>
      <prompt-box v-show="showAlert" @closeTip="showAlert=false" :dataObjArr="dataObjArr" v-if="dataObjArr"></prompt-box>
    </div>
    <!--求助说明-->
    <div class="input-tittle-wrapper">
      <div class="help-instructions" v-show="somethingToSay">
        <p>不得出现任何联系方式和银行卡等收款信息，包括但不限于手机号码、微信号、支付宝账号、银行卡号等信息，否则项目验证和提现申请均不予通过。</p>
      </div>
      <div class="cash-area">
        <p class="collect-title">求助说明<span @click="instruct">参考示例</span></p>
        <textarea v-model="inputInstructions=totalEditBaseInfo.pro_remark" @focus="focusAction" maxlength="400" :placeholder="instructPlaceholder"></textarea>
      </div>
      <prompt-box v-show="showAlert2" @closeTip="showAlert2=false" :dataObj="dataObj" v-if="dataObj"></prompt-box>
    </div>

    <!--图片添加上传-->
    <upload-pic @updateImg="updateImgAction"></upload-pic>

    <!--我的宣言-->
    <div class="announce-content">
      <div class="announce-title">
        <p>我承诺</p>
      </div>
      <!--承诺诺言-->
      <div>
        <!--诺言不存在-->
        <template v-if="!editBaseInfoFlag">
          <div class="announce-wrapper" v-for="item in promiseList">
            <div class="announce-left" @click="choosePromise(item)">
              <p>
                <label class="check_user_list" :class="{'userListSelectedColor':item.flag}"></label>
                <span>{{item.title.slice(0,7)}}</span>
              </p>
            </div>
            <div class="announce-right">
              <p>{{item.content}}</p>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="announce-wrapper" v-for="item in promiseList=totalEditBaseInfo.promise_list">
            <div class="announce-left" @click="choosePromise(item)">
              <p>
                <label class="check_user_list" :class="{'userListSelectedColor':item.flag}"></label>
                <span>{{item.title.slice(0,7)}}</span>
              </p>
            </div>
            <div class="announce-right">
              <p>{{item.content}}</p>
            </div>
          </div>
        </template>

        <template v-if="!editBaseInfoFlag">
          <div class="promise-area">
            <textarea v-model="promiseWord" maxlength="20" :placeholder="desPlaceholder"></textarea>
          </div>
        </template>
        <template v-else>
          <div class="promise-area">
            <textarea v-model="promiseWord=totalEditBaseInfo.promise_content" maxlength="20" :placeholder="desPlaceholder"></textarea>
          </div>
        </template>
      </div>
    </div>

    <div class="agreement-info">
      <p>
        <img src="../../images/right.png">
        <span>
          已阅读并同意<span @click="regulationsAction">《公益众筹发起条款》</span>及<span @click="promiseAction">《求助人行为规则》</span>
        </span>
      </p>

    </div>

    <div class="call-server">
      <ul>
        <li class="server-line"></li>
        <li style="width:40%"><p>如有疑问，请咨询</p></li>
        <li class="server-line"></li>
      </ul>
    </div>
    <div class="call-phone">
      <a href="tel:400-900-8690">
        <p>400-900-8690</p>
      </a>
    </div>
    <div class="send-to-Help">
      <div class="send-btn" @click="sendMessage">
        <p>提交</p>
      </div>
    </div>
    <send-success-box v-show="successBox" @closeTip="successBox=false" :dataObj="dataObj"></send-success-box>
    <message-tip :messageWord="messageWord" :messageShow="messageShow"></message-tip>
    <agreement v-show="agreementShow" :agreementData="agreementData" @goback="closeBack"></agreement>
  </div>

</template>

<script>
  import {mapGetters} from 'vuex'
  import promptBox from '../../components/common/promptBox';//文本提示框
  import uploadPic  from '../../views/callHelp/uploadpic';
  import sendSuccessBox  from '../../components/common/sendSuccess';
  import messageTip from '../../components/common/messageTip';
  import {crowdFundingAction,getAgreementAction,initPromise} from '../../api/getData';
  import {getToken} from '../../utils/auth';
  import agreement from '../../views/agreement/agreement';

  export default {
    data(){
      return{
        projectId:this.$route.query.projectId,
        cashTotal:'',//筹款金额
        collectTitle:'',//筹款标题
        inputInstructions:'',//输入的求助说明
        successBox:false,//发送成功提示弹窗
        showAlert:false,//显示框
        showAlert2:false,//显示框判断条件
        rmbFlag:false,//显示框判断条件
        dataObj: {
          statusId: '',
          projectId: '',
          infoTitle: '',
          alertText: ''
        },
        promiseList:[],
        desPlaceholder:'说出您的宣言，让爱播撒到更多的地方',
        instructPlaceholder:"您填写的内容将自动保存，请放心填写。请详细填写筹款原因、筹款目的、自身状况和善款用途等信息。（以200-400字为宜）",
        dataObjArr:{
          infoTitle:'好标题，会加快筹款',//标题
          infoArr:[{
            example:'示例1',
            text1:'26岁的年轻生命就要说再见，',
            text2:'请大家帮帮他'
          },{
            example:'示例2',
            text1:'XX县XX村张三移植急需帮助，',
            text2:'请大家施以援助！'
          },{
            example:'示例3',
            text1:'山区支教20年，今患肝癌无钱医，',
            text2:'请大家帮助他渡过难关！'
          }]
        },
        messageWord:'',//提示信息
        messageShow:false,
        somethingToSay:false,
        updateImgLen:'',//上传图片的长度个数
        promiseId:'',
        chooseIdAction:'',//选择的id
        storeImg:[],//要上传的图片
        promiseWord:'',//输入的宣言
        countClick:0,
        agreementShow:false,
        agreementData:{}
      }
    },
    components:{
      uploadPic,
      sendSuccessBox,
      messageTip,
      agreement,
      promptBox
    },
    computed:{
      ...mapGetters(['totalEditBaseInfo','alreadyChooseID','editBaseInfoFlag','choosePromiseIndex'])
    },
    mounted(){
      this.initPromiseList()//初始化协议
      this.initEditData()//初始化要编辑的信息
    },
    methods:{
      initPromiseList(){
        const token = getToken()
        initPromise(token).then((res) => {
          if (res.stauts == 1) {
            this.promiseList = res.data
          }
        })
      },
      instruct(){
        this.showAlert2=true;
        this.dataObj.infoTitle='突出真实性和关键信息';
        this.dataObj.alertText='示例:我叫某某，今年几岁，家住某省某市某区，从事什么职业，月收入多少钱。在某年某月某日出现哪些症状，到某医院进行检查，确诊为某疾病。治疗预计花费多少钱，还差多少钱........最后感谢大家的帮助';
      },
      focusAction(){
        this.somethingToSay=true;
      },
      choosePromise(item){
        if (this.totalEditBaseInfo.promise_list) {
          this.totalEditBaseInfo.promise_list.forEach((index) => {
            index.flag = false
          })
        } else {
          this.promiseList.forEach((index) => {
            index.flag = false
          })
        }
        item.flag = true
        this.chooseIdAction = item.id
      },
      initEditData(){
        if(this.projectId){//有ID才会去获取，没有就不会获取
          const postData = {
            token:getToken(),
            project_id:this.projectId
          }
          this.$store.dispatch('PROJECT_BASIC_INFO',postData)
          this.storeImg=this.totalEditBaseInfo.pro_images
        }
      },
      //众筹协议
      regulationsAction(){
          this.agreementShow=true
          this.agreeMentAction('welfare_agreement')
      },
      promiseAction(){
        this.agreementShow=true
        this.agreeMentAction('recourse_agreement')
      },
      agreeMentAction(params){
        const poststr=params
        getAgreementAction(poststr).then((res)=>{
          if(res.stauts==1){
            this.agreementData=res.data
            this.agreementShow=true
          }
        })
      },
      closeBack(){
        this.agreementShow=false
      },
      caseReference(){
        this.showAlert=true;
      },
      sendMessage(){
        if (!this.cashTotal) {
          this.messageShow = true;
          this.messageWord = "金额不能为空";
          return false;
        }
        if(this.cashTotal>1000000){
          this.messageShow = true;
          this.messageWord = "金额最多为100万";
          return false;
        }
        if(this.cashTotal.indexOf('.')>-1){
          this.messageShow = true;
          this.messageWord = "申请筹款金额只能为整数";
          return false;
        }
        if (!this.collectTitle) {
          this.messageShow = true;
          this.messageWord = "筹款标题不能为空";
          return false;
        }
        if(!this.inputInstructions){
          this.messageShow = true;
          this.messageWord = "请输入求助说明";
          return false;
        }
        if(this.inputInstructions&&this.inputInstructions.length<10){
          this.messageShow = true;
          this.messageWord = "求助说明不能少于10个字";
          return false;
        }
        if(!this.updateImgLen){
          this.messageShow = true;
          this.messageWord = "请上传图片";
          return false;
        }
        if (this.alreadyChooseID) {//编辑项目的时候已经存在的id
          this.promiseId = this.alreadyChooseID
        }
        if(this.chooseIdAction){
          this.promiseId=this.chooseIdAction
        }
        if(!this.promiseId){
          this.messageShow = true;
          this.messageWord = "承诺不能为空";
          return false;
        }
        else {
          this.countClick++
          const data = {
            token: getToken(),
            title: this.collectTitle,
            amount: this.cashTotal,
            pro_remark: this.inputInstructions,
            img_list: this.storeImg,
            promise_id: this.promiseId,
            promise_content: this.promiseWord,
            project_id:this.projectId
          }
          if (this.countClick == 1) {
            crowdFundingAction(data).then((res) => {
              if (res.stauts == 1) {
                this.countClick=0;
                this.successBox = true;
                this.dataObj.statusId = 2;
                this.dataObj.projectId = res.data.project_id;//项目id
              }
            })
          }
        }
      },
      updateImgAction(value,storeImg){
          this.updateImgLen=value;
          this.storeImg=storeImg;
      }
    },
    watch:{
      'messageShow'(){
        setTimeout(()=>{
          this.messageShow=false;
        },1500)
      },
      'cashTotal'(val){
          if(val){
              this.rmbFlag=true
          }else{
            this.rmbFlag=false
          }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/mixin.scss";
  .agreement-info{
    width:80%;
    margin:auto;
    margin-top:0.6rem;
    img{
      width:0.75rem;
      height: 0.75rem;
      vertical-align: middle;
    }
    p{
      font-size:0.55rem;
      color:$fontSizeColorG;
    }

  }
  .call-server{
    width: 90%;
    margin: auto;
    margin-top:0.5rem;
    li{
      margin-left: 0.3rem;
    }
    .server-line{
      width:25%;
      height: 1px;
      background:#d5d5d5;
      margin-top: 0.5rem;
    }
    p{
      font-size:0.6rem;
      color:#6d6d6d;
      text-align: center;
    }
  }
  .call-phone{
    margin-top:1.5rem;
    p{
      font-size: 1rem;
      color:$fontSizeColorF;
      text-align: center;
      font-family: Knockout-lzhz;
    }
    &:after{
      content:'';
      display: block;
      height:4rem;
     }
  }
  .send-to-Help{
    position: fixed;
    bottom: 0;
    box-shadow: 0px 0px 10px 0px #e5e5e5;
    background: $fontSizeColorE;
    @include widthAndHeight(100%,3rem);
    .send-btn{
      @include widthAndHeight(70%,2.1rem);
      @include bis('../../images/send.png');
      margin: auto;
      margin-top: 0.5rem;
      p{
        font-size:1.1rem;
        color: $fontSizeColorE;
        text-align: center;
        font-weight: bold;
        padding-top: 0.2rem;
      }
    }

  }
  .announce-content{
    width:90%;
    margin: 1rem auto;
    .announce-title{
      p{
        color: #8086ff;
        font-size: 0.75rem;
        margin-top: 0.5rem;
      }
    }
  }
  /*输入姓名*/
  .input-cash-number{
    @include widthAndHeight(100%,6rem)
    @include bis('../../images/blue.png');
    .cash-area{
      @include widthAndHeight(90%,3.7rem);
      margin:auto;
      input{
        width: 100%;
        height: 100%;
        font-size:1.6rem;
        @include borderRadius(0.5rem);
        margin-top:1rem;
        color:#ff6631;
        position: relative;
        font-family: Knockout-lzhz;
        text-align: center;
        padding:0 1rem;
        &::-webkit-input-placeholder{
         color: $fontSizeColorD;
         font-size:1rem;
        }
      }
      .rmb-smybol{
        position: absolute;
        top:2.5rem;
        right:4rem;
        p{
          font-size: 0.8rem!important;
          color:#ff6631!important;
        }
      }
    }
  }
  /*标题输入*/
  .input-tittle-wrapper{
    width:90%;
    margin:auto;
    .cash-area{
      width:100%;
      .collect-title{
        color: $fontSizeColorF;
        font-size:0.75rem;
        margin-top:0.5rem;
        span{
        color:$fontSizeColorG;
        font-size:0.55rem;
        border-bottom: 1px solid #636363;
        margin-left: 0.5rem;
        }
      }
      input{
      width: 100%;
      height:2rem;
      font-size:0.7rem;
      background: #f4f4f4;
      @include borderRadius(0.3rem);
      margin-top:0.5rem;
      text-align: left;
      padding:0 0.7rem;
        &::-webkit-input-placeholder{
         color: $fontSizeColorD;
        }

      }
    }

  }
  /*求助说明*/
  .input-tittle-wrapper{
    width:90%;
    margin:auto;
    .help-instructions{
      margin-top:0.5rem;
      p{
        color: $fontSizeColorA;
        font-size:0.6rem;
      }
    }
    .cash-area{
      width:100%;
      .collect-title{
        color: $fontSizeColorF;
        font-size:0.75rem;
        margin-top:0.5rem;
      span{
        color:$fontSizeColorG;
        font-size:0.55rem;
        margin-left: 0.5rem;
      }
    }
    textarea{
      width: 100%;
      min-height:7rem;
      font-size:0.7rem;
      background: #f4f4f4;
      @include borderRadius(0.3rem);
      margin-top:0.5rem;
      text-align: left;
      padding:0.8rem;
      &::-webkit-input-placeholder{
       color: $fontSizeColorD;
      }

    }
  }

  }
  .announce-wrapper{
    width:100%;
    min-height:1.5rem;
    padding-top:0.5rem;
  .announce-left{
    float: left;
    width:45%;
  .check_user_list {
    border: 0.05rem solid #ff6631;
    padding: 0.35rem;
    display: inline-block;
    position: relative;
    border-radius: 50%;
    vertical-align: middle;
    background: #fff;
  }
  .check_user_list:after {
    content: '';
    width: 0.2rem;
    height: 0.35rem;
    border-right: 0.1rem solid #fff;
    border-bottom: 0.1rem solid #fff;
    -webkit-transform: rotate(40deg);
    transform: rotate(40deg);
    position: absolute;
    top: 0.07rem;
    left: .2rem;
  }
  .userListSelectedColor{
    background-color: #ff6631 !important;
    border-color: #ff6631 !important;
  }
  span{
    font-size:0.75rem;
    color:#4c4c4c;
    font-weight: bold;
  }
  }
  .announce-right{
    float: right;
    width: 55%;
  p{
    font-size:0.6rem;
    color:#858585;
    padding-top: 0.4rem;
  }
  }
  }
  .promise-area{
    width: 100%;
  textarea{
    width: 100%;
    min-height:7rem;
    font-size:0.7rem;
    background: #f4f4f4;
  @include borderRadius(0.3rem);
    margin-top:0.5rem;
    text-align: left;
    padding:0.8rem;
  &::-webkit-input-placeholder{
     color: $fontSizeColorD;
   }

  }
  }

</style>
