<template>
  <div class="message-center">
    <div style="width:100%;min-height: 30rem">
      <template v-for="item in messageDataList">
        <div class="message-list">
          <ul>
            <li>
              <p>
                消息提示<span>{{item.create_time}}</span>
              </p>
            </li>
            <li>
              <p>{{item.message}}</p>
            </li>
          </ul>
        </div>
      </template>
    </div>
    <!--下拉刷新组件-->
    <infinite-loading @infinite="infiniteHandler" spinner="bubbles" ref="infiniteLoading">
      <!--<span slot="no-more">没有更多消息了</span>-->
    </infinite-loading>

  </div>
</template>

<script>
  import {myMessageAction,donationListAction} from '../../api/getData';
  import {getToken} from '../../utils/auth';
  import InfiniteLoading from 'vue-infinite-loading';

  export default {
    data(){
      return {
        messageDataList: [],
        totalCount:''
      }
    },
    mounted(){
      this.initData();
    },
    components: {
      InfiniteLoading
    },
    methods: {
      initData(){
        const postData = {
          token: getToken(),
          project_id:this.$route.query.projectId
        }
        myMessageAction(postData).then((res)=>{
          if(res.stauts==1){
            this.messageDataList=res.data.list;
            this.totalCount=res.data.count;
          }
        })
      },
      infiniteHandler($state) {
        const params = {
          token: getToken(),
          page: Math.ceil(this.messageDataList.length/ 10) + 1,
          pagesize:10
        }
        myMessageAction(params).then((res) => {
          if (res.data.list.length) {
            this.messageDataList = this.messageDataList.concat(res.data.list);
            $state.loaded()
            if (Math.ceil(this.messageDataList.length / 10) === this.totalCount) {//总的页数
              $state.complete();
            }
          } else {
            $state.complete();
          }
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/mixin.scss";
  .message-center{
    width: 100%;
    min-height: 30rem;
    padding-top:1rem;
    @include bis('../../images/messagebg.png');
    .message-list{
      width: 90%;
      height: 2.5rem;
      background: #fff;
      margin: auto;
      margin-top: 0.6rem;
      @include borderRadius(0.3rem);
      li:nth-child(2){
        float: right;
      }
      li{
        float: left;
        padding:0 0.5rem;
        p{
          font-size: 0.75rem;
          color:#4f4f4f;
          padding-top: 0.6rem;
          span{
            font-size:0.55rem;
            color: #969696;
            margin-left: 0.3rem;
          }
          img{
            width: 0.5rem;
            height: 0.9rem;
            vertical-align: middle;
            margin-left: 0.3rem;
          }
        }
      }

    }
  }



</style>
