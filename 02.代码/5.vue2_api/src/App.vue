<template>
  <div id="app">
    <h1 ref="h1">{{msg}}</h1>
    <HelloWorld ref="hello" msg="Welcome to Your Vue.js App" />

    <BigImage/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import BigImage from './components/BigImage.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    BigImage
  },
  data() {
    return {
      msg:"我是初始化数据"
    }
  },
  mounted() {
      // console.log('数据代理',this.msg)
      // console.log('直接读取数据',this.$data)
    // console.log('$children',this.$children[0].msg2)
    console.log(this.$refs.hello.msg2)
  },
}
</script>

<style>

</style>
