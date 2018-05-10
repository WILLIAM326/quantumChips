<template>

  <div class="alert_container">
    <div class="tip_text_container">
      <div class="container_head">
        <p>
          <img src="../../images/sicon.png">
          <span>提交成功</span>
        </p>
      </div>

      <!--初步提交成功样式-->
      <div class="first_step_success" v-if="dataObj.statusId==1">
        <p><img src="../../images/success.png" style="width: 2.9rem;height: 2.9rem"></p>
        <p>转发给好友获得支持和传播，</p>
        <p>也可以分享至朋友圈、</p>
        <p>微博等社交平台</p>

        <router-link :to="{ path: '/ownPreview', query: { projectId: dataObj.projectId }}">
          <div class="material-complete">
            <p>查看项目</p>
          </div>
        </router-link>

        <div class="share-complete" @click="shareForHelp">
          <p>转发筹款</p>
        </div>

      </div>

      <div class="first_step_success" v-if="dataObj.statusId==2">
        <p><img src="../../images/person.png"></p>
        <p>为了更快获得筹款，</p>
        <p>增强捐助者对您的信任，</p>
        <p>请尽快完成项目验证噢</p>
        <div class="material-complete">
          <router-link :to="{ path: '/ownPreview', query: { projectId: dataObj.projectId }}">
            <p>预览筹款项目</p>
          </router-link>
        </div>

        <div class="share-complete">
          <router-link :to="{ path: '/patientInformation', query: { projectId: dataObj.projectId }}">
            <p>填写验证资料</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    data(){
      return{
        positionY: 0,
        timer: null
      }
    },
    mounted(){
    },
    props: ['dataObj'],
    methods: {
      closeTip(){
        this.$emit('closeTip')
      },
      shareForHelp(){
       this.$emit('shareForHelp')
      }

    }
  }
</script>

<style lang="scss" scoped>
  @import '../../style/mixin';
  @keyframes tipMove{
    0%   { transform: scale(1) }
    35%  { transform: scale(.8) }
    70%  { transform: scale(1.1) }
    100% { transform: scale(1) }
  }
  .alert_container{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 200;
    background: rgba(0,0,0,0.5);
    .tip_text_container {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -7rem;
      margin-left: -7rem;
      width: 14rem;
      min-height: 5rem;
      display: block;
      animation: tipMove .4s;
      background-color: rgba(255, 255, 255, 1);
      border: 1px;
      z-index: 100;
      border-radius: 0.8rem;
      padding-bottom:1rem;
      .container_head{
        @include widthAndHeight(100%, 2rem);
        @include bis('../../images/sc.png');
        padding-top:0.2rem;
        p{
          text-align: center;
          color:$fontSizeColorE;
          font-size:1rem;
          img{
            @include widthAndHeight(1rem, 1rem);
            vertical-align: middle;
          }
          span{
            font-weight:bold;
          }
        }
      }
      .first_step_success{
        p{
          text-align: center;
          font-size:0.75rem;
          color:#727272;
          line-height:1.7;
          img{
            @include widthAndHeight(3rem, 2rem);
            margin-top: 1rem;
          }
        }
        .material-complete{
          @include widthAndHeight(70%, 2rem);
          @include borderRadius(0.9rem);
          border: 1px solid $fontSizeColorA;
          margin: auto;
          margin-top:0.7rem;
          p{
            font-size:1.1rem;
            color: $fontSizeColorA;
            font-weight: bold;
          }
        }
        .share-complete{
          @extend .material-complete;
          @include bis('../../images/scbtn.png');
          border: 0;
          p{
            color:$fontSizeColorE;
          }
        }

      }

    }
  }

</style>
