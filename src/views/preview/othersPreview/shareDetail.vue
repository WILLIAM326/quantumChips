<template>
  <div class="preview-head-wrapper">
    <div class="preview-head">
      <p>救助详情</p>
    </div>

    <div class="aided-person">
      <p>
        <img :src="afterShareInfo.projectinfo.head_img">
        <span>{{afterShareInfo.projectinfo.name}}</span>
      </p>
    </div>
    <!--详情-->
    <div class="aided-person-info">
      <p>
        <!--{{afterShareInfo.projectinfo.pro_remark}}-->
        {{ownCaseDetail}}
      </p>
      <p class="showOff" @click="toggle">{{ownButtonInfo}}<img src="../../../images/arrow.png"></p>
    </div>

    <!--图片集-->
    <div class="slide-wrapper">
      <ul>
        <template>
          <li v-for="(n, index) in afterShareInfo.projectinfo.pro_images"  :data-index="index">
            <img @click="open($event)" :src="n.url" alt="">
          </li>
        </template>
      </ul>
    </div>
    <!--图片集end-->

  </div>
</template>
<script>
  import {mapGetters} from 'vuex';
  import fancyBox from 'vue-fancybox';
  import fundProcess from '../../../components/fundProcess/fundProcess';
  export default {
    data(){
      return {

      }
    },
    components: {
      fundProcess,
      fancyBox
    },
    computed: {
      ...mapGetters(['afterShareInfo','ownCaseDetail','ownButtonInfo'])
    },
    mounted(){

    },
    methods: {
      open (e) {
        fancyBox(e.target, this.afterShareInfo.projectinfo.pro_images);
      },
      toggle(){
        this.$store.dispatch('AFTER_GET_ALL_DETAIL')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../style/mixin.scss";
  .preview-head-wrapper{
    width: 92%;
    min-height: 20rem;
    @include borderRadius(0.8rem);
    margin: auto;
    margin-top: 1rem;
    background: #fff;
    padding-bottom:0.6rem;
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
    .aided-person{
      width:86%;
      margin:auto;
      margin-top:1rem;
      p{
        text-align:left;
        img{
          width: 1.6rem;
          height: 1.6rem;
          border-radius: 50%;
          vertical-align: middle;
        }
        span{
          font-size:0.7rem;
          color:#515151;
          font-weight: bold;
        }
      }
    }
    .aided-person-info{
      width: 90%;
      min-height: 3rem;
      margin: auto;
      margin-top:0.8rem;
      p{
        font-size:0.625rem;
        color:$fontSizeColorL;
        line-height: 1.7;
        text-align: left;
      }
      .showOff{
        color: #ff6631;
        text-align: center;
        margin-top: 0.5rem;
        img{
          width: 0.3rem;
          height: 0.5rem;
          margin-left: 0.1rem;
          vertical-align: middle;
        }
      }
    }
     /*图片集*/
    .slide-wrapper{
      width:90%;
      margin:auto;
      margin-top:1rem;
      display: -webkit-box;
      li{
         margin-right:0.3rem;
         margin-top:0.2rem;
         img{
          @include widthAndHeight(3.3rem,3.3rem);
         }
      }
    }
  }


</style>
