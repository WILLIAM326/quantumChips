<template>
  <div class="case-details-wrapper">
    <div class="case-detail-head">
      <p>案例详情</p>
    </div>
    <div class="total-info-wrapper">
      <div class="total-info-complete" v-if="projectPreviewInfo.pro_remark">
        <p>{{ownCaseDetail}}</p>
      </div>
      <p class="showOff" @click="toggle">{{ownButtonInfo}}<img src="../../../images/arrow.png"></p>
    </div>

  </div>

</template>

<script>
  import {mapGetters} from 'vuex';
    export default {
        data(){
            return{
          }
        },
        computed:{
          ...mapGetters(['projectPreviewInfo','ownCaseDetail','ownButtonInfo'])
        },
        mounted(){
        },
        methods:{
          toggle(){
              this.$store.dispatch('GET_ALL_DETAIL')
          }
        }
    }
</script>

<style lang="scss" scoped>
  @import "../../../style/mixin.scss";
  .case-details-wrapper{
    width: 90%;
    margin: auto;
    margin-top:1rem;
    .case-detail-head{
      width: 50%;
      padding:0.1rem 0;
      border-left: 4px solid #ee6631;
      p{
        font-size:0.75rem;
        color:#353535;
        padding-left: 0.3rem;
        font-weight: bold;
      }
    }

    .total-info-wrapper{
      margin-top:0.5rem;
      .total-info-complete{
        p{
          font-size:0.65rem;
          color: #353535;
          line-height: 1.7;
        }
      }
      p{
        color: $fontSizeColorA;
        font-size:0.55rem;
        img{
          width:0.3rem;
          height: 0.5rem;
          margin-left: 0.1rem;
          vertical-align: middle;
        }
      }
      .showOff{
        text-align: center;
        margin-top:0.5rem;
      }
    }

  }


</style>
