<template>
  <div class="company-wrapper">
    <div class="company-content">
      <div class="content-head">
        <p>
          <img src="../../../images/liangzichou.png">
        </p>
      </div>

      <div class="scan-area">
        <p>
          <img src="../../../images/scan.jpg">
        </p>
        <p>
          识别二维码关注xx筹
        </p>
        <p>了解更多</p>
      </div>
    </div>

    <div class="another-plan">
      <a href="https://www.quonline.cn/xwh5/pages/plan/planDetial.html?id=1">
        <img src="../../../images/plan.png">
      </a>
    </div>
  </div>
</template>

<script>

    export default {}
</script>

<style lang="scss" scoped>
  @import "../../../style/mixin.scss";
  .company-wrapper{
    width: 100%;
    height: 30rem;
    padding-top: 2rem;
    @include bis('../../../images/messagebg.png');
    .company-content{
      width: 90%;
      height: 15rem;
      margin: auto;
      background: #fff;
      border-radius: 0.8rem;
      -webkit-box-shadow: 0 3px 9px #ababab;
      .content-head{
        width: 100%;
        height:4rem;
        padding-top: 1.5rem;
        @include bis('../../../images/huise.png');
        p{
          text-align: center;
          img{
            width:4.2rem;
            height: 1.2rem;
          }
        }
      }
    }
    .scan-area{
      img{
        width: 7.9rem;
        height: 7.9rem;
      }
      p{
        font-size:0.7rem;
        color:#494949;
      }
    }
    .another-plan{
      width:92%;
      margin:0.8rem auto;
      img{
        width: 100%;
      }
    }

  }

</style>
