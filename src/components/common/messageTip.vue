<template>
  <div class="message-tip" v-show="messageShow">
    <p>{{messageWord}}</p>
  </div>
</template>

<script>
  export default {
    data(){
      return {}
    },
    props: ['messageWord', 'messageShow'],
    created(){

    },
    computed: {},
  }
</script>

<style lang="scss" scoped>
  .message-tip {
    min-width: 5rem;
    min-height: 2rem;
    padding: 0.5rem;
    background:rgba(0,0,0,0.7);
    border-radius: 0.3rem;
    z-index:100;
    position: fixed;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    p{
      text-align: center;
      font-size:0.7rem;
      color: #fff;
    }
  }

</style>
