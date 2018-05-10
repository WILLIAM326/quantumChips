<template>
  <div class="upload-area">
    <template v-if="item">
      <input @change='proofAction($event,item.itemId)' type="file" accept="image/*" capture="camera">
    </template>
    <template v-else>
      <input @change='add_img' type="file" accept="image/*" capture="camera">
    </template>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        imgItem: '',
        loadShow:false
      }
    },
    props:['item'],
    computed:{
    },
    mounted(){
    },
    methods: {
      add_img(event){
        const reader = new FileReader();
        const img1 = event.target.files[0];
        reader.readAsDataURL(img1);
        const _this = this;
        reader.onloadend = function () {
          _this.$store.dispatch("COMMON_UPLOAD_PIC", reader.result)
        }
      },
      proofAction(event, chooseId){
        const reader = new FileReader();
        const img1 = event.target.files[0];
        reader.readAsDataURL(img1);
        const _this = this;
        reader.onloadend = function () {
          const dataObj = {
            id: chooseId,
            valueImg: reader.result//上传的图片
          }
          _this.$store.dispatch('PROOF_UPLOAD_ACTION', dataObj);//传了两个参数
        }
      }

    }
  }
</script>

<style lang="scss" scoped>
  .upload-area {
    input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
    }
  }

</style>
