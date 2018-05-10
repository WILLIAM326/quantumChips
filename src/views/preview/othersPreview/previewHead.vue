<template>
  <div class="preview-head-wrapper">
    <div class="preview-head">
      <p>xx筹</p>
      <router-link to="/home">
        <div class="wanna-help">
          <p>我要筹款</p>
        </div>
      </router-link>
    </div>
    <div class="person-avatar">
      <p><img :src="afterShareInfo.projectinfo.head_img"></p>
      <p>{{afterShareInfo.projectinfo.name}}</p>
    </div>
    <div class="examine-status">
      <template v-if="afterShareInfo.projectinfo.status==1">
        <span>项目进行中</span>
      </template>
      <template v-if="afterShareInfo.projectinfo.status==2">
        <span>筹款结束</span>
      </template>
      <template v-if="afterShareInfo.projectinfo.status==-1">
        <span>已下架</span>
      </template>
      <template v-if="afterShareInfo.projectinfo.status==-2">
        <span>已退款</span>
      </template>
      <span>个人求助</span>
    </div>
    <template v-if="afterShareInfo.projectinfo.promise_content">
      <div class="star_staus">
        <p>
          <img src="../../../images/star.png">
          <span>{{afterShareInfo.projectinfo.promise_content}}</span>
        </p>
      </div>
    </template>

    <div class="help-info">
      <p>{{afterShareInfo.projectinfo.title}}</p>
    </div>
    <share-funds-process></share-funds-process>
    <div class="anounce-word">
      <p>有<span>{{afterShareInfo.prove.count}}</span>人实名为TA证实</p>
      <div class="real-name-check">
        <div class="check-left">
          <ul>
            <template v-for="item in afterShareInfo.prove.info">
              <li>
                <img :src="item.head_img">
              </li>
            </template>
            <li>
              <router-link :to="{path:'/confirmatory',query:{projectId:itemId}}">
                <img src="../../../images/more.png">
              </router-link>
            </li>
          </ul>
        </div>
        <div class="check-right">
          <router-link :to="{path:'/proveIt',query:{projectId:itemId}}">
            <div class="help-confirm">
              <p>帮TA证实</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex';
  import shareFundsProcess from '../../../components/fundProcess/shareFundsProcess';
  export default {
    data(){
      return {
        itemId:this.$route.query.projectId
      }
    },
    components: {
      shareFundsProcess
    },
    mounted(){
    },
    computed: {
      ...mapGetters(['afterShareInfo'])
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
      .wanna-help{
        width:3.6rem;
        height: 1rem;
        margin-top: -1.2rem;
        margin-right: 0.5rem;
        float:right;
        @include bis('../../../images/wanna.png');
        p{
          font-size:0.6rem;
          color:#5c7fff;
          padding-top: 0.1rem;
        }
      }
    }
    .examine-status{
      margin-right:0.3rem;
      span{
        background: #ff6631;
        border-radius: 0.1rem;
        color: #fff;
        font-size:0.55rem;
        padding:0 0.2rem;
      }
      span:nth-child(2){
        background: $fontSizeColorF;
      }
    }
    .star_staus{
      width:52%;
      margin:auto;
      p{
        text-align: center;
        font-size:0.75rem;
        img{
          width: 0.75rem;
          height: 1rem;
          vertical-align: middle;
        }
      }
      span{
        font-size:0.6rem;
        color:#9c9c9c;
      }
    }
    .person-avatar{
      margin-top:1.5rem;
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
        font-size:1rem;
        color:#515151;
        font-weight:bold;
      }
    }

    .anounce-word{
      width:90%;
      margin:auto;
      margin-top:1rem;
      p{
        font-size:0.625rem;
        color:#353535;
        text-align:left;
        span{
          color:#ff6631;
          font-family: Knockout-lzhz;
        }

      }
      .real-name-check{
        width: 100%;
        margin-top:0.3rem;
        .check-left{
          width: 80%;
          li{
            margin-right:0.1rem;
            img{
             @include widthAndHeight(1.55rem,1.55rem);
             @include borderRadius(50%);
            }
          }

        }
        .check-right {
          float:right;
          margin-top:0.2rem;
          .help-confirm{
            width: 3rem;
            height: 1.3rem;
            border-radius: 0.8rem;
            background:-webkit-gradient(linear, 0 0, 0 bottom, from(#5c89ff), to(#7880ff));
            p{
              font-size:0.6rem;
              color:#fff;
              padding-top: 0.2rem;
              text-align: center;
              font-weight: bold;
            }
          }

        }
      }
    }

  }


</style>
