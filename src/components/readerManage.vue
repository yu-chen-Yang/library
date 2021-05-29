<template>
<div class="readerManage">
  <div class="header q-pa-md">
    <q-btn class="q-gutter" rounded style="margin-left: 2rem" color="secondary" @click="dialog=true" label="增"/>
    <q-btn class="q-gutter" rounded style="margin-left: 2rem" color="primary" @click="changeinfo" label="改"/>
    <q-btn class="q-gutter" rounded style="margin-left: 2rem" color="red" @click="deletereader" label="删"/>
  </div>
  <q-table
      ref="myTable"
      :class="tableClass"
      tabindex="0"
      title="读者列表"
      :data="data2"
      :columns="columns"
      row-key="id"
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
  <q-dialog
      v-model="dialog"
      medium
  >
    <q-card>
      <q-card-section>
        <div class="text-h6">增加用户</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input outlined v-model="addname" label="姓名" class="input"/>
        <q-input outlined v-model="addtele" label="手机号" class="input"/>
        <q-input outlined v-model="addemail" label="邮箱" class="input"/>
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="提交" @click="ok" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</div>
</template>

<script>
export default {
  name: "readerManage",
  data () {
    return {
      navigationActive: false,
      filter: '',
      selected: [],
      dialog:false,
      addId:"",
      addname:"",
      addtele:"",
      addemail:"",
      pagination: {},
      columns: [
        {
          name: 'id',
          required: true,
          label: '读者号',
          align: 'left',
          field: row => row.id,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'name', align: 'center', label: '姓名', field: 'name', sortable: true },
        { name: 'tele', label: '电话', field: 'tele', sortable: false },
        { name: 'email', label: '邮箱', field: 'email' },
      ],
      data: []
    }
  },

  computed: {
    tableClass () {
      return this.navigationActive === true ? 'shadow-8 no-outline' : void 0
    },
    data2(){
      return this.data;
    }
  },
  mounted() {
    console.log("mounted")
    this.getItem();
  },
  methods: {
    changeinfo:function (){
      console.log(this.selected);
      if(this.selected[0]==null){
        alert("请选择一个用户");
      }
      this.addId=this.selected[0].id;
      this.addname=this.selected[0].name;
      this.addtele=this.selected[0].tele;
      this.addemail=this.selected[0].email;
      this.dialog=true;
    },
    clear:function (){
      this.addId="";
      this.addname="";
      this.addtele="";
      this.addemail="";
      this.dialog=false;
    },
    ok:function (){
      console.log("ok")
      this.dialog=false;
      if(this.selected[0]!=null){
        if(this.selected[0].id===this.addId){
          this.$axios.post("http://127.0.0.1:8099/readerupdate",{
            id:this.addId,
            name:this.addname,
            tele:this.addtele,
            email:this.addemail,
          }).then(res=>{
            console.log(res);
            this.dialog=false;
            if(res.data.code===200){
              this.dialog=false;
              this.clear();
              this.getItem();
              alert("修改成功");
            }
            else{
              alert(res.data.message);
            }
          }).catch(err=>{
            console.log(err);
            this.dialog=false;
            alert("修改失败,"+err);
          })
        }
        else{
          this.$axios.post("http://127.0.0.1:8099/readerinsert",{
            id:this.addId,
            name:this.addname,
            tele:this.addtele,
            email:this.addemail,
          }).then(res=>{
            console.log(res);
            this.dialog=false;
            this.clear();
            this.getItem();
            location.reload();
            alert("注册成功");
          }).catch(err=>{
            console.log(err);
            this.dialog=false;
            this.clear();
            this.getItem();
            alert("注册失败,"+err);
          })
        }

      }
      else{
        this.$axios.post("http://127.0.0.1:8099/readerinsert",{
          id:this.addId,
          name:this.addname,
          tele:this.addtele,
          email:this.addemail,
        }).then(res=>{
          console.log(res);
          this.dialog=false;
          this.clear();
          this.getItem();
          location.reload();
          alert("注册成功");
        }).catch(err=>{
          console.log(err);
          this.dialog=false;
          this.clear();
          this.getItem();
          location.reload();
          alert("注册失败,"+err);
        })
      }
    },
    deletereader:function (){
      this.changeinfo();
      this.$axios.post("http://127.0.0.1:8099/readerdelete",{
        id:this.selected[0].id,
      }).then(res=>{
        this.getItem();
        location.reload();
        console.log(this.addId);
        console.log(res.data.code)
        if(res.data.code===500){
          alert(res.data.message);
        }
        else{
          alert("小fw已被删除！");
        }

      }).catch(err=>{
        this.getItem();
        location.reload();
        alert("失败"+err);
      })
      this.clear();
    },
    getItem:function (){
      console.log("start");
      this.$axios.post("http://127.0.0.1:8099/readerselect",{}).then(res=>{
        console.log(res);
        this.data=res.data.obj;
      }).catch(err=>{
        console.log(err);
        alert(err);
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
  }
}
</script>

<style scoped>
.readerManage{
  margin-top: 1rem;
  margin-left: 1rem;
}
.header{
  margin-left: 50rem;
  margin-bottom: 2rem;
}
.input{
  margin-bottom: 2rem;
  margin-left: 30px;
  margin-right: 30px;
  width: 400px;
}
</style>