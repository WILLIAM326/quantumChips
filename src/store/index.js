/**
 * Created by william on 2017/10/9.
 */
import Vue from 'vue';
import Vuex from 'vuex';

import mutations from './mutations';
import actions from './actions';
import getters from './getters';

//用户信息
import user from './modules/user';
import weChatAuth from './modules/weChatAuth';//微信授权
import projectPreview from './modules/projectPreview';//项目预览
import projectManage from './modules/projectManage';//项目管理
import projectVerify from './modules/projectVerify';//项目管理
import commonUploadPic from './modules/commonUploadPic';//公用的上传图片
import editBaseInfo from './modules/editProject';//编辑项目
import verificationWithdraw from './modules/verificationWithdraw';//编辑项目

Vue.use(Vuex);

// const state = {
//   count: 100,
//   leftPosition: '',
//   currentPercent: '',
//   patientSelfUploadParam: {//患者本人上传的图片
//     selfIdCard: ''
//   },//
// }

export  default new Vuex.Store({
  modules: {
    user,
    weChatAuth,
    projectPreview,
    projectManage,
    projectVerify,
    commonUploadPic,
    editBaseInfo,
    verificationWithdraw
  },
  mutations,
  actions,
  getters
})
