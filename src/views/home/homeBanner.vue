<template>
  <div class="home-page-banner">
    <router-link :to="{ path: '/bannerInstruct'}">
      <img src="../../images/indexbanner.png">
    </router-link>
  </div>
</template>

<script>
  export default {
    data(){
      return {}
    },
    methods:{
    },
  }
</script>

<style lang="scss" scoped>
  .home-page-banner {
    width: 96%;
    height: 5rem;
    margin: auto;
    margin-top: 0.3rem;
    img {
      width: 100%;
      display: block;
    }
  }
</style>
