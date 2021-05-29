<template>
  <div>
    <q-btn label="入库" class="q-col-gutter" color="secondary"  @click="setadd"/>
    <q-btn label="出库" class="q-col-gutter" color="red" @click="setdelete"/>
    <div v-if="!isclicked">
    <div class="q-pa-md card">
      <div class="q-gutter-md">
        <q-skeleton type="circle" size="2rem" />
        <q-skeleton width="30rem" height="3rem" />
        <q-skeleton width="30rem" height="3rem" />
        <q-skeleton width="30rem" height="3rem" />
        <q-skeleton width="30rem" height="3rem" />
        <q-skeleton width="30rem" height="3rem" />
        <q-skeleton width="5rem"  height="2rem" />
      </div>
    </div>
    </div>
    <div v-else class="card">
      <div v-if="add">
        <q-btn label="从已有书目中添加"/>
        <div v-if="!clickedfromdb">
            <div class="q-gutter-md">
        <q-input outlined v-model="book.name" label="书名" style="width: 30rem"/>
        <q-input outlined v-model="book.isbn" label="ISBN" style="width: 30rem"/>
      ` <q-input outlined v-model="book.author" label="作者" style="width: 30rem"/>
        <q-input outlined v-model="book.published" label="出版社" style="width: 30rem"/>
        <q-input outlined v-model="book.date" label="出版日期" style="width: 30rem"/>
        <div style="margin-left: 27rem; color: #21BA45" v-if="exist">存在此书</div>
        <div v-else style="margin-left: 26rem; color: darkred">暂未找到此书</div>
        <q-input
            ref="age"
            outlined
            type="number"
            v-model="book.num"
            label="入库数量"
            style="width: 30rem"
            :rules="[
          val => val !== null && val !== '' || 'Please type integer',
          val => val > 0 && val < 100 || 'Please type a real number'
        ]"
        />
        <q-btn color="primary" label="提交" style="margin-left: 27rem" @click="insert"/>
      </div>
        </div>
        <div v-else>
          <q-table
              ref="myTable"
              :class="tableClass"
              tabindex="0"
              title="读者列表"
              :data="data"
              :columns="columns"
              row-key="id"
              selection="multiple"
              :selected.sync="selected"
              :pagination.sync="pagination"
              :filter="filter"
              @focusin.native="activateNavigation"
              @focusout.native="deactivateNavigation"
              @keydown.native="onKey"
          >
            <template v-slot:top-right>
              <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
                <template v-slot:append>
                  <q-icon name="search"/>
                </template>
              </q-input>
            </template>
          </q-table>
        </div>
      </div>


      <div v-else>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "bookManage",
  data(){
    return{
      isclicked:true,
      base:true,
      add:true,
      name:"",
      clickedfromdb:false,
      book:{
        isbn:"",
        name:"",
        date:"",
        author:"",
        published:"",
        num:0
      }
    }
  },
  methods: {
    clear:function (){
      this.book.name="";
      this.book.num=0;
      this.book.date="";
      this.book.isbn="";
      this.book.author="";
      this.book.published="";
    },
    setadd:function (){
      this.isclicked=true;
      this.add=true;
      this.clear();
    },
    setdelete:function (){
      this.isclicked=true;
      this.add=false;
      this.clear();
    },
    setclicked:function (){
      this.isclicked=false;
      this.clear();
    },
    insert:function (){
      this.$axios.post("http://127.0.0.1:8099/bookinsert",{
        bname:this.book.name,
        isbn:this.book.isbn,
        author:this.book.author,
        publisher:this.book.published,
        publishdate:this.book.date,
        num:this.book.num,
      }).then(res=>{
        if(res.headers===200){
          alert("插入成功");
          this.setclicked();
        }
        else {
          alert("失败"+res.data.message);
        }
      }).catch(err=>{
        alert("失败"+err);
      })
    }
  },
  computed:{
    exist(){
      return false;
    }
  }
}
</script>

<style scoped>

.card{
  height: 40rem;
  width:  50rem;
  margin-left: 20rem;
  margin-right: 20rem;
  margin-top: 7rem;
}
</style>