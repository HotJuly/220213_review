<template>
  <div class="hello">
    <h2>Hello World</h2>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld'
}
</script>

<script setup>
  import { ref, defineExpose } from 'vue';
  const msg = ref('我是helloworld的数据');

  defineExpose({
    msg
  })
</script>

<style scoped>
</style>
