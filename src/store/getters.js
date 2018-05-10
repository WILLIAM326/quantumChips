const getters = {
  roles: state => state.user.roles,
  projectInfo:state=>state.user.projectInfo,//个人中心用户的信息
  userInfo:state=>state.user.userInfo,//个人中心用户的信息
  myLaunchList:state=>state.user.myLaunchList,//个人中心我发起的众筹
  myHelpedList:state=>state.user.myHelpedList,//个人中心我帮助的
  projectPreviewInfo:state=>state.projectPreview.projectPreviewInfo,//项目预览信息
  ownCaseDetail:state=>state.projectPreview.ownCaseDetail,//项目详情信息
  ownButtonInfo:state=>state.projectPreview.ownButtonInfo,//项目详情展开全文按钮
  projectManageData:state=>state.projectManage.projectManageData,//项目预览信息
  projectVerifyData:state=>state.projectVerify.projectVerifyData,//项目预览信息
  // messageShow:state=>state.projectVerify.messageShow,//显示flag
  // messageWord:state=>state.projectVerify.messageWord,//word
  patientInfo:state=>state.projectPreview.patientInfo,//项目预览患者的信息
  nameValidation:state=>state.projectPreview.nameValidation,//项目预览实名认证
  donationData:state=>state.projectPreview.donationData,//项目预览捐赠的信息
  resetHosName:state=>state.projectVerify.resetHosName,//项目预览捐赠的信息
  selfHandImage:state=>state.commonUploadPic.selfHandImage,//患者本人拿照片
  hospitalProof:state=>state.commonUploadPic.hospitalProof,//医院治疗证明照片
  arrUploadImages:state=>state.commonUploadPic.arrUploadImages,//要上传的医院治疗证明照片
  afterShareInfo:state=>state.projectPreview.afterShareInfo,//分享之后的信息
  shareAndCollectionProcess:state=>state.projectPreview.shareAndCollectionProcess,//筹款状态
  totalEditBaseInfo:state=>state.editBaseInfo.totalEditBaseInfo,//筹款状态
  userOpenID:state=>state.user.userOpenID,//用户的openid
  // dataObj:state=>state.projectVerify.dataObj,//用户的openid
  proofLoadingFlag:state=>state.commonUploadPic.proofLoadingFlag,//上传医院资料的loading
  shareAuth:state=>state.projectPreview.shareAuth,//分享后判断患者信息是否存在
  shareWithdraw:state=>state.projectPreview.shareWithdraw,//提现信息是否存在
  relativesUploadImgList:state=>state.verificationWithdraw.relativesUploadImgList,//提现亲属上传图片
  relativesHandImage:state=>state.verificationWithdraw.relativesHandImage,//提现亲属上传图片
  withdrawMutualPhotoes:state=>state.verificationWithdraw.withdrawMutualPhotoes,//提现亲属上传图片
  loadingFlag:state=>state.verificationWithdraw.loadingFlag,//loading判断标示
  alreadyChooseID:state=>state.editBaseInfo.alreadyChooseID,//已经的选择的id
  editBaseInfoFlag:state=>state.editBaseInfo.editBaseInfoFlag,//判断编辑的项目是否为空
  choosePromiseIndex:state=>state.editBaseInfo.choosePromiseIndex//判断编辑的项目是否为空
};

export default getters;
