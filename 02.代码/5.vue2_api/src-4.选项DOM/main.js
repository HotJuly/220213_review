import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

/*
  问题:请问在Vue中,能够控制页面显示内容的地方有几个
    1.在public文件夹中,index.html中的app元素内部的结构会被当做模版使用
    2.main.js中配置对象的template属性
    3.main.js中配置对象的render方法

    优先级:render配置>template配置>index.html模版


*/

new Vue({
  data:{
    msg:"我是index.html的内容",
    msg1:"我是template的内容"
  },
  template:"<h2>{{msg1}}</h2>",
  render: createElement => createElement(App),
}).$mount('#app')
