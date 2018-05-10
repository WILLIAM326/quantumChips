import {updateImgAction} from '../../api/getData'
import selfimg1 from '../../images/s10.png';
import selfimg2 from '../../images/w2.png';
import selfimg3 from '../../images/w3.png';
import selfimg4 from '../../images/w4.png';
import selfimg5 from '../../images/w5.png';
import selfimg6 from '../../images/w6.png';

import {
  WITHDRAW_MUTUAL_UPLOAD_ACTION
} from './mutation-types';

const verificationWithdraw = {
  state: {
    relativesUploadImgList: [],//提现亲属上传图片list
    relativesHandImage: '',//患者亲属手持照片图片
    loadingFlag:false,
    withdrawMutualPhotoes:[{
      itemId:0,
      title:'收款人手持身份证照片',
      uploadPhoto:selfimg1
    },{
      itemId:1,
      title:'患者本人户口本首页',
      uploadPhoto:selfimg2,
    },{
      itemId:2,
      title:'患者本人户口本个人页',
      uploadPhoto:selfimg3,
    },{
      itemId:3,
      title:'收款人本人户口本首页',
      uploadPhoto:selfimg4
    },{
      itemId:4,
      title:'收款人本人户口本个人页',
      uploadPhoto:selfimg5,
    },{
      itemId:5,
      title:'上传其他关系证明（非必填）',
      uploadPhoto:selfimg6,
    }]
  },
  mutations: {},
  actions: {
    [WITHDRAW_MUTUAL_UPLOAD_ACTION]({commit, state}, getDataObj){//上传多张照片
      state.loadingFlag=true
      for (let i = 0; i < state.withdrawMutualPhotoes.length; i++) {
        if (i == getDataObj.id) {
          state.withdrawMutualPhotoes[i].uploadPhoto = getDataObj.valueImg;
          updateImgAction(getDataObj.valueImg).then((res) => {
            if (res.stauts == 1) {
              state.withdrawMutualPhotoes[i].uploadPhoto = res.data
              state.loadingFlag=false
            }
          })
        }
      }
    }

  }
}

export default verificationWithdraw
