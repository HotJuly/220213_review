<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  // props: ["msg"],
  props: {
    // msg:Number,
    msg:{
      type:Number|String,
      require:true
    },
    sendData:Function
  },
  mounted(){
    // console.log('props',this.msg)
    this.sendData('heihei');
  }
}
</script>

<style scoped>
</style>
