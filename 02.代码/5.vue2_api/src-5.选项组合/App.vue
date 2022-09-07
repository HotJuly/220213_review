<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import Vue from 'vue'
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
    return {
      data1: "我是APP的数据"
    }
  },
  // provide:{
  //   msg:"我是APP的数据"
  // },
  provide() {
    // provide函数会在组件实例创建之后,data生成结束后执行
    // 所以此处的this就是当前组件的实例对象
    return Vue.observable({
      data: {
        msg:this.data1
      }
    })
  },
  mounted() {
    // console.log('mounted',this)
    this._provided.data.msg = "我是修改之后的APP数据";
    console.log(this._provided.data.msg)
  },
}
</script>

<style>

</style>
