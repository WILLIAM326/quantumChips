<template>
  <div class="withdraw-tip">
    <div class="tip-content">
      <div class="top-area">
         <p>{{withdrawMessage}}</p>
      </div>
      <div class="down-area" @click="closeMessageTip">
        <p>知道了</p>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    props: ['withdrawMessage'],
    methods: {
      closeMessageTip(){
        this.$emit('messageTip')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .withdraw-tip{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 200;
    background: rgba(0,0,0,0.5);
  }
  .tip-content{
    position: fixed;
    width: 80%;
    min-height: 5rem;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: #fff;
    border-radius: 0.8rem;
    p{
      text-align: center;
      font-size: 0.8rem;
      color:#525252;
    }
    .top-area{
      width: 100%;
      padding: 0.8rem;
    }
    .down-area{
      width: 100%;
      height: 2rem;
      padding-top: 0.3rem;
      border-top:1px solid #f4f4f4;
    }
  }



</style>
