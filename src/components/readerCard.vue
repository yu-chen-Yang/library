<template>
<div class="card">
  <div>读者号: </div> <p>{{id}}</p>
  <div>姓名：</div> <p>{{name}}</p>
  <div>邮箱： </div> <p>{{email}}</p>
  <div>电话：</div> <p>{{tele}}</p>
  <q-btn label="登出" @click="logout" color="primary" />
</div>
</template>

<script>
export default {
  name: "readerCard",
  computed:{
    id(){
      return this.$store.getters.id;
    },
    email(){
      return this.$store.getters.email;
    },
    tele(){
      return this.$store.getters.tele;
    },
    name(){
      return this.$store.getters.name;
    }
  },
  methods:{
    logout:function (){
      this.$store.commit("logout")
    }
  }
}
</script>

<style scoped>
.card{
  margin-top: 3rem;
  margin-left: 1.5rem;
}
</style>