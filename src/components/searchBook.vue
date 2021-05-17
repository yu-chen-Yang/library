<template>
  <div>
    <div class="searchBar">
    <q-input rounded outlined v-model="text" label="搜索书目" hint="书名、书号、作者都可">
      <template v-slot:append>
        <q-icon v-if="text !== ''" name="close" @click="text = ''" class="cursor-pointer" />
      </template>
    </q-input>
    </div>
  <q-card class="my-card" style="margin-left: 1.5rem;margin-right:1.5rem; margin-top:1rem;height: 10rem"
          v-for="item in items" :key="item.id">
    <q-card-section>
      {{item.id}}
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
  </div>
</template>

<script>
export default {
  name: "searchBook",
  data(){
    return{
      current:1,
      maxPage:10,
      items:[{id:1,name:"第一本"},{id:2,name:"第二本"},{id:3,name:"第二本"}
        ,{id:4,name:"第二本"},{id:5,name:"第二本"}
      ]
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