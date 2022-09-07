<template>
  <div class="hello">
    <h1>{{ data.msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  // props: {
  //   msg: String
  // },
  mounted(){
  },
  inject:["data"]
}
</script>

<style scoped>
</style>
