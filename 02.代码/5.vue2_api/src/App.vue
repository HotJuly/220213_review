<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App">
      <template v-slot:default>
        <div>我是默认插槽</div>
      </template>
      <template #header>
        <div>我是header插槽</div>
      </template>
      <template #footer="scope">
        <div>我是footer插槽,{{scope.msg}}</div>
      </template>
    </HelloWorld>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
    return {
    }
  },
  mounted() {
  },
}
</script>

<style>

</style>
