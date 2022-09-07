<template>
  <div id="app">
    <button v-if="!isEdit" @click="changeEdit">添加</button>
    <input ref="input666" v-else type="text">
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
// console.log(HelloWorld)

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
    return {
      msg: "我是初始化的数据",
      isEdit: false
    }
  },
  a: 2,
  mounted() {
    // console.log(this.$options.name,'a',this.$options.a)
    // console.log(c)

    // console.log(1,this.msg)

    // this.msg="我是修改之后的数据";

    // console.log(2,this.msg)

    // debugger

  },
  methods: {
    changeEdit() {
      // this.isEdit = true;


      /*
        Vue响应式特点
          1.请问Vue更新数据是同步更新还是异步更新?
            数据同步更新
  
          2.请问Vue更新视图是同步更新还是异步更新?
            视图异步更新
              此处的异步是微任务
                其实,Vue更新视图也是在nextTick中实现的
  
        nextTick
          用处:
            在下次 DOM 更新循环结束之后执行延迟回调。
            在修改数据之后立即使用这个方法，获取更新后的 DOM。
            简单说法:在nextTick的回调函数中可以获取到当前最新的视图结果
  
          原理:
            其实他就是个微任务(用到了.then)
      
      */
      // this.$nextTick(()=>{
      //   this.$refs.input666.focus();
      // })


      this.isEdit = true;

      Promise.resolve().then(() => {
        console.log(1)
      })

      this.$nextTick(() => {
        console.log(this.$refs.input666)
      })

      Promise.resolve().then(() => {
        console.log(3)
      })

      this.$nextTick(() => {
        console.log(4)
      })

      this.$nextTick(() => {
        console.log(5)
      })
    }
  }
}
</script>

<style>

</style>
