<template>
  <div class="hello">
    <h2>Hello World</h2>
    <!-- <h1>{{ msg }}</h1> -->
    <slot></slot>
    <slot name="header"></slot>
    <slot name="footer" msg="嗨"></slot>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld'
}
</script>

<script setup>
</script>

<style scoped>
</style>
