<template>

</template>

<script>
  export default {
    data(){
    },
    mounted(){
      this.$store.dispatch("weChatAuthorization")
    }
  }
</script>

<style lang="scss" scoped>

</style>
