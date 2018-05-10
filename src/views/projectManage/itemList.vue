<template>
  <div class="item-wrapper">
    <div class="item-list">
      <ul>
        <li @click="editProject">
          <img src="../../images/item1.png">
          <p>编辑项目</p>
        </li>
        <li>
          <template v-if="projectManageData.status>0&&projectManageData.project_audit_status==2">
            <div @click="allowAccess">
              <img src="../../images/item2.png">
              <p>项目验证</p>
            </div>
          </template>
          <template v-else>
            <!--<router-link :to="{ path: '/patientInformation', query: {projectId: this.$route.query.projectId }}">-->
            <div @click="verifing">
              <img src="../../images/item2.png">
              <p>项目验证</p>
            </div>
            <!--</router-link>-->
          </template>
        </li>
        <li>
          <router-link :to="{ path: '/confirmatory', query: {projectId: this.$route.query.projectId }}">
            <img src="../../images/item3.png">
            <p>证实管理</p>
          </router-link>
        </li>
        <li @click="termination">
          <img src="../../images/item4.png">
          <p>提前结束</p>
        </li>
        <li @click="wannaDeleteAction">
          <img src="../../images/item5.png">
          <p>删除项目</p>
        </li>
      </ul>
    </div>
    <!--删除提示语-->
    <prompt-box :messageCancelShow="messageCancelShow" @closeAction="closeMask" @deleteAction="wannaDelete"></prompt-box>
    <!--项目结束提示信息组件-->
    <finish-prompt-box :finishProjectData="finishProjectData"  @finishBoxClose="finishBoxCloseAction"></finish-prompt-box>
    <message-tip :messageWord="messageWord" :messageShow="messageShow"></message-tip>
    <project-status v-show="statusShow" @emitAction="closeStatusShow" :processData="processData" :processObj="processObj"></project-status>

  </div>

</template>

<script>
  import {mapGetters} from 'vuex';
  import promptBox from '../../components/prompt/prompt'
  import finishPromptBox from '../../components/prompt/finishPrompt'//项目结束信息提示
  import {getToken} from '../../utils/auth';
  import {projectCancelAction,finishAction,returnItemAction} from '../../api/getData'
  import messageTip from '../../components/common/messageTip'
  import projectStatus from '../../views/projectStatus/projectStatus'

  export default {
        data(){
            return{
              messageWord:'',//提示信息
              messageShow:false,
              messageCancelShow:false,
              statusShow:false,
              itemId: this.$route.query.projectId,
              processData:[],
              finishProjectData:{
                projectId: this.$route.query.projectId,
                finishShow:false,
                warmTipWord:'',//提示语
                statusFlag:'',//项目状态0：未审核
              },
              processObj:{
                itemId: this.$route.query.projectId,
                processDesc:'',
                itemFlag:''//进程状态判断
              }
            }
        },
        components: {
          promptBox,
          messageTip,
          finishPromptBox,
          projectStatus
        },
        computed: {
          ...mapGetters(['projectManageData'])
        },
        methods:{
          wannaDeleteAction(){
            if (this.projectManageData.status > 0 && this.projectManageData.cash_status == 1) {
              this.messageShow = true
              this.messageWord = '项目已进入提现流程，不能进行删除'
            }
            if (this.projectManageData.status > 0 && this.projectManageData.cash_status == 2) {
              this.messageShow = true
              this.messageWord = '项目已进入提现流程，不能进行删除'
            }
            if (this.projectManageData.status > 0 && this.projectManageData.cash_status == 3) {
              this.messageShow = true
              this.messageWord = '项目已经打款，不能进行删除'
            }
            if (this.projectManageData.status > 0 && (this.projectManageData.cash_status == 0||this.projectManageData.cash_status==4)) {
              this.messageCancelShow=true
            }
          },
          wannaDelete(){
            const postData = {
              token: getToken(),
              project_id: this.itemId
            }
            projectCancelAction(postData).then((res)=>{
                if(res.stauts==1){
                  this.messageCancelShow=false
                  this.$router.push({path:'/mine'})
                }
            })
          },
          editProject(){
              if(this.projectManageData.borrow_amount>0){
                  this.messageWord='已有捐款，不能编辑此项目'//提示信息
                  this.messageShow=true
                  return false
              }else{
                  this.$router.push({path:'/callHelp',query: {projectId: this.itemId}})
              }
          },
          closeStatusShow(){
            this.statusShow=false
          },
          verifing(){//审核中、验证中
            if(this.projectManageData.status>0&&this.projectManageData.project_audit_status==0){
                this.$router.push({ path: '/patientInformation', query: {projectId: this.$route.query.projectId }})
            }
            if(this.projectManageData.status>0&&this.projectManageData.project_audit_status==4){
                //项目验证失败
              this.statusShow=true
              this.processObj.processDesc='失败原因'
              this.processObj.itemFlag=1//验证失败
              this.itemInfoList()
            }
            if(this.projectManageData.status>0&&this.projectManageData.project_audit_status==1) {
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
          allowAccess(){
            this.messageShow = true
            this.messageWord = '项目审核已经通过'
          },
          closeMask(){
            this.messageCancelShow = false
          },
          termination(){//提前结束弹框提示
            if(this.projectManageData.status==2){
              this.messageShow = true
              this.messageWord = '筹款已结束，不可执行此操作'
            }
            if(this.projectManageData.status==1&&this.projectManageData.project_audit_status==0){
              //项目未审核
              this.messageShow = true
              this.messageWord = '项目验证未提交，不可提前结束'
            }
            if(this.projectManageData.status==1&&this.projectManageData.project_audit_status==1){
              //项目未审核
              this.messageShow = true
              this.messageWord = '您的项目正在验证中，暂不能执行此操作'
            }
            if(this.projectManageData.status==1&&this.projectManageData.project_audit_status==4){
              //项目被驳回
              this.messageShow = true
              this.messageWord = '项目验证审核失败，不可提前结束'
            }
            if(this.projectManageData.status==1&&this.projectManageData.project_audit_status==2){
              //项目审核通过
              this.finishProjectData.warmTipWord='项目提前结束，将不能继续进行筹款，确定继续操作吗'
              this.finishProjectData.statusFlag=2
              this.finishProjectData.finishShow=true
            }

          },
          finishBoxCloseAction(){
            this.finishProjectData.finishShow=false
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
  .item-wrapper{
    margin-top:2rem;
    .item-list{
      width: 90%;
      margin: auto;
      padding-bottom:1rem;
      height:10rem;
      ul{
        display:block;
        li{
          margin-left:1rem;
          margin-top:1rem;
          img{
          @include widthAndHeight(3rem,3rem);
          }
          p{
            font-size:0.65rem;
            color:#4c4c4c;
          }
        }
      }
    }
  }

</style>
