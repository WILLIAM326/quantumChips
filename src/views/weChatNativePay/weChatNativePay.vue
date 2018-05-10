<template>
  <div class="weChatNativePay-wrapper">
    <div class="weChatNativePay-mask" @click="maskClose"></div>
    <div class="ways-pay-box">
      <div class="ways-tip">
        <p>支付方式</p>
      </div>
      <div class="payof-way" @click="weChatNativePay">
        <p>
          <img src="../../images/weChatPay.png">
          <span>微信支付</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
  import {weChatPayAction} from '../../api/getData'
  export default {
    props: ['payData'],
    methods: {
      weChatNativePay(){
        const _this=this;//微信支付成功后指向问题
        weChatPayAction(this.payData).then((res) => {
          if(res.stauts==1){
            const appId = res.data.appId;
            const timeStamp = res.data.timeStamp;
            const nonceStr = res.data.nonceStr;
            const pg = res.data.package;
            const signType = res.data.signType;
            const paySign = res.data.paySign;
            function onBridgeReady() {
              WeixinJSBridge.invoke(
                'getBrandWCPayRequest', {
                  "appId": appId, //公众号名称，由商户传入
                  "timeStamp": timeStamp, //时间戳，自1970年以来的秒数
                  "nonceStr": nonceStr, //随机串
                  "package": pg,
                  "signType": signType, //微信签名方式:
                  "paySign": paySign //微信签名
                },
                function (res) {
                  if (res.err_msg == "get_brand_wcpay_request:ok") { // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                    _this.$router.push({path: '/paySuccess'});
                  }
                  //交易取消
                  if (res.err_msg == "get_brand_wcpay_request:cancel") {
                  }
                  //支付失败
                  if (res.err_msg == "get_brand_wcpay_request:fail") {
                  }
                }
              );
            }

            //判断微信
            if (typeof WeixinJSBridge == "undefined") {
              if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
              } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
              }
            } else {
              onBridgeReady();
            }
          }
        })
      },
      maskClose(){
          this.$emit('weChatMaskClose')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .weChatNativePay-wrapper{
    .weChatNativePay-mask{
      position: fixed;
      width: 100%;
      height: 100%;
      top:0;
      left: 0;
      background: rgba(0,0,0,0.5);
      z-index:1
    }

    .ways-pay-box{
      position: fixed;
      width: 70%;
      top:50%;
      left: 50%;
      min-height: 5rem;
      border-radius: 0.5rem;
      background: #fff;
      z-index:20;
      -webkit-transform: translate(-50%,-50%);
      .ways-tip{
        width: 100%;
        height: 2rem;
        border-bottom:1px solid #f4f4f4;
        p{
          text-align: center;
          font-size: 0.75rem;
          padding-top: 0.5rem;
        }
      }
      .payof-way{
        width: 100%;
        min-height: 2rem;
        p{
          text-align: center;
          padding-top:0.4rem;
          img{
            width: 1.25rem;
            height: 1rem;
            vertical-align: middle;
          }
          span{
            font-size: 0.75rem;
          }
        }
      }
    }
  }

</style>
