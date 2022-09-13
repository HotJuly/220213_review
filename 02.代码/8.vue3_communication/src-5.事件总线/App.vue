<template>
  <h1>App</h1>
  <HelloWorldVue></HelloWorldVue>
</template>

<script>
export default {
  name:"App"
}
</script>

<script setup>
import myBus from './myBus';
import HelloWorldVue from './components/HelloWorld.vue';

myBus.on("getMsg",(data)=>{
  console.log('getMsg',data)
})

</script>

<style>
</style>
