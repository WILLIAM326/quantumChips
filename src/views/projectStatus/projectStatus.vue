<template>
  <div class="status-wrapper" @click="closeStatus">
    <div class="result-content">
      <div class="content-title">
        <p>{{processObj.processDesc}}</p>
      </div>
      <template v-for="item in processData">
        <div class="list-detail-box">
          <ul>
            <li class="detail-icon">
              <img src="../../images/suc1.png" v-if="item.type==1">
              <img src="../../images/fail.png" v-if="item.type==0">
            </li>
            <li class="detail-info">
              <p>{{item.title}}</p>
              <p v-if="item.type==0" class="textCon1">{{item.reason}}</p>
              <p class="textCon">{{item.date}}</p>
            </li>
          </ul>
        </div>
      </template>

      <!--验证失败-->
      <template v-if="processObj.itemFlag==1">
      <div class="checking-submit">
        <router-link :to="{path: '/patientInformation', query: {projectId: processObj.itemId}}">
          <p>重新验证</p>
        </router-link>
      </div>
      </template>

      <template v-if="processObj.itemFlag==2">
        <div class="message-warm">
          <p>调查大约需要15天时间，请耐心等候</p>
        </div>
        <!--<div class="checking-submit" style="margin-top: 0">-->
          <!--<router-link :to="{path: '/accountInfo', query: {projectId: processObj.itemId}}">-->
            <!--<p>提交提现资料</p>-->
          <!--</router-link>-->
        <!--</div>-->
      </template>
      <!--验证失败-->
      <template v-if="processObj.itemFlag==3">
        <div class="checking-submit">
          <router-link :to="{path: '/accountInfo', query: {projectId: processObj.itemId}}">
            <p>重新验证</p>
          </router-link>
        </div>
      </template>
      <service-phone></service-phone>
    </div>
  </div>
</template>

<script>
    import servicePhone from '../../components/servicePhone/service'
    export default {
        data(){
            return{

            }
        },
        props:['processData','processObj'],
        components:{
          servicePhone
        },
        methods:{
          closeStatus(){
              this.$emit('emitAction')
          }
        }
    }
</script>

<style lang="scss" scoped>
  @import "../../style/mixin.scss";
  .status-wrapper{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 200;
    background: rgba(0,0,0,0.5);
  }
  .result-content{
    position: fixed;
    width: 90%;
    min-height: 15rem;
    background: #fff;
    border-radius: 0.8rem;
    top:50%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    padding-bottom:0.8rem;
    .content-title{
      margin-top:1rem;
      p{
        text-align: center;
        color:#ff6631;
        font-size:1rem;
      }
    }
    .list-detail-box{
      width:80%;
      height: 2rem;
      margin:auto;
      margin-top:1rem;
      .detail-icon{
        img{
          width: 1rem;
          height: 1rem;
        }
      }
      .detail-info{
        margin-left:1rem;
        color:#4c4c4c;
        font-size:0.75rem;
        .textCon1{
          color:#4c4c4c;
          font-size:0.75rem;
        }
        .textCon{
          color:#b7b7b7;
          font-size:0.75rem;
        }
      }

    }
    .message-warm{
      width: 79%;
      height: 2rem;
      margin: auto;
      margin-top: 1rem;
      p{
        font-size:0.65rem;
        color:#929292;
      }
    }
     /*按钮*/
    .checking-submit{
      margin: auto;
      margin-top: 3rem;
      @include widthAndHeight(80%,2.5rem);
      @include bis('../../images/send.png');
      p{
        font-size:1.1rem;
        color:#fff;
        text-align: center;
        font-weight: bold;
        padding-top: 0.5rem;
      }
    }
  }

</style>
