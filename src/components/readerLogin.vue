<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
    >
      <q-input
          filled
          v-model="readerId"
          label="读者号"
          hint="忘记读者号？没关系，使用邮箱找回"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
      <q-dialog v-model="prompt" persistent>
        <q-card style="min-width: 350px">
          <q-card-section>
            <div class="text-h6">邮箱找回</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input dense v-model="address" autofocus @keyup.enter="prompt = false" />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" v-close-popup />
            <q-btn flat label="Send E-mail" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Forget？" color="primary" flat class="q-ml-sm" @click="forget" />
      </div>
    </q-form>

  </div>
</template>

<script>
export default {
  name: "readerLogin",
  data(){
    return{
      readerId:"",
      prompt:false,
    }
  },
  methods:{
    forget:function (){
      this.prompt=true;
    }
  }
}
</script>

<style scoped>

</style>