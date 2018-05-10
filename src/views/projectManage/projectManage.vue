<template>
  <div class="project-manage">
    <div class="project-manage-wrapper">
      <div class="project-manage-head">
        <p>项目管理</p>
      </div>
      <div class="project-info">
        <p></p>
        <p>筹款截止日期：{{projectManageData.end_time}}</p>
      </div>

      <!--中间部分，项目验证-->
      <template v-if="projectManageData.status>0&&projectManageData.project_audit_status==4">
        <div class="content-center">
          <p>
            <span>¥</span>&nbsp;
            {{projectManageData.borrow_amount}}</p>
          <p>项目验证失败</p>
          <p class="fail-reason" @click="checkFailReason">失败原因</p>
        </div>
      </template>
      <!--提示做项目验证-->
      <template v-if="projectManageData.status>0&&projectManageData.project_audit_status==0">
        <div class="content-center">
          <p><span>¥</span>&nbsp;{{projectManageData.borrow_amount}}</p>
          <p>您还未提交验证，审核成功后，可进行提现</p>
        </div>
        <router-link :to="{ path: '/patientInformation', query: {projectId: processObj.itemId }}">
          <div class="send-process">
            <p>提交验证</p>
          </div>
        </router-link>
      </template>

      <template v-if="projectManageData.status>0&&projectManageData.project_audit_status==1">
        <div class="content-center">
          <p><span>¥</span>&nbsp;{{projectManageData.borrow_amount}}</p>
        </div>
          <div class="send-process" @click="verifing">
            <p>验证中</p>
          </div>
      </template>

      <template v-if="projectManageData.status>0&&projectManageData.project_audit_status==2">
        <div class="content-center">
          <p><span>¥</span>&nbsp;{{projectManageData.borrow_amount}}</p>
          <p>审核通过</p>
        </div>
        <div class="send-process" v-if="projectManageData.cash_status==0">
          <router-link :to="{ path: '/withdraw', query: {projectId: processObj.itemId }}">
            <p>提现</p>
          </router-link>
        </div>
        <div class="send-process" v-if="projectManageData.cash_status==4" @click="withdrawProcess">
          <!--<router-link :to="{ path: '/accountInfo', query: {projectId: processObj.itemId }}">-->
            <p>提现</p>
          <!--</router-link>-->
        </div>
        <div class="send-process" v-if="projectManageData.cash_status==1||projectManageData.cash_status==2||projectManageData.cash_status==3">
          <router-link :to="{ path: '/process', query: {projectId: processObj.itemId }}">
            <p>提现</p>
          </router-link>
        </div>
      </template>

      <div style="margin-top: 0.8rem">
        <fund-process></fund-process>
      </div>
      <item-list></item-list>
    </div>
    <div class="clearfix"></div>
    <div class="white-line"></div>
    <div class="line"></div>
    <project-review></project-review>
    <div class="line"></div>
    <item-info></item-info>

    <project-status v-show="statusShow" @emitAction="closeStatusShow" :processData="processData" :processObj="processObj"></project-status>
  </div>

</template>

<script>
  import {mapGetters} from 'vuex';
  import {getToken} from '../../utils/auth';
  import fundProcess from '../../components/fundProcess/fundProcess';
  import itemList from '../../views/projectManage/itemList';
  import projectReview from '../../views/projectManage/review';
  import itemInfo from '../../views/projectManage/itemInfo';
  import {returnItemAction,withDrawCashStatus} from '../../api/getData'
  import projectStatus from '../../views/projectStatus/projectStatus'

  export default {
    data(){
      return {
        processData:[],
        statusShow:false,
        processObj:{
          itemId: this.$route.query.projectId,
          processDesc:'',
          itemFlag:''//进程状态判断
        }
      }
    },
    computed: {
      ...mapGetters(['projectManageData'])
    },
    components: {
      fundProcess,
      itemList,
      projectReview,
      itemInfo,
      projectStatus
    },
    mounted(){
        this.initData()
        this.$nextTick(() => {//解决ios白屏问题
          window.scrollTo(0, 1)
          window.scrollTo(0, 0)
        })
    },
    methods:{
      initData(){
        const postData = {
          token: getToken(),
          project_id: this.processObj.itemId
        }
        this.$store.dispatch("PROJECT_MANAGE", postData)
      },
      closeStatusShow(){
          this.statusShow=false
      },
      withdrawProcess(){
        this.statusShow=true
        this.processObj.processDesc='申请提现进度'
        this.processObj.itemFlag=3//申请被驳回
        this.getWithDrawProcess()
      },
      getWithDrawProcess(){//获取提现进度状态
        const postData = {
          token: getToken(),
          project_id: this.processObj.itemId
        }
        withDrawCashStatus(postData).then((res) => {
          if (res.stauts == 1) {
            this.processData = res.data
          }
        })
      },
      checkFailReason(){//失败原因
        this.statusShow=true
        this.processObj.processDesc='失败原因'
        this.processObj.itemFlag=1//验证失败
        this.processAction()
      },
      verifing(){//审核中、验证中
        this.statusShow = true
        this.processObj.processDesc = '验证资料'
        this.processObj.itemFlag = 2//验证中
        this.processAction()
      },
      processAction(){//获取项目进程的接口
        const postData = {
          token: getToken(),
          project_id: this.processObj.itemId
        }
        returnItemAction(postData).then((res) => {
          if (res.stauts == 1) {
            this.processData = res.data
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

  @import "../../style/mixin.scss";
  .project-manage{
    .project-manage-wrapper{
      width: 90%;
      height: 20rem;
      border-radius: 0.8rem;
      margin: auto;
      margin-top: 1rem;
      -webkit-box-shadow: 0px 3px 9px #ababab;
      .project-manage-head{
        @include widthAndHeight(100%,2rem);
        @include bis('../../images/sc.png');
        p{
          text-align: center;
          font-size: 1rem;
          color:#fff;
          font-weight: bold;
          padding-top: 0.25rem;
        }
      }
      .project-info{
        width: 90%;
        margin: auto;
        margin-top:1rem;
        p:nth-child(1){
          float: left;
          font-size:0.85rem;
          color: #8080ff;
        }
        p:nth-child(2){
          float: right;
          font-size:0.55rem;
          color: #636363;
        }

      }
      .content-center{
        margin-top:4rem;
        text-align: center;
        p:nth-child(1){
          font-size:2.5rem;
          color: #ff6631;
          font-family: Knockout-lzhz;
          span{
              font-size:1.5rem;
          }
        }
        p:nth-child(2){
          font-size:0.6rem;
          color: #7f7f7f;
        }
        .fail-reason{
          width: 5.5rem;
          height: 1.7rem;
          margin: auto;
          margin-top: 0.5rem;
          border-radius: 1rem;
          text-align: center;
          padding:0.2rem;
          color:#ff6631;
          border: 1px solid #ff6631;
        }
      }
      .send-process{
        @include widthAndHeight(5.5rem,1.7rem);
        @include bis('../../images/manage.png');
        margin: auto;
        margin-top:1rem;
        p{
          text-align: center;
          color: #ffffff;
          font-size:0.95rem;
          font-weight: bold;
          padding-top: 0.1rem;
        }
      }

    }
    .clearfix{
      clear: both;
    }
    .line{
      width: 100%;
      height: 0.5rem;
      background: #f4f4f4;
    }
    .white-line{
      width: 100%;
      height: 1.5rem;
    }
  }
</style>
