/**
 * Created by jiachenpan on 16/11/18.
 */

//验证手机号
export function checkMobile(mobile) {
  const phoneRule = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9]|17[0-9])\d{8}$/i;
  return phoneRule.test(mobile)
}
//验证姓名
export function checkRealName(realName){
  const realNameRule=/^[\u4e00-\u9fa5]{2,8}$/;
  return realNameRule.test(realName)
}
//验证姓名
export function checkBirthCard(realName){
  const realNameRule=/^[a-zA-Z0-9]{5,21}$/;
  return realNameRule.test(realName)
}

export function isSpace(value){
  const regu = /^[ ]+$/;
  return regu.test(value);
}

export function checkIdCard(value){
  const cardRule = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/;
  return cardRule.test(value)
}
export function isvalidUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

export function checkBankCard(value){
  const pattern =/^([1-9]{1})(\d{15}|\d{17}|\d{18})$/;
  return pattern.test(value);
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

