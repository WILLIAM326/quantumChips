<template>
 <div class="prove-it-wrapper">
   <div class="prove-top-content">
     <div class="prove-slogo">
       <p>*提示:感谢您的热心,您的如实填写一下真实身份、真实情况，将为受助人赢取更多帮助和信任</p>
     </div>
     <div class="prove-relationship">
       <div class="relationship-title">
         <p>与受助人的关系</p>
       </div>
       <div class="select-relationship">
         <ul>
           <template v-for="(item,index) in selectArr">
             <li @click="chooseRelation(item,index)" :class="{'currentColor':checkStatus==index}">
               <p>{{item.value}}</p>
             </li>
           </template>
         </ul>
       </div>
       <!--真实姓名-->
       <div style="clear: both"></div>
       <div class="relationship-name">
         <div class="name-left">
          <p>真实姓名</p>
         </div>
         <div class="name-right">
           <input type="text" v-model="realName" maxlength="8" placeholder="请填写您的真实姓名">
         </div>
       </div>
       <div class="relationship-idcard">
         <div class="name-left">
           <p>身份证号</p>
         </div>
         <div class="name-right">
           <input type="text" v-model="helperIdCard" maxlength="18" placeholder="请填写您的身份证号">
         </div>
       </div>
     </div>
   </div>
   <!--step-line-->
   <div class="step-line"></div>
   <!---->
   <div class="input-something">
     <textarea v-model="truthWorld" placeholder="说一些详细情况吧"></textarea>
   </div>

   <!--提交按钮-->
   <div class="next-step">
     <div class="next-step-btn" @click="proveAction">
       <p>帮TA证实</p>
     </div>
   </div>
   <message-tip :messageWord="messageWord" :messageShow="messageShow"></message-tip>
 </div>
</template>

<script>
    import {getToken,getLocalStorageStore} from '../../utils/auth'
    import {projectProveAction} from '../../api/getData'
    import {checkIdCard,checkRealName} from '../../utils/validate'
    import messageTip from '../../components/common/messageTip';
    export default {
        data(){
            return{
              selectArr: [{
                id: 1,
                value: '亲人'
              }, {
                id: 2,
                value: '朋友'
              }, {
                id: 3,
                value: '同事'
              }, {
                id: 4,
                value: '病友'
              }, {
                id: 5,
                value: '邻居'
              }, {
                id: 6,
                value: '同学'
              }, {
                id: 7,
                value: '志愿者'
              }, {
                id: 8,
                value: '其它'
              }],
              checkStatus:10,
              messageWord:'',//提示信息
              messageShow:false,
              itemId:this.$route.query.projectId,//项目id
              helperIdCard:'',//身份证号
              realName:'',//真实姓名
              truthWorld:'',//真实情况
              chooseType:''//关系
            }
        },
        components:{
          messageTip
        },
        methods:{
          chooseRelation(item,num){
            this.checkStatus=num;
            this.chooseType=item.id;
            this.totalPrice=item.price;
          },
          //证明人与受助人关系 1:亲人 2:朋友 3:同事 4:病友 5:邻居 6:同学 7:志愿者 8:其他
          proveAction(){
            if(!this.chooseType){
              this.messageShow = true;
              this.messageWord = '请选择与受助人之间的关系';
              return false;
            }
            if (!this.realName) {
              this.messageShow = true;
              this.messageWord = '姓名不能为空';
              return false;
            }
            if(this.realName&&this.realName.length==1){
              this.messageShow = true;
              this.messageWord = '姓名不能为一个字';
              return false;
            }
            if (this.realName && !checkRealName(this.realName)) {
              this.messageShow = true;
              this.messageWord = "姓名只能为中文";
              return false;
            }
//            if (!this.helperIdCard) {
//              this.messageShow = true;
//              this.messageWord = '身份证不能为空';
//              return false;
//            }
//
//            if(this.helperIdCard&&!checkIdCard(this.helperIdCard)){
//              this.messageShow = true;
//              this.messageWord = "请填写正确的身份证号";
//              return false;
//            }
            const postData = {
              token: getToken(),
              pid: this.itemId,
              relat: this.chooseType,
              card_num: this.helperIdCard,
              real_name: this.realName,
              prove_detail: this.truthWorld
            }
            projectProveAction(postData).then((res)=>{
              if (res.stauts == 1) {
                this.messageShow = true;
                this.messageWord = res.msg;
              }
              if (res.stauts == 0) {
                this.messageShow = true;
                this.messageWord = res.msg;
              }
            })
          }
        },
        watch:{
          'messageShow'(){
            setTimeout(()=>{
              this.messageShow=false;
            },1500)
          }
        }
    }
