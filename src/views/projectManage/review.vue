<template>
  <div class="project-review">
    <div class="review-box">
      <div class="review-head">
        <p>项目预览</p>
      </div>

      <div class="content-list">
          <div class="project-name">
            <ul>
              <router-link :to="{path:'/ownPreview',query:{projectId:itemId}}">
                <li>
                  <img :src="projectManageData.image">
                </li>
                <li>
                  <p>{{projectManageData.title}}</p>
                </li>
                <li>
                  <img src="../../images/black.png">
                </li>
              </router-link>
            </ul>
          </div>
        </div>
    </div>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

    export default {
        data(){
            return{
              itemId: this.$route.query.projectId
            }
        },
        computed: {
          ...mapGetters(['projectManageData'])
        }
    }
</script>

<style lang="scss" scoped>
  @import "../../style/mixin.scss";
  .project-review{
    .review-box{
      width: 90%;
      margin: auto;
      padding-top:1rem;
      .review-head{
        width:100%;
        height: 1.2rem;
        border-left:5px solid #ff6631;
        p{
          font-size:0.75rem;
          color:#353535;
          font-weight: bold;
          padding-left:0.5rem;
          padding-top: 0.2rem;
        }
      }
      .content-list{
        width: 100%;
        margin-top:1rem;
        min-height:2rem;
        li:nth-child(1){
          width:15%;
          img{
            width: 1.75rem;
            height: 1.75rem;
            border-radius: 50%;
          }
        }
        li:nth-child(2){
          width:75%;
          p{
            font-size:0.75rem;
            color:#2d2d2d;
          }
        }
        li:nth-child(3){
          img{
            width: 0.5rem;
            height: 0.8rem;
            margin-left: 0.2rem;
          }
        }
        .project-name{
          margin-top: 0.8rem;
          min-height: 2rem;
          &:after{
            width: 100%;
            content:'';
            display: inline-block;
            height: 1px;
            background: #f4f4f4;
          }
           &:last-child:after{
             height: 0;
            }
        }

      }
    }



  }

</style>
