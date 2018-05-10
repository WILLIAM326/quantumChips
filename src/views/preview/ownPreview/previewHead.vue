<template>
  <div class="preview-head-wrapper">
    <div class="preview-head">
      <p>xx筹</p>
    </div>
    <div class="person-avatar">
      <p><img :src="userInfo.head_img"></p>
      <p>{{userInfo.name}}</p>
    </div>

    <div class="help-info">
      <p>{{projectPreviewInfo.title}}</p>
    </div>
    <fund-process></fund-process>
    <div class="anounce-word">
      <p>
        <img src="../../../images/zero.png">
        <span>所筹金额将全部给付患者</span>
      </p>
    </div>
  </div>
</template>
<script>
  import {mapState,mapGetters} from 'vuex';

  import fundProcess from '../../../components/fundProcess/fundProcess';
  export default {
    data(){
      return {

      }
    },
    props:["userInfo"],//接收收数据
    computed:{
      ...mapGetters(['projectPreviewInfo'])
    },
    components: {
      fundProcess
    },
    mounted(){
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../style/mixin.scss";
  .preview-head-wrapper{
    @include widthAndHeight(90%,20rem);
    @include borderRadius(0.8rem);
    margin: auto;
    margin-top: 1rem;
    background: #fff;
    -webkit-box-shadow:0px 3px 9px #ababab;
    .preview-head{
      @include widthAndHeight(100%, 2rem);
      @include bis('../../../images/sc.png');
      p{
        color: #fff;
        font-size:1rem;
        text-align: center;
        font-weight: bold;
        padding-top: 0.3rem;
      }
    }
    .person-avatar{
      margin-top:1rem;
      p{
        text-align: center;
        font-size:0.7rem;
        color:#515151;
        font-weight:bold;
        img{
          @include widthAndHeight(2.7rem, 2.7rem);
          border-radius: 50%;
        }
      }

    }
    .help-info{
      padding:0 1rem;
      p{
        text-align: center;
        padding: 0.8rem;
        font-size:0.9rem;
        color:#515151;
        font-weight:bold;
      }
    }

    .anounce-word{
      width:80%;
      margin:auto;
      margin-top:1rem;
      p{
        font-size:0.75rem;
        color:#5c7fff;
        img{
          @include widthAndHeight(1.8rem,1.8rem);
          vertical-align: middle;
        }
        span{
          margin-left: 0.4rem;
        }
      }
    }

  }


</style>