</script>

<style lang="scss" scoped>
  @import "../../style/mixin.scss";
  .prove-it-wrapper{
    width: 100%;
    height: 30rem;
    @include bis('../../images/messagebg.png');
    padding-top:1rem;
    .prove-top-content{
      width: 90%;
      margin: auto;
      min-height: 10rem;
      background: #fff;
      border-top-left-radius: 0.8rem;
      border-top-right-radius: 0.8rem;
      padding:0.8rem;
      .prove-slogo{
        p{
          font-size:0.6rem;
          color:$fontSizeColorL;
        }
      }
      .prove-relationship{
        margin-top:1rem;
        .relationship-title{
          width: 100%;
          height: 1rem;
          border-left: 5px solid #ff6631;
          p{
            font-size: 0.75rem;
            color: #353535;
            font-weight: bold;
            padding-left: 0.3rem;
          }
        }
        .select-relationship{
          margin-top:0.5rem;
          li{
            width: 3rem;
            height: 1.4rem;
            border:1px solid #ff6631;
            border-radius: 0.3rem;
            margin-top:0.3rem;
            margin-right:0.2rem;
            p{
              font-size:0.7rem;
              color:#ff6631;
              text-align: center;
              padding-top: 0.2rem;
              font-weight:bold;
            }
          }

        }
        .relationship-name{
          width: 100%;
          height: 2rem;
          background: #f4f4f4;
          border-radius: 0.3rem;
          margin-top:1rem;
          .name-left{
            width: 30%;
            float: left;
            p{
              font-size:0.7rem;
              color:#4c4c4c;
              padding: 0.4rem 0 0 0.3rem;
            }
          }
          .name-right{
            @extend .name-left;
            float: right;
            width: 70%;
            input{
              width: 90%;
              height: 100%;
              background: #f4f4f4;
              font-size:0.7rem;
              padding-top:0.4rem;
              &::-webkit-input-placeholder{
                color:#bcbcbc;
              }
            }
          }
        }
        .relationship-idcard{
          @extend .relationship-name;
          margin-top: 0.5rem;
        }
      }
    }
    .input-something{
      width: 90%;
      min-height: 5rem;
      background: #fff;
      margin: auto;
      border-bottom-left-radius: 0.8rem;
      border-bottom-right-radius: 0.8rem;
      padding: 0.8rem;
      textarea{
        width: 100%;
        height: 4rem;
        background: #f4f4f4;
        border-radius: 0.3rem;
        padding: 0.5rem;
        font-size:0.7rem;
        &::-webkit-input-placeholder{
            font-size:0.7rem;
            color:#b8b8b8;
         }
      }

    }
    .next-step{
      position: fixed;
      bottom: 0;
      -webkit-box-shadow: 0px 0px 10px 0px #e5e5e5;
      box-shadow: 0px 0px 10px 0px #e5e5e5;
      background: #ffffff;
      width: 100%;
      height: 3.5rem;
      .next-step-btn{
        @include widthAndHeight(70%,2.3rem);
        @include bis('../../images/send.png');
        margin: auto;
        margin-top: 0.6rem;
        p{
          text-align: center;
          font-size:1rem;
          color:#fff;
          font-weight: bold;
          padding-top: 0.4rem;
        }
      }
    }
    .currentColor{
      background: #ff6631;
      p{
        color: #fff!important;
      }
    }
    .step-line{
      width: 90%;
      height: 1rem;
      margin: auto;
      @include bis('../../images/col.png');
    }
  }

</style>
