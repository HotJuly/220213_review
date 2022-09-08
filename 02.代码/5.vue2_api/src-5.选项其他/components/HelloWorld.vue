<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <input type="text" :value="value" @input="changeValue">
    <button @click="changeValue">修改父组件数据</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    value:String,
    value666:String
  },
  mounted(){
  },
  methods:{
    changeValue(event){
      // console.log('changeValue',event.target.value);
      // this.value = event.target.value;

      // this.$emit('input',event.target.value)
      this.$emit('input',"123")
    }
  },
  // model:{
  //   prop:"value666",
  //   event:"input999"
  // }
}
</script>

<style scoped>
</style>
