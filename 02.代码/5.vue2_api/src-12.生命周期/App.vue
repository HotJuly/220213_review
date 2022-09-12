<template>
  <div id="app">
    <!-- <ul>
      <li v-for="(item,index) in arr" :key="index">
        <label>{{item}}</label>
        <input type="text">
      </li>
    </ul>
    <button @click="changeNum">修改数组</button> -->
    <HelloWorld></HelloWorld>
  </div>
</template>

<script>
  import HelloWorld from './components/HelloWorld.vue';

export default {
  name: 'App',
  components:{
    HelloWorld
  },
  data() {
    return {
      arr:[1,2,3,4,5]
    }
  },
  beforeCreate(){
    // console.log('---------beforeCreate---------',this,this.$data,this.arr,this.$el)
  },
  created(){
    // console.log('---------created---------',this,this.$data,this.arr,this.$el)
  },
  beforeMount(){
    // console.log('---------beforeMount---------',this,this.$data,this.arr,this.$el)
    // $vnode是父组件的虚拟DOM,_vnode是当前组件自己的虚拟DOM
    // console.log(this.$vnode,this._vnode)
    console.log('---------APP beforeMount---------')
  },
  mounted() {
    // console.log('---------mounted---------',this,this.$data,this.arr,this.$el)
    console.log('---------APP mounted---------')
  },
  methods:{
    changeNum(){
      // this.arr[1]=6;
      // this.arr=[1,6,3,4,5];
      // this.$set(this.arr,"1",6)

      // this.arr.splice(1,1,6)
      // console.log(this.arr)

      // const arr1 = [1,2,2,3,4];
      // arr1.push(7);

      // this.arr.push(7)

      this.arr.splice(2,0,6)
    }
  },
  updated(){
    console.log('updated')
  }
}
</script>

<style>

</style>
