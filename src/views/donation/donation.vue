<template>
    <div class="donation-wrapper">
      <div class="donation-content">
        <div class="donation-header">
          <div class="donation-header-left">
            <p>捐助金额(元)</p>
          </div>
          <div class="donation-header-right">
            <p><img src="../../images/close.png"></p>
          </div>
        </div>
        <!--捐助金额-->
        <div class="choose-area">
          <div class="choose-price">
            <ul>
              <template v-for="(item,index) in selectedPrice">
                <li @click="choosePrice(item,index)" :class="{'currentColor':checkStatus==index}">
                  <p>{{item.price}}</p>
                </li>
              </template>
            </ul>
          </div>

          <div class="price-input">
            <div class="price-left">
                <p>输入金额</p>
            </div>
            <div class="price-right">
              <input type="tel" v-model="priceInput" placeholder="助人为善，感恩有你">
            </div>
          </div>

          <!--输入文本-->
          <div class="input-textarea">
            <textarea v-model="encouragementWord" placeholder="对TA说一句鼓励的话吧"></textarea>
          </div>
        </div>
      </div>


      <!--确认提交按钮-->
      <div class="confirm-wrapper">
        <ul>
          <li>
            <div class="confirm-price">
              <p>¥<span>{{totalPrice}}</span></p>
            </div>
            <!--<div class="confirm-widthname"  @click="toggle">-->
              <!--<label class="check_user_list" :class="{'selectedColor':colorStatus}"></label>-->
              <!--匿名帮助-->
            <!--</div>-->
          </li>
          <li>
            <div class="confirm-pay" @click="confirmPay">
              <p>确认支付</p>
            </div>
          </li>
        </ul>
      </div>
      <message-tip :messageWord="messageWord" :messageShow="messageShow"></message-tip>
      <we-chat-native-pay v-show="weChatShow" :payData="payData" @weChatMaskClose="maskCloseAction"></we-chat-native-pay>
    </div>
</template>

