<template>
  <div class="process-content">

    <div class="content-box">
      <div class="box-title">
        <p>申请提现进度</p>
      </div>
      <div class="current-process">
        <template v-for="item in processData">
          <ul>
            <li>
              <template v-if="item.type==1">
                <p><img src="../../images/suc1.png"></p>
              </template>
              <template v-if="item.type==0">
                <p><img src="../../images/fail.png"></p>
              </template>
            </li>
            <li>
              <p>{{item.title}}</p>
              <p v-if="item.type==0" class="textcon1">{{item.reason}}</p>
              <p class="textcon">{{item.date}}</p>
            </li>
          </ul>
        </template>
      </div>

      <div class="process-info">
        <p>1.当天申请提款平台需1-3个工作日审核；</p>
        <p>2.审核通过后次日平台放款，实际到账时间以银行为准；</p>
      </div>
      <service-phone></service-phone>

    </div>


    <!--按钮-->
    <template v-if="checkFlag==0">
      <div class="withdraw-cash-btn">
        <router-link :to="{ path: '/accountInfo', query: {projectId: itemId }}">
          <div class="submit-area">
            <p>重新提交资料</p>
          </div>
        </router-link>
      </div>
    </template>
    <template v-if="checkFlag==1">
      <div class="withdraw-cash-btn">
        <div class="submit-area" @click="returnBack">
          <p>返回</p>
        </div>
      </div>
    </template>

  </div>

</template>

<script>

  import servicePhone from '../../components/servicePhone/service';
  import {withDrawCashStatus} from '../../api/getData'
  import {getToken} from '../../utils/auth'

    export default {
        data(){
            return{
              itemId:this.$route.query.projectId,
              processData:[],
              checkFlag:''
            }
        },
        components:{
          servicePhone
        },
        mounted(){
          this.initProcess()
        },
        methods: {
          initProcess(){
            const postdata = {
              token: getToken(),
              project_id: this.itemId
            }
            withDrawCashStatus(postdata).then((res) => {
              if (res.stauts == 1) {
                this.processData = res.data
              for (let i = 0; i < this.processData.length; i++) {
                if (this.processData[i].type == '0') {
                  this.checkFlag = 0
                }
                if (this.processData[i].type == '1') {
                  this.checkFlag = 1
                }
              }
              }
            })
          },
          returnBack(){
            this.$router.go(-1);
          }
        }
    }
</script>

<style lang="scss" scoped>
  @import "../../style/mixin.scss";
  .process-content{
    width: 100%;
    height: 30rem;
    @include bis('../../images/messagebg.png');
    padding-top:1rem;
    .content-box{
      width: 90%;
      margin: auto;
      min-height:10rem;
      @include borderRadius(0.5rem);
      background: #fff;
      padding: 1rem;
      .box-title{
        p{
          text-align: center;
          font-size:1.1rem;
          color:$fontSizeColorA;

        }
      }
      .current-process{
        width: 90%;
        margin: auto;
        margin-top:1rem;
        ul{
          display:inline-block;
          li:nth-child(1){
            img{
              width:1rem;
              height: 1rem;
            }
          }
          li:nth-child(2){
            margin-left:0.5rem;
            line-height:1.7;
            font-size:0.75rem;
            color:#4c4c4c;
            .textcon1{
              font-size:0.75rem;
              color:#4c4c4c;
            }
            .textcon{
              font-size:0.625rem;
              color:#b7b7b7;
            }
          }
        }
      }

    }
      .process-info{
        width: 100%;
        margin-top:2rem;
        p{
          font-size:0.55rem;
          color:#898989;
          line-height: 1.7;
        }
      }
    .withdraw-cash-btn{
      position: fixed;
      bottom: 0;
      @include widthAndHeight(100%,3rem);
      box-shadow: 0px 0px 10px 0px #e5e5e5;
      background: #fff;
      .submit-area{
        @include widthAndHeight(12.5rem,2.2rem);
        @include bis('../../images/withdraw.png');
        margin: auto;
        margin-top: 0.4rem;
        p{
          text-align: center;
          font-size:1.1rem;
          color:#fff;
          padding-top: 0.3rem;
          font-weight: bold;
        }
      }
    }
  }

</style>
