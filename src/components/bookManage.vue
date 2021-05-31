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
        <q-toggle
            v-model="clickedfromdb"
            color="primary"
            keep-color
            label="是否从已有书目添加"
        />
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
              title="书目（入库）"
              :data="data"
              :columns="columns"
              row-key="isbn"
              selection="single"
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
          <q-btn label="入库" color="primary" @click="clickedruku" style="margin-left: 45rem;margin-top: 0.5rem"/>
        </div>
      </div>
      <div v-else>
        <q-table
            ref="myTable"
            :class="tableClass"
            tabindex="0"
            title="书目（出库）"
            :data="data"
            :columns="columns"
            row-key="isbn"
            selection="single"
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
        <q-btn label="出库" color="primary" @click="clickedchuku" style="margin-left: 45rem;margin-top: 0.5rem"/>
      </div>
    </div>
    <q-dialog v-model="ruku" >
      <q-card>
        <q-card-section class="q-pt-none">
          <q-input
              ref="num"
              outlined
              type="number"
              v-model="numfromdb"
              label="入库数量"
              style="width: 30rem; margin-top: 1rem"
              :rules="[
          val => val !== null && val !== '' || 'Please type integer',
          val => val > 0 && val < 100 || 'Please type a real number'
        ]"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="提交" color="secondary" @click="insertfromdb"/>
        </q-card-actions>
      </q-card>


    </q-dialog>
    <q-dialog v-model="chuku" >
      <q-card>
        <q-card-section class="q-pt-none">
          <q-input
              ref="num"
              outlined
              type="number"
              v-model="numfromdb"
              label="出库数量"
              style="width: 30rem; margin-top: 1rem"
              :rules="[
          val => val !== null && val !== '' || 'Please type integer',
          val => val > 0 && val < 1000 || 'Please type a real number'
        ]"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="提交" color="red" @click="insertfromdb"/>
        </q-card-actions>
      </q-card>


    </q-dialog>
  </div>
</template>

<script>

export default {
  name: "bookManage",
  data(){
    return{
      navigationActive: false,
      ruku:false,
      chuku:false,
      filter:"",
      selected:[],
      pagination:{},
      isclicked:true,
      base:true,
      add:true,
      name:"",
      clickedfromdb:false,
      numfromdb:0,
      book:{
        isbn:"",
        name:"",
        date:"",
        author:"",
        published:"",
        num:0
      },
      columns: [
        {
          name: 'isbn',
          required: true,
          label: '书号',
          align: 'left',
          field: row => row.isbn,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'bname', align: 'center', label: '书名', field: 'bname', sortable: false },
        { name: 'author', label: '作者', field: 'author', sortable: false },
        { name: 'publisher', label: '出版社', field: 'publisher', sortable: false }
      ],
      data: []
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
      this.selected=[];
      this.numfromdb=0;
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
    clickedruku:function (){
      if(this.selected[0]!=null){
        this.ruku=true;
      }
      else {
        alert("请选择一本");
      }
    },
    clickedchuku:function (){
      if(this.selected[0]!=null){
        this.chuku=true;
      }
      else{
        alert("请选择一本");
      }
    },
    insert:function (){
      this.$axios.post("http://127.0.0.1:8099/bookinsert",{
        bname:this.book.name,
        isbn:this.book.isbn,
        author:this.book.author,
        publisher:this.book.published,
        publishdate:this.book.date,
        num:this.book.num,
        admin:"杨宇辰",
        status:"未借出",
        location:"图书流通室",
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
    },
    insertfromdb:function() {
      this.ruku=false;
      this.$axios.post("http://127.0.0.1:8099/bookinsert",{
        bname:this.selected[0].bname,
        isbn:this.selected[0].isbn,
        author:this.selected[0].author,
        publisher:this.selected[0].publisher,
        publishdate:this.selected[0].publishdate,
        admin:"杨宇辰",
        status:"未借出",
        location:"图书流通室",
        num:this.numfromdb
      }).then(res=>{
        if(res.data.code===200){
          alert("入库成功")
        }
        else {
          alert(res.data);
        }
      }).catch(err=>{
        alert(err);
      })
      this.clear();
    },
    getItem:function (){
      this.$axios.post("http://127.0.0.1:8099/booksearch",{
        id:""
      }).then(res=>{
        this.data=res.data.obj;
        console.log(this.data);
      }).catch(err=>{
        console.log(err);
      })
    },
    log:function (){
      console.log(this.selected);
    },
    activateNavigation () {
      this.navigationActive = true
    },

    deactivateNavigation () {
      this.navigationActive = false
    },
    onKey (evt) {
      if (
          this.navigationActive !== true ||
          [ 33, 34, 35, 36, 38, 40 ].indexOf(evt.keyCode) === -1 ||
          this.$refs.myTable === void 0
      ) {
        return
      }

      evt.preventDefault()

      const { computedRowsNumber, computedRows } = this.$refs.myTable

      if (computedRows.length === 0) {
        return
      }

      const currentIndex = this.selected.length > 0 ? computedRows.indexOf(this.selected[0]) : -1
      const currentPage = this.pagination.page
      const rowsPerPage = this.pagination.rowsPerPage === 0 ? computedRowsNumber : this.pagination.rowsPerPage
      const lastIndex = computedRows.length - 1
      const lastPage = Math.ceil(computedRowsNumber / rowsPerPage)

      let index = currentIndex
      let page = currentPage

      switch (evt.keyCode) {
        case 36: // Home
          page = 1
          index = 0
          break
        case 35: // End
          page = lastPage
          index = rowsPerPage - 1
          break
        case 33: // PageUp
          page = currentPage <= 1 ? lastPage : currentPage - 1
          if (index < 0) {
            index = 0
          }
          break
        case 34: // PageDown
          page = currentPage >= lastPage ? 1 : currentPage + 1
          if (index < 0) {
            index = rowsPerPage - 1
          }
          break
        case 38: // ArrowUp
          if (currentIndex <= 0) {
            page = currentPage <= 1 ? lastPage : currentPage - 1
            index = rowsPerPage - 1
          }
          else {
            index = currentIndex - 1
          }
          break
        case 40: // ArrowDown
          if (currentIndex >= lastIndex) {
            page = currentPage >= lastPage ? 1 : currentPage + 1
            index = 0
          }
          else {
            index = currentIndex + 1
          }
          break
      }

      if (page !== this.pagination.page) {
        this.pagination = {
          ...this.pagination,
          page
        }

        this.$nextTick(() => {
          const { computedRows } = this.$refs.myTable
          this.selected = [ computedRows[Math.min(index, computedRows.length - 1)] ]
        })
      }
      else {
        this.selected = [ computedRows[index] ]
      }
    }
  },
  mounted() {
    this.getItem();
  },
  computed:{
    tableClass () {
      return this.navigationActive === true ? 'shadow-8 no-outline' : void 0
    },
    exist(){
      return false;
    },
  }
}
</script>

<style scoped>

.card{
  height: 40rem;
  width:  50rem;
  margin-left: 16rem;
  margin-right: 20rem;
  margin-top: 5rem;
}
</style>