<template>
  <div class="hello">
    <h2>Hello World</h2>
    <h1>{{ msg333 }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld'
}
</script>

<script setup>
  defineProps(["msg333"])
  const emits = defineEmits(["update:msg333"]);

  setTimeout(() => {
    emits("update:msg333","我是修改之后的数据")
  }, 3000);
</script>

<style scoped>
</style>
