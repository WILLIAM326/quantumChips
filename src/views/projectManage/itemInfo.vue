<template>
  <div>
    <div class="itemInfo-wrapper">
      <template v-if="projectManageData.dyncmic_num>0">
        <router-link :to="{ path: '/projectDynamic',query:{projectId:itemId}}">
          <div class="itemInfo-status">
            <div class="status-left">
              <p>项目动态</p>
            </div>
            <div class="status-right">
              <p>查看全部{{projectManageData.dyncmic_num}}条
                <img src="../../images/orange.png">
              </p>
            </div>
          </div>
        </router-link>
      </template>
      <template v-else>
        <div class="itemInfo-status">
          <div class="status-left">
            <p>项目动态</p>
          </div>
          <div class="status-right">
            <p>查看全部{{projectManageData.dyncmic_num}}条
              <img src="../../images/orange.png">
            </p>
          </div>
        </div>
      </template>
    </div>
    <div class="line"></div>

    <div class="introduction-data">
      <div class="data-title">
        <p>项目数据</p>
      </div>

      <div class="item-list-data">
        <ul>
          <li>
            <p>{{projectManageData.share_count}}</p>
            <p>转发次数</p>
          </li>
          <li>
            <p>{{projectManageData.help_count}}</p>
            <p>帮助次数</p>
          </li>
          <!--<li>-->
            <!--<p>1600</p>-->
            <!--<p>被关注次数</p>-->
          <!--</li>-->
        </ul>

      </div>

    </div>
  </div>


</template>

<script>
  import {mapGetters} from 'vuex';
    export default {
      data(){
        return{
            itemId:this.$route.query.projectId
        }
      },
      computed: {
        ...mapGetters(['projectManageData'])
      }
    }
</script>

<style lang="scss" scoped>
  @import "../../style/mixin.scss";
  .itemInfo-wrapper{
    width: 100%;
    padding:0 5%;
    .itemInfo-status{
      height: 3rem;
      padding-top:1rem;
      .status-left{
        float: left;
        height: 1rem;
        border-left:5px solid #ff6631;
        p{
          color:#353535;
          padding-left: 0.5rem;
          font-size: 0.75rem;
          font-weight: bold;
        }
      }
      .status-right{
        @extend .status-left;
        float: right;
        border-left:0;
        p{
          color:#ff6631;
          font-weight: normal;
          img{
            @include widthAndHeight(0.3rem,0.5rem);
          }
        }
      }

    }
  }
  .line{
    width: 100%;
    height: 0.5rem;
    background: #f4f4f4;
  }
  .introduction-data{
    width:100%;
    padding:0 5%;
    height: 8rem;
    padding-top:1rem;
    .data-title{
      width: 100%;
      height: 1rem;
      border-left:5px solid #ff6631;
      p{
        font-size: 0.75rem;
        color: #353535;
        font-weight: bold;
        padding-left: 0.5rem;
      }
    }
    .item-list-data{
      margin-top:1rem;
      li{
        width: 33.3%;
        height: 3rem;
        border-right: 1px solid #f4f4f4;
        text-align: center;
        p:nth-child(1){
          font-family: Knockout-lzhz;
          font-size:1.9rem;
          color:#8080ff;
        }
        p:nth-child(2){
          font-size:0.7rem;
          color:#6d6d6d;
        }
      }
      li:last-child{
        border-right:0;
      }
    }

  }



</style>
