import {ownLookAroundProject,projectBasicInfoAction} from '../../api/getData'

import {
  PROJECT_PREVIEW_INFO,
  AFTER_SHARE_PROJECT_INFO,
  MONEY_COLLECTION_PROCESS,
  GET_ALL_DETAIL,
  AFTER_GET_ALL_DETAIL
} from './mutation-types';

const projectPreview = {
  state: {
    projectPreviewInfo:{},//项目预览信息
    ownCaseDetail:'',//详情
    donationData:{},//帮助的信息
    patientInfo:{},//患者信息
    nameValidation:{},//实名证实
    afterShareInfo:{},//分享之后的信息
    shareAndCollectionProcess:{},//筹款进度
    ownButtonInfo:'展开全文',
    totalInfoShow:false,
    shareAuth:false,
    shareWithdraw:false
  },
  mutations:{

  },
  actions: {
    [PROJECT_PREVIEW_INFO]({commit,state},getObjData){
      ownLookAroundProject(getObjData).then((res)=>{
        if(res.stauts==1){
          state.projectPreviewInfo=res.data.projectinfo
          state.ownCaseDetail=state.projectPreviewInfo.pro_remark.slice(0,112)
          state.donationData=res.data.donation//捐助的金额列表
          state.patientInfo=res.data.auth//病人数据
          state.nameValidation=res.data.prove//实名认证
        }
      })
    },
    [GET_ALL_DETAIL]({commit, state}){
      state.totalInfoShow=!state.totalInfoShow
      if (state.totalInfoShow) {
        state.ownButtonInfo = '收起全文';
        state.ownCaseDetail = state.projectPreviewInfo.pro_remark
      } else {
        state.ownButtonInfo = '展开全文';
        state.ownCaseDetail = state.projectPreviewInfo.pro_remark.slice(0, 112)
      }
    },
    //分享之后的信息
    [AFTER_SHARE_PROJECT_INFO]({commit,state},getObjData){
      ownLookAroundProject({id:getObjData.id,token:getObjData.token}).then((res)=>{
        if(res.stauts==1){
          state.afterShareInfo=res.data
          state.ownCaseDetail=state.afterShareInfo.projectinfo.pro_remark.slice(0,112)
          if(!Object.keys(state.afterShareInfo.auth).length){
            state.shareAuth=false
          }else{
            state.shareAuth=true
          }

          if(!Object.keys(state.afterShareInfo.withdrawalsinfo).length){
            state.shareWithdraw=false
          }else{
            state.shareWithdraw=true
          }
        }
        if(res.stauts==0){
          getObjData.extendRouter.push({path:'/deleteAlready'})
        }
      })
    },
    [AFTER_GET_ALL_DETAIL]({commit, state}){
      state.totalInfoShow=!state.totalInfoShow
      if (state.totalInfoShow) {
        state.ownButtonInfo = '收起全文';
        state.ownCaseDetail = state.afterShareInfo.projectinfo.pro_remark
      } else {
        state.ownButtonInfo = '展开全文';
        state.ownCaseDetail = state.afterShareInfo.projectinfo.pro_remark.slice(0, 112)
      }
    },
    [MONEY_COLLECTION_PROCESS]({commit,state},getObjData){//获取分享的数据
      projectBasicInfoAction(getObjData).then((res) => {
        if (res.stauts == 1) {
          state.shareAndCollectionProcess = res.data
        }
      })
    }

  }
}

export default projectPreview
