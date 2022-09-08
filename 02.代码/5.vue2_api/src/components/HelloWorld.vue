<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return{
      msg2:"我是子组件的数据"
    }
  },
  mounted(){
    // console.log('$parent',this.$parent.msg)
    // console.log('$root',this.$root)
  }
}
</script>

<style scoped>
</style>
