<template>
  <div class="borrow">
  <div v-if="!isLogin">
    <p>未登录，因此啥也没有呢！不如看点养眼照片呢  !  >__>  !</p>
    <hot/>
  </div>
    <div v-else>
      {{usrId}}
    </div>
  </div>
</template>

<script>
import Hot from "./hot";
export default {
  name: "borrow",
  components:{
    Hot,
  },
  data(){
    return {}
  },
  computed:{
    usrId: function (){
      if(!this.$route.query.usrId){
        return "Error"
      }
      else {
        return this.$route.query.usrId;
      }
    },
    isLogin:function (){
      if(this.$route.query.isLogin){
        return this.$route.query.isLogin;
      }
      else {
        return false;
      }
    }
  }
}
</script>

<style scoped>
.borrow{
  position: relative;
  margin-top: 1.5rem;
  margin-left: 1.5rem;
}
.li{
  font-size: 1.3rem;
  font-weight: 600;
  color: white;
  position: relative;
  cursor: pointer;
  list-style: none;
  white-space:nowrap;
  line-height: 1.25;
  letter-spacing: normal;
}
</style>