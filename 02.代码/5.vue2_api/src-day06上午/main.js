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

new Vue({
  render: h => h(App),
}).$mount('#app')
