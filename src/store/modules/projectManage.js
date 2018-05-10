import {projectManageAction} from '../../api/getData'

import {
  PROJECT_MANAGE
} from './mutation-types';

const projectManage = {
  state: {
    projectManageData: {},//项目预览信息
  },
  actions: {
    [PROJECT_MANAGE]({commit, state}, getObjData){
      projectManageAction(getObjData).then((res) => {
        if (res.stauts == 1) {
          state.projectManageData = res.data
        }
      })
    }
  }
}

export default projectManage
