<template>
   <div class="normal-content">
     <p>
       <img src="../../images/kong.png">
     </p>
     <p>{{nothingDesc}}</p>
   </div>
</template>

<script>
    export default {
        props:['nothingDesc']
    }
</script>

<style lang="scss" scoped>
  .normal-content{
    p{
      font-size:0.75rem;
      color: #4c4c4c;
      margin-top: 0.5rem;
      text-align: center;
      img{
        width: 5.7rem;
        height: 5.7rem;
      }
    }
  }

</style>