<script>
  import {weChatPayAction} from '../../api/getData'
  import {getToken} from '../../utils/auth'
  import messageTip from '../../components/common/messageTip'
  import weChatNativePay from '../weChatNativePay/weChatNativePay'
  export default {
    data(){
      return {
        selectedPrice: [
          {
            price: 5
          }, {
            price: 10
          }, {
            price: 30
          }, {
            price: 60
          }, {
            price: 100
          }, {
            price: 200
          }],
        checkStatus: 1,
        inchargePrice:'',//充值金额
        priceInput:'',
        totalPrice:10,
        encouragementWord:'',//鼓励的话
        colorStatus:false,
        messageWord:'',//提示信息
        messageShow:false,
        itemId:this.$route.query.projectId,
        weChatShow:false,
        payData:{}
      }
    },
    components:{
      messageTip,
      weChatNativePay
    },
    methods: {
      choosePrice(item, num){
        this.checkStatus = num;
        this.inchargePrice = item.price;
        this.priceInput='';
        this.totalPrice = item.price;
      },
      maskCloseAction(){
          this.weChatShow=false
      },
      toggle(){
        this.colorStatus = !this.colorStatus;
      },
      confirmPay(){
        if (!this.totalPrice) {
          this.messageShow = true;
          this.messageWord = "金额不能为空";
          return false;
        } else {
          this.weChatShow = true;
          this.payData = {
            project_id: this.itemId,
            token: getToken(),
            pay_money: this.totalPrice,
            message: this.encouragementWord
          }
        }
      }
    },
    watch: {
        'priceInput'(value){
          if (value && value > 0) {
            this.inchargePrice = 0;
            this.checkStatus = 10;
            this.totalPrice = value;
          }
        },
        'messageShow'(){
          setTimeout(() => {
            this.messageShow = false;
          }, 1500)
        }
      }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/mixin.scss";
  .donation-wrapper{
    width:100%;
    height: 30rem;
    padding-top: 2rem;
    @include bis('../../images/messagebg.png');
    .donation-content{
      width:90%;
      margin:auto;
      min-height:20rem;
      background: #fff;
      @include borderRadius(0.8rem);
      .donation-header{
        @include widthAndHeight(100%,2rem);
        @include bis('../../images/sc.png');
        .donation-header-left{
          width: 70%;
          float: left;
          p{
            text-align:right;
            font-size: 1rem;
            color:#fff;
            padding-top: 0.2rem;
            font-weight: bold;
          }
        }
        .donation-header-right{
          width: 30%;
          float: right;
          p{
            text-align:right;
            margin-right:0.5rem;
            margin-top:0.3rem;
            img{
              width: 0.75rem;
              height: 0.75rem;
            }
          }
        }
      }
      .choose-area{
        width: 90%;
        margin: auto;
        .choose-price{
          width: 100%;
          margin-top:1rem;
          height:5rem;
          li{
            width: 4rem;
            height: 1.7rem;
            margin-top: 0.5rem;
            @include borderRadius(0.3rem);
            border: 1px solid #ff6631;
            margin-right:0.2rem;
            p{
              font-size:1.5rem;
              font-family: Knockout-lzhz;
              color: #ff6631;
              text-align: center;
            }
          }
        }
        .price-input{
            width: 100%;
            height: 2rem;
            margin-top: 0.7rem;
            @include borderRadius(0.3rem);
            background: #f4f4f4;
            .price-left{
              width: 30%;
              float: left;
              padding-left:0.4rem;
              p{
                font-size:0.75rem;
                color:#3f3f3f;
                padding-top: 0.5rem;
              }
            }
            .price-right{
              width: 70%;
              float: right;
              padding-right:0.3rem;
              input{
                width: 100%;
                height:2rem;
                background: #f4f4f4;
                font-size:0.75rem;
                &::-webkit-input-placeholder{
                   color:#b8b8b8;
                }
              }
            }
        }
        .input-textarea{
          width: 100%;
          min-height:4rem;
          margin-top:1rem;
          textarea{
            width: 100%;
            min-height: 6rem;
            padding:1rem;
            @include borderRadius(0.3rem);
            background: #f4f4f4;
            font-size:0.7rem;
            &::-webkit-input-placeholder{
              color:#b8b8b8;
            }
          }
        }
      }
    }
    .currentColor{
      background: #ff6631;
      p{
        color: #fff!important;
      }
    }

    .confirm-wrapper{
      position: fixed;
      bottom:0;
      width: 100%;
      height: 3rem;
      background: #fff;
      box-shadow: 0px 0px 10px 0px #e5e5e5;
      -webkit-box-shadow: 0px 0px 10px 0px #e5e5e5;
      li{
        width: 50%;
        .confirm-price{
          float: left;
          padding-top:0.5rem;
          padding-left:1rem;
          p{
            color:#ff6631;
            font-size:1.05rem;
            span{
              font-family: Knockout-lzhz;
              font-size:1.8rem;
              margin-left: 0.1rem;
            }
          }
        }
        .confirm-widthname{
          float:right;
          color:#666666;
          font-size:0.625rem;
          padding-top:1rem;
          padding-right:0.7rem;
          .check_user_list{
            border: 1px solid #ff6631;
            padding: 0.4rem;
            display: inline-block;
            position: relative;
            border-radius: 50%;
            vertical-align: middle;
            background: #fff;
            &:after {
               content: '';
               width: 0.2rem;
               height: 0.4rem;
               border-right: 0.1rem solid #fff;
               border-bottom: 0.1rem solid #fff;
               -webkit-transform: rotate(40deg);
               transform: rotate(40deg);
               position: absolute;
               top: 0.1rem;
               left: .2rem;
               color: #44C278;
             }
          }

        }
        .confirm-pay {
          width: 7.45rem;
          height: 2.1rem;
          @include bis('../../images/confirm.png');
          margin: auto;
          margin-top: 0.5rem;
          p{
            font-size:1.15rem;
            color: #fff;
            text-align: center;
            font-weight: bold;
            padding-top: 0.2rem;
          }
        }
      }
    }
    .selectedColor {
      background-color: #ff6631 !important;
      border-color: #ff6631 !important;
    }

  }

</style>
