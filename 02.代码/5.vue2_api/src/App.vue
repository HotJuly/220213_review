<template>
  <div id="app">
    <h1>App username:{{username}}</h1>
    <HelloWorld :username.sync="username" msg="Welcome to Your Vue.js App" />
    <!-- <HelloWorld :username="username" @update:username="(data)=>username=data" msg="Welcome to Your Vue.js App" /> -->
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
      username:"xiao"
    }
  },
  mounted() {
  },
}
</script>

<style>

</style>
