<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Hello username:{{username}}</h2>
    <button @click="changeName">修改父组件的数据</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    username:String
  },
  mounted(){
  },
  methods:{
    changeName(){
      this.$emit('update:username',"xiaowang")
    }
  }
}
</script>

<style scoped>
</style>
