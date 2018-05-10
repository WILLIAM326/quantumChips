<template>
  <div class="project-dynamic">
    <div class="line"></div>
    <div class="dynamic-tabs">
      <div class="dynamic-tabs-head">
        <ul>
          <li>
            <p class="">项目动态</p>
          </li>
          <li>
            <p>资金公示</p>
          </li>
        </ul>
      </div>
    </div>

    <div class="dynamic-content">
      <ul>
        <li>
          <div class="dynamic-content-left">
            <p>
              <img src="../../../images/friend.png">
              <span>韦小宝</span>
            </p>
            <p>目标金额：<span>10000元</span></p>
          </div>
          <div class="dynamic-content-right">
            <p>2017-9-28</p>
          </div>
        </li>
        <li>
          <div class="dynamic-content-left">
            <p>
              <img src="../../../images/friend.png">
              <span>韦小宝</span>
            </p>
            <p><span>上传验证资料</span></p>
          </div>
          <div class="dynamic-content-right">
            <p>2017-9-28</p>
          </div>
        </li>
      </ul>

    </div>
  </div>

</template>

<script>

    export default {

    }
</script>

<style lang="scss" scoped>
  @import "../../../style/mixin.scss";
  .project-dynamic{
    .line{
      width: 100%;
      height: 0.5rem;
      background: #f4f4f4;
    }
    .dynamic-tabs{
      width: 100%;
      padding-bottom:1rem;
      .dynamic-tabs-head{
        width: 100%;
        height: 2.5rem;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid #f4f4f4;
        li{
          width: 50%;
          padding:0 1rem;
          p{
            text-align: center;
            padding-bottom: 0.3rem;
            padding-top: 0.5rem;
            color: #595959;
            font-size: 0.8rem;
            width: 60%;
            margin: auto;
            border-bottom: 2px solid #ff7c57;
          }
        }
      }
    }
    .dynamic-content{
      width: 100%;
      li{
        width: 100%;
        min-height:3rem;
        padding:1rem;
        border-bottom:1px solid #f4f4f4;
        .dynamic-content-left{
          float:left;
          p{
            font-size:0.7rem;
            color:#4c4c4c;
            img{
              @include widthAndHeight(2rem,2rem);
              @include borderRadius(50%);
              vertical-align: middle;
            }
          }
          p:nth-child(2){
            font-size:0.7rem;
            color:#848484;
            margin-top:0.5rem;
            span{
              color:$fontSizeColorA;
            }
          }

        }
        .dynamic-content-right{
          float: right;
          p{
            font-size:0.6rem;
            color:#808080;
            margin-top: 0.3rem;
          }
        }

      }

    }
  }


</style>
