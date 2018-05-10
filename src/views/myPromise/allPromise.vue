<template>
  <div class="allPromise-wrapper">
    <div class="promise-content">
      <template v-for="(item,$index) in itemList">
        <div class="promise-content-item">
          <div class="content-item-top">
            <div class="item-top-left">
              <p>
                <img src="../../images/2.png">
                <span>韦小宝</span>
              </p>
            </div>
            <div class="item-top-right">
              <template v-if="item.flag">
                <img src="../../images/yes.png">
              </template>
              <template v-else>
                <img src="../../images/no.png">
              </template>
            </div>
          </div>
          <!--图片留言-->
          <div class="promise-pic-list">
            <ul>
              <li><img src="../../images/2.png"></li>
              <li><img src="../../images/2.png"></li>
              <li><img src="../../images/2.png"></li>
              <li><img src="../../images/2.png"></li>
              <li><img src="../../images/2.png"></li>
              <li><img src="../../images/2.png"></li>
            </ul>
          </div>
          <div class="clearfix"></div>
          <div class="promise-word">
            <p>感谢大家的帮助，我会好好的努力，加油加油</p>
            <div class="status-time-delete">
              <p class="promise-time">2017-9-29 12:35</p>
              <p class="promise-cancel" @click="cancelPromise($index)" v-show="!item.flag">
                <img src="../../images/iconcancel.png">
              </p>
            </div>
          </div>
        </div>
      </template>
    </div>

    <!--发布承诺状态-->
    <div class="public-release">
      <div class="release-promise" @click="needPromise">
        <p>发布承诺状态</p>
      </div>
    </div>

    <!--弹出层-->
    <public-promise v-show="promiseMask" @sendPromise="callContent"></public-promise>
  </div>
</template>

<script>
  import publicPromise from './publishPromise';

  export default {
      data(){
        return {
          itemList: [
            {
              id: 1,
              flag: true
            },
            {
              id: 2,
              flag: false
            }],
          promiseMask: false
        }
      },
      components:{
        publicPromise
      },
      methods:{
        needPromise(){
            this.promiseMask=true;
        },
        callContent(){
          this.promiseMask=false;
        },
        cancelPromise(index){
          this.itemList.splice(index, 1)
        }
      }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/mixin.scss";
  .allPromise-wrapper {
    width: 100%;
    min-height: 30rem;
    padding-top: 1.5rem;
    padding-bottom: 3.5rem;
    @include bis('../../images/messagebg.png');
    .promise-content{
      width: 90%;
      min-height: 10rem;
      border-radius: 0.8rem;
      background: #fff;
      margin: auto;
      padding: 0.8rem;
      .promise-content-item{
        width: 100%;
        min-height: 7rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid #ebebeb;
        overflow:auto;
        margin-top:1rem;
        .content-item-top{
          width: 100%;
          height: 2rem;
          .item-top-left{
            float: left;
            p{
              img{
                width: 2rem;
                height: 2rem;
                border-radius: 50%;
                vertical-align: middle;
              }
              span{
                font-size:0.75rem;
                color:#353535;
                font-weight: bold;
              }
            }
          }
          .item-top-right{
            float: right;
            img{
              width: 2.65rem;
              height: 2rem;
            }
          }
        }
        .promise-pic-list{
          width: 98%;
          float: right;
          li{
            margin-right:0.2rem;
            img{
              @include widthAndHeight(2.9rem,2.9rem);
              border-radius: 0.2rem;
            }
          }
        }
        .promise-word{
          width: 98%;
          float: right;
          p{
            font-size:0.625rem;
            color:#545352;
          }

          .status-time-delete{
            .promise-time{
              float: left;
              color: #adadad;
              font-size: 0.55rem;
              margin-top: 0.5rem;
            }
            .promise-cancel{
              float: right;
              margin-top:0.5rem;
              img{
                width:0.9rem;
                height: 1rem;
              }
            }
          }

        }

      }
      .promise-content-item:last-child{
        border: 0;
      }

    }

    .public-release{
      position: fixed;
      bottom:0;
      width: 100%;
      height: 3rem;
      background: #fff;
      z-index:1;
      box-shadow: 0px 0px 10px 0px #e5e5e5;
      .release-promise{
        width: 10rem;
        height: 2.1rem;
        @include bis("../../images/scbtn.png");
        margin: auto;
        margin-top:0.5rem;
        p{
          font-size:1rem;
          text-align: center;
          color: #fff;
          font-weight: bold;
          padding-top: 0.3rem;
        }
      }
    }

    .clearfix{
      clear: both;
    }

  }

</style>
