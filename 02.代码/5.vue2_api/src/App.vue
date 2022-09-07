<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data(){
    return {

    }
  },
  a:2,
  mounted(){
    // console.log(this.$options.name,'a',this.$options.a)
    // console.log(c)
  }
}
</script>

<style>
</style>
