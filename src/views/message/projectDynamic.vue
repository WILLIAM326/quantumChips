<template>
  <div class="message-center">
    <template v-for="item in projectDataList">
      <div class="message-list">
        <ul>
          <li>
            <p>
              消息提示<span>{{item.create_time}}</span>
            </p>
          </li>
          <li>
            <p>{{item.content}}</p>
          </li>
        </ul>
      </div>
    </template>
  </div>

</template>

<script>
  import {projectDynamicAction} from '../../api/getData';
  import {getToken} from '../../utils/auth';
  export default {
    data(){
      return {
        projectDataList: [],
        token:getToken()
      }
    },
    mounted(){
      this.initData();
    },
    methods: {
      initData(){
        const postData = {
          token: getToken(),
          project_id:this.$route.query.projectId
        }
        projectDynamicAction(postData).then((res)=>{
          if(res.stauts==1){
            this.projectDataList=res.data;
          }
        })
      }
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
