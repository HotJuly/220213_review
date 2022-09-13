<template>
  <h1>App</h1>
  <h3>msg:{{msg}}</h3>
  <HelloWorldVue @aaa="aaaFn"></HelloWorldVue>
</template>

<script>
export default {
  name:"App"
}
</script>

<script setup>
  import {ref} from 'vue'
import HelloWorldVue from './components/HelloWorld.vue';

const msg = ref("我是初始化的数据")

const aaaFn = (data)=>{
  // console.log('aaaFn',this)
  msg.value = data;
}
</script>

<style>
</style>
