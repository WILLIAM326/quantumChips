<template>
  <div class="process-status">
    <ul>
      <li>
        <p>目标金额(元)</p>
        <p>{{shareAndCollectionProcess.amount}}</p>
      </li>
      <li>
        <p>已筹金额(元)</p>
        <p>{{shareAndCollectionProcess.borrow_amount}}</p>
      </li>
      <li>
        <p>帮助次数</p>
        <p>{{shareAndCollectionProcess.help_count}}</p>
      </li>
    </ul>
    <div style="clear: both"></div>
    <div class="current-process">
      <div class="heart-percent" :style="{left:shareAndCollectionProcess.proportion +'%'}">
        <p>{{shareAndCollectionProcess.proportion}}%</p>
      </div>
      <div class="real-time-progress" :style="{width:shareAndCollectionProcess.proportion+'%'}"></div>
    </div>
  </div>

</template>

<script>

  import {mapGetters} from 'vuex';
  import {getToken} from '../../utils/auth';
  export default {
    data(){
      return {
        itemId: this.$route.query.projectId,
      }
    },
    computed:{
      ...mapGetters(['projectPreviewInfo','shareAndCollectionProcess'])
    },
    mounted(){
      const postData = {
        token: getToken(),
        project_id: this.itemId
      }
      this.$store.dispatch('MONEY_COLLECTION_PROCESS',postData)
    }

  }
</script>

<style lang="scss" scoped>
  @import "../../style/mixin.scss";
  .process-status{
    padding:0.8rem 0 1.5rem 0;
    width: 90%;
    min-height: 4rem;
    margin: auto;
    background: #f7f7f7;
    @include borderRadius(0.5rem);
    li{
      width:33.3%;
      text-align: center;
      p:nth-child(1){
        font-size:0.55rem;
        color:#707070;

      }
      p:nth-child(2){
        font-size:1.25rem;
        color:$fontSizeColorA;
        font-family: Knockout-lzhz;
      }
    }
    .current-process{
      position: relative;
      @include widthAndHeight(90%,0.25rem);
      @include borderRadius(0.5rem);
      background: #c9c9c9;
      margin: auto;
      margin-top: 0.8rem;
      .heart-percent{
        position: absolute;
        top:-0.4rem;
        @include widthAndHeight(1.3rem,1.1rem);
        @include bis('../../images/heart.png');
        p{
          font-size:0.5rem;
          color:$fontSizeColorE;
          text-align: center;
          font-family: Knockout-lzhz;
          padding-top: 0.2rem;
        }
    }
    .real-time-progress{
      height:100%;
      background: $fontSizeColorA;
      @include borderRadius(0.5rem);

    }
    }

  }

</style>
