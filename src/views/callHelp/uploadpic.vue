<template>
  <div class="input-tittle-wrapper">
    <div class="cash-area">
      <p class="collect-title">添加图片<span @click="addImgIns">添加指南</span></p>
      <div class="upload-area">
        <p>真实感人的照片，更易获得大家的信任，更快筹到钱(可上传患病时的照片、生活照等)</p>

        <div class="picture-wrapper">
          <div class="showimg-area">
            <ul>
              <template v-if="!editBaseInfoFlag">
                <li v-for='(item,index) in imgList'>
                  <img :src="item">
                  <div class="cancel-icon" @click='delete_img(index)'>
                    <img src="../../images/cancel.png">
                  </div>
                </li>
              </template>
              <template v-else>
                <li v-for='(item,index) in imgList=totalEditBaseInfo.pro_images'>
                  <img :src="item">
                  <div class="cancel-icon" @click='delete_img(index)'>
                    <img src="../../images/cancel.png">
                  </div>
                </li>
              </template>
              <li v-show="listFlag">
                <div class="choose-img-upload">
                  <p>
                    <img src="../../images/upload.png">
                  </p>
                  <input @change='add_img' type="file" accept="image/*">
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <prompt-box v-show="showAlert" @closeTip="showAlert=false" :dataObj="dataObj" v-if="dataObj"></prompt-box>
    <load-animate v-show="loadShow"></load-animate>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import promptBox from '../../components/common/promptBox';//文本提示框
  import {updateImgAction} from '../../api/getData';
  import {setLocalStorageStore,getLocalStorageStore} from '../../utils/auth';
  import loadAnimate from '../../components/common/loadingAnimate';
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
        loadShow:false
      }
    },
    components:{
      promptBox,
      loadAnimate
    },
    computed:{
      ...mapGetters(['totalEditBaseInfo','editBaseInfoFlag'])
    },
    mounted(){
        this.initImgLen();
    },
    methods:{
      initImgLen(){
          this.$emit("updateImg",this.imgList.length,this.imgList)
      },
      addImgIns(){
          this.showAlert=true;
          this.dataObj.infoTitle='选择真实有感染力的照片';
          this.dataObj.alertText='上传的第一张图片为分享页面图片，要直观清晰有感染力的人物照片，如患者卧床照、患病前的生活照、其它建议上传增加可信度的照片，如医疗证明、家庭情况、治疗过程等';
      },
      delete_img(item){
        this.imgList.splice(item, 1);
      },
      add_img(event){
        const reader = new FileReader();
        const img1 = event.target.files[0];
        reader.readAsDataURL(img1);
        const _this=this;
        _this.loadShow=true
        reader.onloadend = function () {
          updateImgAction(reader.result).then((res)=>{
              if(res.stauts==1){
                _this.loadShow=false
                _this.imgList.push(res.data)
                _this.initImgLen();
              }
          }).catch(function(reason) {
          })
        }
      }
    },
    watch:{
      'imgList.length'(len){
          this.initImgLen();//再触发一下获取图片长度的函数
          if(len==6){
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
  .input-tittle-wrapper{
    width:90%;
    margin:auto;
  .cash-area{
    width:100%;
  .collect-title{
    color: $fontSizeColorF;
    font-size:0.75rem;
    margin-top:0.5rem;
  span{
    color:$fontSizeColorG;
    font-size:0.55rem;
    border-bottom: 1px solid #636363;
    margin-left: 0.5rem;
  }
  }
  .upload-area{
    width: 100%;
    min-height:7rem;
    font-size:0.7rem;
    background: #fff;
    moz-box-shadow:2px 2px 5px #a7a7a7;
    -webkit-box-shadow:2px 2px 5px #a7a7a7;
    box-shadow:2px 2px 5px #a7a7a7;
    @include borderRadius(0.3rem);
    margin-top:0.5rem;
    padding:0.8rem 0.5rem;
    p{
      font-size:0.6rem;
      color: $fontSizeColorK;
    }
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
  }

  }
</style>
