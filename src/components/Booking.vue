<template>
  <div class="borrow">
      <template>
        <div class="borrowBook">
          <div class="header q-pa-md">
            <q-btn class="q-gutter" rounded style="margin-left: 2rem" color="secondary" @click="borrowbook" label="办理借书"/>
            <q-btn class="q-gutter" rounded style="margin-left: 2rem" color="red" label="取消预约"/>
          </div>
          <q-table
              ref="myTable"
              :class="tableClass"
              tabindex="0"
              title="借阅情况"
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
          <q-dialog
              v-model="returndialog"
              medium
          >
            <q-card>
              <q-card-section>
                <div style="font-size: 1.5rem;margin-top: 3rem;margin-bottom: 1rem;margin-left: 1.5rem;margin-right: 1.5rem">{{content}}</div>
              </q-card-section>
              <q-card-actions align="right" class="bg-white text-teal">
                <q-btn flat label="OK" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </div>
      </template>
    </div>
</template>

<script>
export default {
  name: "returnBook",
  data () {
    return {
      navigationActive: false,
      filter: '',
      selected: [],
      returndialog:false,
      addId:"",
      addname:"",
      addtele:"",
      title:"",
      addemail:"",
      pagination: {},
      content:"",
      columns: [
        {
          name: 'id',
          required: true,
          label: '书号',
          align: 'left',
          field: row => row.id,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'bname', align: 'center', label: '书名', field: 'bname', sortable: true },
        { name: 'author', label: '作者', field: 'author', sortable: false },
        { name: 'isbn', label: 'isbn', field: 'isbn' },
        { name: 'orderdate', label: '预约时间', field: 'orderdate', sortable: true },
        { name: 'deadline', label: '截止时间', field: 'deadline', sortable: true }
      ],
      data: []
    }
  },
  computed: {
    tableClass () {
      return this.navigationActive === true ? 'shadow-8 no-outline' : void 0
    }
  },
  mounted() {
    this.getItem();
  },
  methods: {
    borrowbook:function (){
      this.returndialog=true;
      this.content="还书成功";
    },
    cancelborrow:function(){

    },
    getItem:function(){
      this.$axios.post("http://127.0.0.1:8099/orderselect",{
        rid:this.$store.getters.id
      }).then(res=>{
        console.log(res);
        this.data=res.data.obj;
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
  }
}
</script>

<style scoped>
.borrow{
  position: relative;
  margin-top: 1.5rem;
  margin-left: 1.5rem;
  margin-right: 1.5rem;
}
.header{
  margin-left: -3rem;
}
</style>