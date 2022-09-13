<template>
  <div class="hello">
    <h2>Hello World</h2>
    <h1>{{ msg234 }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld'
}
</script>

<script setup>
  import {inject} from 'vue';

  const msg234 = inject("msg123");
</script>

<style scoped>
</style>
