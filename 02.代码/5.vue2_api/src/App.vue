<template>
  <div id="app">
    <h1>App</h1>
    <router-view></router-view>
    <router-link to="/home">ToHome</router-link>
    <br>
    <!-- <router-link to="/about">ToAbout</router-link> -->
    <button @click="ToAbout">ToAbout</button>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
    }
  },
  methods:{
    ToAbout(){
      // this.$router.push('/about')
      this.$router.replace('/about')
    }
  }
}
</script>

<style>
  #app{
    width:500px;
    height:500px;
    border: 1px solid;
    padding:20px;
  }
</style>
