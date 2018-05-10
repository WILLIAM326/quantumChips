import {projectVerifyAction} from '../../api/getData'

import {
  PROJECT_ERIFY_BEHAVIOUR,
  RETSET_HOS_NAME//医院名字
} from './mutation-types';

const projectVerify = {
  state: {
    projectVerifyData: {},//项目验证信息
    resetHosName: '',//医院地址
  },
  mutations: {
    [RETSET_HOS_NAME](state, hosname) {
      state.resetHosName = hosname
    }
  },
  actions: {
    [PROJECT_ERIFY_BEHAVIOUR]({commit, state}, getObjData){
      projectVerifyAction(getObjData).then((res) => {
        if (res.stauts == 1) {
          state.projectVerifyData = res.data
        }
      })
    },
  }
}

export default projectVerify
