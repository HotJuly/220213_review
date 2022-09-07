<template>
  <div id="app">
    <!-- <h1>name:{{user.name | nameFilter}}</h1> -->
    <h1>name:{{user.name}}</h1>
    <h1>age:{{user.age}}</h1>
    <h1>c:{{c}}</h1>
    <button @click="addSex">添加性别</button>
    <h1>pageX:{{x}}</h1>
    <h1>pageY:{{y}}</h1>
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
// import mixins from '@/mixins';
import position from '@/mixins/position';

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  mixins:[position],
  data() {
    return {
      user:{
        name:"xiaoming",
        age:23
      },
      c:1
    }
  },
  mounted() {
    // console.log('mounted',this.$options.name)
  },
  methods:{
    addSex(){
      /*
        响应式属性的定义:
          当属性值被修改之后,页面会渲染出最新结果,这种属性称为响应式属性

        响应式属性的创建时机:
          1.当组件初始化的时候,
            会将data返回的对象进行深度劫持,所有属性都变成响应式属性

          2.当响应式属性值更新的时候,
            如果更新的值是个对象,那么该对象内部所有的属性都会变成响应式属性
      
      */
      // this.user.sex = "男"
      // 此处更新了响应式属性的值,页面会异步发生渲染(视图会异步更新)
      // 当视图更新的时候,此时发现sex具有属性值,就顺带一起渲染了
      // Vue更新视图的范围是整个组件
      // this.user = {
      //   ...this.user,
      //   // sex:"男"
      // }
      // this.user.sex = "男"
      // console.log(this.user)

      // Vue.set(this.user,"sex","男")
      // this.$set(this.user,"sex","男")

      // setTimeout(()=>{
      //   this.user.sex = "女"
      //   console.log(this.user)
      // },2000)


      //------------------
      // 使用delete关键字删除响应式属性,属性可以成功删除,但是页面不会渲染最新结果
      // delete this.user.name;
      // Vue.delete(this.user,"name");
      // this.$delete(this.user,"name");
      // console.log(this.user)

    }
  },
  filters:{
    nameFilter(value){
      // console.log('nameFilter',value)
      // console.log(this)
      return value + "xixi"
    }
  }
}
/*
  需求:当用户鼠标移动时,页面显示当前用户鼠标的坐标
  拆解:
    1.如何知道用户鼠标移动?
      绑定事件监听
      事件源:document
      事件名:mousemove

    2.如何知道用户鼠标的坐标?
    3.如何在页面上显示鼠标坐标?
      使用状态数据来动态显示坐标位置
*/
</script>

<style>

</style>
