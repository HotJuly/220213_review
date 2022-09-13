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
import HelloWorldVue from './components/HelloWorld.vue';
import { ref, provide} from 'vue';

const msg = ref('我是APP的数据111');

provide("msg123",msg);

</script>

<style>
</style>
