<template>
  <div id="app">
    <ul>
      <li v-for="item in arr" :key="item">{{item}}</li>
    </ul>
    <button @click="changeNum">修改数组</button>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      arr:[1,2,3,4,5]
    }
  },
  mounted() {
  },
  methods:{
    changeNum(){
      this.arr[1]=6;
      console.log(this.arr)
    }
  }
}
</script>

<style>

</style>
