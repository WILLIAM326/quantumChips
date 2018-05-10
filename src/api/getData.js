import {fetch} from '../utils/axiosMethod'

//填写筹款信息
export function fillInfo(params) {
  return fetch('/Project/project_add', params)
}

//个人中心的数据
export function myProfileInfo(params) {
  return fetch('/center/index', {token: params})
}

//获取我的承诺列表
export function myPromiseAction(params) {
  return fetch('/Member/getMemberPromise', params)
}
//获取我的消息列表
export function myMessageAction(params) {
  return fetch('/Member/getMemberMessage',params)
}

//上传图片
export function updateImgAction(params) {
  return fetch('/file/upload', {image: params})
}

//初始化承诺
export function initPromise(params) {
  return fetch('/Project/promise_list', {token: params})
}
//初步发起申请
export function crowdFundingAction(params) {
  return fetch('/Project/project_add', params)
}

//用户绑定手机号发送短信验证码
export function sendMessageAction(params) {
  return fetch('/user/sendmessage', params)
}
//用户绑定手机号
export function bindPhoneAction(params) {
  return fetch('/user/bindphone', params)
}
//提交项目后项目预览
export function ownLookAroundProject(params) {
  return fetch('/project/preview', params)
}

//项目管理
export function projectManageAction(params) {
  return fetch('/Myproject/index', params)
}

//项目验证
export function projectVerifyAction(params) {
  return fetch('/Project/getRow', params)
}
//删除项目
export function projectCancelAction(params) {
  return fetch('/Myproject/del', params)
}
//获取项目证实人数据列表接口
export function projectproveAction(params) {
  return fetch('/projectprove/lists', params)
}
//项目预览获取捐款列表
export function donationListAction(params) {
  return fetch('/project/getdonationlistbypid', params)
}
//提交项目验证信息
export function postProjectVerify(params) {
  return fetch('/Project/subBaseProject', params)
}

//上传医院诊断证明图片
export function authUploadAction(params) {
  return fetch('/Project/subAuthPath', params)
}
//项目提现验证
export function withdrawlAction(params) {
  return fetch('/withdrawals/index', params)
}

//获取提现信息
export function getWithdrawInfo(params) {
  return fetch('/Myproject/withdraw_info', params)
}

//申请提现
export function cashWithdrawal(params) {
  return fetch('/withdrawals/applyCash', params)
}
//提现审核流程
export function withDrawCashStatus(params) {
  return fetch('/Project/get_cash_status', params)
}

//微信分享
export function weChatShareAction(params) {
  return fetch('/project/share', params)
}
//获取实名验证用户信息名单(和之前的chongfu)
export function projectAuthListAction(params) {
  return fetch('/project/share', params)
}
//weChatPay微信支付
export function weChatPayAction(params) {
  return fetch('/Wechatpay/wechat_ord', params)
}

//获取的时候获取项目基本信息
export function projectBasicInfoAction(params) {
  return fetch('/Project/getProjectBasicInfo', params)
}
//邀请人证实
export function projectProveAction(params) {
  return fetch('/projectprove/add', params)
}
//有无未读消息
export function checkMessageStatusAction(params) {
  return fetch('/Member/getUserUnreadMess', {token: params})
}
//获取项目动态
export function projectDynamicAction(params) {
  return fetch('/Project/getProjectDynamic', params)
}
//项目提前结束
export function finishAction(params) {
  return fetch('/Myproject/set_project_end', params)
}
//读取帮助中心内容
export function helpInfoAction() {
  return fetch('/news/faq')
}
//项目驳回流程
export function returnItemAction(params) {
  return fetch('/Project/ProjectFail',params)
}
//项目条款
export function getAgreementAction(params) {
  return fetch('/news/getAgreement',{identification:params})
}

//分享次数统计
export function shareTimesTotal(params) {
  return fetch('/project/projectAddShare',params)
}

