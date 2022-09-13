<template>
  <h1>App</h1>
  <HelloWorldVue :msg="msg" :changeMsg="changeMsg"></HelloWorldVue>
</template>

<script>
export default {
  name:"App"
}
</script>

<script setup>
import { ref } from 'vue';
import HelloWorldVue from './components/HelloWorld.vue';
/*
  Vue3中创建响应式数据的两种方法
    ref->可以传入基本数据类型或者对象数据类型,
      最终返回一个ref对象,该对象的value属性是响应式的

    reactive->可以传入对象数据类型,
      最终返回一个Proxy对象,该对象是代理对象,
      操作他会具有响应式的效果,同时还会响应到元对象

*/
const msg = ref('我是APP的数据');
// console.log(msg)

const changeMsg = function(){

}
</script>

<style>
</style>
