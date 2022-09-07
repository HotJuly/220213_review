<template>
  <div id="app">
    <h1>username:{{username}}</h1>
    <h2>nameCom:{{nameCom}}</h2>
    <h2 @click="changeName">name:{{user.name}}</h2>
    <HelloWorld :msg="a" :sendData="sendData"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
/*
  .vue文件向外暴露的只是一个配置对象
  后续Vue会根据该配置对象,生成对应的组件实例的构造函数

  问题:data为什么不能是对象类型,必须是函数类型?
  回答:
    1.如果data是一个对象数据类型,那么由组件构造函数生成的所有的组件实例对象,
      都会共享同一个data对象,那么最终导致,其中一个组件更新状态,其余组件会一起发生变化
    2.如果data是一个函数,那么该函数每次调用都会返回一个全新的对象,相当于是工厂函数
      这样才能保证每个组件实例都拥有属于自己的data对象
*/
export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
    return {
      _a:1,
      a:2,
      username:"xiaoming",
      user:{
        name:"xiaohong",
        age:23
      }
    }
  },
  mounted() {
    // console.log(this._a,this.a)
  },
  methods:{
    sendData(data){
      // console.log('sendData',data)
      // console.log(this)
      this.a = data;
    },
    changeName(){
      // this.user = {
      //   name:"xiaolv"
      // }
      this.user.name = "xiaolv"
    }
  },
  computed:{
    nameCom(){
      console.log('nameCom')
      return this.username + "帅哥"
    },
    // a:()=>{}
  },
  watch:{
    a(){
      console.log('a update')
    },
    // user(){
    //   console.log('user update')
    // },
    // user:{
    //   handler:function(){
    //     console.log('user update')
    //   },
    //   deep:true
    // },
    "user.name"(){
      console.log('user.name update')
    },
  }
}
</script>

<style>

</style>
