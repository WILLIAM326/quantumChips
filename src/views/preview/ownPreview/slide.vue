<template>

  <div class="slide-wrapper">
    <ul>
      <li v-for="(n, index) in projectPreviewInfo.pro_images"  :data-index="index">
        <img @click="open($event)" :src="n.url" alt="">
      </li>
    </ul>
  </div>

</template>

<script>
  import {mapGetters} from 'vuex';
  import fancyBox from 'vue-fancybox';
  export default {
    data() {
      return {
      }
    },
    components: {

    },
    computed:{
      ...mapGetters(['projectPreviewInfo'])
    },
    methods: {
      open (e) {
        fancyBox(e.target, this.projectPreviewInfo.pro_images);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../style/mixin.scss";

  .slide-wrapper{
    width:90%;
    margin:auto;
    margin-top:1rem;
    display: -webkit-box;
    li{
      margin-right:0.3rem;
      margin-top:0.2rem;
      img{
        width:3.3rem;
        height: 3.3rem;
      }
    }
    /*.my-swipe {*/
      /*height: 200px;*/
      /*color: #fff;*/
      /*font-size: 30px;*/
      /*text-align: center;*/
    /*}*/

    /*.slide1 {*/
      /*background-color: #0089dc;*/
      /*color: #fff;*/
    /*}*/

    /*.slide2 {*/
      /*background-color: #ffd705;*/
      /*color: #000;*/
    /*}*/

    /*.slide3 {*/
      /*background-color: #ff2d4b;*/
      /*color: #fff;*/
    /*}*/
  }

</style>
