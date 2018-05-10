import Cookies from 'js-cookie'

const tokenKey = 'user-token'

export function getToken() {
  return Cookies.get(tokenKey)
}

export function setToken(token) {
  return Cookies.set(tokenKey, token, 365)
}

export function removeToken() {
  return Cookies.remove(tokenKey)
}


/**
 * 存储localStorage
 */
export const setLocalStorageStore = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getLocalStorageStore = name => {
  if (!name) return;
  return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeLocalStorageStore = name => {
  if (!name) return;
  window.localStorage.removeItem(name);
}


