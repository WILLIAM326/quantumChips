import {weChatToken,getWeChatUserInfo} from '../../api/login'
import {myProfileInfo} from '../../api/getData'//我的个人中心
import {getToken, setToken, getLocalStorageStore,setLocalStorageStore} from '../../utils/auth'

const user = {
  state: {
    token: getToken(),
    projectInfo: {},
    userInfo:{},//微信用户信息
    userOpenID:'',//用户openid
    gotDataObj:{},
    myLaunchList: [],//我发起的
    myHelpedList: [],//我帮助的
  },
  mutations: {
    // SET_ROLES: (state, roles) => {
    //   state.roles = roles
    // }
  },
  actions: {
    getWeChatToken({dispatch, state}, dataObj){
      state.gotDataObj=dataObj
      weChatToken(dataObj.code).then((res) => {
        if (res.stauts == 1) {
          setToken(res.data.token);//存储token365天
          setLocalStorageStore("storeOpenID",res.data.openid)
          dispatch('gotWeChatUserInfo',res.data.token)
        }
        if (res.stauts == 0) {
        }
      })
    },
    gotWeChatUserInfo({dispatch,state},userToken){
      getWeChatUserInfo(userToken).then((res)=>{
        if (res.stauts == 1) {
          state.userInfo = res.data;
          // setLocalStorageStore("bindPhone", res.data.member_list_tel);//保存手机号member_list_tel
          if(getLocalStorageStore("preUrl")=='/home'){
            if(!res.data.member_list_tel){//不存在手机号跳转到登录页面
              state.gotDataObj.extendRouter.push({path: '/login'})
            }else{
              state.gotDataObj.extendRouter.push({path: '/callHelp'})
            }
          }else{
            state.gotDataObj.extendRouter.push({path: getLocalStorageStore("preUrl")})
          }
          setLocalStorageStore("weChatUserInfo",JSON.stringify({name:res.data.name,head_img:res.data.head_img}));//保存存储信息数组
        }
      })
    },
    //有了TOKEN以后拿微信信息
    reloadGetWeChatInfo({dispatch,state},userToken){
      getWeChatUserInfo(userToken).then((res)=>{
        if (res.stauts == 1) {
          state.userInfo = res.data;
        }
      })
    },
    //获取微信用户信息
    MyProfileInfo({commit, state}, token){
      myProfileInfo(token).then((res) => {
        if (res.stauts == 1) {
          state.projectInfo = res.data;
          state.myLaunchList = res.data.project;//我发起的里面的状态
          state.myHelpedList = res.data.help_project;//我帮助的
        }
      })
    }
  }
}

export default user
