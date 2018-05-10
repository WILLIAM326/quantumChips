<template>
  <!--客服电话-->
  <div>
    <div class="call-server">
      <ul>
        <li class="server-line"></li>
        <li style="width:42%"><p>如有疑问,请咨询</p></li>
        <li class="server-line"></li>
      </ul>
    </div>
    <div class="call-phone">
      <a href="tel:400-900-8690"><p>400-900-8690</p></a>
    </div>
  </div>
</template>

<script>

  export default {}
</script>

<style lang="scss" scoped>
  @import "../../style/mixin.scss";
  /*客服电话start*/
  .call-server{
    width:100%;
    height: 1rem;
    margin: auto;
    margin-top:0.5rem;
    li{
      margin-left: 0.3rem;
    }
    .server-line{
      width:25%;
      height: 1px;
      background:#d5d5d5;
      margin-top: 0.5rem;
    }
    p{
      font-size:0.6rem;
      color:#6d6d6d;
      text-align: center;
    }
  }
  .call-phone{
    /*padding-top:1rem;*/
    p{
      font-size: 1rem;
      color:$fontSizeColorF;
      text-align: center;
      font-family: Knockout-lzhz;
    }
  }
  /*客服电话end*/

</style>
