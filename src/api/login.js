import {fetch} from '../utils/axiosMethod'

//获取用户信息
export function getWeChatUserInfo(params) {
  return fetch('/user/data', {token:params})
}
/**
 * 发送注册验证码
 */
export function getVercode(params) {
  return fetch('/code/get_verify', params)
}

/**
 * 获取约跑步列表
 */
export function weChatLogin(param) {
  return fetch('/user/login', param)
}

//获取微信token
export function weChatToken(param) {
  return fetch('/user/login', {code:param})
}

