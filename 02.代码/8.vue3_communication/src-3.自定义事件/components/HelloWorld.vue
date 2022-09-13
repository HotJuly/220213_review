<template>
  <div class="hello">
    <h2>Hello World</h2>
    <!-- <h1>{{ msg }}</h1> -->
    <button @click="clickHandler">触发自定义事件aaa</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld'
}
</script>

<script setup>
  const emits = defineEmits(["aaa"]);
  
  const clickHandler = () => {
    emits("aaa","我是修改之后的数据")
  }
  
</script>

<style scoped>
</style>
