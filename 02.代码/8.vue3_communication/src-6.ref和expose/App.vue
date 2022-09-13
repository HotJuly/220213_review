<template>
  <h1>App</h1>
  <HelloWorldVue ref="helloRef"></HelloWorldVue>
</template>

<script>
export default {
  name:"App"
}
</script>

<script setup>
  import { ref, onMounted } from 'vue';
import HelloWorldVue from './components/HelloWorld.vue';

const helloRef = ref();

onMounted(() => {
  console.log('helloRef',helloRef)
})

</script>

<style>
</style>
