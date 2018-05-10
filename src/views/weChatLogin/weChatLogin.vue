<template>
  <div class="weChatLogin-box">
    <loading></loading>
  </div>
</template>

<script>
  import {getQueryString} from '../../utils/tools';
  import {getToken,getLocalStorageStore} from '../../utils/auth'
  import loading from '../../components/common/loading'
  export default {
    data(){
      return {
        weChatCode: getQueryString("code")
      }
    },
    components:{
      loading
    },
    mounted(){
      if (getToken()) {
        this.$router.push({path: getLocalStorageStore("preUrl")})
      }else{
        const dataObj = {
          code: this.weChatCode,
          extendRouter: this.$router
        }
        this.$store.dispatch("getWeChatToken", dataObj)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
