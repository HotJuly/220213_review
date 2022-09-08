<template>
  <div id="app">
    <!-- <h1 v-pre>{{username}}</h1> -->
    <h1 v-once>{{username}}</h1>
    <HelloWorld msg="Welcome to Your Vue.js App" />
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
      username:"xiaoming"
    }
  },
  mounted() {
    this.username = "老王"
  },
}
</script>

<style>

</style>
