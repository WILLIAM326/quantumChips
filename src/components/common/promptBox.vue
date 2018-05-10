<template>
  <div class="alert_container">
    <div class="tip_text_container">
      <div class="info-box" v-if="dataObj">
        <p class="info-title">{{dataObj.infoTitle}}</p>
        <p class="tip_text">{{dataObj.alertText}}</p>
      </div>

      <div class="info-box" v-if="dataObjArr">
        <p class="info-title">{{dataObjArr.infoTitle}}</p>
        <template v-for="item in dataObjArr.infoArr">
          <p class="content_text content_title">{{item.example}}</p>
          <p class="content_text">{{item.text1}}</p>
          <p class="content_text">{{item.text2}}</p>
        </template>
      </div>
      <div class="confrim" @click="closeTip">知道了</div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        positionY: 0,
        timer: null,

      }
    },
    mounted(){

    },
    props: ['dataObj','dataObjArr'],
    methods: {
      closeTip(){
        this.$emit('closeTip')
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
  }
  .tip_text_container{
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -7rem;
    margin-left: -7rem;
    width:14rem;
    min-height: 5rem;
    display: block;
    animation: tipMove .4s ;
    background-color: rgba(255,255,255,1);
    border: 1px;
    z-index: 100;
    border-radius: 0.25rem;
    .info-box{
      width: 100%;
      padding: 0.8rem;
      .info-title{
        font-size:0.9rem;
        color:$fontSizeColorF;
        text-align: center;
      }
      .tip_text{
        @include sc(.7rem, #333);
        line-height: .9rem;
        text-align: center;
        margin-top: .8rem;
        padding: 0 .4rem;
        word-wrap:break-word
      }
      .content_text{
        @include sc(.7rem, #333);
        text-align: center;
        padding: 0 .4rem;
        line-height: 1.7;
        word-wrap:break-word
      }
      .content_title{
        font-weight: bold;
        margin-top: 0.5rem;
      }

    }
  .tip_icon{
    @include widthAndHeight(3rem, 3rem);
    border: 0.15rem solid #f8cb86;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    span:nth-of-type(1){
    @include widthAndHeight(.12rem, 1.5rem);
    background-color: #f8cb86;
    }
    span:nth-of-type(2){
    @include widthAndHeight(.2rem, .2rem);
    border: 1px;
    border-radius: 50%;
    margin-top: .2rem;
    background-color: #f8cb86;
    }
  }

    .confrim{
      @include sc(.8rem, #fff);
      font-weight: bold;
      margin-top: .8rem;
      border-top:1px dotted $fontSizeColorF;
      width: 100%;
      text-align: center;
      line-height: 1.8rem;
      color:$fontSizeColorF;
      border-bottom-left-radius: 0.25rem;
      border-bottom-right-radius: 0.25rem;
    }
  }

</style>
