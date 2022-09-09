<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <slot/>
    <slot name="header"/>
    <slot name="footer" msg="嘿嘿"/>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mounted(){
  }
}
</script>

<style scoped>
</style>
