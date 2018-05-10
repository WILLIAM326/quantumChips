<template>
  <div class="help-center-wrapper">
    <div class="center-content">
      <div class="rule">
        <div class="r-detial">
          <ul>
            <template v-for="(question,index) in questionList">
              <li v-bind:class="{'right-arrow':(index+1)==state.comNum}" @click="commonRule((index+1))">
                <a href="javascript:void(0)">{{question.news_title}}</a>
              </li>
              <div class="rdd" v-show="(index+1)==state.comNum">
                <div class="rule-detail" v-html="question.news_content"></div>
              </div>
            </template>
          </ul>
        </div>
      </div>

      <div class="server-call">
       <service-phone></service-phone>
      </div>
    </div>
  </div>
</template>
<script>
  import {helpInfoAction} from '../../api/getData'
  import servicePhone from '../../components/servicePhone/service'
  export default {
    data(){
      return {
        state: {
          comNum: 0,
          clickNum: 0,
          stateShow: false,
        },
        questionList:[]
      }
    },
    components:{
      servicePhone
    },
    mounted(){
        this.initData()
    },
    methods: {
      initData(){
        helpInfoAction().then((res) => {
          if (res.stauts == 1) {
            this.questionList = res.data
          }
        })
      },
      commonRule(num) {
        if (this.state.comNum == num) {
          this.state.comNum = 0;
        } else {
          this.state.comNum = num;
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../style/mixin.scss";
  .help-center-wrapper{
     width:100%;
     height:30rem;
     padding-top: 2rem;
     @include bis('../../images/messagebg.png');
      .center-content{
        width: 90%;
        min-height: 10rem;
        margin: auto;
        background: #fff;
        border-radius: 0.8rem;
        padding:0.65rem 0 0.8rem 0;
      }
      .rule {
        width: 100%;
        background: #fff;
        margin-bottom: 0.38rem;
        font-size: 0.7rem;
        overflow:hidden;
        li {
          width: 100%;
          float: left;
          border-bottom: 1px solid #f4f4f4;
          padding:0 0.5rem;
          a{
            width: 100%;
            height: 2.25rem;
            line-height: 2.25rem;
            font-size: 0.75rem;
            float: left;
            color: #666666;
          }
          &:after {
            content: '';
            border-right: 1px solid #b3b3b3;
            border-top: 1px solid #b3b3b3;
            width: 0.4rem;
            height: 0.4rem;
            -webkit-transform: rotate(135deg);
            transform: rotate(135deg);
            float: right;
            margin-top: 0.8rem;
            margin-right: 1rem;
            position: absolute;
            right: 0.75rem;
          }
        }
        .rdd {
          border-bottom: 1px dashed #f5f5f5;
          float: left;
          position: relative;
          padding: 0 0.5rem;
          top: -0.6rem;
          .rule-detail{
            padding: 0.35rem 0.35rem;
            float: left;
            background: #f5f5f5;
            margin: 0.5rem 0;
            color: #727272;
          }
          &:after {
            content: '';
            width: 0;
            height: 0;
            border-left: 0.4rem solid transparent;
            border-right: 0.4rem solid transparent;
            border-bottom: 0.5rem solid #f5f5f5;
            position: absolute;
            top: 0;
            left: 1.25rem;
          }
        }
        .right-arrow:after {
          -webkit-transform: rotate(45deg) !important;
          transform: rotate(45deg) !important;
        }
      }

  }

</style>
