<template>
  <div class="hello">
    <h2>Hello World</h2>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld'
  // props:["msg"]
  // props:{
  //   msg:String
  // }
}
</script>

<script setup>
  // defineProps和defineEmits由于使用频率过高,官方已经将这两个API,作为编程宏使用
  // 什么叫做编程宏,就是某些函数已经默认引入了,不需要我们再次引入
// const props = defineProps(["msg"]);
const props = defineProps({
  msg:String
});
console.log(props)
</script>

<style scoped>
</style>
