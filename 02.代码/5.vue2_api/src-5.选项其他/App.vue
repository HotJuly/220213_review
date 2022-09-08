<template>
  <div id="app">
    <!-- <input type="text" v-model="username"> -->
    <!-- <input 
    type="text" 
    :value="username" 
    @input="(event)=>username=event.target.value"
    /> -->

    <h1>username:{{username}}</h1>
    <HelloWorld v-model="username" msg="Welcome to Your Vue.js App" />
    <!-- <HelloWorld :value="username" @input="(data)=>username=data" msg="Welcome to Your Vue.js App" /> -->
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
