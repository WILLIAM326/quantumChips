<template>
  <div class="public-promise-box">
    <div class="promise-mask"></div>
    <div class="input-title-wrapper">
    <div class="cash-area">
      <p class="collect-title">发布内容</p>
      <div class="input-promise-word">
        <textarea v-model="promiseText" placeholder="请填写更新动态内容"></textarea>
      </div>
      <div class="upload-area">
        <div class="picture-wrapper">
          <div class="showimg-area">
            <ul>
              <li v-show="listFlag">
                <div class="choose-img-upload">
                  <p>
                    <img src="../../images/upload.png">
                  </p>
                  <input @change='add_img' type="file">
                </div>
              </li>
              <li v-for='(item,index) in imgList'>
                <img :src="item">
                <div class="cancel-icon" @click='delete_img(index)'>
                  <img src="../../images/cancel.png">
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="submit-promise" @click="actionPromise">
        <p>提交</p>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        instructions:'',//要输入的求助说明
        showAlert:false,
        dataObj:{
          infoTitle:'',
          alertText:''
        },
        imgList:[],
        listFlag:true,//上传图片的长度
        promiseText:''//要等新的内容
      }
    },
//    components:{
//      promptBox
//    },
    mounted(){
    },
    computed:{

    },
    methods:{
      //输入金额
      inputInstructions(){
        this.$emit('inputInstructions',this.instructions);
      },
      delete_img(item){
        this.imgList.splice(item, 1);
      },
      add_img(event){
        const reader = new FileReader();
        const img1 = event.target.files[0];
        reader.readAsDataURL(img1);
        const _this=this;
        reader.onloadend = function () {
          _this.imgList.push(reader.result)
        }
      },
      actionPromise(){
        this.$emit('callContent')

        if(!this.promiseText){
          }else{
            this.$emit('sendPromise')
          }
      }
    },
    watch:{
      'imgList.length'(len){
        if(len==8){
          this.listFlag=false;
        }else{
          this.listFlag=true;
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/mixin.scss";
  .public-promise-box{
    .promise-mask{
      width: 100%;
      height: 100%;
      position: fixed;
      z-index: 10;
      top:0;
      left: 0;
      background: rgba(0,0,0,0.5);
    }
    .input-title-wrapper{
      width:90%;
      margin:auto;
      min-height: 10rem;
      background: #fff;
      border-radius: 0.8rem;
      top:50%;
      left: 50%;
      padding: 0.8rem;
      -webkit-transform: translate(-50%,-50%);
      position: fixed;
      z-index: 20;
      .cash-area{
       width:100%;
      .collect-title{
        color: #4c4c4c;
        font-size:0.8rem;
        margin-top:0.5rem;
      }
      .input-promise-word{
        width: 100%;
        textarea{
          width: 100%;
          height: 5rem;
          background: #f4f4f4;
          border-radius: 0.5rem;
          padding: 0.5rem;
          margin-top: 0.5rem;
          font-size:0.8rem;
          &::-webkit-input-placeholder{
            color:#c1c1c1;
           }
        }
      }
      .upload-area{
        width: 100%;
        .picture-wrapper{
          width:100%;
          min-height:5rem;
          .choose-img-upload{
          float: left;
          @include widthAndHeight(3rem,3rem);
          position: relative;
          p{
            text-align:center;
            padding-top:0.8rem;
            img{
              width: 1.5rem!important;
              height: 1.2rem!important;
            }
          }
          input{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 99999;
            opacity: 0;
          }
        }
        .showimg-area{
          ul{
            display:inline-block;
            li{
              position:relative;
              margin-right:0.2rem;
              margin-top:0.2rem;
              img{
                @include widthAndHeight(3.1rem,3.1rem);
                }
                .cancel-icon{
                  position:absolute;
                  top:-0.2rem;
                  right:-0.2rem;
                  img{
                  width:0.75rem;
                  height: 0.75rem;
                  }
                }
              }
            }
          }
        }
      }
      .submit-promise{
        width: 80%;
        height: 2.5rem;
        margin: auto;
        margin-top: 0.5rem;
        @include bis('../../images/needbtn.png');
        p{
          font-size:1.1rem;
          color:#fff;
          text-align: center;
          font-weight: bold;
          padding-top: 0.4rem;
        }
      }

      }
    }

  }

</style>
