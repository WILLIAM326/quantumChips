<template>
  <div class="project-delete">
    <nothing-box :nothingDesc="nothingDesc"></nothing-box>
  </div>

</template>

<script>
  import nothingBox from '../../../components/nothing/nothing'

    export default {
      data(){
          return{
            nothingDesc:'此项目不存在'
          }
      },
      components:{
        nothingBox
      }
    }
</script>

<style lang="scss" scoped>
  .project-delete{
    margin-top: 5rem;
  }
</style>
