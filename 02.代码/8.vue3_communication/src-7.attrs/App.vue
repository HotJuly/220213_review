<template>
  <h1>App</h1>
  <HelloWorldVue a="1" b="2" c="3" @aaa="()=>{}"></HelloWorldVue>
</template>

<script>
export default {
  name:"App"
}
</script>

<script setup>
import HelloWorldVue from './components/HelloWorld.vue';

</script>

<style>
</style>
