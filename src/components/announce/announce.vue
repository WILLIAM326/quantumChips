<template>
  <div>
    <template v-for="item in promiseList=totalEditBaseInfo.promise_list">
      <div class="announce-wrapper">
        <div class="announce-left" @click="choosePromise(item)">
          <p>
            <label class="check_user_list" :class="{'userListSelectedColor':item.flag}"></label>
            <span>{{item.title.slice(0,7)}}</span>
          </p>
        </div>
        <div class="announce-right">
          <p>{{item.content}}</p>
        </div>
      </div>
    </template>
    <div class="promise-area">
      <textarea v-model="promiseWord" @blur="announceAction" maxlength="20" :placeholder="desPlaceholder"></textarea>
    </div>
  </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {initPromise} from '../../api/getData';
    import {getToken} from '../../utils/auth';
    export default {
        data(){
            return{
              promiseList:[],
              promiseWord:'',//承诺宣言
              desPlaceholder:'说出您的宣言，让爱播撒到更多的地方'
            }
        },
        mounted(){
          this.initPromiseList()
          this.choosePromise()
        },
        computed:{
          ...mapGetters(['totalEditBaseInfo'])
        },
        methods:{
            initPromiseList(){
              const token = getToken()
              initPromise(token).then((res) => {
                if (res.stauts == 1) {
                  this.promiseList = res.data
                }
              })
            },
            choosePromise(item){
              this.promiseList.forEach((index) => {
                index.flag = false
              })
              item.flag = true
              this.$emit("selectPromise",item.id)
            },
            announceAction(){
              this.$emit('announceActionEmit',this.promiseWord);
            }
        }
    }
</script>

<style lang="scss" scoped>
  @import "../../style/mixin.scss";
  .announce-wrapper{
    width:100%;
    min-height:1.5rem;
    padding-top:0.5rem;
    .announce-left{
      float: left;
      width:45%;
      .check_user_list {
        border: 0.05rem solid #ff6631;
        padding: 0.35rem;
        display: inline-block;
        position: relative;
        border-radius: 50%;
        vertical-align: middle;
        background: #fff;
      }
      .check_user_list:after {
        content: '';
        width: 0.2rem;
        height: 0.35rem;
        border-right: 0.1rem solid #fff;
        border-bottom: 0.1rem solid #fff;
        -webkit-transform: rotate(40deg);
        transform: rotate(40deg);
        position: absolute;
        top: 0.07rem;
        left: .2rem;
      }
      .userListSelectedColor{
        background-color: #ff6631 !important;
        border-color: #ff6631 !important;
      }
      span{
        font-size:0.75rem;
        color:#4c4c4c;
        font-weight: bold;
      }
    }
    .announce-right{
      float: right;
      width: 55%;
      p{
        font-size:0.6rem;
        color:#858585;
        padding-top: 0.4rem;
      }
    }
  }
  .promise-area{
    width: 100%;
    textarea{
      width: 100%;
      min-height:7rem;
      font-size:0.7rem;
      background: #f4f4f4;
      @include borderRadius(0.3rem);
      margin-top:0.5rem;
      text-align: left;
      padding:0.8rem;
      &::-webkit-input-placeholder{
       color: $fontSizeColorD;
      }

    }
  }



</style>
