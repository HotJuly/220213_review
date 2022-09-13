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
  import { useAttrs } from 'vue';
  const props = defineProps(["a"]);
  const attrs = useAttrs();
  console.log('props',props)
  console.log('attrs',attrs)
</script>

<style scoped>
</style>
