import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

Vue.use(ElementUI);

new Vue({
  data:{
    msg1:"我是root组件"
  },
  render: h => h(App),
}).$mount('#app')
