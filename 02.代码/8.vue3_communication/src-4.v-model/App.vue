<template>
  <h1>App</h1>
  <input type="text" v-model="msg">
  <HelloWorldVue v-model:msg333="msg"></HelloWorldVue>
</template>

<script>
export default {
  name:"App"
}
</script>

<script setup>
import { ref } from "vue";
import HelloWorldVue from './components/HelloWorld.vue';

const msg = ref('我是初始化数据')
</script>

<style>
</style>
