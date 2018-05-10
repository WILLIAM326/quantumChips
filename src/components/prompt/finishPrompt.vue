<template>
  <div class="prompt-wrapper" v-show="finishProjectData.finishShow">
    <div class="prompt-mask"></div>
    <div class="prompt-content">
      <div class="content-top">
        <!--提示语-->
        <p>{{finishProjectData.warmTipWord}}</p>
      </div>
      <div class="content-down">
        <ul>
          <template v-if="finishProjectData.statusFlag==0">
            <!--去验证-->
            <li @click="goToCheck">
              <p>去验证</p>
            </li>
          </template>
          <template v-if="finishProjectData.statusFlag==2">
            <!--去验证-->
            <li @click="finishActionClick">
              <p>确定</p>
            </li>
          </template>
          <li @click="closeMask">
            <p style="color: #ff6631">取消</p>
          </li>
        </ul>
      </div>

    </div>

  </div>

</template>

<script>
  import {finishAction} from '../../api/getData'//提前结束项目
  import {getToken} from '../../utils/auth'

  export default {
    props: ['finishProjectData'],
    methods: {
      closeMask(){//关闭提前完成弹框
        this.$emit('finishBoxClose')
      },
      goToCheck(){
          this.$router.push({path:'/patientInformation',query:{projectId:this.finishProjectData.projectId}})
      },
      finishActionClick(){
        const postData = {
          token: getToken(),
          project_id: this.finishProjectData.projectId
        }
        finishAction(postData).then((res)=>{
          if(res.stauts==1){
//            this.finishProjectData.warmTipWord=res.msg
             this.$router.push({path:'/mine'})
          }
          if (res.stauts == 0) {
//                this.messageShow = true
//                this.messageWord = res.msg
//                this.finishProjectData.warmTipWord=res.msg
          }
        })
      }

    }
  }
</script>

<style lang="scss" scoped>
  .prompt-wrapper{
    .prompt-mask{
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.7);
      position: fixed;
      top:0;
      left: 0;
    }
    .prompt-content{
      position: fixed;
      top:50%;
      left: 50%;
      width: 90%;
      height: 7rem;
      background: #fff;
      -webkit-transform: translate(-50%,-50%);
      z-index:2;
      border-radius: 0.5rem;
      .content-top{
        height: 4.5rem;
        padding:1rem 0.8rem;
        border-bottom:1px solid #ff6631;
        p{
          text-align: center;
          font-size:0.75rem;
          color:#4c4c4c;
        }
      }
      .content-down{
        height: 2.5rem;
        li{
          width: 50%;
          height: 2.5rem;
          padding-top:0.7rem;
          p{
            text-align: center;
            font-size:0.8rem;
          }
        }
        li:nth-child(1){
          border-right: 1px solid #ff6631;
        }
      }
    }
  }


</style>
