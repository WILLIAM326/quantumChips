<template>
  <!--本人上传证明材料-->
  <div class="evidence-upload-wrapper">
    <div class="evidence-content">
      <div class="realatives-title">
        <p>与患者的关系证明信息</p>
      </div>
      <template v-for="photoItem in withdrawMutualPhotoes">
        <div class="evidence-head">
          <p class="withdrawself" style="margin-top: 0">
            {{photoItem.title}}
          </p>
          <div class="self-upload-area">
              <div class="upload-note" :style="{'background-image': 'url(' + photoItem.uploadPhoto + ')'}">
                <!--<img :src="photoItem.uploadPhoto">-->
              </div>
            <upload-images :photoItem="photoItem"></upload-images>
          </div>
          <div class="word-warn">
            <p>*所有信息必须可见，必须能看清楚文字信息</p>
          </div>
        </div>
      </template>
      <!--客服电话-->
      <service-phone></service-phone>
    </div>
    <!--content end-->
    <load-animate v-show="loadingFlag"></load-animate>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import loadAnimate from '../../../components/common/loadingAnimate'
  import uploadImages from '../../../components/upload/withdrawUpload';
  import servicePhone from '../../../components/servicePhone/service';
  import fancyBox from 'vue-fancybox';

  export default {
    data(){
      return{
        selfImg:'',
      }
    },
    computed:{
      ...mapGetters(['withdrawMutualPhotoes','loadingFlag']),
    },
    mounted(){
    },
    components:{
      uploadImages,
      servicePhone,
      loadAnimate,
      fancyBox
    },
    methods:{
      nextSubmit(){//
        this.$router.push({path:'/accountInfo'})
      }
    }
  }
</script>

<style lang="scss" scoped>

  @import "../../../style/mixin.scss";
  .evidence-upload-wrapper{
    .evidence-content{
      width:90%;
      margin: auto;
      margin-top: 1rem;
      background:#fff;
      min-height:15rem;
      padding-bottom:1rem;
      @include borderRadius(0.5rem);
      .evidence-head{
        width: 100%;
        min-height:10rem;
        border-bottom:1px dotted #9d9d9d;
        margin-top: 0.5rem;
        padding:0 1rem 1rem 1rem;
        .withdrawself{
          font-size:0.7rem;
          color:$fontSizeColorA;
          margin-top: 0.5rem;
          margin-left: 0.7rem;
        }
        .self-upload-area{
          width: 100%;
          height: 7.1rem;
          margin-top: 0.5rem;
          position:relative;
          @include borderRadius(0.5rem);
          .upload-note{
            width:100%;
            height: 7.1rem;
            border:1px solid #f4f4f4;
            border-radius: 0.5rem;
            background-size:cover;
            background-position: center;
            background-repeat: no-repeat;
            position:relative;
            /*img{*/
              /*max-width:100%;*/
              /*max-height: 7rem;*/
              /*@include borderRadius(0.5rem);*/
            /*}*/
          }
        }
        .word-warn{
          margin-top:0.5rem;
          p{
            font-size:0.55rem;
            color:#9d9d9d;
          }
        }
        }
        .friendly-tip{
          width: 90%;
          margin: auto;
          margin-top:0.8rem;
          p{
            font-size:0.65rem;
            color: #ff6631;
          }
        }
        /*上传图片区域*/
        .upload-content{
          width:100%;
          height: 7rem;
          padding:0 5%;
          margin-top:0.6rem;
          position: relative;
          .list-img{
            width: 100%;
            height:7rem;
            border-radius:0.5rem;
            -webkit-box-shadow:0px 3px 9px #ababab;
          img{
            width: 100%;
            height: 7rem;
            border-radius: 0.5rem;
          }
        .upload-warm{
          position: absolute;
          top:2rem;
          left:5rem;
          p{
            font-size:0.75rem;
            color:#fff;
            text-align:center;
            img{
            @include widthAndHeight(2.4rem,1.7rem);
            border-radius: 0;
          }
        }
        }
        }
      }
      .realatives-title{
        padding:1rem 0.8rem;
        p{
          border-left:5px solid #ff6631;
          font-size:0.75rem;
          color:#353535;
          padding-left: 0.5rem;
          font-weight: bold;
        }
      }
      .evidence-head:last-child{
        border-bottom:0;
      }
    }
  }

</style>
