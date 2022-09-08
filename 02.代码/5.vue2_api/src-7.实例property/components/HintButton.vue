<template>
    <el-tooltip 
    class="item" 
    effect="dark" 
    :content="title" 
    placement="top-start"
    >
        <!-- <el-button v-bind:size="size" :type="type" v-on:click="handleClick">删除</el-button> -->
        <!-- <el-button v-bind="$attrs" @click="handleClick">删除</el-button> -->
        <!-- <el-button 
        v-bind="{
            size:'big',
            type:'primary'
        }" 
        @click="handleClick"
        >删除</el-button> -->

        <el-button v-bind="$attrs" v-on="$listeners">删除</el-button>
        <!-- <el-button v-bind="$attrs" v-on="{
            click:fn
        }">删除</el-button> -->

    </el-tooltip>
</template>

<script>
export default {
    name:"HintButton",
    data() {
        return {
        }
    },
    // props:["size","type","title"],
    props:["title"],
    methods:{
        // handleClick(){
        //     console.log('handleClick')
        // }
    },
    mounted(){
        console.log('$listeners',this.$listeners)
    }
}
</script>

<style>

</style>