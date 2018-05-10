<template>
  <div class="upload-area">
    <template v-if="photoItem">
      <input @change='withdrawUploadPicAction($event,photoItem.itemId)' type="file" accept="image/*" capture="camera">
    </template>
    <!--<template v-else>-->
      <!--<input @change='add_img' type="file" accept="image/*" capture="camera">-->
    <!--</template>-->
  </div>
</template>

<script>
  export default {
    data(){
      return {
        imgItem: '',
      }
    },
    props:['photoItem'],
    computed:{
    },
    methods: {
      //单个上传图片
//      add_img(event){
//        const reader = new FileReader();
//        const img1 = event.target.files[0];
//        reader.readAsDataURL(img1);
//        const _this = this;
//        reader.onloadend = function () {
//          _this.$store.dispatch("WITHDRAW_COMMON_UPLOAD_PIC", reader.result)
//        }
//      },
      withdrawUploadPicAction(event, chooseId){
        const reader = new FileReader();
        const img1 = event.target.files[0];
        reader.readAsDataURL(img1);
        const _this = this;
        _this.loadShow=true
        reader.onloadend = function () {
          const dataObj = {
            id: chooseId,
            valueImg: reader.result//上传的图片
          }
          _this.$store.dispatch('WITHDRAW_MUTUAL_UPLOAD_ACTION', dataObj);//传了两个参数
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
