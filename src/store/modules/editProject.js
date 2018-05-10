import {projectBasicInfoAction} from '../../api/getData'

import {
  PROJECT_BASIC_INFO
} from './mutation-types';

const projectEditBaseInfo = {
  state: {
    totalEditBaseInfo:{},
    editBaseInfoFlag:false,//判断编辑的项目是否已经存在
    alreadyChooseID:'',//已经存在的诺言id
    choosePromiseIndex:''//选中的承诺序号
  },
  actions: {
    [PROJECT_BASIC_INFO]({commit, state}, getObjData){
      projectBasicInfoAction(getObjData).then((res) => {
        if (res.stauts == 1) {
          state.totalEditBaseInfo = res.data
          for(var i=0;i<res.data.promise_list.length;i++){
            if(res.data.promise_list[i].flag==true){
              state.alreadyChooseID=res.data.promise_list[i].id
              state.choosePromiseIndex=res.data.promise_list[i]
            }
          }
          if(!Object.keys(state.totalEditBaseInfo).length){//不存在
            state.editBaseInfoFlag=false
          }else{
            state.editBaseInfoFlag=true
          }
        }
      })
    }
  }
}

export default projectEditBaseInfo
