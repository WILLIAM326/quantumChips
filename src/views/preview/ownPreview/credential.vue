<template>
  <div class="credential-wrapper">
    <div class="line"></div>
    <div class="credential-detail">
      <div class="credential-head">
        <p>证明材料</p>
      </div>
      <!--没有证明材料的时候-->
      <template v-if="JSON.stringify(patientInfo) == '{}'">
        <div class="credential-info">
          <p><img src="../../../images/card.png"></p>
          <p>为了尽快获得筹款，增强捐助者</p>
          <p>对您的信任，</p>
          <p>请尽快完成项目验证噢</p>
        </div>
        <template v-if="projectPreviewInfo.status>0&&projectPreviewInfo.project_audit_status==2">
          <div class="send-credential" @click="allowAccess">
            <!--<router-link :to="{path:'/patientInformation',query:{projectId:itemId}}">-->
            <p>提交验证资料</p>
            <!--</router-link>-->
          </div>
        </template>

        <template v-else>
          <div class="send-credential" @click="verifing">
            <!--<router-link :to="{path:'/patientInformation',query:{projectId:itemId}}">-->
            <p>提交验证资料</p>
            <!--</router-link>-->
          </div>
        </template>
      </template>

      <!--有证明材料的时候-->
      <template v-else>
        <div class="info-list">
          <ul>
            <li><p>患者</p></li>
            <li><p>{{patientInfo.patient_name}}</p></li>
          </ul>
        </div>
        <div class="info-list">
          <ul>
            <li><p>所患疾病</p></li>
            <li><p>{{patientInfo.disease}}</p></li>
          </ul>
        </div>
        <div class="info-list" v-if="patientInfo.withdraw_name">
          <ul>
            <li><p>收款人</p></li>
            <li>
              <p>{{patientInfo.withdraw_name}}
                <span v-if="patientInfo.cash_people=1">本人</span>
                <span v-if="patientInfo.cash_people=2">直系亲属</span>
              </p>
            </li>
          </ul>
        </div>

        <div class="info-status">
          <p>
            <img src="../../../images/red.png">
            <span>患者身份证明已审核</span>
          </p>
          <p>
            <img src="../../../images/red.png">
            <span>患者疾病诊断证明已审核</span>
          </p>
          <p>
            <img src="../../../images/red.png">
            <span>诊断医院：{{patientInfo.visiting_hospital}}</span>
          </p>
          <template v-if="patientInfo.withdraw_name">
            <p>
              <img src="../../../images/red.png">
              <span>收款人身份证明已审核</span>
            </p>
            <p>
              <img src="../../../images/red.png">
              <span>收款人与患者的关系证明已审核</span>
            </p>
          </template>
        </div>
      </template>

      <!--sdfsd-->
      <div class="credential-commitment">
        <div class="commitment-up">
          <ul>
            <router-link :to="{ path: '/myPromise',query:{projectId:this.$route.query.projectId}}">
              <li>
                <p>发起人承诺书</p>
              </li>
              <li>
                <p>查看<img src="../../../images/arrow.png"></p>
              </li>
            </router-link>
          </ul>
        </div>
        <div class="commitment-down">
          <div class="commitment-down-left">
            <img src="../../../images/warn.png">
          </div>
          <div class="commitment-down-right">
            <p>该项目信息不属于慈善公开捐助信息，真实性由发布个人负责，xx筹提醒您了解后再帮助TA</p>
          </div>

        </div>
      </div>
    </div>
    <project-status v-show="statusShow" @emitAction="closeStatusShow" :processData="processData" :processObj="processObj"></project-status>
  </div>
</template>

