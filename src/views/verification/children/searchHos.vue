<template>
  <div class="search-hos-wrapper">
    <input type="text" v-model="searchValue" placeholder="请输入医院名称">
    <div class="search-submit" @click="searchSubmit">
      <p>提交</p>
    </div>
    <!--信息提示框-->
    <message-tip :messageWord="messageWord" :messageShow="messageShow"></message-tip>
  </div>
</template>

<script>

  import {mapMutations} from 'vuex'
  import {checkRealName,isSpace,checkIdCard} from '@/utils/validate';
  import messageTip from '@/components/common/messageTip';


  export default {
    data(){
      return {
        searchValue: '',
        messageWord:'',//提示信息
        messageShow:false
      }
    },
    components: {
      messageTip
    },
    methods: {
      ...mapMutations([
        'RETSET_HOS_NAME'
      ]),
      searchSubmit(){
        if(!this.searchValue){
          this.messageShow = true;
          this.messageWord = "医院名称不能为空";
          return false;
        }
        if(this.searchValue&&isSpace(this.searchValue)){
          this.messageShow = true;
          this.messageWord = "医院名称不能为空格";
          return false;
        } else{
          this.RETSET_HOS_NAME(this.searchValue);
          this.$router.go(-1);
        }
      }
    },
    watch:{
      'messageShow'(){
        setTimeout(()=>{
          this.messageShow=false;
        },1500)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .search-hos-wrapper {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    position: fixed;
    background: #fff;
    right: 0;
    left: 0;
    top: 0;
    height: 100%;
    padding: 0.8rem;

    input {
      width: 100%;
      height: 2rem;
      border-radius: 0.3rem;
      background: #f4f4f4;
      padding-left: 0.3rem;
      font-size: 0.7rem;
    }

    .search-submit {
      width: 100%;
      height: 2rem;
      background: #ff6631;
      border-radius: 0.3rem;
      margin-top: 0.5rem;
      p {
        font-size: 1rem;
        text-align: center;
        color: #fff;
        font-weight: bold;
        padding-top: 0.3rem;
      }

    }
  }

</style>
