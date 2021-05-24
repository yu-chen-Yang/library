<template>
  <q-layout view="hHh lpR lFr">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>
          图书管理系统
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="right = !right" />
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab :to="{ name:'borrowBook', query:{  usrId:id, isLogin:this.isLogin } }" label="借书一览" />
        <q-route-tab to="/home/Booking" label="预约状态" />
        <q-route-tab to="/home/searchBook" label="查询书目" />
        <q-route-tab to="/home/readerManage" label="读者信息管理" />
        <q-route-tab to="/home/bookManage" label="书目管理" />
      </q-tabs>
    </q-header>

    <q-drawer show-if-above v-model="right" side="right" bordered>
      <div v-if="this.isLogin">
        <reader-card/>
      </div>
      <div v-else>
      <reader-login/>
      </div>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

import ReaderCard from "../components/readerCard";
import ReaderLogin from "../components/readerLogin";

export default {
  name: "home",
  components: {ReaderLogin, ReaderCard},
  data(){
    return{
      test:"测试",
    }
  },
  computed:{
    isLogin:function (){
      console.log(this.$store.getters.isLogin)
      return this.$store.getters.isLogin;
    }
  }
}
</script>

<style scoped>

</style>