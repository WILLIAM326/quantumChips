<template>
  <div class="preview-head-wrapper">
    <div class="preview-head">
      <p>资料证明</p>
    </div>

    <div class="credential-detail">
      <!--有证明材料的时候-->
        <div class="info-list">
          <ul>
            <li><p>患者</p></li>
            <li><p>{{afterShareInfo.auth.patient_name}}</p></li>
          </ul>
        </div>
        <div class="info-list">
          <ul>
            <li><p>所患疾病</p></li>
            <li><p>{{afterShareInfo.auth.disease}}</p></li>
          </ul>
        </div>
        <div class="info-list" v-if="shareWithdraw">
          <ul>
            <li><p>收款人</p></li>
            <li>
              <p>
                {{afterShareInfo.withdrawalsinfo.withdraw_name}}
                <span v-if="afterShareInfo.withdrawalsinfo.cash_people==1">(本人)</span>
                <span v-if="afterShareInfo.withdrawalsinfo.cash_people==2">(直系亲属)</span>
              </p>
            </li>
          </ul>
        </div>

        <div class="info-status">
          <p>
            <img src="../../../images/red.png">
            <span>患者身份证明已审核</span>
          </p>
          <p>
            <img src="../../../images/red.png">
            <span>患者疾病诊断证明已审核</span>
          </p>
          <p>
            <img src="../../../images/red.png">
            <span>诊断医院：{{afterShareInfo.auth.visiting_hospital}}</span>
          </p>
          <template v-if="shareWithdraw">
            <p>
              <img src="../../../images/red.png">
              <span>收款人身份证明已审核</span>
            </p>
            <p>
              <img src="../../../images/red.png">
              <span>收款人与患者的关系证明已审核</span>
            </p>
          </template>
        </div>
      <!--sdfsd-->
      <div class="credential-commitment">
        <!--<div class="commitment-up">-->
          <!--<ul>-->
            <!--<li>-->
              <!--<p>发起人承诺书</p>-->
            <!--</li>-->
            <!--<li>-->
              <!--<p>查看<img src="../../../images/arrow.png"></p>-->
            <!--</li>-->
          <!--</ul>-->
        <!--</div>-->
        <div class="commitment-down">
          <div class="commitment-down-left">
            <img src="../../../images/warn.png">
          </div>
          <div class="commitment-down-right">
            <p>该项目信息不属于慈善公开捐助信息，真实性由发布个人负责，xx筹提醒您了解后再帮助TA</p>
          </div>

        </div>
      </div>

    </div>

  </div>
</template>
<script>
  import {mapGetters} from 'vuex';
  import fancyBox from 'vue-fancybox';
  import fundProcess from '../../../components/fundProcess/fundProcess';
  export default {
    data(){
      return {

      }
    },
    components: {
      fundProcess
    },
    computed: {
      ...mapGetters(['afterShareInfo','shareWithdraw'])
    },
    mounted(){

    },
    methods: {
      open (e) {
        fancyBox(e.target, this.afterShareInfo.data.pro_images);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../style/mixin.scss";
  .preview-head-wrapper{
    width: 92%;
    min-height: 20rem;
    @include borderRadius(0.8rem);
    margin: auto;
    margin-top: 1rem;
    background: #fff;
    padding-bottom:0.6rem;
    -webkit-box-shadow:0px 3px 9px #ababab;
    .preview-head{
      @include widthAndHeight(100%, 2rem);
      @include bis('../../../images/sc.png');
      p{
        color: #fff;
        font-size:1rem;
        text-align: center;
        font-weight: bold;
        padding-top: 0.3rem;
      }
    }
    /*资料证明*/
  .credential-detail{
    width: 90%;
    margin: auto;
    padding-top:1rem;
    .credential-head{
      width: 50%;
      padding:0.1rem 0;
      border-left: 4px solid #ee6631;
    p{
      font-size:0.75rem;
      color:#353535;
      padding-left: 0.3rem;
      font-weight: bold;
    }
  }
  .credential-info{
    margin-top:1.3rem;
    p{
      text-align: center;
      font-size:0.75rem;
      color:$fontSizeColorA;
      line-height:1.7;
    img{
        @include widthAndHeight(4.7rem,.4.7rem);
      }
    }
  }
  .send-credential{
    margin: auto;
    margin-top: 1rem;
    @include widthAndHeight(80%,2.2rem);
    @include bis('../../../images/scbtn.png');
    p{
      color: $fontSizeColorE;
      text-align: center;
      padding-top: 0.3rem;
      font-weight: bold;
    }

  }
  .credential-commitment{
    width: 100%;
    margin: 1rem auto;
    min-height: 5rem;
    background: #f4f4f4;
    padding:0.8rem;
    @include borderRadius(0.5rem);
    .commitment-up{
      width: 100%;
      height: 1.5rem;
      border-bottom: 1px solid #ddd;
      li{
        float: left;
      p{
        font-size:0.55rem;
        color:$fontSizeColorL;
      }
    }
    li:nth-child(2){
      float: right;
      p{
        color:$fontSizeColorA;
      }
      img{
        @include widthAndHeight(0.3rem,0.5rem);
        vertical-align: middle;
        margin-left: 0.3rem;
      }
    }
  }
  .commitment-down{
    @extend .commitment-up;
      border: 0;
      height: 2.5rem;
    .commitment-down-left{
      float: left;
      width:7%;
    img{
      width: 0.75rem;
      height: 0.65rem;
    }
    }
    .commitment-down-right{
      float: right;
      width:93%;
      p{
      font-size:0.6rem;
      color:#808080;
      padding-top:0.4rem;
      text-align: left;
      }
      }
    }
  }
  .info-list{
    width: 100%;
    height: 2rem;
    background: #f4f4f4;
    margin-top: 0.5rem;
    @include borderRadius(0.3rem);
    li:nth-child(1){
      float: left;
      width: 30%;
    p{
      font-size:0.75rem;
      color: #3f3f3f;
      font-weight: bold;
      padding-top: 0.5rem;
      padding-left: 0.5rem;
      text-align: left;
    }
  }
  li:nth-child(2){
    @extend li:nth-child(1);
      width:70%;
    p{
      font-weight: normal;
      font-size:0.7rem;
    }
    }
  }
  .info-status{
    width: 90%;
    margin: auto;
  p{
   text-align:left;
  img{
  @include widthAndHeight(0.6rem,0.6rem);
    vertical-align: middle;
  }
  span{
    font-size:0.6rem;
    color:$fontSizeColorA;
    margin-left: 0.3rem;
  }
  }
  }

  }


  }


</style>
