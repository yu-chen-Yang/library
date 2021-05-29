<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form
        class="q-gutter-md"
    >
      <q-input
          filled
          v-model="readerId"
          label="读者号"
          hint="忘记读者号？没关系，使用邮箱找回"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
      <div>
        <q-btn label="Submit" type="submit" color="primary" v-on:click="login"/>
      </div>
    </q-form>
  </div>
</template>

<script>



export default {
  name: "readerLogin",
  data(){
   return{
     readers:{
       name:"",
       id:"",
       email:"",
       tele:"",
       isLogin:false,
       address:"",
     },
     readerId:""
   }
  },
  methods:{
      login:function (){
        this.$axios.post('http://127.0.0.1:8099/readerlogin',{
          id:this.readerId,
        }).then(res=>{
          this.readers.name=res.data.obj.name;
          this.readers.id=this.readerId;
          this.readers.tele=res.data.obj.tele;
          this.readers.email=res.data.obj.email;
          this.readers.isLogin=true;
          this.$store.commit('login',this.readers)
          this.$router.push({name:'borrowBook'})
        }).catch(err=>{
          console.log(err);
        })
      }
    },
}
</script>

<style scoped>

</style>