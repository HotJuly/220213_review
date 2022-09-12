<template>
  <div class="home">
    Home
  </div>
</template>

<script>
export default {
  name: 'Home',
  data(){
    return{
    }
  },
  mounted(){
    console.log(this.$route)
  }
}
</script>

<style scoped>
  .home{
    width:200px;
    height:200px;
    border: 1px solid;
  }
</style>
