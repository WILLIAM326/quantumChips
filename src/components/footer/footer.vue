<template>
  <div class="global-foot">
    <ul>
      <li class="router-link-active">
        <router-link to="/home">
          <p><i class="iconfont">&#xe651;</i></p>
          <p>首页</p>
        </router-link>
      </li>
      <li>
        <router-link to="/mine">
          <p><i class="iconfont">&#xe649;</i></p>
          <p>我的</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>

  export default {}
</script>

<style lang="scss" scoped>
  @import "../../style/mixin.scss";
  @import '../../fonts/iconfont.css';
  .global-foot {
    position: fixed;
    bottom: 0;
    background: $backGroundA;
    box-shadow: 0px 0px 10px 0px #e5e5e5;
    @include widthAndHeight(100%, 2.5rem);
  li{
    width: 50%;
    padding-top:0.3rem;
    a{
      color:$fontSizeColorB;
    }
    p{
      font-size: 0.6rem;
      text-align: center;
      .iconfont{
        font-size: 1rem;
      }
    }
  }
  }
  .router-link-active{
    color:$fontSizeColorA!important;
  }
</style>
