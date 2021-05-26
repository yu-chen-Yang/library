<template>
  <div>
    <div class="searchBar">
    <q-input rounded outlined v-model="text" label="搜索书目" hint="书名、书号、作者都可">
      <template v-slot:append>
        <q-icon v-if="text2 !== ''" name="close" @click="text = ''" class="cursor-pointer" />
      </template>
    </q-input>
    </div>
  <q-card class="my-card" style="margin-left: 1.5rem;margin-right:1.5rem; margin-top:1rem;height: 15rem"
          v-for="item in items" :key="item.id">
    <q-card-section>
      <div class="row">
        <q-img class="col-1" :src="src" style="position: relative; height: 13rem; width: 10rem"/>
      <div class="col-8" style="margin-left: 5rem">
      <div class="title" style="font-size: 2rem;font-family: Arial; font-weight: 700;color: #007c90; margin-bottom: 2rem">{{item.bname}}</div>
      <p style="margin-bottom: 0.2rem">Author: &nbsp; {{item.author}}</p>
      <p style="margin-bottom: 0.1rem">ISBN: &nbsp;{{item.isbn}}</p>
      <p style="margin-bottom: 0.1rem">Published: &nbsp;{{item.publisher}}</p>
      <p style="margin-bottom: 0.1rem">Publication Dates: &nbsp;{{item.publishdate}}</p>
      </div>
        <div class="col">
        <div class="row" style="margin-bottom: 7rem"><div style="font-size: 1rem">剩余库存： &nbsp;</div><div :style="{color:getcolor(0)}" style="font-size: 1rem" >2</div></div>
        <div v-if="true">
          <q-btn label="借书" color="primary" class="row" icon-right="add" @click="borrow(item.isbn)"/>
        </div>
          <div v-else>
            <q-btn label="预约" color="secondary" class="row" icon-right="history" style="font-size: 1rem" @click="booking"/>
          </div>
        </div>
        </div>
    </q-card-section>
  </q-card>
  <div class="q-pa-lg flex flex-center">
    <q-pagination
        v-model="current"
        color="blue"
        :max="maxPage"
        :max-pages="6"
        boundary-numbers
    />
  </div>
    <q-dialog v-model="alert" >
      <q-card>
        <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{alertContent}}
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: "searchBook",
  data(){
    return{
      current:1,
      maxPage:1,
      items:[],
      src:require("@/assets/封面.jpeg"),
      text:"",
      alert:false,
      alertContent:"error"
    }
  },
  mounted:{
    id(){
      console.log("enter")
      this.getitems();
    }
  },
  computed:{
    text2(){
      console.log("changed");
      this.getitems();
      return this.text;
    }
  },
  methods:{
    getitems:function (){
      this.items=[];
      this.$axios.post('http://127.0.0.1:8099/booksearch',{
        id:this.text
      }).then(res=>{
        console.log(res)
        this.items=res.data.obj;
        console.log(this.items);
      }).catch(err=>{
        console.log(err)
      })
    },
    getcolor:function (param){
      if(param===0)
        return "red";
      else
        return "green";
    },
    borrow:function (isbn){
      if(this.checked()){
        this.$store.commit("setBook",isbn);
      }
    },
    checked:function (){
      if(!this.$store.getters.isLogin){
        this.alert=true;
        this.alertContent="未登陆,请先登录!";
        return false;
      }
      return true;
    }
  }
}
</script>

<style scoped>
.searchBar{
  text-align: center;
  margin-left: 1.5rem;
  margin-right: 30rem;
  margin-top: 1.5rem;
  margin-bottom: 3rem;
}
</style>