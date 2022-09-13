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
  import myBus from '@/myBus';
  myBus.emit('getMsg',123);
</script>

<style scoped>
</style>