<script>
   import {mapGetters} from 'vuex'
   import {returnItemAction} from '../../../api/getData'
   import {getToken} from '../../../utils/auth'
   import projectStatus from '../../../views/projectStatus/projectStatus'
   import messageTip from '../../../components/common/messageTip'

   export default {
        data(){
            return{
              itemId:this.$route.query.projectId,
              processData:[],
              statusShow:false,
              messageWord:'',//提示信息
              messageShow:false,
              processObj:{
                itemId: this.$route.query.projectId,
                processDesc:'',
                itemFlag:''//进程状态判断
              }
            }
        },
        computed:{
          ...mapGetters(['patientInfo','projectPreviewInfo'])
        },
       components: {
         projectStatus,
         messageTip
       },
        methods:{
          verifing(){//审核中、验证中
            if (this.projectPreviewInfo.status > 0 && this.projectPreviewInfo.project_audit_status == 0) {
              this.$router.push({path: '/patientInformation', query: {projectId: this.itemId}})
            }
            if (this.projectPreviewInfo.status > 0 && this.projectPreviewInfo.project_audit_status == 4) {
              //项目验证失败
              this.statusShow = true
              this.processObj.processDesc = '失败原因'
              this.processObj.itemFlag = 1//验证失败
              this.itemInfoList()
            }
            if (this.projectPreviewInfo.status > 0 && this.projectPreviewInfo.project_audit_status == 1) {
              this.statusShow = true
              this.processObj.processDesc = '验证资料'
              this.processObj.itemFlag = 2//验证中
              this.itemInfoList()
            }
          },
          itemInfoList(){//获取项目进程的接口
            const postData = {
              token: getToken(),
              project_id: this.processObj.itemId
            }
            returnItemAction(postData).then((res)=>{
              if(res.stauts==1){
                this.processData=res.data
              }
            })
          },
          closeStatusShow(){
            this.statusShow=false
          },
          allowAccess(){
            this.messageShow = true
            this.messageWord = '项目审核已经通过'
          },
          closeMask(){
            this.messageCancelShow = false
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
      padding-top:1rem;
      .credential-head{
        width: 100%;
        padding:0.1rem 0;
        border-left: 4px solid #ee6631;
        p{
          font-size:0.75rem;
          color:#353535;
          padding-left: 0.3rem;
          font-weight: bold;
        }
      }
      .credential-info{
        margin-top:1.3rem;
        p{
          text-align: center;
          font-size:0.75rem;
          color:$fontSizeColorA;
          line-height:1.7;
          img{
            @include widthAndHeight(4.7rem,.4.7rem);
          }
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
      .credential-commitment{
        width: 100%;
        margin: 1rem auto;
        min-height: 5rem;
        background: #f4f4f4;
        padding:0.8rem;
        @include borderRadius(0.5rem);
        .commitment-up{
          width: 100%;
          height: 1.5rem;
          border-bottom: 1px solid #ddd;
          li{
            float: left;
            p{
              font-size:0.55rem;
              color:$fontSizeColorL;
            }
          }
          li:nth-child(2){
            float: right;
            p{
              color:$fontSizeColorA;
            }
            img{
              @include widthAndHeight(0.3rem,0.5rem);
              vertical-align: middle;
              margin-left: 0.3rem;
            }
          }
        }
        .commitment-down{
          @extend .commitment-up;
          border: 0;
          height: 2.5rem;
          .commitment-down-left{
            float: left;
            width:7%;
            img{
              width: 0.75rem;
              height: 0.65rem;
            }
          }
          .commitment-down-right{
            float: right;
            width:93%;
            p{
              font-size:0.5rem;
              color:#808080;
              padding-top:0.4rem;
            }
          }
        }
      }
      .info-list{
        width: 100%;
        height: 2rem;
        background: #f4f4f4;
        margin-top: 0.8rem;
        @include borderRadius(0.3rem);
        li:nth-child(1){
          float: left;
          width: 25%;
          p{
            font-size:0.75rem;
            color: #3f3f3f;
            font-weight: bold;
            padding-top: 0.5rem;
            padding-left: 0.5rem;
          }
        }
        li:nth-child(2){
          @extend li:nth-child(1);
          width:75%;
          p{
            font-weight: normal;
            font-size:0.7rem;
          }
        }
      }
      .info-status{
        width: 90%;
        margin: auto;
        p{
          img{
            @include widthAndHeight(0.6rem,0.6rem);
            vertical-align: middle;
          }
          span{
            font-size:0.6rem;
            color:$fontSizeColorA;
            margin-left: 0.3rem;
          }
        }
      }

    }
  }

</style>
