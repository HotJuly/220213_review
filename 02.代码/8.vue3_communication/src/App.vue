<template>
  <h1>App</h1>
  <HelloWorldVue>
    <template #default>
      <h3>我是默认插槽</h3>
    </template>
    <template #header>
      <h3>我是header插槽</h3>
    </template>
    <template #footer="scope">
      <h3>我是footer插槽,{{scope.msg}}</h3>
    </template>
  </HelloWorldVue>
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
