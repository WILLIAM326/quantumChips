<template>
  <div class="home-page">
    <index-banner></index-banner>
    <home-page-info></home-page-info>
    <footer-guide></footer-guide>
  </div>
</template>
<script>
    import indexBanner from '../../views/home/homeBanner.vue';
    import homePageInfo from '../../views/home/homePageInfo.vue';
    import footerGuide from '../../components/footer/footer.vue';
    export default {
      data(){
        return {
          showAlert:false
        }
      },
      components: {
        indexBanner,
        homePageInfo,
        footerGuide
      }
    }
</script>
<style lang="scss" scoped>
  .home-page{

  }

</style>
