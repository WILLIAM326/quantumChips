 <template>
    <div class="alert_container">
      <section class="tip_text_container">
        <div class="container_title">
          <p>承诺书</p>
        </div>
        <p class="tip_text">{{alertText}}</p>
        <div class="confrim" @click="confirmAction">确认</div>
      </section>
    </div>
</template>

<script>
  export default {
    data(){
      return {
        positionY: 0,
        timer: null,
        alertText:'项目发起人已承诺，涉及本项目的文字、图片、证明等相关信息完全真实、有效，且不存在未经他人授权冒用他人名义进行求助的行为，本人收到的全部救助款项将直接用于被救助人的救助,不另行挪作他用。若发起人存在违反上述承诺的行为，愿自行承担全部法律责任',
      }
    },
    mounted(){
    },
    methods: {
      confirmAction(){
        this.$emit('closeTip')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../style/mixin';
	@keyframes tipMove{
       0%   { transform: scale(1) }
       35%  { transform: scale(.8) }
       70%  { transform: scale(1.1) }
       100% { transform: scale(1) }
    }
    .alert_container{
    	position: fixed;
    	top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 200;
      background: rgba(0,0,0,0.5);
    }
    .container_title{
      p{
        text-align: center;
        font-size:0.8rem;
        color:#ff6631;
      }
    }
    .tip_text_container{
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -6rem;
        margin-left: -7rem;
        width: 14rem;
        animation: tipMove .4s ;
        background-color: rgba(255,255,255,1);
        border: 1px;
        z-index: 100;
        padding-top: .6rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border-radius: 0.8rem;
        .tip_text{
            @include sc(.7rem, #333);
            line-height: .9rem;
            text-align: center;
            margin-top: .8rem;
            padding: 0 .8rem;
        }
        .confrim{
            @include sc(.8rem, #fff);
            font-weight: bold;
            margin-top: 1rem;
            border-top:1px dotted #ff6631;
            width: 100%;
            height: 2rem;
            color:#ff6631;
            text-align: center;
            line-height: 1.8rem;
            border-bottom-left-radius: 0.25rem;
            border-bottom-right-radius: 0.25rem;
        }
    }

</style>
