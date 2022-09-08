<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->

    <!-- 只缓存A组件 -->
    <!-- <keep-alive include="A"> -->

    
    <!-- 除了A组件都缓存 -->
    <keep-alive exclude="A">
      <A v-if="isShow"/>
      <B v-else/>
    </keep-alive>
    <!-- <component :is="showComponent"></component> -->
  </div>
</template>

<script>
import A from './components/A.vue'
import B from './components/B.vue'

export default {
  name: 'App',
  components: {
    A,
    B
  },
  data() {
    return {
        isShow:true,
        showComponent:A
    }
  },
  mounted() {
    // setTimeout(()=>{
    //   this.showComponent = B;
    // },2000)

    setTimeout(()=>{
      this.isShow = false;
    },2000)

    setTimeout(()=>{
      this.isShow = true;
    },10000)
  },
}
</script>

<style>

</style>
