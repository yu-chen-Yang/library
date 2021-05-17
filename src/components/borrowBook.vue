<template>
<div>

    <div class="q-pa-lg flex flex-center" >
      <q-pagination
          v-model="current"
          color="purple"
          :max="10"
          :max-pages="6"
          boundary-numbers
      />
    </div>
</div>
</template>

<script>
export default {
  name: "borrow"
}
</script>

<style scoped>

</style>