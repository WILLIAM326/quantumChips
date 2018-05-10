<template>
  <div class="agreement-wrapper">
    <div class="close-action" @click="goback">
      <img src="../../images/fail.png">
    </div>
    <div class="agreement-title">
      <p>{{agreementData.news_title}}</p>
    </div>
    <div class="agreement-content">
      <p v-html="agreementData.news_content"></p>
    </div>
  </div>
</template>

<script>

    export default {
        data(){
            return{}
        },
        props:['agreementData'],
        methods:{
          goback(){
              this.$emit('goback')
          }
        }
    }
</script>

<style lang="scss" scoped>
  .agreement-wrapper{
    width: 100%;
    background: #fff;
    position: fixed;
    height: 100%;
    padding-top: 0.5rem;
    z-index: 100;
    top: 0;
    overflow: scroll;
    left: 0;
    .agreement-title{
      p{
        text-align: center;
        font-size:0.8rem;
        color:#4c4c4c
      }
    }
    .agreement-content{
      padding:0.5rem;
      p{
        font-size:0.7rem;
        color:#4c4c4c;
      }
    }
    .close-action{
      position: absolute;
      right: 0.5rem;
      top:0.5rem;
      img{
        width:1.1rem;
        height: 1.1rem;
      }
    }
  }

</style>
