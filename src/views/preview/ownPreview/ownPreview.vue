<template>
  <div class="own-wrapper">
    <preview-head :userInfo="userInfo"></preview-head>
    <case-details></case-details>
    <slide-box></slide-box>
    <credential></credential>
    <proof></proof>
    <!--<project-dynamic></project-dynamic>-->
    <helper-list></helper-list>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex';
  import previewHead from '../../preview/ownPreview/previewHead';//头部
  import caseDetails from '../../preview/ownPreview/caseDetails';//详情页
  import slideBox from '../../preview/ownPreview/slide';
  import credential from '../../preview/ownPreview/credential';//材料证明
  import proof from '../../preview/ownPreview/proof';//实名证实
//  import projectDynamic from '../../preview/ownPreview/projectDynamic';//项目动态
  import helperList from '../../preview/ownPreview/helper';//帮助我的人
  import {ownLookAroundProject} from '../../../api/getData';
  import {getLocalStorageStore,getToken} from '@/utils/auth';

    export default {
        data(){
            return{
                itemId:this.$route.query.projectId,
                token:getToken(),
                userInfo:{},//用户信息
                projectInfo:{}
            }
        },
        components:{
          previewHead,
          caseDetails,
          slideBox,
          credential,
          proof,
//          projectDynamic,
          helperList
        },
        mounted(){
            this.initData()
            this.$nextTick(() => {//解决ios白屏问题
              window.scrollTo(0, 1)
              window.scrollTo(0, 0)
          })
        },
        methods: {
          initData(){
            const postData = {
                id:this.itemId,
                token:this.token
            }
            this.userInfo = JSON.parse(getLocalStorageStore("weChatUserInfo"))
            this.$store.dispatch("PROJECT_PREVIEW_INFO",postData)
          }
        }
    }
</script>

<style lang="scss" scoped>

</style>
