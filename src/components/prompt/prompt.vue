<template>
  <div class="prompt-wrapper" v-show="messageCancelShow">
    <div class="prompt-mask"></div>
    <div class="prompt-content">
      <div class="content-top">
        <p>项目删除后将无法恢复，已筹金额会全部退还给支持者，你确定要删除吗？</p>
      </div>
      <div class="content-down">
        <ul>
          <li @click="continueCancel">
            <p>继续删除</p>
          </li>
          <li @click="closeMask">
            <p style="color: #ff6631">返回</p>
          </li>
        </ul>
      </div>

    </div>

  </div>

</template>

<script>

  export default {
    props: ['messageCancelShow'],
    methods: {
      continueCancel(){
          this.$emit('deleteAction')
      },
      closeMask(){
          this.$emit('closeAction')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .prompt-wrapper{
    .prompt-mask{
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.7);
      position: fixed;
      top:0;
      left: 0;
    }
    .prompt-content{
      position: fixed;
      top:50%;
      left: 50%;
      width: 90%;
      height: 7rem;
      background: #fff;
      -webkit-transform: translate(-50%,-50%);
      z-index:2;
      border-radius: 0.5rem;
      .content-top{
        height: 4.5rem;
        padding:1rem 0.8rem;
        border-bottom:1px solid #ff6631;
        p{
          text-align: center;
          font-size:0.75rem;
          color:#4c4c4c;
        }
      }
      .content-down{
        height: 2.5rem;
        li{
          width: 50%;
          height: 2.5rem;
          padding-top:0.7rem;
          p{
            text-align: center;
            font-size:0.8rem;
          }
        }
        li:nth-child(1){
          border-right: 1px solid #ff6631;
        }
      }
    }
  }


</style>
