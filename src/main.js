import Vue from 'vue'
import store from './store'
import router from './router'
import App from './App.vue'
import {doGET, doPOST, doPUT, doDELETE} from './remote'

import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'

// 引入 font-awesome 样式
import 'font-awesome/css/font-awesome.min.css'

Vue.use(ElementUI);

// 将axios的定义方法 赋给Vue
Vue.prototype.doGET = doGET;
Vue.prototype.doPOST = doPOST;
Vue.prototype.doDELETE = doDELETE;
Vue.prototype.doPUT = doPUT;

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
