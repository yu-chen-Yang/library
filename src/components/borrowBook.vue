<template>
  <div class="borrow">
  <div v-if="!this.$store.getters.isLogin">
    <p style="font-family: Arial; font-size: 3rem">未登录，因此啥也没有呢！不如听一首德沃夏克的幽默曲放松一下吧 !  >__>  !</p>
    <video v-bind:src="video" v-bind:controls="false" autoplay="autoplay" loop="loop" width="100%"/>
  </div>
    <div v-else>
      {{this.$store.getters.id}}
    </div>
  </div>

</template>

<script>
export default {
  name: "borrow",
  components:{
  },
  data(){
    return {
      video:require("@/assets/幽默曲.mp4")
    }
  },
}
</script>

<style scoped>
.borrow{
  position: relative;
  margin-top: 1.5rem;
  margin-left: 1.5rem;
  margin-right: 1.5rem;
}
</style>