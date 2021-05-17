<template>
  <q-layout view="lHh LpR fFf">

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
        <q-route-tab to="/home/borrowBook" label="借书" />
        <q-route-tab to="/home/returnBook" label="还书" />
        <q-route-tab to="/home/addBook" label="增加书目" />
      </q-tabs>
    </q-header>

    <q-drawer show-if-above v-model="right" side="right" bordered>
      <div v-if="readerLogin">
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
      readerLogin:false,
    }
  }
}
</script>

<style scoped>

</style>