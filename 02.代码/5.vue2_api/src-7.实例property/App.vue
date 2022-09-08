<template>
  <div id="app">
    <h1 ref="h1">{{msg}}</h1>
    <HelloWorld 
    ref="hello" 
    msg="Welcome to Your Vue.js App" 
    a="1" 
    b="2"
    @aaa="()=>{}"
    @bbb="()=>{}"
    />

    <!-- <BigImage /> -->
    <HintButton 
    size="small" 
    type="danger" 
    title="请注意,即将删除"
    @click="log"
    />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import BigImage from './components/BigImage.vue'
import HintButton from './components/HintButton.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    BigImage,
    HintButton
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
    // console.log(this.$refs.hello.msg2)
  },
  methods:{
    log(){
      console.log('按钮成功被点击了')
    }
  },
}
</script>

<style>

</style>
