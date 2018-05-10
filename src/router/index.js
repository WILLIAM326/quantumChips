import App from '../App';

const home = r => require.ensure([], () => r(require('../views/home/home')), 'home');
const callHelp = r => require.ensure([], () => r(require('../views/callHelp/callHelp')), 'callHelp');
const mine = r => require.ensure([], () => r(require('../views/mine/mine')), 'mine');
const ownPreview = r => require.ensure([], () => r(require('../views/preview/ownPreview/ownPreview')), 'ownPreview');
const message = r => require.ensure([], () => r(require('../views/message/message')), 'message');
const mylaunch = r => require.ensure([], () => r(require('../views/mine/children/launch')), 'mylaunch');
const myhelped = r => require.ensure([], () => r(require('../views/mine/children/helped')), 'myhelped');
const withdrawCash = r => require.ensure([], () => r(require('../views/withdraw/withdraw')), 'withdrawCash');
const withdrawProcess = r => require.ensure([], () => r(require('../views/process/process')), 'withdrawProcess');
const projectManage = r => require.ensure([], () => r(require('../views/projectManage/projectManage')), 'projectManage');
const patientInformation = r => require.ensure([], () => r(require('../views/verification/patientInformation')), 'patientInformation');
const searchHos = r => require.ensure([], () => r(require('../views/verification/children/searchHos')), 'searchHos');
const evidenceUpload = r => require.ensure([], () => r(require('../views/verification/evidenceUpload')), 'evidenceUpload');
const donation = r => require.ensure([], () => r(require('../views/donation/donation')), 'donation');
const accountInfo = r => require.ensure([], () => r(require('../views/verification/accountInfo')), 'accountInfo');
const relatices = r => require.ensure([], () => r(require('../views/verification/children/relatives')), 'relatices');
const sharePreview = r => require.ensure([], () => r(require('../views/preview/othersPreview/sharePreview')), 'sharePreview');
const proveIt = r => require.ensure([], () => r(require('../views/proveIt/proveIt')), 'proveIt');//为它证实
const confirmatory = r => require.ensure([], () => r(require('../views/confirmatory/confirmatory')), 'confirmatory');//为它证实
const loginAction = r => require.ensure([], () => r(require('../views/login/login')), 'loginAction');//登陆窗口
const helpCenter = r => require.ensure([], () => r(require('../views/helpCenter/helpCenter')), 'helpCenter');//登陆窗口
const myPromise = r => require.ensure([], () => r(require('../views/myPromise/myPromise')), 'myProject');//我的承诺
const allPromise = r => require.ensure([], () => r(require('../views/myPromise/allPromise')), 'allProject');//我的所有承诺
const weChatLogin = r => require.ensure([], () => r(require('../views/weChatLogin/weChatLogin')), 'weChatLogin');//我的所有承诺
const paySuccess = r => require.ensure([], () => r(require('../views/weChatNativePay/paySuccess')), 'paySuccess');//我的所有承诺
const projectDynamic = r => require.ensure([], () => r(require('../views/message/projectDynamic')), 'projectDynamic');//我的所有承诺
const deleteAlready = r => require.ensure([], () => r(require('../views/preview/othersPreview/deleteAlready')), 'deleteAlready');//项目已经的删除
const bannerInstruct = r => require.ensure([], () => r(require('../views/home/bannerInstruct')), 'bannerInstruct');//首页banner链接

export default [{
  path: '/',
  component: App, //顶层路由，对应index.html
  children: [ //二级路由。对应App.vue
    //地址为空时跳转home页面
    {
      path: '',
      redirect: '/home'
    },
    //首页
    {
      path: '/home',
      name:'量子筹',
      component: home,
    },
    {
      path: '/mine',
      component: mine,
      meta: {
        requireAuth: true,
      },
      children: [
        {
          path: '',
          name:'我的',
          component: mylaunch,//我发起的
          meta: {
            requireAuth: true
          },
        },
        {
          path: 'mylaunch',
          name:'我发起的',
          component: mylaunch,
          meta: {
            requireAuth: true,
          },
        },
        {
          path: 'myhelped',
          name:'我帮助的',
          component: myhelped,
          meta: {
            requireAuth: true,
          },
        }
      ]
    },
    {
      path: '/message',
      name:'消息中心-量子筹',
      component: message,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/ownPreview',
      name:'我的项目预览',
      component: ownPreview,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/callHelp',
      name:'填写筹款信息',
      component: callHelp,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/withdraw',
      name:'提现-量子筹',
      component: withdrawCash,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/process',
      name:'申请提现进度',
      component: withdrawProcess,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/projectManage',
      name:'项目管理',
      component: projectManage,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/patientInformation',
      name: '项目验证',
      component: patientInformation,
      meta: {
        requireAuth: true,
      },
      children: [
        {
          path: 'searchHos',
          name:'填写医院名称',
          component: searchHos,
          meta: {
            requireAuth: true,
          },
        }
      ]
    },
    {
      path: '/evidenceUpload',//患者上传图片
      name:'上传图片',
      component: evidenceUpload,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/donation',//捐款给其他人
      name:'捐助金额',
      component: donation,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/accountInfo',//收款人信息
      name:'提现验证',
      component: accountInfo,
      meta: {
        requireAuth: true,
      },
      children: [{
        path: 'relatices',
        name:'提现验证',
        component: relatices,
        meta: {
          requireAuth: true,
        },
      }]
    },
    // 转发预览
    {
      path: '/sharePreview',
      component: sharePreview,
      name:'量子筹',
      meta: {
        requireAuth: true,
      },
    },
    {
      path:'/proveIt',
      name:'帮TA证实-量子筹',
      component:proveIt,
      meta: {
        requireAuth: true,
      },
    },
    {
      path:'/confirmatory',//为ta证实
      name:'所有证实-量子筹',
      component:confirmatory,
      meta: {
      requireAuth: true,
    },
    },
    {
      path:'/login',
      name:'用户登录',
      component:loginAction,
      meta: {
        requireAuth: true,
      },
    },
    {
      path:'/helpCenter',
      name:'帮助中心',
      component:helpCenter,
      meta: {
        requireAuth: true,
      },
    },
    {
      path:'/myPromise',
      name:'我的承诺',
      component:myPromise,
      meta: {
        requireAuth: true,
      },
    },
    {
      path:'/allPromise',
      name:'我的承诺',
      component:allPromise,
      meta: {
        requireAuth: true,
      },
    },
    {
      path:'/weChatLogin',
      name:'登录',
      component:weChatLogin,
    },
    {
      path:'/paySuccess',
      name:'量子筹',
      component:paySuccess
    },
    {
      path:'/projectDynamic',
      name:'项目动态',
      component:projectDynamic
    },
    {
      path:'/deleteAlready',
      name:'量子筹',
      component:deleteAlready
    },
    {
      path:'/bannerInstruct',
      name:'量子筹',
      component:bannerInstruct
    }
  ]
}]


