import {configHTMLURL,appId} from '../../config/env'

const weChatAuth = {
  state: {
    hostURL:configHTMLURL,
    appid:appId
  },
  mutations: {

  },
  actions:{
    weChatAuthorization({ commit, state }){
      const callbackUrl=encodeURIComponent(state.hostURL+'#/weChatLogin')
      location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+state.appid+"&redirect_uri=" + callbackUrl + "&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect";
    }
  }
}

export default weChatAuth
