<template>
<div class="card">
  <div>读者号: </div> <p>{{id}}</p>
</div>
</template>

<script>
export default {
  name: "readerCard",
  computed:{
    id(){
      return this.$store.getters.id;
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