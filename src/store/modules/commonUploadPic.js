import {updateImgAction} from '../../api/getData'
import img2 from '../../images/s2.png';
import img3 from '../../images/s3.png';
import img4 from '../../images/s4.png';
import img5 from '../../images/s5.png';
import img6 from '../../images/s6.png';
import img7 from '../../images/s7.png';

import {
  COMMON_UPLOAD_PIC,
  PROOF_UPLOAD_ACTION,
} from './mutation-types';

const projectVerify = {
  state: {
    proofLoadingFlag:false,
    messageShow:false,
    selfHandImage: '',//患者自己手持照片图片
    hospitalProof: [//患者在医院的证明资料
      {
        itemId: 0,
        url: img2
      }, {
        itemId: 1,
        url: img3
      }, {
        itemId: 2,
        url: img4
      }, {
        itemId: 3,
        url: img5
      }, {
        itemId: 4,
        url: img6
      }, {
        itemId: 5,
        url: img7
      }]
  },
  mutations: {},
  actions: {
    //单个图片上传
    [COMMON_UPLOAD_PIC]({commit, state}, getObjData){
      state.proofLoadingFlag = true
      updateImgAction(getObjData).then((res) => {
        if (res.stauts == 1) {
          state.selfHandImage = res.data
          state.proofLoadingFlag = false
        }
      })
    },
    [PROOF_UPLOAD_ACTION]({commit, state}, getDataObj){
      state.proofLoadingFlag = true
      for (let i = 0; i < state.hospitalProof.length; i++) {
        if (i == getDataObj.id) {
          state.hospitalProof[i].url = getDataObj.valueImg;
          updateImgAction(getDataObj.valueImg).then((res) => {
            if (res.stauts == 1) {
              state.hospitalProof[i].url = res.data
              state.proofLoadingFlag = false
            }
          })
        }
      }
    }

  }
}

export default projectVerify
