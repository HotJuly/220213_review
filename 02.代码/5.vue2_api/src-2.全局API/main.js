import Vue from 'vue'
import App from './App.vue'
// import HelloWorld from '@/components/HelloWorld'

Vue.config.productionTip = false

// Vue.config.devtools = true;

/*
  需求:将所有组件配置对象中的a属性,都进行+1操作
  解决方法:
    使用自定义合并策略可以快速解决
      可以一次性修改所有组件的配置对象内容
*/

// Vue.config.optionMergeStrategies.a = function (parent, child, vm) {
//   // console.log(parent, child, vm)
//   return child + 1
// }

/*
  问题:请问你是如何在项目中捕获出现的报错的?
    1.try...catch
      只能监视某一段代码的报错
    2.Promise的catch方法
      只能监视Promise对象的报错
    3.Vue的生命周期errorCaptured
      只能监视后代组件的报错
    4.Vue全局配置中的errorHandler
      可以监视整个Vue项目中出现的报错

  需求:请问在项目已经上线之后,你是如何知道项目出现的报错的?
  解决:
    1.在项目中使用以上方法捕获到报错信息
    2.在回调函数中,使用ajax将相关的报错信息,发送到公司服务器
    3.公司会通过指定的系统,例如:TAPD,将收集到的错误反馈给开发人员
*/

// Vue.config.errorHandler = function(err, vm, info){
//   console.log(err, vm, info)
// }

// 告知Vue,忽略部分组件的检查
// Vue.config.ignoredElements = [
//   "About"
// ]


// const component = Vue.extend(HelloWorld);
// new component().$mount("#app")

// Vue.filter("nameFilter",function(value){
//   // console.log('nameFilter',value)
//   return value + "haha"
// })

/*
  需求:要求所有组件在挂载结束之后,打印自己的组件名称
  解决方法:
    使用全局混合/混入实现
    全局混合的意思,就是将传入的配置对象与所有组件的配置对象进行合并
      如果合并过程中,生命周期出现了重复,那么就会存在共存的效果
        注意:除了生命周期以外,其他的都不允许重复,如果重复了,就近原则,当前组件的优先
        执行顺序:全局混合>局部混合>组件的对应生命周期
*/

// Vue.mixin({
//   mounted(){
//     // 此处的this就是执行当前代码的组件实例对象
//     console.log('Vue.mixin',this.$options.name)
//   }
// })

new Vue({
  render: h => h(App),
}).$mount('#app')

// var res = Vue.compile('<div><span>{{ msg }}</span></div>')

// new Vue({
//   data: {
//     msg: 'hello'
//   },
//   el:"#app",
//   render: res.render,
//   staticRenderFns: res.staticRenderFns
// })
