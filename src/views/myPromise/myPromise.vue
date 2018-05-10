<template>
  <div class="promise-wrapper">
    <!--我的承诺-->
    <template v-if="!promiseDataList.length">
      <div class="nothing-content">
        <nothing-area :nothingDesc="nothingDesc"></nothing-area>
      </div>
    </template>
    <template v-else>
      <!--<router-link to="/allPromise">-->
        <div class="promise-list" v-for="item in promiseDataList">
          <div class="promise-list-top">
            <ul>
              <li>
                <img :src="item.head_img">
                <p>{{item.name|optimize}}</p>
              </li>
              <li class="idlist-number">
                <p>ID{{item.idcard}}</p>
              </li>
            </ul>
          </div>

          <div class="word-promise">
            <p>{{item.content}}</p>
          </div>
        </div>
      <!--</router-link>-->
    </template>
  </div>
</template>

<script>
  import {myPromiseAction} from '../../api/getData';
  import {getToken} from '../../utils/auth'
  import nothingArea from '../../components/nothing/nothing'

  export default {
    data(){
      return {
        promiseDataList: [],
        userToken:getToken(),
        nothingDesc:'您尚没有发起承诺哦'
      }
    },
    mounted(){
      this.initData();
    },
    components:{
      nothingArea
    },
    methods: {
        initData(){
          const postData={
            token:getToken(),
            page:1,
            pagesize:100,
            project_id:this.$route.query.projectId
          }
          myPromiseAction(postData).then((res)=>{
              if(res.stauts==1){
                  this.promiseDataList=res.data;
              }
          })
        }
    },
    filters: {
      optimize(word){
        if (word.length > 5) {
          return word.slice(0, 5) + '...'
        } else {
          return word
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/mixin.scss";
  .promise-wrapper{
    width: 100%;
    min-height: 30rem;
    padding-top:1.5rem;
    padding-bottom: 1rem;
    @include bis('../../images/messagebg.png');
    .nothing-content{
      width: 90%;
      height: 15rem;
      background: #fff;
      border-radius: 0.8rem;
      padding-top: 2rem;
      margin: auto;
      p{
        text-align: center;
        font-size: 0.75rem;
      }
    }
    .promise-list{
      width: 90%;
      min-height: 7rem;
      margin: auto;
      background: #fff;
      padding: 0.8rem;
      margin-top: 0.5rem;
      @include borderRadius(0.8rem);
      @include bis('../../images/promise.png');
      .promise-list-top{
        width: 100%;
        height: 4rem;
        li{
          img{
            @include widthAndHeight(2rem,2rem);
            @include borderRadius(50%);
          }
          P{
            font-size:0.7rem;
            color:#515151;
            text-align: center;
          }
        }
        .idlist-number{
          float: right;
          p{
            font-size: 1.4rem;
            font-family: Knockout-lzhz;
          }
        }
      }
      .word-promise{
        margin-top: 0.5rem;
        float:left;
        p{
          font-size:0.75rem;
          color:#727272;
        }
      }
    }
  }

</style>
