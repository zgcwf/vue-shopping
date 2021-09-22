import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/global.css'
import './plugins/axios'
//按需引入Element
import element from './plugins/element'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(element)
import axios from "axios"
axios.defaults.baseURL = "http://127.0.0.1:8888/api/private/v1/"
Vue.prototype.$http = axios
// 阻止显示生产模式的消息
Vue.config.productionTip = false
//引用并注册全局组件Icon,svg矢量图标，谁用谁引入
import Icon from "@/components/Icon.vue";
Vue.component("Icon", Icon);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
