<template>
  <div class="hello">
    <!-- <h1>{{ msg }}</h1> -->
    <div v-if="showA1" ref="a1">1号</div>
    <div v-if="showA2"  ref="a2">2号</div>
    <div v-if="showA3"  ref="a3">3号</div>
    <button @click="show">出现吧</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return{
      showA1:false,
      showA2:false,
      showA3:true
    }
  },
  mounted(){
  },
  methods:{
    show(){

      // 多个nextTick只会开启一个微任务,不过在这个微任务中会遍历callbacks数组
      // 执行所有的回调函数
      // 更新响应式属性时,会将更新DOM的方法放入nextTick的callback数组中
      // 其实Vue2中,无论一个组件更新多少次数据,他只会通知当前组件更新一次
      // 不过更新的这一次,会将所有的内容都更新出来
      this.showA1 = true;

      // 调用nextTick,会将自己的回调函数放入callback数组中
      this.$nextTick(()=>{

        // 补充说明:Vue中更新一个组件的DOM,会一次性更新,不会分批更新
        console.log('a1',this.$refs.a1)
        console.log('a2',this.$refs.a2)
      })

      this.showA2 = true;
    }
  }
}
</script>

<style scoped>
</style>
